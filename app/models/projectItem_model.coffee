Model = require 'models/base/model'

module.exports = class ProjectItemModel extends Model
    idAttribute: "_id"
    
    initialize: ->
        super

        
    parse: (data)->
        return if data.value then data.value else data
    
    