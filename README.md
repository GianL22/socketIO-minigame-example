# STEAL OR NO STEAL GAME 💼
## What is this?

A technical demonstration of socket-based multiplayer interaction, Briefcase Duel is a simple game where players connect to a server and engage in a series of one-on-one duels. Each player chooses a briefcase that is randomly assigned a "SAFED" or "ELIMINATED" status, and their opponent must send a "steal" or "pass" command to the server. The server then resolves the outcome and sends the result back to the clients.
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(2, 1fr); gap: 8px;">
        <img src="docs/1.png" style="max-width: 33%;"/>
        <img src="docs/2.png" style="max-width: 33%;"/>
        <img src="docs/3.png" style="max-width: 33%;"/>
        <img src="docs/4.png" style="max-width: 33%;"/>
        <img src="docs/5.png" style="max-width: 33%;"/>
        <img src="docs/6.png" style="max-width: 33%;"/>
    </div>

## Features
* Crear y entrar a salar
* Seleccionar rival y maletin
* Robar o no robar?
* Usar poderes 

## Technologies
### Server
* [Nodejs](https://nodejs.org/en) 
* [Express](https://expressjs.com/)
* [SocketIO](https://socket.io/)
### Client
* [Unity](https://unity.com/es)
* [UnitySocketIO](https://github.com/itisnajim/SocketIOUnity)

## How to run it.
### Server
Build Docker Image 
```bash
cd server
docker build --tag example-image .
```
Run Container
```bash
docker container run -d --name game-server example-image
```
### Client
Drop the assets folder in a new Unity project
