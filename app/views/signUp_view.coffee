template = require 'views/templates/signUp'
View = require 'views/base/view'
mediator = require 'mediator'

module.exports = class SignUpView extends View
  autoRender: true
  className: 'SignUpView'
  container: null
  template: template
  
  #initialize: ->
  #  super
  #  @listenTo @model, "change", @render
  #