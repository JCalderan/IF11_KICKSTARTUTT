function(obj) {
  if (obj.commentaires) {
	for each(var com in obj.commentaires){
		emit([obj._id],com);
	}	
  }
};