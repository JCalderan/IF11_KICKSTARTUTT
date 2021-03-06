template = require 'views/templates/signUp'
View = require 'views/base/view'
mediator = require 'mediator'

module.exports = class SignUpView extends View
  autoRender: true
  className: 'SignUpView'
  container: null
  template: template
  
  initialize: ->
    super
    
    #event handler
    @delegate "hide", "#myModal", @signUpHide

  render: ->
    super
    $(@el).find("#myModal").modal keyboard:true

  signUpHide: (event)=>
    event.preventDefault()
    window.location.replace("/")
