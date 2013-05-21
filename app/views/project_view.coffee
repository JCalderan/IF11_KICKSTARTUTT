template = require 'views/templates/project'
View = require 'views/base/view'
mediator = require 'mediator'

SimpleObjectModel = require 'models/simpleObject_model'
SimpleObjectCollection = require 'models/simpleObject_collection'
CommentColView = require 'views/commentsCol_view'

module.exports = class ProjectView extends View
  autoRender: true
  className: 'projectView'
  container: null
  template: template
  
  #custom attr
  commentCol: null
  commentColView: null
  commentOldVal: ''
  
  initialize: ->
    super
    @commentCol = new SimpleObjectCollection(couchView: "comments", couchKey: @model.attributes._id)
    @listenTo @model, "change", @render
    @delegate "click", "#comments_pill_link", @initLoadComments
    @delegate "keyup", "#new_comment_input", @setCommentCharRemaining
    @delegate "submit", "#new_comment_form", @newComment

  render: =>
    super
    @setCommentLinks()
    #init comment_list subview
    @commentColView = new CommentColView(collection: @commentCol, container: "#comments_list")
    @subview 'commentCol', @commentColView

  initLoadComments: (event)->
    console.log @commentCol
    @commentCol.fetch()
    @commentColView.render()
    
  setCommentLinks: =>
    comments_nbr = if @model.attributes.commentaires then @model.attributes.commentaires.length else 0
    #$(@el).find(".comments_number").html(comments_nbr+" Commentaires")
    
  setCommentCharRemaining: (event)->
    remaining_char = 320 - $(event.target).val().length
    if remaining_char >= 0
        $(@el).find("#comment_char_remaining").text(remaining_char)
        @commentOldVal = $(event.target).val()
    else
        $(event.target).val(@commentOldVal)

  newComment: (event)->
    event.preventDefault()
    content = $(@el).find("#new_comment_input").val()
    newCom = new SimpleObjectModel(type: "comment", creation_date: new Date(), author_id: "auteur", target_id: @model.get("_id"), message: content)
    newCom.save()
    @commentCol.add(newCom)
    console.log(@commentCol)
