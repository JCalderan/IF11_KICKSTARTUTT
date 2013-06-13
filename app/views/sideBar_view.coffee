#!/usr/bin/env coffee
template = require 'views/templates/sideBar'
View = require 'views/base/view'
mediator = require 'mediator'

module.exports = class sideBar extends View
  autoRender: true
  className: 'sideBar'
  container: null
  template: template
  
  initialize: ->
    super
    @listenTo @model, "change", @render
    
  render: ->
    super
    #console.log($(@el).find(".typeahead"))
    $(@el).find(".typeahead").typeahead(
        source: (query, process)->
            $.ajax(
                url: "/collection/projects_by_name?startkey=["+JSON.stringify(query)+"]",
                methode: "GET",
                dataType: "json"
                contentType: "application/json; charset=UTF-8"
                beforeSend: ()->
                    #console.log(query)
            ).done((data)->
                result = []
                data.rows.forEach((row)->
                    row.key.forEach((projectName)->
                        result.push(projectName)
                    )
                )
                process(result)
            )
    )
    $(@el).find("#formSearchProjects").submit((event)->
        #$(@).attr("action", "/col/projects_by_name/"+$(@).find("#inputSearchProjects").val())
        event.preventDefault();
        window.location.replace("/col/projects_by_name/"+$(@).find("#inputSearchProjects").val())
    )