template = require "views/templates/projectItem"
View = require "views/base/view"

module.exports = class ProjectItemView extends View
  autoRender: true
  template: template
  className: "projectItem row-fluid"
  container: null
  raty_img : null
  
  initialize: ->
    super
    brunch_img = "/brunch/images/"
    @raty_img = "starHalf": brunch_img+"star-half.png", "starOff": brunch_img+"star-off.png", "starOn": brunch_img+"star-on.png", "cancelOff": brunch_img+"cancel-off.png", "cancelOn": brunch_img+"cancel-on.png"
    @listenTo @model, "change", @render
    #console.log "nouvelle projectItemView"
  
  render: =>
    super
    @setRaty()
    @setLink()
    
  setRaty: =>
    raty_el = $(@el).find(".star_rating")
    raty_el.raty()
    raty_el.raty("set", @raty_img)
    raty_el.raty("score", if @model.attributes.note_moyenne then (@model.attributes.note_moyenne*0.25) else 0)
    raty_el.raty('readOnly', true)
    
  setLink: =>
    $(@el).find(".toResProject").attr("href", "/view/project/"+@model.attributes._id)
    $(@el).find(".toResTags").each(
        ->
            $(@).attr("href", "/col/projets_by_topic/"+$(@).text())
    )

  setComments: =>
    return true