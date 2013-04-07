Controller = require 'controllers/base/controller'
FooterView = require 'views/footer-view'

module.exports = class FooterController extends Controller
  initialize: ->
    super
    @view = new FooterView()
