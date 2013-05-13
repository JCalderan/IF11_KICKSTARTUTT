function(obj) {
  if (obj.type == "comment") {
    emit([obj.target_id], obj );
  }
};