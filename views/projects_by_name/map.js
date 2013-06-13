function(obj) {
  if (obj.type == "project") {
    emit([obj.name],1);
  }
};
