'use client';
"use strict";var Re=Object.defineProperty;var xt=Object.getOwnPropertyDescriptor;var vt=Object.getOwnPropertyNames;var yt=Object.prototype.hasOwnProperty;var wt=(e,t)=>{for(var o in t)Re(e,o,{get:t[o],enumerable:!0})},kt=(e,t,o,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of vt(t))!yt.call(e,n)&&n!==o&&Re(e,n,{get:()=>t[n],enumerable:!(r=xt(t,n))||r.enumerable});return e};var St=e=>kt(Re({},"__esModule",{value:!0}),e);var Ft={};wt(Ft,{ApiDebugger:()=>ht,exportAsHar:()=>Le,generateCurl:()=>Se,installAxiosInterceptor:()=>he,installFetchInterceptor:()=>fe,logStore:()=>k,uninstallFetchInterceptor:()=>me});module.exports=St(Ft);var de=require("react");var Ce=class{constructor(){this.logs=[];this.listeners=new Set;this.maxLogs=200;this.snapshot=[];this.getLogs=()=>(this.snapshot=this.logs,this.snapshot);this.subscribe=t=>(this.listeners.add(t),()=>this.listeners.delete(t))}setMaxLogs(t){this.maxLogs=Math.max(1,t),this.trim()}addLog(t){this.logs=[t,...this.logs],this.trim(),this.emit()}togglePin(t){this.logs=this.logs.map(o=>o.id===t?{...o,pinned:!o.pinned}:o),this.emit()}clear(){this.logs=[],this.emit()}trim(){if(this.logs.length<=this.maxLogs)return;let t=this.logs.filter(a=>a.pinned),r=this.logs.filter(a=>!a.pinned).slice(0,Math.max(0,this.maxLogs-t.length)),n=[...t,...r];n.sort((a,s)=>s.timestamp-a.timestamp),this.logs=n}emit(){this.listeners.forEach(t=>t())}},k=new Ce;var Pe=class{constructor(){this.entries=[];this.listeners=new Set;this.maxEntries=500;this.getEntries=()=>this.entries;this.subscribe=t=>(this.listeners.add(t),()=>this.listeners.delete(t))}setMaxEntries(t){this.maxEntries=Math.max(1,t),this.trim()}addEntry(t){let o=this.entries[0];o&&o.level===t.level&&o.preview===t.preview&&o.stack===t.stack?this.entries=[{...o,count:o.count+1,timestamp:t.timestamp},...this.entries.slice(1)]:this.entries=[t,...this.entries],this.trim(),this.emit()}clear(){this.entries=[],this.emit()}trim(){this.entries.length>this.maxEntries&&(this.entries=this.entries.slice(0,this.maxEntries))}emit(){this.listeners.forEach(t=>t())}},A=new Pe;var j="x-apd-skip";function D(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,9)}`}function O(e){if(!e)return null;try{return JSON.parse(e)}catch{return e}}function K(e){if(e==null)return null;if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return String(e)}}function z(e){if(!e)return 0;try{return new Blob([e]).size}catch{return e.length}}function Ne(e){if(!e)return"0 B";let t=["B","KB","MB","GB"],o=Math.min(t.length-1,Math.floor(Math.log(e)/Math.log(1024))),r=e/Math.pow(1024,o);return`${o===0?r:r.toFixed(1)} ${t[o]}`}function le(e){return e<1e3?`${e} ms`:`${(e/1e3).toFixed(2)} s`}function Y(e){let t=new Date(e);return t.toLocaleTimeString(void 0,{hour12:!1})+`.${String(t.getMilliseconds()).padStart(3,"0")}`}function W(e){try{let t=typeof window!="undefined"?window.location.origin:"http://localhost",o=new URL(e,t),r={};return o.searchParams.forEach((n,a)=>{r[a]=n}),{endpoint:o.pathname,queryParams:r}}catch{return{endpoint:e,queryParams:{}}}}function ce(e){let t={};return e&&e.forEach((o,r)=>{t[r]=o}),t}function oe(e){let t={};if(!e)return t;if(typeof e.toJSON=="function")return{...e.toJSON()};if(e instanceof Headers)return ce(e);if(typeof e=="object")for(let[o,r]of Object.entries(e))r!=null&&(t[o]=String(r));return t}function G(e,t){return!t||t.length===0?!1:t.some(o=>o instanceof RegExp?o.test(e):e.includes(o))}function w(...e){return e.filter(Boolean).join(" ")}async function Oe(e){try{if(navigator.clipboard&&window.isSecureContext)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select();let o=document.execCommand("copy");return document.body.removeChild(t),o}catch{return!1}}var I=null,ue=!1;function Et(e){if(e==null)return null;if(typeof e=="string")return e;if(e instanceof URLSearchParams)return e.toString();if(e instanceof FormData){let t=[];return e.forEach((o,r)=>{t.push(`${r}=${o instanceof File?`[File: ${o.name}]`:o}`)}),t.join("&")}return"[binary data]"}function fe(e={}){ue||typeof window=="undefined"||typeof window.fetch!="function"||(I=window.fetch.bind(window),ue=!0,window.fetch=async function(o,r){var E,x,y,M,L;let n=o instanceof Request?o:null,a=n?n.url:String(o);if(G(a,e.ignoreUrls))return I(o,r);let s=ce(new Headers((x=(E=r==null?void 0:r.headers)!=null?E:n==null?void 0:n.headers)!=null?x:void 0));if(s[j]){let m=new Headers((M=(y=r==null?void 0:r.headers)!=null?y:n==null?void 0:n.headers)!=null?M:void 0);return m.delete(j),n?I(new Request(n,{headers:m})):I(o,{...r,headers:m})}let l=Date.now(),c=performance.now(),h=((r==null?void 0:r.method)||(n==null?void 0:n.method)||"GET").toUpperCase(),{endpoint:p,queryParams:f}=W(a),v=Et((L=r==null?void 0:r.body)!=null?L:null),b={id:D(),url:a,endpoint:p,method:h,requestHeaders:s,requestBody:O(v),requestBodyRaw:v,queryParams:f,timestamp:l,source:"fetch",requestSize:z(v),pinned:!1};try{let m=await I(o,r),R=Math.round(performance.now()-c),C=m.clone(),N=null;try{N=await C.text()}catch{N=null}return k.addLog({...b,duration:R,responseStatus:m.status,responseStatusText:m.statusText,responseHeaders:ce(m.headers),responseBody:O(N),responseBodyRaw:N,responseSize:z(N),success:m.ok,error:m.ok?null:`HTTP ${m.status} ${m.statusText}`}),m}catch(m){let R=Math.round(performance.now()-c);throw k.addLog({...b,duration:R,responseStatus:null,responseStatusText:"",responseHeaders:{},responseBody:null,responseBodyRaw:null,responseSize:0,success:!1,error:(m==null?void 0:m.message)||"Network error"}),m}})}function me(){ue&&I&&typeof window!="undefined"&&(window.fetch=I),ue=!1,I=null}var re=null,Z=null,ne=null,ge=!1,Q=Symbol("apd-xhr-meta");function Lt(e){let t={};return e.trim().split(/[\r\n]+/).forEach(o=>{let r=o.indexOf(":");if(r===-1)return;let n=o.slice(0,r).trim().toLowerCase(),a=o.slice(r+1).trim();n&&(t[n]=a)}),t}function Ie(e={}){ge||typeof window=="undefined"||typeof XMLHttpRequest=="undefined"||(re=XMLHttpRequest.prototype.open,Z=XMLHttpRequest.prototype.send,ne=XMLHttpRequest.prototype.setRequestHeader,ge=!0,XMLHttpRequest.prototype.open=function(o,r,...n){let a=String(r);return this[Q]={id:D(),method:(o||"GET").toUpperCase(),url:a,startTime:0,startPerf:0,requestHeaders:{},ignored:G(a,e.ignoreUrls)},re.apply(this,[o,r,...n])},XMLHttpRequest.prototype.setRequestHeader=function(o,r){if(o.toLowerCase()===j){this[Q]&&(this[Q].ignored=!0);return}return this[Q]&&(this[Q].requestHeaders[o]=r),ne.apply(this,[o,r])},XMLHttpRequest.prototype.send=function(o){let r=this[Q];if(!r||r.ignored)return Z.apply(this,[o]);r.startTime=Date.now(),r.startPerf=performance.now();let n=o==null?null:typeof o=="string"?o:o instanceof URLSearchParams?o.toString():o instanceof FormData?"[form data]":"[binary data]",a=()=>{let s=Math.round(performance.now()-r.startPerf),{endpoint:l,queryParams:c}=W(r.url),h=Lt(this.getAllResponseHeaders()||""),p=null;try{p=typeof this.responseText=="string"?this.responseText:null}catch{p=null}let f=this.status,v=f>=200&&f<400,b={id:r.id,url:r.url,endpoint:l,method:r.method,requestHeaders:r.requestHeaders,requestBody:O(n),requestBodyRaw:n,queryParams:c,responseStatus:f||null,responseStatusText:this.statusText||"",responseHeaders:h,responseBody:O(p),responseBodyRaw:p,duration:s,timestamp:r.startTime,success:v,error:v?null:f===0?"Network error":`HTTP ${f} ${this.statusText}`,source:"xhr",requestSize:z(n),responseSize:z(p),pinned:!1};k.addLog(b),this.removeEventListener("loadend",a)};return this.addEventListener("loadend",a),Z.apply(this,[o])})}function $e(){ge&&typeof window!="undefined"&&typeof XMLHttpRequest!="undefined"&&(re&&(XMLHttpRequest.prototype.open=re),Z&&(XMLHttpRequest.prototype.send=Z),ne&&(XMLHttpRequest.prototype.setRequestHeader=ne)),ge=!1,re=null,Z=null,ne=null}function Rt(e){let t=(e==null?void 0:e.baseURL)||"",o=(e==null?void 0:e.url)||"",r=/^https?:\/\//i.test(o)?o:`${t}${t&&!t.endsWith("/")&&!o.startsWith("/")?"/":""}${o}`;if(e!=null&&e.params&&typeof e.params=="object"){let n=Ct(e.params);n&&(r+=(r.includes("?")?"&":"?")+n)}return r}function Ct(e){let t=new URLSearchParams;for(let[o,r]of Object.entries(e))r!=null&&(Array.isArray(r)?r.forEach(n=>t.append(o,String(n))):t.append(o,String(r)));return t.toString()}function Ue(e){if(e==null)return null;if(typeof e=="string")return e;if(typeof URLSearchParams!="undefined"&&e instanceof URLSearchParams)return e.toString();if(typeof FormData!="undefined"&&e instanceof FormData){let t=[];return e.forEach((o,r)=>{t.push(`${r}=${o instanceof File?`[File: ${o.name}]`:o}`)}),t.join("&")}return K(e)}function he(e,t={}){var a;if(!e||!e.interceptors||typeof((a=e.interceptors.request)==null?void 0:a.use)!="function")return()=>{};if(e.__apiDebuggerInstalled)return()=>{};e.__apiDebuggerInstalled=!0;let o=e.interceptors.request.use(s=>{let l={id:D(),startTime:Date.now(),startPerf:performance.now(),requestBodyRaw:Ue(s.data),requestHeadersSnapshot:oe(s.headers)};return s.__apdMeta=l,s.headers&&typeof s.headers.set=="function"?s.headers.set(j,"1"):s.headers={...s.headers||{},[j]:"1"},s});function r(s,l,c){var R,C,N,J,_,pe;if(!s)return;let h=Rt(s);if(G(h,t.ignoreUrls))return;let p=s.__apdMeta||{id:D(),startTime:Date.now(),startPerf:performance.now(),requestBodyRaw:Ue(s.data),requestHeadersSnapshot:oe(s.headers)},f=Math.round(performance.now()-p.startPerf),{endpoint:v,queryParams:b}=W(h),E=oe(s.headers),x=Object.keys(E).length>0?E:p.requestHeadersSnapshot;delete x[j];let y=p.requestBodyRaw,M=(l==null?void 0:l.data)!==void 0?K(l.data):null,L=(N=(C=l==null?void 0:l.status)!=null?C:(R=c==null?void 0:c.response)==null?void 0:R.status)!=null?N:null,m={id:p.id,url:h,endpoint:v,method:(s.method||"get").toUpperCase(),requestHeaders:x,requestBody:(J=O(y))!=null?J:y,requestBodyRaw:y,queryParams:b,responseStatus:L,responseStatusText:(_=l==null?void 0:l.statusText)!=null?_:"",responseHeaders:oe(l==null?void 0:l.headers),responseBody:(pe=l==null?void 0:l.data)!=null?pe:null,responseBodyRaw:M,duration:f,timestamp:p.startTime,success:!c&&!!L&&L<400,error:c?c.message||"Request failed":null,source:"axios",requestSize:z(y),responseSize:z(M),pinned:!1};k.addLog(m)}let n=e.interceptors.response.use(s=>(r(s.config,s),s),s=>(r(s==null?void 0:s.config,s==null?void 0:s.response,s),Promise.reject(s)));return()=>{e.interceptors.request.eject(o),e.interceptors.response.eject(n),e.__apiDebuggerInstalled=!1}}var Fe=["log","info","warn","error","debug"],He={},ae=null,se=null,qe=!1;function Pt(e,t=new WeakSet){var o;if(e===null)return"null";if(e===void 0)return"undefined";if(typeof e=="string")return e;if(typeof e=="number"||typeof e=="boolean")return String(e);if(e instanceof Error)return`${e.name}: ${e.message}`;if(typeof e=="function")return e.name?`\u0192 ${e.name}()`:"\u0192 ()";if(typeof e=="object"){if(t.has(e))return"[Circular]";t.add(e);try{return(o=JSON.stringify(e,(r,n)=>typeof n=="bigint"?n.toString():n,2))!=null?o:String(e)}catch{return Array.isArray(e)?"[Array]":"[Object]"}}return String(e)}function Nt(e){for(let t of e)if(t instanceof Error&&t.stack)return t.stack;return null}function Te(e,t,o){let r=t.map(n=>Pt(n));return{id:D(),level:e,parts:r,preview:r.join(" "),stack:Nt(t),timestamp:Date.now(),source:o,count:1}}function Xe(e={}){var o,r;if(qe||typeof window=="undefined"||typeof console=="undefined")return;qe=!0;let t=(o=e.levels)!=null?o:Fe;for(let n of t){let a=(r=console[n])==null?void 0:r.bind(console);a&&(He[n]=a,console[n]=(...s)=>{A.addEntry(Te(n,s,"console")),a(...s)})}ae=n=>{let a=n.error?[n.error]:[n.message],s=Te("error",a,"window.onerror");A.addEntry({...s,preview:s.preview||`${n.message} (${n.filename}:${n.lineno}:${n.colno})`})},window.addEventListener("error",ae),se=n=>{let a=n.reason,s=Te("error",[a],"unhandledrejection");A.addEntry({...s,preview:`Unhandled promise rejection: ${s.preview}`})},window.addEventListener("unhandledrejection",se)}function Je(){if(typeof console!="undefined")for(let e of Fe){let t=He[e];t&&(console[e]=t)}typeof window!="undefined"&&(ae&&window.removeEventListener("error",ae),se&&window.removeEventListener("unhandledrejection",se)),He={},ae=null,se=null,qe=!1}var ie=require("react");function _e(){let e=(0,ie.useSyncExternalStore)(k.subscribe,k.getLogs,k.getLogs),t=(0,ie.useCallback)(()=>k.clear(),[]),o=(0,ie.useCallback)(r=>k.togglePin(r),[]);return{logs:e,clear:t,togglePin:o}}var be=require("react");function Ve(){let e=(0,be.useSyncExternalStore)(A.subscribe,A.getEntries,A.getEntries),t=(0,be.useCallback)(()=>A.clear(),[]);return{entries:e,clear:t}}var Ke=require("react");function Ye(e,t,o=!0){(0,Ke.useEffect)(()=>{if(!o||typeof window=="undefined")return;function r(n){let a=!e.ctrl||n.ctrlKey||n.metaKey,s=!e.shift||n.shiftKey;a&&s&&n.key.toLowerCase()===e.key.toLowerCase()&&(n.preventDefault(),t())}return window.addEventListener("keydown",r),()=>window.removeEventListener("keydown",r)},[e.ctrl,e.shift,e.key,t,o])}var Qe=require("react");var We=`
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
`;var Ge="next-api-debugger-styles";function Ze(){return(0,Qe.useEffect)(()=>{if(typeof document=="undefined"||document.getElementById(Ge))return;let e=document.createElement("style");e.id=Ge,e.textContent=We,document.head.appendChild(e)},[]),null}var P=require("react"),et="apd-button-position",ve=56,tt=5;function xe(e){return typeof window=="undefined"?e:{x:Math.min(Math.max(8,e.x),window.innerWidth-ve-8),y:Math.min(Math.max(8,e.y),window.innerHeight-ve-8)}}function Tt(){return typeof window=="undefined"?{x:24,y:24}:{x:window.innerWidth-ve-24,y:window.innerHeight-ve-24}}function ot(e){let[t,o]=(0,P.useState)(()=>{if(typeof window=="undefined")return e!=null?e:{x:24,y:24};try{let p=sessionStorage.getItem(et);if(p)return xe(JSON.parse(p))}catch{}return xe(e!=null?e:Tt())}),r=(0,P.useRef)(!1),n=(0,P.useRef)(!1),a=(0,P.useRef)({pointerX:0,pointerY:0,posX:0,posY:0}),s=(0,P.useCallback)(p=>{r.current=!0,n.current=!1,a.current={pointerX:p.clientX,pointerY:p.clientY,posX:t.x,posY:t.y},p.currentTarget.setPointerCapture(p.pointerId)},[t.x,t.y]),l=(0,P.useCallback)(p=>{if(!r.current)return;let f=p.clientX-a.current.pointerX,v=p.clientY-a.current.pointerY;(Math.abs(f)>tt||Math.abs(v)>tt)&&(n.current=!0),o(xe({x:a.current.posX+f,y:a.current.posY+v}))},[]),c=(0,P.useCallback)(()=>{r.current=!1},[]);(0,P.useEffect)(()=>{try{sessionStorage.setItem(et,JSON.stringify(t))}catch{}},[t]),(0,P.useEffect)(()=>{function p(){o(f=>xe(f))}return window.addEventListener("resize",p),()=>window.removeEventListener("resize",p)},[]);let h=(0,P.useCallback)(()=>n.current,[]);return{position:t,onPointerDown:s,onPointerMove:l,onPointerUp:c,wasDragged:h}}var U=require("react/jsx-runtime");function rt({count:e,hasErrors:t,onOpen:o,initialPosition:r}){let{position:n,onPointerDown:a,onPointerMove:s,onPointerUp:l,wasDragged:c}=ot(r);return(0,U.jsxs)("button",{type:"button",className:"apd-btn",style:{left:n.x,top:n.y},onPointerDown:a,onPointerMove:s,onPointerUp:l,onClick:()=>{c()||o()},"aria-label":"Open API debugger",title:"API Debugger (drag to move)",children:[(0,U.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,U.jsx)("polyline",{points:"16 18 22 12 16 6"}),(0,U.jsx)("polyline",{points:"8 6 2 12 8 18"})]}),e>0&&(0,U.jsx)("span",{className:w("apd-btn-dot",t&&"apd-has-errors"),children:e>99?"99+":e})]})}var q=require("react");var F=require("react/jsx-runtime");function Me({value:e,onChange:t}){return(0,F.jsxs)("div",{className:"apd-search",children:[(0,F.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,F.jsx)("circle",{cx:"11",cy:"11",r:"7"}),(0,F.jsx)("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]}),(0,F.jsx)("input",{type:"text",placeholder:"Filter by URL, endpoint, method or status code...",value:e,onChange:o=>t(o.target.value),spellCheck:!1})]})}var $=require("react/jsx-runtime");function nt({status:e,onStatusChange:t,methods:o,activeMethods:r,onToggleMethod:n}){return(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)("button",{type:"button",className:w("apd-chip apd-chip-success",e==="success"&&"apd-active"),onClick:()=>t(e==="success"?"all":"success"),children:"Success"}),(0,$.jsx)("button",{type:"button",className:w("apd-chip apd-chip-failed",e==="failed"&&"apd-active"),onClick:()=>t(e==="failed"?"all":"failed"),children:"Failed"}),o.map(a=>(0,$.jsx)("button",{type:"button",className:w("apd-chip",r.includes(a)&&"apd-active"),onClick:()=>n(a),children:a},a))]})}var T=require("react/jsx-runtime");function Ht(e){return["GET","POST","PUT","PATCH","DELETE"].includes(e.toUpperCase())?`apd-method-${e.toUpperCase()}`:"apd-method-OTHER"}function at({log:e,selected:t,onSelect:o,onTogglePin:r}){var n;return(0,T.jsxs)("div",{className:w("apd-item",t&&"apd-selected"),onClick:o,role:"button",tabIndex:0,onKeyDown:a=>a.key==="Enter"&&o(),children:[(0,T.jsxs)("div",{className:"apd-item-row1",children:[(0,T.jsx)("span",{className:w("apd-method",Ht(e.method)),children:e.method}),(0,T.jsx)("span",{className:"apd-item-url",title:e.url,children:e.endpoint}),(0,T.jsx)("span",{className:w("apd-status-dot",e.success?"apd-ok":"apd-fail")}),e.pinned&&(0,T.jsx)("button",{type:"button",className:"apd-pin-star",onClick:a=>{a.stopPropagation(),r()},title:"Unpin","aria-label":"Unpin request",style:{background:"none",border:"none",cursor:"pointer",padding:0},children:"\u2605"})]}),(0,T.jsxs)("div",{className:"apd-item-row2",children:[(0,T.jsx)("span",{children:(n=e.responseStatus)!=null?n:e.error?"ERR":"\u2014"}),(0,T.jsx)("span",{children:le(e.duration)}),(0,T.jsx)("span",{children:Y(e.timestamp)}),(0,T.jsx)("span",{style:{marginLeft:"auto",textTransform:"uppercase"},children:e.source})]})]})}var X=require("react/jsx-runtime");function st({logs:e,selectedId:t,onSelect:o,onTogglePin:r}){return e.length===0?(0,X.jsx)("div",{className:"apd-list",children:(0,X.jsxs)("div",{className:"apd-empty",children:["No requests captured yet.",(0,X.jsx)("br",{}),"Make an API call and it'll show up here."]})}):(0,X.jsx)("div",{className:"apd-list",children:e.map(n=>(0,X.jsx)(at,{log:n,selected:n.id===t,onSelect:()=>o(n.id),onTogglePin:()=>r(n.id)},n.id))})}var Ee=require("react");var it=require("react");var dt=require("react/jsx-runtime");function ye({getText:e,label:t,icon:o}){let[r,n]=(0,it.useState)(!1);async function a(){await Oe(e())&&(n(!0),setTimeout(()=>n(!1),1200))}return(0,dt.jsxs)("button",{type:"button",className:w("apd-action-btn",r&&"apd-copied"),onClick:a,children:[o,r?"Copied":t]})}var B=require("react");var qt=/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(\.\d+)?([eE][+-]?\d+)?)/g;function Mt(e){return e.replace(qt,t=>{let o="apd-json-num";return/^"/.test(t)?o=/:$/.test(t)?"apd-json-key":"apd-json-str":/true|false/.test(t)?o="apd-json-bool":/null/.test(t)&&(o="apd-json-null"),`<span class="${o}">${t}</span>`})}function At(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Bt(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function pt(e,t){if(e!=null&&typeof e=="object")return{content:JSON.stringify(e,null,2),isJson:!0};if(typeof e=="string")try{return{content:JSON.stringify(JSON.parse(e),null,2),isJson:!0}}catch{return{content:t!=null?t:e,isJson:!1}}return{content:t!=null?t:String(e!=null?e:""),isJson:!1}}function lt(e,t,o){let r=At(e),n=0,a=r;if(o){let l=new RegExp(Bt(o),"gi");a=r.replace(l,c=>(n+=1,`<mark class='apd-json-highlight'>${c}</mark>`))}return{html:t?Mt(a):a,matchCount:n}}var H=require("react/jsx-runtime");function we({value:e,raw:t,searchable:o=!0}){let[r,n]=(0,B.useState)(""),[a,s]=(0,B.useState)(0),l=(0,B.useRef)(null),c=(0,B.useRef)(""),{content:h,isJson:p}=pt(e,t),f=r.trim(),{html:v,matchCount:b}=(0,B.useMemo)(()=>lt(h,p,f),[h,p,f]);(0,B.useEffect)(()=>{let x=f!==c.current;c.current=f,(x||a>=b)&&s(0)},[f,b]),(0,B.useEffect)(()=>{var y;if(!l.current)return;let x=l.current.querySelectorAll("mark.apd-json-highlight");x.forEach((M,L)=>M.classList.toggle("apd-active",L===a)),(y=x[a])==null||y.scrollIntoView({block:"center",behavior:"smooth"})},[v,a]);function E(x){b!==0&&s(y=>(y+x+b)%b)}return(0,H.jsxs)("div",{children:[o&&h.length>0&&(0,H.jsxs)("div",{className:"apd-json-search",children:[(0,H.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,H.jsx)("circle",{cx:"11",cy:"11",r:"7"}),(0,H.jsx)("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]}),(0,H.jsx)("input",{type:"text",placeholder:"Find in payload...",value:r,onChange:x=>n(x.target.value),onKeyDown:x=>{x.key==="Enter"&&(x.preventDefault(),E(x.shiftKey?-1:1))},spellCheck:!1}),r&&(0,H.jsx)("span",{className:"apd-json-search-count",children:b>0?`${a+1} / ${b}`:"No matches"}),r&&b>0&&(0,H.jsxs)("div",{className:"apd-json-search-nav",children:[(0,H.jsx)("button",{type:"button",onClick:()=>E(-1),"aria-label":"Previous match",title:"Previous match (Shift+Enter)",children:"\u2191"}),(0,H.jsx)("button",{type:"button",onClick:()=>E(1),"aria-label":"Next match",title:"Next match (Enter)",children:"\u2193"})]})]}),(0,H.jsx)("pre",{ref:l,className:"apd-json",dangerouslySetInnerHTML:{__html:v}})]})}function ke(e){return`'${e.replace(/'/g,"'\\''")}'`}function jt(e){let t=e.trim();if(!t||!(t.startsWith("{")||t.startsWith("[")))return!1;try{return JSON.parse(t),!0}catch{return!1}}function Se(e){let t=[`curl -X ${e.method} ${ke(e.url)}`],o=Object.keys(e.requestHeaders).some(r=>r.toLowerCase()==="content-type");for(let[r,n]of Object.entries(e.requestHeaders))/^(host|content-length|connection)$/i.test(r)||t.push(`  -H ${ke(`${r}: ${n}`)}`);return e.requestBodyRaw&&(!o&&jt(e.requestBodyRaw)&&t.push(`  -H ${ke("Content-Type: application/json")}`),t.push(`  --data-raw ${ke(e.requestBodyRaw)}`)),t.join(` \\
`)}var i=require("react/jsx-runtime");function ee({title:e,count:t,defaultOpen:o=!0,children:r}){let[n,a]=(0,Ee.useState)(o);return(0,i.jsxs)("div",{className:"apd-section",children:[(0,i.jsxs)("div",{className:"apd-section-header",onClick:()=>a(s=>!s),children:[(0,i.jsxs)("span",{children:[e,typeof t=="number"?` (${t})`:""]}),(0,i.jsx)("span",{children:n?"\u2212":"+"})]}),n&&(0,i.jsx)("div",{className:"apd-section-body",children:r})]})}function Ae({data:e}){let t=Object.entries(e);return t.length===0?(0,i.jsx)("div",{className:"apd-section-body apd-empty-body",children:"None"}):(0,i.jsx)("div",{className:"apd-kv",children:t.map(([o,r])=>(0,i.jsxs)(Ee.Fragment,{children:[(0,i.jsx)("div",{className:"apd-kv-key",children:o}),(0,i.jsx)("div",{className:"apd-kv-val",children:r})]},o))})}function ct({log:e,onTogglePin:t}){var a,s,l,c,h;if(!e)return(0,i.jsx)("div",{className:"apd-detail",children:(0,i.jsx)("div",{className:"apd-detail-empty",children:"Select a request to see full details"})});let o=Se(e),r=(s=(a=K(e.requestBody))!=null?a:e.requestBodyRaw)!=null?s:"",n=(c=(l=K(e.responseBody))!=null?l:e.responseBodyRaw)!=null?c:"";return(0,i.jsxs)("div",{className:"apd-detail",children:[(0,i.jsxs)("div",{className:"apd-detail-header",children:[(0,i.jsxs)("div",{className:"apd-detail-url",children:[(0,i.jsx)("strong",{children:e.method})," ",e.url]}),(0,i.jsx)("button",{type:"button",className:"apd-action-btn",onClick:()=>t(e.id),title:e.pinned?"Unpin":"Pin this request",children:e.pinned?"\u2605 Pinned":"\u2606 Pin"})]}),(0,i.jsxs)("div",{className:"apd-meta-grid",children:[(0,i.jsxs)("div",{children:[(0,i.jsx)("div",{className:"apd-meta-label",children:"Status"}),(0,i.jsxs)("div",{className:"apd-meta-value",style:{color:e.success?"var(--apd-success)":"var(--apd-error)"},children:[(h=e.responseStatus)!=null?h:"Failed"," ",e.responseStatusText]})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)("div",{className:"apd-meta-label",children:"Duration"}),(0,i.jsx)("div",{className:"apd-meta-value",children:le(e.duration)})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)("div",{className:"apd-meta-label",children:"Time"}),(0,i.jsx)("div",{className:"apd-meta-value",children:Y(e.timestamp)})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)("div",{className:"apd-meta-label",children:"Source"}),(0,i.jsx)("div",{className:"apd-meta-value",children:e.source})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)("div",{className:"apd-meta-label",children:"Req. size"}),(0,i.jsx)("div",{className:"apd-meta-value",children:Ne(e.requestSize)})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)("div",{className:"apd-meta-label",children:"Res. size"}),(0,i.jsx)("div",{className:"apd-meta-value",children:Ne(e.responseSize)})]})]}),e.error&&(0,i.jsxs)("div",{className:"apd-section",style:{borderColor:"var(--apd-error)"},children:[(0,i.jsx)("div",{className:"apd-section-header",style:{color:"var(--apd-error)"},children:"Error"}),(0,i.jsx)("div",{className:"apd-section-body",children:e.error})]}),(0,i.jsxs)("div",{className:"apd-actions",children:[(0,i.jsx)(ye,{label:"Copy cURL",getText:()=>o}),(0,i.jsx)(ye,{label:"Copy Request",getText:()=>r}),(0,i.jsx)(ye,{label:"Copy Response",getText:()=>n})]}),(0,i.jsx)(ee,{title:"cURL",children:(0,i.jsx)(we,{value:o,searchable:!1})}),(0,i.jsx)(ee,{title:"Query Params",count:Object.keys(e.queryParams).length,defaultOpen:!1,children:(0,i.jsx)(Ae,{data:e.queryParams})}),(0,i.jsx)(ee,{title:"Request Headers",count:Object.keys(e.requestHeaders).length,defaultOpen:!1,children:(0,i.jsx)(Ae,{data:e.requestHeaders})}),(0,i.jsx)(ee,{title:"Request Body",children:e.requestBodyRaw?(0,i.jsx)(we,{value:e.requestBody,raw:e.requestBodyRaw}):(0,i.jsx)("div",{className:"apd-empty-body",children:"No body"})}),(0,i.jsx)(ee,{title:"Response Headers",count:Object.keys(e.responseHeaders).length,defaultOpen:!1,children:(0,i.jsx)(Ae,{data:e.responseHeaders})}),(0,i.jsx)(ee,{title:"Response Body",children:e.responseBodyRaw?(0,i.jsx)(we,{value:e.responseBody,raw:e.responseBodyRaw}):(0,i.jsx)("div",{className:"apd-empty-body",children:"No body"})})]})}var ut=require("react");var S=require("react/jsx-runtime"),Dt={log:"\u25B8",info:"\u2139",warn:"\u26A0",error:"\u2715",debug:"\u2699"};function zt({entry:e}){var r;let[t,o]=(0,ut.useState)(!1);return(0,S.jsxs)("div",{className:`apd-console-item apd-console-${e.level}`,children:[(0,S.jsx)("span",{className:"apd-console-icon",children:(r=Dt[e.level])!=null?r:"\u25B8"}),(0,S.jsxs)("div",{className:"apd-console-body",children:[(0,S.jsx)("div",{className:"apd-console-preview",children:e.preview||"(empty)"}),(0,S.jsxs)("div",{className:"apd-console-meta",children:[(0,S.jsx)("span",{children:Y(e.timestamp)}),e.source!=="console"&&(0,S.jsx)("span",{children:e.source}),e.stack&&(0,S.jsx)("button",{type:"button",className:"apd-console-toggle-stack",onClick:()=>o(n=>!n),children:t?"Hide stack trace":"Show stack trace"})]}),t&&e.stack&&(0,S.jsx)("div",{className:"apd-console-stack",children:e.stack})]}),e.count>1&&(0,S.jsx)("span",{className:"apd-console-count",children:e.count})]})}function ft({entries:e}){return e.length===0?(0,S.jsx)("div",{className:"apd-console-list",children:(0,S.jsxs)("div",{className:"apd-empty",children:["Nothing logged yet.",(0,S.jsx)("br",{}),"console.log/warn/error and uncaught errors will show up here."]})}):(0,S.jsx)("div",{className:"apd-console-list",children:e.map(t=>(0,S.jsx)(zt,{entry:t},t.id))})}function mt(e){return Object.entries(e).map(([t,o])=>({name:t,value:o}))}function Ot(e){return Object.entries(e).map(([t,o])=>({name:t,value:o}))}function Le(e){return{log:{version:"1.2",creator:{name:"next-api-debugger",version:"0.1.0"},entries:e.map(t=>{var o,r;return{startedDateTime:new Date(t.timestamp).toISOString(),time:t.duration,request:{method:t.method,url:t.url,httpVersion:"HTTP/1.1",headers:mt(t.requestHeaders),queryString:Ot(t.queryParams),cookies:[],headersSize:-1,bodySize:t.requestSize,postData:t.requestBodyRaw?{mimeType:t.requestHeaders["content-type"]||"application/json",text:t.requestBodyRaw}:void 0},response:{status:(o=t.responseStatus)!=null?o:0,statusText:t.responseStatusText,httpVersion:"HTTP/1.1",headers:mt(t.responseHeaders),cookies:[],content:{size:t.responseSize,mimeType:t.responseHeaders["content-type"]||"application/json",text:(r=t.responseBodyRaw)!=null?r:""},redirectURL:"",headersSize:-1,bodySize:t.responseSize},cache:{},timings:{send:0,wait:t.duration,receive:0}}})}}}function Be(e,t){let o=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),r=URL.createObjectURL(o),n=document.createElement("a");n.href=r,n.download=e,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(r)}var d=require("react/jsx-runtime"),It=["GET","POST","PUT","PATCH","DELETE"],$t=["log","info","warn","error","debug"];function gt({logs:e,consoleEntries:t,onClose:o,onClear:r,onClearConsole:n,onTogglePin:a,theme:s,onToggleTheme:l}){var je,De,ze;let[c,h]=(0,q.useState)("network"),[p,f]=(0,q.useState)({search:"",status:"all",methods:[]}),[v,b]=(0,q.useState)(null),[E,x]=(0,q.useState)(!1),[y,M]=(0,q.useState)(""),[L,m]=(0,q.useState)([]);(0,q.useEffect)(()=>{!v&&e.length>0&&b(e[0].id)},[e,v]);let R=(0,q.useMemo)(()=>{let u=p.search.trim().toLowerCase();return e.filter(g=>{var V;return!(p.status==="success"&&!g.success||p.status==="failed"&&g.success||p.methods.length>0&&!p.methods.includes(g.method)||u&&!`${g.url} ${g.endpoint} ${g.method} ${(V=g.responseStatus)!=null?V:""}`.toLowerCase().includes(u))})},[e,p]),C=(0,q.useMemo)(()=>{let u=y.trim().toLowerCase();return t.filter(g=>!(L.length>0&&!L.includes(g.level)||u&&!g.preview.toLowerCase().includes(u)))},[t,y,L]),N=(De=(je=R.find(u=>u.id===v))!=null?je:R[0])!=null?De:null,J=e.filter(u=>!u.success).length,_=t.filter(u=>u.level==="error").length;function pe(u){f(g=>({...g,methods:g.methods.includes(u)?g.methods.filter(V=>V!==u):[...g.methods,u]}))}function bt(u){m(g=>g.includes(u)?g.filter(V=>V!==u):[...g,u])}return(0,d.jsx)("div",{className:"apd-overlay",onClick:o,children:(0,d.jsxs)("div",{className:`apd-modal${E?" apd-minimized":""}`,onClick:u=>u.stopPropagation(),children:[(0,d.jsxs)("div",{className:"apd-header",children:[(0,d.jsxs)("div",{className:"apd-header-title",children:[(0,d.jsx)("span",{className:"apd-live-dot"}),"API Debugger"]}),(0,d.jsx)("span",{className:"apd-header-count",children:c==="network"?`${e.length} requests${J>0?` \xB7 ${J} failed`:""}`:`${t.length} logs${_>0?` \xB7 ${_} errors`:""}`}),(0,d.jsx)("div",{className:"apd-spacer"}),(0,d.jsx)("button",{className:"apd-icon-btn",onClick:l,title:"Toggle theme",type:"button",children:s==="light"?"\u2600":"\u263E"}),c==="network"&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("button",{className:"apd-icon-btn",title:"Export JSON",type:"button",onClick:()=>Be(`api-logs-${Date.now()}.json`,e),children:"\u2B73"}),(0,d.jsx)("button",{className:"apd-icon-btn",title:"Export HAR",type:"button",onClick:()=>Be(`api-logs-${Date.now()}.har`,Le(e)),children:"HAR"})]}),(0,d.jsx)("button",{className:"apd-icon-btn",title:c==="network"?"Clear logs":"Clear console",type:"button",onClick:c==="network"?r:n,children:"\u{1F5D1}"}),(0,d.jsx)("button",{className:"apd-icon-btn",title:E?"Restore":"Minimize",type:"button",onClick:()=>x(u=>!u),children:E?"\u25A2":"\u2014"}),(0,d.jsx)("button",{className:"apd-icon-btn",title:"Close",type:"button",onClick:o,children:"\u2715"})]}),!E&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("div",{className:"apd-tabs",children:[(0,d.jsxs)("button",{type:"button",className:w("apd-tab",c==="network"&&"apd-active"),onClick:()=>h("network"),children:["Network",e.length>0&&(0,d.jsx)("span",{className:w("apd-tab-badge",J>0&&"apd-tab-badge-error"),children:e.length})]}),(0,d.jsxs)("button",{type:"button",className:w("apd-tab",c==="console"&&"apd-active"),onClick:()=>h("console"),children:["Console",t.length>0&&(0,d.jsx)("span",{className:w("apd-tab-badge",_>0&&"apd-tab-badge-error"),children:t.length})]})]}),c==="network"?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("div",{className:"apd-toolbar",children:[(0,d.jsx)(Me,{value:p.search,onChange:u=>f(g=>({...g,search:u}))}),(0,d.jsx)(nt,{status:p.status,onStatusChange:u=>f(g=>({...g,status:u})),methods:It,activeMethods:p.methods,onToggleMethod:pe})]}),(0,d.jsxs)("div",{className:"apd-body",children:[(0,d.jsx)(st,{logs:R,selectedId:(ze=N==null?void 0:N.id)!=null?ze:null,onSelect:b,onTogglePin:a}),(0,d.jsx)(ct,{log:N,onTogglePin:a})]})]}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("div",{className:"apd-toolbar",children:[(0,d.jsx)(Me,{value:y,onChange:M}),$t.map(u=>(0,d.jsx)("button",{type:"button",className:w("apd-chip",L.includes(u)&&"apd-active"),onClick:()=>bt(u),children:u},u))]}),(0,d.jsx)(ft,{entries:C})]}),(0,d.jsxs)("div",{className:"apd-footer",children:[(0,d.jsxs)("span",{children:[(0,d.jsx)("span",{className:"apd-kbd",children:"Ctrl"}),"+",(0,d.jsx)("span",{className:"apd-kbd",children:"Shift"}),"+",(0,d.jsx)("span",{className:"apd-kbd",children:"D"})," to toggle"]}),(0,d.jsx)("span",{style:{marginLeft:"auto"},children:"next-api-debugger \xB7 dev only"})]})]})]})})}var te=require("react/jsx-runtime");function Ut(e){return typeof e=="boolean"?e:process.env.NODE_ENV!=="production"}function ht(e){let{enabled:t,maxLogs:o=200,initialPosition:r,axiosInstance:n,theme:a="dark",keyboardShortcut:s=!0,ignoreUrls:l}=e,c=Ut(t),[h,p]=(0,de.useState)(!1),[f,v]=(0,de.useState)(a),{logs:b,clear:E,togglePin:x}=_e(),{entries:y,clear:M}=Ve();if((0,de.useEffect)(()=>{if(!c||typeof window=="undefined")return;k.setMaxLogs(o),A.setMaxEntries(500),fe({ignoreUrls:l}),Ie({ignoreUrls:l}),Xe();let C=n?he(n,{ignoreUrls:l}):()=>{};return()=>{me(),$e(),Je(),C()}},[c]),Ye({ctrl:!0,shift:!0,key:"d"},()=>p(C=>!C),c&&s),!c)return null;let L=b.filter(C=>!C.success).length,m=y.filter(C=>C.level==="error").length,R=f==="system"?"dark":f;return(0,te.jsxs)("div",{className:`apd-root${R==="light"?" apd-light":""}`,children:[(0,te.jsx)(Ze,{}),!h&&(0,te.jsx)(rt,{count:b.length+y.length,hasErrors:L>0||m>0,onOpen:()=>p(!0),initialPosition:r}),h&&(0,te.jsx)(gt,{logs:b,consoleEntries:y,onClose:()=>p(!1),onClear:E,onClearConsole:M,onTogglePin:x,theme:R,onToggleTheme:()=>v(R==="light"?"dark":"light")})]})}0&&(module.exports={ApiDebugger,exportAsHar,generateCurl,installAxiosInterceptor,installFetchInterceptor,logStore,uninstallFetchInterceptor});
//# sourceMappingURL=index.js.map