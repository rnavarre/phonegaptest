/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2012 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.m.Input");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.m.Input",{metadata:{library:"sap.m",properties:{"value":{type:"string",group:"Data",defaultValue:null,bindable:"bindable"},"type":{type:"sap.m.InputType",group:"Data",defaultValue:sap.m.InputType.Text},"width":{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},"enabled":{type:"boolean",group:"Behavior",defaultValue:true},"visible":{type:"boolean",group:"Appearance",defaultValue:true},"maxLength":{type:"int",group:"Behavior",defaultValue:0},"valueState":{type:"sap.ui.core.ValueState",group:"Data",defaultValue:sap.ui.core.ValueState.None},"name":{type:"string",group:"Misc",defaultValue:null},"placeholder":{type:"string",group:"Misc",defaultValue:null},"dateFormat":{type:"string",group:"Misc",defaultValue:'YYYY-MM-dd'}},events:{"change":{},"liveChange":{}}}});sap.m.Input.M_EVENTS={'change':'change','liveChange':'liveChange'};jQuery.sap.require("sap.ui.core.EnabledPropagator");jQuery.sap.require("sap.ui.core.format.DateFormat");
sap.m.Input.prototype.onBeforeRendering=function(b){if(this._jQuerydomRef instanceof jQuery){this._jQuerydomRef.unbind(".input")}};
sap.m.Input.prototype.onAfterRendering=function(b){if(jQuery.os.ios){this._jQuerydomRef=jQuery(this.getDomRef())}else{this._jQuerydomRef=jQuery(this.getDomRef()).children()}this._jQuerydomRef.bind("paste.input cut.input",jQuery.proxy(this.onkeyup,this));if(jQuery.os.ios&&(this.getType()=='Date'||this.getType()=='Month'||this.getType()=='Datetime'||this.getType()=='DatetimeLocal'||this.getType()=='Week')){this._jQuerydomRef.bind("blur.input",jQuery.proxy(this.onchange,this))}else{this._jQuerydomRef.bind("change.input",jQuery.proxy(this.onchange,this))}};
sap.m.Input.prototype.getFocusDomRef=function(){if(jQuery.os.android){return jQuery.sap.domById(this.getId()+'-inner')}else{return jQuery.sap.domById(this.getId())}};
sap.m.Input.prototype.ontouchstart=function(e){e.originalEvent._sapui_handledByControl=true};
sap.m.Input.prototype.onkeyup=function(e){var n=this._getAndUpdateValue();this.fireLiveChange({newValue:n})};
sap.m.Input.prototype.onchange=function(e){var n=this._getAndUpdateValue();this.fireChange({newValue:n})};
sap.m.Input.prototype._datePickerAvailable=(function(){var t=document.createElement("input");t.setAttribute("type","date");return(t.type=="date")})();
sap.m.Input.prototype._formatForGetter=function(v){var u,s,d;if((this.getType()=="Date")&&(!this._datePickerAvailable)){u=sap.ui.core.format.DateFormat.getDateInstance({pattern:this.getDateFormat()});s=sap.ui.core.format.DateFormat.getDateInstance({pattern:"YYYY-MM-dd"});d=u.parse(v);return s.format(d)}return v};
sap.m.Input.prototype._formatForRendering=function(v){var u,s,d;if((this.getType()=="Date")&&(!this._datePickerAvailable)){u=sap.ui.core.format.DateFormat.getDateInstance({pattern:this.getDateFormat()});s=sap.ui.core.format.DateFormat.getDateInstance({pattern:"YYYY-MM-dd"});d=s.parse(v);return u.format(d)}else{return v}};
sap.m.Input.prototype._getAndUpdateValue=function(){var o=this.getValue();var n=this._formatForGetter(this._jQuerydomRef.val());if(o!=n){this.setProperty("value",n,true)}return n}