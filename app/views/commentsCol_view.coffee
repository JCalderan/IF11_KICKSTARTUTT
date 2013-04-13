CollectionView = require 'views/base/collection_view'
CommentView = require 'views/comment_view'

module.exports = class CommentsColView extends CollectionView
  autoRender: true
  tagname: 'div'
  className: 'commentsCol-view'
  container: null
  itemView: CommentView