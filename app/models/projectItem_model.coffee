Model = require 'models/base/model'

module.exports = class ProjectItemModel extends Model

    initialize: ->
        super
        console.log "nouvelle projectItemModel"
        
    parse: (data)->
        return if data.value then data.value else data
    
    