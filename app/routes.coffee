module.exports = (match) ->
  match '', 'home#index'
  match 'col/:collection', 'home#list_projects'
  match 'col/:collection/:filter', 'home#list_projects'
  match 'view/project/:id', 'home#get_project'

