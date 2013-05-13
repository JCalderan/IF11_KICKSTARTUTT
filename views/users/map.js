function(obj) {
  if (obj.type == "user") {
    emit([obj._id],obj);
  }
};