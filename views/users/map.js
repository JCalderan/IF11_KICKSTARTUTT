function(obj) {
  if (obj.nom_utilisateur) {
	var user_infos = obj.infos;
   	emit([user_infos.type, user_infos.branche, user_infos.semestre],obj);
  }
};