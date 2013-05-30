template = require 'views/templates/advanceSearch'
View = require 'views/base/view'
mediator = require 'mediator'

module.exports = class AdvanceSearchView extends View
  autoRender: true
  className: 'AdvanceSearchView well well-small'
  container: null
  template: template
  
  initialize: ->
    super
    
  render: ->
    super