template = require 'views/templates/projectLauncher'
View = require 'views/base/view'
#simpleObjectCollection = require 'models/simpleObject_collection'

mediator = require "mediator"

module.exports = class ProjectItemView extends View
  #class attributes
  autoRender: true
  template: template
  className: "projectLauncher row-fluid"
  container: null
  
  #custom attributes
  projectState: 0
  state : ''
  errors : true
  now: null
  deadline: null
  imageReader : null
  attrToSave: null
  
  initialize: ->
    super
    #custom init
    @state = ["creation", "incubation", "campagne", "fin"][(if @model.get("state") then @model.get("state") else 0 )]
    nowTemp = new Date()
    @now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0)
    @imageReader = new FileReader()
    @imageReader.onloadend = (e)=>
        imgElem = $(@el).find("#project_thumbnail")
        imgElem.attr("src", e.target.result)
    console.log @imageReader.result
    @attrToSave = {"type":"project"}
    
    #event handler
    @listenTo @model, "change", @render
    @delegate "click", ".project_attr", @toogleProjectAttr
    @delegate "blur", ".project_attr_input", @toogleProjectAttr
    @delegate "click", "#project_thumbnail", @setProjectThumbnail
    @delegate "change", "#project_thumbnail_input", @showProjectThumbnail
    @delegate "keyup", "#project_title_input", @checkTitle
    @delegate "changeDate", "#datePicker", @setDeadline
    @delegate "show", "#validateInfo", @loadValidateInfoContent
    @delegate "click", "#save_change_button", @validate
  
  render: =>
    super
    $(@el).find("#datePicker").datepicker(onRender: (date)=>
        if date.valueOf() < @now.valueOf()
            return "disabled"
        else
            return ''
    ).datepicker("setValue", @now)
    $(@el).find("#tp_toolTip").tooltip("title":"définir une nouvelle deadline")
    $(@el).find(".project_attr").css("cursor": "pointer")
    $(@el).find("#pill_#{@state}").addClass("active")
    $(@el).find("#tab_home").addClass("active")
    switch @state
        when "creation"
            $(@el).find("#tab_members a").removeAttr("data-toggle").attr("href":"#").css("cursor": "auto").addClass("muted")
            $(@el).find("#tab_comments a").removeAttr("data-toggle").attr("href":"#").css("cursor": "auto").addClass("muted")
        when "incubation"
            $(@el).find("#tab_comments a").removeAttr("data-toggle").attr("href":"#").css("cursor": "auto").addClass("muted")
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
        console.log(result)
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
            content.append($("<p>", "text": "Valider la création du projet ?"))
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
                @attrToSave["nom_projet"] = $('#project_title_input').val()
                info_container.append(info_title)
                
            if $("#project_description_input").val() == ""
                warning_description = $("<p>", "class": "text-warning", "text": " Aucune description pour votre projet, vous pourrez l'éditer par la suite.").prepend($("<i>", "class": "icon-warning-sign"))
                warning_container.append(warning_description)
            else
                resume_description = " "+ $('#project_description_input').val().substr(0,15) + if $('#project_description_input').val().length > 15 then "..." else ""
                info_description = $("<p>", "class": "text-info", "text": resume_description).prepend($("<i>", "class": "icon-comment"))
                info_container.append(info_description)
                @attrToSave["description_projet"] = $("#project_description_input").val()
                
            if @deadline == null || (@now-@deadline) == 0
                warning_deadline = $("<p>", "class": "text-warning", "text": " Aucune deadline pour votre projet, vous pourrez l'éditer par la suite.").prepend($("<i>", "class": "icon-warning-sign"))
                warning_container.append(warning_deadline)
            else
                deltaTime = Math.round((@deadline - @now) / 1000 / 60 / 60 / 24)
                info_deadline = $("<p>", "class": "text-info", "text": " #{deltaTime} jour"+(if deltaTime > 1 then "s" else "")+" restant").prepend($("<i>", "class": "icon-calendar"))
                info_container.append(info_deadline)
                @attrToSave["deadline_projet"] = @deadline.valueOf()
            if !@imageReader.result
                warning_thumbnail = $("<p>", "class": "text-warning", "text": " Aucune image pour votre projet, vous pourrez l'éditer par la suite.").prepend($("<i>", "class": "icon-warning-sign"))
                warning_container.append(warning_thumbnail)
            else
                @attrToSave["thumbnails_projet"] = []
                @attrToSave["thumbnails_projet"].push(@imageReader.result)
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
        @model.set(@attrToSave)
        @model.save()