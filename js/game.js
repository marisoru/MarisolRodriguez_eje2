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
    
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render });
    
    //Función preload: se cargan los elementos a utilizar
    function preload() {
            
        //Carga el mapa generado por Json y los sprites utilizados
        game.load.tilemap('level1', 'js/tiles.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles-1', 'images/tiles-1.png');
        //Carga a el personaje principal: puchiko
        game.load.spritesheet('puchiko', 'images/puchiko.png', 130, 150, 8);
        //Carga los vegetales que estarán en el juego
        game.load.spritesheet('veggies', 'images/fruitsnveg.png', 32, 32);
        //Carga el sprite flecha
        game.load.image('arrow', 'images/arrow.png');
        //Carga el fondo del juego
        game.load.image('wood', 'images/background.png');        
                    
    }
    
    //Variables a utilizar (globales)
    
    var map;
    var tileset;
    var layer;
    
    var puchiko;
    var group;
    var cursors;
    var arrow;
    var emitter;
    var bigChillli;
    var chilisList = new Array();
    var chili1 = false;
    var background;
    var winText;
    var done = false;
    
    //Funcion create. Se realiza la logica de lo que aparecera en pantalla 
    function create() {
        game.edge =true;
        
        //Se generan las dimensiones del mundo del juego
        game.world.setBounds(0, 0, 2000, 1200);
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //Se especifica que el fondo sera "wood" ya antes cargado
        background = game.add.tileSprite(0, 0, 2000, 1200, 'wood');
        //El fondo se acomoda a la cámara(lo que ve el jugador)
        background.fixedToCamera = true;
                
        //Creacion del mapa-mundo, del juego
        map = game.add.tilemap('level1');
        map.addTilesetImage('tiles-1');
        map.setCollisionByExclusion([ 13, 14, 15, 16, 46, 47, 48, 49, 50, 51 ]);
        //"Capa de patrones 1" es el nombre del mapa en el archivo Json
        layer = map.createLayer('Capa de Patrones 1');
        layer.resizeWorld();
        
        //Se crea el personaje principal: Puchiko
        puchiko = game.add.sprite(1960, 200, 'puchiko');
        puchiko.anchor.setTo(0.5, 0.5);                    
        puchiko.scale.setTo(0.8);
        
        //Aqui los sprites necesarios para dar movimiento a Puchiko
        puchiko.animations.add('right', [2,3]);
        puchiko.animations.add('left', [0,1]);
        puchiko.animations.add('up', [4,5]);
        puchiko.animations.add('down', [0,1]);

        //Las animaciones necesarias segun ciertos movientos para Puchiko
        puchiko.animations.play('right', 5, true);
        puchiko.animations.play('left', 5, true);
        puchiko.animations.play('up', 5, true);
        puchiko.animations.play('down', 5, true);
        
        //Se crea la flecha, indicando en donde inicia en el mapa    
        arrow = game.add.sprite(1960, 200, 'arrow');
        arrow.anchor.setTo(0.5, 0.5);  
        
        //Se asigna grupo como ARCADE
        group = game.add.physicsGroup(Phaser.Physics.ARCADE);
        
        //Tanto Puchiko como la flecha y el grupo de frutas, se habilitan en modo ARCADE y asi poder hacer uso de estas funciones
        game.physics.enable(puchiko, Phaser.Physics.ARCADE);
        game.physics.enable(arrow, Phaser.Physics.ARCADE);
                
        //No permite que ni Puchiko, ni la flecha salgan del mapa-mundo
        arrow.body.collideWorldBounds = true;
        puchiko.body.collideWorldBounds = true;
        
                
        //Con este ciclo for se generan de manera random las frutas que hacen parte del mapa
        for (var i = 0; i < 100; i++) {
            var c = group.create(game.rnd.between(0, 1700), game.rnd.between(0, 1100), 'veggies', game.rnd.between(0, 35));
            //body.mass determina la fuerza opuesta que generará al ser enfrentado por Puchiko
            c.body.mass = -100;
        }

        //En este ciclo se generan solomante chiles, lo cuales tendran propiedades especiales
        for (var i = 0; i < 15; i++){   
            var c = group.create(game.rnd.between(100, 770), game.rnd.between(0, 570), 'veggies', 17);
        }
        
        //Se crean 3 chiles usando arreglos. Los tres con posiciones aleatorios
        for (var chi = 0; chi < 3; chi++ ){
            bigChillli = game.add.sprite(game.rnd.between(200, 1750), game.rnd.between(100, 1000), 'veggies', 17); 
            bigChillli.anchor.setTo(0.5, 0.5);    
            bigChillli.scale.setTo(2);
            chilisList.push(bigChillli);
        }
            
        //El juego se movera segun el avance de la flecha
        game.camera.follow(arrow);

        //Se crean cursores
        cursors = game.input.keyboard.createCursorKeys();        
        
        //Los emitter seran frutas que estaran saliendo constantemente de un punto en el mapa
        emitter = game.add.emitter(game.world.centerX, game.world.centerY, 250);
        emitter.makeParticles('veggies', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20], 200, true, true);
        
        //Se especifican caracteristicas de como saldran estas frutas y verduras
        emitter.minParticleSpeed.setTo(-200, -300);
        emitter.maxParticleSpeed.setTo(200, -400);
        emitter.gravity = 150;
        emitter.bounce.setTo(0.5, 0.5);
        emitter.angularDrag = 30;
        emitter.start(false, 8000, 400);
        
        
    }
    
    //Funcio update. Esta dara las acciones a medida que se ejecuta el juego
    function update() {
          
        //Con la función .collide se indica la colisión entre los elementos. Puchiko choka con todo.
        game.physics.arcade.collide(puchiko, layer);
        game.physics.arcade.collide(puchiko, group, collisionHandler, processHandler, this)
        game.physics.arcade.collide(puchiko, emitter, collisionHandler, processHandler, this)
        game.physics.arcade.collide(chilisList[0], emitter, collisionHandler, processHandler, this)
        game.physics.arcade.collide(chilisList[1], emitter, collisionHandler, processHandler, this)
        game.physics.arcade.collide(chilisList[2], emitter, collisionHandler, processHandler, this)
        
        //Puchiko inicia con velocidad 0. Es decir quieta
        puchiko.body.velocity.x = 0;
        puchiko.body.velocity.y = 0;
        
                        
        //Ejecuta los movimientos segun las teclas presionadas
        if (cursors.left.isDown)
        {
            puchiko.body.velocity.x = -200;
            puchiko.animations.play('left', 5, true);
        }
        else if (cursors.right.isDown)
        {
            puchiko.body.velocity.x = 200;
            puchiko.animations.play('right', 5, true);
        }

        if (cursors.up.isDown)
        {
            puchiko.body.velocity.y = -200;
            puchiko.animations.play('up', 5, true);
        }
        else if (cursors.down.isDown)
        {
            puchiko.body.velocity.y = 200;
            puchiko.animations.play('down', 5, true);
        }
        
        //La flecha gira a medida que se mueve y segun sea necesario
        arrow.rotation = game.physics.arcade.moveToPointer(arrow, 60, game.input.activePointer, 2500);
        
        
        //Logica para que el jugador gane el juego
        if (puchiko.world.x > (chilisList[0].world.x - 50) && puchiko.world.x < (chilisList[0].world.x + 50) && puchiko.world.y >
        (chilisList[0].world.y - 50) && puchiko.world.y < (chilisList[0].world.x + 50)){
            console.log('chile encontrado');
          chilisList[0].alpha = 0.2;
        }
        
        if (puchiko.world.x > (chilisList[1].world.x - 50) && puchiko.world.x < (chilisList[1].world.x + 50) && puchiko.world.y >
        (chilisList[1].world.y - 50) && puchiko.world.y < (chilisList[1].world.x + 50)){
            console.log('chile encontrado');
          chilisList[1].alpha = 0.2;
        }
        
        if (puchiko.world.x > (chilisList[2].world.x - 50) && puchiko.world.x < (chilisList[2].world.x + 50) && puchiko.world.y >
        (chilisList[2].world.y - 50) && puchiko.world.y < (chilisList[2].world.x + 50)){
            console.log('chile encontrado');
          chilisList[2].alpha = 0.2;
        }
        
        if( ( chilisList[0].alpha == 0.2 && chilisList[1].alpha == 0.2 ) || ( chilisList[0].alpha == 0.2 && chilisList[2].alpha == 0.2 ) || ( chilisList[1].alpha == 0.2 && chilisList[2].alpha == 0.2 )){
            game.paused = true;
            console.log('win');
            winText = game.add.text(layer.world.x + 100, layer.world.y+200, 'Vamos a jugar de nuevo', { font: "Chewy", fill: "#DF01D7", stroke: "#8A0886", strokeThickness: 2 });                                  
            winText.fontSize = 60;
            setTimeout(function(){ location.reload(); }, 3000);
            
                                
        }
       
                 
                  
        

    }
    
    function processHandler (player, veg) {

        return true;

    }
    
    //Si se colisiona con un chile pequeño este se puede comer. El chile tiene ID 17 
    function collisionHandler (player, veg) {
        if (veg.frame === 17)
        {
        veg.kill();
        }
    
    }
    
    //Funcion render. En esta funcion se muestran mensajes en pantalla
    function render() {
        game.debug.text('Se encuentra en : ' +Math.round(arrow.world.x) + ", " + +Math.round(arrow.world.y), 32, 32);
        game.debug.text('Chile gigante 1: ' +Math.round(chilisList[0].world.x) + ", " + +Math.round(chilisList[0].world.y), 32, 50 );
        game.debug.text('Chile gigante 2: ' +Math.round(chilisList[1].world.x) + ", " + +Math.round(chilisList[1].world.y), 32, 68 );
        game.debug.text('Chile gigante 3: ' +Math.round(chilisList[2].world.x) + ", " + +Math.round(chilisList[2].world.y), 32, 86 );
        //game.debug.text('Coordenada en x: ' +Math.round(arrow.world.x), 32, 32);
        //game.debug.text('Coordenada en y: ' +Math.round(arrow.world.y), 32, 50);
        
    }
    
    function reStartGame() {
        
        window.location.href = './index.html';
    }
    
};


