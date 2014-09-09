/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2012 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.ui.core.plugin.LessSupport");jQuery.sap.require("sap.ui.core.Core");(function(){sap.ui.core.plugin.LessSupport=function(){};sap.ui.core.plugin.LessSupport.prototype.startPlugin=function(c,o){jQuery.sap.log.info("Starting LessSupport plugin.");jQuery.sap.log.warning("  NOT FOR PRODUCTIVE USAGE! LessSupport is an experimental feature which might change in future!");if(window.top.JsUnit){jQuery.sap.log.info("  LessSupport has been deactivated for JSUnit Testrunner.");return}var u=jQuery.sap.getUriParameters();if(u.get("sap-ui-xx-noless")){jQuery.sap.log.info("  LessSupport has been deactivated by URL parameter.");return}else{jQuery.sap.log.info("  LessSupport can be deactivated by adding the following parameter to your URL: \"sap-ui-xx-noless=X\".")}window.less=window.less||{env:"production"};jQuery.sap.includeScript(jQuery.sap.getModulePath("","/sap/ui/thirdparty/less.js"));this.oCore=c;this.bActive=true;this.oCore.includeLibraryTheme=jQuery.proxy(this.includeLibraryTheme,this);this.oCore.applyTheme=jQuery.proxy(this.applyTheme,this);var a=this,U=false;jQuery("link[id^=sap-ui-theme-]").each(function(){U=a.initLink(this)||U});this.refreshLess(U);if(U){jQuery.sap.delayedCall(500,c,"fireThemeChanged",[{theme:c.sTheme}])}};sap.ui.core.plugin.LessSupport.prototype.stopPlugin=function(){jQuery.sap.log.info("Stopping LessSupport plugin.");if(this.bActive){jQuery("link[id^=sap-ui-theme-]").each(function(){var l=this.id.substr(13);jQuery.sap.byId("less:"+l).remove()});delete this.oCore.includeLibraryTheme;delete this.oCore.applyTheme;this.oCore=null}};sap.ui.core.plugin.LessSupport.prototype.initLink=function(l){var u=this.updateLink(l);jQuery("<style>").attr("id","less:"+l.id.substr(13)).attr("type","text/css").attr("media",this.media||"screen").insertAfter(l);return u};sap.ui.core.plugin.LessSupport.prototype.updateLink=function(l){var L=l.id.substr(13);var p;if((p=L.indexOf("-["))>0){L=L.substr(0,p)}var b=this.oCore._getThemePath(L,this.oCore.sTheme);var f=l.href.substring(l.href.lastIndexOf("/")+1,l.href.lastIndexOf("."));var a=jQuery.sap.endsWith(l.href,".less");var i=this.getLastModified(b+f+".less");var c=this.getLastModified(b+f+".css");var u=i>c;jQuery.sap.log.debug("LessSupport.updateLink: "+b+f+": "+(u?"LESS":"CSS"));if(!u){delete l.title;l.href=b+f+".css";l.rel="stylesheet";this.unregisterLink(l);return false}l.title=L;l.href=b+f+".less";l.rel="stylesheet/less";this.registerLink(l);return true};sap.ui.core.plugin.LessSupport.prototype.getLastModified=function(u){var l;jQuery.ajax({url:u,type:"HEAD",complexResult:true,async:false,success:function(d,a,x){l=x.getResponseHeader("Last-Modified")||-1},error:function(x,a,e){l=-1}});jQuery.sap.log.debug("CSS/LESS head-check: "+u+"; last-modified: "+l);return Date.parse(l)};sap.ui.core.plugin.LessSupport.prototype.applyTheme=function(T,s){sap.ui.core.Core.prototype.applyTheme.apply(this.oCore,arguments);var a=this,u=false;jQuery("link[id^=sap-ui-theme-]").each(function(){u=a.updateLink(this)||u});this.refreshLess(u)};sap.ui.core.plugin.LessSupport.prototype.includeLibraryTheme=function(l){sap.ui.core.Core.prototype.includeLibraryTheme.apply(this.oCore,arguments);var a=this,u=false;jQuery("link[id='sap-ui-theme-"+l+"']").each(function(){u=a.initLink(this)||u});this.refreshLess(u)};sap.ui.core.plugin.LessSupport.prototype.registerLink=function(l){if(window.less&&window.less.sheets){var i=jQuery.inArray(l,window.less.sheets);if(i===-1){window.less.sheets.push(l)}}};sap.ui.core.plugin.LessSupport.prototype.unregisterLink=function(l){if(window.less&&window.less.sheets){var L=l.id.substr(13);var i=jQuery.inArray(l,window.less.sheets);if(i>=0){window.less.sheets.splice(i,1);jQuery.sap.byId("less:"+L).html("")}}};sap.ui.core.plugin.LessSupport.prototype.refreshLess=function(u){if(u){if(!document.getElementById("sap-ui-ide-less-mode")){jQuery("<span>").attr("id","sap-ui-ide-less-mode").attr("title","Less mode is active. Click to hide this information.").css("position","absolute").css("right","10px").css("bottom","10px").css("padding","10px").css("border","3px solid red").css("border-radius","10px").css("opacity","0.75").css("color","black").css("background-color","white").css("font-weight","bold").css("z-index","99999").css("cursor","pointer").text("LESS MODE").bind("click",function(){jQuery(this).css("display","none")}).appendTo(window.document.body)}}else{var n=document.getElementById("sap-ui-ide-less-mode");if(n){jQuery(n).remove()}}var l=window.less;if(l&&l.refresh){l.refresh()}};var t=new sap.ui.core.plugin.LessSupport();sap.ui.getCore().registerPlugin(t)}());
