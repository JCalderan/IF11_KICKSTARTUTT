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
    raty_el = $(@el).find(".star_rating")
    raty_el.raty()
    raty_el.raty("set", @raty_img)
    raty_el.raty("score", if @model.attributes.note then @model.attributes.note else 0)
