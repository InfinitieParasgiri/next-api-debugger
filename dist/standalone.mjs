var $e=class{constructor(){this.logs=[];this.listeners=new Set;this.maxLogs=200;this.snapshot=[];this.getLogs=()=>(this.snapshot=this.logs,this.snapshot);this.subscribe=t=>(this.listeners.add(t),()=>this.listeners.delete(t))}setMaxLogs(t){this.maxLogs=Math.max(1,t),this.trim()}addLog(t){this.logs=[t,...this.logs],this.trim(),this.emit()}togglePin(t){this.logs=this.logs.map(n=>n.id===t?{...n,pinned:!n.pinned}:n),this.emit()}clear(){this.logs=[],this.emit()}trim(){if(this.logs.length<=this.maxLogs)return;let t=this.logs.filter(d=>d.pinned),o=this.logs.filter(d=>!d.pinned).slice(0,Math.max(0,this.maxLogs-t.length)),r=[...t,...o];r.sort((d,s)=>s.timestamp-d.timestamp),this.logs=r}emit(){this.listeners.forEach(t=>t())}},R=new $e;var Pe=class{constructor(){this.entries=[];this.listeners=new Set;this.maxEntries=500;this.getEntries=()=>this.entries;this.subscribe=t=>(this.listeners.add(t),()=>this.listeners.delete(t))}setMaxEntries(t){this.maxEntries=Math.max(1,t),this.trim()}addEntry(t){let n=this.entries[0];n&&n.level===t.level&&n.preview===t.preview&&n.stack===t.stack?this.entries=[{...n,count:n.count+1,timestamp:t.timestamp},...this.entries.slice(1)]:this.entries=[t,...this.entries],this.trim(),this.emit()}clear(){this.entries=[],this.emit()}trim(){this.entries.length>this.maxEntries&&(this.entries=this.entries.slice(0,this.maxEntries))}emit(){this.listeners.forEach(t=>t())}},B=new Pe;var q="x-apd-skip";function j(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,9)}`}function O(e){if(!e)return null;try{return JSON.parse(e)}catch{return e}}function X(e){if(e==null)return null;if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return String(e)}}function I(e){if(!e)return 0;try{return new Blob([e]).size}catch{return e.length}}function Be(e){if(!e)return"0 B";let t=["B","KB","MB","GB"],n=Math.min(t.length-1,Math.floor(Math.log(e)/Math.log(1024))),o=e/Math.pow(1024,n);return`${n===0?o:o.toFixed(1)} ${t[n]}`}function fe(e){return e<1e3?`${e} ms`:`${(e/1e3).toFixed(2)} s`}function V(e){let t=new Date(e);return t.toLocaleTimeString(void 0,{hour12:!1})+`.${String(t.getMilliseconds()).padStart(3,"0")}`}function J(e){try{let t=typeof window!="undefined"?window.location.origin:"http://localhost",n=new URL(e,t),o={};return n.searchParams.forEach((r,d)=>{o[d]=r}),{endpoint:n.pathname,queryParams:o}}catch{return{endpoint:e,queryParams:{}}}}function me(e){let t={};return e&&e.forEach((n,o)=>{t[o]=n}),t}function Q(e){let t={};if(!e)return t;if(typeof e.toJSON=="function")return{...e.toJSON()};if(e instanceof Headers)return me(e);if(typeof e=="object")for(let[n,o]of Object.entries(e))o!=null&&(t[n]=String(o));return t}function W(e,t){return!t||t.length===0?!1:t.some(n=>n instanceof RegExp?n.test(e):e.includes(n))}async function ge(e){try{if(navigator.clipboard&&window.isSecureContext)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select();let n=document.execCommand("copy");return document.body.removeChild(t),n}catch{return!1}}var N=null,he=!1;function Jt(e){if(e==null)return null;if(typeof e=="string")return e;if(e instanceof URLSearchParams)return e.toString();if(e instanceof FormData){let t=[];return e.forEach((n,o)=>{t.push(`${o}=${n instanceof File?`[File: ${n.name}]`:n}`)}),t.join("&")}return"[binary data]"}function rt(e={}){he||typeof window=="undefined"||typeof window.fetch!="function"||(N=window.fetch.bind(window),he=!0,window.fetch=async function(n,o){var b,k,L,v,w;let r=n instanceof Request?n:null,d=r?r.url:String(n);if(W(d,e.ignoreUrls))return N(n,o);let s=me(new Headers((k=(b=o==null?void 0:o.headers)!=null?b:r==null?void 0:r.headers)!=null?k:void 0));if(s[q]){let h=new Headers((v=(L=o==null?void 0:o.headers)!=null?L:r==null?void 0:r.headers)!=null?v:void 0);return h.delete(q),r?N(new Request(r,{headers:h})):N(n,{...o,headers:h})}let i=Date.now(),p=performance.now(),c=((o==null?void 0:o.method)||(r==null?void 0:r.method)||"GET").toUpperCase(),{endpoint:l,queryParams:u}=J(d),f=Jt((w=o==null?void 0:o.body)!=null?w:null),g={id:j(),url:d,endpoint:l,method:c,requestHeaders:s,requestBody:O(f),requestBodyRaw:f,queryParams:u,timestamp:i,source:"fetch",requestSize:I(f),pinned:!1};try{let h=await N(n,o),T=Math.round(performance.now()-p),E=h.clone(),y=null;try{y=await E.text()}catch{y=null}return R.addLog({...g,duration:T,responseStatus:h.status,responseStatusText:h.statusText,responseHeaders:me(h.headers),responseBody:O(y),responseBodyRaw:y,responseSize:I(y),success:h.ok,error:h.ok?null:`HTTP ${h.status} ${h.statusText}`}),h}catch(h){let T=Math.round(performance.now()-p);throw R.addLog({...g,duration:T,responseStatus:null,responseStatusText:"",responseHeaders:{},responseBody:null,responseBodyRaw:null,responseSize:0,success:!1,error:(h==null?void 0:h.message)||"Network error"}),h}})}function at(){he&&N&&typeof window!="undefined"&&(window.fetch=N),he=!1,N=null}var ee=null,Y=null,te=null,be=!1,K=Symbol("apd-xhr-meta");function Wt(e){let t={};return e.trim().split(/[\r\n]+/).forEach(n=>{let o=n.indexOf(":");if(o===-1)return;let r=n.slice(0,o).trim().toLowerCase(),d=n.slice(o+1).trim();r&&(t[r]=d)}),t}function st(e={}){be||typeof window=="undefined"||typeof XMLHttpRequest=="undefined"||(ee=XMLHttpRequest.prototype.open,Y=XMLHttpRequest.prototype.send,te=XMLHttpRequest.prototype.setRequestHeader,be=!0,XMLHttpRequest.prototype.open=function(n,o,...r){let d=String(o);return this[K]={id:j(),method:(n||"GET").toUpperCase(),url:d,startTime:0,startPerf:0,requestHeaders:{},ignored:W(d,e.ignoreUrls)},ee.apply(this,[n,o,...r])},XMLHttpRequest.prototype.setRequestHeader=function(n,o){if(n.toLowerCase()===q){this[K]&&(this[K].ignored=!0);return}return this[K]&&(this[K].requestHeaders[n]=o),te.apply(this,[n,o])},XMLHttpRequest.prototype.send=function(n){let o=this[K];if(!o||o.ignored)return Y.apply(this,[n]);o.startTime=Date.now(),o.startPerf=performance.now();let r=n==null?null:typeof n=="string"?n:n instanceof URLSearchParams?n.toString():n instanceof FormData?"[form data]":"[binary data]",d=()=>{let s=Math.round(performance.now()-o.startPerf),{endpoint:i,queryParams:p}=J(o.url),c=Wt(this.getAllResponseHeaders()||""),l=null;try{l=typeof this.responseText=="string"?this.responseText:null}catch{l=null}let u=this.status,f=u>=200&&u<400,g={id:o.id,url:o.url,endpoint:i,method:o.method,requestHeaders:o.requestHeaders,requestBody:O(r),requestBodyRaw:r,queryParams:p,responseStatus:u||null,responseStatusText:this.statusText||"",responseHeaders:c,responseBody:O(l),responseBodyRaw:l,duration:s,timestamp:o.startTime,success:f,error:f?null:u===0?"Network error":`HTTP ${u} ${this.statusText}`,source:"xhr",requestSize:I(r),responseSize:I(l),pinned:!1};R.addLog(g),this.removeEventListener("loadend",d)};return this.addEventListener("loadend",d),Y.apply(this,[n])})}function it(){be&&typeof window!="undefined"&&typeof XMLHttpRequest!="undefined"&&(ee&&(XMLHttpRequest.prototype.open=ee),Y&&(XMLHttpRequest.prototype.send=Y),te&&(XMLHttpRequest.prototype.setRequestHeader=te)),be=!1,ee=null,Y=null,te=null}function Kt(e){let t=(e==null?void 0:e.baseURL)||"",n=(e==null?void 0:e.url)||"",o=/^https?:\/\//i.test(n)?n:`${t}${t&&!t.endsWith("/")&&!n.startsWith("/")?"/":""}${n}`;if(e!=null&&e.params&&typeof e.params=="object"){let r=Yt(e.params);r&&(o+=(o.includes("?")?"&":"?")+r)}return o}function Yt(e){let t=new URLSearchParams;for(let[n,o]of Object.entries(e))o!=null&&(Array.isArray(o)?o.forEach(r=>t.append(n,String(r))):t.append(n,String(o)));return t.toString()}function dt(e){if(e==null)return null;if(typeof e=="string")return e;if(typeof URLSearchParams!="undefined"&&e instanceof URLSearchParams)return e.toString();if(typeof FormData!="undefined"&&e instanceof FormData){let t=[];return e.forEach((n,o)=>{t.push(`${o}=${n instanceof File?`[File: ${n.name}]`:n}`)}),t.join("&")}return X(e)}function lt(e,t={}){var d;if(!e||!e.interceptors||typeof((d=e.interceptors.request)==null?void 0:d.use)!="function")return()=>{};if(e.__apiDebuggerInstalled)return()=>{};e.__apiDebuggerInstalled=!0;let n=e.interceptors.request.use(s=>{let i={id:j(),startTime:Date.now(),startPerf:performance.now(),requestBodyRaw:dt(s.data),requestHeadersSnapshot:Q(s.headers)};return s.__apdMeta=i,s.headers&&typeof s.headers.set=="function"?s.headers.set(q,"1"):s.headers={...s.headers||{},[q]:"1"},s});function o(s,i,p){var T,E,y,S,$,P;if(!s)return;let c=Kt(s);if(W(c,t.ignoreUrls))return;let l=s.__apdMeta||{id:j(),startTime:Date.now(),startPerf:performance.now(),requestBodyRaw:dt(s.data),requestHeadersSnapshot:Q(s.headers)},u=Math.round(performance.now()-l.startPerf),{endpoint:f,queryParams:g}=J(c),b=Q(s.headers),k=Object.keys(b).length>0?b:l.requestHeadersSnapshot;delete k[q];let L=l.requestBodyRaw,v=(i==null?void 0:i.data)!==void 0?X(i.data):null,w=(y=(E=i==null?void 0:i.status)!=null?E:(T=p==null?void 0:p.response)==null?void 0:T.status)!=null?y:null,h={id:l.id,url:c,endpoint:f,method:(s.method||"get").toUpperCase(),requestHeaders:k,requestBody:(S=O(L))!=null?S:L,requestBodyRaw:L,queryParams:g,responseStatus:w,responseStatusText:($=i==null?void 0:i.statusText)!=null?$:"",responseHeaders:Q(i==null?void 0:i.headers),responseBody:(P=i==null?void 0:i.data)!=null?P:null,responseBodyRaw:v,duration:u,timestamp:l.startTime,success:!p&&!!w&&w<400,error:p?p.message||"Request failed":null,source:"axios",requestSize:I(L),responseSize:I(v),pinned:!1};R.addLog(h)}let r=e.interceptors.response.use(s=>(o(s.config,s),s),s=>(o(s==null?void 0:s.config,s==null?void 0:s.response,s),Promise.reject(s)));return()=>{e.interceptors.request.eject(n),e.interceptors.response.eject(r),e.__apiDebuggerInstalled=!1}}var pt=["log","info","warn","error","debug"],je={},ne=null,oe=null,Ie=!1;function Gt(e,t=new WeakSet){var n;if(e===null)return"null";if(e===void 0)return"undefined";if(typeof e=="string")return e;if(typeof e=="number"||typeof e=="boolean")return String(e);if(e instanceof Error)return`${e.name}: ${e.message}`;if(typeof e=="function")return e.name?`\u0192 ${e.name}()`:"\u0192 ()";if(typeof e=="object"){if(t.has(e))return"[Circular]";t.add(e);try{return(n=JSON.stringify(e,(o,r)=>typeof r=="bigint"?r.toString():r,2))!=null?n:String(e)}catch{return Array.isArray(e)?"[Array]":"[Object]"}}return String(e)}function Zt(e){for(let t of e)if(t instanceof Error&&t.stack)return t.stack;return null}function qe(e,t,n){let o=t.map(r=>Gt(r));return{id:j(),level:e,parts:o,preview:o.join(" "),stack:Zt(t),timestamp:Date.now(),source:n,count:1}}function ct(e={}){var n,o;if(Ie||typeof window=="undefined"||typeof console=="undefined")return;Ie=!0;let t=(n=e.levels)!=null?n:pt;for(let r of t){let d=(o=console[r])==null?void 0:o.bind(console);d&&(je[r]=d,console[r]=(...s)=>{B.addEntry(qe(r,s,"console")),d(...s)})}ne=r=>{let d=r.error?[r.error]:[r.message],s=qe("error",d,"window.onerror");B.addEntry({...s,preview:s.preview||`${r.message} (${r.filename}:${r.lineno}:${r.colno})`})},window.addEventListener("error",ne),oe=r=>{let d=r.reason,s=qe("error",[d],"unhandledrejection");B.addEntry({...s,preview:`Unhandled promise rejection: ${s.preview}`})},window.addEventListener("unhandledrejection",oe)}function ut(){if(typeof console!="undefined")for(let e of pt){let t=je[e];t&&(console[e]=t)}typeof window!="undefined"&&(ne&&window.removeEventListener("error",ne),oe&&window.removeEventListener("unhandledrejection",oe)),je={},ne=null,oe=null,Ie=!1}var ze=new WeakMap,re=null,ae=null,Oe=!1;function ft(){Oe||typeof document=="undefined"||(Oe=!0,re=document.createElement.bind(document),ae=document.createElementNS.bind(document),document.createElement=function(t,n){let o=re(t,n);return ze.set(o,new Error),o},document.createElementNS=function(t,n,o){let r=ae(t,n,o);return ze.set(r,new Error),r})}function mt(){re&&(document.createElement=re),ae&&(document.createElementNS=ae),Oe=!1,re=null,ae=null}function gt(e){return ze.get(e)}var ht=`
.apd-root {
  --apd-bg: #0b0d12;
  --apd-panel: #12151c;
  --apd-panel-alt: #171b24;
  --apd-border: #262b36;
  --apd-text: #e6e9ef;
  --apd-text-dim: #8b93a3;
  --apd-text-faint: #5b6272;
  --apd-accent: #22d3ee;
  --apd-accent-dim: #0e7490;
  --apd-success: #34d399;
  --apd-error: #f87171;
  --apd-warn: #fbbf24;
  --apd-mono: ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, Consolas, monospace;
  --apd-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, Roboto, sans-serif;
  --apd-radius: 10px;
  --apd-shadow: 0 10px 40px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.4);
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 2147483000;
  font-family: var(--apd-sans);
  color: var(--apd-text);
}
.apd-root.apd-light {
  --apd-bg: #f6f7f9;
  --apd-panel: #ffffff;
  --apd-panel-alt: #f1f2f5;
  --apd-border: #e2e4ea;
  --apd-text: #14161c;
  --apd-text-dim: #5a6072;
  --apd-text-faint: #9298a6;
  --apd-shadow: 0 10px 40px rgba(20,22,28,0.12), 0 2px 8px rgba(20,22,28,0.08);
}

