CollectionView = require 'views/base/collection_view'
ProjectItemView = require 'views/projectItem_view'

module.exports = class ProjectsColView extends CollectionView
  autoRender: true
  tagname: 'div'
  className: 'projectCol-view'
  container: null
  itemView: ProjectItemView
  
  initialize: ->
    super
    console.log "nouvelle projectsCol_view"
