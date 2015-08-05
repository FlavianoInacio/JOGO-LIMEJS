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
	var conversas=0;
	contents = rpg_tutorial.conversa();
	var descri =rpg_tutorial.labelDesc("Onirien , a quanto tempo ... já fazem 5 anos desde a ultima vez, qual o motivo do meu amigo vir de tão longe?");
	var imgHero =rpg_tutorial.labelFace('sprites/personagemPrincipalFace.png');
   	contents.appendChild(descri);
   	contents.appendChild(imgHero);
	var mapScene = new lime.Scene();
	var mapLayer = new lime.Layer().setPosition(0,0).setRenderer(lime.Renderer.CANVAS).setAnchorPoint(0,0);
	var gameMap = new lime.Sprite().setFill('sprites/map1.png').setPosition(0,0).setAnchorPoint(0,0);
	var hero = new lime.Sprite().setSize(65,65).setFill('sprites/personagemPrincipalLado.png').setPosition(100,400).setAnchorPoint(0,0); 
	var heroFriend = new lime.Sprite().setSize(65,65).setFill('sprites/heroFriendLado.png').setPosition(200,400).setAnchorPoint(0,0);   
	mapLayer.appendChild(gameMap);
	mapLayer.appendChild(hero);
	mapLayer.appendChild(heroFriend);
	mapLayer.appendChild(contents);
	mapScene.appendChild(mapLayer);
   rpg_tutorial.director.replaceScene(mapScene, lime.transitions.MoveInUp);



   	goog.events.listen(gameMap,['mousedown','touchstart'],function(e){
   		if(conversas>4)
   		{
   			var evento = new lime.animation.MoveTo(e.position.x,e.position.y).setDuration(1);
   			var eventoOr = new lime.animation.MoveTo(e.position.x,e.position.y-80).setDuration(1);
   			if(hero.getPosition().y < e.position.y){
   				hero.setFill('sprites/personagemPrincipalFrente.png');
				heroFriend.setFill('sprites/elfo1Frente.png');
   			}
   			else
   			{
   				hero.setFill('sprites/personagemPrincipalTras.png');
				heroFriend.setFill('sprites/elfo1Costas.png');
   			}
			
			hero.runAction(evento);
			heroFriend.runAction(eventoOr);
			e.swallow(['mouseup','touchend','touchcancel'],function(){
			hero.setFill('sprites/personagemPrincipal1.png');
			heroFriend.setFill('sprites/elfo1Frente1.png');
		});
   		}
   		else if(conversas==0)
   		{
   			for (x in contents) {
   				contents.removeChildAt(0);
				}
				var descri =rpg_tutorial.labelDesc('Thurin meu bom amigo, como é bom te reencontrar, vir de tão longe pois tenho um recado muito importante para o Rei!');
				var imgHero =rpg_tutorial.labelFace('sprites/elfo1Face.png');
   				contents.appendChild(descri);
   				contents.appendChild(imgHero);
   				conversas=1;
   		}
   		else if(conversas==1)
   		{
   			for (x in contents) {
   				contents.removeChildAt(0);
				}
   			var descri =rpg_tutorial.labelDesc('Onirien, é algo grave? o que houve?');
				var imgHero =rpg_tutorial.labelFace('sprites/personagemPrincipalFace.png');
   				contents.appendChild(descri);
   				contents.appendChild(imgHero);
   				conversas=2;
   		}
   			else if(conversas==2)
   		{
   			for (x in contents) {
   				contents.removeChildAt(0);
				}
   			var descri =rpg_tutorial.labelDesc('Thurin, é melhor que me aconpanhe até o Rei, prefiro conversar com todos juntos!');
				var imgHero =rpg_tutorial.labelFace('sprites/elfo1Face.png');
   				contents.appendChild(descri);
   				contents.appendChild(imgHero);
   				conversas=3;
   		}
   			else if(conversas==3)
   		{
   			for (x in contents) {
   				contents.removeChildAt(0);
				}
   			var descri =rpg_tutorial.labelDesc('Claro, então vamos partir o quanto antes!');
				var imgHero =rpg_tutorial.labelFace('sprites/personagemPrincipalFace.png');
   				contents.appendChild(descri);
   				contents.appendChild(imgHero);
   				conversas=4;
   		}
   			else if(conversas==4)
   		{
   			mapLayer.removeChild(contents);
   			conversas=5;
   		}
		
	});

};

rpg_tutorial.conversa = function(){

  var contents = new lime.RoundedRect().setRadius(30).setFill('#fff').setSize(700, 200).setPosition(360, 130);
  return contents;
};
rpg_tutorial.labelDesc = function(descr)
{
	var descri = new lime.Label().setText(descr).setSize(450, 50).setPosition(50, -30).setFontSize(24).setFontColor('#333');
	return descri;
};
rpg_tutorial.labelFace = function(personagemCaminho)
{
	var imgHero = new lime.Sprite().setSize(150,150).setFill(personagemCaminho).setPosition(-180,60).setAnchorPoint(1,1);
	return imgHero;
};

// Principal = Thurin
// azul  = Onirien
// irmao = Thir