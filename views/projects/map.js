function(obj) {
  if ( obj.type == "project" && ( (obj.state == "campagne") || (obj.state == "fin") ) ) {
    emit([obj._id],obj);
  }
};