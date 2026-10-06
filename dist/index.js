'use client';
"use strict";var $e=Object.defineProperty;var dn=Object.getOwnPropertyDescriptor;var pn=Object.getOwnPropertyNames;var ln=Object.prototype.hasOwnProperty;var cn=(e,t)=>{for(var n in t)$e(e,n,{get:t[n],enumerable:!0})},un=(e,t,n,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of pn(t))!ln.call(e,r)&&r!==n&&$e(e,r,{get:()=>t[r],enumerable:!(o=dn(t,r))||o.enumerable});return e};var mn=e=>un($e({},"__esModule",{value:!0}),e);var io={};cn(io,{ApiDebugger:()=>on,exportAsHar:()=>Be,generateCurl:()=>Ie,installAxiosInterceptor:()=>Le,installFetchInterceptor:()=>Ee,logStore:()=>E,uninstallFetchInterceptor:()=>Ne});module.exports=mn(io);var Z=require("react");var je=class{constructor(){this.logs=[];this.listeners=new Set;this.maxLogs=200;this.snapshot=[];this.getLogs=()=>(this.snapshot=this.logs,this.snapshot);this.subscribe=t=>(this.listeners.add(t),()=>this.listeners.delete(t))}setMaxLogs(t){this.maxLogs=Math.max(1,t),this.trim()}addLog(t){this.logs=[t,...this.logs],this.trim(),this.emit()}togglePin(t){this.logs=this.logs.map(n=>n.id===t?{...n,pinned:!n.pinned}:n),this.emit()}clear(){this.logs=[],this.emit()}trim(){if(this.logs.length<=this.maxLogs)return;let t=this.logs.filter(s=>s.pinned),o=this.logs.filter(s=>!s.pinned).slice(0,Math.max(0,this.maxLogs-t.length)),r=[...t,...o];r.sort((s,a)=>a.timestamp-s.timestamp),this.logs=r}emit(){this.listeners.forEach(t=>t())}},E=new je;var Oe=class{constructor(){this.entries=[];this.listeners=new Set;this.maxEntries=500;this.getEntries=()=>this.entries;this.subscribe=t=>(this.listeners.add(t),()=>this.listeners.delete(t))}setMaxEntries(t){this.maxEntries=Math.max(1,t),this.trim()}addEntry(t){let n=this.entries[0];n&&n.level===t.level&&n.preview===t.preview&&n.stack===t.stack?this.entries=[{...n,count:n.count+1,timestamp:t.timestamp},...this.entries.slice(1)]:this.entries=[t,...this.entries],this.trim(),this.emit()}clear(){this.entries=[],this.emit()}trim(){this.entries.length>this.maxEntries&&(this.entries=this.entries.slice(0,this.maxEntries))}emit(){this.listeners.forEach(t=>t())}},z=new Oe;var U="x-apd-skip";function F(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,9)}`}function V(e){if(!e)return null;try{return JSON.parse(e)}catch{return e}}function te(e){if(e==null)return null;if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return String(e)}}function X(e){if(!e)return 0;try{return new Blob([e]).size}catch{return e.length}}function _e(e){if(!e)return"0 B";let t=["B","KB","MB","GB"],n=Math.min(t.length-1,Math.floor(Math.log(e)/Math.log(1024))),o=e/Math.pow(1024,n);return`${n===0?o:o.toFixed(1)} ${t[n]}`}function ve(e){return e<1e3?`${e} ms`:`${(e/1e3).toFixed(2)} s`}function ne(e){let t=new Date(e);return t.toLocaleTimeString(void 0,{hour12:!1})+`.${String(t.getMilliseconds()).padStart(3,"0")}`}function oe(e){try{let t=typeof window!="undefined"?window.location.origin:"http://localhost",n=new URL(e,t),o={};return n.searchParams.forEach((r,s)=>{o[s]=r}),{endpoint:n.pathname,queryParams:o}}catch{return{endpoint:e,queryParams:{}}}}function ye(e){let t={};return e&&e.forEach((n,o)=>{t[o]=n}),t}function pe(e){let t={};if(!e)return t;if(typeof e.toJSON=="function")return{...e.toJSON()};if(e instanceof Headers)return ye(e);if(typeof e=="object")for(let[n,o]of Object.entries(e))o!=null&&(t[n]=String(o));return t}function re(e,t){return!t||t.length===0?!1:t.some(n=>n instanceof RegExp?n.test(e):e.includes(n))}function S(...e){return e.filter(Boolean).join(" ")}async function we(e){try{if(navigator.clipboard&&window.isSecureContext)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select();let n=document.execCommand("copy");return document.body.removeChild(t),n}catch{return!1}}var J=null,ke=!1;function fn(e){if(e==null)return null;if(typeof e=="string")return e;if(e instanceof URLSearchParams)return e.toString();if(e instanceof FormData){let t=[];return e.forEach((n,o)=>{t.push(`${o}=${n instanceof File?`[File: ${n.name}]`:n}`)}),t.join("&")}return"[binary data]"}function Ee(e={}){ke||typeof window=="undefined"||typeof window.fetch!="function"||(J=window.fetch.bind(window),ke=!0,window.fetch=async function(n,o){var N,f,h,R,C;let r=n instanceof Request?n:null,s=r?r.url:String(n);if(re(s,e.ignoreUrls))return J(n,o);let a=ye(new Headers((f=(N=o==null?void 0:o.headers)!=null?N:r==null?void 0:r.headers)!=null?f:void 0));if(a[U]){let y=new Headers((R=(h=o==null?void 0:o.headers)!=null?h:r==null?void 0:r.headers)!=null?R:void 0);return y.delete(U),r?J(new Request(r,{headers:y})):J(n,{...o,headers:y})}let d=Date.now(),c=performance.now(),m=((o==null?void 0:o.method)||(r==null?void 0:r.method)||"GET").toUpperCase(),{endpoint:p,queryParams:g}=oe(s),b=fn((C=o==null?void 0:o.body)!=null?C:null),v={id:F(),url:s,endpoint:p,method:m,requestHeaders:a,requestBody:V(b),requestBodyRaw:b,queryParams:g,timestamp:d,source:"fetch",requestSize:X(b),pinned:!1};try{let y=await J(n,o),A=Math.round(performance.now()-c),$=y.clone(),P=null;try{P=await $.text()}catch{P=null}return E.addLog({...v,duration:A,responseStatus:y.status,responseStatusText:y.statusText,responseHeaders:ye(y.headers),responseBody:V(P),responseBodyRaw:P,responseSize:X(P),success:y.ok,error:y.ok?null:`HTTP ${y.status} ${y.statusText}`}),y}catch(y){let A=Math.round(performance.now()-c);throw E.addLog({...v,duration:A,responseStatus:null,responseStatusText:"",responseHeaders:{},responseBody:null,responseBodyRaw:null,responseSize:0,success:!1,error:(y==null?void 0:y.message)||"Network error"}),y}})}function Ne(){ke&&J&&typeof window!="undefined"&&(window.fetch=J),ke=!1,J=null}var le=null,se=null,ce=null,Se=!1,ae=Symbol("apd-xhr-meta");function gn(e){let t={};return e.trim().split(/[\r\n]+/).forEach(n=>{let o=n.indexOf(":");if(o===-1)return;let r=n.slice(0,o).trim().toLowerCase(),s=n.slice(o+1).trim();r&&(t[r]=s)}),t}function at(e={}){Se||typeof window=="undefined"||typeof XMLHttpRequest=="undefined"||(le=XMLHttpRequest.prototype.open,se=XMLHttpRequest.prototype.send,ce=XMLHttpRequest.prototype.setRequestHeader,Se=!0,XMLHttpRequest.prototype.open=function(n,o,...r){let s=String(o);return this[ae]={id:F(),method:(n||"GET").toUpperCase(),url:s,startTime:0,startPerf:0,requestHeaders:{},ignored:re(s,e.ignoreUrls)},le.apply(this,[n,o,...r])},XMLHttpRequest.prototype.setRequestHeader=function(n,o){if(n.toLowerCase()===U){this[ae]&&(this[ae].ignored=!0);return}return this[ae]&&(this[ae].requestHeaders[n]=o),ce.apply(this,[n,o])},XMLHttpRequest.prototype.send=function(n){let o=this[ae];if(!o||o.ignored)return se.apply(this,[n]);o.startTime=Date.now(),o.startPerf=performance.now();let r=n==null?null:typeof n=="string"?n:n instanceof URLSearchParams?n.toString():n instanceof FormData?"[form data]":"[binary data]",s=()=>{let a=Math.round(performance.now()-o.startPerf),{endpoint:d,queryParams:c}=oe(o.url),m=gn(this.getAllResponseHeaders()||""),p=null;try{p=typeof this.responseText=="string"?this.responseText:null}catch{p=null}let g=this.status,b=g>=200&&g<400,v={id:o.id,url:o.url,endpoint:d,method:o.method,requestHeaders:o.requestHeaders,requestBody:V(r),requestBodyRaw:r,queryParams:c,responseStatus:g||null,responseStatusText:this.statusText||"",responseHeaders:m,responseBody:V(p),responseBodyRaw:p,duration:a,timestamp:o.startTime,success:b,error:b?null:g===0?"Network error":`HTTP ${g} ${this.statusText}`,source:"xhr",requestSize:X(r),responseSize:X(p),pinned:!1};E.addLog(v),this.removeEventListener("loadend",s)};return this.addEventListener("loadend",s),se.apply(this,[n])})}function st(){Se&&typeof window!="undefined"&&typeof XMLHttpRequest!="undefined"&&(le&&(XMLHttpRequest.prototype.open=le),se&&(XMLHttpRequest.prototype.send=se),ce&&(XMLHttpRequest.prototype.setRequestHeader=ce)),Se=!1,le=null,se=null,ce=null}function hn(e){let t=(e==null?void 0:e.baseURL)||"",n=(e==null?void 0:e.url)||"",o=/^https?:\/\//i.test(n)?n:`${t}${t&&!t.endsWith("/")&&!n.startsWith("/")?"/":""}${n}`;if(e!=null&&e.params&&typeof e.params=="object"){let r=bn(e.params);r&&(o+=(o.includes("?")?"&":"?")+r)}return o}function bn(e){let t=new URLSearchParams;for(let[n,o]of Object.entries(e))o!=null&&(Array.isArray(o)?o.forEach(r=>t.append(n,String(r))):t.append(n,String(o)));return t.toString()}function it(e){if(e==null)return null;if(typeof e=="string")return e;if(typeof URLSearchParams!="undefined"&&e instanceof URLSearchParams)return e.toString();if(typeof FormData!="undefined"&&e instanceof FormData){let t=[];return e.forEach((n,o)=>{t.push(`${o}=${n instanceof File?`[File: ${n.name}]`:n}`)}),t.join("&")}return te(e)}function Le(e,t={}){var s;if(!e||!e.interceptors||typeof((s=e.interceptors.request)==null?void 0:s.use)!="function")return()=>{};if(e.__apiDebuggerInstalled)return()=>{};e.__apiDebuggerInstalled=!0;let n=e.interceptors.request.use(a=>{let d={id:F(),startTime:Date.now(),startPerf:performance.now(),requestBodyRaw:it(a.data),requestHeadersSnapshot:pe(a.headers)};return a.__apdMeta=d,a.headers&&typeof a.headers.set=="function"?a.headers.set(U,"1"):a.headers={...a.headers||{},[U]:"1"},a});function o(a,d,c){var A,$,P,Q,_,j;if(!a)return;let m=hn(a);if(re(m,t.ignoreUrls))return;let p=a.__apdMeta||{id:F(),startTime:Date.now(),startPerf:performance.now(),requestBodyRaw:it(a.data),requestHeadersSnapshot:pe(a.headers)},g=Math.round(performance.now()-p.startPerf),{endpoint:b,queryParams:v}=oe(m),N=pe(a.headers),f=Object.keys(N).length>0?N:p.requestHeadersSnapshot;delete f[U];let h=p.requestBodyRaw,R=(d==null?void 0:d.data)!==void 0?te(d.data):null,C=(P=($=d==null?void 0:d.status)!=null?$:(A=c==null?void 0:c.response)==null?void 0:A.status)!=null?P:null,y={id:p.id,url:m,endpoint:b,method:(a.method||"get").toUpperCase(),requestHeaders:f,requestBody:(Q=V(h))!=null?Q:h,requestBodyRaw:h,queryParams:v,responseStatus:C,responseStatusText:(_=d==null?void 0:d.statusText)!=null?_:"",responseHeaders:pe(d==null?void 0:d.headers),responseBody:(j=d==null?void 0:d.data)!=null?j:null,responseBodyRaw:R,duration:g,timestamp:p.startTime,success:!c&&!!C&&C<400,error:c?c.message||"Request failed":null,source:"axios",requestSize:X(h),responseSize:X(R),pinned:!1};E.addLog(y)}let r=e.interceptors.response.use(a=>(o(a.config,a),a),a=>(o(a==null?void 0:a.config,a==null?void 0:a.response,a),Promise.reject(a)));return()=>{e.interceptors.request.eject(n),e.interceptors.response.eject(r),e.__apiDebuggerInstalled=!1}}var dt=["log","info","warn","error","debug"],Fe={},ue=null,me=null,Xe=!1;function xn(e,t=new WeakSet){var n;if(e===null)return"null";if(e===void 0)return"undefined";if(typeof e=="string")return e;if(typeof e=="number"||typeof e=="boolean")return String(e);if(e instanceof Error)return`${e.name}: ${e.message}`;if(typeof e=="function")return e.name?`\u0192 ${e.name}()`:"\u0192 ()";if(typeof e=="object"){if(t.has(e))return"[Circular]";t.add(e);try{return(n=JSON.stringify(e,(o,r)=>typeof r=="bigint"?r.toString():r,2))!=null?n:String(e)}catch{return Array.isArray(e)?"[Array]":"[Object]"}}return String(e)}function vn(e){for(let t of e)if(t instanceof Error&&t.stack)return t.stack;return null}function Ue(e,t,n){let o=t.map(r=>xn(r));return{id:F(),level:e,parts:o,preview:o.join(" "),stack:vn(t),timestamp:Date.now(),source:n,count:1}}function pt(e={}){var n,o;if(Xe||typeof window=="undefined"||typeof console=="undefined")return;Xe=!0;let t=(n=e.levels)!=null?n:dt;for(let r of t){let s=(o=console[r])==null?void 0:o.bind(console);s&&(Fe[r]=s,console[r]=(...a)=>{z.addEntry(Ue(r,a,"console")),s(...a)})}ue=r=>{let s=r.error?[r.error]:[r.message],a=Ue("error",s,"window.onerror");z.addEntry({...a,preview:a.preview||`${r.message} (${r.filename}:${r.lineno}:${r.colno})`})},window.addEventListener("error",ue),me=r=>{let s=r.reason,a=Ue("error",[s],"unhandledrejection");z.addEntry({...a,preview:`Unhandled promise rejection: ${a.preview}`})},window.addEventListener("unhandledrejection",me)}function lt(){if(typeof console!="undefined")for(let e of dt){let t=Fe[e];t&&(console[e]=t)}typeof window!="undefined"&&(ue&&window.removeEventListener("error",ue),me&&window.removeEventListener("unhandledrejection",me)),Fe={},ue=null,me=null,Xe=!1}var Ve=new WeakMap,fe=null,ge=null,Je=!1;function ct(){Je||typeof document=="undefined"||(Je=!0,fe=document.createElement.bind(document),ge=document.createElementNS.bind(document),document.createElement=function(t,n){let o=fe(t,n);return Ve.set(o,new Error),o},document.createElementNS=function(t,n,o){let r=ge(t,n,o);return Ve.set(r,new Error),r})}function ut(){fe&&(document.createElement=fe),ge&&(document.createElementNS=ge),Je=!1,fe=null,ge=null}function mt(e){return Ve.get(e)}function ft(e){let t;try{t=new URL(e,window.location.href)}catch{return()=>{}}if(t.origin!==window.location.origin)return()=>{};let n=new Set,o=new AbortController,r=!1;async function s(){if(!r){r=!0;try{let d=await fetch(t.toString(),{cache:"no-store",credentials:"same-origin",signal:o.signal});if(!d.ok)return;let c=await d.json();if(o.signal.aborted||!Array.isArray(c))return;for(let m of c.slice().reverse()){if(!m||typeof m!="object")continue;let p=m;p.source!=="server-fetch"||typeof p.id!="string"||n.has(p.id)||(n.add(p.id),E.addLog(p))}if(n.size>1e3){let m=n.values();for(;n.size>500;){let p=m.next();if(p.done)break;n.delete(p.value)}}}catch{}finally{r=!1}}}s();let a=window.setInterval(()=>{s()},2e3);return()=>{window.clearInterval(a),o.abort()}}var he=require("react");function gt(){let e=(0,he.useSyncExternalStore)(E.subscribe,E.getLogs,E.getLogs),t=(0,he.useCallback)(()=>E.clear(),[]),n=(0,he.useCallback)(o=>E.togglePin(o),[]);return{logs:e,clear:t,togglePin:n}}var Ce=require("react");function ht(){let e=(0,Ce.useSyncExternalStore)(z.subscribe,z.getEntries,z.getEntries),t=(0,Ce.useCallback)(()=>z.clear(),[]);return{entries:e,clear:t}}var bt=require("react");function xt(e,t,n=!0){(0,bt.useEffect)(()=>{if(!n||typeof window=="undefined")return;function o(r){let s=!e.ctrl||r.ctrlKey||r.metaKey,a=!e.shift||r.shiftKey;s&&a&&r.key.toLowerCase()===e.key.toLowerCase()&&(r.preventDefault(),t())}return window.addEventListener("keydown",o),()=>window.removeEventListener("keydown",o)},[e.ctrl,e.shift,e.key,t,n])}var Re=require("react");function Ke(e){return e===" "?"space":e.toLowerCase()}function yn(e){var o;let t=e;if(!t)return!1;let n=(o=t.tagName)==null?void 0:o.toLowerCase();return n==="input"||n==="textarea"||n==="select"||t.isContentEditable}function vt(e,t){if(typeof window=="undefined")return()=>{};let n=e.map(Ke),o=new Set;function r(d){if(yn(d.target))return;let c=Ke(d.key),m=o.has(c);o.add(c),!m&&n.every(p=>o.has(p))&&(d.preventDefault(),t())}function s(d){o.delete(Ke(d.key))}function a(){o.clear()}return window.addEventListener("keydown",r),window.addEventListener("keyup",s),window.addEventListener("blur",a),()=>{window.removeEventListener("keydown",r),window.removeEventListener("keyup",s),window.removeEventListener("blur",a)}}function yt(e,t,n=!0){let o=(0,Re.useRef)(t);o.current=t,(0,Re.useEffect)(()=>{if(n)return vt(e,()=>o.current())},[e.join(","),n])}var Et=require("react");var wt=`
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

