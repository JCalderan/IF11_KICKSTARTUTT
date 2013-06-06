template = require 'views/templates/faq'
View = require 'views/base/view'
mediator = require 'mediator'

module.exports = class faqView extends View
  autoRender: true
  className: 'FaqView'
  container: null
  template: template
  
  initialize: ->
    super

  render: ->
    super