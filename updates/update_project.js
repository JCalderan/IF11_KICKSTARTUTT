function(old, req) {
    
    var update = JSON.parse(req.body);
    
    var d = new Date();
    update.updated_at = d.valueOf();
    
    return [update, "Projet '"+update.name+"' mis à jour à " + timestamp];
}