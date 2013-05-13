function(obj) {
  if (obj.type == "project") {
    for each(topic in obj.topics) {
      emit([topic],obj);
    }
  }
};