.apd-btn {
  position: fixed;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(145deg, #1a1f2b, #0d0f14);
  border: 1px solid var(--apd-border);
  box-shadow: var(--apd-shadow);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  pointer-events: auto;
  touch-action: none;
  user-select: none;
  transition: box-shadow 0.15s ease, transform 0.1s ease;
}
.apd-btn:active { cursor: grabbing; transform: scale(0.96); }
.apd-btn:hover { box-shadow: 0 0 0 4px rgba(34,211,238,0.15), var(--apd-shadow); }
.apd-btn svg { width: 22px; height: 22px; color: var(--apd-accent); }
.apd-btn-dot {
  position: absolute;
  top: 2px;
  right: 2px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  border-radius: 999px;
  background: var(--apd-accent);
  color: #041318;
  font-size: 10px;
  font-weight: 700;
  font-family: var(--apd-mono);
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}
.apd-btn-dot.apd-has-errors { background: var(--apd-error); color: #2b0707; }

.apd-overlay {
  position: fixed;
  inset: 0;
  background: rgba(4,5,8,0.55);
  pointer-events: auto;
  animation: apd-fade-in 0.12s ease;
}
/* While minimized, the backdrop must not keep covering (and intercepting
   clicks on) the whole viewport \u2014 most importantly, while the Inspector is
   actively picking, the person needs to click straight through to real
   page elements. Without this, every click would land on the overlay
   itself and trigger its own "click outside to close" handler instead of
   reaching the page, making the picker look like it silently cancels
   itself on the very first click. */
.apd-overlay.apd-overlay-passthrough {
  background: transparent;
  pointer-events: none;
}
.apd-overlay.apd-overlay-passthrough .apd-modal {
  pointer-events: auto;
}
@keyframes apd-fade-in { from { opacity: 0; } to { opacity: 1; } }

.apd-modal {
  position: fixed;
  right: 16px;
  bottom: 16px;
  top: 16px;
  left: 16px;
  max-width: 1180px;
  margin: 0 auto;
  background: var(--apd-panel);
  border: 1px solid var(--apd-border);
  border-radius: var(--apd-radius);
  box-shadow: var(--apd-shadow);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  pointer-events: auto;
  animation: apd-rise 0.15s ease;
}
.apd-modal.apd-minimized { top: auto; height: 52px; }
@keyframes apd-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

.apd-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--apd-border);
  background: var(--apd-panel-alt);
  flex-shrink: 0;
}
.apd-header-title {
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.02em;
  display: flex;
  align-items: center;
  gap: 6px;
}
.apd-live-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--apd-success);
  box-shadow: 0 0 0 0 rgba(52,211,153,0.6);
  animation: apd-pulse 1.8s infinite;
}
@keyframes apd-pulse {
  0% { box-shadow: 0 0 0 0 rgba(52,211,153,0.5); }
  70% { box-shadow: 0 0 0 6px rgba(52,211,153,0); }
  100% { box-shadow: 0 0 0 0 rgba(52,211,153,0); }
}
.apd-header-count { font-family: var(--apd-mono); font-size: 11px; color: var(--apd-text-dim); }
.apd-spacer { flex: 1; }
.apd-icon-btn {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid var(--apd-border);
  background: transparent;
  color: var(--apd-text-dim);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.1s, color 0.1s;
}
.apd-icon-btn:hover { background: var(--apd-panel); color: var(--apd-text); }
.apd-icon-btn svg { width: 15px; height: 15px; }

