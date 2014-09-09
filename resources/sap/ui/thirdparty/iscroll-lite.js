/*!
 * iScroll Lite base on iScroll v4.1.6 ~ Copyright (c) 2011 Matteo Spinelli, http://cubiq.org
 * Released under MIT license, http://cubiq.org/license
 */
(function(){var m=Math,a=function(r){return r>>0},v=(/webkit/i).test(navigator.appVersion)?'webkit':(/firefox/i).test(navigator.userAgent)?'Moz':'opera'in window?'O':'',b=(/android/gi).test(navigator.appVersion),c=(/iphone|ipad/gi).test(navigator.appVersion),d=(/playbook/gi).test(navigator.appVersion),f=(/hp-tablet/gi).test(navigator.appVersion),h='WebKitCSSMatrix'in window&&'m11'in new WebKitCSSMatrix(),g='ontouchstart'in window&&!f,j=v+'Transform'in document.documentElement.style,k=c||d,n=(function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){return setTimeout(e,17)}})(),o=(function(){return window.cancelRequestAnimationFrame||window.webkitCancelAnimationFrame||window.webkitCancelRequestAnimationFrame||window.mozCancelRequestAnimationFrame||window.oCancelRequestAnimationFrame||window.msCancelRequestAnimationFrame||clearTimeout})(),R='onorientationchange'in window?'orientationchange':'resize',S=g?'touchstart':'mousedown',M=g?'touchmove':'mousemove',E=g?'touchend':'mouseup',C=g?'touchcancel':'mouseup',p='translate'+(h?'3d(':'('),q=h?',0)':')',s=function(l,r){var t=this,u=document,i;t.wrapper=typeof l=='object'?l:u.getElementById(l);t.wrapper.style.overflow='hidden';t.scroller=t.wrapper.children[0];t.options={hScroll:true,vScroll:true,x:0,y:0,bounce:true,bounceLock:false,momentum:true,lockDirection:true,useTransform:true,useTransition:false,onRefresh:null,onBeforeScrollStart:function(e){e.preventDefault()},onScrollStart:null,onBeforeScrollMove:null,onScrollMove:null,onBeforeScrollEnd:null,onScrollEnd:null,onTouchEnd:null,onDestroy:null};for(i in r)t.options[i]=r[i];t.x=t.options.x;t.y=t.options.y;t.options.useTransform=j?t.options.useTransform:false;t.options.hScrollbar=t.options.hScroll&&t.options.hScrollbar;t.options.vScrollbar=t.options.vScroll&&t.options.vScrollbar;t.options.useTransition=k&&t.options.useTransition;t.scroller.style[v+'TransitionProperty']=t.options.useTransform?'-'+v.toLowerCase()+'-transform':'top left';t.scroller.style[v+'TransitionDuration']='0';t.scroller.style[v+'TransformOrigin']='0 0';if(t.options.useTransition)t.scroller.style[v+'TransitionTimingFunction']='cubic-bezier(0.33,0.66,0.66,1)';if(t.options.useTransform)t.scroller.style[v+'Transform']=p+t.x+'px,'+t.y+'px'+q;else t.scroller.style.cssText+=';position:absolute;top:'+t.y+'px;left:'+t.x+'px';t.refresh();t._bind(R,window);t._bind(S);if(!g)t._bind('mouseout',t.wrapper)};s.prototype={enabled:true,x:0,y:0,steps:[],scale:1,handleEvent:function(e){var t=this;switch(e.type){case S:if(!g&&e.button!==0)return;t._start(e);break;case M:t._move(e);break;case E:case C:t._end(e);break;case R:t._resize();break;case'mouseout':t._mouseout(e);break;case'webkitTransitionEnd':t._transitionEnd(e);break}},_resize:function(){this.refresh()},_pos:function(x,y){x=this.hScroll?x:0;y=this.vScroll?y:0;if(this.options.useTransform){this.scroller.style[v+'Transform']=p+x+'px,'+y+'px'+q+' scale('+this.scale+')'}else{x=a(x);y=a(y);this.scroller.style.left=x+'px';this.scroller.style.top=y+'px'}this.x=x;this.y=y},_start:function(e){var t=this,i=g?e.touches[0]:e,l,x,y;if(!t.enabled)return;if(t.options.onBeforeScrollStart)t.options.onBeforeScrollStart.call(t,e);if(t.options.useTransition)t._transitionTime(0);t.moved=false;t.animating=false;t.zoomed=false;t.distX=0;t.distY=0;t.absDistX=0;t.absDistY=0;t.dirX=0;t.dirY=0;if(t.options.momentum){if(t.options.useTransform){l=getComputedStyle(t.scroller,null)[v+'Transform'].replace(/[^0-9-.,]/g,'').split(',');x=l[4]*1;y=l[5]*1}else{x=getComputedStyle(t.scroller,null).left.replace(/[^0-9-]/g,'')*1;y=getComputedStyle(t.scroller,null).top.replace(/[^0-9-]/g,'')*1}if(x!=t.x||y!=t.y){if(t.options.useTransition)t._unbind('webkitTransitionEnd');else o(t.aniTime);t.steps=[];t._pos(x,y)}}t.startX=t.x;t.startY=t.y;t.pointX=i.pageX;t.pointY=i.pageY;t.startTime=e.timeStamp||Date.now();if(t.options.onScrollStart)t.options.onScrollStart.call(t,e);t._bind(M);t._bind(E);t._bind(C)},_move:function(e){var t=this,i=g?e.touches[0]:e,l=i.pageX-t.pointX,r=i.pageY-t.pointY,u=t.x+l,w=t.y+r,x=e.timeStamp||Date.now();if(t.options.onBeforeScrollMove)t.options.onBeforeScrollMove.call(t,e);t.pointX=i.pageX;t.pointY=i.pageY;if(u>0||u<t.maxScrollX){u=t.options.bounce?t.x+(l/2):u>=0||t.maxScrollX>=0?0:t.maxScrollX}if(w>0||w<t.maxScrollY){w=t.options.bounce?t.y+(r/2):w>=0||t.maxScrollY>=0?0:t.maxScrollY}t.distX+=l;t.distY+=r;t.absDistX=m.abs(t.distX);t.absDistY=m.abs(t.distY);if(t.absDistX<6&&t.absDistY<6){return}if(t.options.lockDirection){if(t.absDistX>t.absDistY+5){w=t.y;r=0}else if(t.absDistY>t.absDistX+5){u=t.x;l=0}}t.moved=true;t._pos(u,w);t.dirX=l>0?-1:l<0?1:0;t.dirY=r>0?-1:r<0?1:0;if(x-t.startTime>300){t.startTime=x;t.startX=t.x;t.startY=t.y}if(t.options.onScrollMove)t.options.onScrollMove.call(t,e)},_end:function(e){if(g&&e.touches.length!=0)return;var t=this,i=g?e.changedTouches[0]:e,l,r,u={dist:0,time:0},w={dist:0,time:0},x=(e.timeStamp||Date.now())-t.startTime,y=t.x,z=t.y,A;t._unbind(M);t._unbind(E);t._unbind(C);if(t.options.onBeforeScrollEnd)t.options.onBeforeScrollEnd.call(t,e);if(!t.moved){if(g){l=i.target;while(l.nodeType!=1)l=l.parentNode;if(l.tagName!='SELECT'&&l.tagName!='INPUT'&&l.tagName!='TEXTAREA'){r=document.createEvent('MouseEvents');r.initMouseEvent('click',true,true,e.view,1,i.screenX,i.screenY,i.clientX,i.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,0,null);r._fake=true;l.dispatchEvent(r)}}t._resetPos(200);if(t.options.onTouchEnd)t.options.onTouchEnd.call(t,e);return}if(x<300&&t.options.momentum){u=y?t._momentum(y-t.startX,x,-t.x,t.scrollerW-t.wrapperW+t.x,t.options.bounce?t.wrapperW:0):u;w=z?t._momentum(z-t.startY,x,-t.y,(t.maxScrollY<0?t.scrollerH-t.wrapperH+t.y:0),t.options.bounce?t.wrapperH:0):w;y=t.x+u.dist;z=t.y+w.dist;if((t.x>0&&y>0)||(t.x<t.maxScrollX&&y<t.maxScrollX))u={dist:0,time:0};if((t.y>0&&z>0)||(t.y<t.maxScrollY&&z<t.maxScrollY))w={dist:0,time:0}}if(u.dist||w.dist){A=m.max(m.max(u.time,w.time),10);t.scrollTo(a(y),a(z),A);if(t.options.onTouchEnd)t.options.onTouchEnd.call(t,e);return}t._resetPos(200);if(t.options.onTouchEnd)t.options.onTouchEnd.call(t,e)},_resetPos:function(t){var e=this,r=e.x>=0?0:e.x<e.maxScrollX?e.maxScrollX:e.x,i=e.y>=0||e.maxScrollY>0?0:e.y<e.maxScrollY?e.maxScrollY:e.y;if(r==e.x&&i==e.y){if(e.moved){if(e.options.onScrollEnd)e.options.onScrollEnd.call(e);e.moved=false}return}e.scrollTo(r,i,t||0)},_mouseout:function(e){var t=e.relatedTarget;if(!t){this._end(e);return}while(t=t.parentNode)if(t==this.wrapper)return;this._end(e)},_transitionEnd:function(e){var t=this;if(e.target!=t.scroller)return;t._unbind('webkitTransitionEnd');t._startAni()},_startAni:function(){var t=this,e=t.x,i=t.y,l=Date.now(),r,u,w;if(t.animating)return;if(!t.steps.length){t._resetPos(400);return}r=t.steps.shift();if(r.x==e&&r.y==i)r.time=0;t.animating=true;t.moved=true;if(t.options.useTransition){t._transitionTime(r.time);t._pos(r.x,r.y);t.animating=false;if(r.time)t._bind('webkitTransitionEnd');else t._resetPos(0);return}w=function(){var x=Date.now(),y,z;if(x>=l+r.time){t._pos(r.x,r.y);t.animating=false;if(t.options.onAnimationEnd)t.options.onAnimationEnd.call(t);t._startAni();return}x=(x-l)/r.time-1;u=m.sqrt(1-x*x);y=(r.x-e)*u+e;z=(r.y-i)*u+i;t._pos(y,z);if(t.animating)t.aniTime=n(w)};w()},_transitionTime:function(t){this.scroller.style[v+'TransitionDuration']=t+'ms'},_momentum:function(e,t,i,l,r){var u=0.0006,w=m.abs(e)/t,x=(w*w)/(2*u),y=0,z=0;if(e>0&&x>i){z=r/(6/(x/w*u));i=i+z;w=w*i/x;x=i}else if(e<0&&x>l){z=r/(6/(x/w*u));l=l+z;w=w*l/x;x=l}x=x*(e<0?-1:1);y=w/u;return{dist:x,time:a(y)}},_offset:function(e){var l=-e.offsetLeft,t=-e.offsetTop;while(e=e.offsetParent){l-=e.offsetLeft;t-=e.offsetTop}return{left:l,top:t}},_bind:function(t,e,i){(e||this.scroller).addEventListener(t,this,!!i)},_unbind:function(t,e,i){(e||this.scroller).removeEventListener(t,this,!!i)},destroy:function(){var t=this;t.scroller.style[v+'Transform']='';t._unbind(R,window);t._unbind(S);t._unbind(M);t._unbind(E);t._unbind(C);t._unbind('mouseout',t.wrapper);if(t.options.useTransition)t._unbind('webkitTransitionEnd');if(t.options.onDestroy)t.options.onDestroy.call(t)},refresh:function(){var t=this,e;t.wrapperW=t.wrapper.clientWidth;t.wrapperH=t.wrapper.clientHeight;t.scrollerW=t.scroller.offsetWidth;t.scrollerH=t.scroller.offsetHeight;t.maxScrollX=t.wrapperW-t.scrollerW;t.maxScrollY=t.wrapperH-t.scrollerH;t.dirX=0;t.dirY=0;t.hScroll=t.options.hScroll&&t.maxScrollX<0;t.vScroll=t.options.vScroll&&(!t.options.bounceLock&&!t.hScroll||t.scrollerH>t.wrapperH);e=t._offset(t.wrapper);t.wrapperOffsetLeft=-e.left;t.wrapperOffsetTop=-e.top;t.scroller.style[v+'TransitionDuration']='0';t._resetPos(200)},scrollTo:function(x,y,t,r){var e=this,u=x,i,l;e.stop();if(!u.length)u=[{x:x,y:y,time:t,relative:r}];for(i=0,l=u.length;i<l;i++){if(u[i].relative){u[i].x=e.x-u[i].x;u[i].y=e.y-u[i].y}e.steps.push({x:u[i].x,y:u[i].y,time:u[i].time||0})}e._startAni()},scrollToElement:function(e,t){var i=this,l;e=e.nodeType?e:i.scroller.querySelector(e);if(!e)return;l=i._offset(e);l.left+=i.wrapperOffsetLeft;l.top+=i.wrapperOffsetTop;l.left=l.left>0?0:l.left<i.maxScrollX?i.maxScrollX:l.left;l.top=l.top>0?0:l.top<i.maxScrollY?i.maxScrollY:l.top;t=t===undefined?m.max(m.abs(l.left)*2,m.abs(l.top)*2):t;i.scrollTo(l.left,l.top,t)},disable:function(){this.stop();this._resetPos(0);this.enabled=false;this._unbind(M);this._unbind(E);this._unbind(C)},enable:function(){this.enabled=true},stop:function(){o(this.aniTime);this.steps=[];this.moved=false;this.animating=false}};if(typeof exports!=='undefined')exports.iScroll=s;else window.iScroll=s})();
