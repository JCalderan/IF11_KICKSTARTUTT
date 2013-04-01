Controller = require 'controllers/base/controller'
HomePageView = require 'views/homePage_view'
ModInfoModel = require 'models/modInfo_model'
ModInfoView = require 'views/modInfo_view'

module.exports = class HomeController extends Controller
  index: ->
    @view = new HomePageView(container: '#page_container')
    
    staredProjects_model = new ModInfoModel(title:"Hot Projects", theme_color: "#CC4400")
    staredProjects_view = new ModInfoView(model: staredProjects_model, container: "#home_page_container")
    
    lastProjects_model = new ModInfoModel(title: "Last Projects", theme_color: "#CC4400")
    lastProjects_view = new ModInfoView(model: lastProjects_model, container: "#home_page_container")
    
    skillAdd_model = new ModInfoModel(title: "Need Skills ?", theme_color: "#CC4400")
    skillAdd_view = new ModInfoView(model: skillAdd_model, container: "#home_page_container")
    
    projectIdeas_model = new ModInfoModel(title: "Ideas ???", theme_color: "#CC4400")
    projectIdeas_view = new ModInfoView(model: projectIdeas_model, container: "#home_page_container")
    
    $(".modInfo").css("margin-left":"0px", "margin-right":"10px", "margin-bottom": "10px")
    #staredProjects_model.fetch()
    #lastProjects_model.fetch()
    #skillAdd_model.fetch()
    #projectIdeas_model.fetch()
