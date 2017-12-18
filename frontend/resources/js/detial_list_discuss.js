/*倒计时部分 开始*/
;(function(countDown){
	function countDown(){
		var oDay=byid('time_days'),
		oHours=byid('time_hours'),
		oMinutes=byid('time_minutes'),
		curTime=new Date(),
		endTime=new Date('2017-10-30 23:23:23');
		countTime=endTime.getTime()-curTime.getTime();
		days=Math.floor(countTime/1000/60/60/24);
		hours=Math.floor(countTime/1000/60/60%24);
		minutes=Math.floor(countTime/1000/60%60);

		bit(oDay,days);
		bit(oHours,hours);
		bit(oMinutes,minutes);
	}
	function bit(obj,num){
		if(num<10){
			obj.innerHTML='0'+num;
		}else{
			obj.innerHTML=num;
		}
	}
	countDown();
	setInterval(countDown,1000);
})(this);
/*倒计时部分 结束*/

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

/*固定导航栏列表关闭按钮 开始*/
;(function(topCloseBtn){
	var findList=byid('find_list'),
		topCloseBtn=byid('fixed_top_nav').getElementsByClassName('close');

		for(var i=0;i<topCloseBtn.length;i++){
			topCloseBtn[i].addEventListener('click',function(){
				hide(findList);
			})
		}
})(this);
/*固定导航栏列表关闭按钮 结束*/

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

/*表单验证 开始*/
;(function(struts){
	/*当鼠标离开手机号文本框，提示文本及样式 开始*/
	var userTel=byid('user_telphone'),
		telInputBox=byid('tel_inputBox'),
		telPwd=byid('tel_pwd'),
		telPwdBox=byid('tel_pwd_inputBox'),
		errorBox=byid('m_error_box'),
		telErrTxt=byid('tel_err_txt'),
		userMail=byid('user_mail'),
		mailInputBox=byid('mail_inputBox'),
		mailPwd=byid('mail_pwd'),
		mailPwdBox=byid('mail_pwd_inputBox'),
		nerrorBox=byid('m_nerror'),
		mailErrTxt=byid('mail_err_txt');

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

	/*登录弹出框弹出 开始*/
	var topLoginBtn=byid('fixed_top_login'),
		Mask=byid('mask'),
		closeBtn=byid('close_button');

		topLoginBtn.addEventListener('click',function(){
			show(Mask);
			clearLogin();
		});

		closeBtn.addEventListener('click',function(){
			hide(Mask);
			clearLogin();
		});
	/*登录弹出框弹出 结束*/

	/*清除样式 开始*/
	function clearLogin(){
		if(errorBox.style.display=='block'){
			hide(errorBox);
			userTel.value='';
			userTel.style.backgroundColor='#fff';
			telPwd.value='';
			removeClass(telInputBox,'error');
			removeClass(telPwdBox,'error');
		}
		hide(nerrorBox);
		userMail.value='';
		userTel.style.backgroundColor='#fff';
		mailPwd.value='';
		removeClass(mailInputBox,'error');
		removeClass(mailPwdBox,'error');

	}
	/*清除样式 结束*/

	function telBlur(){
			reg=/^1[3|4|5|7|8][0-9]\d{8}$/;
			if(userTel.value==''){
				show(errorBox);
				addClass(telInputBox,'error');
				telErrTxt.innerHTML='号码不能为空，请输入手机号码！';
				telErrTxt.className='ferrorhead';
				return false;
			};

			if(reg.test(userTel.value)==false){
				show(errorBox);
				addClass(telInputBox,'error');
				telErrTxt.innerHTML='请输入正确的手机号码！';
				telErrTxt.className='ferrorhead';
				return false;
			};
			hide(errorBox);
			removeClass(telInputBox,'error');
			return true;
	}
	/*当鼠标离开手机号文本框，提示文本及样式 结束*/

	/*当鼠标离开手机号密码文本框，提示文本及样式 开始*/
	function telPwdBlur(){
			if(telPwd.value==''){
				show(errorBox);
				addClass(telPwdBox,'error');
				telErrTxt.innerHTML='密码不能为空！';
				telErrTxt.className='ferrorhead';
				return false;
			}
			if(telPwd.value.length<6 || telPwd.value.length>16){
				show(errorBox);
				addClass(telPwdBox,'error');
				telErrTxt.innerHTML='密码错误，请重新输入！';
				telErrTxt.className='ferrorhead';
				return false;
			};
			hide(errorBox);
			removeClass(telPwdBox,'error');
			return true;
	}
	/*当鼠标离开手机号密码文本框，提示文本及样式 结束*/

	/*当鼠标离开邮箱文本框，提示文本及样式 开始*/
	function mailBlur(){
			reg= /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			if(userMail.value==''){
				show(nerrorBox);
				addClass(mailInputBox,'error');
				mailErrTxt.innerHTML='邮箱不能为空，请输入邮箱！';
				mailErrTxt.mailInputBox='ferrorhead';
				return false;
			};

			if(reg.test(userTel.value)==false){
				show(nerrorBox);
				addClass(mailInputBox,'error');
				mailErrTxt.innerHTML='请输入正确的邮箱密码！';
				mailErrTxt.className='ferrorhead';
				return false;
			};
			hide(nerrorBox);
			removeClass(mailInputBox,'error');
			return true;
	}
	/*当鼠标离开邮箱文本框，提示文本及样式 结束*/

	/*当鼠标离开手机号邮箱密码文本框，提示文本及样式 开始*/
	function mailPwdBlur(){
			if(mailPwd.value==''){
				show(nerrorBox);
				addClass(mailPwdBox,'error');
				mailErrTxt.innerHTML='邮箱密码不能为空！';
				mailErrTxt.className='ferrorhead';
				return false;
			}
			if(mailPwd.value.length<6 || mailPwd.value.length>16){
				show(nerrorBox);
				addClass(mailPwdBox,'error');
				mailErrTxt.innerHTML='密码错误，请重新输入！';
				mailErrTxt.className='ferrorhead';
				return false;
			};
			hide(nerrorBox);
			removeClass(mailPwdBox,'error');
			return true;
	}
	/*当鼠标离开手机号邮箱密码文本框，提示文本及样式 结束*/

	function checkForm(){
      var flagUserName=telBlur();
      var flagPwd=telPwdBlur();
      var flagRepwd=mailBlur();
      var flagNickName=mailPwdBlur();

      telBlur();
      telPwdBlur();
      mailBlur();
      mailPwdBlur();
      
      if(flagUserName==true &&flagPwd==true &&flagRepwd==true &&flagNickName==true&&flagTel==true&flagEmail==true){
          return true;
          }
        else{
            return false;
            }
    
    }

	userTel.addEventListener('blur',telBlur);
	telPwd.addEventListener('blur',telPwdBlur);
	userMail.addEventListener('blur',mailBlur);
	mailPwd.addEventListener('blur',mailPwdBlur);

})(this);
/*表单验证 结束*/