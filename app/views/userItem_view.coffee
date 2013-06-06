template = require 'views/templates/userItem'
View = require 'views/base/view'

mediator = require "mediator"

module.exports = class UserItemView extends View
  #class attributes
  autoRender: true
  tagName: 'li'
  template: template
  className: "userItem"
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
    @setRaty()
    
  setRaty: =>
    raty_el = $(@el).find(".star_rating")
    raty_el.raty()
    raty_el.raty("set", @raty_img)
    raty_el.raty("score", if @model.attributes.note_moyenne then (@model.attributes.note_moyenne*0.25) else 0)
    raty_el.raty('readOnly', true)