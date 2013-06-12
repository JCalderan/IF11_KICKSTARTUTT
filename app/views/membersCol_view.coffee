CollectionView = require 'views/base/collection_view'
MemberView = require 'views/member_view'

module.exports = class MembersColView extends CollectionView
  autoRender: true
  tagName: 'ul'
  className: 'membersCol-view'
  container: null
  itemView: MemberView
  
  initialize: ->
    super
    
  render: =>
    super
