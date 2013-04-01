View = require 'views/base/view'
template = require 'views/templates/footer'

module.exports = class FooterView extends View
  autoRender: yes
  className: 'footer navbar navbar-fixed-bottom navbar-inverse'
  container: '#footer_container'
  id: 'footer'
  template: template
  toogled: null

  initialize: ->
    super
    @toogled = false
    @delegate "click", ".tooglers", @toogleFooter
    
    
  toogleFooter:(event)->
    event.preventDefault()
    if @toogled
        $(".tooglings").hide()
        @toogled = false 
    else
        $(".tooglings").show()
        @toogled = true
