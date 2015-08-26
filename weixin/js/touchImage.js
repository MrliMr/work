/*
touchImageJS 1.0.0
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 

A Javascript library based on Html5 Canvas tag, to create an image viewer that captures the touch events and allows the user resize the image by pinching and moving around inside the canvas.

tested on Ipad2, Ipad4, Iphone

And it has no licence. It's all yours!

http://www.dimo.cat
Dimo Visual Creatives S.C.P.
@DaniValldo
*/


var touchImage=(function(){
	var canvas;
	var ctx;
	var img;
	var posImg={
		_x:0,
		_y:0
	};
	var posInitialDedo={
		_x:0,
		_y:0
	};

	var sizeImg={
		_x:0,
		_y:0
	};

	var scaleImg;
	var scaleTrueImg;
	var lastDist=0;
	var propImage;
	var pan=true;
	var blocked=false;

	var init=function(_element,_img){
		canvas=document.getElementById(_element);

		if(canvas.width>=canvas.height){
			pan=true;
		}else{
			pan=false;
		}

		ctx = canvas.getContext('2d');
		img=new Image();
   		img.onload=function(){

   			propImage=img.width/img.height;

   			if(!pan){
   				img.width=canvas.width;
   				img.height=img.width*propImage;
   			}else{
   				img.height=canvas.height;
   				img.width=img.height*propImage;
   			};

   			sizeImg._x=img.width;
   			sizeImg._y=img.height;
   			ctx.drawImage(img, 0, 0, sizeImg._x, sizeImg._y);
   			canvas.addEventListener("touchstart",onTouchStart,false);
   			canvas.addEventListener("touchmove",onTouchMove,false);//touchmove
   			canvas.addEventListener("touchend",onTouchEnd,false);//touchmove
   			scaleImg=Math.sqrt((Math.pow(sizeImg._x,2))+(Math.pow(sizeImg._y,2)));
   			
   		};
   		img.src=_img;

	};


	function onTouchStart(event){
		event.preventDefault();
		var rect = canvas.getBoundingClientRect();
		posInitialDedo._x=event.touches[0].clientX-rect.left;
		posInitialDedo._y=event.touches[0].clientY;
		if (event.targetTouches.length > 1) {
			
			var dedoA={
				_x:event.targetTouches[0].clientX-rect.left,
				_y:event.targetTouches[0].clientY
			};
			var dedoB={
				_x:event.targetTouches[1].clientX-rect.left,
				_y:event.targetTouches[1].clientY
			};
			var catetoA=dedoA._x-dedoB._x;
			var catetoB=dedoB._y-dedoA._y;

			lastDist=Math.sqrt((Math.pow(catetoA,2))+(Math.pow(catetoB,2)));
		};

	};

	function onTouchMove(event){
		event.preventDefault();		
		var rect = canvas.getBoundingClientRect();
		if (event.targetTouches.length == 1) {
			if(!blocked){
			var distX;
			var distY;
			distX=event.targetTouches[0].clientX-rect.left-posInitialDedo._x;
			distY=event.targetTouches[0].clientY-posInitialDedo._y;
			posImg._x=posImg._x+distX;
			posImg._y=posImg._y+distY;
			colocarBien();
			posInitialDedo._x=event.targetTouches[0].clientX-rect.left;
			posInitialDedo._y=event.targetTouches[0].clientY;
			};

		}else if(event.targetTouches.length>=2){
			if(!blocked){
				blocked=true;
			};
			var dist;
			var pEscalado={
				_x:0,
				_y:0
			};
			var dedoA={
				_x:event.targetTouches[0].clientX-rect.left,
				_y:event.targetTouches[0].clientY
			};
			var dedoB={
				_x:event.targetTouches[1].clientX-rect.left,
				_y:event.targetTouches[1].clientY
			};

			var catetoA=dedoA._x-dedoB._x;
			var catetoB=dedoB._y-dedoA._y;

			pEscalado._x=(catetoA/2)+dedoB._x;
			pEscalado._y=(catetoB/2)+dedoA._y;

			dist=Math.sqrt((Math.pow(catetoA,2))+(Math.pow(catetoB,2)));

			var result;
			result=dist-lastDist;

			var oldScaleImg=scaleImg;

			if(result>0){
				scaleImg=scaleImg+30;
			}else{
				scaleImg=scaleImg-30;
			};
			
			var percentCreix=scaleImg/oldScaleImg;

			scaleTrueImg=Math.sqrt((Math.pow(sizeImg._x,2))+(Math.pow(sizeImg._y,2)));
			scaleTrueImg=scaleTrueImg*percentCreix;

   			var old_sizeImgY=sizeImg._y;
   			var old_sizeImgX=sizeImg._x;

   			sizeImg._x=Math.sqrt((Math.pow(scaleTrueImg,2))-(Math.pow(old_sizeImgY,2)));
   			sizeImg._y=sizeImg._x/propImage;

			var p_enImagenX=(pEscalado._x+Math.abs(posImg._x))/sizeImg._x;
			var p_enImagenY=(pEscalado._y+Math.abs(posImg._y))/sizeImg._y;

			if(pan){

				if(sizeImg._x>canvas.width){
				posImg._x=posImg._x+(((old_sizeImgX-sizeImg._x)*p_enImagenX));
   				posImg._y=posImg._y+(((old_sizeImgY-sizeImg._y)*p_enImagenY));
   				};

			}else{

				if(sizeImg._y>canvas.height){
				posImg._x=posImg._x+(((old_sizeImgX-sizeImg._x)*p_enImagenX));
   				posImg._y=posImg._y+(((old_sizeImgY-sizeImg._y)*p_enImagenY));
   				};

			};

			colocarBien();
			
			lastDist=dist;

		};
	};

	function onTouchEnd(event){
		event.preventDefault();
		posInitialDedo._x=0;
		posInitialDedo._y=0;
		if(event.targetTouches.length == 0){
			blocked=false;
		};
	};

	function colocarBien(){

			if(scaleImg>6000){
				scaleImg=6000;
			}else if(scaleImg<500){
				scaleImg=500;
			};

			if(pan){

				if(sizeImg._x<=canvas.width){
				sizeImg._x=canvas.width;
				sizeImg._y=sizeImg._x/propImage;
				scaleImg=Math.sqrt((Math.pow(sizeImg._x,2))+(Math.pow(sizeImg._y,2)));
				};

			}else{

				if(sizeImg._y<=canvas.height){
				sizeImg._y=canvas.height;
				sizeImg._x=sizeImg._y/propImage;
				scaleImg=Math.sqrt((Math.pow(sizeImg._x,2))+(Math.pow(sizeImg._y,2)));
				};

			};

			
   			
   			if(posImg._x>=0){
				posImg._x=0;
			};
			if((sizeImg._x+posImg._x)<=canvas.width){
				posImg._x=canvas.width-sizeImg._x;
			};
			if(posImg._y>=0){
				posImg._y=0;
			};
			
			if((sizeImg._y+posImg._y)<=canvas.height){
				posImg._y=canvas.height-sizeImg._y;
			};
			ctx.clearRect(0,0,canvas.width,canvas.height);
			ctx.drawImage(img,posImg._x,posImg._y,sizeImg._x,sizeImg._y);
			
	};

	return{
		init:init
	};
})();
