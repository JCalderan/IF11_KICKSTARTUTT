module.exports = (match) ->
  match '', 'home#index'
  match 'view/projects', 'home#list_projects'
  match 'view/projects/:filter', 'home#list_projects'
  match 'view/project/:id', 'home#get_project' 
