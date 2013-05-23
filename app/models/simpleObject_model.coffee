Model = require 'models/base/model'
mediator = require 'mediator'

#constantes
__appDesignDoc = "kickstartutt"

module.exports = class CommentModel extends Model
    idAttribute: "_id",
    feed: null,
    
    initialize: (options)->
        super(options)
        @url = ()-> "/model/"+(if @id then @id else "")
        @feed = {}
        #@watch(since:"now", filter:"model")    
           
    watch: (options)=>
        options || (options = {})
        
        # permet le passage d'une fonction ou d'une chaine de caractère pour le filtre (watch("filtre"=function(){...}) 
        if (options.filter && !@feed.filter)
            if typeof(options.filter) is "string"
                @feed.filter = __appDesignDoc+"/"+options.filter
            else
                @feed.filter = options.filter
                
        # permet l'appel de watch('now')
        if !@feed.since
            if options.since
                if options.since is "now"
                    @feed.since = 0
                    @feed.descending = true
                    @feed.limit = 1
                else
                    @feed.since = options.since
            else
                @feed.since = 0       
        #@feed.heartbeat || (@feed.heartbeat = if options.heartbeat then options.heartbeat else (30 * 1000))
        
        # permet d'arreter le longpolling par l'appel de watch("stop")
        if options!="stop"
            req = $.ajax(
                url: "/model/_changes?id="+@id+"&feed=longpoll",
                method: "GET",
                contentType: "application/json; charset=utf-8",
                data: @feed,
                dataType: "json"
            )
            req.done((dataChanges)=>
                console.log(dataChanges)
                if dataChanges.last_seq
                    @watch(since: dataChanges.last_seq)
                    @fetch(watchSince: dataChanges.last_seq)
                else
                    console.log("error")
            )
            req.fail((dataError)=>
                dataError = if typeof dataError is "string" then JSON.parse(dataError) else dataError
                if dataError.last_seq
                    @watch(since: dataError.last_seq)
            )

    fetch: (options)->
        options || (options={})
        super(options)
        if options.watchSince
            console.log("watch since :"+options.watchSince)
            @watch("since":options.watchSince)

    parse: (data)->
        return if data.value then data.value else data
    
    save: (attr, opts={wait:true})=>
        console.log("save")
        opts.success = (opts.succeed || (
            (model, response, options)=>
                @set("_id":response.id)
                console.log(response)
        ))
        super(attr, opts)
        
    
