template = require 'views/templates/projectItem'
View = require 'views/base/view'
simpleObjectCollection = require 'models/simpleObject_collection'
CommentColView = require 'views/commentsCol_view'

mediator = require "mediator"

module.exports = class ProjectItemView extends View
  #class attributes
  autoRender: true
  template: template
  className: "projectItem row-fluid"
  container: null
  
  #custom attributes
  raty_img : null
  commentCol: null
  commentColView: null
  
  initialize: ->
    super
    #custom init
    brunch_img = "/brunch/images/"
    @raty_img = "starHalf": brunch_img+"star-half.png", "starOff": brunch_img+"star-off.png", "starOn": brunch_img+"star-on.png", "cancelOff": brunch_img+"cancel-off.png", "cancelOn": brunch_img+"cancel-on.png"
    @commentCol = new simpleObjectCollection(couchView: "comments", couchKey: @model.attributes._id, couchQueryParams: {"limit":3})
    
    #event handler
    @listenTo @model, "change", @render
    @delegate "click", ".comments_number", @initLoadComments
    @delegate "click", ".hide_comments", @hideComments
  
  initLoadComments: (event)->
    @commentCol.fetch()
    @commentColView.render()
    @showComments(event)

  render: =>
    super
    @setProjectLinks()
    @setCommentLinks()
    @setRaty()
    #init comment_list subview
    @commentColView = new CommentColView(collection: @commentCol, container: "#comment_list_"+@model.attributes._id)
    @subview 'commentCol', @commentColView
    
  setRaty: =>
    raty_el = $(@el).find(".star_rating")
    raty_el.raty()
    raty_el.raty("set", @raty_img)
    raty_el.raty("score", if @model.attributes.note_moyenne then (@model.attributes.note_moyenne*0.25) else 0)
    raty_el.raty('readOnly', true)
    
  setProjectLinks: =>
    $(@el).find(".toResProject").attr("href", "/view/project/"+@model.attributes._id)
    $(@el).find(".toResTags").each(
        ->
            $(@).attr("href", "/col/projets_by_topic/"+$(@).text())
    )

  setCommentLinks: =>
    comments_nbr = if @model.attributes.commentaires then @model.attributes.commentaires.length else 0
    $(@el).find(".comments_number").html(comments_nbr+" Commentaires")

  hideComments: (event)->
    if event
        event.preventDefault()
    $(@el).find(".comments_container").slideUp()
    
  showComments: (event)->
    if event
        event.preventDefault()
    $(@el).find(".comments_container").slideDown()
        