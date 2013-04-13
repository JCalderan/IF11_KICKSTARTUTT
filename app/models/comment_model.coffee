Model = require 'models/base/model'
mediator = require 'mediator'

module.exports = class CommentModel extends Model
    idAttribute: "_id"
    
    initialize: ->
        super
        
    parse: (data)->
        return if data.value then data.value else data           