.apd-tree {
  border: 1px solid var(--apd-border);
  border-radius: 8px;
  background: var(--apd-panel-alt);
  padding: 8px 6px;
  font-family: var(--apd-mono);
  font-size: 12px;
  max-height: 460px;
  overflow: auto;
}
.apd-tree-node { }
.apd-tree-row {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 2px 4px;
  border-radius: 4px;
  cursor: default;
  white-space: nowrap;
}
.apd-tree-row.apd-tree-clickable { cursor: pointer; }
.apd-tree-row.apd-tree-clickable:hover { background: var(--apd-panel); }
.apd-tree-row.apd-tree-selected-row {
  background: rgba(34,211,238,0.12);
  outline: 1px solid var(--apd-accent);
}
.apd-tree-prefix {
  color: var(--apd-text-faint);
  white-space: pre;
  flex-shrink: 0;
}
.apd-tree-toggle {
  width: 10px;
  flex-shrink: 0;
  color: var(--apd-text-faint);
  text-align: center;
  font-size: 9px;
}
.apd-tree-toggle-leaf { color: var(--apd-text-faint); opacity: 0.5; }
.apd-tree-tag { color: var(--apd-text); flex-shrink: 0; }
.apd-tree-tag.apd-tree-selected-tag { color: var(--apd-accent); font-weight: 700; }
.apd-tree-tag .apd-tree-class { color: #86efac; }
.apd-tree-tag .apd-tree-id { color: var(--apd-warn); }
.apd-tree-selected-label {
  font-size: 10px;
  font-weight: 700;
  color: var(--apd-accent);
  flex-shrink: 0;
}
.apd-tree-component {
  font-size: 10px;
  padding: 0 5px;
  border-radius: 4px;
  background: rgba(34,211,238,0.15);
  color: var(--apd-accent);
  flex-shrink: 0;
}
.apd-tree-source {
  color: var(--apd-text-faint);
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 10.5px;
}
.apd-tree-source-link { cursor: pointer; text-decoration: none; }
.apd-tree-source-link:hover { color: var(--apd-accent); text-decoration: underline; }
.apd-tree-truncated {
  color: var(--apd-text-faint);
  font-size: 10.5px;
  padding: 2px 4px;
  font-style: italic;
}

.apd-datasource-badge {
  font-size: 9px;
  font-weight: 700;
  padding: 0 5px;
  border-radius: 4px;
  letter-spacing: 0.03em;
  flex-shrink: 0;
}
.apd-datasource-api { background: rgba(52,211,153,0.18); color: var(--apd-success); }
.apd-datasource-static { background: rgba(139,147,163,0.15); color: var(--apd-text-dim); }

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
`;var kt="next-api-debugger-styles";function Nt(){return(0,Et.useEffect)(()=>{if(typeof document=="undefined"||document.getElementById(kt))return;let e=document.createElement("style");e.id=kt,e.textContent=wt,document.head.appendChild(e)},[]),null}var T=require("react"),St="apd-button-position",Te=56,Lt=5;function Pe(e){return typeof window=="undefined"?e:{x:Math.min(Math.max(8,e.x),window.innerWidth-Te-8),y:Math.min(Math.max(8,e.y),window.innerHeight-Te-8)}}function wn(){return typeof window=="undefined"?{x:24,y:24}:{x:window.innerWidth-Te-24,y:window.innerHeight-Te-24}}function Ct(e){let[t,n]=(0,T.useState)(()=>{if(typeof window=="undefined")return e!=null?e:{x:24,y:24};try{let p=sessionStorage.getItem(St);if(p)return Pe(JSON.parse(p))}catch{}return Pe(e!=null?e:wn())}),o=(0,T.useRef)(!1),r=(0,T.useRef)(!1),s=(0,T.useRef)({pointerX:0,pointerY:0,posX:0,posY:0}),a=(0,T.useCallback)(p=>{o.current=!0,r.current=!1,s.current={pointerX:p.clientX,pointerY:p.clientY,posX:t.x,posY:t.y},p.currentTarget.setPointerCapture(p.pointerId)},[t.x,t.y]),d=(0,T.useCallback)(p=>{if(!o.current)return;let g=p.clientX-s.current.pointerX,b=p.clientY-s.current.pointerY;(Math.abs(g)>Lt||Math.abs(b)>Lt)&&(r.current=!0),n(Pe({x:s.current.posX+g,y:s.current.posY+b}))},[]),c=(0,T.useCallback)(()=>{o.current=!1},[]);(0,T.useEffect)(()=>{try{sessionStorage.setItem(St,JSON.stringify(t))}catch{}},[t]),(0,T.useEffect)(()=>{function p(){n(g=>Pe(g))}return window.addEventListener("resize",p),()=>window.removeEventListener("resize",p)},[]);let m=(0,T.useCallback)(()=>r.current,[]);return{position:t,onPointerDown:a,onPointerMove:d,onPointerUp:c,wasDragged:m}}var W=require("react/jsx-runtime");function Rt({count:e,hasErrors:t,onOpen:n,initialPosition:o}){let{position:r,onPointerDown:s,onPointerMove:a,onPointerUp:d,wasDragged:c}=Ct(o);return(0,W.jsxs)("button",{type:"button",className:"apd-btn",style:{left:r.x,top:r.y},onPointerDown:s,onPointerMove:a,onPointerUp:d,onClick:()=>{c()||n()},"aria-label":"Open API debugger",title:"API Debugger (drag to move)",children:[(0,W.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,W.jsx)("polyline",{points:"16 18 22 12 16 6"}),(0,W.jsx)("polyline",{points:"8 6 2 12 8 18"})]}),e>0&&(0,W.jsx)("span",{className:S("apd-btn-dot",t&&"apd-has-errors"),children:e>99?"99+":e})]})}var D=require("react");var Y=require("react/jsx-runtime");function We({value:e,onChange:t}){return(0,Y.jsxs)("div",{className:"apd-search",children:[(0,Y.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,Y.jsx)("circle",{cx:"11",cy:"11",r:"7"}),(0,Y.jsx)("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]}),(0,Y.jsx)("input",{type:"text",placeholder:"Filter by URL, endpoint, method or status code...",value:e,onChange:n=>t(n.target.value),spellCheck:!1})]})}var K=require("react/jsx-runtime");function Pt({status:e,onStatusChange:t,methods:n,activeMethods:o,onToggleMethod:r}){return(0,K.jsxs)(K.Fragment,{children:[(0,K.jsx)("button",{type:"button",className:S("apd-chip apd-chip-success",e==="success"&&"apd-active"),onClick:()=>t(e==="success"?"all":"success"),children:"Success"}),(0,K.jsx)("button",{type:"button",className:S("apd-chip apd-chip-failed",e==="failed"&&"apd-active"),onClick:()=>t(e==="failed"?"all":"failed"),children:"Failed"}),n.map(s=>(0,K.jsx)("button",{type:"button",className:S("apd-chip",o.includes(s)&&"apd-active"),onClick:()=>r(s),children:s},s))]})}var I=require("react/jsx-runtime");function kn(e){return["GET","POST","PUT","PATCH","DELETE"].includes(e.toUpperCase())?`apd-method-${e.toUpperCase()}`:"apd-method-OTHER"}function Tt({log:e,selected:t,onSelect:n,onTogglePin:o}){var r;return(0,I.jsxs)("div",{className:S("apd-item",t&&"apd-selected"),onClick:n,role:"button",tabIndex:0,onKeyDown:s=>s.key==="Enter"&&n(),children:[(0,I.jsxs)("div",{className:"apd-item-row1",children:[(0,I.jsx)("span",{className:S("apd-method",kn(e.method)),children:e.method}),(0,I.jsx)("span",{className:"apd-item-url",title:e.url,children:e.endpoint}),(0,I.jsx)("span",{className:S("apd-status-dot",e.success?"apd-ok":"apd-fail")}),e.pinned&&(0,I.jsx)("button",{type:"button",className:"apd-pin-star",onClick:s=>{s.stopPropagation(),o()},title:"Unpin","aria-label":"Unpin request",style:{background:"none",border:"none",cursor:"pointer",padding:0},children:"\u2605"})]}),(0,I.jsxs)("div",{className:"apd-item-row2",children:[(0,I.jsx)("span",{children:(r=e.responseStatus)!=null?r:e.error?"ERR":"\u2014"}),(0,I.jsx)("span",{children:ve(e.duration)}),(0,I.jsx)("span",{children:ne(e.timestamp)}),(0,I.jsx)("span",{style:{marginLeft:"auto",textTransform:"uppercase"},children:e.source})]})]})}var G=require("react/jsx-runtime");function Ht({logs:e,selectedId:t,onSelect:n,onTogglePin:o}){return e.length===0?(0,G.jsx)("div",{className:"apd-list",children:(0,G.jsxs)("div",{className:"apd-empty",children:["No requests captured yet.",(0,G.jsx)("br",{}),"Make an API call and it'll show up here."]})}):(0,G.jsx)("div",{className:"apd-list",children:e.map(r=>(0,G.jsx)(Tt,{log:r,selected:r.id===t,onSelect:()=>n(r.id),onTogglePin:()=>o(r.id)},r.id))})}var qe=require("react");var At=require("react");var Mt=require("react/jsx-runtime");function He({getText:e,label:t,icon:n}){let[o,r]=(0,At.useState)(!1);async function s(){await we(e())&&(r(!0),setTimeout(()=>r(!1),1200))}return(0,Mt.jsxs)("button",{type:"button",className:S("apd-action-btn",o&&"apd-copied"),onClick:s,children:[n,o?"Copied":t]})}var B=require("react");var En=/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(\.\d+)?([eE][+-]?\d+)?)/g;function Nn(e){return e.replace(En,t=>{let n="apd-json-num";return/^"/.test(t)?n=/:$/.test(t)?"apd-json-key":"apd-json-str":/true|false/.test(t)?n="apd-json-bool":/null/.test(t)&&(n="apd-json-null"),`<span class="${n}">${t}</span>`})}function Sn(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Ln(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function It(e,t){if(e!=null&&typeof e=="object")return{content:JSON.stringify(e,null,2),isJson:!0};if(typeof e=="string")try{return{content:JSON.stringify(JSON.parse(e),null,2),isJson:!0}}catch{return{content:t!=null?t:e,isJson:!1}}return{content:t!=null?t:String(e!=null?e:""),isJson:!1}}function qt(e,t,n){let o=Sn(e),r=0,s=o;if(n){let d=new RegExp(Ln(n),"gi");s=o.replace(d,c=>(r+=1,`<mark class='apd-json-highlight'>${c}</mark>`))}return{html:t?Nn(s):s,matchCount:r}}var q=require("react/jsx-runtime");function Ae({value:e,raw:t,searchable:n=!0}){let[o,r]=(0,B.useState)(""),[s,a]=(0,B.useState)(0),d=(0,B.useRef)(null),c=(0,B.useRef)(""),{content:m,isJson:p}=It(e,t),g=o.trim(),{html:b,matchCount:v}=(0,B.useMemo)(()=>qt(m,p,g),[m,p,g]);(0,B.useEffect)(()=>{let f=g!==c.current;c.current=g,(f||s>=v)&&a(0)},[g,v]),(0,B.useEffect)(()=>{var h;if(!d.current)return;let f=d.current.querySelectorAll("mark.apd-json-highlight");f.forEach((R,C)=>R.classList.toggle("apd-active",C===s)),(h=f[s])==null||h.scrollIntoView({block:"center",behavior:"smooth"})},[b,s]);function N(f){v!==0&&a(h=>(h+f+v)%v)}return(0,q.jsxs)("div",{children:[n&&m.length>0&&(0,q.jsxs)("div",{className:"apd-json-search",children:[(0,q.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,q.jsx)("circle",{cx:"11",cy:"11",r:"7"}),(0,q.jsx)("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]}),(0,q.jsx)("input",{type:"text",placeholder:"Find in payload...",value:o,onChange:f=>r(f.target.value),onKeyDown:f=>{f.key==="Enter"&&(f.preventDefault(),N(f.shiftKey?-1:1))},spellCheck:!1}),o&&(0,q.jsx)("span",{className:"apd-json-search-count",children:v>0?`${s+1} / ${v}`:"No matches"}),o&&v>0&&(0,q.jsxs)("div",{className:"apd-json-search-nav",children:[(0,q.jsx)("button",{type:"button",onClick:()=>N(-1),"aria-label":"Previous match",title:"Previous match (Shift+Enter)",children:"\u2191"}),(0,q.jsx)("button",{type:"button",onClick:()=>N(1),"aria-label":"Next match",title:"Next match (Enter)",children:"\u2193"})]})]}),(0,q.jsx)("pre",{ref:d,className:"apd-json",dangerouslySetInnerHTML:{__html:b}})]})}function Me(e){return`'${e.replace(/'/g,"'\\''")}'`}function Cn(e){let t=e.trim();if(!t||!(t.startsWith("{")||t.startsWith("[")))return!1;try{return JSON.parse(t),!0}catch{return!1}}function Ie(e){let t=[`curl -X ${e.method} ${Me(e.url)}`],n=Object.keys(e.requestHeaders).some(o=>o.toLowerCase()==="content-type");for(let[o,r]of Object.entries(e.requestHeaders))/^(host|content-length|connection)$/i.test(o)||t.push(`  -H ${Me(`${o}: ${r}`)}`);return e.requestBodyRaw&&(!n&&Cn(e.requestBodyRaw)&&t.push(`  -H ${Me("Content-Type: application/json")}`),t.push(`  --data-raw ${Me(e.requestBodyRaw)}`)),t.join(` \\
`)}var l=require("react/jsx-runtime");function ie({title:e,count:t,defaultOpen:n=!0,children:o}){let[r,s]=(0,qe.useState)(n);return(0,l.jsxs)("div",{className:"apd-section",children:[(0,l.jsxs)("div",{className:"apd-section-header",onClick:()=>s(a=>!a),children:[(0,l.jsxs)("span",{children:[e,typeof t=="number"?` (${t})`:""]}),(0,l.jsx)("span",{children:r?"\u2212":"+"})]}),r&&(0,l.jsx)("div",{className:"apd-section-body",children:o})]})}function Ye({data:e}){let t=Object.entries(e);return t.length===0?(0,l.jsx)("div",{className:"apd-section-body apd-empty-body",children:"None"}):(0,l.jsx)("div",{className:"apd-kv",children:t.map(([n,o])=>(0,l.jsxs)(qe.Fragment,{children:[(0,l.jsx)("div",{className:"apd-kv-key",children:n}),(0,l.jsx)("div",{className:"apd-kv-val",children:o})]},n))})}function Dt({log:e,onTogglePin:t}){var s,a,d,c,m;if(!e)return(0,l.jsx)("div",{className:"apd-detail",children:(0,l.jsx)("div",{className:"apd-detail-empty",children:"Select a request to see full details"})});let n=Ie(e),o=(a=(s=te(e.requestBody))!=null?s:e.requestBodyRaw)!=null?a:"",r=(c=(d=te(e.responseBody))!=null?d:e.responseBodyRaw)!=null?c:"";return(0,l.jsxs)("div",{className:"apd-detail",children:[(0,l.jsxs)("div",{className:"apd-detail-header",children:[(0,l.jsxs)("div",{className:"apd-detail-url",children:[(0,l.jsx)("strong",{children:e.method})," ",e.url]}),(0,l.jsx)("button",{type:"button",className:"apd-action-btn",onClick:()=>t(e.id),title:e.pinned?"Unpin":"Pin this request",children:e.pinned?"\u2605 Pinned":"\u2606 Pin"})]}),(0,l.jsxs)("div",{className:"apd-meta-grid",children:[(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{className:"apd-meta-label",children:"Status"}),(0,l.jsxs)("div",{className:"apd-meta-value",style:{color:e.success?"var(--apd-success)":"var(--apd-error)"},children:[(m=e.responseStatus)!=null?m:"Failed"," ",e.responseStatusText]})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{className:"apd-meta-label",children:"Duration"}),(0,l.jsx)("div",{className:"apd-meta-value",children:ve(e.duration)})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{className:"apd-meta-label",children:"Time"}),(0,l.jsx)("div",{className:"apd-meta-value",children:ne(e.timestamp)})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{className:"apd-meta-label",children:"Source"}),(0,l.jsx)("div",{className:"apd-meta-value",children:e.source})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{className:"apd-meta-label",children:"Req. size"}),(0,l.jsx)("div",{className:"apd-meta-value",children:_e(e.requestSize)})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{className:"apd-meta-label",children:"Res. size"}),(0,l.jsx)("div",{className:"apd-meta-value",children:_e(e.responseSize)})]})]}),e.error&&(0,l.jsxs)("div",{className:"apd-section",style:{borderColor:"var(--apd-error)"},children:[(0,l.jsx)("div",{className:"apd-section-header",style:{color:"var(--apd-error)"},children:"Error"}),(0,l.jsx)("div",{className:"apd-section-body",children:e.error})]}),(0,l.jsxs)("div",{className:"apd-actions",children:[(0,l.jsx)(He,{label:"Copy cURL",getText:()=>n}),(0,l.jsx)(He,{label:"Copy Request",getText:()=>o}),(0,l.jsx)(He,{label:"Copy Response",getText:()=>r})]}),(0,l.jsx)(ie,{title:"cURL",children:(0,l.jsx)(Ae,{value:n,searchable:!1})}),(0,l.jsx)(ie,{title:"Query Params",count:Object.keys(e.queryParams).length,defaultOpen:!1,children:(0,l.jsx)(Ye,{data:e.queryParams})}),(0,l.jsx)(ie,{title:"Request Headers",count:Object.keys(e.requestHeaders).length,defaultOpen:!1,children:(0,l.jsx)(Ye,{data:e.requestHeaders})}),(0,l.jsx)(ie,{title:"Request Body",children:e.requestBodyRaw?(0,l.jsx)(Ae,{value:e.requestBody,raw:e.requestBodyRaw}):(0,l.jsx)("div",{className:"apd-empty-body",children:"No body"})}),(0,l.jsx)(ie,{title:"Response Headers",count:Object.keys(e.responseHeaders).length,defaultOpen:!1,children:(0,l.jsx)(Ye,{data:e.responseHeaders})}),(0,l.jsx)(ie,{title:"Response Body",children:e.responseBodyRaw?(0,l.jsx)(Ae,{value:e.responseBody,raw:e.responseBodyRaw}):(0,l.jsx)("div",{className:"apd-empty-body",children:"No body"})})]})}var zt=require("react");var L=require("react/jsx-runtime"),Rn={log:"\u25B8",info:"\u2139",warn:"\u26A0",error:"\u2715",debug:"\u2699"};function Pn({entry:e}){var o;let[t,n]=(0,zt.useState)(!1);return(0,L.jsxs)("div",{className:`apd-console-item apd-console-${e.level}`,children:[(0,L.jsx)("span",{className:"apd-console-icon",children:(o=Rn[e.level])!=null?o:"\u25B8"}),(0,L.jsxs)("div",{className:"apd-console-body",children:[(0,L.jsx)("div",{className:"apd-console-preview",children:e.preview||"(empty)"}),(0,L.jsxs)("div",{className:"apd-console-meta",children:[(0,L.jsx)("span",{children:ne(e.timestamp)}),e.source!=="console"&&(0,L.jsx)("span",{children:e.source}),e.stack&&(0,L.jsx)("button",{type:"button",className:"apd-console-toggle-stack",onClick:()=>n(r=>!r),children:t?"Hide stack trace":"Show stack trace"})]}),t&&e.stack&&(0,L.jsx)("div",{className:"apd-console-stack",children:e.stack})]}),e.count>1&&(0,L.jsx)("span",{className:"apd-console-count",children:e.count})]})}function Bt({entries:e}){return e.length===0?(0,L.jsx)("div",{className:"apd-console-list",children:(0,L.jsxs)("div",{className:"apd-empty",children:["Nothing logged yet.",(0,L.jsx)("br",{}),"console.log/warn/error and uncaught errors will show up here."]})}):(0,L.jsx)("div",{className:"apd-console-list",children:e.map(t=>(0,L.jsx)(Pn,{entry:t},t.id))})}var O=require("react");var xe="data-apd-source";function Tn(e){let t=e.getAttribute(xe);if(!t)return null;let n=t.match(/^(.*):(\d+):(\d+)$/);return n?{file:n[1],line:Number(n[2]),column:Number(n[3]),confidence:"exact",origin:"build-plugin"}:{file:t,confidence:"exact",origin:"build-plugin"}}function Ge(e){let t=Object.keys(e).find(n=>n.startsWith("__reactFiber$")||n.startsWith("__reactInternalInstance$"));return t?e[t]:null}function Hn(e){let t=Ge(e);for(;t;){let n=t._debugSource;if(n&&n.fileName)return{file:n.fileName,line:typeof n.lineNumber=="number"?n.lineNumber:void 0,column:typeof n.columnNumber=="number"?n.columnNumber:void 0,confidence:"exact",origin:"react"};t=t.return}return null}function An(e){let t=Ge(e);for(;t;){let n=t.type;if(typeof n=="function"&&n.name)return n.name;if(n&&typeof n=="object"&&n.displayName)return n.displayName;t=t.return}return null}function $t(e){return e.__vueParentComponent?{version:3,inst:e.__vueParentComponent}:e.__vue__?{version:2,inst:e.__vue__}:null}function Mn(e){var n,o;let t=e;for(;t;){let r=$t(t);if(r){let s=r.version===3?(n=r.inst.type)==null?void 0:n.__file:(o=r.inst.$options)==null?void 0:o.__file;if(s)return{file:s,confidence:"exact",origin:"vue"}}t=t.parentElement}return null}function In(e){var n,o,r,s;let t=e;for(;t;){let a=$t(t);if(a){let d=a.version===3?((n=a.inst.type)==null?void 0:n.__name)||((o=a.inst.type)==null?void 0:o.name):((r=a.inst.$options)==null?void 0:r.name)||((s=a.inst.$options)==null?void 0:s._componentTag);if(d)return d}t=t.parentElement}return null}function qn(e){var n,o;let t=window.ng;if(!(t!=null&&t.getComponent))return null;try{let r=t.getComponent(e);return(o=(n=r==null?void 0:r.constructor)==null?void 0:n.name)!=null?o:null}catch{return null}}var Dn=/(?:\()?(https?:\/\/[^\s)]+|\/[^\s)]+|[A-Za-z]:\\[^\s)]+):(\d+):(\d+)\)?/;function zn(e){return/next-api-debugger|core\/inspector\/|node_modules/.test(e)}function Bn(e){let t=mt(e);if(!(t!=null&&t.stack))return null;let n=t.stack.split(`
`).slice(1);for(let o of n){if(zn(o))continue;let r=o.match(Dn);if(r)return{file:r[1],line:Number(r[2]),column:Number(r[3]),confidence:"approximate",origin:"stack-trace"}}return null}var be;async function $n(){if(be!==void 0)return be;try{be=await(await fetch(location.href,{cache:"force-cache"})).text()}catch{be=null}return be}function jn(e){if(e.id)return`id="${e.id}"`;for(let t of["data-testid","name"]){let n=e.getAttribute(t);if(n)return`${t}="${n}"`}return e.className&&typeof e.className=="string"?`class="${e.className}"`:null}async function On(e){let t=location.pathname||"/",n=await $n();if(n){let o=jn(e);if(o){let r=n.indexOf(o);if(r!==-1){let s=n.slice(0,r).split(`
`).length;return{file:t,line:s,confidence:"approximate",origin:"plain-html"}}}}return{file:t,confidence:"approximate",origin:"plain-html"}}function Ze(e){let t=Tn(e);if(t)return t;let n=Hn(e);if(n)return n;let o=Mn(e);return o||Bn(e)}async function jt(e){let t=Ze(e);return t||(Ge(e)?null:On(e))}function De(e){var t,n;return(n=(t=An(e))!=null?t:In(e))!=null?n:qn(e)}var _n=["display","position","top","right","bottom","left","width","height","color","background-color","font-family","font-size","font-weight","line-height","text-align","flex-direction","justify-content","align-items","gap","grid-template-columns","grid-template-rows","z-index","opacity","overflow","box-sizing","cursor"];function H(e){let t=parseFloat(e);return Number.isFinite(t)?t:0}function Un(e){return{margin:{top:H(e.marginTop),right:H(e.marginRight),bottom:H(e.marginBottom),left:H(e.marginLeft)},border:{top:H(e.borderTopWidth),right:H(e.borderRightWidth),bottom:H(e.borderBottomWidth),left:H(e.borderLeftWidth)},padding:{top:H(e.paddingTop),right:H(e.paddingRight),bottom:H(e.paddingBottom),left:H(e.paddingLeft)},content:{width:H(e.width),height:H(e.height)}}}function Fn(e){let t=[],n=e.parentElement;for(;n&&n.tagName.toLowerCase()!=="html";)t.push({tag:n.tagName.toLowerCase(),id:n.id||null,classes:Array.from(n.classList)}),n=n.parentElement;return t}async function Ot(e){let t=getComputedStyle(e),n=e.getBoundingClientRect(),o={};Array.from(e.attributes).forEach(d=>{d.name!==xe&&(o[d.name]=d.value)});let r={};_n.forEach(d=>{r[d]=t.getPropertyValue(d)});let a=e.children.length===0&&(e.textContent||"").trim().slice(0,120)||null;return{tag:e.tagName.toLowerCase(),id:e.id||null,classes:Array.from(e.classList),attributes:o,rect:{x:n.x,y:n.y,width:n.width,height:n.height},box:Un(t),computedStyles:r,ancestors:Fn(e),childCount:e.children.length,textPreview:a,componentName:De(e),source:await jt(e)}}var _t=3;function Qe(e,t){if(e!=null){if(typeof e=="string"){t(e);return}if(typeof e=="number"||typeof e=="boolean"){t(String(e));return}if(Array.isArray(e)){e.forEach(n=>Qe(n,t));return}typeof e=="object"&&Object.values(e).forEach(n=>Qe(n,t))}}function Ut(e){let t=new Map;for(let n of e)Qe(n.responseBody,o=>{let r=o.trim();r.length<_t||t.has(r)||t.set(r,{log:n})});return t}function Ft(e,t){for(let n of e){let o=n.trim();if(o.length<_t)continue;let r=t.get(o);if(r)return{kind:"api",endpoint:r.log.endpoint,method:r.log.method,matchedValue:o}}return e.some(n=>n.trim().length>0)?{kind:"static"}:{kind:"unknown"}}var Xn=8,et=40,Vn=20,Jn=["src","href","alt","title","value","placeholder"];function Kn(e){let t={};return Array.from(e.attributes).forEach(n=>{n.name!==xe&&(t[n.name]=n.value)}),t}function Wn(e){let t=[],n=Array.from(e.childNodes).filter(o=>o.nodeType===Node.TEXT_NODE).map(o=>(o.textContent||"").trim()).filter(Boolean).join(" ");n&&t.push(n);for(let o of Jn){let r=e.getAttribute(o);r&&t.push(r)}return t}function Xt(e,t,n,o,r){return{tag:e.tagName.toLowerCase(),id:e.id||null,classes:Array.from(e.classList),attributes:Kn(e),componentName:De(e),source:Ze(e),dataSource:Ft(Wn(e),t),textPreview:o&&(e.textContent||"").trim().slice(0,80)||null,children:n,truncatedChildCount:r}}function Vt(e,t,n){let o=Array.from(e.children),r=o.slice(0,et),s=n<Xn?r.map(d=>Vt(d,t,n+1)):[],a=o.length>et?o.length-et:void 0;return Xt(e,t,s,e.children.length===0,a)}function Yn(e){let t=[],n=e.parentElement;for(;n&&n.tagName.toLowerCase()!=="html"&&t.length<Vn;)t.push(n),n=n.parentElement;return t.reverse()}function Jt(e,t){let n=Ut(t),o={...Vt(e,n,0),isSelected:!0},r=Yn(e),s=o;for(let a=r.length-1;a>=0;a--)s={...Xt(r[a],n,[s],!1),isAncestorPath:!0};return s}function Gn(e){return!!(e!=null&&e.closest(".apd-root"))}function Kt(e,t,n){let o=!0;function r(m){let p=document.elementFromPoint(m.clientX,m.clientY);return Gn(p)?null:p}function s(m){o&&(t==null||t(r(m)))}function a(m){if(!o)return;let p=r(m);p&&(m.preventDefault(),m.stopPropagation(),c(),e(p))}function d(m){m.key==="Escape"&&(c(),n==null||n())}function c(){o=!1,window.removeEventListener("mousemove",s,!0),window.removeEventListener("click",a,!0),window.removeEventListener("keydown",d,!0)}return window.addEventListener("mousemove",s,!0),window.addEventListener("click",a,!0),window.addEventListener("keydown",d,!0),{cancel:()=>{c(),n==null||n()}}}function Wt(){let e=document.createElement("div");e.className="apd-inspect-highlight",e.style.display="none";function t(o){e.style.display="",e.style.left=`${o.left}px`,e.style.top=`${o.top}px`,e.style.width=`${o.width}px`,e.style.height=`${o.height}px`}function n(){e.style.display="none"}return{el:e,show:t,hide:n}}function ze(e,t){var d,c;if(!t||e.origin==="plain-html")return null;let n=t.replace(/\\/g,"/").replace(/\/+$/,""),o=e.file.replace(/\\/g,"/").replace(/^\.\//,"");if(!n||!/^(?:\/|[A-Za-z]:\/)/.test(n)||/^[a-z][a-z\d+.-]*:\/\//i.test(o)||o.split("/").includes("..")||!/\.(?:[cm]?[jt]sx?|vue|svelte|astro|html?|mdx|php)$/i.test(o))return null;let r=/^(?:\/|[A-Za-z]:\/)/.test(o),s=r?o:`${n}/${o}`;return r&&s!==n&&!s.startsWith(`${n}/`)?null:`vscode://file/${encodeURI(s).replace(/#/g,"%23").replace(/\?/g,"%3F")}:${(d=e.line)!=null?d:1}:${(c=e.column)!=null?c:1}`}var Yt=require("react");var k=require("react/jsx-runtime"),Zn=3;function Qn({info:e}){return e.kind==="unknown"?null:e.kind==="api"?(0,k.jsx)("span",{className:"apd-datasource-badge apd-datasource-api",title:`Matches a value from a captured response: ${e.method} ${e.endpoint}`,children:"API"}):(0,k.jsx)("span",{className:"apd-datasource-badge apd-datasource-static",title:"No matching value found in any captured API response this session \u2014 may be hardcoded, or fetched server-side before the page loaded",children:"STATIC"})}function eo({node:e}){return(0,k.jsxs)("span",{className:e.isSelected?"apd-tree-tag apd-tree-selected-tag":"apd-tree-tag",children:["<",e.tag,e.id&&(0,k.jsxs)("span",{className:"apd-tree-id",children:[' id="',e.id,'"']}),e.classes.length>0&&(0,k.jsxs)("span",{className:"apd-tree-class",children:[' class="',e.classes.join(" "),'"']}),">"]})}function Gt({node:e,editorProjectRoot:t,prefix:n,connector:o,depthFromSelected:r}){let[s,a]=(0,Yt.useState)(e.isSelected||e.isAncestorPath||r<Zn),d=e.children.length>0,c=n+(o===""?"":o==="\u2514\u2500\u2500 "?"    ":"\u2502   "),m=e.isSelected?0:r<0?-1:r+1,p=e.source?ze(e.source,t):null,g=e.source?`${e.source.file}${e.source.line?`:${e.source.line}`:""}`:"";return(0,k.jsxs)("div",{className:"apd-tree-node",children:[(0,k.jsxs)("div",{className:d?`apd-tree-row apd-tree-clickable${e.isSelected?" apd-tree-selected-row":""}`:`apd-tree-row${e.isSelected?" apd-tree-selected-row":""}`,onClick:()=>d&&a(b=>!b),children:[(0,k.jsxs)("span",{className:"apd-tree-prefix",children:[n,o]}),d?(0,k.jsx)("span",{className:"apd-tree-toggle",children:s?"\u25BE":"\u25B8"}):(0,k.jsx)("span",{className:"apd-tree-toggle apd-tree-toggle-leaf",children:"\u2022"}),(0,k.jsx)(eo,{node:e}),e.isSelected&&(0,k.jsx)("span",{className:"apd-tree-selected-label",children:"\u2190 Selected"}),e.componentName&&(0,k.jsx)("span",{className:"apd-tree-component",children:e.componentName}),(0,k.jsx)(Qn,{info:e.dataSource}),p?(0,k.jsx)("a",{className:"apd-tree-source apd-tree-source-link",href:p,title:"Open in VS Code",onClick:b=>b.stopPropagation(),children:g}):e.source?(0,k.jsx)("span",{className:"apd-tree-source",children:g}):null]}),s&&d&&(0,k.jsxs)("div",{children:[e.children.map((b,v)=>{let N=v===e.children.length-1;return(0,k.jsx)(Gt,{node:b,editorProjectRoot:t,prefix:c,connector:N?"\u2514\u2500\u2500 ":"\u251C\u2500\u2500 ",depthFromSelected:m},v)}),typeof e.truncatedChildCount=="number"&&(0,k.jsxs)("div",{className:"apd-tree-truncated",children:[c,"+",e.truncatedChildCount," more not shown"]})]})]})}function Zt({root:e,editorProjectRoot:t}){return(0,k.jsx)("div",{className:"apd-tree",children:(0,k.jsx)(Gt,{node:e,editorProjectRoot:t,prefix:"",connector:"",depthFromSelected:-1})})}var i=require("react/jsx-runtime");function Qt({data:e}){let t=Object.entries(e).filter(([,n])=>n!=="");return t.length===0?(0,i.jsx)("div",{className:"apd-empty-body",children:"None"}):(0,i.jsx)("div",{className:"apd-kv",children:t.map(([n,o])=>(0,i.jsxs)("div",{style:{display:"contents"},children:[(0,i.jsx)("div",{className:"apd-kv-key",children:n}),(0,i.jsx)("div",{className:"apd-kv-val",children:o})]},n))})}function to({info:e}){let{box:t}=e;return(0,i.jsx)("div",{className:"apd-box-model",children:(0,i.jsxs)("div",{className:"apd-box-layer apd-box-layer-margin",children:[(0,i.jsx)("span",{className:"apd-box-label apd-box-label-top",children:t.margin.top}),(0,i.jsx)("span",{className:"apd-box-label apd-box-label-right",children:t.margin.right}),(0,i.jsx)("span",{className:"apd-box-label apd-box-label-bottom",children:t.margin.bottom}),(0,i.jsx)("span",{className:"apd-box-label apd-box-label-left",children:t.margin.left}),(0,i.jsxs)("div",{className:"apd-box-layer apd-box-layer-border",children:[(0,i.jsx)("span",{className:"apd-box-label apd-box-label-top",children:t.border.top}),(0,i.jsx)("span",{className:"apd-box-label apd-box-label-right",children:t.border.right}),(0,i.jsx)("span",{className:"apd-box-label apd-box-label-bottom",children:t.border.bottom}),(0,i.jsx)("span",{className:"apd-box-label apd-box-label-left",children:t.border.left}),(0,i.jsxs)("div",{className:"apd-box-layer apd-box-layer-padding",children:[(0,i.jsx)("span",{className:"apd-box-label apd-box-label-top",children:t.padding.top}),(0,i.jsx)("span",{className:"apd-box-label apd-box-label-right",children:t.padding.right}),(0,i.jsx)("span",{className:"apd-box-label apd-box-label-bottom",children:t.padding.bottom}),(0,i.jsx)("span",{className:"apd-box-label apd-box-label-left",children:t.padding.left}),(0,i.jsxs)("div",{className:"apd-box-layer-content",children:[Math.round(t.content.width)," \xD7 ",Math.round(t.content.height)]})]})]})]})})}function no({info:e,editorProjectRoot:t}){let{source:n,componentName:o}=e;if(!n)return(0,i.jsxs)("div",{className:"apd-source-card",children:[o&&(0,i.jsxs)("div",{children:["Component: ",(0,i.jsx)("strong",{children:o})]}),(0,i.jsx)("div",{className:"apd-source-none",children:"Source file unavailable. For React/Next.js, enable the Babel source plugin for exact JSX paths."})]});let r=n.line?`${n.file}:${n.line}${n.column?`:${n.column}`:""}`:n.file,s=n.origin==="plain-html"?`Rendered page: ${r}`:r,a=ze(n,t);return(0,i.jsxs)("div",{className:"apd-source-card",children:[o&&(0,i.jsxs)("div",{style:{fontSize:11,color:"var(--apd-text-dim)",marginBottom:4},children:["Component: ",(0,i.jsx)("strong",{style:{color:"var(--apd-text)"},children:o})]}),a?(0,i.jsx)("a",{className:"apd-source-path",href:a,title:"Open in VS Code",children:s}):(0,i.jsx)("span",{className:"apd-source-path apd-source-path-plain",children:s}),(0,i.jsxs)("div",{className:"apd-source-meta",children:[(0,i.jsx)("span",{className:`apd-confidence-badge apd-confidence-${n.confidence}`,children:n.confidence}),(0,i.jsxs)("span",{children:["via ",n.origin]}),!a&&n.origin!=="plain-html"&&(0,i.jsx)("button",{type:"button",className:"apd-console-toggle-stack",onClick:()=>we(s),style:{marginLeft:"auto"},children:"Copy path"})]})]})}function en({onInspectingChange:e,editorProjectRoot:t}){let[n,o]=(0,O.useState)(!1),[r,s]=(0,O.useState)(!1),[a,d]=(0,O.useState)(null),[c,m]=(0,O.useState)(null),p=(0,O.useRef)(null),g=(0,O.useRef)(null);(0,O.useEffect)(()=>()=>{var f,h;(f=p.current)==null||f.cancel(),(h=g.current)==null||h.el.remove()},[]);function b(){var f,h;(f=g.current)==null||f.hide(),(h=g.current)==null||h.el.remove(),g.current=null}function v(){o(!0),e(!0);let f=Wt();document.body.appendChild(f.el),g.current=f,p.current=Kt(async h=>{b(),o(!1),e(!1),s(!0);let R=await Ot(h);d(R),m(Jt(h,E.getLogs())),s(!1)},h=>{h?f.show(h.getBoundingClientRect()):f.hide()},()=>{b(),o(!1),e(!1)})}function N(){var f;(f=p.current)==null||f.cancel()}return a?(0,i.jsxs)("div",{className:"apd-inspector-body",children:[(0,i.jsxs)("div",{style:{display:"flex",alignItems:"flex-start",gap:10,marginBottom:12},children:[(0,i.jsxs)("div",{style:{flex:1},children:[(0,i.jsxs)("div",{className:"apd-inspector-tag",children:["<",a.tag,a.id&&(0,i.jsxs)("span",{className:"apd-tag-id",children:[" #",a.id]}),a.classes.map(f=>(0,i.jsxs)("span",{className:"apd-tag-class",children:[" ",".",f]},f)),">"]}),a.textPreview&&(0,i.jsxs)("div",{style:{fontSize:11.5,color:"var(--apd-text-dim)",fontFamily:"var(--apd-mono)"},children:['"',a.textPreview,'"']})]}),(0,i.jsx)("button",{type:"button",className:"apd-action-btn",onClick:v,children:"\u2316 Inspect another"})]}),a.ancestors.length>0&&(0,i.jsxs)("div",{className:"apd-inspector-breadcrumb",children:[[...a.ancestors].reverse().map((f,h)=>(0,i.jsxs)("span",{children:[f.tag,f.id?`#${f.id}`:""]},h)),(0,i.jsx)("span",{style:{color:"var(--apd-accent)"},children:a.tag})]}),(0,i.jsx)(no,{info:a,editorProjectRoot:t}),(0,i.jsxs)("div",{className:"apd-meta-grid",children:[(0,i.jsxs)("div",{children:[(0,i.jsx)("div",{className:"apd-meta-label",children:"Position"}),(0,i.jsxs)("div",{className:"apd-meta-value",children:[Math.round(a.rect.x),", ",Math.round(a.rect.y)]})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)("div",{className:"apd-meta-label",children:"Size"}),(0,i.jsxs)("div",{className:"apd-meta-value",children:[Math.round(a.rect.width)," \xD7 ",Math.round(a.rect.height)]})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)("div",{className:"apd-meta-label",children:"Children"}),(0,i.jsx)("div",{className:"apd-meta-value",children:a.childCount})]})]}),(0,i.jsxs)("div",{className:"apd-section",children:[(0,i.jsx)("div",{className:"apd-section-header",children:"Box Model"}),(0,i.jsx)("div",{className:"apd-section-body",children:(0,i.jsx)(to,{info:a})})]}),(0,i.jsxs)("div",{className:"apd-section",children:[(0,i.jsxs)("div",{className:"apd-section-header",children:["Attributes (",Object.keys(a.attributes).length,")"]}),(0,i.jsx)("div",{className:"apd-section-body",children:(0,i.jsx)(Qt,{data:a.attributes})})]}),(0,i.jsxs)("div",{className:"apd-section",children:[(0,i.jsx)("div",{className:"apd-section-header",children:"Computed Styles"}),(0,i.jsx)("div",{className:"apd-section-body",children:(0,i.jsx)(Qt,{data:a.computedStyles})})]}),c&&(0,i.jsxs)("div",{className:"apd-section",children:[(0,i.jsxs)("div",{className:"apd-section-header",children:["Element Tree",(0,i.jsxs)("span",{style:{fontWeight:400,color:"var(--apd-text-faint)",fontSize:10.5},children:[" ","\u2014 structure, source, and data origin for this element and its descendants"]})]}),(0,i.jsx)("div",{className:"apd-section-body",children:(0,i.jsx)(Zt,{root:c,editorProjectRoot:t})})]})]}):(0,i.jsxs)("div",{className:"apd-inspector-empty",children:[(0,i.jsx)("button",{type:"button",className:`apd-inspect-start-btn${n?" apd-inspecting":""}`,onClick:n?N:v,children:n?"\u25FC Stop Inspecting (Esc)":"\u2316 Start Inspecting"}),(0,i.jsx)("p",{children:n?"Hover any element on the page and click to select it.":r?"Resolving source location\u2026":"Pick any element on the page to see its DOM details, computed styles, and \u2014 when available \u2014 the exact source file responsible for it."})]})}function tn(e){return Object.entries(e).map(([t,n])=>({name:t,value:n}))}function oo(e){return Object.entries(e).map(([t,n])=>({name:t,value:n}))}function Be(e){return{log:{version:"1.2",creator:{name:"next-api-debugger",version:"0.1.0"},entries:e.map(t=>{var n,o;return{startedDateTime:new Date(t.timestamp).toISOString(),time:t.duration,request:{method:t.method,url:t.url,httpVersion:"HTTP/1.1",headers:tn(t.requestHeaders),queryString:oo(t.queryParams),cookies:[],headersSize:-1,bodySize:t.requestSize,postData:t.requestBodyRaw?{mimeType:t.requestHeaders["content-type"]||"application/json",text:t.requestBodyRaw}:void 0},response:{status:(n=t.responseStatus)!=null?n:0,statusText:t.responseStatusText,httpVersion:"HTTP/1.1",headers:tn(t.responseHeaders),cookies:[],content:{size:t.responseSize,mimeType:t.responseHeaders["content-type"]||"application/json",text:(o=t.responseBodyRaw)!=null?o:""},redirectURL:"",headersSize:-1,bodySize:t.responseSize},cache:{},timings:{send:0,wait:t.duration,receive:0}}})}}}function tt(e,t){let n=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),o=URL.createObjectURL(n),r=document.createElement("a");r.href=o,r.download=e,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(o)}var u=require("react/jsx-runtime"),ro=["GET","POST","PUT","PATCH","DELETE"],ao=["log","info","warn","error","debug"];function nn({logs:e,consoleEntries:t,onClose:n,onClear:o,onClearConsole:r,onTogglePin:s,theme:a,onToggleTheme:d,inspectorEnabled:c,editorProjectRoot:m}){var nt,ot,rt;let[p,g]=(0,D.useState)("network"),[b,v]=(0,D.useState)({search:"",status:"all",methods:[]}),[N,f]=(0,D.useState)(null),[h,R]=(0,D.useState)(!1),[C,y]=(0,D.useState)(""),[A,$]=(0,D.useState)([]);(0,D.useEffect)(()=>{!N&&e.length>0&&f(e[0].id)},[e,N]);let P=(0,D.useMemo)(()=>{let x=b.search.trim().toLowerCase();return e.filter(w=>{var ee;return!(b.status==="success"&&!w.success||b.status==="failed"&&w.success||b.methods.length>0&&!b.methods.includes(w.method)||x&&!`${w.url} ${w.endpoint} ${w.method} ${(ee=w.responseStatus)!=null?ee:""}`.toLowerCase().includes(x))})},[e,b]),Q=(0,D.useMemo)(()=>{let x=C.trim().toLowerCase();return t.filter(w=>!(A.length>0&&!A.includes(w.level)||x&&!w.preview.toLowerCase().includes(x)))},[t,C,A]),_=(ot=(nt=P.find(x=>x.id===N))!=null?nt:P[0])!=null?ot:null,j=e.filter(x=>!x.success).length,M=t.filter(x=>x.level==="error").length;function rn(x){v(w=>({...w,methods:w.methods.includes(x)?w.methods.filter(ee=>ee!==x):[...w.methods,x]}))}function an(x){$(w=>w.includes(x)?w.filter(ee=>ee!==x):[...w,x])}let sn=p==="network"?`${e.length} requests${j>0?` \xB7 ${j} failed`:""}`:p==="console"?`${t.length} logs${M>0?` \xB7 ${M} errors`:""}`:"element picker";return(0,u.jsx)("div",{className:S("apd-overlay",h&&"apd-overlay-passthrough"),onClick:n,children:(0,u.jsxs)("div",{className:`apd-modal${h?" apd-minimized":""}`,onClick:x=>x.stopPropagation(),children:[(0,u.jsxs)("div",{className:"apd-header",children:[(0,u.jsxs)("div",{className:"apd-header-title",children:[(0,u.jsx)("span",{className:"apd-live-dot"}),"API Debugger"]}),(0,u.jsx)("span",{className:"apd-header-count",children:sn}),(0,u.jsx)("div",{className:"apd-spacer"}),(0,u.jsx)("button",{className:"apd-icon-btn",onClick:d,title:"Toggle theme",type:"button",children:a==="light"?"\u2600":"\u263E"}),p==="network"&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("button",{className:"apd-icon-btn",title:"Export JSON",type:"button",onClick:()=>tt(`api-logs-${Date.now()}.json`,e),children:"\u2B73"}),(0,u.jsx)("button",{className:"apd-icon-btn",title:"Export HAR",type:"button",onClick:()=>tt(`api-logs-${Date.now()}.har`,Be(e)),children:"HAR"})]}),p!=="inspector"&&(0,u.jsx)("button",{className:"apd-icon-btn",title:p==="network"?"Clear logs":"Clear console",type:"button",onClick:p==="network"?o:r,children:"\u{1F5D1}"}),(0,u.jsx)("button",{className:"apd-icon-btn",title:h?"Restore":"Minimize",type:"button",onClick:()=>R(x=>!x),children:h?"\u25A2":"\u2014"}),(0,u.jsx)("button",{className:"apd-icon-btn",title:"Close",type:"button",onClick:n,children:"\u2715"})]}),!h&&(0,u.jsxs)("div",{className:"apd-tabs",children:[(0,u.jsxs)("button",{type:"button",className:S("apd-tab",p==="network"&&"apd-active"),onClick:()=>g("network"),children:["Network",e.length>0&&(0,u.jsx)("span",{className:S("apd-tab-badge",j>0&&"apd-tab-badge-error"),children:e.length})]}),(0,u.jsxs)("button",{type:"button",className:S("apd-tab",p==="console"&&"apd-active"),onClick:()=>g("console"),children:["Console",t.length>0&&(0,u.jsx)("span",{className:S("apd-tab-badge",M>0&&"apd-tab-badge-error"),children:t.length})]}),c&&(0,u.jsx)("button",{type:"button",className:S("apd-tab",p==="inspector"&&"apd-active"),onClick:()=>g("inspector"),children:"Inspector"})]}),!h&&p==="network"&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)("div",{className:"apd-toolbar",children:[(0,u.jsx)(We,{value:b.search,onChange:x=>v(w=>({...w,search:x}))}),(0,u.jsx)(Pt,{status:b.status,onStatusChange:x=>v(w=>({...w,status:x})),methods:ro,activeMethods:b.methods,onToggleMethod:rn})]}),(0,u.jsxs)("div",{className:"apd-body",children:[(0,u.jsx)(Ht,{logs:P,selectedId:(rt=_==null?void 0:_.id)!=null?rt:null,onSelect:f,onTogglePin:s}),(0,u.jsx)(Dt,{log:_,onTogglePin:s})]})]}),!h&&p==="console"&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)("div",{className:"apd-toolbar",children:[(0,u.jsx)(We,{value:C,onChange:y}),ao.map(x=>(0,u.jsx)("button",{type:"button",className:S("apd-chip",A.includes(x)&&"apd-active"),onClick:()=>an(x),children:x},x))]}),(0,u.jsx)(Bt,{entries:Q})]}),c&&(0,u.jsx)("div",{style:{display:!h&&p==="inspector"?"flex":"none",flexDirection:"column",flex:1,overflow:"hidden"},children:(0,u.jsx)(en,{onInspectingChange:R,editorProjectRoot:m})}),!h&&(0,u.jsxs)("div",{className:"apd-footer",children:[(0,u.jsxs)("span",{children:[(0,u.jsx)("span",{className:"apd-kbd",children:"Ctrl"}),"+",(0,u.jsx)("span",{className:"apd-kbd",children:"Shift"}),"+",(0,u.jsx)("span",{className:"apd-kbd",children:"D"})," to toggle \xB7 ",(0,u.jsx)("span",{className:"apd-kbd",children:"Space"}),"+",(0,u.jsx)("span",{className:"apd-kbd",children:"H"})," to hide"]}),(0,u.jsx)("span",{style:{marginLeft:"auto"},children:"next-api-debugger \xB7 dev only"})]})]})})}var de=require("react/jsx-runtime");function so(e){return typeof e=="boolean"?e:process.env.NODE_ENV!=="production"}function on(e){let{enabled:t,maxLogs:n=200,initialPosition:o,axiosInstance:r,theme:s="dark",keyboardShortcut:a=!0,ignoreUrls:d,serverLogsUrl:c,inspector:m=!0,editorProjectRoot:p}=e,g=so(t),[b,v]=(0,Z.useState)(!1),[N,f]=(0,Z.useState)(!1),[h,R]=(0,Z.useState)(s),{logs:C,clear:y,togglePin:A}=gt(),{entries:$,clear:P}=ht();if((0,Z.useEffect)(()=>{if(!g||typeof window=="undefined")return;E.setMaxLogs(n),z.setMaxEntries(500),Ee({ignoreUrls:c?[...d!=null?d:[],c]:d}),at({ignoreUrls:d}),pt(),m&&ct();let M=r?Le(r,{ignoreUrls:d}):()=>{};return()=>{Ne(),st(),lt(),m&&ut(),M()}},[g,m,c]),(0,Z.useEffect)(()=>{if(!(!g||!c||typeof window=="undefined"))return ft(c)},[g,c]),xt({ctrl:!0,shift:!0,key:"d"},()=>v(M=>!M),g&&a),yt(["space","h"],()=>{f(M=>!M),v(!1)},g&&a),!g)return null;let Q=C.filter(M=>!M.success).length,_=$.filter(M=>M.level==="error").length,j=h==="system"?"dark":h;return(0,de.jsxs)("div",{className:`apd-root${j==="light"?" apd-light":""}`,children:[(0,de.jsx)(Nt,{}),!N&&!b&&(0,de.jsx)(Rt,{count:C.length+$.length,hasErrors:Q>0||_>0,onOpen:()=>v(!0),initialPosition:o}),!N&&b&&(0,de.jsx)(nn,{logs:C,consoleEntries:$,onClose:()=>v(!1),onClear:y,onClearConsole:P,onTogglePin:A,theme:j,onToggleTheme:()=>R(j==="light"?"dark":"light"),inspectorEnabled:m,editorProjectRoot:p})]})}0&&(module.exports={ApiDebugger,exportAsHar,generateCurl,installAxiosInterceptor,installFetchInterceptor,logStore,uninstallFetchInterceptor});
//# sourceMappingURL=index.js.map