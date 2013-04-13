Collection = require 'models/base/collection'
commentModel = require 'models/comment_model'
mediator = require 'mediator'

module.exports = class CommentsCol extends Collection
  model: commentModel
  
  initialize: ->
    super

  parse: (data)->
    return if data.rows then data.rows else data