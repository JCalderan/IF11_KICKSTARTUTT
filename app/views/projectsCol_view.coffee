CollectionView = require 'views/base/collection_view'
ProjectItemView = require 'views/projectItem_view'

module.exports = class ProjectsColView extends CollectionView
  autoRender: true
  tagName: 'ul'
  className: 'projectCol-view thumbnails well well-small'
  container: null
  itemView: ProjectItemView
  
  initialize: ->
    super
    console.log "nouvelle projectsCol_view"