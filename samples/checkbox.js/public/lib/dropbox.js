(function(){var e,t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S,x,T,N,C,k,L={}.hasOwnProperty;t=function(){function e(e,t,n){var r;this.method=t,this.url=n,this.status=e.status,e.responseType?r=e.response||e.responseText:r=e.responseText;if(r)try{this.responseText=r.toString(),this.response=JSON.parse(r)}catch(i){this.response=null}else this.responseText="(no response)",this.response=null}return e.prototype.toString=function(){return"Dropbox API error "+this.status+" from "+this.method+" "+this.url+" :: "+this.responseText},e.prototype.inspect=function(){return this.toString()},e}(),r=function(){function t(e){this.sandbox=e.sandbox||!1,this.apiServer=e.server||this.defaultApiServer(),this.authServer=e.authServer||this.defaultAuthServer(),this.fileServer=e.fileServer||this.defaultFileServer(),this.oauth=new o(e),this.uid=null,this.authState=null,this.authError=null,this._credentials=null,this.setCredentials(e),this.setupUrls()}return t.prototype.authDriver=function(e){return this.authDriver=e,this},t.prototype.dropboxUid=function(){return this.uid},t.prototype.credentials=function(e){return this._credentials||this.computeCredentials(),this._credentials},t.prototype.authenticate=function(e){var n,r,i=this;return n=null,r=function(){var s;if(n!==i.authState){n=i.authState;if(i.authDriver.onAuthStateChange)return i.authDriver.onAuthStateChange(i,r)}switch(i.authState){case t.RESET:return i.requestToken(function(e,n){var s,o;return e?(i.authError=e,i.authState=t.ERROR):(s=n.oauth_token,o=n.oauth_token_secret,i.oauth.setToken(s,o),i.authState=t.REQUEST),i._credentials=null,r()});case t.REQUEST:return s=i.authorizeUrl(i.oauth.token),i.authDriver.doAuthorize(s,i.oauth.token,i.oauth.tokenSecret,function(){return i.authState=t.AUTHORIZED,i._credentials=null,r()});case t.AUTHORIZED:return i.getAccessToken(function(e,n){return e?(i.authError=e,i.authState=t.ERROR):(i.oauth.setToken(n.oauth_token,n.oauth_token_secret),i.uid=n.uid,i.authState=t.DONE),i._credentials=null,r()});case t.DONE:return e(null,i);case t.ERROR:return e(i.authError)}},r(),this},t.prototype.getUserInfo=function(e){var t,n;return n=this.urls.accountInfo,t=this.oauth.addAuthParams("GET",n,{}),d.request("GET",n,t,null,function(t,n){return e(t,p.parse(n),n)})},t.prototype.readFile=function(e,t,n){var r,i,s;return!n&&typeof t=="function"&&(n=t,t=null),s=""+this.urls.getFile+"/"+this.urlEncodePath(e),r={},i=null,t&&(t.versionTag?r.rev=t.versionTag:t.rev&&(r.rev=t.rev),t.blob&&(i="blob"),t.binary&&(i="b")),this.oauth.addAuthParams("GET",s,r),d.request2("GET",s,r,null,null,i,function(e,t,r){return n(e,t,h.parse(r))})},t.prototype.writeFile=function(e,t,n,r){var i;return!r&&typeof n=="function"&&(r=n,n=null),i=d.canSendForms&&typeof t=="object",i?this.writeFileUsingForm(e,t,n,r):this.writeFileUsingPut(e,t,n,r)},t.prototype.writeFileUsingForm=function(e,t,n,r){var i,s,o,u,a;u=e.lastIndexOf("/"),u===-1?(s=e,e=""):(s=e.substring(u),e=e.substring(0,u)),a=""+this.urls.postFile+"/"+this.urlEncodePath(e),o={file:s};if(n){n.noOverwrite&&(o.overwrite="false");if(n.lastVersionTag)o.parent_rev=n.lastVersionTag;else if(n.parentRev||n.parent_rev)o.parent_rev=n.parentRev||n.parent_rev}return this.oauth.addAuthParams("POST",a,o),delete o.file,i={name:"file",value:t,fileName:s,contentType:"application/octet-stream"},d.multipartRequest(a,i,o,null,function(e,t){return r(e,h.parse(t))})},t.prototype.writeFileUsingPut=function(e,t,n,r){var i,s;s=""+this.urls.putFile+"/"+this.urlEncodePath(e),i={};if(n){n.noOverwrite&&(i.overwrite="false");if(n.lastVersionTag)i.parent_rev=n.lastVersionTag;else if(n.parentRev||n.parent_rev)i.parent_rev=n.parentRev||n.parent_rev}return this.oauth.addAuthParams("POST",s,i),d.request2("POST",s,i,null,t,null,function(e,t){return r(e,h.parse(t))})},t.prototype.stat=function(e,t,n){var r,i;!n&&typeof t=="function"&&(n=t,t=null),i=""+this.urls.metadata+"/"+this.urlEncodePath(e),r={};if(t){t.version!=null&&(r.rev=t.version);if(t.removed||t.deleted)r.include_deleted="true";t.readDir&&(r.list="true",t.readDir!==!0&&(r.file_limit=t.readDir.toString())),t.cacheHash&&(r.hash=t.cacheHash)}return r.include_deleted||(r.include_deleted="false"),r.list||(r.list="false"),this.oauth.addAuthParams("GET",i,r),d.request("GET",i,r,null,function(e,t){var r,i,s;return s=h.parse(t),(t!=null?t.contents:void 0)?r=function(){var e,n,r,s;r=t.contents,s=[];for(e=0,n=r.length;e<n;e++)i=r[e],s.push(h.parse(i));return s}():r=void 0,n(e,s,r)})},t.prototype.readdir=function(e,t,n){var r;return!n&&typeof t=="function"&&(n=t,t=null),r={readDir:!0},t&&(t.limit&&(r.readDir=t.limit),t.versionTag&&(r.versionTag=t.versionTag)),this.stat(e,r,function(e,t,r){var i,s;return r?i=function(){var e,t,n;n=[];for(e=0,t=r.length;e<t;e++)s=r[e],n.push(s.name);return n}():i=null,n(e,i,t,r)})},t.prototype.metadata=function(e,t,n){return this.stat(e,t,n)},t.prototype.makeUrl=function(e,t,n){var r,i,s;return!n&&typeof t=="function"&&(n=t,t=null),e=this.urlEncodePath(e),t&&t.download?(r=!0,s=""+this.urls.media+"/"+e):(r=!1,s=""+this.urls.shares+"/"+e),t&&t.long?i={short_url:"false"}:i={},this.oauth.addAuthParams("POST",s,i),d.request("POST",s,i,null,function(e,t){return n(e,a.parse(t,r))})},t.prototype.history=function(e,t,n){var r,i;return!n&&typeof t=="function"&&(n=t,t=null),i=""+this.urls.revisions+"/"+this.urlEncodePath(e),r={},t&&t.limit!=null&&(r.rev_limit=revLimit),this.oauth.addAuthParams("GET",i,r),d.request("GET",i,r,null,function(e,t){var r,i;return t?i=function(){var e,n,i;i=[];for(e=0,n=t.length;e<n;e++)r=t[e],i.push(h.parse(r));return i}():i=void 0,n(e,i)})},t.prototype.revisions=function(e,t,n){return this.history(e,t,n)},t.prototype.thumbnailUrl=function(t,n){var r,i;return i=""+this.urls.thumbnails+"/"+this.urlEncodePath(t),r={},n&&(n.format?r.format=n.format:n.png&&(r.format="png"),n.size&&(r.size=n.size)),this.oauth.addAuthParams("GET",i,r),""+i+"?"+e.Xhr.urlEncode(r)},t.prototype.readThumbnail=function(e,t,n){var r,i;return!n&&typeof t=="function"&&(n=t,t=null),i=this.thumbnailUrl(e,t),r="b",t&&t.blob&&(r="blob"),d.request2("GET",i,{},null,null,r,function(e,t,r){return n(e,t,h.parse(r))})},t.prototype.revertFile=function(e,t,n){var r,i;return i=""+this.urls.restore+"/"+this.urlEncodePath(e),r={rev:t},this.oauth.addAuthParams("POST",i,r),d.request("POST",i,r,null,function(e,t){return n(e,h.parse(t))})},t.prototype.restore=function(e,t,n){return this.revertFile(e,t,n)},t.prototype.findByName=function(e,t,n,r){var i,s;!r&&typeof n=="function"&&(r=n,n=null),s=""+this.urls.search+"/"+this.urlEncodePath(e),i={query:t};if(n){n.limit!=null&&(i.file_limit=limit);if(n.removed||n.deleted)i.include_deleted=!0}return this.oauth.addAuthParams("GET",s,i),d.request("GET",s,i,null,function(e,t){var n,i;return t?i=function(){var e,r,i;i=[];for(e=0,r=t.length;e<r;e++)n=t[e],i.push(h.parse(n));return i}():i=void 0,r(e,i)})},t.prototype.search=function(e,t,n,r){return this.findByName(e,t,n,r)},t.prototype.makeCopyReference=function(e,t){var n,r;return r=""+this.urls.copyRef+"/"+this.urlEncodePath(e),n=this.oauth.addAuthParams("GET",r,{}),d.request("GET",r,n,null,function(e,n){return t(e,i.parse(n))})},t.prototype.copyRef=function(e,t){return this.makeCopyReference(e,t)},t.prototype.pullChanges=function(t,n){var r,i;return!n&&typeof t=="function"&&(n=t,t=null),i=this.urls.delta,r={},t?t.cursorTag?r={cursor:t.cursorTag}:r={cursor:t}:r={},this.oauth.addAuthParams("POST",i,r),d.request("POST",i,r,null,function(t,r){return n(t,e.PulledChanges.parse(r))})},t.prototype.delta=function(e,t){return this.pullChanges(e,t)},t.prototype.mkdir=function(e,t){var n,r;return r=this.urls.fileopsCreateFolder,n={root:this.fileRoot,path:this.normalizePath(e)},this.oauth.addAuthParams("POST",r,n),d.request("POST",r,n,null,function(e,n){return t(e,h.parse(n))})},t.prototype.remove=function(e,t){var n,r;return r=this.urls.fileopsDelete,n={root:this.fileRoot,path:this.normalizePath(e)},this.oauth.addAuthParams("POST",r,n),d.request("POST",r,n,null,function(e,n){return t(e,h.parse(n))})},t.prototype.unlink=function(e,t){return this.remove(e,t)},t.prototype["delete"]=function(e,t){return this.remove(e,t)},t.prototype.copy=function(e,t,n){var r,s,o;return!n&&typeof r=="function"&&(n=r,r=null),s={root:this.fileRoot,to_path:this.normalizePath(t)},e instanceof i?s.from_copy_ref=e.tag:s.from_path=this.normalizePath(e),o=this.urls.fileopsCopy,this.oauth.addAuthParams("POST",o,s),d.request("POST",o,s,null,function(e,t){return n(e,h.parse(t))})},t.prototype.move=function(e,t,n){var r,i,s;return!n&&typeof r=="function"&&(n=r,r=null),e=this.normalizePath(e),t=this.normalizePath(t),s=this.urls.fileopsMove,i={root:this.fileRoot,from_path:e,to_path:t},this.oauth.addAuthParams("POST",s,i),d.request("POST",s,i,null,function(e,t){return n(e,h.parse(t))})},t.prototype.reset=function(){return this.uid=null,this.oauth.setToken(null,""),this.authState=t.RESET,this.authError=null,this._credentials=null,this},t.prototype.setCredentials=function(e){return this.oauth.reset(e),this.uid=e.uid||null,e.authState?this.authState=e.authState:e.token?this.authState=t.DONE:this.authState=t.RESET,this.authError=null,this._credentials=null,this},t.prototype.setupUrls=function(){return this.fileRoot=this.sandbox?"sandbox":"dropbox",this.urls={requestToken:""+this.apiServer+"/1/oauth/request_token",authorize:""+this.authServer+"/1/oauth/authorize",accessToken:""+this.apiServer+"/1/oauth/access_token",accountInfo:""+this.apiServer+"/1/account/info",getFile:""+this.fileServer+"/1/files/"+this.fileRoot,postFile:""+this.fileServer+"/1/files/"+this.fileRoot,putFile:""+this.fileServer+"/1/files_put/"+this.fileRoot,metadata:""+this.apiServer+"/1/metadata/"+this.fileRoot,delta:""+this.apiServer+"/1/delta",revisions:""+this.apiServer+"/1/revisions/"+this.fileRoot,restore:""+this.apiServer+"/1/restore/"+this.fileRoot,search:""+this.apiServer+"/1/search/"+this.fileRoot,shares:""+this.apiServer+"/1/shares/"+this.fileRoot,media:""+this.apiServer+"/1/media/"+this.fileRoot,copyRef:""+this.apiServer+"/1/copy_ref/"+this.fileRoot,thumbnails:""+this.fileServer+"/1/thumbnails/"+this.fileRoot,fileopsCopy:""+this.apiServer+"/1/fileops/copy",fileopsCreateFolder:""+this.apiServer+"/1/fileops/create_folder",fileopsDelete:""+this.apiServer+"/1/fileops/delete",fileopsMove:""+this.apiServer+"/1/fileops/move"}},t.ERROR=0,t.RESET=1,t.REQUEST=2,t.AUTHORIZED=3,t.DONE=4,t.prototype.urlEncodePath=function(e){return d.urlEncodeValue(this.normalizePath(e)).replace(/%2F/gi,"/")},t.prototype.normalizePath=function(e){var t;if(e.substring(0,1)==="/"){t=1;while(e.substring(t,t+1)==="/")t+=1;return e.substring(t)}return e},t.prototype.requestToken=function(e){var t;return t=this.oauth.addAuthParams("POST",this.urls.requestToken,{}),d.request("POST",this.urls.requestToken,t,null,e)},t.prototype.authorizeUrl=function(e){var t;return t={oauth_token:e,oauth_callback:this.authDriver.url()},""+this.urls.authorize+"?"+d.urlEncode(t)},t.prototype.getAccessToken=function(e){var t;return t=this.oauth.addAuthParams("POST",this.urls.accessToken,{}),d.request("POST",this.urls.accessToken,t,null,e)},t.prototype.defaultApiServer=function(){return"https://api.dropbox.com"},t.prototype.defaultAuthServer=function(){return this.apiServer.replace("api.","www.")},t.prototype.defaultFileServer=function(){return this.apiServer.replace("api.","api-content.")},t.prototype.computeCredentials=function(){var e;return e={key:this.oauth.key,secret:this.oauth.secret,sandbox:this.sandbox},this.oauth.token&&(e.token=this.oauth.token,e.tokenSecret=this.oauth.tokenSecret),this.uid&&(e.uid=this.uid),this.authState!==t.ERROR&&this.authState!==t.RESET&&this.authState!==t.DONE&&(e.authState=this.authState),this.apiServer!==this.defaultApiServer()&&(e.server=this.apiServer),this.authServer!==this.defaultAuthServer()&&(e.authServer=this.authServer),this.fileServer!==this.defaultFileServer()&&(e.fileServer=this.fileServer),this._credentials=e},t}(),n=function(){function e(){}return e.prototype.url=function(){return"https://some.url"},e.prototype.doAuthorize=function(e,t,n,r){return r("oauth-token")},e.prototype.onAuthStateChange=function(e,t){return t()},e}(),c=function(){function t(e){this.rememberUser=(e!=null?e.rememberUser:void 0)||!1,this.scope=(e!=null?e.scope:void 0)||"default",this.useQuery=(e!=null?e.useQuery:void 0)||!1,this.storageKey="dropbox-auth:"+this.scope,this.receiverUrl=this.computeUrl(e),this.tokenRe=new RegExp("(#|\\?|&)oauth_token=([^&#]+)(&|#|$)")}return t.prototype.url=function(){return this.receiverUrl},t.prototype.doAuthorize=function(e,t,n,r){return window.location.assign(e)},t.prototype.onAuthStateChange=function(t,n){var i,s=this;switch(t.authState){case e.Client.RESET:if(!(i=this.loadCredentials()))return n();if(i.authState)return i.token===this.locationToken()&&(i.authState===r.REQUEST&&(this.forgetCredentials(),i.authState=r.AUTHORIZED),t.setCredentials(i)),n();return t.setCredentials(i),t.getUserInfo(function(e,r){return e&&(t.reset(),s.forgetCredentials()),n()});case r.REQUEST:return this.storeCredentials(t.credentials()),n();case r.DONE:return this.rememberUser&&this.storeCredentials(t.credentials()),n();case r.ERROR:return this.forgetCredentials(),n();default:return n()}},t.prototype.computeUrl=function(){var e,n,r,i;return i="_dropboxjs_scope="+encodeURIComponent(this.scope),n=t.currentLocation(),n.indexOf("#")===-1?e=null:(r=n.split("#",2),n=r[0],e=r[1]),this.useQuery?n.indexOf("?")===-1?n+="?"+i:n+="&"+i:e="?"+i,e?n+"#"+e:n},t.prototype.locationToken=function(){var e,n,r;return e=t.currentLocation(),r="_dropboxjs_scope="+encodeURIComponent(this.scope)+"&",(typeof e.indexOf=="function"?e.indexOf(r):void 0)===-1?null:(n=this.tokenRe.exec(e),n?decodeURIComponent(n[2]):null)},t.currentLocation=function(){return window.location.href},t.prototype.storeCredentials=function(e){return localStorage.setItem(this.storageKey,JSON.stringify(e))},t.prototype.loadCredentials=function(){var e;e=localStorage.getItem(this.storageKey);if(!e)return null;try{return JSON.parse(e)}catch(t){return null}},t.prototype.forgetCredentials=function(){return localStorage.removeItem(this.storageKey)},t}(),u=function(){function e(e){this.receiverUrl=this.computeUrl(e),this.tokenRe=new RegExp("(#|\\?|&)oauth_token=([^&#]+)(&|#|$)")}return e.prototype.doAuthorize=function(e,t,n,r){return this.listenForMessage(t,r),this.openWindow(e)},e.prototype.url=function(){return this.receiverUrl},e.prototype.computeUrl=function(t){var n;if(t){if(t.receiverUrl)return t.receiverUrl;if(t.receiverFile)return n=e.currentLocation().split("/"),n[n.length-1]=t.receiverFile,n.join("/")+"#"}return e.currentLocation()},e.currentLocation=function(){return window.location.href},e.prototype.openWindow=function(e){return window.open(e,"_dropboxOauthSigninWindow",this.popupWindowSpec(980,980))},e.prototype.popupWindowSpec=function(e,t){var n,r,i,s,o,u,a,f,l,c;return o=(a=window.screenX)!=null?a:window.screenLeft,u=(f=window.screenY)!=null?f:window.screenTop,s=(l=window.outerWidth)!=null?l:document.documentElement.clientWidth,n=(c=window.outerHeight)!=null?c:document.documentElement.clientHeight,r=Math.round(o+(s-e)/2),i=Math.round(u+(n-t)/2.5),"width="+e+",height="+t+","+("left="+r+",top="+i)+"dialog=yes,dependent=yes,scrollbars=yes,location=yes"},e.prototype.listenForMessage=function(e,t){var n,r;return r=this.tokenRe,n=function(i){var s;s=r.exec(i.data.toString());if(s&&decodeURIComponent(s[2])===e)return t(),window.removeEventListener("message",n)},window.addEventListener("message",n,!1)},e}(),s=function(){function e(e,t){this.port=e!=null?e:8912,this.faviconFile=t!=null?t:null,this.fs=require("fs"),this.http=require("http"),this.open=require("open"),this.callbacks={},this.urlRe=new RegExp("^/oauth_callback\\?"),this.tokenRe=new RegExp("(\\?|&)oauth_token=([^&]+)(&|$)"),this.createApp()}return e.prototype.url=function(){return"http://localhost:"+this.port+"/oauth_callback"},e.prototype.doAuthorize=function(e,t,n,r){return this.callbacks[t]=r,this.openBrowser(e)},e.prototype.openBrowser=function(e){if(!e.match(/^https?:\/\//))throw new Error("Not a http/https URL: "+e);return this.open(e)},e.prototype.createApp=function(){var e=this;return this.app=this.http.createServer(function(t,n){return e.doRequest(t,n)}),this.app.listen(this.port)},e.prototype.closeServer=function(){return this.app.close()},e.prototype.doRequest=function(e,t){var n,r,i,s=this;return this.urlRe.exec(e.url)&&(r=this.tokenRe.exec(e.url),r&&(i=decodeURIComponent(r[2]),this.callbacks[i]&&(this.callbacks[i](),delete this.callbacks[i]))),n="",e.on("data",function(e){return n+=e}),e.on("end",function(){return s.faviconFile&&e.url==="/favicon.ico"?s.sendFavicon(t):s.closeBrowser(t)})},e.prototype.closeBrowser=function(e){var t;return t='<!doctype html>\n<script type="text/javascript">window.close();</script>\n<p>Please close this window.</p>',e.writeHead(200,{"Content-Length":t.length,"Content-Type":"text/html"}),e.write(t),e.end},e.prototype.sendFavicon=function(e){return this.fs.readFile(this.faviconFile,function(t,n){return e.writeHead(200,{"Content-Length":n.length,"Content-Type":"image/x-icon"}),e.write(n),e.end})},e}(),e=function(){function e(e){this.client=new r(e)}return e}(),w=function(e,t){return b(S(N(e),N(t),e.length,t.length))},E=function(e){return b(T(N(e),e.length))},S=function(e,t,n,r){var i,s,o,u;return t.length>16&&(t=T(t,r)),o=function(){var e,n;n=[];for(s=e=0;e<16;s=++e)n.push(t[s]^909522486);return n}(),u=function(){var e,n;n=[];for(s=e=0;e<16;s=++e)n.push(t[s]^1549556828);return n}(),i=T(o.concat(e),64+n),T(u.concat(i),84)},T=function(e,t){var n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,b,w;e[t>>2]|=1<<31-((t&3)<<3),e[(t+8>>6<<4)+15]=t<<3,g=Array(80),n=1732584193,i=-271733879,o=-1732584194,a=271733878,l=-1009589776,p=0,m=e.length;while(p<m){r=n,s=i,u=o,f=a,c=l;for(d=w=0;w<80;d=++w)d<16?g[d]=e[p+d]:g[d]=x(g[d-3]^g[d-8]^g[d-14]^g[d-16],1),d<20?(h=i&o|~i&a,v=1518500249):d<40?(h=i^o^a,v=1859775393):d<60?(h=i&o|i&a|o&a,v=-1894007588):(h=i^o^a,v=-899497514),b=y(y(x(n,5),h),y(y(l,g[d]),v)),l=a,a=o,o=x(i,30),i=n,n=b;n=y(n,r),i=y(i,s),o=y(o,u),a=y(a,f),l=y(l,c),p+=16}return[n,i,o,a,l]},C=function(e){return e<0&&(e=(1<<30)*4+e),e.toString(16)},x=function(e,t){return e<<t|e>>>32-t},y=function(e,t){var n,r;return r=(e&65535)+(t&65535),n=(e>>16)+(t>>16)+(r>>16),n<<16|r&65535},b=function(e){var t,n,r,i,s;i="",t=0,r=e.length*4;while(t<r)n=t,s=(e[n>>2]>>(3-(n&3)<<3)&255)<<16,n+=1,s|=(e[n>>2]>>(3-(n&3)<<3)&255)<<8,n+=1,s|=e[n>>2]>>(3-(n&3)<<3)&255,i+=k[s>>18&63],i+=k[s>>12&63],t+=1,t>=r?i+="=":i+=k[s>>6&63],t+=1,t>=r?i+="=":i+=k[s&63],t+=1;return i},k="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",N=function(e){var t,n,r,i,s;t=[],r=255;for(n=i=0,s=e.length;0<=s?i<s:i>s;n=0<=s?++i:--i)t[n>>2]|=(e.charCodeAt(n)&r)<<(3-(n&3)<<3);return t},o=function(){function e(e){this.reset(e)}return e.prototype.reset=function(e){this.key=e.key,this.secret=e.secret;if(!this.key||!this.secret)throw new Error("Missing Dropbox API key or application secret");return e.token?this.setToken(e.token,e.tokenSecret):this.setToken(null,"")},e.prototype.setToken=function(e,t){if(e&&!t)throw new Error("No secret supplied with the user token");return this.token=e,this.tokenSecret=t||"",this.hmacKey=d.urlEncodeValue(this.secret)+"&"+d.urlEncodeValue(t),null},e.prototype.authHeader=function(e,t,n){var r,i,s,o,u,a;this.addAuthParams(e,t,n),i=[];for(s in n)o=n[s],s.substring(0,6)==="oauth_"&&i.push(s);i.sort(),r=[];for(u=0,a=i.length;u<a;u++)s=i[u],r.push(d.urlEncodeValue(s)+'="'+d.urlEncodeValue(n[s])+'"'),delete n[s];return"OAuth "+r.join(",")},e.prototype.addAuthParams=function(e,t,n){return this.boilerplateParams(n),n.oauth_signature=this.signature(e,t,n),n},e.prototype.boilerplateParams=function(e){return e.oauth_consumer_key=this.key,e.oauth_nonce=this.nonce(),e.oauth_signature_method="HMAC-SHA1",this.token&&(e.oauth_token=this.token),e.oauth_timestamp=Math.floor(Date.now()/1e3),e.oauth_version="1.0",e},e.prototype.nonce=function(){return Date.now().toString(36)+Math.random().toString(36)},e.prototype.signature=function(e,t,n){var r;return r=e.toUpperCase()+"&"+d.urlEncodeValue(t)+"&"+d.urlEncodeValue(d.urlEncode(n)),w(r,this.hmacKey)},e}(),Date.now==null&&(Date.now=function(){return(new Date).getTime()}),l=function(){function e(e){var t;this.blankSlate=e.reset||!1,this.cursorTag=e.cursor,this.shouldPullAgain=e.has_more,this.shouldBackOff=!this.shouldPullAgain,e.cursor&&e.cursor.length?this.changes=function(){var n,r,i,s;i=e.entries,s=[];for(n=0,r=i.length;n<r;n++)t=i[n],s.push(f.parse(t));return s}():this.changes=[]}return e.parse=function(t){return t&&typeof t=="object"?new e(t):t},e.prototype.blankSlate=void 0,e.prototype.cursorTag=void 0,e.prototype.changes=void 0,e.prototype.shouldPullAgain=void 0,e.prototype.shouldBackOff=void 0,e}(),f=function(){function e(e){this.path=e[0],this.stat=h.parse(e[1]),this.stat?this.wasRemoved=!1:(this.stat=null,this.wasRemoved=!0)}return e.parse=function(t){return t&&typeof t=="object"?new e(t):t},e.prototype.path=void 0,e.prototype.wasRemoved=void 0,e.prototype.stat=void 0,e}(),a=function(){function e(e,t){this.url=e.url,this.expiresAt=new Date(Date.parse(e.expires)),t===!0?this.isDirect=!0:t===!1?this.isDirect=!1:this.isDirect=Date.now()-this.expiresAt<=864e5,this.isPreview=!this.isDirect}return e.parse=function(t,n){return t&&typeof t=="object"?new e(t,n):t},e.prototype.url=void 0,e.prototype.expiresAt=void 0,e.prototype.isDirect=void 0,e.prototype.isPreview=void 0,e}(),i=function(){function e(e){typeof e=="object"?(this.tag=e.copy_ref,this.expiresAt=new Date(Date.parse(e.expires))):(this.tag=e,this.expiresAt=new Date)}return e.parse=function(t){return!t||typeof t!="object"&&typeof t!="string"?t:new e(t)},e.prototype.tag=void 0,e.prototype.expiresAt=void 0,e}(),h=function(){function e(e){var t,n,r,i;this.path=e.path,this.path.substring(0,1)!=="/"&&(this.path="/"+this.path),t=this.path.length-1,t>=0&&this.path.substring(t)==="/"&&(this.path=this.path.substring(0,t)),n=this.path.lastIndexOf("/"),this.name=this.path.substring(n+1),this.isFolder=e.is_dir||!1,this.isFile=!this.isFolder,this.isRemoved=e.is_deleted||!1,this.typeIcon=e.icon,((r=e.modified)!=null?r.length:void 0)?this.modifiedAt=new Date(Date.parse(e.modified)):this.modifiedAt=null,((i=e.client_mtime)!=null?i.length:void 0)?this.clientModifiedAt=new Date(Date.parse(e.client_mtime)):this.clientModifiedAt=null;switch(e.root){case"dropbox":this.inAppFolder=!1;break;case"app_folder":this.inAppFolder=!0;break;default:this.inAppFolder=null}this.size=e.bytes||0,this.humanSize=e.size||"",this.hasThumbnail=e.thumb_exists||!1,this.isFolder?(this.versionTag=e.hash,this.mimeType=e.mime_type||"inode/directory"):(this.versionTag=e.rev,this.mimeType=e.mime_type||"application/octet-stream")}return e.parse=function(t){return t&&typeof t=="object"?new e(t):t},e.prototype.path=null,e.prototype.name=null,e.prototype.inAppFolder=null,e.prototype.isFolder=null,e.prototype.isFile=null,e.prototype.isRemoved=null,e.prototype.typeIcon=null,e.prototype.versionTag=null,e.prototype.mimeType=null,e.prototype.size=null,e.prototype.humanSize=null,e.prototype.hasThumbnail=null,e.prototype.modifiedAt=null,e.prototype.clientModifiedAt=null,e}(),p=function(){function e(e){var t;this.name=e.display_name,this.email=e.email,this.countryCode=e.country||null,this.uid=e.uid.toString(),e.public_app_url?(this.publicAppUrl=e.public_app_url,t=this.publicAppUrl.length-1,t>=0&&this.publicAppUrl.substring(t)==="/"&&(this.publicAppUrl=this.publicAppUrl.substring(0,t))):this.publicAppUrl=null,this.referralUrl=e.referral_link,this.quota=e.quota_info.quota,this.privateBytes=e.quota_info.normal||0,this.sharedBytes=e.quota_info.shared||0,this.usedQuota=this.privateBytes+this.sharedBytes}return e.parse=function(t){return t&&typeof t=="object"?new e(t):t},e.prototype.name=null,e.prototype.email=null,e.prototype.countryCode=null,e.prototype.uid=null,e.prototype.referralUrl=null,e.prototype.publicAppUrl=null,e.prototype.quota=null,e.prototype.usedQuota=null,e.prototype.privateBytes=null,e.prototype.sharedBytes=null,e}(),typeof window!="undefined"&&window!==null?!window.XDomainRequest||"withCredentials"in new XMLHttpRequest?(g=window.XMLHttpRequest,m=!1,v=window.navigator.userAgent.indexOf("Firefox")===-1):(g=window.XDomainRequest,m=!0,v=!1):(g=require("xmlhttprequest").XMLHttpRequest,m=!1,v=!1),d=function(){function e(){}return e.Request=g,e.ieMode=m,e.canSendForms=v,e.request=function(e,t,n,r,i){return this.request2(e,t,n,r,null,null,i)},e.request2=function(t,n,r,i,s,o,u){var a,f,l;return f=t==="GET"||s!=null||this.ieMode,f&&(l=e.urlEncode(r),l.length!==0&&(n=[n,"?",e.urlEncode(r)].join(""))),a={},i&&(a.Authorization=i),s!=null?typeof s=="string"&&(a["Content-Type"]="text/plain; charset=utf8"):f||(a["Content-Type"]="application/x-www-form-urlencoded",s=e.urlEncode(r)),e.xhrRequest(t,n,a,s,o,u)},e.multipartRequest=function(t,n,r,i,s){var o,u,a,f,l,c;return t=[t,"?",e.urlEncode(r)].join(""),a=n.value,c=typeof a=="object"&&(typeof Blob!="undefined"&&Blob!==null&&n.value instanceof Blob||typeof File!="undefined"&&File!==null&&n.value instanceof File),c?(l={},o=new FormData,o.append(n.name,a,n.fileName)):(f=n.contentType||"application/octet-stream",u=this.multipartBoundary(),l={"Content-Type":"multipart/form-data; boundary="+u},o=["--",u,"\r\n",'Content-Disposition: form-data; name="',n.name,'"; filename="',n.fileName,'"\r\n',"Content-Type: ",f,"\r\n","Content-Transfer-Encoding: binary\r\n\r\n",a,"\r\n","--",u,"--","\r\n"].join("")),i&&(l.Authorization=i),e.xhrRequest("POST",t,l,o,null,s)},e.multipartBoundary=function(){return[Date.now().toString(36),Math.random().toString(36)].join("----")},e.xhrRequest=function(t,n,r,i,s,o){var u,a,f;f=new this.Request,this.ieMode?(f.onload=function(){return e.onLoad(f,t,n,o)},f.onerror=function(){return e.onError(f,t,n,o)}):f.onreadystatechange=function(){return e.onReadyStateChange(f,t,n,s,o)},f.open(t,n,!0),s&&(s==="b"?f.overrideMimeType&&f.overrideMimeType("text/plain; charset=x-user-defined"):f.responseType=s);if(!this.ieMode)for(u in r){if(!L.call(r,u))continue;a=r[u],f.setRequestHeader(u,a)}return i!=null?f.send(i):f.send(),f},e.urlEncode=function(e){var t,n,r;t=[];for(n in e)r=e[n],t.push(this.urlEncodeValue(n)+"="+this.urlEncodeValue(r));return t.sort().join("&")},e.urlEncodeValue=function(e){return encodeURIComponent(e.toString()).replace(/\!/g,"%21").replace(/'/g,"%27").replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/\*/g,"%2A")},e.urlDecode=function(e){var t,n,r,i,s,o;n={},o=e.split("&");for(i=0,s=o.length;i<s;i++)r=o[i],t=r.split("="),n[decodeURIComponent(t[0])]=decodeURIComponent(t[1]);return n},e.onReadyStateChange=function(n,r,i,s,o){var u,a,f,l,c,h,p,d,v;if(n.readyState!==4)return!0;if(n.status<200||n.status>=300)return u=new t(n,r,i),o(u),!0;h=n.getResponseHeader("x-dropbox-metadata");if(h!=null?h.length:void 0)try{c=JSON.parse(h)}catch(m){c=void 0}else c=void 0;if(s){if(s==="b"){f=n.responseText!=null?n.responseText:n.response,a=[];for(l=d=0,v=f.length;0<=v?d<v:d>v;l=0<=v?++d:--d)a.push(String.fromCharCode(f.charCodeAt(l)&255));p=a.join(""),o(null,p,c)}else o(null,n.response,c);return!0}p=n.responseText!=null?n.responseText:n.response;switch(n.getResponseHeader("Content-Type")){case"application/x-www-form-urlencoded":o(null,e.urlDecode(p),c);break;case"application/json":case"text/javascript":o(null,JSON.parse(p),c);break;default:o(null,p,c)}return!0},e.onLoad=function(t,n,r,i){var s;s=t.responseText;switch(t.contentType){case"application/x-www-form-urlencoded":i(null,e.urlDecode(s),void 0);break;case"application/json":case"text/javascript":i(null,JSON.parse(s),void 0);break;default:i(null,s,void 0)}return!0},e.onError=function(e,n,r,i){var s;return s=new t(e,n,r),i(s),!0},e}();if((typeof module!=="undefined"&&module!==null?module.exports:void 0)!=null)module.exports=e;else{if(typeof window=="undefined"||window===null)throw new Error("This library only supports node.js and modern browsers.");window.Dropbox=e}e.ApiError=t,e.Client=r,e.CopyReference=i,e.Drivers={Popup:u,Redirect:c,NodeServer:s},e.Oauth=o,e.PublicUrl=a,e.PulledChanges=l,e.PullChange=f,e.Stat=h,e.UserInfo=p,e.Xhr=d,e.hmac=w,e.sha1=E}).call(this);