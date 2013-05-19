template = require 'views/templates/project'
View = require 'views/base/view'
mediator = require 'mediator'

simpleObjectCollection = require 'models/simpleObject_collection'
CommentColView = require 'views/commentsCol_view'

module.exports = class ProjectView extends View
  autoRender: true
  className: 'projectView'
  container: null
  template: template
  
  #custom attr
  commentCol: null
  commentColView: null
  
  initialize: ->
    super
    @commentCol = new simpleObjectCollection(couchView: "comments", couchKey: @model.attributes._id, couchQueryParams: {"limit":3})
    @listenTo @model, "change", @render
    @delegate "click", "#comments_pill_link", @initLoadComments

  render: =>
    super
    @setCommentLinks()
    #init comment_list subview
    @commentColView = new CommentColView(collection: @commentCol, container: "#comments")
    @subview 'commentCol', @commentColView

  initLoadComments: (event)->
    console.log @commentCol
    @commentCol.fetch()
    @commentColView.render()
    
  setCommentLinks: =>
    comments_nbr = if @model.attributes.commentaires then @model.attributes.commentaires.length else 0
    #$(@el).find(".comments_number").html(comments_nbr+" Commentaires")

  #hideComments: (event)->
  #  if event
  #      event.preventDefault()
  #  $(@el).find(".comments_container").slideUp()
  #  
  #showComments: (event)->
  #  if event
  #      event.preventDefault()
  #  $(@el).find(".comments_container").slideDown()
  #  
