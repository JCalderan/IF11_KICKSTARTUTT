#!/usr/bin/env coffee
template = require 'views/templates/modInfo'
View = require 'views/base/view'
mediator = require 'mediator'

module.exports = class ModInfoView extends View
  autoRender: true
  className: 'modInfo'
  container: null
  template: template
  
  initialize: ->
    super
    @listenTo @model, "change", @render
    
    #event handler
    #Handles the carousel thumbnails
    @delegate "click", "[id^=carousel-selector-]", @carouselSelector
    #When the carousel slides, auto update the text
    @delegate 'slid', "#myCarousel", @carouselUpdateText
    
  render: ->
    super
    $(@el).find("#myCarousel").carousel interval: 5000
    $(@el).find("#carousel-text").html $(@el).find("#slide-content-0").html()
     
  carouselSelector: (event)->
    if event
      event.preventDefault()
    id_selector = event.currentTarget.id
    id = id_selector.substr(id_selector.lastIndexOf("-") + 1)
    id = parseInt(id)
    $("#myCarousel").carousel id
    
  carouselUpdateText: (event)->
    if event
      event.preventDefault()
    id = $(@el).find(".item.active").data("slide-number")
    $(@el).find("#carousel-text").html $(@el).find("#slide-content-" + id).html()
