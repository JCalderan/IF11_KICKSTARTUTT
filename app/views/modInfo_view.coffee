#!/usr/bin/env coffee
template = require 'views/templates/modInfo'
View = require 'views/base/view'
mediator = require 'mediator'

module.exports = class ModInfoView extends View
  autoRender: true
  className: 'span6 modInfo'
  container: null
  template: template
  
  initialize: ->
    super
    @listenTo @model, "change", @render
    