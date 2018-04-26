(function(a,b){if(typeof define==="function"&&define.amd){define(b)
}else{if(typeof exports!=="undefined"){module.exports=b()
}else{a.atmosphere=b()
}}}(this,function(){var a={},d,c=false,g=[],f=[],e=0,b=Object.prototype.hasOwnProperty;
a={version:"2.3.2-javascript",onError:function(h){},onClose:function(h){},onOpen:function(h){},onReopen:function(h){},onMessage:function(h){},onReconnect:function(i,h){},onMessagePublished:function(h){},onTransportFailure:function(i,h){},onLocalMessage:function(h){},onFailureToReconnect:function(i,h){},onClientTimeout:function(h){},onOpenAfterResume:function(h){},WebsocketApiAdapter:function(i){var h,j;
i.onMessage=function(k){j.onmessage({data:k.responseBody})
};
i.onMessagePublished=function(k){j.onmessage({data:k.responseBody})
};
i.onOpen=function(k){j.onopen(k)
};
j={close:function(){h.close()
},send:function(k){h.push(k)
},onmessage:function(k){},onopen:function(k){},onclose:function(k){},onerror:function(k){}};
h=new a.subscribe(i);
return j
},AtmosphereRequest:function(ad){var p={timeout:300000,method:"GET",headers:{},contentType:"",callback:null,url:"",data:"",suspend:true,maxRequest:-1,reconnect:true,maxStreamingLength:10000000,lastIndex:0,logLevel:"info",requestCount:0,fallbackMethod:"GET",fallbackTransport:"streaming",transport:"long-polling",webSocketImpl:null,webSocketBinaryType:null,dispatchUrl:null,webSocketPathDelimiter:"@@",enableXDR:false,rewriteURL:false,attachHeadersAsQueryString:true,executeCallbackBeforeReconnect:false,readyState:0,withCredentials:false,trackMessageLength:false,messageDelimiter:"|",connectTimeout:-1,reconnectInterval:0,dropHeaders:true,uuid:0,async:true,shared:false,readResponsesHeaders:false,maxReconnectOnClose:5,enableProtocol:true,disableDisconnect:false,pollingInterval:0,heartbeat:{client:null,server:null},ackInterval:0,closeAsync:false,reconnectOnServerError:true,handleOnlineOffline:true,onError:function(aI){},onClose:function(aI){},onOpen:function(aI){},onMessage:function(aI){},onReopen:function(aJ,aI){},onReconnect:function(aJ,aI){},onMessagePublished:function(aI){},onTransportFailure:function(aJ,aI){},onLocalMessage:function(aI){},onFailureToReconnect:function(aJ,aI){},onClientTimeout:function(aI){},onOpenAfterResume:function(aI){}};
var ar={status:200,reasonPhrase:"OK",responseBody:"",messages:[],headers:[],state:"messageReceived",transport:"polling",error:null,request:null,partialMessage:"",errorHandled:false,closedByClientTimeout:false,ffTryingReconnect:false};
var aw=null;
var ag=null;
var z=null;
var n=null;
var X=null;
var u=true;
var ay=0;
var J=0;
var ak="X";
var aG=false;
var Q=null;
var h;
var ax=null;
var R=a.util.now();
var y;
var aF;
var Y=false;
ao(ad);
function aj(){u=true;
aG=false;
ay=0;
aw=null;
ag=null;
z=null;
n=null
}function U(){l();
aj()
}function w(aI){if(aI=="debug"){return p.logLevel==="debug"
}else{if(aI=="info"){return p.logLevel==="info"||p.logLevel==="debug"
}else{if(aI=="warn"){return p.logLevel==="warn"||p.logLevel==="info"||p.logLevel==="debug"
}else{if(aI=="error"){return p.logLevel==="error"||p.logLevel==="warn"||p.logLevel==="info"||p.logLevel==="debug"
}else{return false
}}}}}function aH(aI){if(w("debug")){a.util.debug(new Date()+" Atmosphere: "+aI)
}}function I(aJ,aI){if(ar.partialMessage===""&&(aI.transport==="streaming")&&(aJ.responseText.length>aI.maxStreamingLength)){return true
}return false
}function D(){if(p.enableProtocol&&!p.disableDisconnect&&!p.firstMessage){var aK="X-Atmosphere-Transport=close&X-Atmosphere-tracking-id="+p.uuid;
a.util.each(p.headers,function(aM,aO){var aN=a.util.isFunction(aO)?aO.call(this,p,p,ar):aO;
if(aN!=null){aK+="&"+encodeURIComponent(aM)+"="+encodeURIComponent(aN)
}});
var aI=p.url.replace(/([?&])_=[^&]*/,aK);
aI=aI+(aI===p.url?(/\?/.test(p.url)?"&":"?")+aK:"");
var aJ={connected:false};
var aL=new a.AtmosphereRequest(aJ);
aL.connectTimeout=p.connectTimeout;
aL.attachHeadersAsQueryString=false;
aL.dropHeaders=true;
aL.url=aI;
aL.contentType="text/plain";
aL.transport="polling";
aL.method="GET";
aL.data="";
aL.heartbeat=null;
if(p.enableXDR){aL.enableXDR=p.enableXDR
}aL.async=p.closeAsync;
am("",aL)
}}function H(){aH("Closing (AtmosphereRequest._close() called)");
aG=true;
if(p.reconnectId){clearTimeout(p.reconnectId);
delete p.reconnectId
}if(p.heartbeatTimer){clearTimeout(p.heartbeatTimer)
}p.reconnect=false;
ar.request=p;
ar.state="unsubscribe";
ar.responseBody="";
ar.status=408;
ar.partialMessage="";
ai();
D();
l()
}function l(){ar.partialMessage="";
if(p.id){clearTimeout(p.id)
}if(p.heartbeatTimer){clearTimeout(p.heartbeatTimer)
}if(p.reconnectId){clearTimeout(p.reconnectId);
delete p.reconnectId
}if(n!=null){n.close();
n=null
}if(X!=null){X.abort();
X=null
}if(z!=null){z.abort();
z=null
}if(aw!=null){if(aw.canSendMessage){aH("invoking .close() on WebSocket object");
aw.close()
}aw=null
}if(ag!=null){ag.close();
ag=null
}ah()
}function ah(){if(h!=null){clearInterval(y);
document.cookie=aF+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
h.signal("close",{reason:"",heir:!aG?R:(h.get("children")||[])[0]});
h.close()
}if(ax!=null){ax.close()
}}function ao(aI){U();
p=a.util.extend(p,aI);
p.mrequest=p.reconnect;
if(!p.reconnect){p.reconnect=true
}}function au(){return p.webSocketImpl!=null||window.WebSocket||window.MozWebSocket
}function at(){var aJ=a.util.getAbsoluteURL(p.url.toLowerCase());
var aK=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/.exec(aJ);
var aI=!!(aK&&(aK[1]!=window.location.protocol||aK[2]!=window.location.hostname||(aK[3]||(aK[1]==="http:"?80:443))!=(window.location.port||(window.location.protocol==="http:"?80:443))));
return window.EventSource&&(!aI||!a.util.browser.safari||a.util.browser.vmajor>=7)
}function aa(){if(p.shared){ax=aD(p);
if(ax!=null){if(w("debug")){a.util.debug("Storage service available. All communication will be local")
}if(ax.open(p)){return
}}if(w("debug")){a.util.debug("No Storage service available.")
}ax=null
}p.firstMessage=e==0?true:false;
p.isOpen=false;
p.ctime=a.util.now();
if(p.uuid===0){p.uuid=e
}ar.closedByClientTimeout=false;
if(p.transport!=="websocket"&&p.transport!=="sse"){L(p)
}else{if(p.transport==="websocket"){if(!au()){az("Websocket is not supported, using request.fallbackTransport ("+p.fallbackTransport+")")
}else{af(false)
}}else{if(p.transport==="sse"){if(!at()){az("Server Side Events(SSE) is not supported, using request.fallbackTransport ("+p.fallbackTransport+")")
}else{C(false)
}}}}}function aD(aM){var aN,aL,aQ,aI="atmosphere-"+aM.url,aJ={storage:function(){function aR(aV){if(aV.key===aI&&aV.newValue){aK(aV.newValue)
}}if(!a.util.storage){return
}var aU=window.localStorage,aS=function(aV){return a.util.parseJSON(aU.getItem(aI+"-"+aV))
},aT=function(aV,aW){aU.setItem(aI+"-"+aV,a.util.stringifyJSON(aW))
};
return{init:function(){aT("children",aS("children").concat([R]));
a.util.on(window,"storage",aR);
return aS("opened")
},signal:function(aV,aW){aU.setItem(aI,a.util.stringifyJSON({target:"p",type:aV,data:aW}))
},close:function(){var aV=aS("children");
a.util.off(window,"storage",aR);
if(aV){if(aO(aV,aM.id)){aT("children",aV)
}}}}
},windowref:function(){var aR=window.open("",aI.replace(/\W/g,""));
if(!aR||aR.closed||!aR.callbacks){return
}return{init:function(){aR.callbacks.push(aK);
aR.children.push(R);
return aR.opened
},signal:function(aS,aT){if(!aR.closed&&aR.fire){aR.fire(a.util.stringifyJSON({target:"p",type:aS,data:aT}))
}},close:function(){if(!aQ){aO(aR.callbacks,aK);
aO(aR.children,R)
}}}
}};
function aO(aU,aT){var aR,aS=aU.length;
for(aR=0;
aR<aS;
aR++){if(aU[aR]===aT){aU.splice(aR,1)
}}return aS!==aU.length
}function aK(aR){var aT=a.util.parseJSON(aR),aS=aT.data;
if(aT.target==="c"){switch(aT.type){case"open":V("opening","local",p);
break;
case"close":if(!aQ){aQ=true;
if(aS.reason==="aborted"){H()
}else{if(aS.heir===R){aa()
}else{setTimeout(function(){aa()
},100)
}}}break;
case"message":k(aS,"messageReceived",200,aM.transport);
break;
case"localMessage":F(aS);
break
}}}function aP(){var aR=new RegExp("(?:^|; )("+encodeURIComponent(aI)+")=([^;]*)").exec(document.cookie);
if(aR){return a.util.parseJSON(decodeURIComponent(aR[2]))
}}aN=aP();
if(!aN||a.util.now()-aN.ts>1000){return
}aL=aJ.storage()||aJ.windowref();
if(!aL){return
}return{open:function(){var aR;
y=setInterval(function(){var aS=aN;
aN=aP();
if(!aN||aS.ts===aN.ts){aK(a.util.stringifyJSON({target:"c",type:"close",data:{reason:"error",heir:aS.heir}}))
}},1000);
aR=aL.init();
if(aR){setTimeout(function(){V("opening","local",aM)
},50)
}return aR
},send:function(aR){aL.signal("send",aR)
},localSend:function(aR){aL.signal("localSend",a.util.stringifyJSON({id:R,event:aR}))
},close:function(){if(!aG){clearInterval(y);
aL.signal("close");
aL.close()
}}}
}function aE(){var aJ,aI="atmosphere-"+p.url,aN={storage:function(){function aO(aQ){if(aQ.key===aI&&aQ.newValue){aK(aQ.newValue)
}}if(!a.util.storage){return
}var aP=window.localStorage;
return{init:function(){a.util.on(window,"storage",aO)
},signal:function(aQ,aR){aP.setItem(aI,a.util.stringifyJSON({target:"c",type:aQ,data:aR}))
},get:function(aQ){return a.util.parseJSON(aP.getItem(aI+"-"+aQ))
},set:function(aQ,aR){aP.setItem(aI+"-"+aQ,a.util.stringifyJSON(aR))
},close:function(){a.util.off(window,"storage",aO);
aP.removeItem(aI);
aP.removeItem(aI+"-opened");
aP.removeItem(aI+"-children")
}}
},windowref:function(){var aP=aI.replace(/\W/g,""),aO=document.getElementById(aP),aQ;
if(!aO){aO=document.createElement("div");
aO.id=aP;
aO.style.display="none";
aO.innerHTML='<iframe name="'+aP+'" />';
document.body.appendChild(aO)
}aQ=aO.firstChild.contentWindow;
return{init:function(){aQ.callbacks=[aK];
aQ.fire=function(aR){var aS;
for(aS=0;
aS<aQ.callbacks.length;
aS++){aQ.callbacks[aS](aR)
}}
},signal:function(aR,aS){if(!aQ.closed&&aQ.fire){aQ.fire(a.util.stringifyJSON({target:"c",type:aR,data:aS}))
}},get:function(aR){return !aQ.closed?aQ[aR]:null
},set:function(aR,aS){if(!aQ.closed){aQ[aR]=aS
}},close:function(){}}
}};
function aK(aO){var aQ=a.util.parseJSON(aO),aP=aQ.data;
if(aQ.target==="p"){switch(aQ.type){case"send":t(aP);
break;
case"localSend":F(aP);
break;
case"close":H();
break
}}}Q=function aM(aO){aJ.signal("message",aO)
};
function aL(){document.cookie=aF+"="+encodeURIComponent(a.util.stringifyJSON({ts:a.util.now()+1,heir:(aJ.get("children")||[])[0]}))+"; path=/"
}aJ=aN.storage()||aN.windowref();
aJ.init();
if(w("debug")){a.util.debug("Installed StorageService "+aJ)
}aJ.set("children",[]);
if(aJ.get("opened")!=null&&!aJ.get("opened")){aJ.set("opened",false)
}aF=encodeURIComponent(aI);
aL();
y=setInterval(aL,1000);
h=aJ
}function V(aK,aN,aJ){if(p.shared&&aN!=="local"){aE()
}if(h!=null){h.set("opened",true)
}aJ.close=function(){H()
};
if(ay>0&&aK==="re-connecting"){aJ.isReopen=true;
q(ar)
}else{if(ar.error==null){ar.request=aJ;
var aL=ar.state;
ar.state=aK;
var aI=ar.transport;
ar.transport=aN;
var aM=ar.responseBody;
ai();
ar.responseBody=aM;
ar.state=aL;
ar.transport=aI
}}}function aB(aK){aK.transport="jsonp";
var aJ=p,aI;
if((aK!=null)&&(typeof(aK)!=="undefined")){aJ=aK
}X={open:function(){var aN="atmosphere"+(++R);
function aL(){aJ.lastIndex=0;
if(aJ.openId){clearTimeout(aJ.openId)
}if(aJ.heartbeatTimer){clearTimeout(aJ.heartbeatTimer)
}if(aJ.reconnect&&ay++<aJ.maxReconnectOnClose){V("re-connecting",aJ.transport,aJ);
an(X,aJ,aK.reconnectInterval);
aJ.openId=setTimeout(function(){Z(aJ)
},aJ.reconnectInterval+1000)
}else{T(0,"maxReconnectOnClose reached")
}}function aM(){var aO=aJ.url;
if(aJ.dispatchUrl!=null){aO+=aJ.dispatchUrl
}var aQ=aJ.data;
if(aJ.attachHeadersAsQueryString){aO=o(aJ);
if(aQ!==""){aO+="&X-Atmosphere-Post-Body="+encodeURIComponent(aQ)
}aQ=""
}var aP=document.head||document.getElementsByTagName("head")[0]||document.documentElement;
aI=document.createElement("script");
aI.src=aO+"&jsonpTransport="+aN;
aI.clean=function(){aI.clean=aI.onerror=aI.onload=aI.onreadystatechange=null;
if(aI.parentNode){aI.parentNode.removeChild(aI)
}if(++aK.scriptCount===2){aK.scriptCount=1;
aL()
}};
aI.onload=aI.onreadystatechange=function(){aH("jsonp.onload");
if(!aI.readyState||/loaded|complete/.test(aI.readyState)){aI.clean()
}};
aI.onerror=function(){aH("jsonp.onerror");
aK.scriptCount=1;
aI.clean()
};
aP.insertBefore(aI,aP.firstChild)
}window[aN]=function(aQ){aH("jsonp.window");
aK.scriptCount=0;
if(aJ.reconnect&&aJ.maxRequest===-1||aJ.requestCount++<aJ.maxRequest){if(!aJ.executeCallbackBeforeReconnect){an(X,aJ,aJ.pollingInterval)
}if(aQ!=null&&typeof aQ!=="string"){try{aQ=aQ.message
}catch(aP){}}var aO=r(aQ,aJ,ar);
if(!aO){k(ar.responseBody,"messageReceived",200,aJ.transport)
}if(aJ.executeCallbackBeforeReconnect){an(X,aJ,aJ.pollingInterval)
}j(aJ)
}else{a.util.log(p.logLevel,["JSONP reconnect maximum try reached "+p.requestCount]);
T(0,"maxRequest reached")
}};
setTimeout(function(){aM()
},50)
},abort:function(){if(aI&&aI.clean){aI.clean()
}}};
X.open()
}function av(aI){if(p.webSocketImpl!=null){return p.webSocketImpl
}else{if(window.WebSocket){return new WebSocket(aI)
}else{return new MozWebSocket(aI)
}}}function v(){return o(p,a.util.getAbsoluteURL(p.webSocketUrl||p.url)).replace(/^http/,"ws")
}function S(){var aI=o(p);
return aI
}function C(aJ){ar.transport="sse";
var aI=S();
if(w("debug")){a.util.debug("Invoking executeSSE");
a.util.debug("Using URL: "+aI)
}if(aJ&&!p.reconnect){if(ag!=null){l()
}return
}try{ag=new EventSource(aI,{withCredentials:p.withCredentials})
}catch(aK){T(0,aK);
az("SSE failed. Downgrading to fallback transport and resending");
return
}if(p.connectTimeout>0){p.id=setTimeout(function(){if(!aJ){l()
}},p.connectTimeout)
}ag.onopen=function(aL){aH("sse.onopen");
j(p);
if(w("debug")){a.util.debug("SSE successfully opened")
}if(!p.enableProtocol){if(!aJ){V("opening","sse",p)
}else{V("re-opening","sse",p)
}}else{if(p.isReopen){p.isReopen=false;
V("re-opening",p.transport,p)
}}aJ=true;
if(p.method==="POST"){ar.state="messageReceived";
ag.send(p.data)
}};
ag.onmessage=function(aM){aH("sse.onmessage");
j(p);
if(!p.enableXDR&&window.location.host&&aM.origin&&aM.origin!==window.location.protocol+"//"+window.location.host){a.util.log(p.logLevel,["Origin was not "+window.location.protocol+"//"+window.location.host]);
return
}ar.state="messageReceived";
ar.status=200;
aM=aM.data;
var aL=r(aM,p,ar);
if(!aL){ai();
ar.responseBody="";
ar.messages=[]
}};
ag.onerror=function(aL){aH("sse.onerror");
clearTimeout(p.id);
if(p.heartbeatTimer){clearTimeout(p.heartbeatTimer)
}if(ar.closedByClientTimeout){return
}ae(aJ);
l();
if(aG){a.util.log(p.logLevel,["SSE closed normally"])
}else{if(!aJ){az("SSE failed. Downgrading to fallback transport and resending")
}else{if(p.reconnect&&(ar.transport==="sse")){if(ay++<p.maxReconnectOnClose){V("re-connecting",p.transport,p);
if(p.reconnectInterval>0){p.reconnectId=setTimeout(function(){C(true)
},p.reconnectInterval)
}else{C(true)
}ar.responseBody="";
ar.messages=[]
}else{a.util.log(p.logLevel,["SSE reconnect maximum try reached "+ay]);
T(0,"maxReconnectOnClose reached")
}}}}}
}function af(aJ){ar.transport="websocket";
var aI=v(p.url);
if(w("debug")){a.util.debug("Invoking executeWebSocket, using URL: "+aI)
}if(aJ&&!p.reconnect){if(aw!=null){l()
}return
}aw=av(aI);
if(p.webSocketBinaryType!=null){aw.binaryType=p.webSocketBinaryType
}if(p.connectTimeout>0){p.id=setTimeout(function(){if(!aJ){var aM={code:1002,reason:"",wasClean:false};
aw.onclose(aM);
try{l()
}catch(aN){}return
}},p.connectTimeout)
}aw.onopen=function(aN){aH("websocket.onopen");
j(p);
c=false;
if(w("debug")){a.util.debug("Websocket successfully opened")
}var aM=aJ;
if(aw!=null){aw.canSendMessage=true
}if(!p.enableProtocol){aJ=true;
if(aM){V("re-opening","websocket",p)
}else{V("opening","websocket",p)
}}if(aw!=null){if(p.method==="POST"){ar.state="messageReceived";
aw.send(p.data)
}}};
aw.onmessage=function(aO){aH("websocket.onmessage");
j(p);
if(p.enableProtocol){aJ=true
}ar.state="messageReceived";
ar.status=200;
aO=aO.data;
var aM=typeof(aO)==="string";
if(aM){var aN=r(aO,p,ar);
if(!aN){ai();
ar.responseBody="";
ar.messages=[]
}}else{aO=s(p,aO);
if(aO===""){return
}ar.responseBody=aO;
ai();
ar.responseBody=null
}};
aw.onerror=function(aM){aH("websocket.onerror");
clearTimeout(p.id);
if(p.heartbeatTimer){clearTimeout(p.heartbeatTimer)
}};
aw.onclose=function(aM){aH("websocket.onclose");
clearTimeout(p.id);
if(ar.state==="closed"){return
}var aN=aM.reason;
if(aN===""){switch(aM.code){case 1000:aN="Normal closure; the connection successfully completed whatever purpose for which it was created.";
break;
case 1001:aN="The endpoint is going away, either because of a server failure or because the browser is navigating away from the page that opened the connection.";
break;
case 1002:aN="The endpoint is terminating the connection due to a protocol error.";
break;
case 1003:aN="The connection is being terminated because the endpoint received data of a type it cannot accept (for example, a text-only endpoint received binary data).";
break;
case 1004:aN="The endpoint is terminating the connection because a data frame was received that is too large.";
break;
case 1005:aN="Unknown: no status code was provided even though one was expected.";
break;
case 1006:aN="Connection was closed abnormally (that is, with no close frame being sent).";
break
}}if(w("warn")){a.util.warn("Websocket closed, reason: "+aN+" - wasClean: "+aM.wasClean)
}if(ar.closedByClientTimeout||(p.handleOnlineOffline&&c)){if(p.reconnectId){clearTimeout(p.reconnectId);
delete p.reconnectId
}return
}ae(aJ);
ar.state="closed";
if(aG){a.util.log(p.logLevel,["Websocket closed normally"])
}else{if(!aJ){az("Websocket failed on first connection attempt. Downgrading to "+p.fallbackTransport+" and resending")
}else{if(p.reconnect&&ar.transport==="websocket"){l();
if(ay++<p.maxReconnectOnClose){V("re-connecting",p.transport,p);
if(p.reconnectInterval>0){p.reconnectId=setTimeout(function(){ar.responseBody="";
ar.messages=[];
af(true)
},p.reconnectInterval)
}else{ar.responseBody="";
ar.messages=[];
af(true)
}}else{a.util.log(p.logLevel,["Websocket reconnect maximum try reached "+ay]);
if(w("warn")){a.util.warn("Websocket error, reason: "+aM.reason)
}T(0,"maxReconnectOnClose reached")
}}}}};
var aK=navigator.userAgent.toLowerCase();
var aL=aK.indexOf("android")>-1;
if(aL&&aw.url===undefined){aw.onclose({reason:"Android 4.1 does not support websockets.",wasClean:false})
}}function s(aM,aL){var aK=aL;
if(aM.transport==="polling"){return aK
}if(aM.enableProtocol&&aM.firstMessage&&a.util.trim(aL).length!==0){var aN=aM.trackMessageLength?1:0;
var aJ=aL.split(aM.messageDelimiter);
if(aJ.length<=aN+1){return aK
}aM.firstMessage=false;
aM.uuid=a.util.trim(aJ[aN]);
if(aJ.length<=aN+2){a.util.log("error",["Protocol data not sent by the server. If you enable protocol on client side, be sure to install JavascriptProtocol interceptor on server side.Also note that atmosphere-runtime 2.2+ should be used."])
}J=parseInt(a.util.trim(aJ[aN+1]),10);
ak=aJ[aN+2];
if(aM.transport!=="long-polling"){Z(aM)
}e=aM.uuid;
aK="";
aN=aM.trackMessageLength?4:3;
if(aJ.length>aN+1){for(var aI=aN;
aI<aJ.length;
aI++){aK+=aJ[aI];
if(aI+1!==aJ.length){aK+=aM.messageDelimiter
}}}if(aM.ackInterval!==0){setTimeout(function(){t("...ACK...")
},aM.ackInterval)
}}else{if(aM.enableProtocol&&aM.firstMessage&&a.util.browser.msie&&+a.util.browser.version.split(".")[0]<10){a.util.log(p.logLevel,["Receiving unexpected data from IE"])
}else{Z(aM)
}}return aK
}function j(aI){clearTimeout(aI.id);
if(aI.timeout>0&&aI.transport!=="polling"){aI.id=setTimeout(function(){aC(aI);
D();
l()
},aI.timeout)
}}function aC(aI){ar.closedByClientTimeout=true;
ar.state="closedByClient";
ar.responseBody="";
ar.status=408;
ar.messages=[];
ai()
}function T(aI,aJ){l();
clearTimeout(p.id);
ar.state="error";
ar.reasonPhrase=aJ;
ar.responseBody="";
ar.status=aI;
ar.messages=[];
ai()
}function r(aM,aL,aI){aM=s(aL,aM);
if(aM.length===0){return true
}aI.responseBody=aM;
if(aL.trackMessageLength){aM=aI.partialMessage+aM;
var aK=[];
var aJ=aM.indexOf(aL.messageDelimiter);
if(aJ!=-1){while(aJ!==-1){var aO=aM.substring(0,aJ);
var aN=+aO;
if(isNaN(aN)){throw new Error('message length "'+aO+'" is not a number')
}aJ+=aL.messageDelimiter.length;
if(aJ+aN>aM.length){aJ=-1
}else{aK.push(aM.substring(aJ,aJ+aN));
aM=aM.substring(aJ+aN,aM.length);
aJ=aM.indexOf(aL.messageDelimiter)
}}aI.partialMessage=aM;
if(aK.length!==0){aI.responseBody=aK.join(aL.messageDelimiter);
aI.messages=aK;
return false
}else{aI.responseBody="";
aI.messages=[];
return true
}}}aI.responseBody=aM;
aI.messages=[aM];
return false
}function az(aI){a.util.log(p.logLevel,[aI]);
if(typeof(p.onTransportFailure)!=="undefined"){p.onTransportFailure(aI,p)
}else{if(typeof(a.util.onTransportFailure)!=="undefined"){a.util.onTransportFailure(aI,p)
}}p.transport=p.fallbackTransport;
var aJ=p.connectTimeout===-1?0:p.connectTimeout;
if(p.reconnect&&p.transport!=="none"||p.transport==null){p.method=p.fallbackMethod;
ar.transport=p.fallbackTransport;
p.fallbackTransport="none";
if(aJ>0){p.reconnectId=setTimeout(function(){aa()
},aJ)
}else{aa()
}}else{T(500,"Unable to reconnect with fallback transport")
}}function o(aK,aI){var aJ=p;
if((aK!=null)&&(typeof(aK)!=="undefined")){aJ=aK
}if(aI==null){aI=aJ.url
}if(!aJ.attachHeadersAsQueryString){return aI
}if(aI.indexOf("X-Atmosphere-Framework")!==-1){return aI
}aI+=(aI.indexOf("?")!==-1)?"&":"?";
aI+="X-Atmosphere-tracking-id="+aJ.uuid;
aI+="&X-Atmosphere-Framework="+a.version;
aI+="&X-Atmosphere-Transport="+aJ.transport;
if(aJ.trackMessageLength){aI+="&X-Atmosphere-TrackMessageSize=true"
}if(aJ.heartbeat!==null&&aJ.heartbeat.server!==null){aI+="&X-Heartbeat-Server="+aJ.heartbeat.server
}if(aJ.contentType!==""){aI+="&Content-Type="+(aJ.transport==="websocket"?aJ.contentType:encodeURIComponent(aJ.contentType))
}if(aJ.enableProtocol){aI+="&X-atmo-protocol=true"
}a.util.each(aJ.headers,function(aL,aN){var aM=a.util.isFunction(aN)?aN.call(this,aJ,aK,ar):aN;
if(aM!=null){aI+="&"+encodeURIComponent(aL)+"="+encodeURIComponent(aM)
}});
return aI
}function Z(aI){if(!aI.isOpen){aI.isOpen=true;
V("opening",aI.transport,aI)
}else{if(aI.isReopen){aI.isReopen=false;
V("re-opening",aI.transport,aI)
}else{if(ar.state==="messageReceived"&&(aI.transport==="jsonp"||aI.transport==="long-polling")){ap(ar)
}else{return
}}}B(aI)
}function B(aJ){if(aJ.heartbeatTimer!=null){clearTimeout(aJ.heartbeatTimer)
}if(!isNaN(J)&&J>0){var aI=function(){if(w("debug")){a.util.debug("Sending heartbeat")
}t(ak);
aJ.heartbeatTimer=setTimeout(aI,J)
};
aJ.heartbeatTimer=setTimeout(aI,J)
}}function L(aM){var aJ=p;
if((aM!=null)||(typeof(aM)!=="undefined")){aJ=aM
}aJ.lastIndex=0;
aJ.readyState=0;
if((aJ.transport==="jsonp")||((aJ.enableXDR)&&(a.util.checkCORSSupport()))){aB(aJ);
return
}if(a.util.browser.msie&&+a.util.browser.version.split(".")[0]<10){if((aJ.transport==="streaming")){if(aJ.enableXDR&&window.XDomainRequest){P(aJ)
}else{aA(aJ)
}return
}if((aJ.enableXDR)&&(window.XDomainRequest)){P(aJ);
return
}}var aL=function(aQ){aJ.lastIndex=0;
ay++;
if(aQ||(aJ.reconnect&&ay<=aJ.maxReconnectOnClose)){var aP=aQ?0:aM.reconnectInterval;
ar.ffTryingReconnect=true;
V("re-connecting",aM.transport,aM);
an(aK,aJ,aP)
}else{T(0,"maxReconnectOnClose reached")
}};
var aN=function(aP){if(a._beforeUnloadState){a.util.debug(new Date()+" Atmosphere: reconnectF: execution delayed due to _beforeUnloadState flag");
setTimeout(function(){aL(aP)
},5000)
}else{aL(aP)
}};
var aI=function(){ar.errorHandled=true;
l();
aN(false)
};
if(aJ.force||(aJ.reconnect&&(aJ.maxRequest===-1||aJ.requestCount++<aJ.maxRequest))){aJ.force=false;
var aK=a.util.xhr();
aK.hasData=false;
M(aK,aJ,true);
if(aJ.suspend){z=aK
}if(aJ.transport!=="polling"){ar.transport=aJ.transport;
aK.onabort=function(){aH("ajaxrequest.onabort");
ae(true)
};
aK.onerror=function(){aH("ajaxrequest.onerror");
ar.error=true;
ar.ffTryingReconnect=true;
try{ar.status=XMLHttpRequest.status
}catch(aP){ar.status=500
}if(!ar.status){ar.status=500
}if(!ar.errorHandled){l();
aN(false)
}}
}aK.onreadystatechange=function(){aH("ajaxRequest.onreadystatechange, new state: "+aK.readyState);
if(aG){aH("onreadystatechange has been ignored due to _abortingConnection flag");
return
}ar.error=null;
var aQ=false;
var aW=false;
if(aJ.transport==="streaming"&&aJ.readyState>2&&aK.readyState===4){l();
aN(false);
return
}aJ.readyState=aK.readyState;
if(aJ.transport==="streaming"&&aK.readyState>=3){aW=true
}else{if(aJ.transport==="long-polling"&&aK.readyState===4){aW=true
}}j(p);
if(aJ.transport!=="polling"){var aP=200;
if(aK.readyState===4){aP=aK.status>1000?0:aK.status
}if(!aJ.reconnectOnServerError&&(aP>=300&&aP<600)){T(aP,aK.statusText);
return
}if(aP>=300||aP===0){aI();
return
}if((!aJ.enableProtocol||!aM.firstMessage)&&aK.readyState===2){if(a.util.browser.mozilla&&ar.ffTryingReconnect){ar.ffTryingReconnect=false;
setTimeout(function(){if(!ar.ffTryingReconnect){Z(aJ)
}},500)
}else{Z(aJ)
}}}else{if(aK.readyState===4){aW=true
}}if(aW){var aT=aK.responseText;
ar.errorHandled=false;
if(aJ.transport==="long-polling"&&a.util.trim(aT).length===0){if(!aK.hasData){aN(true)
}else{aK.hasData=false
}return
}aK.hasData=true;
G(aK,p);
if(aJ.transport==="streaming"){if(!a.util.browser.opera){var aS=aT.substring(aJ.lastIndex,aT.length);
aQ=r(aS,aJ,ar);
aJ.lastIndex=aT.length;
if(aQ){return
}}else{a.util.iterate(function(){if(ar.status!==500&&aK.responseText.length>aJ.lastIndex){try{ar.status=aK.status;
ar.headers=a.util.parseHeaders(aK.getAllResponseHeaders());
G(aK,p)
}catch(aY){ar.status=404
}j(p);
ar.state="messageReceived";
var aX=aK.responseText.substring(aJ.lastIndex);
aJ.lastIndex=aK.responseText.length;
aQ=r(aX,aJ,ar);
if(!aQ){ai()
}if(I(aK,aJ)){K(aK,aJ);
return
}}else{if(ar.status>400){aJ.lastIndex=aK.responseText.length;
return false
}}},0)
}}else{aQ=r(aT,aJ,ar)
}var aV=I(aK,aJ);
try{ar.status=aK.status;
ar.headers=a.util.parseHeaders(aK.getAllResponseHeaders());
G(aK,aJ)
}catch(aU){ar.status=404
}if(aJ.suspend){ar.state=ar.status===0?"closed":"messageReceived"
}else{ar.state="messagePublished"
}var aR=!aV&&aM.transport!=="streaming"&&aM.transport!=="polling";
if(aR&&!aJ.executeCallbackBeforeReconnect){an(aK,aJ,aJ.pollingInterval)
}if(ar.responseBody.length!==0&&!aQ){ai()
}if(aR&&aJ.executeCallbackBeforeReconnect){an(aK,aJ,aJ.pollingInterval)
}if(aV){K(aK,aJ)
}}};
try{aK.send(aJ.data);
u=true
}catch(aO){a.util.log(aJ.logLevel,["Unable to connect to "+aJ.url]);
T(0,aO)
}}else{if(aJ.logLevel==="debug"){a.util.log(aJ.logLevel,["Max re-connection reached."])
}T(0,"maxRequest reached")
}}function K(aJ,aI){ar.messages=[];
aI.isReopen=true;
H();
aG=false;
an(aJ,aI,500)
}function M(aK,aL,aJ){var aI=aL.url;
if(aL.dispatchUrl!=null&&aL.method==="POST"){aI+=aL.dispatchUrl
}aI=o(aL,aI);
aI=a.util.prepareURL(aI);
if(aJ){aK.open(aL.method,aI,aL.async);
if(aL.connectTimeout>0){aL.id=setTimeout(function(){if(aL.requestCount===0){l();
k("Connect timeout","closed",200,aL.transport)
}},aL.connectTimeout)
}}if(p.withCredentials&&p.transport!=="websocket"){if("withCredentials" in aK){aK.withCredentials=true
}}if(!p.dropHeaders){aK.setRequestHeader("X-Atmosphere-Framework",a.version);
aK.setRequestHeader("X-Atmosphere-Transport",aL.transport);
if(aL.heartbeat!==null&&aL.heartbeat.server!==null){aK.setRequestHeader("X-Heartbeat-Server",aK.heartbeat.server)
}if(aL.trackMessageLength){aK.setRequestHeader("X-Atmosphere-TrackMessageSize","true")
}aK.setRequestHeader("X-Atmosphere-tracking-id",aL.uuid);
a.util.each(aL.headers,function(aM,aO){var aN=a.util.isFunction(aO)?aO.call(this,aK,aL,aJ,ar):aO;
if(aN!=null){aK.setRequestHeader(aM,aN)
}})
}if(aL.contentType!==""){aK.setRequestHeader("Content-Type",aL.contentType)
}}function an(aK,aL,aJ){if(ar.closedByClientTimeout){return
}if(aL.reconnect||(aL.suspend&&u)){var aI=0;
if(aK&&aK.readyState>1){aI=aK.status>1000?0:aK.status
}ar.status=aI===0?204:aI;
ar.reason=aI===0?"Server resumed the connection or down.":"OK";
clearTimeout(aL.id);
if(aL.reconnectId){clearTimeout(aL.reconnectId);
delete aL.reconnectId
}if(aJ>0){p.reconnectId=setTimeout(function(){L(aL)
},aJ)
}else{L(aL)
}}}function q(aI){aI.state="re-connecting";
al(aI)
}function ap(aI){aI.state="openAfterResume";
al(aI);
aI.state="messageReceived"
}function P(aI){if(aI.transport!=="polling"){n=ac(aI);
n.open()
}else{ac(aI).open()
}}function ac(aK){var aJ=p;
if((aK!=null)&&(typeof(aK)!=="undefined")){aJ=aK
}var aP=aJ.transport;
var aO=0;
var aI=new window.XDomainRequest();
var aM=function(){if(aJ.transport==="long-polling"&&(aJ.reconnect&&(aJ.maxRequest===-1||aJ.requestCount++<aJ.maxRequest))){aI.status=200;
P(aJ)
}};
var aN=aJ.rewriteURL||function(aR){var aQ=/(?:^|;\s*)(JSESSIONID|PHPSESSID)=([^;]*)/.exec(document.cookie);
switch(aQ&&aQ[1]){case"JSESSIONID":return aR.replace(/;jsessionid=[^\?]*|(\?)|$/,";jsessionid="+aQ[2]+"$1");
case"PHPSESSID":return aR.replace(/\?PHPSESSID=[^&]*&?|\?|$/,"?PHPSESSID="+aQ[2]+"&").replace(/&$/,"")
}return aR
};
aI.onprogress=function(){aL(aI)
};
aI.onerror=function(){if(aJ.transport!=="polling"){l();
if(ay++<aJ.maxReconnectOnClose){if(aJ.reconnectInterval>0){aJ.reconnectId=setTimeout(function(){V("re-connecting",aK.transport,aK);
P(aJ)
},aJ.reconnectInterval)
}else{V("re-connecting",aK.transport,aK);
P(aJ)
}}else{T(0,"maxReconnectOnClose reached")
}}};
aI.onload=function(){};
var aL=function(aQ){clearTimeout(aJ.id);
var aS=aQ.responseText;
aS=aS.substring(aO);
aO+=aS.length;
if(aP!=="polling"){j(aJ);
var aR=r(aS,aJ,ar);
if(aP==="long-polling"&&a.util.trim(aS).length===0){return
}if(aJ.executeCallbackBeforeReconnect){aM()
}if(!aR){k(ar.responseBody,"messageReceived",200,aP)
}if(!aJ.executeCallbackBeforeReconnect){aM()
}}};
return{open:function(){var aQ=aJ.url;
if(aJ.dispatchUrl!=null){aQ+=aJ.dispatchUrl
}aQ=o(aJ,aQ);
aI.open(aJ.method,aN(aQ));
if(aJ.method==="GET"){aI.send()
}else{aI.send(aJ.data)
}if(aJ.connectTimeout>0){aJ.id=setTimeout(function(){if(aJ.requestCount===0){l();
k("Connect timeout","closed",200,aJ.transport)
}},aJ.connectTimeout)
}},close:function(){aI.abort()
}}
}function aA(aI){n=ab(aI);
n.open()
}function ab(aL){var aK=p;
if((aL!=null)&&(typeof(aL)!=="undefined")){aK=aL
}var aJ;
var aM=new window.ActiveXObject("htmlfile");
aM.open();
aM.close();
var aI=aK.url;
if(aK.dispatchUrl!=null){aI+=aK.dispatchUrl
}if(aK.transport!=="polling"){ar.transport=aK.transport
}return{open:function(){var aN=aM.createElement("iframe");
aI=o(aK);
if(aK.data!==""){aI+="&X-Atmosphere-Post-Body="+encodeURIComponent(aK.data)
}aI=a.util.prepareURL(aI);
aN.src=aI;
aM.body.appendChild(aN);
var aO=aN.contentDocument||aN.contentWindow.document;
aJ=a.util.iterate(function(){try{if(!aO.firstChild){return
}var aR=aO.body?aO.body.lastChild:aO;
var aT=function(){var aV=aR.cloneNode(true);
aV.appendChild(aO.createTextNode("."));
var aU=aV.innerText;
aU=aU.substring(0,aU.length-1);
return aU
};
if(!aO.body||!aO.body.firstChild||aO.body.firstChild.nodeName.toLowerCase()!=="pre"){var aQ=aO.head||aO.getElementsByTagName("head")[0]||aO.documentElement||aO;
var aP=aO.createElement("script");
aP.text="document.write('<plaintext>')";
aQ.insertBefore(aP,aQ.firstChild);
aQ.removeChild(aP);
aR=aO.body.lastChild
}if(aK.closed){aK.isReopen=true
}aJ=a.util.iterate(function(){var aV=aT();
if(aV.length>aK.lastIndex){j(p);
ar.status=200;
ar.error=null;
aR.innerText="";
var aU=r(aV,aK,ar);
if(aU){return""
}k(ar.responseBody,"messageReceived",200,aK.transport)
}aK.lastIndex=0;
if(aO.readyState==="complete"){ae(true);
V("re-connecting",aK.transport,aK);
if(aK.reconnectInterval>0){aK.reconnectId=setTimeout(function(){aA(aK)
},aK.reconnectInterval)
}else{aA(aK)
}return false
}},null);
return false
}catch(aS){ar.error=true;
V("re-connecting",aK.transport,aK);
if(ay++<aK.maxReconnectOnClose){if(aK.reconnectInterval>0){aK.reconnectId=setTimeout(function(){aA(aK)
},aK.reconnectInterval)
}else{aA(aK)
}}else{T(0,"maxReconnectOnClose reached")
}aM.execCommand("Stop");
aM.close();
return false
}})
},close:function(){if(aJ){aJ()
}aM.execCommand("Stop");
ae(true)
}}
}function t(aI){if(ax!=null){E(aI)
}else{if(z!=null||ag!=null){O(aI)
}else{if(n!=null){i(aI)
}else{if(X!=null){A(aI)
}else{if(aw!=null){W(aI)
}else{T(0,"No suspended connection available");
a.util.error("No suspended connection available. Make sure atmosphere.subscribe has been called and request.onOpen invoked before trying to push data")
}}}}}}function am(aJ,aI){if(!aI){aI=x(aJ)
}aI.transport="polling";
aI.method="GET";
aI.withCredentials=false;
aI.reconnect=false;
aI.force=true;
aI.suspend=false;
aI.timeout=1000;
L(aI)
}function E(aI){ax.send(aI)
}function aq(aJ){if(aJ.length===0){return
}try{if(ax){ax.localSend(aJ)
}else{if(h){h.signal("localMessage",a.util.stringifyJSON({id:R,event:aJ}))
}}}catch(aI){a.util.error(aI)
}}function O(aJ){var aI=x(aJ);
L(aI)
}function i(aJ){if(p.enableXDR&&a.util.checkCORSSupport()){var aI=x(aJ);
aI.reconnect=false;
aB(aI)
}else{O(aJ)
}}function A(aI){O(aI)
}function N(aI){var aJ=aI;
if(typeof(aJ)==="object"){aJ=aI.data
}return aJ
}function x(aJ){var aK=N(aJ);
var aI={connected:false,timeout:60000,method:"POST",url:p.url,contentType:p.contentType,headers:p.headers,reconnect:true,callback:null,data:aK,suspend:false,maxRequest:-1,logLevel:"info",requestCount:0,withCredentials:p.withCredentials,async:p.async,transport:"polling",isOpen:true,attachHeadersAsQueryString:true,enableXDR:p.enableXDR,uuid:p.uuid,dispatchUrl:p.dispatchUrl,enableProtocol:false,messageDelimiter:"|",trackMessageLength:p.trackMessageLength,maxReconnectOnClose:p.maxReconnectOnClose,heartbeatTimer:p.heartbeatTimer,heartbeat:p.heartbeat};
if(typeof(aJ)==="object"){aI=a.util.extend(aI,aJ)
}return aI
}function W(aI){var aL=a.util.isBinary(aI)?aI:N(aI);
var aJ;
try{if(p.dispatchUrl!=null){aJ=p.webSocketPathDelimiter+p.dispatchUrl+p.webSocketPathDelimiter+aL
}else{aJ=aL
}if(!aw.canSendMessage){a.util.error("WebSocket not connected.");
return
}aw.send(aJ)
}catch(aK){aw.onclose=function(aM){};
l();
az("Websocket failed. Downgrading to "+p.fallbackTransport+" and resending "+aI);
O(aI)
}}function F(aJ){var aI=a.util.parseJSON(aJ);
if(aI.id!==R){if(typeof(p.onLocalMessage)!=="undefined"){p.onLocalMessage(aI.event)
}else{if(typeof(a.util.onLocalMessage)!=="undefined"){a.util.onLocalMessage(aI.event)
}}}}function k(aL,aI,aJ,aK){ar.responseBody=aL;
ar.transport=aK;
ar.status=aJ;
ar.state=aI;
ai()
}function G(aI,aK){if(!aK.readResponsesHeaders){if(!aK.enableProtocol){aK.uuid=R
}}else{try{var aJ=aI.getResponseHeader("X-Atmosphere-tracking-id");
if(aJ&&aJ!=null){aK.uuid=aJ.split(" ").pop()
}}catch(aL){}}}function al(aI){m(aI,p);
m(aI,a.util)
}function m(aJ,aK){switch(aJ.state){case"messageReceived":aH("Firing onMessage");
ay=0;
if(typeof(aK.onMessage)!=="undefined"){aK.onMessage(aJ)
}if(typeof(aK.onmessage)!=="undefined"){aK.onmessage(aJ)
}break;
case"error":var aL=(typeof(aJ.reasonPhrase)!="undefined")?aJ.reasonPhrase:"n/a";
aH("Firing onError, reasonPhrase: "+aL);
if(typeof(aK.onError)!=="undefined"){aK.onError(aJ)
}if(typeof(aK.onerror)!=="undefined"){aK.onerror(aJ)
}break;
case"opening":delete p.closed;
aH("Firing onOpen");
if(typeof(aK.onOpen)!=="undefined"){aK.onOpen(aJ)
}if(typeof(aK.onopen)!=="undefined"){aK.onopen(aJ)
}break;
case"messagePublished":aH("Firing messagePublished");
if(typeof(aK.onMessagePublished)!=="undefined"){aK.onMessagePublished(aJ)
}break;
case"re-connecting":aH("Firing onReconnect");
if(typeof(aK.onReconnect)!=="undefined"){aK.onReconnect(p,aJ)
}break;
case"closedByClient":aH("Firing closedByClient");
if(typeof(aK.onClientTimeout)!=="undefined"){aK.onClientTimeout(p)
}break;
case"re-opening":delete p.closed;
aH("Firing onReopen");
if(typeof(aK.onReopen)!=="undefined"){aK.onReopen(p,aJ)
}break;
case"fail-to-reconnect":aH("Firing onFailureToReconnect");
if(typeof(aK.onFailureToReconnect)!=="undefined"){aK.onFailureToReconnect(p,aJ)
}break;
case"unsubscribe":case"closed":var aI=typeof(p.closed)!=="undefined"?p.closed:false;
if(!aI){aH("Firing onClose ("+aJ.state+" case)");
if(typeof(aK.onClose)!=="undefined"){aK.onClose(aJ)
}if(typeof(aK.onclose)!=="undefined"){aK.onclose(aJ)
}}else{aH("Request already closed, not firing onClose ("+aJ.state+" case)")
}p.closed=true;
break;
case"openAfterResume":if(typeof(aK.onOpenAfterResume)!=="undefined"){aK.onOpenAfterResume(p)
}break
}}function ae(aI){if(ar.state!=="closed"){ar.state="closed";
ar.responseBody="";
ar.messages=[];
ar.status=!aI?501:200;
ai()
}}function ai(){var aK=function(aN,aO){aO(ar)
};
if(ax==null&&Q!=null){Q(ar.responseBody)
}p.reconnect=p.mrequest;
var aI=typeof(ar.responseBody)==="string";
var aL=(aI&&p.trackMessageLength)?(ar.messages.length>0?ar.messages:[""]):new Array(ar.responseBody);
for(var aJ=0;
aJ<aL.length;
aJ++){if(aL.length>1&&aL[aJ].length===0){continue
}ar.responseBody=(aI)?a.util.trim(aL[aJ]):aL[aJ];
if(ax==null&&Q!=null){Q(ar.responseBody)
}if((ar.responseBody.length===0||(aI&&ak===ar.responseBody))&&ar.state==="messageReceived"){continue
}al(ar);
if(f.length>0){if(w("debug")){a.util.debug("Invoking "+f.length+" global callbacks: "+ar.state)
}try{a.util.each(f,aK)
}catch(aM){a.util.log(p.logLevel,["Callback exception"+aM])
}}if(typeof(p.callback)==="function"){if(w("debug")){a.util.debug("Invoking request callbacks")
}try{p.callback(ar)
}catch(aM){a.util.log(p.logLevel,["Callback exception"+aM])
}}}}this.subscribe=function(aI){ao(aI);
aa()
};
this.execute=function(){aa()
};
this.close=function(){H()
};
this.disconnect=function(){D()
};
this.getUrl=function(){return p.url
};
this.push=function(aK,aJ){if(aJ!=null){var aI=p.dispatchUrl;
p.dispatchUrl=aJ;
t(aK);
p.dispatchUrl=aI
}else{t(aK)
}};
this.getUUID=function(){return p.uuid
};
this.pushLocal=function(aI){aq(aI)
};
this.enableProtocol=function(aI){return p.enableProtocol
};
this.init=function(){aj()
};
this.request=p;
this.response=ar
}};
a.subscribe=function(h,k,j){if(typeof(k)==="function"){a.addCallback(k)
}if(typeof(h)!=="string"){j=h
}else{j.url=h
}e=((typeof(j)!=="undefined")&&typeof(j.uuid)!=="undefined")?j.uuid:0;
var i=new a.AtmosphereRequest(j);
i.execute();
g[g.length]=i;
return i
};
a.unsubscribe=function(){if(g.length>0){var h=[].concat(g);
for(var k=0;
k<h.length;
k++){var j=h[k];
j.close();
clearTimeout(j.response.request.id);
if(j.heartbeatTimer){clearTimeout(j.heartbeatTimer)
}}}g=[];
f=[]
};
a.unsubscribeUrl=function(j){var h=-1;
if(g.length>0){for(var l=0;
l<g.length;
l++){var k=g[l];
if(k.getUrl()===j){k.close();
clearTimeout(k.response.request.id);
if(k.heartbeatTimer){clearTimeout(k.heartbeatTimer)
}h=l;
break
}}}if(h>=0){g.splice(h,1)
}};
a.addCallback=function(h){if(a.util.inArray(h,f)===-1){f.push(h)
}};
a.removeCallback=function(i){var h=a.util.inArray(i,f);
if(h!==-1){f.splice(h,1)
}};
a.util={browser:{},parseHeaders:function(i){var h,k=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,j={};
while(h=k.exec(i)){j[h[1]]=h[2]
}return j
},now:function(){return new Date().getTime()
},isArray:function(h){return Object.prototype.toString.call(h)==="[object Array]"
},inArray:function(k,l){if(!Array.prototype.indexOf){var h=l.length;
for(var j=0;
j<h;
++j){if(l[j]===k){return j
}}return -1
}return l.indexOf(k)
},isBinary:function(h){return/^\[object\s(?:Blob|ArrayBuffer|.+Array)\]$/.test(Object.prototype.toString.call(h))
},isFunction:function(h){return Object.prototype.toString.call(h)==="[object Function]"
},getAbsoluteURL:function(h){if(typeof(document.createElement)==="undefined"){return h
}var i=document.createElement("div");
i.innerHTML='<a href="'+h+'"/>';
return encodeURI(decodeURI(i.firstChild.href))
},prepareURL:function(i){var j=a.util.now();
var h=i.replace(/([?&])_=[^&]*/,"$1_="+j);
return h+(h===i?(/\?/.test(i)?"&":"?")+"_="+j:"")
},trim:function(h){if(!String.prototype.trim){return h.toString().replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,"").replace(/\s+/g," ")
}else{return h.toString().trim()
}},param:function(l){var j,h=[];
function k(m,n){n=a.util.isFunction(n)?n():(n==null?"":n);
h.push(encodeURIComponent(m)+"="+encodeURIComponent(n))
}function i(n,o){var m;
if(a.util.isArray(o)){a.util.each(o,function(q,p){if(/\[\]$/.test(n)){k(n,p)
}else{i(n+"["+(typeof p==="object"?q:"")+"]",p)
}})
}else{if(Object.prototype.toString.call(o)==="[object Object]"){for(m in o){i(n+"["+m+"]",o[m])
}}else{k(n,o)
}}}for(j in l){i(j,l[j])
}return h.join("&").replace(/%20/g,"+")
},storage:function(){try{return !!(window.localStorage&&window.StorageEvent)
}catch(h){return false
}},iterate:function(j,i){var k;
i=i||0;
(function h(){k=setTimeout(function(){if(j()===false){return
}h()
},i)
})();
return function(){clearTimeout(k)
}
},each:function(n,o,j){if(!n){return
}var m,k=0,l=n.length,h=a.util.isArray(n);
if(j){if(h){for(;
k<l;
k++){m=o.apply(n[k],j);
if(m===false){break
}}}else{for(k in n){m=o.apply(n[k],j);
if(m===false){break
}}}}else{if(h){for(;
k<l;
k++){m=o.call(n[k],k,n[k]);
if(m===false){break
}}}else{for(k in n){m=o.call(n[k],k,n[k]);
if(m===false){break
}}}}return n
},extend:function(l){var k,j,h;
for(k=1;
k<arguments.length;
k++){if((j=arguments[k])!=null){for(h in j){l[h]=j[h]
}}}return l
},on:function(j,i,h){if(j.addEventListener){j.addEventListener(i,h,false)
}else{if(j.attachEvent){j.attachEvent("on"+i,h)
}}},off:function(j,i,h){if(j.removeEventListener){j.removeEventListener(i,h,false)
}else{if(j.detachEvent){j.detachEvent("on"+i,h)
}}},log:function(j,i){if(window.console){var h=window.console[j];
if(typeof h==="function"){h.apply(window.console,i)
}}},warn:function(){a.util.log("warn",arguments)
},info:function(){a.util.log("info",arguments)
},debug:function(){a.util.log("debug",arguments)
},error:function(){a.util.log("error",arguments)
},xhr:function(){try{return new window.XMLHttpRequest()
}catch(i){try{return new window.ActiveXObject("Microsoft.XMLHTTP")
}catch(h){}}},parseJSON:function(h){return !h?null:window.JSON&&window.JSON.parse?window.JSON.parse(h):new Function("return "+h)()
},stringifyJSON:function(j){var m=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,k={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};
function h(n){return'"'+n.replace(m,function(o){var p=k[o];
return typeof p==="string"?p:"\\u"+("0000"+o.charCodeAt(0).toString(16)).slice(-4)
})+'"'
}function i(o){return o<10?"0"+o:o
}return window.JSON&&window.JSON.stringify?window.JSON.stringify(j):(function l(s,r){var q,p,n,o,u=r[s],t=typeof u;
if(u&&typeof u==="object"&&typeof u.toJSON==="function"){u=u.toJSON(s);
t=typeof u
}switch(t){case"string":return h(u);
case"number":return isFinite(u)?String(u):"null";
case"boolean":return String(u);
case"object":if(!u){return"null"
}switch(Object.prototype.toString.call(u)){case"[object Date]":return isFinite(u.valueOf())?'"'+u.getUTCFullYear()+"-"+i(u.getUTCMonth()+1)+"-"+i(u.getUTCDate())+"T"+i(u.getUTCHours())+":"+i(u.getUTCMinutes())+":"+i(u.getUTCSeconds())+'Z"':"null";
case"[object Array]":n=u.length;
o=[];
for(q=0;
q<n;
q++){o.push(l(q,u)||"null")
}return"["+o.join(",")+"]";
default:o=[];
for(q in u){if(b.call(u,q)){p=l(q,u);
if(p){o.push(h(q)+":"+p)
}}}return"{"+o.join(",")+"}"
}}})("",{"":j})
},checkCORSSupport:function(){if(a.util.browser.msie&&!window.XDomainRequest&&+a.util.browser.version.split(".")[0]<11){return true
}else{if(a.util.browser.opera&&+a.util.browser.version.split(".")<12){return true
}else{if(a.util.trim(navigator.userAgent).slice(0,16)==="KreaTVWebKit/531"){return true
}else{if(a.util.trim(navigator.userAgent).slice(-7).toLowerCase()==="kreatel"){return true
}}}}var i=navigator.userAgent.toLowerCase();
var j=i.match(/.+android ([0-9]{1,2})/i),h=parseInt((j&&j[0])||-1,10);
if(!isNaN(h)&&h>-1&&h<3){return true
}return false
}};
d=a.util.now();
(function(){var i=navigator.userAgent.toLowerCase(),h=/(chrome)[ \/]([\w.]+)/.exec(i)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(i)||/(msie) ([\w.]+)/.exec(i)||/(trident)(?:.*? rv:([\w.]+)|)/.exec(i)||i.indexOf("android")<0&&/version\/(.+) (safari)/.exec(i)||i.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(i)||[];
if(h[2]==="safari"){h[2]=h[1];
h[1]="safari"
}a.util.browser[h[1]||""]=true;
a.util.browser.version=h[2]||"0";
a.util.browser.vmajor=a.util.browser.version.split(".")[0];
if(a.util.browser.trident){a.util.browser.msie=true
}if(a.util.browser.msie||(a.util.browser.mozilla&&+a.util.browser.version.split(".")[0]===1)){a.util.storage=false
}})();
a.util.on(window,"unload",function(h){a.util.debug(new Date()+" Atmosphere: unload event");
a.unsubscribe()
});
a.util.on(window,"beforeunload",function(h){a.util.debug(new Date()+" Atmosphere: beforeunload event");
a._beforeUnloadState=true;
setTimeout(function(){a.util.debug(new Date()+" Atmosphere: beforeunload event timeout reached. Reset _beforeUnloadState flag");
a._beforeUnloadState=false
},5000)
});
a.util.on(window,"keypress",function(h){if(h.charCode===27||h.keyCode===27){if(h.preventDefault){h.preventDefault()
}}});
a.util.on(window,"offline",function(){a.util.debug(new Date()+" Atmosphere: offline event");
c=true;
if(g.length>0){var h=[].concat(g);
for(var k=0;
k<h.length;
k++){var j=h[k];
if(j.request.handleOnlineOffline){j.close();
clearTimeout(j.response.request.id);
if(j.heartbeatTimer){clearTimeout(j.heartbeatTimer)
}}}}});
a.util.on(window,"online",function(){a.util.debug(new Date()+" Atmosphere: online event");
if(g.length>0){for(var h=0;
h<g.length;
h++){if(g[h].request.handleOnlineOffline){g[h].init();
g[h].execute()
}}}c=false
});
return a
}));