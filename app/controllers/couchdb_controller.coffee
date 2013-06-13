Chaplin = require 'chaplin'
Controller = require 'controllers/base/controller'
mediator = require 'mediator'
#User = require 'models/user'
#LoginView = require 'views/login-view'

module.exports = class CouchdbController extends Controller
    
  initialize: ->
    #@couchHandler = new CouchDB("kickstartutt")
    
    @subscribeEvent 'login', @login
    @subscribeEvent 'logout', @logout
       
  login: (user)->
    auth_req = $.ajax(
        url: "/_session",
        data : JSON.stringify({"name":user.username, "password": user.password}),
        method: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    )
    auth_req.always((data)=>
        @publishSession 'logedIn'
    )
    
  logout: (event)->
    remove_session = $.ajax(
        url: "/_session",
        method: "DELETE",
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    )
    remove_session.done((data)=>
        @publishSession 'logedOut'
    )
    
  publishSession: (event)->
    get_session = $.ajax(
        url: "/_session",
        method: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    )
    get_session.done((data)->
        mediator.publish "sessionChange", data.userCtx
    )
    