function(obj) {
  if (obj.type == "project") {
    emit([obj._id],obj);
  }
};