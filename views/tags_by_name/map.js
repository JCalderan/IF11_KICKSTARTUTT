function(obj) {
  if (obj.type == "project") {
     obj.tags.forEach(function(tag){
         emit(tag,1);
     });
  }
};
