
//var gl = new WebGL2RenderingContext(); //enable WebGL 2 partial support

var images = {};
var bpm=170;
var beat = bpm/60;
var tick= beat/8;
var pattern = 8*beat;	

Demo.prototype.init = function()
{
  const settings = new Settings();
  settings.demo.sync.rocketFile = 'sync/wtfmman.rocket';
  settings.demo.sync.beatsPerMinute = 170;
  settings.demo.sync.rowsPerBeat = 8;

  settings.demo.compatibility.old2dCoordinates = true; // when true 2d coordinates x: 0 - 1920, y: 0 - 1080; when false 2d coordinates are -0.5 - 0.5 range
  settings.demo.compatibility.oldColors = true; // when true colors are in 0-255 range, when false colors are in 0-1 range
  settings.demo.compatibility.oldMaterials = true;
  settings.demo.image.texture.wrapS = 'RepeatWrapping';
  settings.demo.image.texture.wrapT = 'RepeatWrapping';

	settings.demo.camera = {
    type: 'Perspective',
    fov: 90,
    // aspectRatio calculated below
    near: 0.1,
    far: 1000,
    position: { x: 0.0, y: 0.0, z: -2 },
    lookAt: { x: 0.0, y: 0.0, z: 0.0 },
    up: { x: 0.0, y: 1.0, z: 0.0 }
  };
  settings.demo.lights = [
    {
      type: 'Ambient',
      color: { r: 1.0, g: 1.0, b: 1.0 },
      intensity: 100.0
    }
  ];

    var start = 0;
    var duration = 60*20;
	
	this.createText(.1,2.8,"LIFE IS WAR",5.0,0);
	this.createText(3,2.9,"POWER" ,5.0,150);
	this.createText(3,2.9,"IS",5.0,0);
	this.createText(3,2.9,"AN ILLUSION",5.0,-150);
	this.createText(6,2.9,"THIS IS",5.0,100);
	this.createText(6,2.9,"NO MUSIC DEMO",5.0,-100);
	this.createTextB(105,5,"JUMALAUTA 2024",5.0,100);
	this.createText(111,0.2,"290825",5.0,0);
	this.loader.addAnimation([
    {
         "start": 0, "duration":120
        ,"layer": 36000, "image": ["overlay_vignette.png"]
		,"scale":[{"x":1.75,"y":1.75}]
		,"position":[{"x":960,"y":540}]

		}
	]);
	
	this.loader.addAnimation([
    {
         "start": 10, "duration":10
        ,"layer": 1000, "image": ["overlay_plasma.png"]
		,"scale":[{"x":2.0,"y":2.0}
			,{"duration":10,"x":2.5,"y":2.5}]
		,"position":[{"x":960,"y":540}]

		}
	]);
	
	this.loader.addAnimation([
    {
         "start": 10, "duration":10
        ,"layer": 1, "image": ["white.png"]
		,"scale":[{"x":15.0,"y":15.0}]
		,"position":[{"x":960,"y":540}]
		,"shader":{
			"name":"plasma.fs",
			"variable":
			[
				{"name":"time","type":"float","value":[()=>getSceneTimeFromStart()]}
			]
		}
		}
	]);

	this.loader.addAnimation([
    {
         "start": 20, "duration":10
        ,"layer": 1, "image": ["bg_starfield.png"]
		,"scale":[{"x":2.2,"y":2.2}
			,{"duration":10,"x":2.4,"y":2.4}]
		,"position":[{"x":960,"y":540}]
		,"color":[{"r":()=>250-50*Math.sin(30*getSceneTimeFromStart()),"g":()=>250-50*Math.sin(17*getSceneTimeFromStart()),"b":()=>250-50*Math.sin(24*getSceneTimeFromStart())}]
		,"angle": [{"degreesZ":()=>-45.0*getSceneTimeFromStart()}]
		}
	]);
	this.loader.addAnimation([
    {
         "start": 20, "duration":10
        ,"layer": 2, "image": ["bg_starfield_mask.png"]
		,"scale":[{"x":2.2,"y":2.2}
			,{"duration":10,"x":2.4,"y":2.4}]
		,"position":[{"x":960,"y":540}]

		}
	]);
	this.loader.addAnimation([
    {
         "start": 20, "duration":10
        ,"layer": 9998, "image": ["white.png"]
		,"scale":[{"x":15.0,"y":15.0}]
		,"position":[{"x":960,"y":540}]
		,"shader":{
			"name":"starfield.fs",
			"variable":
			[
				{"name":"time","type":"float","value":[()=>getSceneTimeFromStart()]}
			]
		}
		}
	]);

	this.loader.addAnimation([
    {
         "start": 30, "duration":10
        ,"layer": 5000, "image": ["overlay_grunge.png"]
		,"scale":[{"x":3.5,"y":3.5}
			,{"duration":10,"x":3.0,"y":3.0}]
		,"color":[{"r":255,"g":0,"b":0,"a":()=>100+25*Math.sin(50*getSceneTimeFromStart())}]
		,"position":[{"x":600,"y":540}
		,{"duration":10,"x":500}]

		}
	]);
	
	this.loader.addAnimation([
    {
         "start": 30, "duration":10
        ,"layer": 1, "image": ["bg_spikeball.png"]
		,"scale":[{"x":1.0,"y":1.0}
		,{"duration":10,"x":1.5,"y":1.5}]
		,"position":[{"x":960,"y":540}]
		}
	]);
	
	this.loader.addAnimation([
    {
         "start": 30, "duration":10
        ,"layer": 19999, "image": ["white.png"]
		,"object":"spikeball.obj"
		,"position":[{"z":0,"x":0,"y":0}]
		,"scale":[{"uniform3d":.752}]
        ,"layer": 1002
		,"angle": [{"degreesY":()=>150.0*getSceneTimeFromStart(),"degreesZ":15,"degreesX":45}]
		,"shader":{
			"name":["specular.fs","specular.vs"],
			"variable":
			[
				{"name":"time","type":"float","value":[()=>getSceneTimeFromStart()]}
			]
		}
	}]);

	this.loader.addAnimation([
    {
         "start": 40, "duration":10
        ,"layer": 21111, "image": ["fire_overlay.png"]
		,"color":[{"r":0,"g":0,"b":0,"a":10}
		,{"duration":10,"a":255}]
		,"scale":[{"x":2.0,"y":2.0}
		,{"duration":10,"x":2.1,"y":2.1}]
		,"position":[{"x":860,"y":140}
		,{"duration":10,"x":1060,"y":440}]
		}
	]);
	
	this.loader.addAnimation([
    {
         "start": 40, "duration":10
        ,"layer": 9998, "image": ["tex_fire2.png",]
		,"scale":[{"x":1.9,"y":1.1}]
		,"position":[{"x":960,"y":540}]
		,"shader":{
			"name":"fire.fs",
			"variable":
			[
				{"name":"time","type":"float","value":[()=>getSceneTimeFromStart()]}
			]
		}
		}
	]);
	
	this.loader.addAnimation([
    {
         "start": 50, "duration":10
        ,"layer": 26000, "image": ["overlay_plasma.png"]
		,"scale":[{"x":4.0,"y":4.0}]
		,"position":[{"x":960,"y":540}]

		}
	]);
	
	this.loader.addAnimation([
    {
         "start": 50, "duration":10
        ,"layer": 1, "image": ["tex_checker.png"]
		,"scale":[{"x":3.5,"y":3.5}]
		,"position":[{"x":960,"y":540}]
		,"shader":{
			"name":"checkerscroll.fs",
			"variable":
			[
				{"name":"time","type":"float","value":[()=>getSceneTimeFromStart()]}
			]
		}
		}
	]);
	
	for(let i=0;i<52;i++)
	{
		var colors = generateColors(3);

		var randomi=Math.random()*360;
		this.loader.addAnimation([
		{
			 "start": 50, "duration":10
			,"layer": 9998-i, "image": ["tex_blob.png"]
			,"scale":[{"x":1.0,"y":1.0}]

			
			,"color":[{"r":colors[0],"g":colors[1],"b":colors[2]}]

			,"angle":[{"degreesZ":randomi}
			,{"duration":10,"degreesZ":-3640-randomi}]
			
			,"position":[{
				"bob":i,
				"x":(animation)=>-900+(Math.cos(Math.sin(animation.bob*.06*1.01+0.5*getSceneTimeFromStart()))*2400),
				"y":(animation)=>-350+(Math.cos(Math.sin(animation.bob*.18*1.01+0.75*getSceneTimeFromStart()))*1200)}]

		}]);
	}	
	
	this.loader.addAnimation([
    {
         "start": 60, "duration":10
        ,"layer": 26000, "image": ["overlay_metaballs.png"]
		,"scale":[{"x":2.1,"y":2.1}
			,{"duration":10,"x":2.0,"y":2.0}]
		,"position":[{"x":960,"y":540}]
		,"color":[{"a":125}]

		}
	]);
	
	this.loader.addAnimation([
    {
         "start": 60, "duration":10
        ,"layer": 9998, "image": ["white.png"]
		,"scale":[{"x":15.0,"y":15.0}]
		,"position":[{"x":960,"y":540}]
		,"shader":{
			"name":"metaballs.fs",
			"variable":
			[
				{"name":"time","type":"float","value":[()=>getSceneTimeFromStart()]}
			]
		}
	}]);


	this.loader.addAnimation([
    {
         "start": 70, "duration":40
        ,"layer": 1, "image": ["white.png"]
		,"scale":[{"x":15.0,"y":15.0}]
		,"position":[{"x":960,"y":540}]
		,"shader":{
			"name":"clouds.fs",
			"variable":
			[
				{"name":"time","type":"float","value":[()=>getSceneTimeFromStart()]}
			]
		}
	}]);
	
	this.loader.addAnimation([
    {
         "start": 70, "duration":40
        ,"layer": 10, "image": ["tex_boat.png"]
		,"scale":[{"x":1.5,"y":1.5}]
		,"angle":[{"degreesZ":()=>-10+6*Math.sin(-2*getSceneTimeFromStart())},
		{"duration":15,"degreesZ":()=>-10+6*Math.sin(-2*getSceneTimeFromStart())},
		{"duration":25,"degreesZ":()=>-120+6*Math.sin(-2*getSceneTimeFromStart())}]
		,"position":[{"x":310,"y":()=>305+40*Math.sin(3*getSceneTimeFromStart())}
		,{"duration":15,"y":()=>305+40*Math.sin(3*getSceneTimeFromStart())}
		,{"duration":1,"y":()=>335+40*Math.sin(3*getSceneTimeFromStart())}
		,{"duration":32,"y":()=>-360+40*Math.sin(3*getSceneTimeFromStart())}]
	}]);

	this.loader.addAnimation([
    {
         "start": 70, "duration":40
        ,"layer": 10, "image": ["tex_sun.png"]
		,"scale":[{"x":()=>.65+.05*Math.sin(.66*getSceneTimeFromStart()),"y":()=>.65+.05*Math.sin(.66*getSceneTimeFromStart())}]
		,"angle":[{"degreesZ":()=>15*getSceneTimeFromStart()}]
		,"position":[{"x":1680,"y":()=>860-40*Math.sin(1.65*getSceneTimeFromStart())}]
		}
	]);
	

	this.loader.addAnimation([
    {
         "start": 70, "duration":40
        ,"layer": 15, "image": ["tex_waves.png"]
		,"scale":[{"x":1.8,"y":1.8}]
		,"position":[{"x":960,"y":()=>80+10*Math.sin(2*getSceneTimeFromStart())}]
		,"color":[{"r":0,"g":125,"b":255}]
		,"shader":{
			"name":"waterscroll.fs",
			"variable":
			[
				{"name":"speed","type":"float","value":[.05]}
			]
		}
	}]);


	
	this.loader.addAnimation([
    {
         "start": 70, "duration":40
        ,"layer": 14, "image": ["tex_waves.png"]
		,"scale":[{"x":1.8,"y":1.8}]
		,"position":[{"x":960,"y":()=>140+10*Math.sin(-2.25*getSceneTimeFromStart())}]
		,"color":[{"r":0,"g":155,"b":255}]
		,"shader":{
			"name":"waterscroll.fs",
			"variable":
			[
				{"name":"speed","type":"float","value":[.075]}
			]
		}
	}]);

	this.loader.addAnimation([
    {
         "start": 70, "duration":40
        ,"layer": 13, "image": ["tex_waves.png"]
		,"scale":[{"x":1.8,"y":1.8}]
		,"position":[{"x":960,"y":()=>200+10*Math.sin(2.5*getSceneTimeFromStart())}]
		,"color":[{"r":0,"g":185,"b":255}]
		,"shader":{
			"name":"waterscroll.fs",
			"variable":
			[
				{"name":"speed","type":"float","value":[.1]}
			]
		}
	}]);
	
	this.loader.addAnimation([
    {
         "start": 70, "duration":40
        ,"layer": 5, "image": ["tex_waves.png"]
		,"scale":[{"x":1.8,"y":1.8}]
		,"position":[{"x":960,"y":()=>240+10*Math.sin(-2.75*getSceneTimeFromStart())}]
		,"color":[{"r":0,"g":155,"b":255}]
		,"shader":{
			"name":"waterscroll.fs",
			"variable":
			[
				{"name":"speed","type":"float","value":[.0825]}
			]
		}
	}]);
}
Demo.prototype.createText = function (startTime, duration, textString, scale,yPos)
{
	   	this.loader.addAnimation([{
		"start": startTime, "duration": duration ,"layer": 30400,			
		"text":
		{
			"string":textString
			,"name":"font.ttf"
		}

		,"scale":[{"uniform3d":scale}]
		,"position":[{"x":960,"y":540+yPos,"z":1}		]
		,"angle":[{"degreesZ":0}]
		,"color":[{"r":255,"g":255,"b":255}]
	}]);
}

Demo.prototype.createTextB = function (startTime, duration, textString, scale,yPos)
{
	   	this.loader.addAnimation([{
		"start": startTime, "duration": duration ,"layer": 30400,			
		"text":
		{
			"string":textString
			,"name":"font.ttf"
		}

		,"scale":[{"uniform3d":scale}]
		,"position":[{"x":960,"y":540+yPos,"z":1}		]
		,"angle":[{"degreesZ":0}]
		,"color":[{"r":0,"g":0,"b":0}]
	}]);
}

function generateColors(amount)
{
	var smallValue = 0;
	var bigValue = 255;
	var minMax = Math.random()*2;
	if(minMax<1)
	{
		smallValue=255;
	}
	else
	{
		smallValue=0;
	}
	bigValue-=smallValue;
	
	var values = [];
	var smallest = 0;
	for(let ii=0; ii<amount; ii++)
	{
		values[ii]=Math.random();
		
		if(values[ii]<values[smallest])
		{
			smallest = ii;
		}
	}
	
	for(let ii=0; ii<amount; ii++)
	{
		if(ii==smallest)
		{
			values[ii]=smallValue;
		}
		else
		{
			values[ii]=bigValue;
		}
	}


	return values;		
}