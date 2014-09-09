/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2012 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.m.RadioButtonRenderer");sap.m.RadioButtonRenderer={};
sap.m.RadioButtonRenderer.render=function(r,R){if(!R.getVisible()){return}var e=R.getEnabled();var b=false;var m=0;r.addClass("sapMRb");r.write("<div");r.writeControlData(R);r.writeAccessibilityState(R,{role:"radio",checked:R.getSelected()===true,disabled:!e});if(R.getSelected()){r.addClass("sapMRbSel")}if(!e){b=true;r.addClass("sapMRbDis");m=-1}r.writeClasses();r.writeAttribute("tabIndex",m);r.write(">");r.write("<div class='sapMRbB'>");if(jQuery.os.android||jQuery.os.blackberry){r.write("<div");r.addClass("sapMRbBOut");r.writeClasses();r.write(">");r.write("<div");r.addClass("sapMRbBInn");r.writeClasses();r.write(">")}r.write("<input type='radio' tabindex='-1'");r.writeAttribute("id",R.getId()+"-RB");r.writeAttribute("name",R.getGroupName());if(R.getSelected()){r.writeAttribute("checked","checked")}if(!e){r.writeAttribute("disabled","disabled")}if(b){r.writeAttribute("readonly","readonly");r.writeAttribute("disabled","disabled")}r.write(" />");if(jQuery.os.android||jQuery.os.blackberry){r.write("</div></div>")}r.write("</div>");r.renderControl(R._oLabel);r.write("</div>")};
