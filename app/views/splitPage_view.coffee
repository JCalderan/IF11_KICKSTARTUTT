template = require 'views/templates/splitPage'
View = require 'views/base/view'

module.exports = class SplitPageView extends View
  autoRender: yes
  className: 'split-page'
  container: null
  id: 'split_page'
  template: template
    
  initialize: ->
    super
    console.log "nouvelle splitPageView"
