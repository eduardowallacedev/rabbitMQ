// Servidor HTTP

var amqp = require('amqplib');
var http = require('http');


//Concetando com o RabbitMQ
amqp.connect('amqp://localhost')
    .then(function(conn) {
        http.Server(function(req, res) {
            var channel = null;

            conn.createChannel()
                .then(function(ch) {
                    channel = ch;
                    return ch.assertQueue('', {
                        exclusive: true,
                        autoDelete: true
                    });
                })
                .then(function(q) {

                    // Esperando resposta do cliente
                    channel.consume(q.queue, function(msg) {
                        res.writeHead('200', {
                            'Content-Type': 'application/json'
                        });

                        res.end(msg.content);
                    }, {
                        noAck: true
                    });

                    // Envia mensagens para a fila
                    channel.sendToQueue('banco', new Buffer(''), {
                        replyTo: q.queue
                    })
                })
        }).listen(8080);
    });