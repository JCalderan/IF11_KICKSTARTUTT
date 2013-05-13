function(head, req) {

  start({"headers":{"Content-Type":"application/json;"}});
  
  var data = {
    projects = [];
  };
 
  while (row = getRow()) {
    data.projects.push({
        id : row.value._id,
        marks : row.value.marks,
        average : 0
    })
  }
  
  for each(project in data.projects]) {
    var sum = 0;
    for each(mark in project.marks) {
        sum += mark.mark;
    }
    project.average = (sum / project.marks.length);
  }
  
  data.projects.sort(compareAverages);
  
  function compareAverages(a,b) {
    if (a.average > b.average)
       return -1;
    if (a.average < b.average)
      return 1;
    return 0;
  }
  
  return data;
}