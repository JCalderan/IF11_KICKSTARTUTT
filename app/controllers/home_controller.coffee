Controller = require 'controllers/base/controller'
HomePageView = require 'views/homePage_view'
SplitPageView = require 'views/splitPage_view'

SimpleObjectModel = require 'models/simpleObject_model'
SimpleObject_collection = require 'models/simpleObject_collection'

ModInfoModel = require 'models/modInfo_model'
ModInfoView = require 'views/modInfo_view'

ProjectsColView = require 'views/projectsCol_view'

UsersColView = require 'views/usersCol_view'

ProjectView = require 'views/project_view'

SignUpView = require 'views/signUp_view'

AdvanceSearchView = require 'views/advanceSearch_view'

ProjectLauncher = require 'views/projectLauncher_view'

UserProfile = require 'views/userProfile_view'

module.exports = class HomeController extends Controller

  index: ->
    #@view = new HomePageView(container: '#page_container')
    @view = new SplitPageView(container: '#page_container')
    staredProjects_model = new ModInfoModel(title:"Hot Projects", theme_color: "#CC4400")
    staredProjects_view = new ModInfoView(model: staredProjects_model, container: "#splitPage_left")
    
    #lastProjects_model = new ModInfoModel(title: "Last Projects", theme_color: "#CC4400")
    #lastProjects_view = new ModInfoView(model: lastProjects_model, container: @view.inner_container)
    #
    #skillAdd_model = new ModInfoModel(title: "Need Skills ?", theme_color: "#CC4400")
    #skillAdd_view = new ModInfoView(model: skillAdd_model, container: @view.inner_container)
    #
    #projectIdeas_model = new ModInfoModel(title: "Ideas ???", theme_color: "#CC4400")
    #projectIdeas_view = new ModInfoView(model: projectIdeas_model, container: @view.inner_container)
    
    
  list_collection: (params)->
    @view = new SplitPageView(container: '#page_container')
    collection = new SimpleObject_collection(couchView:(if params.collection then params.collection else ""), couchKey:(if params.filter then params.filter else ""))
    switch params.collection
      when "projects" then projectsCol_view = new ProjectsColView(collection: collection, container: "#splitPage_left")
      when "users" then usersCol_view = new UsersColView(collection: collection, container: "#splitPage_left")
    collection.fetch()
      
  get_project: (params)->
    @view = new SplitPageView(container: '#page_container')
    project_model = new SimpleObjectModel(_id: if params.id then params.id else null)
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
    
  advanceSearch: (params)->
    @view = new SplitPageView(container: '#page_container')
    advanceSearch_View = new AdvanceSearchView(container: "#splitPage_left")
    
  launch_project: (params)->
    @view = new SplitPageView(container: '#page_container')
    project = new SimpleObjectModel()
    projectLauncher_view = new ProjectLauncher(model: project, container: '#splitPage_left')
    
  edit_project: (params)->
    @view = new SplitPageView(container: '#page_container')
    project = new SimpleObjectModel(_id: if params.id then params.id else null)
    projectLauncher_view = new ProjectLauncher(model: project, container: '#splitPage_left')

  userProfile: (params)->
    @view = new SplitPageView(container: '#page_container')
    userProfil_view = new UserProfile(container: "#splitPage_left")
