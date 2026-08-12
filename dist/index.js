'use client';
"use strict";var Ae=Object.defineProperty;var Xt=Object.getOwnPropertyDescriptor;var Jt=Object.getOwnPropertyNames;var Vt=Object.prototype.hasOwnProperty;var Kt=(e,t)=>{for(var o in t)Ae(e,o,{get:t[o],enumerable:!0})},Wt=(e,t,o,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of Jt(t))!Vt.call(e,r)&&r!==o&&Ae(e,r,{get:()=>t[r],enumerable:!(n=Xt(t,r))||n.enumerable});return e};var Yt=e=>Wt(Ae({},"__esModule",{value:!0}),e);var Bo={};Kt(Bo,{ApiDebugger:()=>Ot,exportAsHar:()=>qe,generateCurl:()=>He,installAxiosInterceptor:()=>Ee,installFetchInterceptor:()=>ye,logStore:()=>S,uninstallFetchInterceptor:()=>we});module.exports=Yt(Bo);var ae=require("react");var Ie=class{constructor(){this.logs=[];this.listeners=new Set;this.maxLogs=200;this.snapshot=[];this.getLogs=()=>(this.snapshot=this.logs,this.snapshot);this.subscribe=t=>(this.listeners.add(t),()=>this.listeners.delete(t))}setMaxLogs(t){this.maxLogs=Math.max(1,t),this.trim()}addLog(t){this.logs=[t,...this.logs],this.trim(),this.emit()}togglePin(t){this.logs=this.logs.map(o=>o.id===t?{...o,pinned:!o.pinned}:o),this.emit()}clear(){this.logs=[],this.emit()}trim(){if(this.logs.length<=this.maxLogs)return;let t=this.logs.filter(s=>s.pinned),n=this.logs.filter(s=>!s.pinned).slice(0,Math.max(0,this.maxLogs-t.length)),r=[...t,...n];r.sort((s,a)=>a.timestamp-s.timestamp),this.logs=r}emit(){this.listeners.forEach(t=>t())}},S=new Ie;var je=class{constructor(){this.entries=[];this.listeners=new Set;this.maxEntries=500;this.getEntries=()=>this.entries;this.subscribe=t=>(this.listeners.add(t),()=>this.listeners.delete(t))}setMaxEntries(t){this.maxEntries=Math.max(1,t),this.trim()}addEntry(t){let o=this.entries[0];o&&o.level===t.level&&o.preview===t.preview&&o.stack===t.stack?this.entries=[{...o,count:o.count+1,timestamp:t.timestamp},...this.entries.slice(1)]:this.entries=[t,...this.entries],this.trim(),this.emit()}clear(){this.entries=[],this.emit()}trim(){this.entries.length>this.maxEntries&&(this.entries=this.entries.slice(0,this.maxEntries))}emit(){this.listeners.forEach(t=>t())}},j=new je;var $="x-apd-skip";function D(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,9)}`}function U(e){if(!e)return null;try{return JSON.parse(e)}catch{return e}}function Z(e){if(e==null)return null;if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return String(e)}}function O(e){if(!e)return 0;try{return new Blob([e]).size}catch{return e.length}}function ze(e){if(!e)return"0 B";let t=["B","KB","MB","GB"],o=Math.min(t.length-1,Math.floor(Math.log(e)/Math.log(1024))),n=e/Math.pow(1024,o);return`${o===0?n:n.toFixed(1)} ${t[o]}`}function he(e){return e<1e3?`${e} ms`:`${(e/1e3).toFixed(2)} s`}function Q(e){let t=new Date(e);return t.toLocaleTimeString(void 0,{hour12:!1})+`.${String(t.getMilliseconds()).padStart(3,"0")}`}function ee(e){try{let t=typeof window!="undefined"?window.location.origin:"http://localhost",o=new URL(e,t),n={};return o.searchParams.forEach((r,s)=>{n[s]=r}),{endpoint:o.pathname,queryParams:n}}catch{return{endpoint:e,queryParams:{}}}}function be(e){let t={};return e&&e.forEach((o,n)=>{t[n]=o}),t}function ie(e){let t={};if(!e)return t;if(typeof e.toJSON=="function")return{...e.toJSON()};if(e instanceof Headers)return be(e);if(typeof e=="object")for(let[o,n]of Object.entries(e))n!=null&&(t[o]=String(n));return t}function te(e,t){return!t||t.length===0?!1:t.some(o=>o instanceof RegExp?o.test(e):e.includes(o))}function E(...e){return e.filter(Boolean).join(" ")}async function xe(e){try{if(navigator.clipboard&&window.isSecureContext)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select();let o=document.execCommand("copy");return document.body.removeChild(t),o}catch{return!1}}var X=null,ve=!1;function Gt(e){if(e==null)return null;if(typeof e=="string")return e;if(e instanceof URLSearchParams)return e.toString();if(e instanceof FormData){let t=[];return e.forEach((o,n)=>{t.push(`${n}=${o instanceof File?`[File: ${o.name}]`:o}`)}),t.join("&")}return"[binary data]"}function ye(e={}){ve||typeof window=="undefined"||typeof window.fetch!="function"||(X=window.fetch.bind(window),ve=!0,window.fetch=async function(o,n){var x,v,y,R,P;let r=o instanceof Request?o:null,s=r?r.url:String(o);if(te(s,e.ignoreUrls))return X(o,n);let a=be(new Headers((v=(x=n==null?void 0:n.headers)!=null?x:r==null?void 0:r.headers)!=null?v:void 0));if(a[$]){let w=new Headers((R=(y=n==null?void 0:n.headers)!=null?y:r==null?void 0:r.headers)!=null?R:void 0);return w.delete($),r?X(new Request(r,{headers:w})):X(o,{...n,headers:w})}let d=Date.now(),m=performance.now(),f=((n==null?void 0:n.method)||(r==null?void 0:r.method)||"GET").toUpperCase(),{endpoint:p,queryParams:b}=ee(s),h=Gt((P=n==null?void 0:n.body)!=null?P:null),u={id:D(),url:s,endpoint:p,method:f,requestHeaders:a,requestBody:U(h),requestBodyRaw:h,queryParams:b,timestamp:d,source:"fetch",requestSize:O(h),pinned:!1};try{let w=await X(o,n),C=Math.round(performance.now()-m),F=w.clone(),T=null;try{T=await F.text()}catch{T=null}return S.addLog({...u,duration:C,responseStatus:w.status,responseStatusText:w.statusText,responseHeaders:be(w.headers),responseBody:U(T),responseBodyRaw:T,responseSize:O(T),success:w.ok,error:w.ok?null:`HTTP ${w.status} ${w.statusText}`}),w}catch(w){let C=Math.round(performance.now()-m);throw S.addLog({...u,duration:C,responseStatus:null,responseStatusText:"",responseHeaders:{},responseBody:null,responseBodyRaw:null,responseSize:0,success:!1,error:(w==null?void 0:w.message)||"Network error"}),w}})}function we(){ve&&X&&typeof window!="undefined"&&(window.fetch=X),ve=!1,X=null}var de=null,ne=null,pe=null,ke=!1,oe=Symbol("apd-xhr-meta");function Zt(e){let t={};return e.trim().split(/[\r\n]+/).forEach(o=>{let n=o.indexOf(":");if(n===-1)return;let r=o.slice(0,n).trim().toLowerCase(),s=o.slice(n+1).trim();r&&(t[r]=s)}),t}function Ge(e={}){ke||typeof window=="undefined"||typeof XMLHttpRequest=="undefined"||(de=XMLHttpRequest.prototype.open,ne=XMLHttpRequest.prototype.send,pe=XMLHttpRequest.prototype.setRequestHeader,ke=!0,XMLHttpRequest.prototype.open=function(o,n,...r){let s=String(n);return this[oe]={id:D(),method:(o||"GET").toUpperCase(),url:s,startTime:0,startPerf:0,requestHeaders:{},ignored:te(s,e.ignoreUrls)},de.apply(this,[o,n,...r])},XMLHttpRequest.prototype.setRequestHeader=function(o,n){if(o.toLowerCase()===$){this[oe]&&(this[oe].ignored=!0);return}return this[oe]&&(this[oe].requestHeaders[o]=n),pe.apply(this,[o,n])},XMLHttpRequest.prototype.send=function(o){let n=this[oe];if(!n||n.ignored)return ne.apply(this,[o]);n.startTime=Date.now(),n.startPerf=performance.now();let r=o==null?null:typeof o=="string"?o:o instanceof URLSearchParams?o.toString():o instanceof FormData?"[form data]":"[binary data]",s=()=>{let a=Math.round(performance.now()-n.startPerf),{endpoint:d,queryParams:m}=ee(n.url),f=Zt(this.getAllResponseHeaders()||""),p=null;try{p=typeof this.responseText=="string"?this.responseText:null}catch{p=null}let b=this.status,h=b>=200&&b<400,u={id:n.id,url:n.url,endpoint:d,method:n.method,requestHeaders:n.requestHeaders,requestBody:U(r),requestBodyRaw:r,queryParams:m,responseStatus:b||null,responseStatusText:this.statusText||"",responseHeaders:f,responseBody:U(p),responseBodyRaw:p,duration:a,timestamp:n.startTime,success:h,error:h?null:b===0?"Network error":`HTTP ${b} ${this.statusText}`,source:"xhr",requestSize:O(r),responseSize:O(p),pinned:!1};S.addLog(u),this.removeEventListener("loadend",s)};return this.addEventListener("loadend",s),ne.apply(this,[o])})}function Ze(){ke&&typeof window!="undefined"&&typeof XMLHttpRequest!="undefined"&&(de&&(XMLHttpRequest.prototype.open=de),ne&&(XMLHttpRequest.prototype.send=ne),pe&&(XMLHttpRequest.prototype.setRequestHeader=pe)),ke=!1,de=null,ne=null,pe=null}function Qt(e){let t=(e==null?void 0:e.baseURL)||"",o=(e==null?void 0:e.url)||"",n=/^https?:\/\//i.test(o)?o:`${t}${t&&!t.endsWith("/")&&!o.startsWith("/")?"/":""}${o}`;if(e!=null&&e.params&&typeof e.params=="object"){let r=eo(e.params);r&&(n+=(n.includes("?")?"&":"?")+r)}return n}function eo(e){let t=new URLSearchParams;for(let[o,n]of Object.entries(e))n!=null&&(Array.isArray(n)?n.forEach(r=>t.append(o,String(r))):t.append(o,String(n)));return t.toString()}function Qe(e){if(e==null)return null;if(typeof e=="string")return e;if(typeof URLSearchParams!="undefined"&&e instanceof URLSearchParams)return e.toString();if(typeof FormData!="undefined"&&e instanceof FormData){let t=[];return e.forEach((o,n)=>{t.push(`${n}=${o instanceof File?`[File: ${o.name}]`:o}`)}),t.join("&")}return Z(e)}function Ee(e,t={}){var s;if(!e||!e.interceptors||typeof((s=e.interceptors.request)==null?void 0:s.use)!="function")return()=>{};if(e.__apiDebuggerInstalled)return()=>{};e.__apiDebuggerInstalled=!0;let o=e.interceptors.request.use(a=>{let d={id:D(),startTime:Date.now(),startPerf:performance.now(),requestBodyRaw:Qe(a.data),requestHeadersSnapshot:ie(a.headers)};return a.__apdMeta=d,a.headers&&typeof a.headers.set=="function"?a.headers.set($,"1"):a.headers={...a.headers||{},[$]:"1"},a});function n(a,d,m){var C,F,T,Y,I,L;if(!a)return;let f=Qt(a);if(te(f,t.ignoreUrls))return;let p=a.__apdMeta||{id:D(),startTime:Date.now(),startPerf:performance.now(),requestBodyRaw:Qe(a.data),requestHeadersSnapshot:ie(a.headers)},b=Math.round(performance.now()-p.startPerf),{endpoint:h,queryParams:u}=ee(f),x=ie(a.headers),v=Object.keys(x).length>0?x:p.requestHeadersSnapshot;delete v[$];let y=p.requestBodyRaw,R=(d==null?void 0:d.data)!==void 0?Z(d.data):null,P=(T=(F=d==null?void 0:d.status)!=null?F:(C=m==null?void 0:m.response)==null?void 0:C.status)!=null?T:null,w={id:p.id,url:f,endpoint:h,method:(a.method||"get").toUpperCase(),requestHeaders:v,requestBody:(Y=U(y))!=null?Y:y,requestBodyRaw:y,queryParams:u,responseStatus:P,responseStatusText:(I=d==null?void 0:d.statusText)!=null?I:"",responseHeaders:ie(d==null?void 0:d.headers),responseBody:(L=d==null?void 0:d.data)!=null?L:null,responseBodyRaw:R,duration:b,timestamp:p.startTime,success:!m&&!!P&&P<400,error:m?m.message||"Request failed":null,source:"axios",requestSize:O(y),responseSize:O(R),pinned:!1};S.addLog(w)}let r=e.interceptors.response.use(a=>(n(a.config,a),a),a=>(n(a==null?void 0:a.config,a==null?void 0:a.response,a),Promise.reject(a)));return()=>{e.interceptors.request.eject(o),e.interceptors.response.eject(r),e.__apiDebuggerInstalled=!1}}var et=["log","info","warn","error","debug"],De={},le=null,ce=null,Oe=!1;function to(e,t=new WeakSet){var o;if(e===null)return"null";if(e===void 0)return"undefined";if(typeof e=="string")return e;if(typeof e=="number"||typeof e=="boolean")return String(e);if(e instanceof Error)return`${e.name}: ${e.message}`;if(typeof e=="function")return e.name?`\u0192 ${e.name}()`:"\u0192 ()";if(typeof e=="object"){if(t.has(e))return"[Circular]";t.add(e);try{return(o=JSON.stringify(e,(n,r)=>typeof r=="bigint"?r.toString():r,2))!=null?o:String(e)}catch{return Array.isArray(e)?"[Array]":"[Object]"}}return String(e)}function oo(e){for(let t of e)if(t instanceof Error&&t.stack)return t.stack;return null}function $e(e,t,o){let n=t.map(r=>to(r));return{id:D(),level:e,parts:n,preview:n.join(" "),stack:oo(t),timestamp:Date.now(),source:o,count:1}}function tt(e={}){var o,n;if(Oe||typeof window=="undefined"||typeof console=="undefined")return;Oe=!0;let t=(o=e.levels)!=null?o:et;for(let r of t){let s=(n=console[r])==null?void 0:n.bind(console);s&&(De[r]=s,console[r]=(...a)=>{j.addEntry($e(r,a,"console")),s(...a)})}le=r=>{let s=r.error?[r.error]:[r.message],a=$e("error",s,"window.onerror");j.addEntry({...a,preview:a.preview||`${r.message} (${r.filename}:${r.lineno}:${r.colno})`})},window.addEventListener("error",le),ce=r=>{let s=r.reason,a=$e("error",[s],"unhandledrejection");j.addEntry({...a,preview:`Unhandled promise rejection: ${a.preview}`})},window.addEventListener("unhandledrejection",ce)}function ot(){if(typeof console!="undefined")for(let e of et){let t=De[e];t&&(console[e]=t)}typeof window!="undefined"&&(le&&window.removeEventListener("error",le),ce&&window.removeEventListener("unhandledrejection",ce)),De={},le=null,ce=null,Oe=!1}var _e=new WeakMap,ue=null,me=null,Fe=!1;function nt(){Fe||typeof document=="undefined"||(Fe=!0,ue=document.createElement.bind(document),me=document.createElementNS.bind(document),document.createElement=function(t,o){let n=ue(t,o);return _e.set(n,new Error),n},document.createElementNS=function(t,o,n){let r=me(t,o,n);return _e.set(r,new Error),r})}function rt(){ue&&(document.createElement=ue),me&&(document.createElementNS=me),Fe=!1,ue=null,me=null}function at(e){return _e.get(e)}var fe=require("react");function st(){let e=(0,fe.useSyncExternalStore)(S.subscribe,S.getLogs,S.getLogs),t=(0,fe.useCallback)(()=>S.clear(),[]),o=(0,fe.useCallback)(n=>S.togglePin(n),[]);return{logs:e,clear:t,togglePin:o}}var Se=require("react");function it(){let e=(0,Se.useSyncExternalStore)(j.subscribe,j.getEntries,j.getEntries),t=(0,Se.useCallback)(()=>j.clear(),[]);return{entries:e,clear:t}}var dt=require("react");function pt(e,t,o=!0){(0,dt.useEffect)(()=>{if(!o||typeof window=="undefined")return;function n(r){let s=!e.ctrl||r.ctrlKey||r.metaKey,a=!e.shift||r.shiftKey;s&&a&&r.key.toLowerCase()===e.key.toLowerCase()&&(r.preventDefault(),t())}return window.addEventListener("keydown",n),()=>window.removeEventListener("keydown",n)},[e.ctrl,e.shift,e.key,t,o])}var Ne=require("react");function Ue(e){return e===" "?"space":e.toLowerCase()}function no(e){var n;let t=e;if(!t)return!1;let o=(n=t.tagName)==null?void 0:n.toLowerCase();return o==="input"||o==="textarea"||o==="select"||t.isContentEditable}function lt(e,t){if(typeof window=="undefined")return()=>{};let o=e.map(Ue),n=new Set;function r(d){if(no(d.target))return;let m=Ue(d.key),f=n.has(m);n.add(m),!f&&o.every(p=>n.has(p))&&(d.preventDefault(),t())}function s(d){n.delete(Ue(d.key))}function a(){n.clear()}return window.addEventListener("keydown",r),window.addEventListener("keyup",s),window.addEventListener("blur",a),()=>{window.removeEventListener("keydown",r),window.removeEventListener("keyup",s),window.removeEventListener("blur",a)}}function ct(e,t,o=!0){let n=(0,Ne.useRef)(t);n.current=t,(0,Ne.useEffect)(()=>{if(o)return lt(e,()=>n.current())},[e.join(","),o])}var ft=require("react");var ut=`
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
`;var mt="next-api-debugger-styles";function gt(){return(0,ft.useEffect)(()=>{if(typeof document=="undefined"||document.getElementById(mt))return;let e=document.createElement("style");e.id=mt,e.textContent=ut,document.head.appendChild(e)},[]),null}var H=require("react"),ht="apd-button-position",Ce=56,bt=5;function Le(e){return typeof window=="undefined"?e:{x:Math.min(Math.max(8,e.x),window.innerWidth-Ce-8),y:Math.min(Math.max(8,e.y),window.innerHeight-Ce-8)}}function ro(){return typeof window=="undefined"?{x:24,y:24}:{x:window.innerWidth-Ce-24,y:window.innerHeight-Ce-24}}function xt(e){let[t,o]=(0,H.useState)(()=>{if(typeof window=="undefined")return e!=null?e:{x:24,y:24};try{let p=sessionStorage.getItem(ht);if(p)return Le(JSON.parse(p))}catch{}return Le(e!=null?e:ro())}),n=(0,H.useRef)(!1),r=(0,H.useRef)(!1),s=(0,H.useRef)({pointerX:0,pointerY:0,posX:0,posY:0}),a=(0,H.useCallback)(p=>{n.current=!0,r.current=!1,s.current={pointerX:p.clientX,pointerY:p.clientY,posX:t.x,posY:t.y},p.currentTarget.setPointerCapture(p.pointerId)},[t.x,t.y]),d=(0,H.useCallback)(p=>{if(!n.current)return;let b=p.clientX-s.current.pointerX,h=p.clientY-s.current.pointerY;(Math.abs(b)>bt||Math.abs(h)>bt)&&(r.current=!0),o(Le({x:s.current.posX+b,y:s.current.posY+h}))},[]),m=(0,H.useCallback)(()=>{n.current=!1},[]);(0,H.useEffect)(()=>{try{sessionStorage.setItem(ht,JSON.stringify(t))}catch{}},[t]),(0,H.useEffect)(()=>{function p(){o(b=>Le(b))}return window.addEventListener("resize",p),()=>window.removeEventListener("resize",p)},[]);let f=(0,H.useCallback)(()=>r.current,[]);return{position:t,onPointerDown:a,onPointerMove:d,onPointerUp:m,wasDragged:f}}var V=require("react/jsx-runtime");function vt({count:e,hasErrors:t,onOpen:o,initialPosition:n}){let{position:r,onPointerDown:s,onPointerMove:a,onPointerUp:d,wasDragged:m}=xt(n);return(0,V.jsxs)("button",{type:"button",className:"apd-btn",style:{left:r.x,top:r.y},onPointerDown:s,onPointerMove:a,onPointerUp:d,onClick:()=>{m()||o()},"aria-label":"Open API debugger",title:"API Debugger (drag to move)",children:[(0,V.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,V.jsx)("polyline",{points:"16 18 22 12 16 6"}),(0,V.jsx)("polyline",{points:"8 6 2 12 8 18"})]}),e>0&&(0,V.jsx)("span",{className:E("apd-btn-dot",t&&"apd-has-errors"),children:e>99?"99+":e})]})}var A=require("react");var K=require("react/jsx-runtime");function Xe({value:e,onChange:t}){return(0,K.jsxs)("div",{className:"apd-search",children:[(0,K.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,K.jsx)("circle",{cx:"11",cy:"11",r:"7"}),(0,K.jsx)("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]}),(0,K.jsx)("input",{type:"text",placeholder:"Filter by URL, endpoint, method or status code...",value:e,onChange:o=>t(o.target.value),spellCheck:!1})]})}var J=require("react/jsx-runtime");function yt({status:e,onStatusChange:t,methods:o,activeMethods:n,onToggleMethod:r}){return(0,J.jsxs)(J.Fragment,{children:[(0,J.jsx)("button",{type:"button",className:E("apd-chip apd-chip-success",e==="success"&&"apd-active"),onClick:()=>t(e==="success"?"all":"success"),children:"Success"}),(0,J.jsx)("button",{type:"button",className:E("apd-chip apd-chip-failed",e==="failed"&&"apd-active"),onClick:()=>t(e==="failed"?"all":"failed"),children:"Failed"}),o.map(s=>(0,J.jsx)("button",{type:"button",className:E("apd-chip",n.includes(s)&&"apd-active"),onClick:()=>r(s),children:s},s))]})}var q=require("react/jsx-runtime");function ao(e){return["GET","POST","PUT","PATCH","DELETE"].includes(e.toUpperCase())?`apd-method-${e.toUpperCase()}`:"apd-method-OTHER"}function wt({log:e,selected:t,onSelect:o,onTogglePin:n}){var r;return(0,q.jsxs)("div",{className:E("apd-item",t&&"apd-selected"),onClick:o,role:"button",tabIndex:0,onKeyDown:s=>s.key==="Enter"&&o(),children:[(0,q.jsxs)("div",{className:"apd-item-row1",children:[(0,q.jsx)("span",{className:E("apd-method",ao(e.method)),children:e.method}),(0,q.jsx)("span",{className:"apd-item-url",title:e.url,children:e.endpoint}),(0,q.jsx)("span",{className:E("apd-status-dot",e.success?"apd-ok":"apd-fail")}),e.pinned&&(0,q.jsx)("button",{type:"button",className:"apd-pin-star",onClick:s=>{s.stopPropagation(),n()},title:"Unpin","aria-label":"Unpin request",style:{background:"none",border:"none",cursor:"pointer",padding:0},children:"\u2605"})]}),(0,q.jsxs)("div",{className:"apd-item-row2",children:[(0,q.jsx)("span",{children:(r=e.responseStatus)!=null?r:e.error?"ERR":"\u2014"}),(0,q.jsx)("span",{children:he(e.duration)}),(0,q.jsx)("span",{children:Q(e.timestamp)}),(0,q.jsx)("span",{style:{marginLeft:"auto",textTransform:"uppercase"},children:e.source})]})]})}var W=require("react/jsx-runtime");function kt({logs:e,selectedId:t,onSelect:o,onTogglePin:n}){return e.length===0?(0,W.jsx)("div",{className:"apd-list",children:(0,W.jsxs)("div",{className:"apd-empty",children:["No requests captured yet.",(0,W.jsx)("br",{}),"Make an API call and it'll show up here."]})}):(0,W.jsx)("div",{className:"apd-list",children:e.map(r=>(0,W.jsx)(wt,{log:r,selected:r.id===t,onSelect:()=>o(r.id),onTogglePin:()=>n(r.id)},r.id))})}var Me=require("react");var Et=require("react");var St=require("react/jsx-runtime");function Re({getText:e,label:t,icon:o}){let[n,r]=(0,Et.useState)(!1);async function s(){await xe(e())&&(r(!0),setTimeout(()=>r(!1),1200))}return(0,St.jsxs)("button",{type:"button",className:E("apd-action-btn",n&&"apd-copied"),onClick:s,children:[o,n?"Copied":t]})}var z=require("react");var so=/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(\.\d+)?([eE][+-]?\d+)?)/g;function io(e){return e.replace(so,t=>{let o="apd-json-num";return/^"/.test(t)?o=/:$/.test(t)?"apd-json-key":"apd-json-str":/true|false/.test(t)?o="apd-json-bool":/null/.test(t)&&(o="apd-json-null"),`<span class="${o}">${t}</span>`})}function po(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function lo(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Nt(e,t){if(e!=null&&typeof e=="object")return{content:JSON.stringify(e,null,2),isJson:!0};if(typeof e=="string")try{return{content:JSON.stringify(JSON.parse(e),null,2),isJson:!0}}catch{return{content:t!=null?t:e,isJson:!1}}return{content:t!=null?t:String(e!=null?e:""),isJson:!1}}function Lt(e,t,o){let n=po(e),r=0,s=n;if(o){let d=new RegExp(lo(o),"gi");s=n.replace(d,m=>(r+=1,`<mark class='apd-json-highlight'>${m}</mark>`))}return{html:t?io(s):s,matchCount:r}}var B=require("react/jsx-runtime");function Pe({value:e,raw:t,searchable:o=!0}){let[n,r]=(0,z.useState)(""),[s,a]=(0,z.useState)(0),d=(0,z.useRef)(null),m=(0,z.useRef)(""),{content:f,isJson:p}=Nt(e,t),b=n.trim(),{html:h,matchCount:u}=(0,z.useMemo)(()=>Lt(f,p,b),[f,p,b]);(0,z.useEffect)(()=>{let v=b!==m.current;m.current=b,(v||s>=u)&&a(0)},[b,u]),(0,z.useEffect)(()=>{var y;if(!d.current)return;let v=d.current.querySelectorAll("mark.apd-json-highlight");v.forEach((R,P)=>R.classList.toggle("apd-active",P===s)),(y=v[s])==null||y.scrollIntoView({block:"center",behavior:"smooth"})},[h,s]);function x(v){u!==0&&a(y=>(y+v+u)%u)}return(0,B.jsxs)("div",{children:[o&&f.length>0&&(0,B.jsxs)("div",{className:"apd-json-search",children:[(0,B.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,B.jsx)("circle",{cx:"11",cy:"11",r:"7"}),(0,B.jsx)("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]}),(0,B.jsx)("input",{type:"text",placeholder:"Find in payload...",value:n,onChange:v=>r(v.target.value),onKeyDown:v=>{v.key==="Enter"&&(v.preventDefault(),x(v.shiftKey?-1:1))},spellCheck:!1}),n&&(0,B.jsx)("span",{className:"apd-json-search-count",children:u>0?`${s+1} / ${u}`:"No matches"}),n&&u>0&&(0,B.jsxs)("div",{className:"apd-json-search-nav",children:[(0,B.jsx)("button",{type:"button",onClick:()=>x(-1),"aria-label":"Previous match",title:"Previous match (Shift+Enter)",children:"\u2191"}),(0,B.jsx)("button",{type:"button",onClick:()=>x(1),"aria-label":"Next match",title:"Next match (Enter)",children:"\u2193"})]})]}),(0,B.jsx)("pre",{ref:d,className:"apd-json",dangerouslySetInnerHTML:{__html:h}})]})}function Te(e){return`'${e.replace(/'/g,"'\\''")}'`}function co(e){let t=e.trim();if(!t||!(t.startsWith("{")||t.startsWith("[")))return!1;try{return JSON.parse(t),!0}catch{return!1}}function He(e){let t=[`curl -X ${e.method} ${Te(e.url)}`],o=Object.keys(e.requestHeaders).some(n=>n.toLowerCase()==="content-type");for(let[n,r]of Object.entries(e.requestHeaders))/^(host|content-length|connection)$/i.test(n)||t.push(`  -H ${Te(`${n}: ${r}`)}`);return e.requestBodyRaw&&(!o&&co(e.requestBodyRaw)&&t.push(`  -H ${Te("Content-Type: application/json")}`),t.push(`  --data-raw ${Te(e.requestBodyRaw)}`)),t.join(` \\
`)}var l=require("react/jsx-runtime");function re({title:e,count:t,defaultOpen:o=!0,children:n}){let[r,s]=(0,Me.useState)(o);return(0,l.jsxs)("div",{className:"apd-section",children:[(0,l.jsxs)("div",{className:"apd-section-header",onClick:()=>s(a=>!a),children:[(0,l.jsxs)("span",{children:[e,typeof t=="number"?` (${t})`:""]}),(0,l.jsx)("span",{children:r?"\u2212":"+"})]}),r&&(0,l.jsx)("div",{className:"apd-section-body",children:n})]})}function Je({data:e}){let t=Object.entries(e);return t.length===0?(0,l.jsx)("div",{className:"apd-section-body apd-empty-body",children:"None"}):(0,l.jsx)("div",{className:"apd-kv",children:t.map(([o,n])=>(0,l.jsxs)(Me.Fragment,{children:[(0,l.jsx)("div",{className:"apd-kv-key",children:o}),(0,l.jsx)("div",{className:"apd-kv-val",children:n})]},o))})}function Ct({log:e,onTogglePin:t}){var s,a,d,m,f;if(!e)return(0,l.jsx)("div",{className:"apd-detail",children:(0,l.jsx)("div",{className:"apd-detail-empty",children:"Select a request to see full details"})});let o=He(e),n=(a=(s=Z(e.requestBody))!=null?s:e.requestBodyRaw)!=null?a:"",r=(m=(d=Z(e.responseBody))!=null?d:e.responseBodyRaw)!=null?m:"";return(0,l.jsxs)("div",{className:"apd-detail",children:[(0,l.jsxs)("div",{className:"apd-detail-header",children:[(0,l.jsxs)("div",{className:"apd-detail-url",children:[(0,l.jsx)("strong",{children:e.method})," ",e.url]}),(0,l.jsx)("button",{type:"button",className:"apd-action-btn",onClick:()=>t(e.id),title:e.pinned?"Unpin":"Pin this request",children:e.pinned?"\u2605 Pinned":"\u2606 Pin"})]}),(0,l.jsxs)("div",{className:"apd-meta-grid",children:[(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{className:"apd-meta-label",children:"Status"}),(0,l.jsxs)("div",{className:"apd-meta-value",style:{color:e.success?"var(--apd-success)":"var(--apd-error)"},children:[(f=e.responseStatus)!=null?f:"Failed"," ",e.responseStatusText]})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{className:"apd-meta-label",children:"Duration"}),(0,l.jsx)("div",{className:"apd-meta-value",children:he(e.duration)})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{className:"apd-meta-label",children:"Time"}),(0,l.jsx)("div",{className:"apd-meta-value",children:Q(e.timestamp)})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{className:"apd-meta-label",children:"Source"}),(0,l.jsx)("div",{className:"apd-meta-value",children:e.source})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{className:"apd-meta-label",children:"Req. size"}),(0,l.jsx)("div",{className:"apd-meta-value",children:ze(e.requestSize)})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{className:"apd-meta-label",children:"Res. size"}),(0,l.jsx)("div",{className:"apd-meta-value",children:ze(e.responseSize)})]})]}),e.error&&(0,l.jsxs)("div",{className:"apd-section",style:{borderColor:"var(--apd-error)"},children:[(0,l.jsx)("div",{className:"apd-section-header",style:{color:"var(--apd-error)"},children:"Error"}),(0,l.jsx)("div",{className:"apd-section-body",children:e.error})]}),(0,l.jsxs)("div",{className:"apd-actions",children:[(0,l.jsx)(Re,{label:"Copy cURL",getText:()=>o}),(0,l.jsx)(Re,{label:"Copy Request",getText:()=>n}),(0,l.jsx)(Re,{label:"Copy Response",getText:()=>r})]}),(0,l.jsx)(re,{title:"cURL",children:(0,l.jsx)(Pe,{value:o,searchable:!1})}),(0,l.jsx)(re,{title:"Query Params",count:Object.keys(e.queryParams).length,defaultOpen:!1,children:(0,l.jsx)(Je,{data:e.queryParams})}),(0,l.jsx)(re,{title:"Request Headers",count:Object.keys(e.requestHeaders).length,defaultOpen:!1,children:(0,l.jsx)(Je,{data:e.requestHeaders})}),(0,l.jsx)(re,{title:"Request Body",children:e.requestBodyRaw?(0,l.jsx)(Pe,{value:e.requestBody,raw:e.requestBodyRaw}):(0,l.jsx)("div",{className:"apd-empty-body",children:"No body"})}),(0,l.jsx)(re,{title:"Response Headers",count:Object.keys(e.responseHeaders).length,defaultOpen:!1,children:(0,l.jsx)(Je,{data:e.responseHeaders})}),(0,l.jsx)(re,{title:"Response Body",children:e.responseBodyRaw?(0,l.jsx)(Pe,{value:e.responseBody,raw:e.responseBodyRaw}):(0,l.jsx)("div",{className:"apd-empty-body",children:"No body"})})]})}var Rt=require("react");var N=require("react/jsx-runtime"),uo={log:"\u25B8",info:"\u2139",warn:"\u26A0",error:"\u2715",debug:"\u2699"};function mo({entry:e}){var n;let[t,o]=(0,Rt.useState)(!1);return(0,N.jsxs)("div",{className:`apd-console-item apd-console-${e.level}`,children:[(0,N.jsx)("span",{className:"apd-console-icon",children:(n=uo[e.level])!=null?n:"\u25B8"}),(0,N.jsxs)("div",{className:"apd-console-body",children:[(0,N.jsx)("div",{className:"apd-console-preview",children:e.preview||"(empty)"}),(0,N.jsxs)("div",{className:"apd-console-meta",children:[(0,N.jsx)("span",{children:Q(e.timestamp)}),e.source!=="console"&&(0,N.jsx)("span",{children:e.source}),e.stack&&(0,N.jsx)("button",{type:"button",className:"apd-console-toggle-stack",onClick:()=>o(r=>!r),children:t?"Hide stack trace":"Show stack trace"})]}),t&&e.stack&&(0,N.jsx)("div",{className:"apd-console-stack",children:e.stack})]}),e.count>1&&(0,N.jsx)("span",{className:"apd-console-count",children:e.count})]})}function Pt({entries:e}){return e.length===0?(0,N.jsx)("div",{className:"apd-console-list",children:(0,N.jsxs)("div",{className:"apd-empty",children:["Nothing logged yet.",(0,N.jsx)("br",{}),"console.log/warn/error and uncaught errors will show up here."]})}):(0,N.jsx)("div",{className:"apd-console-list",children:e.map(t=>(0,N.jsx)(mo,{entry:t},t.id))})}var _=require("react");function Tt(e){let t=Object.keys(e).find(o=>o.startsWith("__reactFiber$")||o.startsWith("__reactInternalInstance$"));return t?e[t]:null}function fo(e){let t=Tt(e);for(;t;){let o=t._debugSource;if(o&&o.fileName)return{file:o.fileName,line:typeof o.lineNumber=="number"?o.lineNumber:void 0,column:typeof o.columnNumber=="number"?o.columnNumber:void 0,confidence:"exact",origin:"react"};t=t.return}return null}function go(e){let t=Tt(e);for(;t;){let o=t.type;if(typeof o=="function"&&o.name)return o.name;if(o&&typeof o=="object"&&o.displayName)return o.displayName;t=t.return}return null}function Ht(e){return e.__vueParentComponent?{version:3,inst:e.__vueParentComponent}:e.__vue__?{version:2,inst:e.__vue__}:null}function ho(e){var o,n;let t=e;for(;t;){let r=Ht(t);if(r){let s=r.version===3?(o=r.inst.type)==null?void 0:o.__file:(n=r.inst.$options)==null?void 0:n.__file;if(s)return{file:s,confidence:"exact",origin:"vue"}}t=t.parentElement}return null}function bo(e){var o,n,r,s;let t=e;for(;t;){let a=Ht(t);if(a){let d=a.version===3?((o=a.inst.type)==null?void 0:o.__name)||((n=a.inst.type)==null?void 0:n.name):((r=a.inst.$options)==null?void 0:r.name)||((s=a.inst.$options)==null?void 0:s._componentTag);if(d)return d}t=t.parentElement}return null}function xo(e){var o,n;let t=window.ng;if(!(t!=null&&t.getComponent))return null;try{let r=t.getComponent(e);return(n=(o=r==null?void 0:r.constructor)==null?void 0:o.name)!=null?n:null}catch{return null}}var vo=/(?:\()?(https?:\/\/[^\s)]+|\/[^\s)]+|[A-Za-z]:\\[^\s)]+):(\d+):(\d+)\)?/;function yo(e){let t=at(e);if(!(t!=null&&t.stack))return null;let o=t.stack.split(`
`).slice(1);for(let n of o){if(/next-api-debugger|core\/inspector\//.test(n))continue;let r=n.match(vo);if(r)return{file:r[1],line:Number(r[2]),column:Number(r[3]),confidence:"approximate",origin:"stack-trace"}}return null}var ge;async function wo(){if(ge!==void 0)return ge;try{ge=await(await fetch(location.href,{cache:"force-cache"})).text()}catch{ge=null}return ge}function ko(e){if(e.id)return`id="${e.id}"`;for(let t of["data-testid","name"]){let o=e.getAttribute(t);if(o)return`${t}="${o}"`}return e.className&&typeof e.className=="string"?`class="${e.className}"`:null}async function Eo(e){let t=location.pathname||"/",o=await wo();if(o){let n=ko(e);if(n){let r=o.indexOf(n);if(r!==-1){let s=o.slice(0,r).split(`
`).length;return{file:t,line:s,confidence:"approximate",origin:"plain-html"}}}}return{file:t,confidence:"approximate",origin:"plain-html"}}async function Mt(e){let t=fo(e);if(t)return t;let o=ho(e);if(o)return o;let n=yo(e);return n||Eo(e)}function qt(e){var t,o;return(o=(t=go(e))!=null?t:bo(e))!=null?o:xo(e)}var So=["display","position","top","right","bottom","left","width","height","color","background-color","font-family","font-size","font-weight","line-height","text-align","flex-direction","justify-content","align-items","gap","grid-template-columns","grid-template-rows","z-index","opacity","overflow","box-sizing","cursor"];function M(e){let t=parseFloat(e);return Number.isFinite(t)?t:0}function No(e){return{margin:{top:M(e.marginTop),right:M(e.marginRight),bottom:M(e.marginBottom),left:M(e.marginLeft)},border:{top:M(e.borderTopWidth),right:M(e.borderRightWidth),bottom:M(e.borderBottomWidth),left:M(e.borderLeftWidth)},padding:{top:M(e.paddingTop),right:M(e.paddingRight),bottom:M(e.paddingBottom),left:M(e.paddingLeft)},content:{width:M(e.width),height:M(e.height)}}}function Lo(e){let t=[],o=e.parentElement;for(;o&&o.tagName.toLowerCase()!=="html";)t.push({tag:o.tagName.toLowerCase(),id:o.id||null,classes:Array.from(o.classList)}),o=o.parentElement;return t}async function Bt(e){let t=getComputedStyle(e),o=e.getBoundingClientRect(),n={};Array.from(e.attributes).forEach(d=>{n[d.name]=d.value});let r={};So.forEach(d=>{r[d]=t.getPropertyValue(d)});let a=e.children.length===0&&(e.textContent||"").trim().slice(0,120)||null;return{tag:e.tagName.toLowerCase(),id:e.id||null,classes:Array.from(e.classList),attributes:n,rect:{x:o.x,y:o.y,width:o.width,height:o.height},box:No(t),computedStyles:r,ancestors:Lo(e),childCount:e.children.length,textPreview:a,componentName:qt(e),source:await Mt(e)}}function Co(e){return!!(e!=null&&e.closest(".apd-root"))}function At(e,t,o){let n=!0;function r(f){let p=document.elementFromPoint(f.clientX,f.clientY);return Co(p)?null:p}function s(f){n&&(t==null||t(r(f)))}function a(f){if(!n)return;let p=r(f);p&&(f.preventDefault(),f.stopPropagation(),m(),e(p))}function d(f){f.key==="Escape"&&(m(),o==null||o())}function m(){n=!1,window.removeEventListener("mousemove",s,!0),window.removeEventListener("click",a,!0),window.removeEventListener("keydown",d,!0)}return window.addEventListener("mousemove",s,!0),window.addEventListener("click",a,!0),window.addEventListener("keydown",d,!0),{cancel:()=>{m(),o==null||o()}}}function It(){let e=document.createElement("div");e.className="apd-inspect-highlight",e.style.display="none";function t(n){e.style.display="",e.style.left=`${n.left}px`,e.style.top=`${n.top}px`,e.style.width=`${n.width}px`,e.style.height=`${n.height}px`}function o(){e.style.display="none"}return{el:e,show:t,hide:o}}var i=require("react/jsx-runtime");function jt({data:e}){let t=Object.entries(e).filter(([,o])=>o!=="");return t.length===0?(0,i.jsx)("div",{className:"apd-empty-body",children:"None"}):(0,i.jsx)("div",{className:"apd-kv",children:t.map(([o,n])=>(0,i.jsxs)("div",{style:{display:"contents"},children:[(0,i.jsx)("div",{className:"apd-kv-key",children:o}),(0,i.jsx)("div",{className:"apd-kv-val",children:n})]},o))})}function Ro({info:e}){let{box:t}=e;return(0,i.jsx)("div",{className:"apd-box-model",children:(0,i.jsxs)("div",{className:"apd-box-layer apd-box-layer-margin",children:[(0,i.jsx)("span",{className:"apd-box-label apd-box-label-top",children:t.margin.top}),(0,i.jsx)("span",{className:"apd-box-label apd-box-label-right",children:t.margin.right}),(0,i.jsx)("span",{className:"apd-box-label apd-box-label-bottom",children:t.margin.bottom}),(0,i.jsx)("span",{className:"apd-box-label apd-box-label-left",children:t.margin.left}),(0,i.jsxs)("div",{className:"apd-box-layer apd-box-layer-border",children:[(0,i.jsx)("span",{className:"apd-box-label apd-box-label-top",children:t.border.top}),(0,i.jsx)("span",{className:"apd-box-label apd-box-label-right",children:t.border.right}),(0,i.jsx)("span",{className:"apd-box-label apd-box-label-bottom",children:t.border.bottom}),(0,i.jsx)("span",{className:"apd-box-label apd-box-label-left",children:t.border.left}),(0,i.jsxs)("div",{className:"apd-box-layer apd-box-layer-padding",children:[(0,i.jsx)("span",{className:"apd-box-label apd-box-label-top",children:t.padding.top}),(0,i.jsx)("span",{className:"apd-box-label apd-box-label-right",children:t.padding.right}),(0,i.jsx)("span",{className:"apd-box-label apd-box-label-bottom",children:t.padding.bottom}),(0,i.jsx)("span",{className:"apd-box-label apd-box-label-left",children:t.padding.left}),(0,i.jsxs)("div",{className:"apd-box-layer-content",children:[Math.round(t.content.width)," \xD7 ",Math.round(t.content.height)]})]})]})]})})}function Po({info:e,editorProjectRoot:t}){var d;let{source:o,componentName:n}=e;if(!o)return(0,i.jsx)("div",{className:"apd-source-card",children:(0,i.jsx)("div",{className:"apd-source-none",children:"Source location unavailable for this element."})});let r=o.line?`${o.file}:${o.line}${o.column?`:${o.column}`:""}`:o.file,s=!!t,a=s?`vscode://file/${t.replace(/\/$/,"")}/${o.file.replace(/^\//,"")}${o.line?`:${o.line}:${(d=o.column)!=null?d:1}`:""}`:void 0;return(0,i.jsxs)("div",{className:"apd-source-card",children:[n&&(0,i.jsxs)("div",{style:{fontSize:11,color:"var(--apd-text-dim)",marginBottom:4},children:["Component: ",(0,i.jsx)("strong",{style:{color:"var(--apd-text)"},children:n})]}),s?(0,i.jsx)("a",{className:"apd-source-path",href:a,title:"Open in VS Code",children:r}):(0,i.jsx)("span",{className:"apd-source-path apd-source-path-plain",children:r}),(0,i.jsxs)("div",{className:"apd-source-meta",children:[(0,i.jsx)("span",{className:`apd-confidence-badge apd-confidence-${o.confidence}`,children:o.confidence}),(0,i.jsxs)("span",{children:["via ",o.origin]}),!s&&(0,i.jsx)("button",{type:"button",className:"apd-console-toggle-stack",onClick:()=>xe(r),style:{marginLeft:"auto"},children:"Copy path"})]})]})}function zt({onInspectingChange:e,editorProjectRoot:t}){let[o,n]=(0,_.useState)(!1),[r,s]=(0,_.useState)(!1),[a,d]=(0,_.useState)(null),m=(0,_.useRef)(null),f=(0,_.useRef)(null);(0,_.useEffect)(()=>()=>{var u,x;(u=m.current)==null||u.cancel(),(x=f.current)==null||x.el.remove()},[]);function p(){var u,x;(u=f.current)==null||u.hide(),(x=f.current)==null||x.el.remove(),f.current=null}function b(){n(!0),e(!0);let u=It();document.body.appendChild(u.el),f.current=u,m.current=At(async x=>{p(),n(!1),e(!1),s(!0);let v=await Bt(x);d(v),s(!1)},x=>{x?u.show(x.getBoundingClientRect()):u.hide()},()=>{p(),n(!1),e(!1)})}function h(){var u;(u=m.current)==null||u.cancel()}return a?(0,i.jsxs)("div",{className:"apd-inspector-body",children:[(0,i.jsxs)("div",{style:{display:"flex",alignItems:"flex-start",gap:10,marginBottom:12},children:[(0,i.jsxs)("div",{style:{flex:1},children:[(0,i.jsxs)("div",{className:"apd-inspector-tag",children:["<",a.tag,a.id&&(0,i.jsxs)("span",{className:"apd-tag-id",children:[" #",a.id]}),a.classes.map(u=>(0,i.jsxs)("span",{className:"apd-tag-class",children:[" ",".",u]},u)),">"]}),a.textPreview&&(0,i.jsxs)("div",{style:{fontSize:11.5,color:"var(--apd-text-dim)",fontFamily:"var(--apd-mono)"},children:['"',a.textPreview,'"']})]}),(0,i.jsx)("button",{type:"button",className:"apd-action-btn",onClick:b,children:"\u2316 Inspect another"})]}),a.ancestors.length>0&&(0,i.jsxs)("div",{className:"apd-inspector-breadcrumb",children:[[...a.ancestors].reverse().map((u,x)=>(0,i.jsxs)("span",{children:[u.tag,u.id?`#${u.id}`:""]},x)),(0,i.jsx)("span",{style:{color:"var(--apd-accent)"},children:a.tag})]}),(0,i.jsx)(Po,{info:a,editorProjectRoot:t}),(0,i.jsxs)("div",{className:"apd-meta-grid",children:[(0,i.jsxs)("div",{children:[(0,i.jsx)("div",{className:"apd-meta-label",children:"Position"}),(0,i.jsxs)("div",{className:"apd-meta-value",children:[Math.round(a.rect.x),", ",Math.round(a.rect.y)]})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)("div",{className:"apd-meta-label",children:"Size"}),(0,i.jsxs)("div",{className:"apd-meta-value",children:[Math.round(a.rect.width)," \xD7 ",Math.round(a.rect.height)]})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)("div",{className:"apd-meta-label",children:"Children"}),(0,i.jsx)("div",{className:"apd-meta-value",children:a.childCount})]})]}),(0,i.jsxs)("div",{className:"apd-section",children:[(0,i.jsx)("div",{className:"apd-section-header",children:"Box Model"}),(0,i.jsx)("div",{className:"apd-section-body",children:(0,i.jsx)(Ro,{info:a})})]}),(0,i.jsxs)("div",{className:"apd-section",children:[(0,i.jsxs)("div",{className:"apd-section-header",children:["Attributes (",Object.keys(a.attributes).length,")"]}),(0,i.jsx)("div",{className:"apd-section-body",children:(0,i.jsx)(jt,{data:a.attributes})})]}),(0,i.jsxs)("div",{className:"apd-section",children:[(0,i.jsx)("div",{className:"apd-section-header",children:"Computed Styles"}),(0,i.jsx)("div",{className:"apd-section-body",children:(0,i.jsx)(jt,{data:a.computedStyles})})]})]}):(0,i.jsxs)("div",{className:"apd-inspector-empty",children:[(0,i.jsx)("button",{type:"button",className:`apd-inspect-start-btn${o?" apd-inspecting":""}`,onClick:o?h:b,children:o?"\u25FC Stop Inspecting (Esc)":"\u2316 Start Inspecting"}),(0,i.jsx)("p",{children:o?"Hover any element on the page and click to select it.":r?"Resolving source location\u2026":"Pick any element on the page to see its DOM details, computed styles, and \u2014 when available \u2014 the exact source file responsible for it."})]})}function $t(e){return Object.entries(e).map(([t,o])=>({name:t,value:o}))}function To(e){return Object.entries(e).map(([t,o])=>({name:t,value:o}))}function qe(e){return{log:{version:"1.2",creator:{name:"next-api-debugger",version:"0.1.0"},entries:e.map(t=>{var o,n;return{startedDateTime:new Date(t.timestamp).toISOString(),time:t.duration,request:{method:t.method,url:t.url,httpVersion:"HTTP/1.1",headers:$t(t.requestHeaders),queryString:To(t.queryParams),cookies:[],headersSize:-1,bodySize:t.requestSize,postData:t.requestBodyRaw?{mimeType:t.requestHeaders["content-type"]||"application/json",text:t.requestBodyRaw}:void 0},response:{status:(o=t.responseStatus)!=null?o:0,statusText:t.responseStatusText,httpVersion:"HTTP/1.1",headers:$t(t.responseHeaders),cookies:[],content:{size:t.responseSize,mimeType:t.responseHeaders["content-type"]||"application/json",text:(n=t.responseBodyRaw)!=null?n:""},redirectURL:"",headersSize:-1,bodySize:t.responseSize},cache:{},timings:{send:0,wait:t.duration,receive:0}}})}}}function Ve(e,t){let o=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),n=URL.createObjectURL(o),r=document.createElement("a");r.href=n,r.download=e,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(n)}var c=require("react/jsx-runtime"),Ho=["GET","POST","PUT","PATCH","DELETE"],Mo=["log","info","warn","error","debug"];function Dt({logs:e,consoleEntries:t,onClose:o,onClear:n,onClearConsole:r,onTogglePin:s,theme:a,onToggleTheme:d,inspectorEnabled:m,editorProjectRoot:f}){var Ke,We,Ye;let[p,b]=(0,A.useState)("network"),[h,u]=(0,A.useState)({search:"",status:"all",methods:[]}),[x,v]=(0,A.useState)(null),[y,R]=(0,A.useState)(!1),[P,w]=(0,A.useState)(""),[C,F]=(0,A.useState)([]);(0,A.useEffect)(()=>{!x&&e.length>0&&v(e[0].id)},[e,x]);let T=(0,A.useMemo)(()=>{let g=h.search.trim().toLowerCase();return e.filter(k=>{var G;return!(h.status==="success"&&!k.success||h.status==="failed"&&k.success||h.methods.length>0&&!h.methods.includes(k.method)||g&&!`${k.url} ${k.endpoint} ${k.method} ${(G=k.responseStatus)!=null?G:""}`.toLowerCase().includes(g))})},[e,h]),Y=(0,A.useMemo)(()=>{let g=P.trim().toLowerCase();return t.filter(k=>!(C.length>0&&!C.includes(k.level)||g&&!k.preview.toLowerCase().includes(g)))},[t,P,C]),I=(We=(Ke=T.find(g=>g.id===x))!=null?Ke:T[0])!=null?We:null,L=e.filter(g=>!g.success).length,Be=t.filter(g=>g.level==="error").length;function _t(g){u(k=>({...k,methods:k.methods.includes(g)?k.methods.filter(G=>G!==g):[...k.methods,g]}))}function Ft(g){F(k=>k.includes(g)?k.filter(G=>G!==g):[...k,g])}let Ut=p==="network"?`${e.length} requests${L>0?` \xB7 ${L} failed`:""}`:p==="console"?`${t.length} logs${Be>0?` \xB7 ${Be} errors`:""}`:"element picker";return(0,c.jsx)("div",{className:E("apd-overlay",y&&"apd-overlay-passthrough"),onClick:o,children:(0,c.jsxs)("div",{className:`apd-modal${y?" apd-minimized":""}`,onClick:g=>g.stopPropagation(),children:[(0,c.jsxs)("div",{className:"apd-header",children:[(0,c.jsxs)("div",{className:"apd-header-title",children:[(0,c.jsx)("span",{className:"apd-live-dot"}),"API Debugger"]}),(0,c.jsx)("span",{className:"apd-header-count",children:Ut}),(0,c.jsx)("div",{className:"apd-spacer"}),(0,c.jsx)("button",{className:"apd-icon-btn",onClick:d,title:"Toggle theme",type:"button",children:a==="light"?"\u2600":"\u263E"}),p==="network"&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("button",{className:"apd-icon-btn",title:"Export JSON",type:"button",onClick:()=>Ve(`api-logs-${Date.now()}.json`,e),children:"\u2B73"}),(0,c.jsx)("button",{className:"apd-icon-btn",title:"Export HAR",type:"button",onClick:()=>Ve(`api-logs-${Date.now()}.har`,qe(e)),children:"HAR"})]}),p!=="inspector"&&(0,c.jsx)("button",{className:"apd-icon-btn",title:p==="network"?"Clear logs":"Clear console",type:"button",onClick:p==="network"?n:r,children:"\u{1F5D1}"}),(0,c.jsx)("button",{className:"apd-icon-btn",title:y?"Restore":"Minimize",type:"button",onClick:()=>R(g=>!g),children:y?"\u25A2":"\u2014"}),(0,c.jsx)("button",{className:"apd-icon-btn",title:"Close",type:"button",onClick:o,children:"\u2715"})]}),!y&&(0,c.jsxs)("div",{className:"apd-tabs",children:[(0,c.jsxs)("button",{type:"button",className:E("apd-tab",p==="network"&&"apd-active"),onClick:()=>b("network"),children:["Network",e.length>0&&(0,c.jsx)("span",{className:E("apd-tab-badge",L>0&&"apd-tab-badge-error"),children:e.length})]}),(0,c.jsxs)("button",{type:"button",className:E("apd-tab",p==="console"&&"apd-active"),onClick:()=>b("console"),children:["Console",t.length>0&&(0,c.jsx)("span",{className:E("apd-tab-badge",Be>0&&"apd-tab-badge-error"),children:t.length})]}),m&&(0,c.jsx)("button",{type:"button",className:E("apd-tab",p==="inspector"&&"apd-active"),onClick:()=>b("inspector"),children:"Inspector"})]}),!y&&p==="network"&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)("div",{className:"apd-toolbar",children:[(0,c.jsx)(Xe,{value:h.search,onChange:g=>u(k=>({...k,search:g}))}),(0,c.jsx)(yt,{status:h.status,onStatusChange:g=>u(k=>({...k,status:g})),methods:Ho,activeMethods:h.methods,onToggleMethod:_t})]}),(0,c.jsxs)("div",{className:"apd-body",children:[(0,c.jsx)(kt,{logs:T,selectedId:(Ye=I==null?void 0:I.id)!=null?Ye:null,onSelect:v,onTogglePin:s}),(0,c.jsx)(Ct,{log:I,onTogglePin:s})]})]}),!y&&p==="console"&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)("div",{className:"apd-toolbar",children:[(0,c.jsx)(Xe,{value:P,onChange:w}),Mo.map(g=>(0,c.jsx)("button",{type:"button",className:E("apd-chip",C.includes(g)&&"apd-active"),onClick:()=>Ft(g),children:g},g))]}),(0,c.jsx)(Pt,{entries:Y})]}),m&&(0,c.jsx)("div",{style:{display:!y&&p==="inspector"?"flex":"none",flexDirection:"column",flex:1,overflow:"hidden"},children:(0,c.jsx)(zt,{onInspectingChange:R,editorProjectRoot:f})}),!y&&(0,c.jsxs)("div",{className:"apd-footer",children:[(0,c.jsxs)("span",{children:[(0,c.jsx)("span",{className:"apd-kbd",children:"Ctrl"}),"+",(0,c.jsx)("span",{className:"apd-kbd",children:"Shift"}),"+",(0,c.jsx)("span",{className:"apd-kbd",children:"D"})," to toggle \xB7 ",(0,c.jsx)("span",{className:"apd-kbd",children:"Space"}),"+",(0,c.jsx)("span",{className:"apd-kbd",children:"H"})," to hide"]}),(0,c.jsx)("span",{style:{marginLeft:"auto"},children:"next-api-debugger \xB7 dev only"})]})]})})}var se=require("react/jsx-runtime");function qo(e){return typeof e=="boolean"?e:process.env.NODE_ENV!=="production"}function Ot(e){let{enabled:t,maxLogs:o=200,initialPosition:n,axiosInstance:r,theme:s="dark",keyboardShortcut:a=!0,ignoreUrls:d,inspector:m=!0,editorProjectRoot:f}=e,p=qo(t),[b,h]=(0,ae.useState)(!1),[u,x]=(0,ae.useState)(!1),[v,y]=(0,ae.useState)(s),{logs:R,clear:P,togglePin:w}=st(),{entries:C,clear:F}=it();if((0,ae.useEffect)(()=>{if(!p||typeof window=="undefined")return;S.setMaxLogs(o),j.setMaxEntries(500),ye({ignoreUrls:d}),Ge({ignoreUrls:d}),tt(),m&&nt();let L=r?Ee(r,{ignoreUrls:d}):()=>{};return()=>{we(),Ze(),ot(),m&&rt(),L()}},[p,m]),pt({ctrl:!0,shift:!0,key:"d"},()=>h(L=>!L),p&&a),ct(["space","h"],()=>{x(L=>!L),h(!1)},p&&a),!p)return null;let T=R.filter(L=>!L.success).length,Y=C.filter(L=>L.level==="error").length,I=v==="system"?"dark":v;return(0,se.jsxs)("div",{className:`apd-root${I==="light"?" apd-light":""}`,children:[(0,se.jsx)(gt,{}),!u&&!b&&(0,se.jsx)(vt,{count:R.length+C.length,hasErrors:T>0||Y>0,onOpen:()=>h(!0),initialPosition:n}),!u&&b&&(0,se.jsx)(Dt,{logs:R,consoleEntries:C,onClose:()=>h(!1),onClear:P,onClearConsole:F,onTogglePin:w,theme:I,onToggleTheme:()=>y(I==="light"?"dark":"light"),inspectorEnabled:m,editorProjectRoot:f})]})}0&&(module.exports={ApiDebugger,exportAsHar,generateCurl,installAxiosInterceptor,installFetchInterceptor,logStore,uninstallFetchInterceptor});
//# sourceMappingURL=index.js.map