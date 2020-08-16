// Escutar as msg no IRC e colocar na fila "fiap.35scj.mensagens"

var irc = require('irc');
var helpers = require('./helpers');
var amqp = require('amqplib');
var client = new irc.Client('chat.freenode.net', 'rabbitbot', {
    channels: ['#fiap35scj']
});

amqp.connect('amqp://localhost')
    .then(function(conn) {
        console.log('RabbitMQ conectado!');

        return conn.createChannel();
    })

.then(function(ch) {
    client.addListener('message', function(from, to, message) {
        console.log('Nova mensagem recebida: %s : %s', from, message);

        var buff = helpers.JSONtoBuffer({
            from: from,
            to: to,
            message: message
        })

        ch.sendToQueue('fiap.35scj.mensagens', buff, {
            contentType: 'application/json'
        })
    });
});