function(head, req) {
    // !json templates.test
    // !code lib/mustache.js
    start({"headers":{"Content-Type":"text/html;charset=utf-8"}});
    
    var data = {

    }
    
    while (row = getRow()) {
        
    }
     
    return Mustache.to_html(templates.test, data);
}