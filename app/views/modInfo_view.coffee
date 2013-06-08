#!/usr/bin/env coffee
template = require 'views/templates/modInfo'
View = require 'views/base/view'
mediator = require 'mediator'

SimpleObjectCollection = require 'models/simpleObject_collection'
ProjectColView = require 'views/projectsCol_view'


module.exports = class ModInfoView extends View
  autoRender: true
  className: 'modInfo'
  container: null
  template: template
  
  #custom attr
  projectCol: null
  projectColView: null
  
  
  initialize: (params)->
    super(params)
    @projectCol = (params.projectCol || new SimpleObjectCollection(couchView: "projects"))
    #class: "span11", style:"padding-top:15px;padding-bottom:15px;margin-left:15px;"

    #event handler
    #Handles the carousel thumbnails
    @delegate "click", "[id^=carousel-selector-]", @carouselSelector
    #When the carousel slides, auto update the text
    @delegate 'slid', "#myCarousel", @carouselUpdateText
    @delegate "click", "#slider_nav a", @updateSlideContent
    
  render: ->
    super
    @projectColView = new ProjectColView(collection: @projectCol, container: "#tab1 #projectColContainer")
    @subview 'projectCol', @projectColView
    $(@el).find("#myCarousel").carousel interval: 5000
    $(@el).find("#carousel-text").html $(@el).find("#slide-content-0").html()
    #simule très salement un click sur la premiere rubrique du slider
    $($(@el).find("#slider_nav a")[0]).trigger("click")
     
  carouselSelector: (event)->
    if event
      event.preventDefault()
    id_selector = event.currentTarget.id
    id = id_selector.substr(id_selector.lastIndexOf("-") + 1)
    id = parseInt(id)
    console.log(id)
    $("#myCarousel").carousel id
    
  carouselUpdateText: (event)->
    if event
      event.preventDefault()
    id = $(@el).find(".item.active").data("slide-number")
    $(@el).find("#carousel-text").html $(@el).find("#slide-content-" + id).html()
    
  updateSlideContent: (event)->
    @projectColView.container = "#projectColContainer"
    @projectCol.couchView = $(event.target).data("filter")
    @projectCol.fetch()
    #custom render trop sale (la soutenance approche :s)
    $(@el).find($(event.target).attr("href")).find(@projectColView.container).append($(@projectColView.el))
