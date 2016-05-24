window.onload = function () {
    
    WebFontConfig = {
    google: { families: [ 'Chewy::latin' ] }
    };
    
    (function() {
    var wf = document.createElement('script');
    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
    })();

    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create });
    
    //Carga la imagen prediseñada en donde se incluyen las instrucciones del juego
    function preload() {
        game.load.image('instrucciones', 'images/instrucciones.png');
    }
    
    //Variables usadas
    var instruccionsImage;
    var startPrompt;

    //Función crear. Inserta la imagen y la acción para continuar con el juego
    function create() {
        instruccionsImage = game.add.tileSprite(0, 0, 2000, 1200, 'instrucciones');
        instruccionsImage.inputEnabled = true;
        instruccionsImage.events.onInputDown.addOnce(startGame, game);
        
        //startPrompt = game.add.bitmapText(20, 30, {font: "Chewy"}, 'Toca para iniicar', 24 );
        startPrompt = game.add.text(200, 480, 'Toca para contnuar', { font: "Chewy", fill: "#DF01D7", stroke: "#8A0886", strokeThickness: 2 });
        instruccionsImage.resize();
        
    }
    
    //Funcion startGame, inicia el juego cuando se da click sobre la interfaz
    function startGame(pointer) {
        
        window.location.href = './index.html';
    }
    
}