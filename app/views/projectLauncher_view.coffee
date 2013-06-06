template = require 'views/templates/projectLauncher'
View = require 'views/base/view'
#simpleObjectCollection = require 'models/simpleObject_collection'

mediator = require "mediator"

module.exports = class ProjectItemView extends View
  #class attributes
  autoRender: true
  template: template
  className: "projectLauncher row-fluid well well-small"
  container: null
  
  listen:
    'change:_id model': 'reload'
  
  #custom attributes
  projectState: 0
  state : ''
  state_list : ["creation", "incubation", "campagne", "fin"]
  errors : true
  now: null
  deadline: null
  imageReader : null
  attrToSave: null
  
  initialize: ->
    super
    #custom init
    nowTemp = new Date()
    @now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0)
    @deadline = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0)
    @imageReader = new FileReader()
    @imageReader.onloadend = (e)=>
        imgElem = $(@el).find("#project_thumbnail")
        imgElem.attr("src", e.target.result)
    #console.log @imageReader.result
    @attrToSave = {"type":"project", "thumbnails": []}
    
    #event handler
    @delegate "click", ".project_attr", @toogleProjectAttr
    @delegate "blur", ".project_attr_input", @toogleProjectAttr
    @delegate "click", "#project_thumbnail", @setProjectThumbnail
    @delegate "change", "#project_thumbnail_input", @showProjectThumbnail
    @delegate "keyup", "#project_title_input", @checkTitle
    @delegate "changeDate", "#datePicker", @setDeadline
    @delegate "show", "#validateInfo", @loadValidateInfoContent
    @delegate "click", "#save_change_button", @validate
    #@listenTo @model, "change", @reload
  
  render: =>
    super
    #on definit le nouvel etat de la vue : devrait être fait cote model,
    #mais on en à besoin ici pour la persistance de l'affichage (notemment lorsqu'il faut incremente l'etat par rapport au precedant)
    @state = @state_list[( if @model.get("state") then @model.get("state") else 0 )]
    
    $(@el).find("#tp_toolTip").tooltip("title":"définir une nouvelle deadline")
    $(@el).find(".project_attr").css("cursor": "pointer")
    $(@el).find("#pill_#{@state}").addClass("active")
    #console.log("#pill_#{@state} should be active")
    $(@el).find("#tab_home").addClass("active")
    switch @state
        when "creation"
            $(@el).find("#tab_members a").removeAttr("data-toggle").attr("href":"#").css("cursor": "default").addClass("muted")
            $(@el).find("#tab_comments a").removeAttr("data-toggle").attr("href":"#").css("cursor": "default").addClass("muted")
            $(@el).find("#datePicker").datepicker(onRender: (date)=>
                if date.valueOf() < @now.valueOf()
                    return "disabled"
                else
                    return ''
            ).datepicker("setValue", @now)
        when "incubation"
            $(@el).find("#tab_comments a").removeAttr("data-toggle").attr("href":"#").css("cursor": "default").addClass("muted")
        else
            return 0
 
  toogleProjectAttr: (event)=>
    event.preventDefault()
    elem = $(event.target)
    if elem.is('.project_attr')
        elem.hide()
        elem.parent().find(".project_attr_input").val(elem.text()).show()
    else if elem.is('.project_attr_input')
        new_val = elem.val()
        elem.hide()
        if new_val!="" then elem.parent().find(".project_attr").html(new_val) else elem.val(elem.parent().find(".project_attr").text())
        elem.parent().find(".project_attr").show()
        
  setProjectThumbnail: (event)->
    event.preventDefault()
    $(@el).find("#project_thumbnail_input").click()
    
  showProjectThumbnail: (event)->
    file = event.target.files[0]
    if file.type.match("image\/(jpeg|png|gif|tiff)") && file.type.match("image\/(jpeg|png|gif|tiff)")[0] == file.type
        @imageReader.readAsDataURL(file)
        
  checkTitle: (event)->
    elem = $(event.target)
    query = JSON.stringify($(event.target).val())
    req = $.ajax(
        url: "/collection/projects_name?key=#{query}",
        contentType: "application/json; charset=utf-8;",
        dataType: "json",
        methode: "GET"
    )
    req.done((data)->
        result = []
        data.rows.forEach((row)->
            result.push(row.key)
        )
        if result.length > 0
            elem.parents("#project_header").addClass("error")
        else
            elem.parents("#project_header").removeClass("error")
    )

  setDeadline: (event)->
    @deadline = new Date(event.date.getFullYear(), event.date.getMonth(), event.date.getDate(), 0, 0, 0, 0)
    deltaTime = Math.round((@deadline - @now) / 1000 / 60 / 60 / 24)
    info = "#{deltaTime} jour"+(if deltaTime > 1 then "s" else "")+" restant&nbsp;"
    elem = $(event.target)
    elem.datepicker('hide').hide()
    tooltip = elem.parent().find("small").find("a")
    elem.parent().find("small").html(info).append(tooltip).show()
    
  loadValidateInfoContent: (event)->
    @errors = false
    elem = $(@el).find("#validateInfo")
    content = elem.find(".modal-body")
    content.html("")
    info_container = $("<div>")
    warning_container = $("<div>")
    error_container = $("<div>")
    switch @state
        when "creation"
            content.append($("<p>", "text": "Valider la creation du projet ?"))
            warning_info = $("<p>", "class": "text-warning", "text": " vous ne pourrez plus modifier le titre de votre projet.").prepend($("<i>", "class": "icon-warning-sign"))
            warning_container.append(warning_info)
            if $("#project_title_input").val().length == 0 || $("#project_title_input").val() == $("#project_title_input").attr("placeholder")
                error_title = $("<p>", "class": "text-error", "text": " Vous devez donner un titre à votre projet avant de continuer.").prepend($("<i>", "class": "icon-ban-circle"))
                error_container.append(error_title)
                @errors = true
            else if $("#project_header").hasClass("error")
                error_title = $("<p>", "class": "text-error", "text": " Ce titre de projet n'est pas disponible, modifiez le avant de continuer.").prepend($("<i>", "class": "icon-ban-circle"))
                error_container.append(error_title)
                @errors = true
            else
                info_title = $("<p>", "class": "text-info", "text": " "+$('#project_title_input').val()).prepend($("<i>", "class": "icon-pencil"))
                info_container.append(info_title)
                
            if $("#project_description_input").val() == ""
                warning_description = $("<p>", "class": "text-warning", "text": " Aucune description pour votre projet, vous pourrez l'éditer par la suite.").prepend($("<i>", "class": "icon-warning-sign"))
                warning_container.append(warning_description)
            else
                resume_description = " "+ $('#project_description_input').val().substr(0,15) + if $('#project_description_input').val().length > 15 then "..." else ""
                info_description = $("<p>", "class": "text-info", "text": resume_description).prepend($("<i>", "class": "icon-comment"))
                info_container.append(info_description)
    
            if @deadline == null || (@now-@deadline) == 0
                warning_deadline = $("<p>", "class": "text-warning", "text": " Aucune deadline pour votre projet, vous pourrez l'éditer par la suite.").prepend($("<i>", "class": "icon-warning-sign"))
                warning_container.append(warning_deadline)
            else
                deltaTime = Math.round((@deadline - @now) / 1000 / 60 / 60 / 24)
                info_deadline = $("<p>", "class": "text-info", "text": " #{deltaTime} jour"+(if deltaTime > 1 then "s" else "")+" restant").prepend($("<i>", "class": "icon-calendar"))
                info_container.append(info_deadline)

            if !@imageReader.result
                warning_thumbnail = $("<p>", "class": "text-warning", "text": " Aucune image pour votre projet, vous pourrez l'éditer par la suite.").prepend($("<i>", "class": "icon-warning-sign"))
                warning_container.append(warning_thumbnail)
            else
                console.log(@imageReader.result)

        when "incubation" then ""
        when "campagne" then ""
        when "fin" then ""
        else
            return "Error"
    if @errors
        elem.find(".modal-footer").find(".btn-primary").attr("disabled", "disabled")
    else
        elem.find(".modal-footer").find(".btn-primary").removeAttr("disabled")
    content.append(info_container, $("<hr>"), warning_container, $("<hr>"), error_container)
 
  validate: (event)->
    if !@errors
        #on passe à l'etape suivante
        switch @state
            when "creation"
                @attrToSave["state"] = @state_list.indexOf(@state) + 1
                @attrToSave["name"] = $('#project_title_input').val()
                @attrToSave["description"] = $("#project_description_input").val()
                @attrToSave["deadline"] = @deadline.valueOf()
                if @imageReader.result then @attrToSave["thumbnails"].push(@imageReader.result)
            else
                console.log("error ! can't validate data")
        #on sauvegarde
        @model.save(@attrToSave)
    
  reload: =>
    console.log("reload, @model.id = #{@model.id}")
    console.log(@model)
    if @model && @model.id
        window.location.replace("/view/project/edit/#{@model.id}")
    else
        console.log("error : can't reload, check model or model.id property")
        console.log(@model.id)
