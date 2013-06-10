CollectionView = require 'views/base/collection_view'
MemberView = require 'views/member_view'

module.exports = class MembersColView extends CollectionView
  autoRender: true
  tagname: 'div'
  className: 'membersCol-view'
  container: null
  itemView: MemberView