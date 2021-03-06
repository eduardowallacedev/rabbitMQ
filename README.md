# rabbitMQ
Este projeto tem com objetivo atender a arquitetura de mensageria do projeto Startup One da FIAP. 

Integração do webchat IRC com o RabbitMQ

Requisitos:
1) Node instalado
2) RabbitMQ instalado

**Topologia:
Direct Exchange :** O algoritmo de roteamento por trás de uma troca direta é simples, uma mensagem vai para as filas na qual a binding key corresponde exatamente à routing key da mensagem.

![Direct Exchange](https://www.tutlane.com/images/rabbitmq/rabbitmq_direct_exchange_process_flow_diagram.PNG)

<ul>
    <li>Cliente interagindo no canal</li>
</ul>

<img src="img/4.png">

<ul>
    <li>Processos executando em backgroud e consumindo mensagens do WebChat</li>
</ul>

<img src="img/3.png">

<ul>
    <li>Filas criadas dinamicamente no RabbitMQ conforme conexões existentes</li>
</ul>

<img src="img/5.png">

<ul>
    <li>Painel do RabbitMQ com o overview das conexões e mensagens processadas</li>
</ul>

<img src="img/6.png">


Instruções de execução local:
1) A porta 8080 deve estar liberada;
2) Acessar o portal IRC pelo link https://webchat.freenode.net/#fiap35scj para interagir no canal;
3) Iniciar os serviços principais do projeto para execução local:
    ```   
    consumer.js
    irc.js
    producer.js
    server.js
    banco.js
    ```
4) Acessar o link do servidor após iniciado 
    http://localhost:8080/