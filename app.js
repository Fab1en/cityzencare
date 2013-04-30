var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

// serve static files
app.use(express.static(__dirname + '/public'));

// handle request from the box
app.use(express.bodyParser());
app.post('/push', function(req, res){

    // parse request parameters
    var params = [];
    for(var i=0; i<req.body.Lines.length; i++){
        params = params.concat(req.body.Lines[i].split(','));
    }
    
    // send the position to all clients
    io.sockets.emit('position', [params[3], params[2]]);
    
    res.send('Done!');
});

// start the server
server.listen(8080);
