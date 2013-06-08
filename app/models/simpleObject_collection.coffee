Collection = require 'models/base/collection'
simpleObjectmModel = require 'models/simpleObject_model'

module.exports = class ProjectsCol extends Collection
  model: simpleObjectmModel
  couchView: null
  couchKey: null
  couchQueryParams: null
  
  initialize: (options)->
    options || (options = {})
    super(options)
    @couchView = (options.couchView || null)
    @couchKey = (options.couchKey || null)
    @couchQueryParams = (options.couchQueryParams || null)
    if @couchView 
        @url = ()->
            tmp_url = "/collection/"+@couchView+"/"+(if @couchKey then @couchKey else "")
            if @couchQueryParams
                tmp_url+="?"
                tmp_url += for paramKey, paramValue of @couchQueryParams
                    "#{paramKey}=#{paramValue}&"
            url = tmp_url
            
  parse: (data)->
    console.log(data.rows)
    return if data.rows then data.rows else data

