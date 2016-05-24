window.onload = function () {
    
    //Fonts de google
    
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

    //Se crea el canvas de nombre game
    var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'credits', { preload: preload, create: create });
    

    //Este es el contenido a mostrar
    var content = [
        "El lenguaje en el que se program\xf3 este videojuego fue en Java Script.",
        "Empleando Phaser, un framework para realizar juegos de escritorio y servidores m\xf3viles; ",
        "soporta Canvas y WebGL.",
        "",
        "Aqu\xed se emple\xf3 Canvas.",
        "",
        "La tem\xe1tica del videojuego es de inveci\xf3n propia: Puchiko, el personaje principal, ",
        "surge de la nada al igual que su gusto por el chile.",
        "",
        "Si se desea m\xe1s informaci\xf3n de Phaser se puede hacer ",
        "click sobre Puchiko para ser redirijido y ver de d\xf3nde ",
        "se accedi\xf3  a la documentaci\xf3n de este framework.",
        "",
        "",
        "",
        "Este trabajo fue producido y distribuido por: ",
        "Marisol Rodr\xedguez Cuevas",
        "Estudiante de ingener\xeda mecatr\xf3nica de la Universidad Nacional"
    ];

    //Variables empleadas
    var line = [];

    var wordIndex = 0;
    var lineIndex = 0;
    var image;

    var wordDelay = 120;
    var lineDelay = 400;

    function preload(){
        game.load.image('end', 'images/happy.png');
    }

    //Funcion crete. Crea el texto en el canvas game
    function create() {

        text = game.add.text(32, 32, '', { font: "Chewy", fill: "#DF01D7", stroke: "#8A0886", strokeThickness: 0  });
        text.fontSize = 20;        
        image = game.add.sprite(650, 350, 'end');
        image.anchor.setTo(0.5, 0.5);   
        image.scale.setTo(0.5);
        image.inputEnabled = true;
        image.events.onInputDown.addOnce(startGame, game);
        

        //Llama a la funcion nextLine
        nextLine();

    }
    
    //Funcion nextLine, es la funcion que contiene la logica para mostrar el texto linea a linea
    function nextLine() {

        if (lineIndex === content.length)
        {
            return;
        }

        //Separa(split) la linea actual en espacios. Asi la agrega en un arreglo
        line = content[lineIndex].split(' ');

        //Reinicia la variable wordIndex- La primera palabra en cada linea
        wordIndex = 0;

        //Llama la funcion 'nextWord'
        game.time.events.repeat(wordDelay, line.length, nextWord, this);

        //Avanza a la siguiente linea
        lineIndex++;

    }

    //Funcion 'nextWord'. Tiene la logica para concatenar las palabras en cada linea
    function nextWord() {

        //Agrega la siguiente palabra en un string, seguido por un espacio
        text.text = text.text.concat(line[wordIndex] + " ");

        //Avanza el indice de la palabra
        wordIndex++;

        //Si es la ultima palabra...
        if (wordIndex === line.length)
        {
            //Agrega un salto de linea
            text.text = text.text.concat("\n");

            //Obtiene la siguiente linea 
            game.time.events.add(lineDelay, nextLine, this);
        }

    }
    
    //Funcion startGame, inicia el juego cuando se da click sobre la interfaz
    function startGame(pointer) {
        
        window.location.href = 'http://phaser.io/learn/chains';
    }
};