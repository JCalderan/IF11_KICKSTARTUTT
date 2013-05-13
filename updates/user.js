function(old, req) {
    
  var user = JSON.parse(req.body);
  
  const timestamp = new Date();
  user.last_modification_date = [
    timestamp.getFullYear(), 
    timestamp.getMonth()+1, 
    timestamp.getDate(),
    timestamp.getHours(),
    timestamp.getMinutes()
  ];

  return [user, "User modified at " + timestamp ];
}