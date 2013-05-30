module.exports = (match) ->
  match '', 'home#index'
  match 'col/:collection', 'home#list_collection'
  match 'col/:collection/:filter', 'home#list_collection'
  match 'view/:type/:id', 'home#get_typeView'
  match 'view/signup', 'home#signup'
  match 'view/projectLauncher', 'home#launch_project'
  match 'view/advanceSearch', 'home#advanceSearch'
  match 'view/project/edit/:id', 'home#edit_project'
