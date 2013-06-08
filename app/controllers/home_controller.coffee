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

UserView = require 'views/userProfile_view'

SignUpView = require 'views/signUp_view'

FaqView = require 'views/faq_view'

AdvanceSearchView = require 'views/advanceSearch_view'

ProjectLauncher = require 'views/projectLauncher_view'

module.exports = class HomeController extends Controller

  index: ->
    @view = new SplitPageView(container: '#page_container')
    listProjects_model = new SimpleObject_collection(couchView: "projects", couchQueryParams: limit:3)
    staredProjects_view = new ModInfoView(container: "#splitPage_left", projectCol: listProjects_model)   
    listProjects_model.fetch()
    
  list_collection: (params)->
    @view = new SplitPageView(container: '#page_container')
    collection = new SimpleObject_collection(couchView:(if params.collection then params.collection else ""), couchKey:(if params.filter then params.filter else ""))
    col_view = new ProjectsColView(collection: collection, container: "#splitPage_left")
    collection.fetch()
      
  get_typeView: (params)->
    @view = new SplitPageView(container: '#page_container')
    model = new SimpleObjectModel(_id: if params.id then params.id else null)
    model_view = new ProjectView(model: model, container: "#splitPage_left")
    model.fetch()
    
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
  
  faq: (params)->
    @view = new SplitPageView(container: '#page_container')
    faq_View = new FaqView(container: "#splitPage_left")
    
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
