//set main namespace 
goog.provide('rpg_tutorial');   
//get requirements 
goog.require('lime.Director'); 
goog.require('lime.Scene'); 
goog.require('lime.Layer');   
goog.require('lime.fill.LinearGradient');
goog.require('lime.transitions.MoveInUp');
goog.require('goog.math');
goog.require('rpg_tutorial.Button');
goog.require('rpg_tutorial.Game');

rpg_tutorial.WIDTH = 768;
rpg_tutorial.HEIGHT = 1004;

   rpg_tutorial.start = function(){ 
	rpg_tutorial.director = new lime.Director(document.body, rpg_tutorial.WIDTH, rpg_tutorial.HEIGHT);
	rpg_tutorial.director.makeMobileWebAppCapable();
	rpg_tutorial.menuInicial();
};

rpg_tutorial.isBrokenChrome = function(){
   return (/Chrome\/9\.0\.597/).test(goog.userAgent.getUserAgentString());

   
}
rpg_tutorial.menuInicial = function (transacao)
{
		var scene = new lime.Scene();
		rpg_tutorial.director.replaceScene(scene,transacao ? lime.transitions.MoveInDown : undefined);

		var layer = new lime.Layer().setPosition(rpg_tutorial.WIDTH * .5, 0);
		scene.appendChild(layer);

    	var contents = new lime.Layer().setPosition(0, 280);
    	layer.appendChild(contents);

    	 var btn_play = new rpg_tutorial.Button('JOGAR').setPosition(0, 330).setSize(250, 100);
    	contents.appendChild(btn_play);
    	goog.events.listen(btn_play, lime.Button.Event.CLICK, function() {
      	rpg_tutorial.loadGame();
    	});
}
rpg_tutorial.loadGame = function() {
   // rpg_tutorial.activeGame = new rpg_tutorial.Game();
   var descr = new lime.Label().setText('Oi cara , a quanto tempo ... qual motivo da sua visita ao nosso vilarejo? espero que tenha vindo para festejar.').setSize(450, 50).setPosition(30, -30).setFontSize(24).setFontColor('#333');
          
  var contents = new lime.RoundedRect().setRadius(30).setFill('#fff').setSize(700, 200).setPosition(360, 130);
  
  var imgHero = new lime.Sprite().setSize(150,150).setFill('personagemPrincipalFace.png').setPosition(-180,60).setAnchorPoint(1,1);
  contents.appendChild(imgHero);
  contents.appendChild(descr);
	var mapScene = new lime.Scene();
	var mapLayer = new lime.Layer().setPosition(0,0).setRenderer(lime.Renderer.CANVAS).setAnchorPoint(0,0);
	var gameMap = new lime.Sprite().setFill('canvas.png').setPosition(0,0).setAnchorPoint(0,0);
	var hero = new lime.Sprite().setSize(65,65).setFill('personagemPrincipalLado.png').setPosition(100,400).setAnchorPoint(0,0); 
	var heroFriend = new lime.Sprite().setSize(65,65).setFill('heroFriendLado.png').setPosition(200,400).setAnchorPoint(0,0);   
	goog.events.listen(gameMap,['mousedown','touchstart'],function(e){
		var evento = new lime.animation.MoveTo(e.position.x,e.position.y).setDuration(1);	
		hero.setFill('personagemPrincipalFrente.png');
		hero.runAction(evento);
		e.swallow(['mouseup','touchend','touchcancel'],function(){
			hero.setFill('personagemPrincipal1.png');
		});
	});
	mapLayer.appendChild(gameMap);
	mapLayer.appendChild(hero);
	mapLayer.appendChild(heroFriend);
	  mapLayer.appendChild(contents);
	mapScene.appendChild(mapLayer);
	 // contents.appendChild(hero);    
	 // diretor roda a cena

   rpg_tutorial.director.replaceScene(mapScene, lime.transitions.MoveInUp);
};

