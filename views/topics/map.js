function(obj) {
  if (obj.type == "topic") {
    emit([obj.name, obj.tags], 1 );
  }
};