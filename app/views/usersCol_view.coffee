CollectionView = require 'views/base/collection_view'
UserItemView = require 'views/userItem_view'

module.exports = class UsersColView extends CollectionView
  autoRender: true
  tagName: 'ul'
  className: 'userCol-view thumbnails well well-small'
  container: null
  itemView: UserItemView
  
  initialize: ->
    super