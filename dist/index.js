'use client';
"use strict";var Ce=Object.defineProperty;var kt=Object.getOwnPropertyDescriptor;var St=Object.getOwnPropertyNames;var Et=Object.prototype.hasOwnProperty;var Lt=(e,t)=>{for(var o in t)Ce(e,o,{get:t[o],enumerable:!0})},Rt=(e,t,o,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of St(t))!Et.call(e,n)&&n!==o&&Ce(e,n,{get:()=>t[n],enumerable:!(r=kt(t,n))||r.enumerable});return e};var Ct=e=>Rt(Ce({},"__esModule",{value:!0}),e);var Vt={};Lt(Vt,{ApiDebugger:()=>yt,exportAsHar:()=>Re,generateCurl:()=>Ee,installAxiosInterceptor:()=>he,installFetchInterceptor:()=>fe,logStore:()=>E,uninstallFetchInterceptor:()=>me});module.exports=Ct(Vt);var te=require("react");var Ne=class{constructor(){this.logs=[];this.listeners=new Set;this.maxLogs=200;this.snapshot=[];this.getLogs=()=>(this.snapshot=this.logs,this.snapshot);this.subscribe=t=>(this.listeners.add(t),()=>this.listeners.delete(t))}setMaxLogs(t){this.maxLogs=Math.max(1,t),this.trim()}addLog(t){this.logs=[t,...this.logs],this.trim(),this.emit()}togglePin(t){this.logs=this.logs.map(o=>o.id===t?{...o,pinned:!o.pinned}:o),this.emit()}clear(){this.logs=[],this.emit()}trim(){if(this.logs.length<=this.maxLogs)return;let t=this.logs.filter(a=>a.pinned),r=this.logs.filter(a=>!a.pinned).slice(0,Math.max(0,this.maxLogs-t.length)),n=[...t,...r];n.sort((a,s)=>s.timestamp-a.timestamp),this.logs=n}emit(){this.listeners.forEach(t=>t())}},E=new Ne;var Pe=class{constructor(){this.entries=[];this.listeners=new Set;this.maxEntries=500;this.getEntries=()=>this.entries;this.subscribe=t=>(this.listeners.add(t),()=>this.listeners.delete(t))}setMaxEntries(t){this.maxEntries=Math.max(1,t),this.trim()}addEntry(t){let o=this.entries[0];o&&o.level===t.level&&o.preview===t.preview&&o.stack===t.stack?this.entries=[{...o,count:o.count+1,timestamp:t.timestamp},...this.entries.slice(1)]:this.entries=[t,...this.entries],this.trim(),this.emit()}clear(){this.entries=[],this.emit()}trim(){this.entries.length>this.maxEntries&&(this.entries=this.entries.slice(0,this.maxEntries))}emit(){this.listeners.forEach(t=>t())}},A=new Pe;var j="x-apd-skip";function D(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,9)}`}function I(e){if(!e)return null;try{return JSON.parse(e)}catch{return e}}function V(e){if(e==null)return null;if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return String(e)}}function z(e){if(!e)return 0;try{return new Blob([e]).size}catch{return e.length}}function He(e){if(!e)return"0 B";let t=["B","KB","MB","GB"],o=Math.min(t.length-1,Math.floor(Math.log(e)/Math.log(1024))),r=e/Math.pow(1024,o);return`${o===0?r:r.toFixed(1)} ${t[o]}`}function le(e){return e<1e3?`${e} ms`:`${(e/1e3).toFixed(2)} s`}function Y(e){let t=new Date(e);return t.toLocaleTimeString(void 0,{hour12:!1})+`.${String(t.getMilliseconds()).padStart(3,"0")}`}function W(e){try{let t=typeof window!="undefined"?window.location.origin:"http://localhost",o=new URL(e,t),r={};return o.searchParams.forEach((n,a)=>{r[a]=n}),{endpoint:o.pathname,queryParams:r}}catch{return{endpoint:e,queryParams:{}}}}function ce(e){let t={};return e&&e.forEach((o,r)=>{t[r]=o}),t}function re(e){let t={};if(!e)return t;if(typeof e.toJSON=="function")return{...e.toJSON()};if(e instanceof Headers)return ce(e);if(typeof e=="object")for(let[o,r]of Object.entries(e))r!=null&&(t[o]=String(r));return t}function G(e,t){return!t||t.length===0?!1:t.some(o=>o instanceof RegExp?o.test(e):e.includes(o))}function w(...e){return e.filter(Boolean).join(" ")}async function $e(e){try{if(navigator.clipboard&&window.isSecureContext)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select();let o=document.execCommand("copy");return document.body.removeChild(t),o}catch{return!1}}var $=null,ue=!1;function Nt(e){if(e==null)return null;if(typeof e=="string")return e;if(e instanceof URLSearchParams)return e.toString();if(e instanceof FormData){let t=[];return e.forEach((o,r)=>{t.push(`${r}=${o instanceof File?`[File: ${o.name}]`:o}`)}),t.join("&")}return"[binary data]"}function fe(e={}){ue||typeof window=="undefined"||typeof window.fetch!="function"||($=window.fetch.bind(window),ue=!0,window.fetch=async function(o,r){var R,g,y,M,k;let n=o instanceof Request?o:null,a=n?n.url:String(o);if(G(a,e.ignoreUrls))return $(o,r);let s=ce(new Headers((g=(R=r==null?void 0:r.headers)!=null?R:n==null?void 0:n.headers)!=null?g:void 0));if(s[j]){let h=new Headers((M=(y=r==null?void 0:r.headers)!=null?y:n==null?void 0:n.headers)!=null?M:void 0);return h.delete(j),n?$(new Request(n,{headers:h})):$(o,{...r,headers:h})}let d=Date.now(),c=performance.now(),m=((r==null?void 0:r.method)||(n==null?void 0:n.method)||"GET").toUpperCase(),{endpoint:p,queryParams:f}=W(a),v=Nt((k=r==null?void 0:r.body)!=null?k:null),x={id:D(),url:a,endpoint:p,method:m,requestHeaders:s,requestBody:I(v),requestBodyRaw:v,queryParams:f,timestamp:d,source:"fetch",requestSize:z(v),pinned:!1};try{let h=await $(o,r),T=Math.round(performance.now()-c),O=h.clone(),S=null;try{S=await O.text()}catch{S=null}return E.addLog({...x,duration:T,responseStatus:h.status,responseStatusText:h.statusText,responseHeaders:ce(h.headers),responseBody:I(S),responseBodyRaw:S,responseSize:z(S),success:h.ok,error:h.ok?null:`HTTP ${h.status} ${h.statusText}`}),h}catch(h){let T=Math.round(performance.now()-c);throw E.addLog({...x,duration:T,responseStatus:null,responseStatusText:"",responseHeaders:{},responseBody:null,responseBodyRaw:null,responseSize:0,success:!1,error:(h==null?void 0:h.message)||"Network error"}),h}})}function me(){ue&&$&&typeof window!="undefined"&&(window.fetch=$),ue=!1,$=null}var ne=null,Z=null,ae=null,ge=!1,Q=Symbol("apd-xhr-meta");function Pt(e){let t={};return e.trim().split(/[\r\n]+/).forEach(o=>{let r=o.indexOf(":");if(r===-1)return;let n=o.slice(0,r).trim().toLowerCase(),a=o.slice(r+1).trim();n&&(t[n]=a)}),t}function Ue(e={}){ge||typeof window=="undefined"||typeof XMLHttpRequest=="undefined"||(ne=XMLHttpRequest.prototype.open,Z=XMLHttpRequest.prototype.send,ae=XMLHttpRequest.prototype.setRequestHeader,ge=!0,XMLHttpRequest.prototype.open=function(o,r,...n){let a=String(r);return this[Q]={id:D(),method:(o||"GET").toUpperCase(),url:a,startTime:0,startPerf:0,requestHeaders:{},ignored:G(a,e.ignoreUrls)},ne.apply(this,[o,r,...n])},XMLHttpRequest.prototype.setRequestHeader=function(o,r){if(o.toLowerCase()===j){this[Q]&&(this[Q].ignored=!0);return}return this[Q]&&(this[Q].requestHeaders[o]=r),ae.apply(this,[o,r])},XMLHttpRequest.prototype.send=function(o){let r=this[Q];if(!r||r.ignored)return Z.apply(this,[o]);r.startTime=Date.now(),r.startPerf=performance.now();let n=o==null?null:typeof o=="string"?o:o instanceof URLSearchParams?o.toString():o instanceof FormData?"[form data]":"[binary data]",a=()=>{let s=Math.round(performance.now()-r.startPerf),{endpoint:d,queryParams:c}=W(r.url),m=Pt(this.getAllResponseHeaders()||""),p=null;try{p=typeof this.responseText=="string"?this.responseText:null}catch{p=null}let f=this.status,v=f>=200&&f<400,x={id:r.id,url:r.url,endpoint:d,method:r.method,requestHeaders:r.requestHeaders,requestBody:I(n),requestBodyRaw:n,queryParams:c,responseStatus:f||null,responseStatusText:this.statusText||"",responseHeaders:m,responseBody:I(p),responseBodyRaw:p,duration:s,timestamp:r.startTime,success:v,error:v?null:f===0?"Network error":`HTTP ${f} ${this.statusText}`,source:"xhr",requestSize:z(n),responseSize:z(p),pinned:!1};E.addLog(x),this.removeEventListener("loadend",a)};return this.addEventListener("loadend",a),Z.apply(this,[o])})}function Fe(){ge&&typeof window!="undefined"&&typeof XMLHttpRequest!="undefined"&&(ne&&(XMLHttpRequest.prototype.open=ne),Z&&(XMLHttpRequest.prototype.send=Z),ae&&(XMLHttpRequest.prototype.setRequestHeader=ae)),ge=!1,ne=null,Z=null,ae=null}function Ht(e){let t=(e==null?void 0:e.baseURL)||"",o=(e==null?void 0:e.url)||"",r=/^https?:\/\//i.test(o)?o:`${t}${t&&!t.endsWith("/")&&!o.startsWith("/")?"/":""}${o}`;if(e!=null&&e.params&&typeof e.params=="object"){let n=Tt(e.params);n&&(r+=(r.includes("?")?"&":"?")+n)}return r}function Tt(e){let t=new URLSearchParams;for(let[o,r]of Object.entries(e))r!=null&&(Array.isArray(r)?r.forEach(n=>t.append(o,String(n))):t.append(o,String(r)));return t.toString()}function Xe(e){if(e==null)return null;if(typeof e=="string")return e;if(typeof URLSearchParams!="undefined"&&e instanceof URLSearchParams)return e.toString();if(typeof FormData!="undefined"&&e instanceof FormData){let t=[];return e.forEach((o,r)=>{t.push(`${r}=${o instanceof File?`[File: ${o.name}]`:o}`)}),t.join("&")}return V(e)}function he(e,t={}){var a;if(!e||!e.interceptors||typeof((a=e.interceptors.request)==null?void 0:a.use)!="function")return()=>{};if(e.__apiDebuggerInstalled)return()=>{};e.__apiDebuggerInstalled=!0;let o=e.interceptors.request.use(s=>{let d={id:D(),startTime:Date.now(),startPerf:performance.now(),requestBodyRaw:Xe(s.data),requestHeadersSnapshot:re(s.headers)};return s.__apdMeta=d,s.headers&&typeof s.headers.set=="function"?s.headers.set(j,"1"):s.headers={...s.headers||{},[j]:"1"},s});function r(s,d,c){var T,O,S,C,_,pe;if(!s)return;let m=Ht(s);if(G(m,t.ignoreUrls))return;let p=s.__apdMeta||{id:D(),startTime:Date.now(),startPerf:performance.now(),requestBodyRaw:Xe(s.data),requestHeadersSnapshot:re(s.headers)},f=Math.round(performance.now()-p.startPerf),{endpoint:v,queryParams:x}=W(m),R=re(s.headers),g=Object.keys(R).length>0?R:p.requestHeadersSnapshot;delete g[j];let y=p.requestBodyRaw,M=(d==null?void 0:d.data)!==void 0?V(d.data):null,k=(S=(O=d==null?void 0:d.status)!=null?O:(T=c==null?void 0:c.response)==null?void 0:T.status)!=null?S:null,h={id:p.id,url:m,endpoint:v,method:(s.method||"get").toUpperCase(),requestHeaders:g,requestBody:(C=I(y))!=null?C:y,requestBodyRaw:y,queryParams:x,responseStatus:k,responseStatusText:(_=d==null?void 0:d.statusText)!=null?_:"",responseHeaders:re(d==null?void 0:d.headers),responseBody:(pe=d==null?void 0:d.data)!=null?pe:null,responseBodyRaw:M,duration:f,timestamp:p.startTime,success:!c&&!!k&&k<400,error:c?c.message||"Request failed":null,source:"axios",requestSize:z(y),responseSize:z(M),pinned:!1};E.addLog(h)}let n=e.interceptors.response.use(s=>(r(s.config,s),s),s=>(r(s==null?void 0:s.config,s==null?void 0:s.response,s),Promise.reject(s)));return()=>{e.interceptors.request.eject(o),e.interceptors.response.eject(n),e.__apiDebuggerInstalled=!1}}var Je=["log","info","warn","error","debug"],qe={},se=null,ie=null,Me=!1;function qt(e,t=new WeakSet){var o;if(e===null)return"null";if(e===void 0)return"undefined";if(typeof e=="string")return e;if(typeof e=="number"||typeof e=="boolean")return String(e);if(e instanceof Error)return`${e.name}: ${e.message}`;if(typeof e=="function")return e.name?`\u0192 ${e.name}()`:"\u0192 ()";if(typeof e=="object"){if(t.has(e))return"[Circular]";t.add(e);try{return(o=JSON.stringify(e,(r,n)=>typeof n=="bigint"?n.toString():n,2))!=null?o:String(e)}catch{return Array.isArray(e)?"[Array]":"[Object]"}}return String(e)}function Mt(e){for(let t of e)if(t instanceof Error&&t.stack)return t.stack;return null}function Te(e,t,o){let r=t.map(n=>qt(n));return{id:D(),level:e,parts:r,preview:r.join(" "),stack:Mt(t),timestamp:Date.now(),source:o,count:1}}function _e(e={}){var o,r;if(Me||typeof window=="undefined"||typeof console=="undefined")return;Me=!0;let t=(o=e.levels)!=null?o:Je;for(let n of t){let a=(r=console[n])==null?void 0:r.bind(console);a&&(qe[n]=a,console[n]=(...s)=>{A.addEntry(Te(n,s,"console")),a(...s)})}se=n=>{let a=n.error?[n.error]:[n.message],s=Te("error",a,"window.onerror");A.addEntry({...s,preview:s.preview||`${n.message} (${n.filename}:${n.lineno}:${n.colno})`})},window.addEventListener("error",se),ie=n=>{let a=n.reason,s=Te("error",[a],"unhandledrejection");A.addEntry({...s,preview:`Unhandled promise rejection: ${s.preview}`})},window.addEventListener("unhandledrejection",ie)}function Ke(){if(typeof console!="undefined")for(let e of Je){let t=qe[e];t&&(console[e]=t)}typeof window!="undefined"&&(se&&window.removeEventListener("error",se),ie&&window.removeEventListener("unhandledrejection",ie)),qe={},se=null,ie=null,Me=!1}var de=require("react");function Ve(){let e=(0,de.useSyncExternalStore)(E.subscribe,E.getLogs,E.getLogs),t=(0,de.useCallback)(()=>E.clear(),[]),o=(0,de.useCallback)(r=>E.togglePin(r),[]);return{logs:e,clear:t,togglePin:o}}var be=require("react");function Ye(){let e=(0,be.useSyncExternalStore)(A.subscribe,A.getEntries,A.getEntries),t=(0,be.useCallback)(()=>A.clear(),[]);return{entries:e,clear:t}}var We=require("react");function Ge(e,t,o=!0){(0,We.useEffect)(()=>{if(!o||typeof window=="undefined")return;function r(n){let a=!e.ctrl||n.ctrlKey||n.metaKey,s=!e.shift||n.shiftKey;a&&s&&n.key.toLowerCase()===e.key.toLowerCase()&&(n.preventDefault(),t())}return window.addEventListener("keydown",r),()=>window.removeEventListener("keydown",r)},[e.ctrl,e.shift,e.key,t,o])}var xe=require("react");function Ae(e){return e===" "?"space":e.toLowerCase()}function At(e){var r;let t=e;if(!t)return!1;let o=(r=t.tagName)==null?void 0:r.toLowerCase();return o==="input"||o==="textarea"||o==="select"||t.isContentEditable}function Qe(e,t){if(typeof window=="undefined")return()=>{};let o=e.map(Ae),r=new Set;function n(d){if(At(d.target))return;let c=Ae(d.key),m=r.has(c);r.add(c),!m&&o.every(p=>r.has(p))&&(d.preventDefault(),t())}function a(d){r.delete(Ae(d.key))}function s(){r.clear()}return window.addEventListener("keydown",n),window.addEventListener("keyup",a),window.addEventListener("blur",s),()=>{window.removeEventListener("keydown",n),window.removeEventListener("keyup",a),window.removeEventListener("blur",s)}}function Ze(e,t,o=!0){let r=(0,xe.useRef)(t);r.current=t,(0,xe.useEffect)(()=>{if(o)return Qe(e,()=>r.current())},[e.join(","),o])}var ot=require("react");var et=`
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
`;var tt="next-api-debugger-styles";function rt(){return(0,ot.useEffect)(()=>{if(typeof document=="undefined"||document.getElementById(tt))return;let e=document.createElement("style");e.id=tt,e.textContent=et,document.head.appendChild(e)},[]),null}var N=require("react"),nt="apd-button-position",ye=56,at=5;function ve(e){return typeof window=="undefined"?e:{x:Math.min(Math.max(8,e.x),window.innerWidth-ye-8),y:Math.min(Math.max(8,e.y),window.innerHeight-ye-8)}}function Bt(){return typeof window=="undefined"?{x:24,y:24}:{x:window.innerWidth-ye-24,y:window.innerHeight-ye-24}}function st(e){let[t,o]=(0,N.useState)(()=>{if(typeof window=="undefined")return e!=null?e:{x:24,y:24};try{let p=sessionStorage.getItem(nt);if(p)return ve(JSON.parse(p))}catch{}return ve(e!=null?e:Bt())}),r=(0,N.useRef)(!1),n=(0,N.useRef)(!1),a=(0,N.useRef)({pointerX:0,pointerY:0,posX:0,posY:0}),s=(0,N.useCallback)(p=>{r.current=!0,n.current=!1,a.current={pointerX:p.clientX,pointerY:p.clientY,posX:t.x,posY:t.y},p.currentTarget.setPointerCapture(p.pointerId)},[t.x,t.y]),d=(0,N.useCallback)(p=>{if(!r.current)return;let f=p.clientX-a.current.pointerX,v=p.clientY-a.current.pointerY;(Math.abs(f)>at||Math.abs(v)>at)&&(n.current=!0),o(ve({x:a.current.posX+f,y:a.current.posY+v}))},[]),c=(0,N.useCallback)(()=>{r.current=!1},[]);(0,N.useEffect)(()=>{try{sessionStorage.setItem(nt,JSON.stringify(t))}catch{}},[t]),(0,N.useEffect)(()=>{function p(){o(f=>ve(f))}return window.addEventListener("resize",p),()=>window.removeEventListener("resize",p)},[]);let m=(0,N.useCallback)(()=>n.current,[]);return{position:t,onPointerDown:s,onPointerMove:d,onPointerUp:c,wasDragged:m}}var F=require("react/jsx-runtime");function it({count:e,hasErrors:t,onOpen:o,initialPosition:r}){let{position:n,onPointerDown:a,onPointerMove:s,onPointerUp:d,wasDragged:c}=st(r);return(0,F.jsxs)("button",{type:"button",className:"apd-btn",style:{left:n.x,top:n.y},onPointerDown:a,onPointerMove:s,onPointerUp:d,onClick:()=>{c()||o()},"aria-label":"Open API debugger",title:"API Debugger (drag to move)",children:[(0,F.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,F.jsx)("polyline",{points:"16 18 22 12 16 6"}),(0,F.jsx)("polyline",{points:"8 6 2 12 8 18"})]}),e>0&&(0,F.jsx)("span",{className:w("apd-btn-dot",t&&"apd-has-errors"),children:e>99?"99+":e})]})}var q=require("react");var X=require("react/jsx-runtime");function Be({value:e,onChange:t}){return(0,X.jsxs)("div",{className:"apd-search",children:[(0,X.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,X.jsx)("circle",{cx:"11",cy:"11",r:"7"}),(0,X.jsx)("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]}),(0,X.jsx)("input",{type:"text",placeholder:"Filter by URL, endpoint, method or status code...",value:e,onChange:o=>t(o.target.value),spellCheck:!1})]})}var U=require("react/jsx-runtime");function dt({status:e,onStatusChange:t,methods:o,activeMethods:r,onToggleMethod:n}){return(0,U.jsxs)(U.Fragment,{children:[(0,U.jsx)("button",{type:"button",className:w("apd-chip apd-chip-success",e==="success"&&"apd-active"),onClick:()=>t(e==="success"?"all":"success"),children:"Success"}),(0,U.jsx)("button",{type:"button",className:w("apd-chip apd-chip-failed",e==="failed"&&"apd-active"),onClick:()=>t(e==="failed"?"all":"failed"),children:"Failed"}),o.map(a=>(0,U.jsx)("button",{type:"button",className:w("apd-chip",r.includes(a)&&"apd-active"),onClick:()=>n(a),children:a},a))]})}var P=require("react/jsx-runtime");function jt(e){return["GET","POST","PUT","PATCH","DELETE"].includes(e.toUpperCase())?`apd-method-${e.toUpperCase()}`:"apd-method-OTHER"}function pt({log:e,selected:t,onSelect:o,onTogglePin:r}){var n;return(0,P.jsxs)("div",{className:w("apd-item",t&&"apd-selected"),onClick:o,role:"button",tabIndex:0,onKeyDown:a=>a.key==="Enter"&&o(),children:[(0,P.jsxs)("div",{className:"apd-item-row1",children:[(0,P.jsx)("span",{className:w("apd-method",jt(e.method)),children:e.method}),(0,P.jsx)("span",{className:"apd-item-url",title:e.url,children:e.endpoint}),(0,P.jsx)("span",{className:w("apd-status-dot",e.success?"apd-ok":"apd-fail")}),e.pinned&&(0,P.jsx)("button",{type:"button",className:"apd-pin-star",onClick:a=>{a.stopPropagation(),r()},title:"Unpin","aria-label":"Unpin request",style:{background:"none",border:"none",cursor:"pointer",padding:0},children:"\u2605"})]}),(0,P.jsxs)("div",{className:"apd-item-row2",children:[(0,P.jsx)("span",{children:(n=e.responseStatus)!=null?n:e.error?"ERR":"\u2014"}),(0,P.jsx)("span",{children:le(e.duration)}),(0,P.jsx)("span",{children:Y(e.timestamp)}),(0,P.jsx)("span",{style:{marginLeft:"auto",textTransform:"uppercase"},children:e.source})]})]})}var J=require("react/jsx-runtime");function lt({logs:e,selectedId:t,onSelect:o,onTogglePin:r}){return e.length===0?(0,J.jsx)("div",{className:"apd-list",children:(0,J.jsxs)("div",{className:"apd-empty",children:["No requests captured yet.",(0,J.jsx)("br",{}),"Make an API call and it'll show up here."]})}):(0,J.jsx)("div",{className:"apd-list",children:e.map(n=>(0,J.jsx)(pt,{log:n,selected:n.id===t,onSelect:()=>o(n.id),onTogglePin:()=>r(n.id)},n.id))})}var Le=require("react");var ct=require("react");var ut=require("react/jsx-runtime");function we({getText:e,label:t,icon:o}){let[r,n]=(0,ct.useState)(!1);async function a(){await $e(e())&&(n(!0),setTimeout(()=>n(!1),1200))}return(0,ut.jsxs)("button",{type:"button",className:w("apd-action-btn",r&&"apd-copied"),onClick:a,children:[o,r?"Copied":t]})}var B=require("react");var Dt=/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(\.\d+)?([eE][+-]?\d+)?)/g;function zt(e){return e.replace(Dt,t=>{let o="apd-json-num";return/^"/.test(t)?o=/:$/.test(t)?"apd-json-key":"apd-json-str":/true|false/.test(t)?o="apd-json-bool":/null/.test(t)&&(o="apd-json-null"),`<span class="${o}">${t}</span>`})}function Ot(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function It(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function ft(e,t){if(e!=null&&typeof e=="object")return{content:JSON.stringify(e,null,2),isJson:!0};if(typeof e=="string")try{return{content:JSON.stringify(JSON.parse(e),null,2),isJson:!0}}catch{return{content:t!=null?t:e,isJson:!1}}return{content:t!=null?t:String(e!=null?e:""),isJson:!1}}function mt(e,t,o){let r=Ot(e),n=0,a=r;if(o){let d=new RegExp(It(o),"gi");a=r.replace(d,c=>(n+=1,`<mark class='apd-json-highlight'>${c}</mark>`))}return{html:t?zt(a):a,matchCount:n}}var H=require("react/jsx-runtime");function ke({value:e,raw:t,searchable:o=!0}){let[r,n]=(0,B.useState)(""),[a,s]=(0,B.useState)(0),d=(0,B.useRef)(null),c=(0,B.useRef)(""),{content:m,isJson:p}=ft(e,t),f=r.trim(),{html:v,matchCount:x}=(0,B.useMemo)(()=>mt(m,p,f),[m,p,f]);(0,B.useEffect)(()=>{let g=f!==c.current;c.current=f,(g||a>=x)&&s(0)},[f,x]),(0,B.useEffect)(()=>{var y;if(!d.current)return;let g=d.current.querySelectorAll("mark.apd-json-highlight");g.forEach((M,k)=>M.classList.toggle("apd-active",k===a)),(y=g[a])==null||y.scrollIntoView({block:"center",behavior:"smooth"})},[v,a]);function R(g){x!==0&&s(y=>(y+g+x)%x)}return(0,H.jsxs)("div",{children:[o&&m.length>0&&(0,H.jsxs)("div",{className:"apd-json-search",children:[(0,H.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,H.jsx)("circle",{cx:"11",cy:"11",r:"7"}),(0,H.jsx)("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]}),(0,H.jsx)("input",{type:"text",placeholder:"Find in payload...",value:r,onChange:g=>n(g.target.value),onKeyDown:g=>{g.key==="Enter"&&(g.preventDefault(),R(g.shiftKey?-1:1))},spellCheck:!1}),r&&(0,H.jsx)("span",{className:"apd-json-search-count",children:x>0?`${a+1} / ${x}`:"No matches"}),r&&x>0&&(0,H.jsxs)("div",{className:"apd-json-search-nav",children:[(0,H.jsx)("button",{type:"button",onClick:()=>R(-1),"aria-label":"Previous match",title:"Previous match (Shift+Enter)",children:"\u2191"}),(0,H.jsx)("button",{type:"button",onClick:()=>R(1),"aria-label":"Next match",title:"Next match (Enter)",children:"\u2193"})]})]}),(0,H.jsx)("pre",{ref:d,className:"apd-json",dangerouslySetInnerHTML:{__html:v}})]})}function Se(e){return`'${e.replace(/'/g,"'\\''")}'`}function $t(e){let t=e.trim();if(!t||!(t.startsWith("{")||t.startsWith("[")))return!1;try{return JSON.parse(t),!0}catch{return!1}}function Ee(e){let t=[`curl -X ${e.method} ${Se(e.url)}`],o=Object.keys(e.requestHeaders).some(r=>r.toLowerCase()==="content-type");for(let[r,n]of Object.entries(e.requestHeaders))/^(host|content-length|connection)$/i.test(r)||t.push(`  -H ${Se(`${r}: ${n}`)}`);return e.requestBodyRaw&&(!o&&$t(e.requestBodyRaw)&&t.push(`  -H ${Se("Content-Type: application/json")}`),t.push(`  --data-raw ${Se(e.requestBodyRaw)}`)),t.join(` \\
`)}var i=require("react/jsx-runtime");function ee({title:e,count:t,defaultOpen:o=!0,children:r}){let[n,a]=(0,Le.useState)(o);return(0,i.jsxs)("div",{className:"apd-section",children:[(0,i.jsxs)("div",{className:"apd-section-header",onClick:()=>a(s=>!s),children:[(0,i.jsxs)("span",{children:[e,typeof t=="number"?` (${t})`:""]}),(0,i.jsx)("span",{children:n?"\u2212":"+"})]}),n&&(0,i.jsx)("div",{className:"apd-section-body",children:r})]})}function je({data:e}){let t=Object.entries(e);return t.length===0?(0,i.jsx)("div",{className:"apd-section-body apd-empty-body",children:"None"}):(0,i.jsx)("div",{className:"apd-kv",children:t.map(([o,r])=>(0,i.jsxs)(Le.Fragment,{children:[(0,i.jsx)("div",{className:"apd-kv-key",children:o}),(0,i.jsx)("div",{className:"apd-kv-val",children:r})]},o))})}function gt({log:e,onTogglePin:t}){var a,s,d,c,m;if(!e)return(0,i.jsx)("div",{className:"apd-detail",children:(0,i.jsx)("div",{className:"apd-detail-empty",children:"Select a request to see full details"})});let o=Ee(e),r=(s=(a=V(e.requestBody))!=null?a:e.requestBodyRaw)!=null?s:"",n=(c=(d=V(e.responseBody))!=null?d:e.responseBodyRaw)!=null?c:"";return(0,i.jsxs)("div",{className:"apd-detail",children:[(0,i.jsxs)("div",{className:"apd-detail-header",children:[(0,i.jsxs)("div",{className:"apd-detail-url",children:[(0,i.jsx)("strong",{children:e.method})," ",e.url]}),(0,i.jsx)("button",{type:"button",className:"apd-action-btn",onClick:()=>t(e.id),title:e.pinned?"Unpin":"Pin this request",children:e.pinned?"\u2605 Pinned":"\u2606 Pin"})]}),(0,i.jsxs)("div",{className:"apd-meta-grid",children:[(0,i.jsxs)("div",{children:[(0,i.jsx)("div",{className:"apd-meta-label",children:"Status"}),(0,i.jsxs)("div",{className:"apd-meta-value",style:{color:e.success?"var(--apd-success)":"var(--apd-error)"},children:[(m=e.responseStatus)!=null?m:"Failed"," ",e.responseStatusText]})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)("div",{className:"apd-meta-label",children:"Duration"}),(0,i.jsx)("div",{className:"apd-meta-value",children:le(e.duration)})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)("div",{className:"apd-meta-label",children:"Time"}),(0,i.jsx)("div",{className:"apd-meta-value",children:Y(e.timestamp)})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)("div",{className:"apd-meta-label",children:"Source"}),(0,i.jsx)("div",{className:"apd-meta-value",children:e.source})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)("div",{className:"apd-meta-label",children:"Req. size"}),(0,i.jsx)("div",{className:"apd-meta-value",children:He(e.requestSize)})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)("div",{className:"apd-meta-label",children:"Res. size"}),(0,i.jsx)("div",{className:"apd-meta-value",children:He(e.responseSize)})]})]}),e.error&&(0,i.jsxs)("div",{className:"apd-section",style:{borderColor:"var(--apd-error)"},children:[(0,i.jsx)("div",{className:"apd-section-header",style:{color:"var(--apd-error)"},children:"Error"}),(0,i.jsx)("div",{className:"apd-section-body",children:e.error})]}),(0,i.jsxs)("div",{className:"apd-actions",children:[(0,i.jsx)(we,{label:"Copy cURL",getText:()=>o}),(0,i.jsx)(we,{label:"Copy Request",getText:()=>r}),(0,i.jsx)(we,{label:"Copy Response",getText:()=>n})]}),(0,i.jsx)(ee,{title:"cURL",children:(0,i.jsx)(ke,{value:o,searchable:!1})}),(0,i.jsx)(ee,{title:"Query Params",count:Object.keys(e.queryParams).length,defaultOpen:!1,children:(0,i.jsx)(je,{data:e.queryParams})}),(0,i.jsx)(ee,{title:"Request Headers",count:Object.keys(e.requestHeaders).length,defaultOpen:!1,children:(0,i.jsx)(je,{data:e.requestHeaders})}),(0,i.jsx)(ee,{title:"Request Body",children:e.requestBodyRaw?(0,i.jsx)(ke,{value:e.requestBody,raw:e.requestBodyRaw}):(0,i.jsx)("div",{className:"apd-empty-body",children:"No body"})}),(0,i.jsx)(ee,{title:"Response Headers",count:Object.keys(e.responseHeaders).length,defaultOpen:!1,children:(0,i.jsx)(je,{data:e.responseHeaders})}),(0,i.jsx)(ee,{title:"Response Body",children:e.responseBodyRaw?(0,i.jsx)(ke,{value:e.responseBody,raw:e.responseBodyRaw}):(0,i.jsx)("div",{className:"apd-empty-body",children:"No body"})})]})}var ht=require("react");var L=require("react/jsx-runtime"),Ut={log:"\u25B8",info:"\u2139",warn:"\u26A0",error:"\u2715",debug:"\u2699"};function Ft({entry:e}){var r;let[t,o]=(0,ht.useState)(!1);return(0,L.jsxs)("div",{className:`apd-console-item apd-console-${e.level}`,children:[(0,L.jsx)("span",{className:"apd-console-icon",children:(r=Ut[e.level])!=null?r:"\u25B8"}),(0,L.jsxs)("div",{className:"apd-console-body",children:[(0,L.jsx)("div",{className:"apd-console-preview",children:e.preview||"(empty)"}),(0,L.jsxs)("div",{className:"apd-console-meta",children:[(0,L.jsx)("span",{children:Y(e.timestamp)}),e.source!=="console"&&(0,L.jsx)("span",{children:e.source}),e.stack&&(0,L.jsx)("button",{type:"button",className:"apd-console-toggle-stack",onClick:()=>o(n=>!n),children:t?"Hide stack trace":"Show stack trace"})]}),t&&e.stack&&(0,L.jsx)("div",{className:"apd-console-stack",children:e.stack})]}),e.count>1&&(0,L.jsx)("span",{className:"apd-console-count",children:e.count})]})}function bt({entries:e}){return e.length===0?(0,L.jsx)("div",{className:"apd-console-list",children:(0,L.jsxs)("div",{className:"apd-empty",children:["Nothing logged yet.",(0,L.jsx)("br",{}),"console.log/warn/error and uncaught errors will show up here."]})}):(0,L.jsx)("div",{className:"apd-console-list",children:e.map(t=>(0,L.jsx)(Ft,{entry:t},t.id))})}function xt(e){return Object.entries(e).map(([t,o])=>({name:t,value:o}))}function Xt(e){return Object.entries(e).map(([t,o])=>({name:t,value:o}))}function Re(e){return{log:{version:"1.2",creator:{name:"next-api-debugger",version:"0.1.0"},entries:e.map(t=>{var o,r;return{startedDateTime:new Date(t.timestamp).toISOString(),time:t.duration,request:{method:t.method,url:t.url,httpVersion:"HTTP/1.1",headers:xt(t.requestHeaders),queryString:Xt(t.queryParams),cookies:[],headersSize:-1,bodySize:t.requestSize,postData:t.requestBodyRaw?{mimeType:t.requestHeaders["content-type"]||"application/json",text:t.requestBodyRaw}:void 0},response:{status:(o=t.responseStatus)!=null?o:0,statusText:t.responseStatusText,httpVersion:"HTTP/1.1",headers:xt(t.responseHeaders),cookies:[],content:{size:t.responseSize,mimeType:t.responseHeaders["content-type"]||"application/json",text:(r=t.responseBodyRaw)!=null?r:""},redirectURL:"",headersSize:-1,bodySize:t.responseSize},cache:{},timings:{send:0,wait:t.duration,receive:0}}})}}}function De(e,t){let o=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),r=URL.createObjectURL(o),n=document.createElement("a");n.href=r,n.download=e,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(r)}var l=require("react/jsx-runtime"),Jt=["GET","POST","PUT","PATCH","DELETE"],_t=["log","info","warn","error","debug"];function vt({logs:e,consoleEntries:t,onClose:o,onClear:r,onClearConsole:n,onTogglePin:a,theme:s,onToggleTheme:d}){var ze,Oe,Ie;let[c,m]=(0,q.useState)("network"),[p,f]=(0,q.useState)({search:"",status:"all",methods:[]}),[v,x]=(0,q.useState)(null),[R,g]=(0,q.useState)(!1),[y,M]=(0,q.useState)(""),[k,h]=(0,q.useState)([]);(0,q.useEffect)(()=>{!v&&e.length>0&&x(e[0].id)},[e,v]);let T=(0,q.useMemo)(()=>{let u=p.search.trim().toLowerCase();return e.filter(b=>{var K;return!(p.status==="success"&&!b.success||p.status==="failed"&&b.success||p.methods.length>0&&!p.methods.includes(b.method)||u&&!`${b.url} ${b.endpoint} ${b.method} ${(K=b.responseStatus)!=null?K:""}`.toLowerCase().includes(u))})},[e,p]),O=(0,q.useMemo)(()=>{let u=y.trim().toLowerCase();return t.filter(b=>!(k.length>0&&!k.includes(b.level)||u&&!b.preview.toLowerCase().includes(u)))},[t,y,k]),S=(Oe=(ze=T.find(u=>u.id===v))!=null?ze:T[0])!=null?Oe:null,C=e.filter(u=>!u.success).length,_=t.filter(u=>u.level==="error").length;function pe(u){f(b=>({...b,methods:b.methods.includes(u)?b.methods.filter(K=>K!==u):[...b.methods,u]}))}function wt(u){h(b=>b.includes(u)?b.filter(K=>K!==u):[...b,u])}return(0,l.jsx)("div",{className:"apd-overlay",onClick:o,children:(0,l.jsxs)("div",{className:`apd-modal${R?" apd-minimized":""}`,onClick:u=>u.stopPropagation(),children:[(0,l.jsxs)("div",{className:"apd-header",children:[(0,l.jsxs)("div",{className:"apd-header-title",children:[(0,l.jsx)("span",{className:"apd-live-dot"}),"API Debugger"]}),(0,l.jsx)("span",{className:"apd-header-count",children:c==="network"?`${e.length} requests${C>0?` \xB7 ${C} failed`:""}`:`${t.length} logs${_>0?` \xB7 ${_} errors`:""}`}),(0,l.jsx)("div",{className:"apd-spacer"}),(0,l.jsx)("button",{className:"apd-icon-btn",onClick:d,title:"Toggle theme",type:"button",children:s==="light"?"\u2600":"\u263E"}),c==="network"&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("button",{className:"apd-icon-btn",title:"Export JSON",type:"button",onClick:()=>De(`api-logs-${Date.now()}.json`,e),children:"\u2B73"}),(0,l.jsx)("button",{className:"apd-icon-btn",title:"Export HAR",type:"button",onClick:()=>De(`api-logs-${Date.now()}.har`,Re(e)),children:"HAR"})]}),(0,l.jsx)("button",{className:"apd-icon-btn",title:c==="network"?"Clear logs":"Clear console",type:"button",onClick:c==="network"?r:n,children:"\u{1F5D1}"}),(0,l.jsx)("button",{className:"apd-icon-btn",title:R?"Restore":"Minimize",type:"button",onClick:()=>g(u=>!u),children:R?"\u25A2":"\u2014"}),(0,l.jsx)("button",{className:"apd-icon-btn",title:"Close",type:"button",onClick:o,children:"\u2715"})]}),!R&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)("div",{className:"apd-tabs",children:[(0,l.jsxs)("button",{type:"button",className:w("apd-tab",c==="network"&&"apd-active"),onClick:()=>m("network"),children:["Network",e.length>0&&(0,l.jsx)("span",{className:w("apd-tab-badge",C>0&&"apd-tab-badge-error"),children:e.length})]}),(0,l.jsxs)("button",{type:"button",className:w("apd-tab",c==="console"&&"apd-active"),onClick:()=>m("console"),children:["Console",t.length>0&&(0,l.jsx)("span",{className:w("apd-tab-badge",_>0&&"apd-tab-badge-error"),children:t.length})]})]}),c==="network"?(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)("div",{className:"apd-toolbar",children:[(0,l.jsx)(Be,{value:p.search,onChange:u=>f(b=>({...b,search:u}))}),(0,l.jsx)(dt,{status:p.status,onStatusChange:u=>f(b=>({...b,status:u})),methods:Jt,activeMethods:p.methods,onToggleMethod:pe})]}),(0,l.jsxs)("div",{className:"apd-body",children:[(0,l.jsx)(lt,{logs:T,selectedId:(Ie=S==null?void 0:S.id)!=null?Ie:null,onSelect:x,onTogglePin:a}),(0,l.jsx)(gt,{log:S,onTogglePin:a})]})]}):(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)("div",{className:"apd-toolbar",children:[(0,l.jsx)(Be,{value:y,onChange:M}),_t.map(u=>(0,l.jsx)("button",{type:"button",className:w("apd-chip",k.includes(u)&&"apd-active"),onClick:()=>wt(u),children:u},u))]}),(0,l.jsx)(bt,{entries:O})]}),(0,l.jsxs)("div",{className:"apd-footer",children:[(0,l.jsxs)("span",{children:[(0,l.jsx)("span",{className:"apd-kbd",children:"Ctrl"}),"+",(0,l.jsx)("span",{className:"apd-kbd",children:"Shift"}),"+",(0,l.jsx)("span",{className:"apd-kbd",children:"D"})," to toggle \xB7 ",(0,l.jsx)("span",{className:"apd-kbd",children:"Space"}),"+",(0,l.jsx)("span",{className:"apd-kbd",children:"H"})," to hide"]}),(0,l.jsx)("span",{style:{marginLeft:"auto"},children:"next-api-debugger \xB7 dev only"})]})]})]})})}var oe=require("react/jsx-runtime");function Kt(e){return typeof e=="boolean"?e:process.env.NODE_ENV!=="production"}function yt(e){let{enabled:t,maxLogs:o=200,initialPosition:r,axiosInstance:n,theme:a="dark",keyboardShortcut:s=!0,ignoreUrls:d}=e,c=Kt(t),[m,p]=(0,te.useState)(!1),[f,v]=(0,te.useState)(!1),[x,R]=(0,te.useState)(a),{logs:g,clear:y,togglePin:M}=Ve(),{entries:k,clear:h}=Ye();if((0,te.useEffect)(()=>{if(!c||typeof window=="undefined")return;E.setMaxLogs(o),A.setMaxEntries(500),fe({ignoreUrls:d}),Ue({ignoreUrls:d}),_e();let C=n?he(n,{ignoreUrls:d}):()=>{};return()=>{me(),Fe(),Ke(),C()}},[c]),Ge({ctrl:!0,shift:!0,key:"d"},()=>p(C=>!C),c&&s),Ze(["space","h"],()=>{v(C=>!C),p(!1)},c&&s),!c)return null;let T=g.filter(C=>!C.success).length,O=k.filter(C=>C.level==="error").length,S=x==="system"?"dark":x;return(0,oe.jsxs)("div",{className:`apd-root${S==="light"?" apd-light":""}`,children:[(0,oe.jsx)(rt,{}),!f&&!m&&(0,oe.jsx)(it,{count:g.length+k.length,hasErrors:T>0||O>0,onOpen:()=>p(!0),initialPosition:r}),!f&&m&&(0,oe.jsx)(vt,{logs:g,consoleEntries:k,onClose:()=>p(!1),onClear:y,onClearConsole:h,onTogglePin:M,theme:S,onToggleTheme:()=>R(S==="light"?"dark":"light")})]})}0&&(module.exports={ApiDebugger,exportAsHar,generateCurl,installAxiosInterceptor,installFetchInterceptor,logStore,uninstallFetchInterceptor});
//# sourceMappingURL=index.js.map