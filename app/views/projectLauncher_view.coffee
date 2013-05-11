template = require 'views/templates/projectLauncher'
View = require 'views/base/view'
simpleObjectCollection = require 'models/simpleObject_collection'

mediator = require "mediator"

module.exports = class ProjectItemView extends View
  #class attributes
  autoRender: true
  template: template
  className: "projectLauncher row-fluid"
  container: null
  
  #custom attributes
  projectState: 0
  now: null
  deadline: null
  state : ''
  
  initialize: ->
    super
    #custom init
    nowTemp = new Date();
    @now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
    @state = ["creation", "incubation", "campagne", "fin"][(if @model.get("state") then @model.get("state") else 0 )]
    
    #event handler
    @listenTo @model, "change", @render
    @delegate "click", ".project_attr", @toogleProjectAttr
    @delegate "blur", ".project_attr_input", @toogleProjectAttr
    @delegate "click", "#project_thumbnail", @setProjectThumbnail
    @delegate "change", "#project_thumbnail_input", @showProjectThumbnail
    @delegate "keyup", "#project_title_input", @checkTitle
    @delegate "changeDate", "#datePicker", @setDeadline
    @delegate "show", "#validateInfo", @loadValidateInfoContent
  
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
 
  toogleProjectAttr: (event)=>
    event.preventDefault()
    elem = $(event.target)
    if elem.is('.project_attr')
        elem.hide()
        elem.parent().find(".project_attr_input").val(elem.html()).show()
    else if elem.is('.project_attr_input')
        new_val = elem.val()
        elem.hide()
        if new_val!="" then elem.parent().find(".project_attr").html(new_val)
        elem.parent().find(".project_attr").show()
        
  setProjectThumbnail: (event)->
    event.preventDefault()
    $(@el).find("#project_thumbnail_input").click()
    
  showProjectThumbnail: (event)->
    file = event.target.files[0]
    imgElem = $(@el).find("#project_thumbnail")
    reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = (e)->
        imgElem.attr("src", e.target.result)
        
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
    elem = $(@el).find("#validateInfo")
    content = elem.find(".modal-body")
    content.html("")
    errors = false
    switch @state
        when "creation"
            content.append($("<p>", "text": "Valider la création du projet ?"))
            warning_info = $("<p>", "class": "text-warning", "text": " vous ne pourrez plus modifier le titre de votre projet.").prepend($("<i>", "class": "icon-warning-sign"))
            content.append(warning_info)
            if $("#project_description_input").val() == ""
                warning_description = $("<p>", "class": "text-warning", "text": " Aucune description pour votre projet, vous pourrez l'éditer par la suite.").prepend($("<i>", "class": "icon-warning-sign"))
                content.append(warning_description)
            if @deadline == null || (@now-@deadline) == 0
                warning_deadline = $("<p>", "class": "text-warning", "text": " Vous n'avez définit aucune deadline pour votre projet.").prepend($("<i>", "class": "icon-warning-sign"))
                content.append(warning_deadline)
            if $("#project_title_input").val() == "" || $("#project_title_input").val() == "Titre du projet"
                error_title = $("<p>", "class": "text-error", "text": " Vous devez donner un titre à votre projet avant de continuer.").prepend($("<i>", "class": "icon-ban-circle"))
                content.append(error_title)
                errors = true
            if $("#project_header").hasClass("error")
                error_title = $("<p>", "class": "text-error", "text": " Ce titre de projet n'est pas disponible, modifiez le avant de continuer.").prepend($("<i>", "class": "icon-ban-circle"))
                content.append(error_title)
                errors = true
        when "incubation" then ""
        when "campagne" then ""
        when "fin" then ""
        else
            return "Error"
    if errors
        elem.find(".modal-footer").find(".btn-primary").attr("disabled", "disabled")
    else
        elem.find(".modal-footer").find(".btn-primary").removeAttr("disabled")
    
  validateStep: (event)->
    event.preventDefault()