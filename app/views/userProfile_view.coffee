template = require 'views/templates/userProfile'
View = require 'views/base/view'
mediator = require 'mediator'

SimpleObjectModel = require 'models/simpleObject_model'
SimpleObjectCollection = require 'models/simpleObject_collection'


module.exports = class UserProfileView extends View
  autoRender: true
  className: 'UserProfileView well well-small'
  container: null
  template: template
  
  initialize: ->
    super
    @listenTo @model, "change", @render
    #event handler
    @delegate "click", ".user_attr", @toogleProjectAttr
    @delegate "blur", ".user_attr_input", @toogleProjectAttr
  
  render: =>
    super

  toogleProjectAttr: (event)=>
    event.preventDefault()
    elem = $(event.target)
    if elem.is('.user_attr')
        elem.hide()
        elem.parent().find(".user_attr_input").val(elem.text()).show()
    else if elem.is('.user_attr_input')
        new_val = elem.val()
        elem.hide()
        if new_val!="" then elem.parent().find(".user_attr").html(new_val) else elem.val(elem.parent().find(".user_attr").text())
        elem.parent().find(".user_attr").show()
