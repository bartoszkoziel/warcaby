let game;
let net;
let ui;
var socket = io();
window.onload = () => {
    game = new Game();
    net = new Net();
    ui = new Ui();
}