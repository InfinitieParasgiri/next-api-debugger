"use strict";var Ee=Object.defineProperty;var yt=Object.getOwnPropertyDescriptor;var vt=Object.getOwnPropertyNames;var wt=Object.prototype.hasOwnProperty;var kt=(e,t)=>{for(var o in t)Ee(e,o,{get:t[o],enumerable:!0})},Et=(e,t,o,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of vt(t))!wt.call(e,r)&&r!==o&&Ee(e,r,{get:()=>t[r],enumerable:!(n=yt(t,r))||n.enumerable});return e};var Lt=e=>Et(Ee({},"__esModule",{value:!0}),e);var Jt={};kt(Jt,{default:()=>Xt,initApiDebugger:()=>re});module.exports=Lt(Jt);var Le=class{constructor(){this.logs=[];this.listeners=new Set;this.maxLogs=200;this.snapshot=[];this.getLogs=()=>(this.snapshot=this.logs,this.snapshot);this.subscribe=t=>(this.listeners.add(t),()=>this.listeners.delete(t))}setMaxLogs(t){this.maxLogs=Math.max(1,t),this.trim()}addLog(t){this.logs=[t,...this.logs],this.trim(),this.emit()}togglePin(t){this.logs=this.logs.map(o=>o.id===t?{...o,pinned:!o.pinned}:o),this.emit()}clear(){this.logs=[],this.emit()}trim(){if(this.logs.length<=this.maxLogs)return;let t=this.logs.filter(a=>a.pinned),n=this.logs.filter(a=>!a.pinned).slice(0,Math.max(0,this.maxLogs-t.length)),r=[...t,...n];r.sort((a,i)=>i.timestamp-a.timestamp),this.logs=r}emit(){this.listeners.forEach(t=>t())}},C=new Le;var Se=class{constructor(){this.entries=[];this.listeners=new Set;this.maxEntries=500;this.getEntries=()=>this.entries;this.subscribe=t=>(this.listeners.add(t),()=>this.listeners.delete(t))}setMaxEntries(t){this.maxEntries=Math.max(1,t),this.trim()}addEntry(t){let o=this.entries[0];o&&o.level===t.level&&o.preview===t.preview&&o.stack===t.stack?this.entries=[{...o,count:o.count+1,timestamp:t.timestamp},...this.entries.slice(1)]:this.entries=[t,...this.entries],this.trim(),this.emit()}clear(){this.entries=[],this.emit()}trim(){this.entries.length>this.maxEntries&&(this.entries=this.entries.slice(0,this.maxEntries))}emit(){this.listeners.forEach(t=>t())}},M=new Se;var P="x-apd-skip";function B(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,9)}`}function I(e){if(!e)return null;try{return JSON.parse(e)}catch{return e}}function X(e){if(e==null)return null;if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return String(e)}}function $(e){if(!e)return 0;try{return new Blob([e]).size}catch{return e.length}}function Ce(e){if(!e)return"0 B";let t=["B","KB","MB","GB"],o=Math.min(t.length-1,Math.floor(Math.log(e)/Math.log(1024))),n=e/Math.pow(1024,o);return`${o===0?n:n.toFixed(1)} ${t[o]}`}function de(e){return e<1e3?`${e} ms`:`${(e/1e3).toFixed(2)} s`}function J(e){let t=new Date(e);return t.toLocaleTimeString(void 0,{hour12:!1})+`.${String(t.getMilliseconds()).padStart(3,"0")}`}function F(e){try{let t=typeof window!="undefined"?window.location.origin:"http://localhost",o=new URL(e,t),n={};return o.searchParams.forEach((r,a)=>{n[a]=r}),{endpoint:o.pathname,queryParams:n}}catch{return{endpoint:e,queryParams:{}}}}function pe(e){let t={};return e&&e.forEach((o,n)=>{t[n]=o}),t}function Q(e){let t={};if(!e)return t;if(typeof e.toJSON=="function")return{...e.toJSON()};if(e instanceof Headers)return pe(e);if(typeof e=="object")for(let[o,n]of Object.entries(e))n!=null&&(t[o]=String(n));return t}function _(e,t){return!t||t.length===0?!1:t.some(o=>o instanceof RegExp?o.test(e):e.includes(o))}async function Xe(e){try{if(navigator.clipboard&&window.isSecureContext)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select();let o=document.execCommand("copy");return document.body.removeChild(t),o}catch{return!1}}var O=null,le=!1;function St(e){if(e==null)return null;if(typeof e=="string")return e;if(e instanceof URLSearchParams)return e.toString();if(e instanceof FormData){let t=[];return e.forEach((o,n)=>{t.push(`${n}=${o instanceof File?`[File: ${o.name}]`:o}`)}),t.join("&")}return"[binary data]"}function Je(e={}){le||typeof window=="undefined"||typeof window.fetch!="function"||(O=window.fetch.bind(window),le=!0,window.fetch=async function(o,n){var v,R,w,k,L;let r=o instanceof Request?o:null,a=r?r.url:String(o);if(_(a,e.ignoreUrls))return O(o,n);let i=pe(new Headers((R=(v=n==null?void 0:n.headers)!=null?v:r==null?void 0:r.headers)!=null?R:void 0));if(i[P]){let g=new Headers((k=(w=n==null?void 0:n.headers)!=null?w:r==null?void 0:r.headers)!=null?k:void 0);return g.delete(P),r?O(new Request(r,{headers:g})):O(o,{...n,headers:g})}let d=Date.now(),p=performance.now(),u=((n==null?void 0:n.method)||(r==null?void 0:r.method)||"GET").toUpperCase(),{endpoint:l,queryParams:c}=F(a),f=St((L=n==null?void 0:n.body)!=null?L:null),b={id:B(),url:a,endpoint:l,method:u,requestHeaders:i,requestBody:I(f),requestBodyRaw:f,queryParams:c,timestamp:d,source:"fetch",requestSize:$(f),pinned:!1};try{let g=await O(o,n),T=Math.round(performance.now()-p),y=g.clone(),x=null;try{x=await y.text()}catch{x=null}return C.addLog({...b,duration:T,responseStatus:g.status,responseStatusText:g.statusText,responseHeaders:pe(g.headers),responseBody:I(x),responseBodyRaw:x,responseSize:$(x),success:g.ok,error:g.ok?null:`HTTP ${g.status} ${g.statusText}`}),g}catch(g){let T=Math.round(performance.now()-p);throw C.addLog({...b,duration:T,responseStatus:null,responseStatusText:"",responseHeaders:{},responseBody:null,responseBodyRaw:null,responseSize:0,success:!1,error:(g==null?void 0:g.message)||"Network error"}),g}})}function Fe(){le&&O&&typeof window!="undefined"&&(window.fetch=O),le=!1,O=null}var Z=null,W=null,ee=null,ce=!1,V=Symbol("apd-xhr-meta");function Ct(e){let t={};return e.trim().split(/[\r\n]+/).forEach(o=>{let n=o.indexOf(":");if(n===-1)return;let r=o.slice(0,n).trim().toLowerCase(),a=o.slice(n+1).trim();r&&(t[r]=a)}),t}function _e(e={}){ce||typeof window=="undefined"||typeof XMLHttpRequest=="undefined"||(Z=XMLHttpRequest.prototype.open,W=XMLHttpRequest.prototype.send,ee=XMLHttpRequest.prototype.setRequestHeader,ce=!0,XMLHttpRequest.prototype.open=function(o,n,...r){let a=String(n);return this[V]={id:B(),method:(o||"GET").toUpperCase(),url:a,startTime:0,startPerf:0,requestHeaders:{},ignored:_(a,e.ignoreUrls)},Z.apply(this,[o,n,...r])},XMLHttpRequest.prototype.setRequestHeader=function(o,n){if(o.toLowerCase()===P){this[V]&&(this[V].ignored=!0);return}return this[V]&&(this[V].requestHeaders[o]=n),ee.apply(this,[o,n])},XMLHttpRequest.prototype.send=function(o){let n=this[V];if(!n||n.ignored)return W.apply(this,[o]);n.startTime=Date.now(),n.startPerf=performance.now();let r=o==null?null:typeof o=="string"?o:o instanceof URLSearchParams?o.toString():o instanceof FormData?"[form data]":"[binary data]",a=()=>{let i=Math.round(performance.now()-n.startPerf),{endpoint:d,queryParams:p}=F(n.url),u=Ct(this.getAllResponseHeaders()||""),l=null;try{l=typeof this.responseText=="string"?this.responseText:null}catch{l=null}let c=this.status,f=c>=200&&c<400,b={id:n.id,url:n.url,endpoint:d,method:n.method,requestHeaders:n.requestHeaders,requestBody:I(r),requestBodyRaw:r,queryParams:p,responseStatus:c||null,responseStatusText:this.statusText||"",responseHeaders:u,responseBody:I(l),responseBodyRaw:l,duration:i,timestamp:n.startTime,success:f,error:f?null:c===0?"Network error":`HTTP ${c} ${this.statusText}`,source:"xhr",requestSize:$(r),responseSize:$(l),pinned:!1};C.addLog(b),this.removeEventListener("loadend",a)};return this.addEventListener("loadend",a),W.apply(this,[o])})}function Ve(){ce&&typeof window!="undefined"&&typeof XMLHttpRequest!="undefined"&&(Z&&(XMLHttpRequest.prototype.open=Z),W&&(XMLHttpRequest.prototype.send=W),ee&&(XMLHttpRequest.prototype.setRequestHeader=ee)),ce=!1,Z=null,W=null,ee=null}function Rt(e){let t=(e==null?void 0:e.baseURL)||"",o=(e==null?void 0:e.url)||"",n=/^https?:\/\//i.test(o)?o:`${t}${t&&!t.endsWith("/")&&!o.startsWith("/")?"/":""}${o}`;if(e!=null&&e.params&&typeof e.params=="object"){let r=Ht(e.params);r&&(n+=(n.includes("?")?"&":"?")+r)}return n}function Ht(e){let t=new URLSearchParams;for(let[o,n]of Object.entries(e))n!=null&&(Array.isArray(n)?n.forEach(r=>t.append(o,String(r))):t.append(o,String(n)));return t.toString()}function We(e){if(e==null)return null;if(typeof e=="string")return e;if(typeof URLSearchParams!="undefined"&&e instanceof URLSearchParams)return e.toString();if(typeof FormData!="undefined"&&e instanceof FormData){let t=[];return e.forEach((o,n)=>{t.push(`${n}=${o instanceof File?`[File: ${o.name}]`:o}`)}),t.join("&")}return X(e)}function Ke(e,t={}){var a;if(!e||!e.interceptors||typeof((a=e.interceptors.request)==null?void 0:a.use)!="function")return()=>{};if(e.__apiDebuggerInstalled)return()=>{};e.__apiDebuggerInstalled=!0;let o=e.interceptors.request.use(i=>{let d={id:B(),startTime:Date.now(),startPerf:performance.now(),requestBodyRaw:We(i.data),requestHeadersSnapshot:Q(i.headers)};return i.__apdMeta=d,i.headers&&typeof i.headers.set=="function"?i.headers.set(P,"1"):i.headers={...i.headers||{},[P]:"1"},i});function n(i,d,p){var T,y,x,E,j,q;if(!i)return;let u=Rt(i);if(_(u,t.ignoreUrls))return;let l=i.__apdMeta||{id:B(),startTime:Date.now(),startPerf:performance.now(),requestBodyRaw:We(i.data),requestHeadersSnapshot:Q(i.headers)},c=Math.round(performance.now()-l.startPerf),{endpoint:f,queryParams:b}=F(u),v=Q(i.headers),R=Object.keys(v).length>0?v:l.requestHeadersSnapshot;delete R[P];let w=l.requestBodyRaw,k=(d==null?void 0:d.data)!==void 0?X(d.data):null,L=(x=(y=d==null?void 0:d.status)!=null?y:(T=p==null?void 0:p.response)==null?void 0:T.status)!=null?x:null,g={id:l.id,url:u,endpoint:f,method:(i.method||"get").toUpperCase(),requestHeaders:R,requestBody:(E=I(w))!=null?E:w,requestBodyRaw:w,queryParams:b,responseStatus:L,responseStatusText:(j=d==null?void 0:d.statusText)!=null?j:"",responseHeaders:Q(d==null?void 0:d.headers),responseBody:(q=d==null?void 0:d.data)!=null?q:null,responseBodyRaw:k,duration:c,timestamp:l.startTime,success:!p&&!!L&&L<400,error:p?p.message||"Request failed":null,source:"axios",requestSize:$(w),responseSize:$(k),pinned:!1};C.addLog(g)}let r=e.interceptors.response.use(i=>(n(i.config,i),i),i=>(n(i==null?void 0:i.config,i==null?void 0:i.response,i),Promise.reject(i)));return()=>{e.interceptors.request.eject(o),e.interceptors.response.eject(r),e.__apiDebuggerInstalled=!1}}var Ge=["log","info","warn","error","debug"],He={},te=null,ne=null,Te=!1;function Tt(e,t=new WeakSet){var o;if(e===null)return"null";if(e===void 0)return"undefined";if(typeof e=="string")return e;if(typeof e=="number"||typeof e=="boolean")return String(e);if(e instanceof Error)return`${e.name}: ${e.message}`;if(typeof e=="function")return e.name?`\u0192 ${e.name}()`:"\u0192 ()";if(typeof e=="object"){if(t.has(e))return"[Circular]";t.add(e);try{return(o=JSON.stringify(e,(n,r)=>typeof r=="bigint"?r.toString():r,2))!=null?o:String(e)}catch{return Array.isArray(e)?"[Array]":"[Object]"}}return String(e)}function At(e){for(let t of e)if(t instanceof Error&&t.stack)return t.stack;return null}function Re(e,t,o){let n=t.map(r=>Tt(r));return{id:B(),level:e,parts:n,preview:n.join(" "),stack:At(t),timestamp:Date.now(),source:o,count:1}}function Ye(e={}){var o,n;if(Te||typeof window=="undefined"||typeof console=="undefined")return;Te=!0;let t=(o=e.levels)!=null?o:Ge;for(let r of t){let a=(n=console[r])==null?void 0:n.bind(console);a&&(He[r]=a,console[r]=(...i)=>{M.addEntry(Re(r,i,"console")),a(...i)})}te=r=>{let a=r.error?[r.error]:[r.message],i=Re("error",a,"window.onerror");M.addEntry({...i,preview:i.preview||`${r.message} (${r.filename}:${r.lineno}:${r.colno})`})},window.addEventListener("error",te),ne=r=>{let a=r.reason,i=Re("error",[a],"unhandledrejection");M.addEntry({...i,preview:`Unhandled promise rejection: ${i.preview}`})},window.addEventListener("unhandledrejection",ne)}function Qe(){if(typeof console!="undefined")for(let e of Ge){let t=He[e];t&&(console[e]=t)}typeof window!="undefined"&&(te&&window.removeEventListener("error",te),ne&&window.removeEventListener("unhandledrejection",ne)),He={},te=null,ne=null,Te=!1}var Ze=`
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
`;function Ae(e){return e===" "?"space":e.toLowerCase()}function qt(e){var n;let t=e;if(!t)return!1;let o=(n=t.tagName)==null?void 0:n.toLowerCase();return o==="input"||o==="textarea"||o==="select"||t.isContentEditable}function et(e,t){if(typeof window=="undefined")return()=>{};let o=e.map(Ae),n=new Set;function r(d){if(qt(d.target))return;let p=Ae(d.key),u=n.has(p);n.add(p),!u&&o.every(l=>n.has(l))&&(d.preventDefault(),t())}function a(d){n.delete(Ae(d.key))}function i(){n.clear()}return window.addEventListener("keydown",r),window.addEventListener("keyup",a),window.addEventListener("blur",i),()=>{window.removeEventListener("keydown",r),window.removeEventListener("keyup",a),window.removeEventListener("blur",i)}}function s(e,t,o){let n=document.createElement(e);if(t)for(let[r,a]of Object.entries(t))a==null||a===!1||(r.startsWith("on")&&typeof a=="function"?n.addEventListener(r.slice(2).toLowerCase(),a):r==="class"?n.className=String(a):r==="html"?n.innerHTML=String(a):typeof a=="boolean"?a&&n.setAttribute(r,""):n.setAttribute(r,String(a)));if(o)for(let r of o)r==null||r===!1||n.appendChild(typeof r=="string"?document.createTextNode(r):r);return n}function K(e){for(;e.firstChild;)e.removeChild(e.firstChild)}var ue=56,tt=5,nt="apd-button-position";function oe(e){return{x:Math.min(Math.max(8,e.x),window.innerWidth-ue-8),y:Math.min(Math.max(8,e.y),window.innerHeight-ue-8)}}function Mt(){try{let e=sessionStorage.getItem(nt);if(e)return oe(JSON.parse(e))}catch{}return oe({x:window.innerWidth-ue-24,y:window.innerHeight-ue-24})}function ot(e,t){let o=s("span",{class:"apd-btn-dot"},["0"]);o.style.display="none";let n=document.createElementNS("http://www.w3.org/2000/svg","svg");n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2"),n.setAttribute("stroke-linecap","round"),n.setAttribute("stroke-linejoin","round"),n.innerHTML='<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>';let r=s("button",{type:"button",class:"apd-btn","aria-label":"Open API debugger",title:"API Debugger (drag to move)"},[n,o]),a=t?oe(t):Mt();r.style.left=`${a.x}px`,r.style.top=`${a.y}px`;let i=!1,d=!1,p={x:0,y:0,posX:0,posY:0};r.addEventListener("pointerdown",l=>{i=!0,d=!1,p={x:l.clientX,y:l.clientY,posX:a.x,posY:a.y},r.setPointerCapture(l.pointerId)}),r.addEventListener("pointermove",l=>{if(!i)return;let c=l.clientX-p.x,f=l.clientY-p.y;(Math.abs(c)>tt||Math.abs(f)>tt)&&(d=!0),a=oe({x:p.posX+c,y:p.posY+f}),r.style.left=`${a.x}px`,r.style.top=`${a.y}px`}),r.addEventListener("pointerup",()=>{i=!1;try{sessionStorage.setItem(nt,JSON.stringify(a))}catch{}}),r.addEventListener("click",()=>{d||e()}),window.addEventListener("resize",()=>{a=oe(a),r.style.left=`${a.x}px`,r.style.top=`${a.y}px`});function u(l,c){o.textContent=l>99?"99+":String(l),o.style.display=l>0?"":"none",o.classList.toggle("apd-has-errors",c)}return{el:r,setCount:u}}function rt(e){return Object.entries(e).map(([t,o])=>({name:t,value:o}))}function jt(e){return Object.entries(e).map(([t,o])=>({name:t,value:o}))}function st(e){return{log:{version:"1.2",creator:{name:"next-api-debugger",version:"0.1.0"},entries:e.map(t=>{var o,n;return{startedDateTime:new Date(t.timestamp).toISOString(),time:t.duration,request:{method:t.method,url:t.url,httpVersion:"HTTP/1.1",headers:rt(t.requestHeaders),queryString:jt(t.queryParams),cookies:[],headersSize:-1,bodySize:t.requestSize,postData:t.requestBodyRaw?{mimeType:t.requestHeaders["content-type"]||"application/json",text:t.requestBodyRaw}:void 0},response:{status:(o=t.responseStatus)!=null?o:0,statusText:t.responseStatusText,httpVersion:"HTTP/1.1",headers:rt(t.responseHeaders),cookies:[],content:{size:t.responseSize,mimeType:t.responseHeaders["content-type"]||"application/json",text:(n=t.responseBodyRaw)!=null?n:""},redirectURL:"",headersSize:-1,bodySize:t.responseSize},cache:{},timings:{send:0,wait:t.duration,receive:0}}})}}}function qe(e,t){let o=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),n=URL.createObjectURL(o),r=document.createElement("a");r.href=n,r.download=e,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(n)}function Pt(e){return["GET","POST","PUT","PATCH","DELETE"].includes(e.toUpperCase())?`apd-method-${e.toUpperCase()}`:"apd-method-OTHER"}function at(e,t){let o=s("div",{class:"apd-list"});function n(r,a){var i;if(K(o),r.length===0){o.appendChild(s("div",{class:"apd-empty"},["No requests captured yet.",s("br"),"Make an API call and it'll show up here."]));return}for(let d of r){let p=d.id===a,u=s("div",{class:"apd-item-row1"},[s("span",{class:`apd-method ${Pt(d.method)}`},[d.method]),s("span",{class:"apd-item-url",title:d.url},[d.endpoint]),s("span",{class:`apd-status-dot ${d.success?"apd-ok":"apd-fail"}`})]);if(d.pinned){let f=s("button",{class:"apd-pin-star",style:"background:none;border:none;cursor:pointer;padding:0",title:"Unpin","aria-label":"Unpin request"},["\u2605"]);f.addEventListener("click",b=>{b.stopPropagation(),t(d.id)}),u.appendChild(f)}let l=s("div",{class:"apd-item-row2"},[s("span",{},[String((i=d.responseStatus)!=null?i:d.error?"ERR":"\u2014")]),s("span",{},[de(d.duration)]),s("span",{},[J(d.timestamp)]),s("span",{style:"margin-left:auto;text-transform:uppercase"},[d.source])]),c=s("div",{class:`apd-item${p?" apd-selected":""}`,role:"button",tabindex:"0"},[u,l]);c.addEventListener("click",()=>e(d.id)),c.addEventListener("keydown",f=>{f.key==="Enter"&&e(d.id)}),o.appendChild(c)}}return{el:o,render:n}}function fe(e){return`'${e.replace(/'/g,"'\\''")}'`}function Bt(e){let t=e.trim();if(!t||!(t.startsWith("{")||t.startsWith("[")))return!1;try{return JSON.parse(t),!0}catch{return!1}}function it(e){let t=[`curl -X ${e.method} ${fe(e.url)}`],o=Object.keys(e.requestHeaders).some(n=>n.toLowerCase()==="content-type");for(let[n,r]of Object.entries(e.requestHeaders))/^(host|content-length|connection)$/i.test(n)||t.push(`  -H ${fe(`${n}: ${r}`)}`);return e.requestBodyRaw&&(!o&&Bt(e.requestBodyRaw)&&t.push(`  -H ${fe("Content-Type: application/json")}`),t.push(`  --data-raw ${fe(e.requestBodyRaw)}`)),t.join(` \\
`)}var $t=/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(\.\d+)?([eE][+-]?\d+)?)/g;function It(e){return e.replace($t,t=>{let o="apd-json-num";return/^"/.test(t)?o=/:$/.test(t)?"apd-json-key":"apd-json-str":/true|false/.test(t)?o="apd-json-bool":/null/.test(t)&&(o="apd-json-null"),`<span class="${o}">${t}</span>`})}function Ot(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function zt(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function dt(e,t){if(e!=null&&typeof e=="object")return{content:JSON.stringify(e,null,2),isJson:!0};if(typeof e=="string")try{return{content:JSON.stringify(JSON.parse(e),null,2),isJson:!0}}catch{return{content:t!=null?t:e,isJson:!1}}return{content:t!=null?t:String(e!=null?e:""),isJson:!1}}function Me(e,t,o){let n=Ot(e),r=0,a=n;if(o){let d=new RegExp(zt(o),"gi");a=n.replace(d,p=>(r+=1,`<mark class='apd-json-highlight'>${p}</mark>`))}return{html:t?It(a):a,matchCount:r}}function me(e,t,o=!0){let{content:n,isJson:r}=dt(e,t),a="",i=0,d="",p=s("pre",{class:"apd-json"}),u=s("input",{type:"text",placeholder:"Find in payload...",spellcheck:"false"}),l=s("span",{class:"apd-json-search-count"}),c=s("button",{type:"button",title:"Previous match (Shift+Enter)","aria-label":"Previous match"},["\u2191"]),f=s("button",{type:"button",title:"Next match (Enter)","aria-label":"Next match"},["\u2193"]),b=s("div",{class:"apd-json-search-nav"},[c,f]),v=document.createElementNS("http://www.w3.org/2000/svg","svg");v.setAttribute("viewBox","0 0 24 24"),v.setAttribute("fill","none"),v.setAttribute("stroke","currentColor"),v.setAttribute("stroke-width","2"),v.innerHTML='<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>';let R=s("div",{class:"apd-json-search"},[v,u,l,b]);function w(y,x){var E;y.forEach((j,q)=>j.classList.toggle("apd-active",q===i)),(E=y[i])==null||E.scrollIntoView({block:"center",behavior:"smooth"}),l.textContent=a?x>0?`${i+1} / ${x}`:"No matches":"",l.style.display=a?"":"none",b.style.display=a&&x>0?"":"none"}function k(){let y=a.trim(),{html:x,matchCount:E}=Me(n,r,y);p.innerHTML=x;let j=y!==d;d=y,(j||i>=E)&&(i=0);let q=Array.from(p.querySelectorAll("mark.apd-json-highlight"));w(q,E)}function L(y){let{matchCount:x}=Me(n,r,a.trim());if(x===0)return;i=(i+y+x)%x;let E=Array.from(p.querySelectorAll("mark.apd-json-highlight"));w(E,x)}u.addEventListener("input",()=>{a=u.value,k()}),u.addEventListener("keydown",y=>{y.key==="Enter"&&(y.preventDefault(),L(y.shiftKey?-1:1))}),c.addEventListener("click",()=>L(-1)),f.addEventListener("click",()=>L(1)),k();let g=o&&n.length>0;return{el:s("div",{},[g?R:null,p])}}function je(e,t){let o=s("button",{type:"button",class:"apd-action-btn"},[e]);return o.addEventListener("click",async()=>{if(await Xe(t())){let r=e;o.textContent="Copied",o.classList.add("apd-copied"),setTimeout(()=>{o.textContent=r,o.classList.remove("apd-copied")},1200)}}),o}function G(e,t,o,n){let r=o,a=s("span",{},[r?"\u2212":"+"]),i=`${e}${typeof t=="number"?` (${t})`:""}`,d=s("div",{class:"apd-section-header"},[s("span",{},[i]),a]),p=s("div",{class:"apd-section-body"},[n]);return p.style.display=r?"":"none",d.addEventListener("click",()=>{r=!r,p.style.display=r?"":"none",a.textContent=r?"\u2212":"+"}),s("div",{class:"apd-section"},[d,p])}function Pe(e){let t=Object.entries(e);if(t.length===0)return s("div",{class:"apd-empty-body"},["None"]);let o=s("div",{class:"apd-kv"});return t.forEach(([n,r])=>{o.appendChild(s("div",{class:"apd-kv-key"},[n])),o.appendChild(s("div",{class:"apd-kv-val"},[r]))}),o}function pt(e){let t=s("div",{class:"apd-detail"});function o(n){var l,c,f,b,v;if(K(t),!n){t.appendChild(s("div",{class:"apd-detail-empty"},["Select a request to see full details"]));return}let r=it(n),a=(c=(l=X(n.requestBody))!=null?l:n.requestBodyRaw)!=null?c:"",i=(b=(f=X(n.responseBody))!=null?f:n.responseBodyRaw)!=null?b:"",d=s("button",{type:"button",class:"apd-action-btn",title:n.pinned?"Unpin":"Pin this request"},[n.pinned?"\u2605 Pinned":"\u2606 Pin"]);d.addEventListener("click",()=>e(n.id)),t.appendChild(s("div",{class:"apd-detail-header"},[s("div",{class:"apd-detail-url"},[s("strong",{},[n.method]),` ${n.url}`]),d]));let p=s("div",{class:"apd-meta-grid"}),u=(R,w,k)=>s("div",{},[s("div",{class:"apd-meta-label"},[R]),s("div",{class:"apd-meta-value",style:k?`color:${k}`:void 0},[w])]);p.appendChild(u("Status",`${(v=n.responseStatus)!=null?v:"Failed"} ${n.responseStatusText}`,n.success?"var(--apd-success)":"var(--apd-error)")),p.appendChild(u("Duration",de(n.duration))),p.appendChild(u("Time",J(n.timestamp))),p.appendChild(u("Source",n.source)),p.appendChild(u("Req. size",Ce(n.requestSize))),p.appendChild(u("Res. size",Ce(n.responseSize))),t.appendChild(p),n.error&&t.appendChild(s("div",{class:"apd-section",style:"border-color: var(--apd-error)"},[s("div",{class:"apd-section-header",style:"color: var(--apd-error)"},["Error"]),s("div",{class:"apd-section-body"},[n.error])])),t.appendChild(s("div",{class:"apd-actions"},[je("Copy cURL",()=>r),je("Copy Request",()=>a),je("Copy Response",()=>i)])),t.appendChild(G("cURL",void 0,!0,me(r,null,!1).el)),t.appendChild(G("Query Params",Object.keys(n.queryParams).length,!1,Pe(n.queryParams))),t.appendChild(G("Request Headers",Object.keys(n.requestHeaders).length,!1,Pe(n.requestHeaders))),t.appendChild(G("Request Body",void 0,!0,n.requestBodyRaw?me(n.requestBody,n.requestBodyRaw).el:s("div",{class:"apd-empty-body"},["No body"]))),t.appendChild(G("Response Headers",Object.keys(n.responseHeaders).length,!1,Pe(n.responseHeaders))),t.appendChild(G("Response Body",void 0,!0,n.responseBodyRaw?me(n.responseBody,n.responseBodyRaw).el:s("div",{class:"apd-empty-body"},["No body"])))}return o(null),{el:t,setLog:o}}var Ut={log:"\u25B8",info:"\u2139",warn:"\u26A0",error:"\u2715",debug:"\u2699"};function Dt(e){var i,d;let t=!1,o=s("div",{class:"apd-console-stack"},[(i=e.stack)!=null?i:""]);o.style.display="none";let n=s("div",{class:"apd-console-meta"},[s("span",{},[J(e.timestamp)]),e.source!=="console"?s("span",{},[e.source]):null]);if(e.stack){let p=s("button",{type:"button",class:"apd-console-toggle-stack"},["Show stack trace"]);p.addEventListener("click",()=>{t=!t,p.textContent=t?"Hide stack trace":"Show stack trace",o.style.display=t?"":"none"}),n.appendChild(p)}let r=s("div",{class:"apd-console-body"},[s("div",{class:"apd-console-preview"},[e.preview||"(empty)"]),n,o]);return s("div",{class:`apd-console-item apd-console-${e.level}`},[s("span",{class:"apd-console-icon"},[(d=Ut[e.level])!=null?d:"\u25B8"]),r,e.count>1?s("span",{class:"apd-console-count"},[String(e.count)]):null])}function lt(){let e=s("div",{class:"apd-console-list"});function t(o){if(K(e),o.length===0){e.appendChild(s("div",{class:"apd-empty"},["Nothing logged yet.",s("br"),"console.log/warn/error and uncaught errors will show up here."]));return}for(let n of o)e.appendChild(Dt(n))}return{el:e,render:t}}var Be=["GET","POST","PUT","PATCH","DELETE"],$e=["log","info","warn","error","debug"];function ct(e){let t=s("input",{type:"text",placeholder:e}),o=document.createElementNS("http://www.w3.org/2000/svg","svg");return o.setAttribute("viewBox","0 0 24 24"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","2"),o.innerHTML='<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',{el:s("div",{class:"apd-search"},[o,t]),input:t}}function ut(e,t,o,n){let r="network",a={search:"",status:"all",methods:[]},i="",d=[],p=null,u=!1,l="dark",c=[],f=[],b=!1,v=at(m=>{p=m,z()},e),R=pt(e),w=lt(),k=s("span",{class:"apd-header-count"}),L=s("button",{class:"apd-icon-btn",title:"Toggle theme",type:"button"},["\u263E"]),g=ct("Filter by URL, endpoint, method or status code..."),T=s("button",{type:"button",class:"apd-chip apd-chip-success"},["Success"]),y=s("button",{type:"button",class:"apd-chip apd-chip-failed"},["Failed"]),x=Be.map(m=>s("button",{type:"button",class:"apd-chip"},[m]));T.addEventListener("click",()=>{a={...a,status:a.status==="success"?"all":"success"},z()}),y.addEventListener("click",()=>{a={...a,status:a.status==="failed"?"all":"failed"},z()}),x.forEach((m,S)=>{let h=Be[S];m.addEventListener("click",()=>{a={...a,methods:a.methods.includes(h)?a.methods.filter(H=>H!==h):[...a.methods,h]},z()})}),g.input.addEventListener("input",()=>{a={...a,search:g.input.value},z()});let E=s("div",{class:"apd-toolbar"},[g.el,T,y,...x]),j=s("div",{class:"apd-body"},[v.el,R.el]),q=ct("Filter console output..."),ge=$e.map(m=>s("button",{type:"button",class:"apd-chip"},[m]));ge.forEach((m,S)=>{let h=$e[S];m.addEventListener("click",()=>{d=d.includes(h)?d.filter(H=>H!==h):[...d,h],ae()})}),q.input.addEventListener("input",()=>{i=q.input.value,ae()});let se=s("div",{class:"apd-toolbar"},[q.el,...ge]);se.style.display="none",E.style.display="";let U=s("button",{type:"button",class:"apd-tab apd-active"},["Network"]),D=s("button",{type:"button",class:"apd-tab"},["Console"]),Ie=s("div",{class:"apd-tabs"},[U,D]);U.addEventListener("click",()=>De("network")),D.addEventListener("click",()=>De("console"));let Oe=s("div",{class:"apd-footer"},[s("span",{},[s("span",{class:"apd-kbd"},["Ctrl"]),"+",s("span",{class:"apd-kbd"},["Shift"]),"+",s("span",{class:"apd-kbd"},["D"])," to toggle \xB7 ",s("span",{class:"apd-kbd"},["Space"]),"+",s("span",{class:"apd-kbd"},["H"])," to hide"]),s("span",{style:"margin-left:auto"},["api-debugger \xB7 dev only"])]),ze=s("button",{class:"apd-icon-btn",title:"Close",type:"button"},["\u2715"]),he=s("button",{class:"apd-icon-btn",title:"Minimize",type:"button"},["\u2014"]),be=s("button",{class:"apd-icon-btn",title:"Clear logs",type:"button"},["\u{1F5D1}"]),xe=s("button",{class:"apd-icon-btn",title:"Export HAR",type:"button"},["HAR"]),ye=s("button",{class:"apd-icon-btn",title:"Export JSON",type:"button"},["\u2B73"]),gt=s("div",{class:"apd-header"},[s("div",{class:"apd-header-title"},[s("span",{class:"apd-live-dot"}),"API Debugger"]),k,s("div",{class:"apd-spacer"}),L,ye,xe,be,he,ze]),Ue=s("div",{},[j,w.el]);w.el.style.display="none";let ve=s("div",{class:"apd-modal"},[gt,Ie,E,se,Ue,Oe]);ve.addEventListener("click",m=>m.stopPropagation());let N=s("div",{class:"apd-overlay"},[ve]);N.addEventListener("click",()=>ke()),ze.addEventListener("click",()=>ke()),he.addEventListener("click",()=>{u=!u,ve.classList.toggle("apd-minimized",u),Ie.style.display=u?"none":"",E.style.display=u||r!=="network"?"none":"",se.style.display=u||r!=="console"?"none":"",Ue.style.display=u?"none":"",Oe.style.display=u?"none":"",he.textContent=u?"\u25A2":"\u2014"}),be.addEventListener("click",()=>r==="network"?t():o()),ye.addEventListener("click",()=>qe(`api-logs-${Date.now()}.json`,c)),xe.addEventListener("click",()=>qe(`api-logs-${Date.now()}.har`,st(c))),L.addEventListener("click",()=>{l=l==="light"?"dark":"light",L.textContent=l==="light"?"\u2600":"\u263E";let m=N.closest(".apd-root");m==null||m.classList.toggle("apd-light",l==="light")});function De(m){r=m,U.classList.toggle("apd-active",r==="network"),D.classList.toggle("apd-active",r==="console"),E.style.display=r==="network"?"":"none",se.style.display=r==="console"?"":"none",j.style.display=r==="network"?"":"none",w.el.style.display=r==="console"?"":"none",be.title=r==="network"?"Clear logs":"Clear console",ye.style.display=r==="network"?"":"none",xe.style.display=r==="network"?"":"none",we()}function we(){if(r==="network"){let h=c.filter(H=>!H.success).length;k.textContent=`${c.length} requests${h>0?` \xB7 ${h} failed`:""}`}else{let h=f.filter(H=>H.level==="error").length;k.textContent=`${f.length} logs${h>0?` \xB7 ${h} errors`:""}`}let m=c.length>0?s("span",{class:`apd-tab-badge${c.some(h=>!h.success)?" apd-tab-badge-error":""}`},[String(c.length)]):null,S=f.length>0?s("span",{class:`apd-tab-badge${f.some(h=>h.level==="error")?" apd-tab-badge-error":""}`},[String(f.length)]):null;U.textContent="Network",m&&U.appendChild(m),D.textContent="Console",S&&D.appendChild(S),U.classList.toggle("apd-active",r==="network"),D.classList.toggle("apd-active",r==="console")}function z(){var H,Ne;let m=a.search.trim().toLowerCase(),S=c.filter(A=>{var ie;return!(a.status==="success"&&!A.success||a.status==="failed"&&A.success||a.methods.length>0&&!a.methods.includes(A.method)||m&&!`${A.url} ${A.endpoint} ${A.method} ${(ie=A.responseStatus)!=null?ie:""}`.toLowerCase().includes(m))});!p&&S.length>0&&(p=S[0].id);let h=(Ne=(H=S.find(A=>A.id===p))!=null?H:S[0])!=null?Ne:null;h&&(p=h.id),v.render(S,p),R.setLog(h),T.classList.toggle("apd-active",a.status==="success"),y.classList.toggle("apd-active",a.status==="failed"),x.forEach((A,ie)=>A.classList.toggle("apd-active",a.methods.includes(Be[ie]))),we()}function ae(){let m=i.trim().toLowerCase(),S=f.filter(h=>!(d.length>0&&!d.includes(h.level)||m&&!h.preview.toLowerCase().includes(m)));w.render(S),ge.forEach((h,H)=>h.classList.toggle("apd-active",d.includes($e[H]))),we()}function ht(m){c=m,b&&z()}function bt(m){f=m,b&&ae()}function xt(){b=!0,N.style.display="",z(),ae(),n==null||n(!0)}function ke(){b=!1,N.style.display="none",n==null||n(!1)}return N.style.display="none",{el:N,open:xt,close:ke,update:ht,updateConsole:bt,isOpen:()=>b}}var ft="next-api-debugger-styles";function Nt(){if(typeof document=="undefined"||document.getElementById(ft))return;let e=document.createElement("style");e.id=ft,e.textContent=Ze,document.head.appendChild(e)}function mt(e={}){Nt();let t=s("div",{class:"apd-root"});document.body.appendChild(t);let o=ot(()=>{o.el.style.display="none",n.open()},e.initialPosition),n=ut(l=>C.togglePin(l),()=>C.clear(),()=>M.clear(),l=>{o.el.style.display=l?"none":""});t.appendChild(o.el),t.appendChild(n.el);function r(){let l=C.getLogs(),c=M.getEntries();n.update(l),n.updateConsole(c);let f=l.some(b=>!b.success)||c.some(b=>b.level==="error");o.setCount(l.length+c.length,f)}let a=C.subscribe(r),i=M.subscribe(r);r();function d(l){(l.ctrlKey||l.metaKey)&&l.shiftKey&&l.key.toLowerCase()==="d"&&(l.preventDefault(),n.isOpen()?n.close():n.open())}e.keyboardShortcut!==!1&&window.addEventListener("keydown",d);let p=!1,u=e.keyboardShortcut!==!1?et(["space","h"],()=>{p=!p,p&&n.close(),t.style.display=p?"none":""}):()=>{};return{destroy(){a(),i(),window.removeEventListener("keydown",d),u(),t.remove()}}}var Y=null;function re(e={}){var r,a;if(typeof window=="undefined")return{destroy:()=>{}};if(Y&&(Y.destroy(),Y=null),e.enabled===!1)return{destroy:()=>{}};C.setMaxLogs((r=e.maxLogs)!=null?r:200),M.setMaxEntries((a=e.maxConsoleEntries)!=null?a:500),Je({ignoreUrls:e.ignoreUrls}),e.captureXhr!==!1&&_e({ignoreUrls:e.ignoreUrls}),e.captureConsole!==!1&&Ye();let t=e.axiosInstance?Ke(e.axiosInstance,{ignoreUrls:e.ignoreUrls}):()=>{},o=mt({initialPosition:e.initialPosition,keyboardShortcut:e.keyboardShortcut}),n={destroy(){Fe(),Ve(),Qe(),t(),o.destroy(),Y===n&&(Y=null)}};return Y=n,n}if(typeof document!="undefined"){let e=document.currentScript;e!=null&&e.hasAttribute("data-manual-init")||(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>re()):re())}typeof window!="undefined"&&(window.ApiDebugger=Object.assign(window.ApiDebugger||{},{init:re}));var Xt={init:re};0&&(module.exports={initApiDebugger});
//# sourceMappingURL=standalone.js.map