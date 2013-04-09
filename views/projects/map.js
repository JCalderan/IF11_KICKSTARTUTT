function(obj) {
  if (obj.nom_projet) {
    emit([obj.note_moyenne, obj.date_creation,obj.type_projet,obj.niveau_etude],obj);
  }
};