.apd-toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--apd-border);
  flex-wrap: wrap;
  flex-shrink: 0;
}
.apd-search {
  flex: 1;
  min-width: 180px;
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--apd-panel-alt);
  border: 1px solid var(--apd-border);
  border-radius: 7px;
  padding: 6px 10px;
}
.apd-search svg { width: 14px; height: 14px; color: var(--apd-text-faint); flex-shrink: 0; }
.apd-search input {
  border: none;
  background: transparent;
  outline: none;
  color: var(--apd-text);
  font-size: 12.5px;
  width: 100%;
  font-family: var(--apd-mono);
}
.apd-search input::placeholder { color: var(--apd-text-faint); }

.apd-chip {
  font-family: var(--apd-mono);
  font-size: 11px;
  padding: 5px 9px;
  border-radius: 6px;
  border: 1px solid var(--apd-border);
  background: transparent;
  color: var(--apd-text-dim);
  cursor: pointer;
  white-space: nowrap;
}
.apd-chip.apd-active { background: var(--apd-accent-dim); border-color: var(--apd-accent); color: #ecfeff; }
.apd-chip.apd-chip-success.apd-active { background: rgba(52,211,153,0.18); border-color: var(--apd-success); color: var(--apd-success); }
.apd-chip.apd-chip-failed.apd-active { background: rgba(248,113,113,0.18); border-color: var(--apd-error); color: var(--apd-error); }

.apd-body { flex: 1; display: flex; overflow: hidden; }
.apd-list {
  width: 380px;
  flex-shrink: 0;
  overflow-y: auto;
  border-right: 1px solid var(--apd-border);
}
.apd-empty {
  padding: 40px 20px;
  text-align: center;
  color: var(--apd-text-faint);
  font-size: 12.5px;
}

.apd-item {
  padding: 9px 12px;
  border-bottom: 1px solid var(--apd-border);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.apd-item:hover { background: var(--apd-panel-alt); }
.apd-item.apd-selected { background: var(--apd-panel-alt); box-shadow: inset 2px 0 0 var(--apd-accent); }
.apd-item-row1 { display: flex; align-items: center; gap: 6px; }
.apd-method {
  font-family: var(--apd-mono);
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  flex-shrink: 0;
}
.apd-method-GET { background: rgba(34,211,238,0.15); color: #67e8f9; }
.apd-method-POST { background: rgba(52,211,153,0.15); color: #6ee7b7; }
.apd-method-PUT { background: rgba(251,191,36,0.15); color: #fcd34d; }
.apd-method-PATCH { background: rgba(251,191,36,0.15); color: #fcd34d; }
.apd-method-DELETE { background: rgba(248,113,113,0.15); color: #fca5a5; }
.apd-method-OTHER { background: rgba(139,147,163,0.15); color: var(--apd-text-dim); }
.apd-item-url {
  font-family: var(--apd-mono);
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
}
.apd-status-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
.apd-status-dot.apd-ok { background: var(--apd-success); }
.apd-status-dot.apd-fail { background: var(--apd-error); }
.apd-item-row2 { display: flex; align-items: center; gap: 8px; font-family: var(--apd-mono); font-size: 10.5px; color: var(--apd-text-faint); }
.apd-pin-star { color: var(--apd-warn); }

.apd-detail { flex: 1; overflow-y: auto; padding: 16px; }
.apd-detail-empty {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--apd-text-faint);
  font-size: 13px;
}
.apd-detail-header { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 14px; }
.apd-detail-url { font-family: var(--apd-mono); font-size: 13px; word-break: break-all; flex: 1; }
.apd-actions { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 14px; }
.apd-action-btn {
  font-size: 11px;
  font-family: var(--apd-sans);
  font-weight: 600;
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid var(--apd-border);
  background: var(--apd-panel-alt);
  color: var(--apd-text);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}
.apd-action-btn:hover { border-color: var(--apd-accent); color: var(--apd-accent); }
.apd-action-btn.apd-copied { border-color: var(--apd-success); color: var(--apd-success); }

.apd-meta-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
  margin-bottom: 16px;
  padding: 12px;
  background: var(--apd-panel-alt);
  border-radius: 8px;
  border: 1px solid var(--apd-border);
}
.apd-meta-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.04em; color: var(--apd-text-faint); margin-bottom: 2px; }
.apd-meta-value { font-family: var(--apd-mono); font-size: 12.5px; }

.apd-section { margin-bottom: 14px; border: 1px solid var(--apd-border); border-radius: 8px; overflow: hidden; }
.apd-section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  background: var(--apd-panel-alt);
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
}
.apd-section-body { padding: 10px; }
.apd-section-body.apd-empty-body { color: var(--apd-text-faint); font-size: 12px; }

.apd-kv { display: grid; grid-template-columns: minmax(100px, 30%) 1fr; gap: 4px 10px; font-family: var(--apd-mono); font-size: 12px; }
.apd-kv-key { color: var(--apd-text-dim); word-break: break-all; }
.apd-kv-val { color: var(--apd-text); word-break: break-all; }

.apd-json {
  font-family: var(--apd-mono);
  font-size: 12px;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
  margin: 0;
  max-height: 420px;
  overflow: auto;
}
.apd-json .apd-json-key { color: #67e8f9; }
.apd-json .apd-json-str { color: #86efac; }
.apd-json .apd-json-num { color: #fcd34d; }
.apd-json .apd-json-bool { color: #f0abfc; }
.apd-json .apd-json-null { color: var(--apd-text-faint); }
.apd-json mark.apd-json-highlight {
  background: rgba(251,191,36,0.35);
  color: inherit;
  border-radius: 2px;
  padding: 0 1px;
}
.apd-json mark.apd-json-highlight.apd-active {
  background: var(--apd-accent);
  color: #041318;
}

.apd-json-search {
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--apd-panel);
  border: 1px solid var(--apd-border);
  border-radius: 6px;
  padding: 5px 8px;
  margin-bottom: 8px;
}
.apd-json-search svg { width: 13px; height: 13px; color: var(--apd-text-faint); flex-shrink: 0; }
.apd-json-search input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  color: var(--apd-text);
  font-size: 12px;
  font-family: var(--apd-mono);
  min-width: 0;
}
.apd-json-search input::placeholder { color: var(--apd-text-faint); }
.apd-json-search-count {
  font-family: var(--apd-mono);
  font-size: 10.5px;
  color: var(--apd-text-faint);
  white-space: nowrap;
  flex-shrink: 0;
}
.apd-json-search-nav { display: flex; gap: 2px; flex-shrink: 0; }
.apd-json-search-nav button {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid var(--apd-border);
  background: transparent;
  color: var(--apd-text-dim);
  cursor: pointer;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}
.apd-json-search-nav button:hover { color: var(--apd-accent); border-color: var(--apd-accent); }

.apd-tabs {
  display: flex;
  gap: 4px;
  padding: 0 14px;
  border-bottom: 1px solid var(--apd-border);
  flex-shrink: 0;
}
.apd-tab {
  font-size: 12px;
  font-weight: 600;
  padding: 9px 12px;
  border: none;
  background: transparent;
  color: var(--apd-text-dim);
  cursor: pointer;
  border-bottom: 2px solid transparent;
  display: flex;
  align-items: center;
  gap: 6px;
}
.apd-tab:hover { color: var(--apd-text); }
.apd-tab.apd-active { color: var(--apd-accent); border-bottom-color: var(--apd-accent); }
.apd-tab-badge {
  font-family: var(--apd-mono);
  font-size: 10px;
  padding: 1px 5px;
  border-radius: 999px;
  background: var(--apd-panel-alt);
  color: var(--apd-text-dim);
}
.apd-tab-badge.apd-tab-badge-error { background: rgba(248,113,113,0.18); color: var(--apd-error); }

.apd-console-list { flex: 1; overflow-y: auto; }
.apd-console-item {
  display: flex;
  gap: 8px;
  padding: 7px 14px;
  border-bottom: 1px solid var(--apd-border);
  font-family: var(--apd-mono);
  font-size: 12px;
  cursor: default;
  align-items: flex-start;
}
.apd-console-item.apd-console-warn { background: rgba(251,191,36,0.06); }
.apd-console-item.apd-console-error { background: rgba(248,113,113,0.07); }
.apd-console-icon { flex-shrink: 0; width: 14px; text-align: center; line-height: 1.6; }
.apd-console-log .apd-console-icon { color: var(--apd-text-dim); }
.apd-console-info .apd-console-icon { color: var(--apd-accent); }
.apd-console-warn .apd-console-icon { color: var(--apd-warn); }
.apd-console-error .apd-console-icon { color: var(--apd-error); }
.apd-console-debug .apd-console-icon { color: var(--apd-text-faint); }
.apd-console-body { flex: 1; min-width: 0; }
.apd-console-preview {
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.5;
}
.apd-console-warn .apd-console-preview { color: #fcd34d; }
.apd-console-error .apd-console-preview { color: #fca5a5; }
.apd-console-meta {
  display: flex;
  gap: 8px;
  margin-top: 3px;
  font-size: 10.5px;
  color: var(--apd-text-faint);
}
.apd-console-count {
  font-family: var(--apd-mono);
  font-size: 10px;
  font-weight: 700;
  padding: 0 6px;
  border-radius: 999px;
  background: var(--apd-error);
  color: #2b0707;
  flex-shrink: 0;
}
.apd-console-stack {
  margin-top: 6px;
  padding: 8px;
  background: var(--apd-panel-alt);
  border: 1px solid var(--apd-border);
  border-radius: 6px;
  font-size: 11px;
  color: var(--apd-text-dim);
  white-space: pre-wrap;
  word-break: break-word;
  max-height: 200px;
  overflow: auto;
  cursor: text;
}
.apd-console-toggle-stack {
  font-size: 10.5px;
  color: var(--apd-accent);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-top: 3px;
}

.apd-inspect-highlight {
  position: fixed;
  pointer-events: none;
  z-index: 2147483001;
  background: rgba(34,211,238,0.18);
  outline: 1.5px solid var(--apd-accent);
  box-shadow: 0 0 0 1px rgba(0,0,0,0.3);
  border-radius: 2px;
}

.apd-inspector-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  height: 100%;
  padding: 40px 20px;
  text-align: center;
  color: var(--apd-text-dim);
}
.apd-inspector-empty p { margin: 0; font-size: 12.5px; color: var(--apd-text-faint); max-width: 320px; }
.apd-inspect-start-btn {
  font-size: 13px;
  font-weight: 700;
  padding: 10px 18px;
  border-radius: 8px;
  border: 1px solid var(--apd-accent);
  background: var(--apd-accent-dim);
  color: #ecfeff;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}
.apd-inspect-start-btn:hover { background: var(--apd-accent); color: #041318; }
.apd-inspect-start-btn.apd-inspecting { background: var(--apd-error); border-color: var(--apd-error); color: #2b0707; }

.apd-inspector-body { padding: 16px; overflow-y: auto; flex: 1; }
.apd-inspector-breadcrumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2px;
  font-family: var(--apd-mono);
  font-size: 11px;
  color: var(--apd-text-dim);
  margin-bottom: 12px;
}
.apd-inspector-breadcrumb span:not(:last-child)::after { content: '\u203A'; margin: 0 4px; color: var(--apd-text-faint); }
.apd-inspector-tag {
  font-size: 15px;
  font-weight: 700;
  font-family: var(--apd-mono);
  margin-bottom: 2px;
}
.apd-inspector-tag .apd-tag-id { color: var(--apd-warn); }
.apd-inspector-tag .apd-tag-class { color: #86efac; }

.apd-source-card {
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid var(--apd-border);
  background: var(--apd-panel-alt);
  margin-bottom: 14px;
}
.apd-source-path {
  font-family: var(--apd-mono);
  font-size: 12.5px;
  word-break: break-all;
  display: block;
  color: var(--apd-accent);
  text-decoration: none;
  cursor: pointer;
}
.apd-source-path.apd-source-path-plain { color: var(--apd-text); cursor: text; }
.apd-source-path:hover.apd-source-path:not(.apd-source-path-plain) { text-decoration: underline; }
.apd-source-meta { display: flex; align-items: center; gap: 8px; margin-top: 5px; font-size: 10.5px; color: var(--apd-text-faint); }
.apd-confidence-badge {
  font-family: var(--apd-mono);
  font-size: 9.5px;
  padding: 1px 6px;
  border-radius: 999px;
  border: 1px solid var(--apd-border);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}
.apd-confidence-badge.apd-confidence-exact { color: var(--apd-success); border-color: var(--apd-success); }
.apd-confidence-badge.apd-confidence-approximate { color: var(--apd-warn); border-color: var(--apd-warn); }
.apd-source-none { color: var(--apd-text-faint); font-size: 12px; }

.apd-box-model { display: flex; justify-content: center; padding: 10px 0 18px; }
.apd-box-layer {
  border: 1px dashed var(--apd-border);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  padding: 18px;
}
.apd-box-layer-margin { background: rgba(251,191,36,0.08); }
.apd-box-layer-border { background: rgba(251,191,36,0.03); border-style: solid; }
.apd-box-layer-padding { background: rgba(52,211,153,0.1); }
.apd-box-layer-content {
  background: rgba(34,211,238,0.18);
  min-width: 50px;
  min-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--apd-mono);
  font-size: 10.5px;
  color: var(--apd-text);
  padding: 6px 10px;
  border-radius: 2px;
}
.apd-box-label {
  position: absolute;
  font-family: var(--apd-mono);
  font-size: 9px;
  color: var(--apd-text-faint);
}
.apd-box-label-top { top: 1px; left: 50%; transform: translateX(-50%); }
.apd-box-label-right { right: 3px; top: 50%; transform: translateY(-50%); }
.apd-box-label-bottom { bottom: 1px; left: 50%; transform: translateX(-50%); }
.apd-box-label-left { left: 3px; top: 50%; transform: translateY(-50%); }

.apd-footer {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  border-top: 1px solid var(--apd-border);
  font-size: 10.5px;
  color: var(--apd-text-faint);
  flex-shrink: 0;
}
.apd-kbd {
  font-family: var(--apd-mono);
  background: var(--apd-panel-alt);
  border: 1px solid var(--apd-border);
  border-radius: 4px;
  padding: 1px 5px;
}

@media (max-width: 720px) {
  .apd-body { flex-direction: column; }
  .apd-list { width: 100%; max-height: 40%; border-right: none; border-bottom: 1px solid var(--apd-border); }
  .apd-modal { left: 8px; right: 8px; top: 8px; bottom: 8px; }
}

.apd-root *, .apd-root *::before, .apd-root *::after { box-sizing: border-box; }
.apd-root button:focus-visible, .apd-root input:focus-visible {
  outline: 2px solid var(--apd-accent);
  outline-offset: 1px;
}
@media (prefers-reduced-motion: reduce) {
  .apd-root * { animation: none !important; transition: none !important; }
}
`;function Ne(e){return e===" "?"space":e.toLowerCase()}function Qt(e){var o;let t=e;if(!t)return!1;let n=(o=t.tagName)==null?void 0:o.toLowerCase();return n==="input"||n==="textarea"||n==="select"||t.isContentEditable}function bt(e,t){if(typeof window=="undefined")return()=>{};let n=e.map(Ne),o=new Set;function r(i){if(Qt(i.target))return;let p=Ne(i.key),c=o.has(p);o.add(p),!c&&n.every(l=>o.has(l))&&(i.preventDefault(),t())}function d(i){o.delete(Ne(i.key))}function s(){o.clear()}return window.addEventListener("keydown",r),window.addEventListener("keyup",d),window.addEventListener("blur",s),()=>{window.removeEventListener("keydown",r),window.removeEventListener("keyup",d),window.removeEventListener("blur",s)}}function a(e,t,n){let o=document.createElement(e);if(t)for(let[r,d]of Object.entries(t))d==null||d===!1||(r.startsWith("on")&&typeof d=="function"?o.addEventListener(r.slice(2).toLowerCase(),d):r==="class"?o.className=String(d):r==="html"?o.innerHTML=String(d):typeof d=="boolean"?d&&o.setAttribute(r,""):o.setAttribute(r,String(d)));if(n)for(let r of n)r==null||r===!1||o.appendChild(typeof r=="string"?document.createTextNode(r):r);return o}function z(e){for(;e.firstChild;)e.removeChild(e.firstChild)}var xe=56,xt=5,yt="apd-button-position";function se(e){return{x:Math.min(Math.max(8,e.x),window.innerWidth-xe-8),y:Math.min(Math.max(8,e.y),window.innerHeight-xe-8)}}function en(){try{let e=sessionStorage.getItem(yt);if(e)return se(JSON.parse(e))}catch{}return se({x:window.innerWidth-xe-24,y:window.innerHeight-xe-24})}function vt(e,t){let n=a("span",{class:"apd-btn-dot"},["0"]);n.style.display="none";let o=document.createElementNS("http://www.w3.org/2000/svg","svg");o.setAttribute("viewBox","0 0 24 24"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","2"),o.setAttribute("stroke-linecap","round"),o.setAttribute("stroke-linejoin","round"),o.innerHTML='<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>';let r=a("button",{type:"button",class:"apd-btn","aria-label":"Open API debugger",title:"API Debugger (drag to move)"},[o,n]),d=t?se(t):en();r.style.left=`${d.x}px`,r.style.top=`${d.y}px`;let s=!1,i=!1,p={x:0,y:0,posX:0,posY:0};r.addEventListener("pointerdown",l=>{s=!0,i=!1,p={x:l.clientX,y:l.clientY,posX:d.x,posY:d.y},r.setPointerCapture(l.pointerId)}),r.addEventListener("pointermove",l=>{if(!s)return;let u=l.clientX-p.x,f=l.clientY-p.y;(Math.abs(u)>xt||Math.abs(f)>xt)&&(i=!0),d=se({x:p.posX+u,y:p.posY+f}),r.style.left=`${d.x}px`,r.style.top=`${d.y}px`}),r.addEventListener("pointerup",()=>{s=!1;try{sessionStorage.setItem(yt,JSON.stringify(d))}catch{}}),r.addEventListener("click",()=>{i||e()}),window.addEventListener("resize",()=>{d=se(d),r.style.left=`${d.x}px`,r.style.top=`${d.y}px`});function c(l,u){n.textContent=l>99?"99+":String(l),n.style.display=l>0?"":"none",n.classList.toggle("apd-has-errors",u)}return{el:r,setCount:c}}function wt(e){return Object.entries(e).map(([t,n])=>({name:t,value:n}))}function tn(e){return Object.entries(e).map(([t,n])=>({name:t,value:n}))}function Et(e){return{log:{version:"1.2",creator:{name:"next-api-debugger",version:"0.1.0"},entries:e.map(t=>{var n,o;return{startedDateTime:new Date(t.timestamp).toISOString(),time:t.duration,request:{method:t.method,url:t.url,httpVersion:"HTTP/1.1",headers:wt(t.requestHeaders),queryString:tn(t.queryParams),cookies:[],headersSize:-1,bodySize:t.requestSize,postData:t.requestBodyRaw?{mimeType:t.requestHeaders["content-type"]||"application/json",text:t.requestBodyRaw}:void 0},response:{status:(n=t.responseStatus)!=null?n:0,statusText:t.responseStatusText,httpVersion:"HTTP/1.1",headers:wt(t.responseHeaders),cookies:[],content:{size:t.responseSize,mimeType:t.responseHeaders["content-type"]||"application/json",text:(o=t.responseBodyRaw)!=null?o:""},redirectURL:"",headersSize:-1,bodySize:t.responseSize},cache:{},timings:{send:0,wait:t.duration,receive:0}}})}}}function De(e,t){let n=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),o=URL.createObjectURL(n),r=document.createElement("a");r.href=o,r.download=e,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(o)}function nn(e){return["GET","POST","PUT","PATCH","DELETE"].includes(e.toUpperCase())?`apd-method-${e.toUpperCase()}`:"apd-method-OTHER"}function kt(e,t){let n=a("div",{class:"apd-list"});function o(r,d){var s;if(z(n),r.length===0){n.appendChild(a("div",{class:"apd-empty"},["No requests captured yet.",a("br"),"Make an API call and it'll show up here."]));return}for(let i of r){let p=i.id===d,c=a("div",{class:"apd-item-row1"},[a("span",{class:`apd-method ${nn(i.method)}`},[i.method]),a("span",{class:"apd-item-url",title:i.url},[i.endpoint]),a("span",{class:`apd-status-dot ${i.success?"apd-ok":"apd-fail"}`})]);if(i.pinned){let f=a("button",{class:"apd-pin-star",style:"background:none;border:none;cursor:pointer;padding:0",title:"Unpin","aria-label":"Unpin request"},["\u2605"]);f.addEventListener("click",g=>{g.stopPropagation(),t(i.id)}),c.appendChild(f)}let l=a("div",{class:"apd-item-row2"},[a("span",{},[String((s=i.responseStatus)!=null?s:i.error?"ERR":"\u2014")]),a("span",{},[fe(i.duration)]),a("span",{},[V(i.timestamp)]),a("span",{style:"margin-left:auto;text-transform:uppercase"},[i.source])]),u=a("div",{class:`apd-item${p?" apd-selected":""}`,role:"button",tabindex:"0"},[c,l]);u.addEventListener("click",()=>e(i.id)),u.addEventListener("keydown",f=>{f.key==="Enter"&&e(i.id)}),n.appendChild(u)}}return{el:n,render:o}}function ye(e){return`'${e.replace(/'/g,"'\\''")}'`}function on(e){let t=e.trim();if(!t||!(t.startsWith("{")||t.startsWith("[")))return!1;try{return JSON.parse(t),!0}catch{return!1}}function Lt(e){let t=[`curl -X ${e.method} ${ye(e.url)}`],n=Object.keys(e.requestHeaders).some(o=>o.toLowerCase()==="content-type");for(let[o,r]of Object.entries(e.requestHeaders))/^(host|content-length|connection)$/i.test(o)||t.push(`  -H ${ye(`${o}: ${r}`)}`);return e.requestBodyRaw&&(!n&&on(e.requestBodyRaw)&&t.push(`  -H ${ye("Content-Type: application/json")}`),t.push(`  --data-raw ${ye(e.requestBodyRaw)}`)),t.join(` \\
`)}var rn=/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(\.\d+)?([eE][+-]?\d+)?)/g;function an(e){return e.replace(rn,t=>{let n="apd-json-num";return/^"/.test(t)?n=/:$/.test(t)?"apd-json-key":"apd-json-str":/true|false/.test(t)?n="apd-json-bool":/null/.test(t)&&(n="apd-json-null"),`<span class="${n}">${t}</span>`})}function sn(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function dn(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function St(e,t){if(e!=null&&typeof e=="object")return{content:JSON.stringify(e,null,2),isJson:!0};if(typeof e=="string")try{return{content:JSON.stringify(JSON.parse(e),null,2),isJson:!0}}catch{return{content:t!=null?t:e,isJson:!1}}return{content:t!=null?t:String(e!=null?e:""),isJson:!1}}function Ue(e,t,n){let o=sn(e),r=0,d=o;if(n){let i=new RegExp(dn(n),"gi");d=o.replace(i,p=>(r+=1,`<mark class='apd-json-highlight'>${p}</mark>`))}return{html:t?an(d):d,matchCount:r}}function ve(e,t,n=!0){let{content:o,isJson:r}=St(e,t),d="",s=0,i="",p=a("pre",{class:"apd-json"}),c=a("input",{type:"text",placeholder:"Find in payload...",spellcheck:"false"}),l=a("span",{class:"apd-json-search-count"}),u=a("button",{type:"button",title:"Previous match (Shift+Enter)","aria-label":"Previous match"},["\u2191"]),f=a("button",{type:"button",title:"Next match (Enter)","aria-label":"Next match"},["\u2193"]),g=a("div",{class:"apd-json-search-nav"},[u,f]),b=document.createElementNS("http://www.w3.org/2000/svg","svg");b.setAttribute("viewBox","0 0 24 24"),b.setAttribute("fill","none"),b.setAttribute("stroke","currentColor"),b.setAttribute("stroke-width","2"),b.innerHTML='<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>';let k=a("div",{class:"apd-json-search"},[b,c,l,g]);function L(E,y){var S;E.forEach(($,P)=>$.classList.toggle("apd-active",P===s)),(S=E[s])==null||S.scrollIntoView({block:"center",behavior:"smooth"}),l.textContent=d?y>0?`${s+1} / ${y}`:"No matches":"",l.style.display=d?"":"none",g.style.display=d&&y>0?"":"none"}function v(){let E=d.trim(),{html:y,matchCount:S}=Ue(o,r,E);p.innerHTML=y;let $=E!==i;i=E,($||s>=S)&&(s=0);let P=Array.from(p.querySelectorAll("mark.apd-json-highlight"));L(P,S)}function w(E){let{matchCount:y}=Ue(o,r,d.trim());if(y===0)return;s=(s+E+y)%y;let S=Array.from(p.querySelectorAll("mark.apd-json-highlight"));L(S,y)}c.addEventListener("input",()=>{d=c.value,v()}),c.addEventListener("keydown",E=>{E.key==="Enter"&&(E.preventDefault(),w(E.shiftKey?-1:1))}),u.addEventListener("click",()=>w(-1)),f.addEventListener("click",()=>w(1)),v();let h=n&&o.length>0;return{el:a("div",{},[h?k:null,p])}}function _e(e,t){let n=a("button",{type:"button",class:"apd-action-btn"},[e]);return n.addEventListener("click",async()=>{if(await ge(t())){let r=e;n.textContent="Copied",n.classList.add("apd-copied"),setTimeout(()=>{n.textContent=r,n.classList.remove("apd-copied")},1200)}}),n}function G(e,t,n,o){let r=n,d=a("span",{},[r?"\u2212":"+"]),s=`${e}${typeof t=="number"?` (${t})`:""}`,i=a("div",{class:"apd-section-header"},[a("span",{},[s]),d]),p=a("div",{class:"apd-section-body"},[o]);return p.style.display=r?"":"none",i.addEventListener("click",()=>{r=!r,p.style.display=r?"":"none",d.textContent=r?"\u2212":"+"}),a("div",{class:"apd-section"},[i,p])}function Fe(e){let t=Object.entries(e);if(t.length===0)return a("div",{class:"apd-empty-body"},["None"]);let n=a("div",{class:"apd-kv"});return t.forEach(([o,r])=>{n.appendChild(a("div",{class:"apd-kv-key"},[o])),n.appendChild(a("div",{class:"apd-kv-val"},[r]))}),n}function Ct(e){let t=a("div",{class:"apd-detail"});function n(o){var l,u,f,g,b;if(z(t),!o){t.appendChild(a("div",{class:"apd-detail-empty"},["Select a request to see full details"]));return}let r=Lt(o),d=(u=(l=X(o.requestBody))!=null?l:o.requestBodyRaw)!=null?u:"",s=(g=(f=X(o.responseBody))!=null?f:o.responseBodyRaw)!=null?g:"",i=a("button",{type:"button",class:"apd-action-btn",title:o.pinned?"Unpin":"Pin this request"},[o.pinned?"\u2605 Pinned":"\u2606 Pin"]);i.addEventListener("click",()=>e(o.id)),t.appendChild(a("div",{class:"apd-detail-header"},[a("div",{class:"apd-detail-url"},[a("strong",{},[o.method]),` ${o.url}`]),i]));let p=a("div",{class:"apd-meta-grid"}),c=(k,L,v)=>a("div",{},[a("div",{class:"apd-meta-label"},[k]),a("div",{class:"apd-meta-value",style:v?`color:${v}`:void 0},[L])]);p.appendChild(c("Status",`${(b=o.responseStatus)!=null?b:"Failed"} ${o.responseStatusText}`,o.success?"var(--apd-success)":"var(--apd-error)")),p.appendChild(c("Duration",fe(o.duration))),p.appendChild(c("Time",V(o.timestamp))),p.appendChild(c("Source",o.source)),p.appendChild(c("Req. size",Be(o.requestSize))),p.appendChild(c("Res. size",Be(o.responseSize))),t.appendChild(p),o.error&&t.appendChild(a("div",{class:"apd-section",style:"border-color: var(--apd-error)"},[a("div",{class:"apd-section-header",style:"color: var(--apd-error)"},["Error"]),a("div",{class:"apd-section-body"},[o.error])])),t.appendChild(a("div",{class:"apd-actions"},[_e("Copy cURL",()=>r),_e("Copy Request",()=>d),_e("Copy Response",()=>s)])),t.appendChild(G("cURL",void 0,!0,ve(r,null,!1).el)),t.appendChild(G("Query Params",Object.keys(o.queryParams).length,!1,Fe(o.queryParams))),t.appendChild(G("Request Headers",Object.keys(o.requestHeaders).length,!1,Fe(o.requestHeaders))),t.appendChild(G("Request Body",void 0,!0,o.requestBodyRaw?ve(o.requestBody,o.requestBodyRaw).el:a("div",{class:"apd-empty-body"},["No body"]))),t.appendChild(G("Response Headers",Object.keys(o.responseHeaders).length,!1,Fe(o.responseHeaders))),t.appendChild(G("Response Body",void 0,!0,o.responseBodyRaw?ve(o.responseBody,o.responseBodyRaw).el:a("div",{class:"apd-empty-body"},["No body"])))}return n(null),{el:t,setLog:n}}var ln={log:"\u25B8",info:"\u2139",warn:"\u26A0",error:"\u2715",debug:"\u2699"};function pn(e){var s,i;let t=!1,n=a("div",{class:"apd-console-stack"},[(s=e.stack)!=null?s:""]);n.style.display="none";let o=a("div",{class:"apd-console-meta"},[a("span",{},[V(e.timestamp)]),e.source!=="console"?a("span",{},[e.source]):null]);if(e.stack){let p=a("button",{type:"button",class:"apd-console-toggle-stack"},["Show stack trace"]);p.addEventListener("click",()=>{t=!t,p.textContent=t?"Hide stack trace":"Show stack trace",n.style.display=t?"":"none"}),o.appendChild(p)}let r=a("div",{class:"apd-console-body"},[a("div",{class:"apd-console-preview"},[e.preview||"(empty)"]),o,n]);return a("div",{class:`apd-console-item apd-console-${e.level}`},[a("span",{class:"apd-console-icon"},[(i=ln[e.level])!=null?i:"\u25B8"]),r,e.count>1?a("span",{class:"apd-console-count"},[String(e.count)]):null])}function Rt(){let e=a("div",{class:"apd-console-list"});function t(n){if(z(e),n.length===0){e.appendChild(a("div",{class:"apd-empty"},["Nothing logged yet.",a("br"),"console.log/warn/error and uncaught errors will show up here."]));return}for(let o of n)e.appendChild(pn(o))}return{el:e,render:t}}var Xe="data-apd-source";function cn(e){let t=e.getAttribute(Xe);if(!t)return null;let n=t.match(/^(.*):(\d+):(\d+)$/);return n?{file:n[1],line:Number(n[2]),column:Number(n[3]),confidence:"exact",origin:"build-plugin"}:{file:t,confidence:"exact",origin:"build-plugin"}}function Ht(e){let t=Object.keys(e).find(n=>n.startsWith("__reactFiber$")||n.startsWith("__reactInternalInstance$"));return t?e[t]:null}function un(e){let t=Ht(e);for(;t;){let n=t._debugSource;if(n&&n.fileName)return{file:n.fileName,line:typeof n.lineNumber=="number"?n.lineNumber:void 0,column:typeof n.columnNumber=="number"?n.columnNumber:void 0,confidence:"exact",origin:"react"};t=t.return}return null}function fn(e){let t=Ht(e);for(;t;){let n=t.type;if(typeof n=="function"&&n.name)return n.name;if(n&&typeof n=="object"&&n.displayName)return n.displayName;t=t.return}return null}function Tt(e){return e.__vueParentComponent?{version:3,inst:e.__vueParentComponent}:e.__vue__?{version:2,inst:e.__vue__}:null}function mn(e){var n,o;let t=e;for(;t;){let r=Tt(t);if(r){let d=r.version===3?(n=r.inst.type)==null?void 0:n.__file:(o=r.inst.$options)==null?void 0:o.__file;if(d)return{file:d,confidence:"exact",origin:"vue"}}t=t.parentElement}return null}function gn(e){var n,o,r,d;let t=e;for(;t;){let s=Tt(t);if(s){let i=s.version===3?((n=s.inst.type)==null?void 0:n.__name)||((o=s.inst.type)==null?void 0:o.name):((r=s.inst.$options)==null?void 0:r.name)||((d=s.inst.$options)==null?void 0:d._componentTag);if(i)return i}t=t.parentElement}return null}function hn(e){var n,o;let t=window.ng;if(!(t!=null&&t.getComponent))return null;try{let r=t.getComponent(e);return(o=(n=r==null?void 0:r.constructor)==null?void 0:n.name)!=null?o:null}catch{return null}}var bn=/(?:\()?(https?:\/\/[^\s)]+|\/[^\s)]+|[A-Za-z]:\\[^\s)]+):(\d+):(\d+)\)?/;function xn(e){return/next-api-debugger|core\/inspector\/|node_modules/.test(e)}function yn(e){let t=gt(e);if(!(t!=null&&t.stack))return null;let n=t.stack.split(`
`).slice(1);for(let o of n){if(xn(o))continue;let r=o.match(bn);if(r)return{file:r[1],line:Number(r[2]),column:Number(r[3]),confidence:"approximate",origin:"stack-trace"}}return null}var ie;async function vn(){if(ie!==void 0)return ie;try{ie=await(await fetch(location.href,{cache:"force-cache"})).text()}catch{ie=null}return ie}function wn(e){if(e.id)return`id="${e.id}"`;for(let t of["data-testid","name"]){let n=e.getAttribute(t);if(n)return`${t}="${n}"`}return e.className&&typeof e.className=="string"?`class="${e.className}"`:null}async function En(e){let t=location.pathname||"/",n=await vn();if(n){let o=wn(e);if(o){let r=n.indexOf(o);if(r!==-1){let d=n.slice(0,r).split(`
`).length;return{file:t,line:d,confidence:"approximate",origin:"plain-html"}}}}return{file:t,confidence:"approximate",origin:"plain-html"}}async function Mt(e){let t=cn(e);if(t)return t;let n=un(e);if(n)return n;let o=mn(e);if(o)return o;let r=yn(e);return r||En(e)}function At(e){var t,n;return(n=(t=fn(e))!=null?t:gn(e))!=null?n:hn(e)}var kn=["display","position","top","right","bottom","left","width","height","color","background-color","font-family","font-size","font-weight","line-height","text-align","flex-direction","justify-content","align-items","gap","grid-template-columns","grid-template-rows","z-index","opacity","overflow","box-sizing","cursor"];function H(e){let t=parseFloat(e);return Number.isFinite(t)?t:0}function Ln(e){return{margin:{top:H(e.marginTop),right:H(e.marginRight),bottom:H(e.marginBottom),left:H(e.marginLeft)},border:{top:H(e.borderTopWidth),right:H(e.borderRightWidth),bottom:H(e.borderBottomWidth),left:H(e.borderLeftWidth)},padding:{top:H(e.paddingTop),right:H(e.paddingRight),bottom:H(e.paddingBottom),left:H(e.paddingLeft)},content:{width:H(e.width),height:H(e.height)}}}function Sn(e){let t=[],n=e.parentElement;for(;n&&n.tagName.toLowerCase()!=="html";)t.push({tag:n.tagName.toLowerCase(),id:n.id||null,classes:Array.from(n.classList)}),n=n.parentElement;return t}async function $t(e){let t=getComputedStyle(e),n=e.getBoundingClientRect(),o={};Array.from(e.attributes).forEach(i=>{i.name!==Xe&&(o[i.name]=i.value)});let r={};kn.forEach(i=>{r[i]=t.getPropertyValue(i)});let s=e.children.length===0&&(e.textContent||"").trim().slice(0,120)||null;return{tag:e.tagName.toLowerCase(),id:e.id||null,classes:Array.from(e.classList),attributes:o,rect:{x:n.x,y:n.y,width:n.width,height:n.height},box:Ln(t),computedStyles:r,ancestors:Sn(e),childCount:e.children.length,textPreview:s,componentName:At(e),source:await Mt(e)}}function Cn(e){return!!(e!=null&&e.closest(".apd-root"))}function Pt(e,t,n){let o=!0;function r(c){let l=document.elementFromPoint(c.clientX,c.clientY);return Cn(l)?null:l}function d(c){o&&(t==null||t(r(c)))}function s(c){if(!o)return;let l=r(c);l&&(c.preventDefault(),c.stopPropagation(),p(),e(l))}function i(c){c.key==="Escape"&&(p(),n==null||n())}function p(){o=!1,window.removeEventListener("mousemove",d,!0),window.removeEventListener("click",s,!0),window.removeEventListener("keydown",i,!0)}return window.addEventListener("mousemove",d,!0),window.addEventListener("click",s,!0),window.addEventListener("keydown",i,!0),{cancel:()=>{p(),n==null||n()}}}function Bt(){let e=document.createElement("div");e.className="apd-inspect-highlight",e.style.display="none";function t(o){e.style.display="",e.style.left=`${o.left}px`,e.style.top=`${o.top}px`,e.style.width=`${o.width}px`,e.style.height=`${o.height}px`}function n(){e.style.display="none"}return{el:e,show:t,hide:n}}function qt(e){let t=Object.entries(e).filter(([,o])=>o!=="");if(t.length===0)return a("div",{class:"apd-empty-body"},["None"]);let n=a("div",{class:"apd-kv"});return t.forEach(([o,r])=>{n.appendChild(a("div",{class:"apd-kv-key"},[o])),n.appendChild(a("div",{class:"apd-kv-val"},[r]))}),n}function Ve(e,t,n){return a("div",{class:`apd-box-layer ${e}`},[a("span",{class:"apd-box-label apd-box-label-top"},[String(t.top)]),a("span",{class:"apd-box-label apd-box-label-right"},[String(t.right)]),a("span",{class:"apd-box-label apd-box-label-bottom"},[String(t.bottom)]),a("span",{class:"apd-box-label apd-box-label-left"},[String(t.left)]),n])}function Rn(e){let t=a("div",{class:"apd-box-layer-content"},[`${Math.round(e.box.content.width)} \xD7 ${Math.round(e.box.content.height)}`]),n=Ve("apd-box-layer-padding",e.box.padding,t),o=Ve("apd-box-layer-border",e.box.border,n),r=Ve("apd-box-layer-margin",e.box.margin,o);return a("div",{class:"apd-box-model"},[r])}function Hn(e,t){var l;let{source:n,componentName:o}=e;if(!n)return a("div",{class:"apd-source-card"},[a("div",{class:"apd-source-none"},["Source location unavailable for this element."])]);let r=n.line?`${n.file}:${n.line}${n.column?`:${n.column}`:""}`:n.file,d=!!t,s=d?`vscode://file/${t.replace(/\/$/,"")}/${n.file.replace(/^\//,"")}${n.line?`:${n.line}:${(l=n.column)!=null?l:1}`:""}`:void 0,i=d?a("a",{class:"apd-source-path",href:s,title:"Open in VS Code"},[r]):a("span",{class:"apd-source-path apd-source-path-plain"},[r]),p=a("div",{class:"apd-source-meta"},[a("span",{class:`apd-confidence-badge apd-confidence-${n.confidence}`},[n.confidence]),a("span",{},[`via ${n.origin}`])]);if(!d){let u=a("button",{type:"button",class:"apd-console-toggle-stack",style:"margin-left:auto"},["Copy path"]);u.addEventListener("click",()=>ge(r)),p.appendChild(u)}let c=a("div",{class:"apd-source-card"});return o&&c.appendChild(a("div",{style:"font-size:11px;color:var(--apd-text-dim);margin-bottom:4px"},["Component: ",a("strong",{style:"color:var(--apd-text)"},[o])])),c.appendChild(i),c.appendChild(p),c}function Je(e,t){return a("div",{class:"apd-section"},[a("div",{class:"apd-section-header"},[e]),a("div",{class:"apd-section-body"},[t])])}function jt(e,t){let n=a("div",{}),o=null,r=null;function d(){r==null||r.hide(),r==null||r.el.remove(),r=null}function s(l,u){z(n),n.className="apd-inspector-empty";let f=a("button",{type:"button",class:`apd-inspect-start-btn${l?" apd-inspecting":""}`},[l?"\u25FC Stop Inspecting (Esc)":"\u2316 Start Inspecting"]);f.addEventListener("click",()=>l?p():i()),n.appendChild(f),n.appendChild(a("p",{},[u]))}function i(){e(!0),s(!0,"Hover any element on the page and click to select it.");let l=Bt();document.body.appendChild(l.el),r=l,o=Pt(async u=>{d(),e(!1),s(!1,"Resolving source location\u2026");let f=await $t(u);c(f)},u=>{u?l.show(u.getBoundingClientRect()):l.hide()},()=>{d(),e(!1),s(!1,"Pick any element on the page to see its DOM details, computed styles, and \u2014 when available \u2014 the exact source file responsible for it.")})}function p(){o==null||o.cancel()}function c(l){z(n),n.className="",n.classList.add("apd-inspector-body");let u=a("div",{style:"display:flex;align-items:flex-start;gap:10px;margin-bottom:12px"}),f=a("div",{style:"flex:1"}),g=a("div",{class:"apd-inspector-tag"},[`<${l.tag}`,l.id?a("span",{class:"apd-tag-id"},[` #${l.id}`]):null,...l.classes.map(v=>a("span",{class:"apd-tag-class"},[` .${v}`])),">"]);f.appendChild(g),l.textPreview&&f.appendChild(a("div",{style:"font-size:11.5px;color:var(--apd-text-dim);font-family:var(--apd-mono)"},[`"${l.textPreview}"`])),u.appendChild(f);let b=a("button",{type:"button",class:"apd-action-btn"},["\u2316 Inspect another"]);if(b.addEventListener("click",i),u.appendChild(b),n.appendChild(u),l.ancestors.length>0){let v=a("div",{class:"apd-inspector-breadcrumb"});[...l.ancestors].reverse().forEach(w=>{v.appendChild(a("span",{},[`${w.tag}${w.id?`#${w.id}`:""}`]))}),v.appendChild(a("span",{style:"color:var(--apd-accent)"},[l.tag])),n.appendChild(v)}n.appendChild(Hn(l,t));let k=a("div",{class:"apd-meta-grid"}),L=(v,w)=>a("div",{},[a("div",{class:"apd-meta-label"},[v]),a("div",{class:"apd-meta-value"},[w])]);k.appendChild(L("Position",`${Math.round(l.rect.x)}, ${Math.round(l.rect.y)}`)),k.appendChild(L("Size",`${Math.round(l.rect.width)} \xD7 ${Math.round(l.rect.height)}`)),k.appendChild(L("Children",String(l.childCount))),n.appendChild(k),n.appendChild(Je("Box Model",Rn(l))),n.appendChild(Je(`Attributes (${Object.keys(l.attributes).length})`,qt(l.attributes))),n.appendChild(Je("Computed Styles",qt(l.computedStyles)))}return s(!1,"Pick any element on the page to see its DOM details, computed styles, and \u2014 when available \u2014 the exact source file responsible for it."),{el:n,destroy(){o==null||o.cancel(),d()}}}var We=["GET","POST","PUT","PATCH","DELETE"],Ke=["log","info","warn","error","debug"];function It(e){let t=a("input",{type:"text",placeholder:e}),n=document.createElementNS("http://www.w3.org/2000/svg","svg");return n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2"),n.innerHTML='<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',{el:a("div",{class:"apd-search"},[n,t]),input:t}}function zt(e,t,n,o,r={}){var nt;let d=(nt=r.inspectorEnabled)!=null?nt:!0,s="network",i={search:"",status:"all",methods:[]},p="",c=[],l=null,u=!1,f="dark",g=[],b=[],k=!1,L=kt(m=>{l=m,U()},e),v=Ct(e),w=Rt(),h=d?jt(m=>tt(m),r.editorProjectRoot):null,T=a("span",{class:"apd-header-count"}),E=a("button",{class:"apd-icon-btn",title:"Toggle theme",type:"button"},["\u263E"]),y=It("Filter by URL, endpoint, method or status code..."),S=a("button",{type:"button",class:"apd-chip apd-chip-success"},["Success"]),$=a("button",{type:"button",class:"apd-chip apd-chip-failed"},["Failed"]),P=We.map(m=>a("button",{type:"button",class:"apd-chip"},[m]));S.addEventListener("click",()=>{i={...i,status:i.status==="success"?"all":"success"},U()}),$.addEventListener("click",()=>{i={...i,status:i.status==="failed"?"all":"failed"},U()}),P.forEach((m,C)=>{let x=We[C];m.addEventListener("click",()=>{i={...i,methods:i.methods.includes(x)?i.methods.filter(M=>M!==x):[...i.methods,x]},U()})}),y.input.addEventListener("input",()=>{i={...i,search:y.input.value},U()});let de=a("div",{class:"apd-toolbar"},[y.el,S,$,...P]),Ye=a("div",{class:"apd-body"},[L.el,v.el]),Ee=It("Filter console output..."),ke=Ke.map(m=>a("button",{type:"button",class:"apd-chip"},[m]));ke.forEach((m,C)=>{let x=Ke[C];m.addEventListener("click",()=>{c=c.includes(x)?c.filter(M=>M!==x):[...c,x],ce()})}),Ee.input.addEventListener("input",()=>{p=Ee.input.value,ce()});let le=a("div",{class:"apd-toolbar"},[Ee.el,...ke]);le.style.display="none",de.style.display="";let _=a("button",{type:"button",class:"apd-tab apd-active"},["Network"]),F=a("button",{type:"button",class:"apd-tab"},["Console"]),Le=a("button",{type:"button",class:"apd-tab"},["Inspector"]),Dt=[_,F,...d?[Le]:[]],Ge=a("div",{class:"apd-tabs"},Dt);_.addEventListener("click",()=>Te("network")),F.addEventListener("click",()=>Te("console")),Le.addEventListener("click",()=>Te("inspector"));let Ze=a("div",{class:"apd-footer"},[a("span",{},[a("span",{class:"apd-kbd"},["Ctrl"]),"+",a("span",{class:"apd-kbd"},["Shift"]),"+",a("span",{class:"apd-kbd"},["D"])," to toggle \xB7 ",a("span",{class:"apd-kbd"},["Space"]),"+",a("span",{class:"apd-kbd"},["H"])," to hide"]),a("span",{style:"margin-left:auto"},["api-debugger \xB7 dev only"])]),Qe=a("button",{class:"apd-icon-btn",title:"Close",type:"button"},["\u2715"]),Se=a("button",{class:"apd-icon-btn",title:"Minimize",type:"button"},["\u2014"]),pe=a("button",{class:"apd-icon-btn",title:"Clear logs",type:"button"},["\u{1F5D1}"]),Ce=a("button",{class:"apd-icon-btn",title:"Export HAR",type:"button"},["HAR"]),Re=a("button",{class:"apd-icon-btn",title:"Export JSON",type:"button"},["\u2B73"]),Ut=a("div",{class:"apd-header"},[a("div",{class:"apd-header-title"},[a("span",{class:"apd-live-dot"}),"API Debugger"]),T,a("div",{class:"apd-spacer"}),E,Re,Ce,pe,Se,Qe]),_t=[Ye,w.el,...h?[h.el]:[]],et=a("div",{style:"display:flex;flex-direction:column;flex:1;overflow:hidden"},_t);w.el.style.display="none",h&&(h.el.style.display="none");let He=a("div",{class:"apd-modal"},[Ut,Ge,de,le,et,Ze]);He.addEventListener("click",m=>m.stopPropagation());let D=a("div",{class:"apd-overlay"},[He]);D.addEventListener("click",()=>Ae()),Qe.addEventListener("click",()=>Ae());function tt(m){u=m,He.classList.toggle("apd-minimized",u),D.classList.toggle("apd-overlay-passthrough",u),Se.textContent=u?"\u25A2":"\u2014",Ge.style.display=u?"none":"",de.style.display=u||s!=="network"?"none":"",le.style.display=u||s!=="console"?"none":"",et.style.display=u?"none":"",Ze.style.display=u?"none":""}Se.addEventListener("click",()=>tt(!u)),pe.addEventListener("click",()=>s==="network"?t():n()),Re.addEventListener("click",()=>De(`api-logs-${Date.now()}.json`,g)),Ce.addEventListener("click",()=>De(`api-logs-${Date.now()}.har`,Et(g))),E.addEventListener("click",()=>{f=f==="light"?"dark":"light",E.textContent=f==="light"?"\u2600":"\u263E";let m=D.closest(".apd-root");m==null||m.classList.toggle("apd-light",f==="light")});function Te(m){s=m,_.classList.toggle("apd-active",s==="network"),F.classList.toggle("apd-active",s==="console"),Le.classList.toggle("apd-active",s==="inspector"),de.style.display=s==="network"?"":"none",le.style.display=s==="console"?"":"none",Ye.style.display=s==="network"?"":"none",w.el.style.display=s==="console"?"":"none",h&&(h.el.style.display=s==="inspector"?"flex":"none"),pe.title=s==="network"?"Clear logs":"Clear console",pe.style.display=s==="inspector"?"none":"",Re.style.display=s==="network"?"":"none",Ce.style.display=s==="network"?"":"none",Me()}function Me(){if(s==="network"){let x=g.filter(M=>!M.success).length;T.textContent=`${g.length} requests${x>0?` \xB7 ${x} failed`:""}`}else if(s==="console"){let x=b.filter(M=>M.level==="error").length;T.textContent=`${b.length} logs${x>0?` \xB7 ${x} errors`:""}`}else T.textContent="element picker";let m=g.length>0?a("span",{class:`apd-tab-badge${g.some(x=>!x.success)?" apd-tab-badge-error":""}`},[String(g.length)]):null,C=b.length>0?a("span",{class:`apd-tab-badge${b.some(x=>x.level==="error")?" apd-tab-badge-error":""}`},[String(b.length)]):null;_.textContent="Network",m&&_.appendChild(m),F.textContent="Console",C&&F.appendChild(C),_.classList.toggle("apd-active",s==="network"),F.classList.toggle("apd-active",s==="console")}function U(){var M,ot;let m=i.search.trim().toLowerCase(),C=g.filter(A=>{var ue;return!(i.status==="success"&&!A.success||i.status==="failed"&&A.success||i.methods.length>0&&!i.methods.includes(A.method)||m&&!`${A.url} ${A.endpoint} ${A.method} ${(ue=A.responseStatus)!=null?ue:""}`.toLowerCase().includes(m))});!l&&C.length>0&&(l=C[0].id);let x=(ot=(M=C.find(A=>A.id===l))!=null?M:C[0])!=null?ot:null;x&&(l=x.id),L.render(C,l),v.setLog(x),S.classList.toggle("apd-active",i.status==="success"),$.classList.toggle("apd-active",i.status==="failed"),P.forEach((A,ue)=>A.classList.toggle("apd-active",i.methods.includes(We[ue]))),Me()}function ce(){let m=p.trim().toLowerCase(),C=b.filter(x=>!(c.length>0&&!c.includes(x.level)||m&&!x.preview.toLowerCase().includes(m)));w.render(C),ke.forEach((x,M)=>x.classList.toggle("apd-active",c.includes(Ke[M]))),Me()}function Ft(m){g=m,k&&U()}function Xt(m){b=m,k&&ce()}function Vt(){k=!0,D.style.display="",U(),ce(),o==null||o(!0)}function Ae(){k=!1,D.style.display="none",o==null||o(!1)}return D.style.display="none",{el:D,open:Vt,close:Ae,update:Ft,updateConsole:Xt,isOpen:()=>k}}var Ot="next-api-debugger-styles";function Tn(){if(typeof document=="undefined"||document.getElementById(Ot))return;let e=document.createElement("style");e.id=Ot,e.textContent=ht,document.head.appendChild(e)}function Nt(e={}){Tn();let t=a("div",{class:"apd-root"});document.body.appendChild(t);let n=vt(()=>{n.el.style.display="none",o.open()},e.initialPosition),o=zt(l=>R.togglePin(l),()=>R.clear(),()=>B.clear(),l=>{n.el.style.display=l?"none":""},{inspectorEnabled:e.inspectorEnabled,editorProjectRoot:e.editorProjectRoot});t.appendChild(n.el),t.appendChild(o.el);function r(){let l=R.getLogs(),u=B.getEntries();o.update(l),o.updateConsole(u);let f=l.some(g=>!g.success)||u.some(g=>g.level==="error");n.setCount(l.length+u.length,f)}let d=R.subscribe(r),s=B.subscribe(r);r();function i(l){(l.ctrlKey||l.metaKey)&&l.shiftKey&&l.key.toLowerCase()==="d"&&(l.preventDefault(),o.isOpen()?o.close():o.open())}e.keyboardShortcut!==!1&&window.addEventListener("keydown",i);let p=!1,c=e.keyboardShortcut!==!1?bt(["space","h"],()=>{p=!p,p&&o.close(),t.style.display=p?"none":""}):()=>{};return{destroy(){d(),s(),window.removeEventListener("keydown",i),c(),t.remove()}}}var Z=null;function we(e={}){var r,d;if(typeof window=="undefined")return{destroy:()=>{}};if(Z&&(Z.destroy(),Z=null),e.enabled===!1)return{destroy:()=>{}};R.setMaxLogs((r=e.maxLogs)!=null?r:200),B.setMaxEntries((d=e.maxConsoleEntries)!=null?d:500),rt({ignoreUrls:e.ignoreUrls}),e.captureXhr!==!1&&st({ignoreUrls:e.ignoreUrls}),e.captureConsole!==!1&&ct(),e.inspector!==!1&&ft();let t=e.axiosInstance?lt(e.axiosInstance,{ignoreUrls:e.ignoreUrls}):()=>{},n=Nt({initialPosition:e.initialPosition,keyboardShortcut:e.keyboardShortcut,inspectorEnabled:e.inspector!==!1,editorProjectRoot:e.editorProjectRoot}),o={destroy(){at(),it(),ut(),e.inspector!==!1&&mt(),t(),n.destroy(),Z===o&&(Z=null)}};return Z=o,o}if(typeof document!="undefined"){let e=document.currentScript;e!=null&&e.hasAttribute("data-manual-init")||(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>we()):we())}typeof window!="undefined"&&(window.ApiDebugger=Object.assign(window.ApiDebugger||{},{init:we}));var er={init:we};export{er as default,we as initApiDebugger};
//# sourceMappingURL=standalone.mjs.map