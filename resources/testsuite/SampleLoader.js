/*!
 * @copyright@
 */
jQuery.sap.declare("sap.ui.legacy.SampleLoader");
sap.ui.legacy.SampleLoader=function(){};
sap.ui.legacy.SampleLoader.load=function(sUrl,oUiArea){this.iControlIndex=0;this.sRootControlId="";var oResponse=jQuery.sap.syncGetText(sUrl);if(oResponse.success&&oResponse.data){var oXML=sap.ui.util.Script.parseXMLDocument(oResponse.data);var oStringBuilder=new sap.ui.util.StringBuilder();var oNodes=oXML.getElementsByTagName("page")[0].childNodes;for(var i=0;i<oNodes.length;i++){var oNode=oNodes[i];if((oNode.nodeType==1)&&oNode.getAttribute("method")=="setContent"){oStringBuilder.append("var controls = [];\n");this.buildObjectTree(oNode,"",oStringBuilder);oStringBuilder.append("oUiArea.setRootControl(controls['"+this.sRootControlId+"'])");var sControlTree=oStringBuilder.toString();oUiArea.getRootNode().innerHTML="";this.sRootControlId=null;eval(sControlTree);break}}}else{alert("File Not found or no valid XML returned.")}};
sap.ui.legacy.SampleLoader.buildObjectTree=function(x,p,s,P){var S=sap.ui.util.Strings;var c=x.tagName;if(!c){return}c=S.charToUpperCase(c,0);var a=sap.ui.legacy[c];if(!a){return}new a();var a=sap.ui.legacy[c];var m=a.getMetadata();s.append("\n");var I=x.getAttribute("id");if(!I){I="i"+(this.iControlIndex++)}if(!this.sRootControlId){this.sRootControlId=I}s.append("controls[\""+I+"\"] = new sap.ui.legacy."+c+"(\""+I+"\");");for(var i=0;i<x.attributes.length;i++){var A=x.attributes[i].nodeName;var b=x.attributes[i].nodeValue;if(A=="id"){continue}if(A.indexOf("Info")>-1){continue}if(A=="method"){if(p){var d=b,M=d.substr(0,2),e=d.substr(3),f=e,g=S.endsWith(e,"s");if(g){if(S.endsWith(e,"ies")){f=e.substr(0,e.length-3)+"y"}else{f=e.substr(0,e.length-1)}}if(M=="add"||g){M="add"}else{M="set"}if(e=="Control"&&!this.getTypeFromMetadata(P,"Control")){e="Content";f=e}else if(e=="Content"&&!this.getTypeFromMetadata(P,"Content")){e="Control";f=e}if(this.getTypeFromMetadata(P,e)){s.append(p+"."+M+f+"(controls[\""+I+"\"]);")}}continue}A=A.substr(0,1).toUpperCase()+A.substr(1);var t=this.getTypeFromMetadata(m,A);if(t=="int"||t=="boolean"||t=="float"){s.append("controls[\""+I+"\"].set"+A+"("+b+");")}else if(t){s.append("controls[\""+I+"\"].set"+A+"(\""+b+"\");")}}var E=m.getEvents();for(var n in E){var h="attach"+S.charToUpperCase(n,0);s.append("controls[\""+I+"\"]."+h+"(function(oEvent) {jQuery.sap.log.info(\"Legacy Control fired \" + oEvent.sId + \" on \" + oEvent.target.id + \" instance of \" + jQuery(oEvent.target).control()[0].getMetadata().getName(),\"\",\"sap.ui.core.Core\");});")}var j=I;for(var i=0;i<x.childNodes.length;i++){this.buildObjectTree(x.childNodes[i],"controls[\""+j+"\"]",s,m)}};
sap.ui.legacy.SampleLoader.getTypeFromMetadata=function(m,M){var c=m.getAllProperties();for(n in c){var C=c[n];if(C.name==M){return C.type}}var c=m.getAllAggregations();for(n in c){var C=c[n];if(C.name==M){return C.type}}var c=m.getAllAssociations();for(n in c){var C=c[n];if(C.name==M){return C.type}}return undefined};