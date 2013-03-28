#!/usr/bin/env coffee
template = require 'views/templates/modInfo'
View = require 'views/base/view'
mediator = require 'mediator'

module.exports = class ModInfoView extends View
  autoRender: true
  className: 'span6'
  container: '#page-container'
  template: template
  
  initialize: ->
    super
    @listenTo @model, "change", @render