View = require 'views/base/view'
template = require 'views/templates/header'
mediator = require 'mediator'
User = require 'models/user'

module.exports = class HeaderView extends View
  autoRender: yes
  className: 'header navbar navbar-fixed-top navbar-inverse'
  container: '#header_container'
  id: 'header'
  template: template

  initialize: ->
    super
    @delegate "submit", "#login-form", @signIn
    @delegate "click", "#sign-up", @signUp
    @delegate "submit", "#logout-form", @signOut
    mediator.subscribe 'sessionChange', @setUser
    @model = if @model is undefined then new User() else @model
    @listenTo @model, "change", @render
    
  render: ->
    super
    #console.log(@model)

  signIn: (event)->
    event.preventDefault()
    form = $(event.target)
    user = {"username": form.find("#username").val(), "password": form.find("#password").val()}
    mediator.publish "login", user
  
  signOut: (event)->
    event.preventDefault()
    mediator.publish "logout", true

  signUp: (event)->
    event.preventDefault()
    mediator.publish "signUp", false
    
  #setUser: (userData)=>
  #  @model.set(userData)
  #  
