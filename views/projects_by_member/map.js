function(obj) {
  if (obj.type == "project") {
    for each(member in obj.members) {
      emit([member.id_user],obj);
    }
  }
};