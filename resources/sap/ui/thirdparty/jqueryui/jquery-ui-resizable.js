/*!
 * jQuery UI Resizable 1.8.23
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Resizables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function($,u){$.widget("ui.resizable",$.ui.mouse,{widgetEventPrefix:"resize",options:{alsoResize:false,animate:false,animateDuration:"slow",animateEasing:"swing",aspectRatio:false,autoHide:false,containment:false,ghost:false,grid:false,handles:"e,s,se",helper:false,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:1000},_create:function(){var s=this,o=this.options;this.element.addClass("ui-resizable");$.extend(this,{_aspectRatio:!!(o.aspectRatio),aspectRatio:o.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:o.helper||o.ghost||o.animate?o.helper||'ui-resizable-helper':null});if(this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)){this.element.wrap($('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position:this.element.css('position'),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css('top'),left:this.element.css('left')}));this.element=this.element.parent().data("resizable",this.element.data('resizable'));this.elementIsWrapper=true;this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")});this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0});this.originalResizeStyle=this.originalElement.css('resize');this.originalElement.css('resize','none');this._proportionallyResizeElements.push(this.originalElement.css({position:'static',zoom:1,display:'block'}));this.originalElement.css({margin:this.originalElement.css('margin')});this._proportionallyResize()}this.handles=o.handles||(!$('.ui-resizable-handle',this.element).length?"e,s,se":{n:'.ui-resizable-n',e:'.ui-resizable-e',s:'.ui-resizable-s',w:'.ui-resizable-w',se:'.ui-resizable-se',sw:'.ui-resizable-sw',ne:'.ui-resizable-ne',nw:'.ui-resizable-nw'});if(this.handles.constructor==String){if(this.handles=='all')this.handles='n,e,s,w,se,sw,ne,nw';var n=this.handles.split(",");this.handles={};for(var i=0;i<n.length;i++){var h=$.trim(n[i]),a='ui-resizable-'+h;var b=$('<div class="ui-resizable-handle '+a+'"></div>');b.css({zIndex:o.zIndex});if('se'==h){b.addClass('ui-icon ui-icon-gripsmall-diagonal-se')};this.handles[h]='.ui-resizable-'+h;this.element.append(b)}}this._renderAxis=function(t){t=t||this.element;for(var i in this.handles){if(this.handles[i].constructor==String)this.handles[i]=$(this.handles[i],this.element).show();if(this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)){var b=$(this.handles[i],this.element),p=0;p=/sw|ne|nw|se|n|s/.test(i)?b.outerHeight():b.outerWidth();var c=['padding',/ne|nw|n/.test(i)?'Top':/se|sw|s/.test(i)?'Bottom':/^e$/.test(i)?'Right':'Left'].join("");t.css(c,p);this._proportionallyResize()}if(!$(this.handles[i]).length)continue}};this._renderAxis(this.element);this._handles=$('.ui-resizable-handle',this.element).disableSelection();this._handles.mouseover(function(){if(!s.resizing){if(this.className)var b=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);s.axis=b&&b[1]?b[1]:'se'}});if(o.autoHide){this._handles.hide();$(this.element).addClass("ui-resizable-autohide").hover(function(){if(o.disabled)return;$(this).removeClass("ui-resizable-autohide");s._handles.show()},function(){if(o.disabled)return;if(!s.resizing){$(this).addClass("ui-resizable-autohide");s._handles.hide()}})}this._mouseInit()},destroy:function(){this._mouseDestroy();var _=function(a){$(a).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find('.ui-resizable-handle').remove()};if(this.elementIsWrapper){_(this.element);var w=this.element;w.after(this.originalElement.css({position:w.css('position'),width:w.outerWidth(),height:w.outerHeight(),top:w.css('top'),left:w.css('left')})).remove()}this.originalElement.css('resize',this.originalResizeStyle);_(this.originalElement);return this},_mouseCapture:function(a){var h=false;for(var i in this.handles){if($(this.handles[i])[0]==a.target){h=true}}return!this.options.disabled&&h},_mouseStart:function(a){var o=this.options,i=this.element.position(),b=this.element;this.resizing=true;this.documentScroll={top:$(document).scrollTop(),left:$(document).scrollLeft()};if(b.is('.ui-draggable')||(/absolute/).test(b.css('position'))){b.css({position:'absolute',top:i.top,left:i.left})}this._renderProxy();var c=d(this.helper.css('left')),f=d(this.helper.css('top'));if(o.containment){c+=$(o.containment).scrollLeft()||0;f+=$(o.containment).scrollTop()||0}this.offset=this.helper.offset();this.position={left:c,top:f};this.size=this._helper?{width:b.outerWidth(),height:b.outerHeight()}:{width:b.width(),height:b.height()};this.originalSize=this._helper?{width:b.outerWidth(),height:b.outerHeight()}:{width:b.width(),height:b.height()};this.originalPosition={left:c,top:f};this.sizeDiff={width:b.outerWidth()-b.width(),height:b.outerHeight()-b.height()};this.originalMousePosition={left:a.pageX,top:a.pageY};this.aspectRatio=(typeof o.aspectRatio=='number')?o.aspectRatio:((this.originalSize.width/this.originalSize.height)||1);var g=$('.ui-resizable-'+this.axis).css('cursor');$('body').css('cursor',g=='auto'?this.axis+'-resize':g);b.addClass("ui-resizable-resizing");this._propagate("start",a);return true},_mouseDrag:function(b){var c=this.helper,o=this.options,p={},s=this,f=this.originalMousePosition,a=this.axis;var g=(b.pageX-f.left)||0,h=(b.pageY-f.top)||0;var t=this._change[a];if(!t)return false;var i=t.apply(this,[b,g,h]),j=$.browser.msie&&$.browser.version<7,k=this.sizeDiff;this._updateVirtualBoundaries(b.shiftKey);if(this._aspectRatio||b.shiftKey)i=this._updateRatio(i,b);i=this._respectSize(i,b);this._propagate("resize",b);c.css({top:this.position.top+"px",left:this.position.left+"px",width:this.size.width+"px",height:this.size.height+"px"});if(!this._helper&&this._proportionallyResizeElements.length)this._proportionallyResize();this._updateCache(i);this._trigger('resize',b,this.ui());return false},_mouseStop:function(a){this.resizing=false;var o=this.options,b=this;if(this._helper){var p=this._proportionallyResizeElements,i=p.length&&(/textarea/i).test(p[0].nodeName),c=i&&$.ui.hasScroll(p[0],'left')?0:b.sizeDiff.height,f=i?0:b.sizeDiff.width;var s={width:(b.helper.width()-f),height:(b.helper.height()-c)},l=(parseInt(b.element.css('left'),10)+(b.position.left-b.originalPosition.left))||null,t=(parseInt(b.element.css('top'),10)+(b.position.top-b.originalPosition.top))||null;if(!o.animate)this.element.css($.extend(s,{top:t,left:l}));b.helper.height(b.size.height);b.helper.width(b.size.width);if(this._helper&&!o.animate)this._proportionallyResize()}$('body').css('cursor','auto');this.element.removeClass("ui-resizable-resizing");this._propagate("stop",a);if(this._helper)this.helper.remove();return false},_updateVirtualBoundaries:function(f){var o=this.options,p,a,c,g,b;b={minWidth:e(o.minWidth)?o.minWidth:0,maxWidth:e(o.maxWidth)?o.maxWidth:Infinity,minHeight:e(o.minHeight)?o.minHeight:0,maxHeight:e(o.maxHeight)?o.maxHeight:Infinity};if(this._aspectRatio||f){p=b.minHeight*this.aspectRatio;c=b.minWidth/this.aspectRatio;a=b.maxHeight*this.aspectRatio;g=b.maxWidth/this.aspectRatio;if(p>b.minWidth)b.minWidth=p;if(c>b.minHeight)b.minHeight=c;if(a<b.maxWidth)b.maxWidth=a;if(g<b.maxHeight)b.maxHeight=g}this._vBoundaries=b},_updateCache:function(a){var o=this.options;this.offset=this.helper.offset();if(e(a.left))this.position.left=a.left;if(e(a.top))this.position.top=a.top;if(e(a.height))this.size.height=a.height;if(e(a.width))this.size.width=a.width},_updateRatio:function(b,c){var o=this.options,f=this.position,g=this.size,a=this.axis;if(e(b.height))b.width=(b.height*this.aspectRatio);else if(e(b.width))b.height=(b.width/this.aspectRatio);if(a=='sw'){b.left=f.left+(g.width-b.width);b.top=null}if(a=='nw'){b.top=f.top+(g.height-b.height);b.left=f.left+(g.width-b.width)}return b},_respectSize:function(b,c){var f=this.helper,o=this._vBoundaries,p=this._aspectRatio||c.shiftKey,a=this.axis,i=e(b.width)&&o.maxWidth&&(o.maxWidth<b.width),g=e(b.height)&&o.maxHeight&&(o.maxHeight<b.height),h=e(b.width)&&o.minWidth&&(o.minWidth>b.width),j=e(b.height)&&o.minHeight&&(o.minHeight>b.height);if(h)b.width=o.minWidth;if(j)b.height=o.minHeight;if(i)b.width=o.maxWidth;if(g)b.height=o.maxHeight;var k=this.originalPosition.left+this.originalSize.width,l=this.position.top+this.size.height;var m=/sw|nw|w/.test(a),n=/nw|ne|n/.test(a);if(h&&m)b.left=k-o.minWidth;if(i&&m)b.left=k-o.maxWidth;if(j&&n)b.top=l-o.minHeight;if(g&&n)b.top=l-o.maxHeight;var q=!b.width&&!b.height;if(q&&!b.left&&b.top)b.top=null;else if(q&&!b.top&&b.left)b.left=null;return b},_proportionallyResize:function(){var o=this.options;if(!this._proportionallyResizeElements.length)return;var a=this.helper||this.element;for(var i=0;i<this._proportionallyResizeElements.length;i++){var c=this._proportionallyResizeElements[i];if(!this.borderDif){var b=[c.css('borderTopWidth'),c.css('borderRightWidth'),c.css('borderBottomWidth'),c.css('borderLeftWidth')],p=[c.css('paddingTop'),c.css('paddingRight'),c.css('paddingBottom'),c.css('paddingLeft')];this.borderDif=$.map(b,function(v,i){var f=parseInt(v,10)||0,g=parseInt(p[i],10)||0;return f+g})}if($.browser.msie&&!(!($(a).is(':hidden')||$(a).parents(':hidden').length)))continue;c.css({height:(a.height()-this.borderDif[0]-this.borderDif[2])||0,width:(a.width()-this.borderDif[1]-this.borderDif[3])||0})}},_renderProxy:function(){var a=this.element,o=this.options;this.elementOffset=a.offset();if(this._helper){this.helper=this.helper||$('<div style="overflow:hidden;"></div>');var i=$.browser.msie&&$.browser.version<7,b=(i?1:0),p=(i?2:-1);this.helper.addClass(this._helper).css({width:this.element.outerWidth()+p,height:this.element.outerHeight()+p,position:'absolute',left:this.elementOffset.left-b+'px',top:this.elementOffset.top-b+'px',zIndex:++o.zIndex});this.helper.appendTo("body").disableSelection()}else{this.helper=this.element}},_change:{e:function(a,b,c){return{width:this.originalSize.width+b}},w:function(a,b,c){var o=this.options,f=this.originalSize,s=this.originalPosition;return{left:s.left+b,width:f.width-b}},n:function(a,b,c){var o=this.options,f=this.originalSize,s=this.originalPosition;return{top:s.top+c,height:f.height-c}},s:function(a,b,c){return{height:this.originalSize.height+c}},se:function(a,b,c){return $.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[a,b,c]))},sw:function(a,b,c){return $.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[a,b,c]))},ne:function(a,b,c){return $.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[a,b,c]))},nw:function(a,b,c){return $.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[a,b,c]))}},_propagate:function(n,a){$.ui.plugin.call(this,n,[a,this.ui()]);(n!="resize"&&this._trigger(n,a,this.ui()))},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}});$.extend($.ui.resizable,{version:"1.8.23"});$.ui.plugin.add("resizable","alsoResize",{start:function(a,b){var s=$(this).data("resizable"),o=s.options;var _=function(c){$(c).each(function(){var f=$(this);f.data("resizable-alsoresize",{width:parseInt(f.width(),10),height:parseInt(f.height(),10),left:parseInt(f.css('left'),10),top:parseInt(f.css('top'),10)})})};if(typeof(o.alsoResize)=='object'&&!o.alsoResize.parentNode){if(o.alsoResize.length){o.alsoResize=o.alsoResize[0];_(o.alsoResize)}else{$.each(o.alsoResize,function(c){_(c)})}}else{_(o.alsoResize)}},resize:function(a,b){var s=$(this).data("resizable"),o=s.options,f=s.originalSize,g=s.originalPosition;var h={height:(s.size.height-f.height)||0,width:(s.size.width-f.width)||0,top:(s.position.top-g.top)||0,left:(s.position.left-g.left)||0},_=function(j,c){$(j).each(function(){var k=$(this),l=$(this).data("resizable-alsoresize"),m={},n=c&&c.length?c:k.parents(b.originalElement[0]).length?['width','height']:['width','height','top','left'];$.each(n,function(i,p){var q=(l[p]||0)+(h[p]||0);if(q&&q>=0)m[p]=q||null});k.css(m)})};if(typeof(o.alsoResize)=='object'&&!o.alsoResize.nodeType){$.each(o.alsoResize,function(i,c){_(i,c)})}else{_(o.alsoResize)}},stop:function(a,b){$(this).removeData("resizable-alsoresize")}});$.ui.plugin.add("resizable","animate",{stop:function(a,b){var s=$(this).data("resizable"),o=s.options;var p=s._proportionallyResizeElements,i=p.length&&(/textarea/i).test(p[0].nodeName),c=i&&$.ui.hasScroll(p[0],'left')?0:s.sizeDiff.height,f=i?0:s.sizeDiff.width;var g={width:(s.size.width-f),height:(s.size.height-c)},l=(parseInt(s.element.css('left'),10)+(s.position.left-s.originalPosition.left))||null,t=(parseInt(s.element.css('top'),10)+(s.position.top-s.originalPosition.top))||null;s.element.animate($.extend(g,t&&l?{top:t,left:l}:{}),{duration:o.animateDuration,easing:o.animateEasing,step:function(){var h={width:parseInt(s.element.css('width'),10),height:parseInt(s.element.css('height'),10),top:parseInt(s.element.css('top'),10),left:parseInt(s.element.css('left'),10)};if(p&&p.length)$(p[0]).css({width:h.width,height:h.height});s._updateCache(h);s._propagate("resize",a)}})}});$.ui.plugin.add("resizable","containment",{start:function(a,b){var s=$(this).data("resizable"),o=s.options,c=s.element;var f=o.containment,g=(f instanceof $)?f.get(0):(/parent/.test(f))?c.parent().get(0):f;if(!g)return;s.containerElement=$(g);if(/document/.test(f)||f==document){s.containerOffset={left:0,top:0};s.containerPosition={left:0,top:0};s.parentData={element:$(document),left:0,top:0,width:$(document).width(),height:$(document).height()||document.body.parentNode.scrollHeight}}else{var h=$(g),p=[];$(["Top","Right","Left","Bottom"]).each(function(i,n){p[i]=d(h.css("padding"+n))});s.containerOffset=h.offset();s.containerPosition=h.position();s.containerSize={height:(h.innerHeight()-p[3]),width:(h.innerWidth()-p[1])};var j=s.containerOffset,k=s.containerSize.height,l=s.containerSize.width,w=($.ui.hasScroll(g,"left")?g.scrollWidth:l),m=($.ui.hasScroll(g)?g.scrollHeight:k);s.parentData={element:g,left:j.left,top:j.top,width:w,height:m}}},resize:function(a,b){var s=$(this).data("resizable"),o=s.options,p=s.containerSize,c=s.containerOffset,f=s.size,g=s.position,h=s._aspectRatio||a.shiftKey,i={top:0,left:0},j=s.containerElement;if(j[0]!=document&&(/static/).test(j.css('position')))i=c;if(g.left<(s._helper?c.left:0)){s.size.width=s.size.width+(s._helper?(s.position.left-c.left):(s.position.left-i.left));if(h)s.size.height=s.size.width/s.aspectRatio;s.position.left=o.helper?c.left:0}if(g.top<(s._helper?c.top:0)){s.size.height=s.size.height+(s._helper?(s.position.top-c.top):s.position.top);if(h)s.size.width=s.size.height*s.aspectRatio;s.position.top=s._helper?c.top:0}s.offset.left=s.parentData.left+s.position.left;s.offset.top=s.parentData.top+s.position.top;var w=Math.abs((s._helper?s.offset.left-i.left:(s.offset.left-i.left))+s.sizeDiff.width),k=Math.abs((s._helper?s.offset.top-i.top:(s.offset.top-c.top))+s.sizeDiff.height);var l=s.containerElement.get(0)==s.element.parent().get(0),m=/relative|absolute/.test(s.containerElement.css('position'));if(l&&m)w-=s.parentData.left;if(w+s.size.width>=s.parentData.width){s.size.width=s.parentData.width-w;if(h)s.size.height=s.size.width/s.aspectRatio}if(k+s.size.height>=s.parentData.height){s.size.height=s.parentData.height-k;if(h)s.size.width=s.size.height*s.aspectRatio}},stop:function(a,b){var s=$(this).data("resizable"),o=s.options,c=s.position,f=s.containerOffset,g=s.containerPosition,i=s.containerElement;var j=$(s.helper),k=j.offset(),w=j.outerWidth()-s.sizeDiff.width,h=j.outerHeight()-s.sizeDiff.height;if(s._helper&&!o.animate&&(/relative/).test(i.css('position')))$(this).css({left:k.left-g.left-f.left,width:w,height:h});if(s._helper&&!o.animate&&(/static/).test(i.css('position')))$(this).css({left:k.left-g.left-f.left,width:w,height:h})}});$.ui.plugin.add("resizable","ghost",{start:function(a,b){var s=$(this).data("resizable"),o=s.options,c=s.size;s.ghost=s.originalElement.clone();s.ghost.css({opacity:.25,display:'block',position:'relative',height:c.height,width:c.width,margin:0,left:0,top:0}).addClass('ui-resizable-ghost').addClass(typeof o.ghost=='string'?o.ghost:'');s.ghost.appendTo(s.helper)},resize:function(a,b){var s=$(this).data("resizable"),o=s.options;if(s.ghost)s.ghost.css({position:'relative',height:s.size.height,width:s.size.width})},stop:function(a,b){var s=$(this).data("resizable"),o=s.options;if(s.ghost&&s.helper)s.helper.get(0).removeChild(s.ghost.get(0))}});$.ui.plugin.add("resizable","grid",{resize:function(b,c){var s=$(this).data("resizable"),o=s.options,f=s.size,g=s.originalSize,h=s.originalPosition,a=s.axis,r=o._aspectRatio||b.shiftKey;o.grid=typeof o.grid=="number"?[o.grid,o.grid]:o.grid;var i=Math.round((f.width-g.width)/(o.grid[0]||1))*(o.grid[0]||1),j=Math.round((f.height-g.height)/(o.grid[1]||1))*(o.grid[1]||1);if(/^(se|s|e)$/.test(a)){s.size.width=g.width+i;s.size.height=g.height+j}else if(/^(ne)$/.test(a)){s.size.width=g.width+i;s.size.height=g.height+j;s.position.top=h.top-j}else if(/^(sw)$/.test(a)){s.size.width=g.width+i;s.size.height=g.height+j;s.position.left=h.left-i}else{s.size.width=g.width+i;s.size.height=g.height+j;s.position.top=h.top-j;s.position.left=h.left-i}}});var d=function(v){return parseInt(v,10)||0};var e=function(v){return!isNaN(parseInt(v,10))}})(jQuery);
