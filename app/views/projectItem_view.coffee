template = require 'views/templates/projectItem'
View = require 'views/base/view'

mediator = require "mediator"

module.exports = class ProjectItemView extends View
  #class attributes
  autoRender: true
  template: template
  className: "projectItem"
  container: null
  
  #custom attributes
  raty_img : null

  
  initialize: ->
    super
    #custom init
    brunch_img = "/brunch/images/"
    @raty_img = "starHalf": brunch_img+"star-half.png", "starOff": brunch_img+"star-off.png", "starOn": brunch_img+"star-on.png", "cancelOff": brunch_img+"cancel-off.png", "cancelOn": brunch_img+"cancel-on.png"
    #event handler
    @listenTo @model, "change", @render
  
  render: =>
    super
    @setProjectLinks()
    @setRaty()
    
  setRaty: =>
    raty_el = $(@el).find(".star_rating")
    raty_el.raty()
    raty_el.raty("set", @raty_img)
    raty_el.raty("score", if @model.attributes.note_moyenne then (@model.attributes.note_moyenne*0.25) else 0)
    raty_el.raty('readOnly', true)
    
  setProjectLinks: =>
    $(@el).find(".toResProject").attr("href", "/view/project/"+@model.attributes._id)
    $(@el).find(".toResTags").each(
        ->
            $(@).attr("href", "/col/projets_by_topic/"+$(@).text())
    )
        
