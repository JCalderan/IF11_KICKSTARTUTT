function(obj) {
  if ( obj.type == "project" && ( (obj.state == 2) || (obj.state == 3) ) ) {
    emit([obj._id],obj);
  }
};
