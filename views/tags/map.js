function(obj) {
  if (obj.type == "topic") {
    for (var tag in obj.tags) {
      emit([obj.name, obj.tags[tag]], 1 );
    }
  }
};