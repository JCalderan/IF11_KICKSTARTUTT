#!/usr/bin/env coffee
template = require 'views/templates/sideBar'
View = require 'views/base/view'
mediator = require 'mediator'

module.exports = class sideBar extends View
  autoRender: true
  className: 'sideBar'
  container: null
  template: template
  
  initialize: ->
    super
    @listenTo @model, "change", @render
    
  render: ->
    super