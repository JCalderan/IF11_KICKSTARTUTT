function(obj) {
  if (obj.nom_projet) {
    emit([obj.nom_projet],obj);
  }
};