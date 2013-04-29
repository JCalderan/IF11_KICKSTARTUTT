View = require 'views/base/view'
template = require 'views/templates/header'

module.exports = class HeaderView extends View
  autoRender: yes
  className: 'header navbar navbar-fixed-top navbar-inverse'
  container: '#header_container'
  id: 'header'
  template: template

  initialize: ->
    super
    
  render: ->
    super
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