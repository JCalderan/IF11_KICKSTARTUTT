template = require "views/templates/member"
View = require "views/base/view"
mediator = require 'mediator'

module.exports = class MemberView extends View
  #class attributes
  autoRender: true
  template: template
  tagName:'li'
  className: "memberToAdd"
  container: null
  #custom attributes
  
  
  initialize: ->
    super
    @listenTo @model, "change", @render
  

  render: =>
    super

