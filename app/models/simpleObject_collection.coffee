Collection = require 'models/base/collection'
simpleObjectmModel = require 'models/simpleObject_model'

module.exports = class ProjectsCol extends Collection
  model: simpleObjectmModel
  
  initialize: (options)->
    options || (options = {})
    super(options)
    if options.couchView
        @url = ()->
            tmp_url = "/collection/"+options.couchView+"/"+(if options.couchKey then options.couchKey else "")
            if options.couchQueryParams
                tmp_url+="?"
                tmp_url += for paramKey, paramValue of options.couchQueryParams
                    "#{paramKey}=#{paramValue}&";
            url = tmp_url
            
  parse: (data)->
    console.log(data.rows)
    return if data.rows then data.rows else data

