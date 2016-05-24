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
    
    var game = new Phaser.Game(800, 480, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });
    
    //Texto que a mostrar en pantalla
    var content = [
    " ",
    "Hola soy Puchiko!",
    "y me encanta el chile",
    " ",
    "Me ayudas a encontrarlos?",
    " ",
    "Sobretodo los chiles gigantes!",
    "Son mis favoritos!",
    "    ",
    "Da click en instrucciones",
    "para saber como ayudarme",
    "Vamos!!! ...",
    ];
    
    //Variables empleadas
    var text;
    var index = 0;
    var line = '';
    
    
    //Se carga la imagen empleada en el inicio
    function preload() {
        game.load.image('hello', 'images/puchiko_hello.png');
    }
    
    //Funcion create. Esta crea la imagen anterior y el texto con las propiedades deseadas
    function create() {
        game.add.sprite(0, 0, 'hello');
        text = game.add.text(20, 30, '', { font: "Chewy", fill: "#DF01D7", stroke: "#8A0886", strokeThickness: 2 });
        text.fontSize = 60;
        nextLine();
    }   
    
    //Funcion updateLine. Es la que permite actulizar el mensaje en pantalla
    function updateLine() {

        if (line.length < content[index].length)
        {
            line = content[index].substr(0, line.length + 1);
            // text.text = line;
            text.setText(line);
        }
        else
        {
            // Espera dos segundo, despues inicia una nueva linea
            game.time.events.add(Phaser.Timer.SECOND * 2, nextLine, this);
        }
        
    }
    
    //Funcion nextLine. Dentro de su logica se encuentra como hacer para que se muestre la siguiente linea de content
    function nextLine() {

        index++;

        if (index < content.length)
        {
            line = '';
            game.time.events.repeat(80, content[index].length + 1, updateLine, this);
        }

    }

}