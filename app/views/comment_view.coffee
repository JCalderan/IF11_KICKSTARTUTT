template = require "views/templates/comment"
View = require "views/base/view"
mediator = require 'mediator'

module.exports = class CommentView extends View
  #class attributes
  autoRender: true
  template: template
  className: "comment row-fluid"
  container: null
  #custom attributes
  
  
  initialize: ->
    super
    @listenTo @model, "change", @render
  

  render: =>
    super


