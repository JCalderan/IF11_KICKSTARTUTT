template = require 'views/templates/project'
View = require 'views/base/view'
mediator = require 'mediator'

module.exports = class ProjectView extends View
  autoRender: true
  className: 'projectView'
  container: null
  template: template
  
  initialize: ->
    super
    @listenTo @model, "change", @render
    