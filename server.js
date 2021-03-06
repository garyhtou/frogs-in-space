// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.

var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io").listen(server);

app.use("/css", express.static(__dirname + "/css"));
app.use("/js", express.static(__dirname + "/js"));
app.use("/assets", express.static(__dirname + "/assets"));

server.lastPlayderID = 0; // Keep track of the last id assigned to a new player

app.get("/", function(req, res) {
  res.sendFile("/index.html", { root: __dirname });
});

// listen for requests :)
const listener = server.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

io.on("connection", function(socket) {
  socket.on("newplayer", function() {
    socket.player = {
      id: server.lastPlayderID++,
      x: randomInt(100, 400),
      y: randomInt(100, 400)
    };
    socket.emit("allplayers", getAllPlayers());
    socket.broadcast.emit("newplayer", socket.player);

    socket.on("key", function(data) {
      if(socket.player.x + data.x > -5 && socket.player.x + data.x < 900 && socket.player.y + data.y < 600 && socket.player.y + data.y > 0){
        socket.player.x += data.x;
        socket.player.y += data.y;
        socket.player.d = data.d;

        if(socket.player.x < 0){
          io.emit("garden", socket.player);
          socket.player.x = randomInt(100, 400);
          socket.player.y = randomInt(100, 400);
        }
        io.emit("move", socket.player);
      }
    });
    
    socket.on("getID", function(data){
      io.emit("me", socket.player)
    })

    socket.on("chat", function(text) {
      socket.player.text = text;
      io.emit("newChat", socket.player);
    });

    socket.on("disconnect", function() {
      io.emit("remove", socket.player.id);
    });
  });
});

function getAllPlayers() {
  var players = [];
  Object.keys(io.sockets.connected).forEach(function(socketID) {
    var player = io.sockets.connected[socketID].player;
    if (player) players.push(player);
  });
  return players;
}

function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}
