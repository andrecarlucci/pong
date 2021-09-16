var WINDOW_HEIGHT = 400,
    WINDOW_WIDTH = 600,
    SPEED = 300;

var mainState = {
    preload: function() {      
        game.load.image('wall', 'images/bar.png');
        game.load.image('ball', 'images/ball.png');
    },
    
    create: function() {
       game.world.enableBody = true; 

       this.p1 = game.add.sprite(30, game.world.centerY, 'wall');
       this.p1.body.immovable = true;
       this.p1Up = game.input.keyboard.addKey(Phaser.Keyboard.W);
       this.p1Down = game.input.keyboard.addKey(Phaser.Keyboard.S);

       this.p2 = game.add.sprite(WINDOW_WIDTH - 30, game.world.centerY, 'wall');
       this.p2.body.immovable = true;
       this.p2Up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
       this.p2Down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

       this.ball = game.add.sprite(game.world.centerX, game.world.centerY, 'ball');
       this.ball.body.velocity.x = 200;
       this.ball.body.bounce.set(1);
       this.ball.body.collideWorldBounds = true;
    },
    
    update: function() {
        
        if (this.p1Up.isDown) {
            this.p1.body.velocity.y = -SPEED;
        }
        else if (this.p1Down.isDown) {
            this.p1.body.velocity.y = SPEED; 
        }
        else {
            this.p1.body.velocity.y = 0;
        }

        if (this.p2Up.isDown) {
            this.p2.body.velocity.y = -SPEED;
        }
        else if (this.p2Down.isDown) {
            this.p2.body.velocity.y = SPEED; 
        }
        else {
            this.p2.body.velocity.y = 0;
        }

        game.physics.arcade.collide(this.ball, this.p1, this.ballCollided);
        game.physics.arcade.collide(this.ball, this.p2, this.ballCollided);

        if (this.ball.x < this.p1.x || this.ball.x > this.p2.x) {
            this.ballLost();
        }
    },

    ballCollided: function(ball, player) {
        ball.body.velocity.y = ((Math.random() * 50) + player.body.velocity.y);
    },

    ballLost: function() {
        this.ball.reset(game.world.centerX, game.world.centerY);
        this.ball.body.velocity.set(-200,0);
    }
};

var game = new Phaser.Game(WINDOW_WIDTH, WINDOW_HEIGHT, Phaser.AUTO, 'gameDiv', mainState);