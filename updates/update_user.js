function(old, req) {
    
  var user = JSON.parse(req.body);
  
  var d = new Date();
  user.updated_at = d.valueOf();

  return [user, "User modified at " + timestamp ];
}