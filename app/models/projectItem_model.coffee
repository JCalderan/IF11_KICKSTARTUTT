Model = require 'models/base/model'
mediator = require 'mediator'

module.exports = class ProjectItemModel extends Model
    idAttribute: "_id"
    
    initialize: ->
        super
        #mediator.subscribe 'loadComments', @loadComments
        
    parse: (data)->
        return if data.value then data.value else data
    
    #loadComments: (params)=>
    #    if params.pid
    #        req = $.ajax(
    #            url: "/collection/comments/"+ params.pid,
    #            method: "GET",
    #            contentType: "application/jsonp; charset=utf-8",
    #            dataType: "json"
    #        )
    #        req.done((data)=>
    #            comments = (row.value for row in data.rows)
    #            @set comments: comments
    #        )
    #    else
    #        console.log "! no pid !"
            