#!/usr/bin/env coffee
Model = require 'models/base/model'

module.exports = class ModInfoModel extends Model
    urlRoot: "/getModInfo"
    
    initialize: ->
        super()
        
    parse: (data)->
        return data.items
    
    