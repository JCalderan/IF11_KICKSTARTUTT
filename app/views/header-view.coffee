View = require 'views/base/view'
template = require 'views/templates/header'

module.exports = class HeaderView extends View
  autoRender: yes
  className: 'header navbar navbar-fixed-top navbar-inverse'
  container: '#header_container'
  id: 'header'
  template: template
