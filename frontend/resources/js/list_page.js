/*排行 开始*/
;(function(global){
	var carousel_tit_aA=$('carousel_tit').getElementsByTagName('a');
	var carousel_right_list=$('carousel').getElementsByClassName('carousel_right_list');
	var activeInd=0;

	for(var i=0;i<carousel_tit_aA.length;i++){
		carousel_tit_aA[i].index=i;
		carousel_tit_aA[i].addEventListener('click',function(){
			if(!hasClass(this,'pay_ranking')){
				removeClass(carousel_tit_aA[activeInd],'pay_ranking');
				removeClass(carousel_right_list[activeInd],'active')
				addClass(this,'pay_ranking');
				addClass(carousel_right_list[this.index],'active');
				activeInd=this.index;
			}
			
		})
	}
})(this);
/*排行 结束*/

/*轮播 开始*/
;(function(slidePlay){
	var aLi=$('carousel_center').getElementsByTagName('li'),
	oBtn_left=$('btn_left'),
	oBtn_right=$('btn_right'),
	aSpan=$('img_list').getElementsByTagName('span')
	activeIndex=0;
	timer=null;

	clearInterval(timer);
	timer=setInterval(startChange,3000);

	function startChange(){
		removeClass(aLi[activeIndex],'active');
		removeClass(aSpan[activeIndex],'active');
		activeIndex=++activeIndex%aLi.length;
		addClass(aLi[activeIndex],'active');
		addClass(aSpan[activeIndex],'active');
	}

	oBtn_right.addEventListener('click',function(){
		clearInterval(timer);
		startChange();
		timer=setInterval(startChange,3000);
	});

	oBtn_left.addEventListener('click',function(){
		clearInterval(timer);
		removeClass(aLi[activeIndex],'active');
		removeClass(aSpan[activeIndex],'active');
		activeIndex=--activeIndex%aLi.length;
		if(activeIndex<0){
			activeIndex=aLi.length-1;
		}
		addClass(aLi[activeIndex],'active');
		addClass(aSpan[activeIndex],'active');
		timer=setInterval(startChange,3000);
	})

	for(var i=0;i<aSpan.length;i++){
		aSpan[i].index=i;
		aSpan[i].addEventListener('click',function(){
			clearInterval(timer);
			if(!hasClass(this,'active')){
				removeClass(aLi[activeIndex],'active');
				removeClass(aSpan[activeIndex],'active');
				addClass(this,'active');
				addClass(aLi[this.index],'active');
				activeIndex=this.index;	
			}
			
			timer=setInterval(startChange,3000);
		})
	}
})(this);
/*轮播 结束*/

/*导航栏切换 开始*/
;(function(changeOption){
	var tits=$('s_nav2').getElementsByClassName('tit'),
	aUl=$('s_nav2').getElementsByClassName('nav2_li_ul'),
	aA1=$('nav2_li_a1').getElementsByTagName('a');
	aA2=$('nav2_li_a2').getElementsByTagName('a');
	aA3=$('nav2_li_a3').getElementsByTagName('a');
	index=0;
	aAindex=0;

	for(var i=0;i<tits.length;i++){
		tits[i].index=i;
		tits[i].addEventListener('mouseover',function(){
			if(aUl[this.index].style.display!='block'){
				aUl[index].style.display='none';
				aUl[this.index].style.display='block';
				index=this.index;
			}
		})
	}

function changeOption(object){
	for(var j=0;j<object.length;j++){
		object[j].index=j;
		object[j].addEventListener('click',function(){
			if(!hasClass(this,'b_color')){
				removeClass(aA1[aAindex],'b_color');
				addClass(this,'b_color');
				aAindex=this.index;
			}
		})
	}
}
changeOption(aA1);
changeOption(aA2);
changeOption(aA3);
})(this);
/*导航栏切换 结束*/

/*固定头部出现 开始*/
;(function(fixedTop){
	var fixedTop=byid('fixed_top');
	window.addEventListener('scroll',function(){
		var oScrollTop=document.body.scrollTop||document.documentElement.scrollTop;
		if(oScrollTop>=600){
			show(fixedTop);
		}else{
			hide(fixedTop);
		}
	})
})(this);
/*固定头部出现 结束*/

/*固定头部-找课程 开始*/
;(function(fixed_top_nav){
	var aFixedNav=byid('fixed_top_nav').getElementsByClassName('itm_l'),
	aItmBlock=byid('fixed_top_nav').getElementsByClassName('itm_block'),
	findCourse=byid('find_course'),
	findList=byid('find_list'),
 	navIndex=0;

 	findCourse.addEventListener('mouseover',function(){
 		show(findList);
 	});

 	findCourse.addEventListener('mouseout',function(){
 		hide(findList);
 		removeClass(aFixedNav[navIndex],'h_first');
		removeClass(aItmBlock[navIndex],'first_block');
		addClass(aFixedNav[0],'h_first');
		addClass(aItmBlock[0],'first_block');
		navIndex=0;
 	})

 	for(var i=0;i<aFixedNav.length;i++){
 		aFixedNav[i].index=i;
 		aFixedNav[i].addEventListener('mouseover',function(){
 			if(!hasClass(this,'h_first')){
 				removeClass(aFixedNav[navIndex],'h_first');
 				removeClass(aItmBlock[navIndex],'first_block');
 				addClass(this,'h_first');
 				addClass(aItmBlock[this.index],'first_block');
 				navIndex=this.index;
 			}
 		})
 	}
 })(this);
/*固定头部-找课程 结束*/

/*登录弹出框弹出 开始*/
;(function(login){
	var loginBtn=byid('fixed_top_login'),
		Mask=byid('mask'),
		closeBtn=byid('close_button');

		loginBtn.addEventListener('click',function(){
			show(Mask);
		});

		closeBtn.addEventListener('click',function(){
			hide(Mask);
		});
})(this);
/*登录弹出框弹出 结束*/

/*登录弹出框-手机邮箱登录 开始*/
var aLoginTit=byclass('mask_block_tit'),
	aLoginCon=byclass('mask_block_con'),
	loginIndex=0;

	for(var i=0;i<aLoginTit.length;i++){
		aLoginTit[i].index=i;
		aLoginTit[i].addEventListener('click',function(){
			if(!hasClass(this,'selected')){
				removeClass(aLoginTit[loginIndex],'selected');
				hide(aLoginCon[loginIndex]);
				addClass(this,'selected');			
				show(aLoginCon[this.index]);
				loginIndex=this.index;
			}
		})
	}

/*登录弹出框-手机邮箱登录 结束*/

/*回到顶部 开始*/
;(function(fromtoTop){
	function fromtoTop(idBtn,idItem){
		var toTopBtn=byid('toTop'),
			toTopItem=byid('from_to_top'),
			toToptimer=null;
		window.addEventListener('scroll',function(){
				var oldScrollTop=document.body.scrollTop||document.documentElement.scrollTop;
				if(oldScrollTop>=20){
					toTopItem.style.display='block';
				}else{
					toTopItem.style.display='none';
				}
			})

		toTopBtn.addEventListener('click',function(){
			clearInterval(toToptimer);
			toToptimer=setInterval(toTop,30);
			
		})

		function toTop(){
		var oldScrollTop=document.body.scrollTop||document.documentElement.scrollTop;
			iSpeed=Math.floor(-oldScrollTop/6);
			document.body.scrollTop=document.documentElement.scrollTop=oldScrollTop+iSpeed;
			if(oldScrollTop==0){
				clearInterval(toToptimer);
			}
		}
	}
	 fromtoTop('toTop','from_to_top');
})(this);
/*回到顶部 结束*/