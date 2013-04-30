Controller = require 'controllers/base/controller'
HomePageView = require 'views/homePage_view'
SplitPageView = require 'views/splitPage_view'

ModInfoModel = require 'models/modInfo_model'
ModInfoView = require 'views/modInfo_view'

ProjectsCol = require 'models/projects_collection'
ProjectsColView = require 'views/projectsCol_view'

ProjectModel = require 'models/project_model'
ProjectView = require 'views/project_view'

SignUpView = require 'views/signUp_view'

module.exports = class HomeController extends Controller

  index: ->
    @view = new HomePageView(container: '#page_container')
    
    staredProjects_model = new ModInfoModel(title:"Hot Projects", theme_color: "#CC4400")
    staredProjects_view = new ModInfoView(model: staredProjects_model, container: @view.inner_container)
    
    lastProjects_model = new ModInfoModel(title: "Last Projects", theme_color: "#CC4400")
    lastProjects_view = new ModInfoView(model: lastProjects_model, container: @view.inner_container)
    
    skillAdd_model = new ModInfoModel(title: "Need Skills ?", theme_color: "#CC4400")
    skillAdd_view = new ModInfoView(model: skillAdd_model, container: @view.inner_container)
    
    projectIdeas_model = new ModInfoModel(title: "Ideas ???", theme_color: "#CC4400")
    projectIdeas_view = new ModInfoView(model: projectIdeas_model, container: @view.inner_container)
    
    $(".modInfo").css("margin-left":"0px", "margin-right":"10px", "margin-bottom": "10px")
    
    
  list_projects: (params)->
    @view = new SplitPageView(container: '#page_container')
    projects_collection = new ProjectsCol()
    projects_collection.url = "/collection/"+(if params.collection then params.collection else "")+"/"+(if params.filter then params.filter else "")
    projectsCol_view = new ProjectsColView(collection: projects_collection, container: "#splitPage_left")
    projects_collection.fetch()
  
  get_project: (params)->
    @view = new SplitPageView(container: '#page_container')
    project_model = new ProjectModel(_id: if params.id then params.id else null)
    project_view = new ProjectView(model: project_model, container: "#splitPage_left")
    project_model.fetch()
    
  signup: (params)->
    @view = new SignUpView(container: '#page_container')
    $('#signup').submit ->
        myData =
            a: $this.identiant.value   
        alert(myData);
        #$.couch.db("mydb").saveDoc({}, {
        #    success:function(data) {
        #        console.log(data);
        #    }
        #});