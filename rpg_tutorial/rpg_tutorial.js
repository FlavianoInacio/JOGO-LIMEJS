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
goog.require('rpg_tutorial.Ator');
goog.require('lime.fill.Frame');
goog.require('lime.animation.KeyframeAnimation');
goog.require('lime.animation.MoveBy');
goog.require('lime.SpriteSheet');
goog.require('lime.parser.JSON');
goog.require('lime.ASSETS.hero.plist');
goog.require('lime.ASSETS.friend.plist');

rpg_tutorial.WIDTH = 768;
rpg_tutorial.HEIGHT = 1004;



   rpg_tutorial.start = function(){ 
	rpg_tutorial.director = new lime.Director(document.body, rpg_tutorial.WIDTH, rpg_tutorial.HEIGHT);
	rpg_tutorial.director.makeMobileWebAppCapable();
	rpg_tutorial.ss = new lime.SpriteSheet('sprites/hero.png',lime.ASSETS.hero.plist);
	rpg_tutorial.ssf = new lime.SpriteSheet('sprites/friend.png',lime.ASSETS.friend.plist);
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
	var larguraArvore = 30;
	var arvoreSprite = {};
	
	contents = rpg_tutorial.conversa();
	var descri =rpg_tutorial.labelDesc("Onirien , a quanto tempo ... já fazem 5 anos desde a ultima vez, qual o motivo do meu amigo vir de tão longe?");
	var imgHero =rpg_tutorial.labelFace(hero1.rosto);
   	contents.appendChild(descri);
   	contents.appendChild(imgHero);
	var mapScene = new lime.Scene();
	var mapLayer = new lime.Layer();
	var gameMap = new lime.Sprite().setFill('sprites/map1.png').setPosition(0,0).setAnchorPoint(0,0);
	var hero = new lime.Sprite().setSize(65,65).setFill(hero1.lado).setPosition(100,400).setAnchorPoint(0,0); 
	var heroFriend = new lime.Sprite().setSize(65,65).setFill('sprites/heroFriendLado.png').setPosition(200,400).setAnchorPoint(0,0);   

	
	mapLayer.appendChild(gameMap);
	mapLayer.appendChild(hero);
		for(i=0; i <=15; i++)
	{
		
		arvoreSprite[i] = new lime.Sprite().setSize(65,65).setFill(arvore.frente).setPosition(larguraArvore,30);
		mapLayer.appendChild(arvoreSprite[i]);
		larguraArvore+=50;
	}
	larguraArvore = 30;
		for(i=15; i <=30; i++)
	{
		
		arvoreSprite[i] = new lime.Sprite().setSize(65,65).setFill(arvore.frente).setPosition(larguraArvore,100);
		mapLayer.appendChild(arvoreSprite[i]);
		larguraArvore+=50;
	}
	var cabanaSprite = new lime.Sprite().setSize(150,150).setFill(cabana.frente).setPosition(500,300);
		mapLayer.appendChild(cabanaSprite);
	var cafogueiraSprite = new lime.Sprite().setSize(65,65).setFill(fogueira.frente).setPosition(400,450);
		mapLayer.appendChild(cafogueiraSprite);

	var madeiraSprite = new lime.Sprite().setSize(65,65).setFill(madeira.frente).setPosition(600,450);
	mapLayer.appendChild(madeiraSprite);

	mapLayer.appendChild(heroFriend);
	mapLayer.appendChild(contents);
	mapScene.appendChild(mapLayer);
   rpg_tutorial.director.replaceScene(mapScene, lime.transitions.MoveInUp);



   	goog.events.listen(mapScene,['mousedown','touchstart'],function(e){
   		if(conversas>4)
   		{
   			  rpg_tutorial.moveToPosition(hero,mapScene.localToNode(e.position,mapLayer),heroFriend);
   		}
   		else if(conversas==0)
   		{
   			for (x in contents) {
   				contents.removeChildAt(0);
				}
				var descri =rpg_tutorial.labelDesc('Thurin meu bom amigo, como é bom te reencontrar, vir de tão longe pois tenho um recado muito importante para o Rei!');
				var imgHero =rpg_tutorial.labelFace(hero1Friend.rosto);
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
				var imgHero =rpg_tutorial.labelFace(hero1.rosto);
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
				var imgHero =rpg_tutorial.labelFace(hero1Friend.rosto);
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
				var imgHero =rpg_tutorial.labelFace(hero1.rosto);
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

rpg_tutorial.moveToPosition = function(monster,pos,heroFriend){
    
    var delta = goog.math.Coordinate.difference(pos,monster.getPosition()),
        angle = Math.atan2(-delta.y,delta.x);
    //determine the direction    
    var dir = Math.round(angle/(Math.PI*2)*8);
    var dirs = ['d','c','c','c','e','f','f','f'];
    if(dir<0) dir=8+dir;
    dir = dirs[dir];
    
    //move
    var move =new lime.animation.MoveBy(delta).setEasing(lime.animation.Easing.LINEAR).setSpeed(2);
    monster.runAction(move);
    heroFriend.runAction(move);
	
	// show animation
	var anim = new lime.animation.KeyframeAnimation();
	var animf = new lime.animation.KeyframeAnimation();
	anim.delay= 1/5;
	animf.delay= 1/5;
	for(var i=1;i<=2;i++){
	    anim.addFrame(rpg_tutorial.ss.getFrame('hero-'+ dir +'-'+i+'.png'));
	    animf.addFrame(rpg_tutorial.ssf.getFrame('friend-'+ dir +'-'+i+'.png'));
	}
    monster.runAction(anim);
    heroFriend.runAction(animf);
    
    // on stop show front facing
    goog.events.listen(move,lime.animation.Event.STOP,function(){
        anim.stop();
        animf.stop();
        monster.setFill(rpg_tutorial.ss.getFrame('hero-f-0.png'));
        heroFriend.setFill(rpg_tutorial.ssf.getFrame('friend-f-0.png'));
    })
    
}