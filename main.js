var app = require('express')();
var http = require('http').Server(app);
//start socket server
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/file', function(req, res){
    res.sendFile(__dirname + '/libs/file.pdf');
});

http.listen(3000, function(){
    console.log('HTTP server started on port 3000');
});

//send some message to the client on connection

io.on('connection', function(socket){
    console.log('Client connection received');

//emit a socket event with some data (this can be received by socket api in client side)
    socket.emit('sendToClient', { hello: 'world' });

//receive event named 'receivedFromClient' sent from from client side (using socket api there) and log the data
    socket.on('receivedFromClient', function (data) {
        console.log(data);
    });
});

// setInterval(()=>io.emit('sendToClient', { hello: "world" }), 2000)

//Serial data stuff

const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
var port = new SerialPort("COM8", {
           baudRate: 9600
        });

const parser = new Readline()
port.pipe(parser)
port.on('readable', function () {
  console.log('Data:', port.read())
})

parser.on('data', line => console.log(`> ${line}`))
// port.write('ROBOT POWER ON\n')

port.on('error', function(err) {
  console.log('Error: ', err.message)
})
//> ROBOT ONLINE

SerialPort.list(function (err, ports) {

  ports.forEach(function(port) {
  });
    console.log(ports[0].comName);
});

    // try {
    //     port = new SerialPort("COM7", {
    //         baudRate: 9600
    //     });
    //   } catch(err) {
    //     console.log(err)
    //   }
//
// port.pipe(parser)
// // port.close()
//
//     // // Read the port data
//     port.on("open", () => {
//       console.log('serial port open');
//     });
//
//
//
//     parser.on('data', data =>{
//       console.log('got word from arduino:', data);
//     });



    // Require the serialport node module
    // var serialport = require('serialport');
    // var SerialPort = serialport.SerialPort;// Open the port
    // var port = new serialport("COM7", {
    //     baudRate: 9600,
    //     //parser: serialport.parsers.readLine("\n")
    // });// Read the port data
    // port.on("open", function () {
    //     console.log('open');
    //     port.on('data', function(data) {
    //         console.log(data);
    //     });
    // });
