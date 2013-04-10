Model = require 'models/base/model'

module.exports = class ProjectModel extends Model
    urlRoot: "/model"
    idAttribute: "_id"
    
    initialize: ->
        super
        
    parse: (data)->
        return if data.rows then data.rows else data
    
    