SimpleObjectModel = require 'models/simpleObject_model'
template = require 'views/templates/splitPage'
View = require 'views/base/view'
SideBar = require 'views/sideBar_view'

module.exports = class SplitPageView extends View
  autoRender: yes
  className: 'split-page'
  container: null
  id: 'split_page'
  template: template
    
  initialize: ->
    super
    console.log "nouvelle splitPageView"
      
  render: ->
    super

    test = new SimpleObjectModel()
    sideBar = new SideBar autoRender: true, model: test, container: $(@el).find("#splitPage_right")
    @subview 'sideBar', sideBar
    sideBar.render()
