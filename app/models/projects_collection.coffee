Collection = require 'models/base/collection'
projectItemModel = require 'models/projectItem_model'

module.exports = class ProjectsCol extends Collection
  model: projectItemModel
  
  initialize: ->
    super

  parse: (data)->
    return if data.rows then data.rows else data

