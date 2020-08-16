// Recupera msg do DB

var amqp = require('amqplib');
var level = require('level-party');
var db = level('./db');
var helpers = require('./helpers');

//Concetando com o RabbitMQ
amqp.connect('amqp://localhost')
    .then(function(conn) {
        console.log('Conectado!');

        return conn.createChannel();
    })
    .then(function(ch) {
        console.log('Canal criado!');

        ch.prefetch(1)
        ch.consume('banco', function(msg) {
            console.log('Requisição recebida %s', msg.properties.replyTo);
            var dados = [];

            db.createValueStream()
                .on('data', function(value) {
                    dados.push(JSON.parse(value));
                })
                .on('end', function() {
                    ch.sendToQueue(msg.properties.replyTo, helpers.JSONtoBuffer(dados));
                    ch.ack(msg);
                });
        });
    });