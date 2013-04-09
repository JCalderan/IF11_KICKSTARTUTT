function(obj) {
  if (obj.topics) {
	for each(var topic in obj.topics){
		emit([topic],obj);
	}
  }
};