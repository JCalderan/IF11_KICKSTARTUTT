View = require 'views/base/view'
template = require 'views/templates/header'
mediator = require 'mediator'
User = require 'models/user'

module.exports = class HeaderView extends View
  autoRender: yes
  className: 'header navbar navbar-fixed-top navbar-inverse'
  container: '#header_container'
  id: 'header'
  template: template

  initialize: ->
    super
    @delegate "submit", "#login-form", @signIn
    @delegate "click", "#sign-up", @signUp
    @delegate "submit", "#logout-form", @signOut
    mediator.subscribe 'sessionChange', @setUser
    @model = if @model is undefined then new User() else @model
    @listenTo @model, "change", @render
    
  render: ->
    super
    console.log(@model)
    console.log($(@el).find(".typeahead"))
    $(@el).find(".typeahead").typeahead(
        source: (query, process)->
            $.ajax(
                url: "/collection/projects?startkey=["+JSON.stringify(query)+"]",
                methode: "GET",
                dataType: "json"
                contentType: "application/json; charset=UTF-8"
                beforeSend: ()->
                    console.log(query)
            ).done((data)->
                result = []
                data.rows.forEach((row)->
                    result.push(row.value.nom_projet)
                )
                process(result)
            )
    )
    $(@el).find("#formSearchProjects").submit((event)->
        $(@).attr("action", "/col/projects/"+$(@).find("#inputSearchProjects").val())
    )

  signIn: (event)->
    event.preventDefault()
    form = $(event.target)
    user = {"username": form.find("#username").val(), "password": form.find("#password").val()}
    mediator.publish "login", user
  
  signOut: (event)->
    event.preventDefault()
    mediator.publish "logout", true

  signUp: (event)->
    event.preventDefault()
    mediator.publish "signUp", false
    
  setUser: (userData)=>
    console.log("initUser !!")
    @model.set(userData)
    
