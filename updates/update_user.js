function(old, req) {
   
  var updated = old;
  
  var u = JSON.parse(req.body);
  
  for(var attribute in updated) {
    if ( u[attribute] && !(u[attribute].toString() == updated[attribute].toString()) ) {
      updated[attribute] = u[attribute];
    }
  }

  updated.updated_at = new Date().valueOf();

  return [updated, "User "+updated.name+" "+updated.surname+" modified at " + timestamp ];
}