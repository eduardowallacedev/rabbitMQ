// Leitura das msg da fila e gravar no DB

var amqp = require('amqplib');
var level = require('level-party');
var db = level('./db');
var uuid = require('uuid');

//Concetando com o RabbitMQ
amqp.connect('amqp://localhost')
    .then(function(conn) {
        console.log('Conectado!');

        return conn.createChannel();
    })
    .then(function(ch) {
        console.log('Canal criado!');

        ch.prefetch(1)

        ch.consume('fiap.35scj.mensagens', function(msg) {
            db.put(uuid.v4(), msg.content.toString(), function(err) {
                if (err) {
                    console.err(err.stack);
                    return ch.nack(msg);
                }

                console.log('A mensagem foi salva no banco de dados!')
                ch.ack(msg);
            });
        });
    });