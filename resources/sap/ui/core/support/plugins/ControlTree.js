/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2012 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.ui.core.support.plugins.ControlTree");jQuery.sap.require("sap.ui.core.support.Plugin");(function(){sap.ui.core.support.Plugin.extend("sap.ui.core.support.plugins.ControlTree",{constructor:function(s){sap.ui.core.support.Plugin.apply(this,["sapUiSupportControlTree","Control Tree",s]);this._oStub=s;if(this.isToolPlugin()){this._aEventIds=[this.getId()+"Entry","sapUiSupportSelectorSelect","sapUiSupportControlProperties"]}else{this._aEventIds=["sapUiSupportRequestControlProperties","sapUiSupportControlPropertyChange"];var t=this;sap.ui.getCore().registerPlugin({startPlugin:function(c){t.oCore=c},stopPlugin:function(){t.oCore=undefined}})}}});function i(s){this.$().find("li img.sapUiControlTreeIcon").live("click",jQuery.proxy(this._onIconClick,this));this.$().find("li span").live("click",jQuery.proxy(this._onNodeClick,this));this.$().find("[data-sap-ui-name]").live("change",jQuery.proxy(this._onPropertyChange,this))};function a(s){if(JSON){var u=this.oCore.mUIAreas;var c=[];function b(e){var E={id:e.getId(),type:"",aggregation:[],association:[]};if(e instanceof sap.ui.core.UIArea){E.library="sap.ui.core";E.type="sap.ui.core.UIArea";jQuery.each(e.getContent(),function(I,e){var C=b(e);E.aggregation.push(C)})}else{E.library=e.getMetadata().getLibraryName();E.type=e.getMetadata().getElementName();if(e.mAggregations){for(var A in e.mAggregations){var o=e.mAggregations[A];if(o){var d=jQuery.isArray(o)?o:[o];jQuery.each(d,function(I,v){if(v instanceof sap.ui.core.Element){var C=b(v);E.aggregation.push(C)}})}}}if(e.mAssociations){for(var f in e.mAssociations){var g=e.mAssociations[f];if(g){var h=jQuery.isArray(g)?g:[g];jQuery.each(h,function(I,v){E.association.push(v)})}}}}return E};jQuery.each(this.oCore.mUIAreas,function(I,U){var e=b(U);c.push(e)});s.sendEvent(this.getId()+"Entry",{controlTree:JSON.stringify(c)})}};sap.ui.core.support.plugins.ControlTree.prototype.init=function(s){sap.ui.core.support.Plugin.prototype.init.apply(this,arguments);if(this.isToolPlugin()){i.call(this,s)}else{a.call(this,s)}};sap.ui.core.support.plugins.ControlTree.prototype.exit=function(s){sap.ui.core.support.Plugin.prototype.exit.apply(this,arguments);if(this.isToolPlugin()){this.$().find("li img.sapUiControlTreeIcon").die();this.$().find("li span").die()}};sap.ui.core.support.plugins.ControlTree.prototype.onsapUiSupportControlTreeEntry=function(e){var t=this;var c=JSON.parse(e.getParameter("controlTree"));function r(E,b){var h=E.aggregation.length>0||E.association.length>0;b.write("<li id=\"sap-debug-controltree-"+E.id+"\" class=\"sapUiControlTreeElement\">");var I=h?"minus":"space";b.write("<img class=\"sapUiControlTreeIcon\" style=\"height: 12px; width: 12px;\" align=\"middle\" src=\"../../../../testsuite/images/"+I+".gif\" />");var p=E.library.replace(/\./g,"/")+"/images/controls/"+E.type+".gif";b.write("<img style=\"height: 16px; width: 16px;\" align=\"middle\" src=\"../../../../../test-resources/"+p+"\" />");var C=E.type.lastIndexOf(".")>0?E.type.substring(E.type.lastIndexOf(".")+1):E.type;b.write("<span title=\""+E.type+"\">"+C+" - "+E.id+"</span>");if(E.aggregation.length>0){b.write("<ul>");jQuery.each(E.aggregation,function(d,v){r(v,b)});b.write("</ul>")}if(E.association.length>0){b.write("<ul>");jQuery.each(E.association,function(d,v){b.write("<li id=\"sap-debug-controltreelink-"+v+"\" class=\"sapUiControlTreeLink\">");b.write("<img style=\"height: 12px; width: 12px;\" align=\"middle\" src=\"../../../../testsuite/images/space.gif\" />");b.write("<img style=\"height: 12px; width: 12px;\" align=\"middle\" src=\"../../../../testsuite/images/link.gif\" />");b.write("<span title='Association to \""+v+"\"'>"+v+"</span>");b.write("</li>")});b.write("</ul>")}b.write("</li>")}var b=sap.ui.getCore().createRenderManager();b.write("<div id=\"sapUiSupportControlTreeArea\"><ul>");jQuery.each(c,function(I,v){r(v,b)});b.write("</ul></div><div id=\"sapUiSupportControlPropertiesArea\"></div>");b.flush(this.$().get(0));b.destroy()};sap.ui.core.support.plugins.ControlTree.prototype.onsapUiSupportSelectorSelect=function(e){var c=e.getParameter("id");jQuery(".sapUiControlTreeElement > span").removeClass("sapUiSupportControlTreeSelected");var t=this;jQuery.sap.byId("sap-debug-controltree-"+c).parents("[data-sap-ui-collapsed]").each(function(I,v){t._onIconClick({srcElement:jQuery(v).find("img:first").get(0)})});var p=jQuery.sap.byId("sap-debug-controltree-"+c).children("span").addClass("sapUiSupportControlTreeSelected").position();var s=this.$().find("#sapUiSupportControlTreeArea").scrollTop();this.$().find("#sapUiSupportControlTreeArea").scrollTop(s+p.top);this._oStub.sendEvent("sapUiSupportRequestControlProperties",{id:c})};sap.ui.core.support.plugins.ControlTree.prototype._onNodeClick=function(e){var s=e.srcElement||e.target;var $=jQuery(s).closest("li");if($.hasClass("sapUiControlTreeElement")){jQuery(".sapUiControlTreeElement > span").removeClass("sapUiSupportControlTreeSelected");$.children("span").addClass("sapUiSupportControlTreeSelected");this._oStub.sendEvent("sapUiSupportSelectorHighlight",{id:$.attr("id").substring("sap-debug-controltree-".length)});this._oStub.sendEvent("sapUiSupportRequestControlProperties",{id:$.attr("id").substring("sap-debug-controltree-".length)})}e.stopPropagation()};sap.ui.core.support.plugins.ControlTree.prototype._onIconClick=function(e){var s=e.srcElement||e.target;var $=jQuery(s);if($.parent().attr("data-sap-ui-collapsed")){$.attr("src",$.attr("src").replace("plus","minus")).parent().removeAttr("data-sap-ui-collapsed");$.siblings("ul").show()}else{$.attr("src",$.attr("src").replace("minus","plus")).parent().attr("data-sap-ui-collapsed","true");$.siblings("ul").hide()}if(e.stopPropagation){e.stopPropagation()}};sap.ui.core.support.plugins.ControlTree.prototype.onsapUiSupportRequestControlProperties=function(e){var p=/^((boolean|string|int|float)(\[\])?)$/;var c=[];var C=sap.ui.getCore().byId(e.getParameter("id"));if(!C&&sap.ui.getCore().getUIArea(e.getParameter("id"))){c.push({control:"sap.ui.core.UIArea",properties:[],aggregations:[]})}else if(C){var m=C.getMetadata();while(m instanceof sap.ui.core.ElementMetadata){var b={control:m.getName(),properties:[],aggregations:[]};var P=m.getProperties();jQuery.each(P,function(k,o){var d={};jQuery.each(o,function(n,v){if(n.substring(0,1)!=="_"){d[n]=v}var t=sap.ui.base.DataType.getType(o.type);if(t&&!(t instanceof sap.ui.base.DataType)){d["enumValues"]=t}});d.value=C.getProperty(k);b.properties.push(d)});var A=m.getAggregations();jQuery.each(A,function(k,o){if(o.altTypes&&o.altTypes[0]&&p.test(o.altTypes[0])){var d={};jQuery.each(o,function(n,v){if(n.substring(0,1)!=="_"){d[n]=v}});d.value=C.getAggregation(k);b.aggregations.push(d)}});c.push(b);m=m.getParent()}}this._oStub.sendEvent("sapUiSupportControlProperties",{id:e.getParameter("id"),properties:JSON.stringify(c)})};sap.ui.core.support.plugins.ControlTree.prototype.onsapUiSupportControlProperties=function(e){var c=JSON.parse(e.getParameter("properties"));var r=sap.ui.getCore().createRenderManager();r.write("<ul data-sap-ui-controlid='"+e.getParameter("id")+"'>");jQuery.each(c,function(I,v){r.write("<li>");r.write("<span><label class='sapUiSupportLabel'>BaseType:</label> <code>"+v.control+"</code></span>");if(v.properties.length>0||v.aggregations.length>0){r.write("<div class=\"sapUiSupportControlProperties\"><table><colgroup><col width=\"50%\"/><col width=\"50%\"/></colgroup>");jQuery.each(v.properties,function(I,p){r.write("<tr><td>");r.write("&nbsp;&nbsp;<label class='sapUiSupportLabel'>"+p.name+"</label>");r.write("</td><td>");if(p.type==="boolean"){r.write("<input type='checkbox' ");r.write("data-sap-ui-name='"+p.name+"' ");if(p.value==true){r.write("checked='checked'")}r.write("/>")}else if(p.enumValues){r.write("<div><select ");r.write("data-sap-ui-name='"+p.name+"'>");jQuery.each(p.enumValues,function(k,V){r.write("<option>");r.writeEscaped(k);r.write("</option>")});r.write("</select></div>")}else{r.write("<div><input type='text' ");r.write("data-sap-ui-name='"+p.name+"' ");if(p.value){r.write("value='");r.writeEscaped(""+p.value);r.write("'")}r.write("/></div>")}r.write("</td></tr>")});jQuery.each(v.aggregations,function(I,A){r.write("<tr><td>");r.write("&nbsp;&nbsp;<label class='sapUiSupportLabel'>"+A.name+"</label>");r.write("</td><td>");r.write(jQuery.sap.encodeHTML(""+A.value));r.write("</td></tr>")});r.write("</table></div>")}r.write("</li>")});r.write("</ul>");r.flush(this.$().find("#sapUiSupportControlPropertiesArea").get(0));r.destroy()};sap.ui.core.support.plugins.ControlTree.prototype._onPropertyChange=function(e){var s=e.srcElement||e.target;var $=jQuery(s);var I=$.closest("[data-sap-ui-controlid]").attr("data-sap-ui-controlid");var v=$.val();if($.attr("type")==="checkbox"){v=""+$.is(":checked")}this._oStub.sendEvent("sapUiSupportControlPropertyChange",{id:I,name:$.attr("data-sap-ui-name"),value:v})};sap.ui.core.support.plugins.ControlTree.prototype.onsapUiSupportControlPropertyChange=function(e){var I=e.getParameter("id");var c=sap.ui.getCore().byId(I);if(c){var n=e.getParameter("name");var v=e.getParameter("value");var m=c.getMetadata();m.getJSONKeys();var p=c.getMetadata().getAllProperties()[n];if(p&&p.type){var t=sap.ui.base.DataType.getType(p.type);if(t instanceof sap.ui.base.DataType){var V=t.parseValue(v);if(t.isValid(V)&&V!=="(null)"){c[p._sMutator](V)}}else if(t){if(t[v]){c[p._sMutator](v)}}}}}}());
