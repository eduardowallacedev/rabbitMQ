var amqp = require('amqplib');

//Concetando com o RabbitMQ
amqp.connect('amqp://localhost')
    .then(function(conn) {
        console.log('Conectado!');

        return conn.createChannel();
    })
    .then(function(ch) {
        console.log('Canal criado!');

        setInterval(function() {
            console.log('-> Enviando mensagem...')
            ch.sendToQueue('fiap.35scj.mensagens', new Buffer('Novo cadastro incluído'));
        }, 1000)

    })