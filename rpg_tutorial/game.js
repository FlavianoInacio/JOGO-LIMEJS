//set main namespace 
goog.provide('rpg_tutorial.Game');   
//get requirements 
goog.require('lime.GlossyButton');
goog.require('lime.Layer');
goog.require('lime.Scene');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.MoveTo');
goog.require('lime.animation.ScaleBy');
goog.require('lime.animation.Spawn');
goog.require('lime.CanvasContext');
goog.require('goog.math');
/**
 * @constructor
 * @extends lime.Scene
 */
   rpg_tutorial.Game = function(){ 

	 lime.Scene.call(this);
		alert('A');
	// criando um layer prara o mapa
	this.layer = new lime.Layer().setPosition(0,0).setRenderer(lime.Renderer.CANVAS).setAnchorPoint(0,0);
	 this.appendChild(this.layer);
	// criando um sprite um objeto do jogo
	this.gameMap = new lime.Sprite().setFill('canvas.png');
	 this.layer.appendChild(this.gameMap);
	//var gameMapterra = new lime.Sprite().setSize(352,100).setFill('map_terra.png').setPosition(0,100).setAnchorPoint(0,0);
	this.hero = new lime.Sprite().setSize(150,150).setFill('inicialHero.png').setPosition(100,100).setAnchorPoint(0,0);  
	this.layer.appendChild(this.hero);
	//var monster = new lime.Sprite().setSize(70,70).setFill('monster.png').setPosition(200,200);
	goog.events.listen(gameMap,['mousedown','touchstart'],function(e){
		var evento = new lime.animation.MoveTo(e.position.x,e.position.y).setDuration(1);	
		
		this.hero.runAction(evento);
		//alert();
		if((this.hero.getPosition().y+100) < e.position.y)
		{
			hero.setFill('Frentel2Hero.png');
		}
		else if ((this.hero.getPosition().x+100) < e.position.x)
		{
			hero.setFill('ladoMaior.png');
		}
		else if ((this.hero.getPosition().x+100) > e.position.x)
		{
			hero.setFill('ladoMenor.png');
		}
		else if((this.hero.getPosition().y+100) > e.position.y){
			hero.setFill('costas.png');
		}

		e.swallow(['mouseup','touchend','touchcancel'],function(){
			hero.setFill('inicialHero.png');
		});
	});

	
	// atribui um sprite a o layer domapa
	//mapLayer.appendChild(gameMap);
	//mapLayer.appendChild(gameMapterra);
	//mapLayer.appendChild(monster);
	//mapLayer.appendChild(hero);
	// atribui um lam layer auma cena
	//mapScene.appendChild(mapLayer);     
	 // diretor roda a cena
   // director.replaceScene(mapScene); 
}
rpg_tutorial.Game.prototype.start = function() {
	};

  /*  //entrypoint 
    rpg_tutorial.start = function(){          
     var director = new lime.Director(document.body,352,256);     
    director.makeMobileWebAppCapable();     
    director.setDisplayFPS(false);          
    var mapScene = new lime.Scene();
    var mapLayer = new lime.Layer().setPosition(0,0).setRenderer(lime.Renderer.CANVAS).setAnchorPoint(0,0);

    var gameMap = new lime.Sprite().setSize(352,256).setFill('map.png').setPosition(0,0).setAnchorPoint(0,0);
    var hero = new lime.Sprite().setSize(40,36).setFill('hero.png').setPosition(100,100);  
	var monster = new lime.Sprite().setSize(40,36).setFill('monster.png').setPosition(200,200);
	hero.life = 20; 
	hero.money = 100; 
	hero.attack = 5;
	monster.life = 15;
	monster.money = 10;
	monster.attack = 1;	
	var fightScene = new lime.Scene().setRenderer();    
	var fightLayer = new lime.Layer().setPosition(0,0).setRenderer(lime.Renderer.CANVAS).setAnchorPoint(0,0);
	var sky_gradient = new lime.fill.LinearGradient().setDirection(0,0,1,1)
    .addColorStop(0,'#B2DFEE').addColorStop(1, '#0000CD');
	var sky = new lime.Sprite().setSize(352,128).setPosition(0,0).setAnchorPoint(0,0).setFill(sky_gradient);
	var grass = new lime.Sprite().setSize(352,128).setPosition(0,128).setAnchorPoint(0,0).setFill('rgb(0,125,0)');
	fightLayer.appendChild(sky);
	fightLayer.appendChild(grass);

	//show the images of the monster and hero
	var fighterOne = new lime.Sprite().setSize(hero.getSize()).setFill(hero.getFill()).setPosition(50,210);
	var fighterTwo = new lime.Sprite().setSize(monster.getSize()).setFill(monster.getFill()).setPosition(280,210);
	goog.events.listen(gameMap, ['mousedown','touchstart'], function(e) {         
    var movement = new lime.animation.MoveTo(e.position.x,e.position.y).setDuration(1);        
    hero.runAction(movement);     
	
});	

	hero.inFightScene = false;

	lime.scheduleManager.schedule(function(dt) {
		if(!this.inFightScene) {            
			if(goog.math.Box.intersects(this.getBoundingBox(),monster.getBoundingBox())) {
            director.replaceScene(fightScene);
            fightLayer.setDirty(255)
            hero.inFightScene = true;
			}
		}	
	}, hero);
		mapLayer.appendChild(gameMap);     
    
	fightLayer.appendChild(fighterOne);
	fightLayer.appendChild(fighterTwo);
	fightScene.appendChild(fightLayer);
    mapScene.appendChild(mapLayer);
    director.replaceScene(mapScene);
	mapScene.appendChild(monster);
	mapLayer.appendChild(hero);
	
	
	

} */

