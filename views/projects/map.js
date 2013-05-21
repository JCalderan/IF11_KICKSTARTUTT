function(obj) {
  if ( obj.type == "project" && obj.state > 1) {
    emit([obj._id],obj);
  }
};
