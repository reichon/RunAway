window.focus();
enchant();　//「参考にした」以外は自分で書いた

function Character(image,frame,width,height,speed){
    this.image=image;
    this.frame=frame;
    this.width=width;
    this.height=height;
    this.speed=speed;
}

window.onload = function () {
    var game = new Game(500, 500);
    game.fps = 20;
    game.preload("./pic/chara0.gif", "./pic/chara1.png", "./pic/slime.png", "./pic/icon0.png", "./pic/bochi.jpeg");

    game.onload = function () {

        //キャラクターのデータを設定する　参考にした
        var chara=new Array();
        chara[0]=new Character("./pic/chara1.png",[1, 1, 2, 2],32,32,130);//くま１
        chara[1]=new Character("./pic/chara1.png",[6, 6, 7, 7],32,32,130);//くま２
        chara[2]=new Character("./pic/slime.png",[0, 0, 1, 1],32,32,150);//スライム
        chara[10]=new Character("./pic/icon0.png",[16],16,16,3);//バナナ
        
        var scene = game.rootScene;
        var background = new Sprite(500, 500);
        var BACKGROUND_IMAGE = "./pic/bochi.jpeg";
        background.image = game.assets[BACKGROUND_IMAGE];
        game.rootScene.addChild(background);

        //キャラ
        var sprite = new Sprite(32, 32);
        sprite.x = 250;
        sprite.y = 250;

        var image = new Surface(96, 128);
        image.draw(game.assets["./pic/chara0.gif"], 0, 0, 96, 128, 0, 0, 96, 128);
        sprite.image = image;

        //キャラ動く
        var SPEED = 4;
        var player_move_range_x = game.width - sprite.width;
        var player_move_range_y = game.height - sprite.height;
        
        sprite.direction = 0;
        sprite.walk = 1;
        
        //キー情報
        sprite.onenterframe = function () {
            var input = game.input;
            if (input.left) {
                this.direction = 1;
                this.x -= SPEED;
                if (!(game.frame % 3)) {
                    this.walk++;
                    this.walk %= 3;
                }
            }
            if (input.right) {
                this.direction = 2;
                this.x += SPEED;
                if (!(game.frame % 3)) {
                    this.walk++;
                    this.walk %= 3;
                }
            }
            if (input.up) {
                this.direction = 3;
                this.y -= SPEED;
                if (!(game.frame % 3)) {
                    this.walk++;
                    this.walk %= 3;
                }
            }
            if (input.down) {
                this.direction = 0;
                this.y += SPEED;
                if (!(game.frame % 3)) {
                    this.walk++;
                    this.walk %= 3;
                }
            }

            var left = 0;
            var right = player_move_range_x;
            var top = 0;
            var bottom = player_move_range_y;

            if (this.x < left) {
                this.x = left;
            } else if (this.x > right) {
                this.x = right;
            }
            if (this.y < top) {
                this.y = top;
            } else if (this.y > bottom) {
                this.y = bottom;
            }
            
            this.frame = this.direction * 3 + this.walk;
            
        };
        
        game.rootScene.addChild(sprite);

        game.addEventListener('enterframe', function () {
            
            var a = Math.random() * 2;
            var m = Math.random() * 4;
            
            //参考にした
            if (game.frame % (game.fps*3) == 0 && game.frame != 0) {
                var banana = new Sprite(16, 16);
                banana.image = game.assets["./pic/icon0.png"];
                banana.frame = [16];
                
                banana.addEventListener('enterframe', function () {
                    if(banana.within(sprite, 16)){
                        SPEED += 2;
                        game.rootScene.removeChild(this);
                    }
                });
                    if (m <= 1) {//左端から右へ
                        banana.x = 0;
                        banana.y = 480 * Math.random();
                        banana.tl.moveTo(500, banana.y, 100)   // move right
                            .removeFromScene();
                    } else if (m <= 2) {//右端から左へ
                        banana.x = 500;
                        banana.y = 480 * Math.random();
                        banana.tl.moveTo(-32, banana.y, 100)   // move left
                            .removeFromScene();
                    } else if (m <= 3) {//下端から上へ
                        banana.x = 480 * Math.random();
                        banana.y = 500;
                        banana.tl.moveTo(banana.x, -32, 100)    // move up
                            .removeFromScene();
                    } else {//上端から下へ
                        banana.x = 480 * Math.random();
                        banana.y = 0;
                        banana.tl.moveTo(banana.x, 500, 100)   // move down
                            .removeFromScene();
                    }
                game.rootScene.addChild(banana);
            }
            
            if (game.frame % 6 == 0) { //6フレーム毎で増やす　参考にした        
   
                var r = Math.floor(Math.random() * 3);
 
                var object = new Sprite(chara[r].width,chara[r].height);
                object.image = game.assets[chara[r].image];
                object.frame = chara[r].frame;
                object.speed = chara[r].speed;
 
                var m = Math.random() * 4;
                
                if (m <= 1) {//左端から右へ
                    object.x = 0;
                    object.y = 480 * Math.random();
                    
                    object.tx = 500;
                    object.ty = object.y;
                } else if (m <= 2) {//右端から左へ
                    object.x = 500;
                    object.y = 480 * Math.random();
                    
                    object.tx = -32;
                    object.ty = object.y;
                } else if (m <= 3) {//下端から上へ
                    object.x = 480 * Math.random();
                    object.y = 500;
                    
                    object.tx = object.x;
                    object.ty = -32;
                } else {//上端から下へ
                    object.x = 480 * Math.random();
                    object.y = 0;
                    
                    object.tx = object.x;
                    object.ty = 500;
                }
                
                object.tl.moveTo(object.tx, object.ty, Math.max(10, object.speed - Math.floor(game.frame / 10) * 2))   // move right
                        .removeFromScene();
                
                object.addEventListener('enterframe', function () {
                    if(object.within(sprite, 18)){
                        var t = Math.floor(game.frame/game.fps);
                        location.href = "./finish.html?time="+t;
                    }
                });
                game.rootScene.addChild(object);
  
            }
        
        });

    };
    game.start();
};