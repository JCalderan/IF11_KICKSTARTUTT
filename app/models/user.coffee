Model = require 'models/simpleObject_model'

module.exports = class User extends Model

    hasBeenSaved : null
    
    initialize: (options)->
        options = (options || {})
        super(options)
        @hasBeenSaved = false
        @url = ()-> "/_session/"
        @set(if options.type then options.type else "user")
        @set(if options.roles then options.roles else [])
            
    setUser: (userCtx)->
        @set(userCtx)
        
    fetch:(params) ->
        super(params)
        if @get("name") != null
            @hasBeenSaved = true
        else
            @hasBeenSaved = false
    
    save: (attr, opts={wait:true})=>
        console.log("save user now !")
        data = @attributes
        data["_id"] = "org.couchdb.user:" + @get('name')
        req = $.ajax(
            url: "org.couchdb.user:"+@get('name'),
            method: "PUT",
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        )