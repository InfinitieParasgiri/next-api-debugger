'use client';
"use strict";var Fe=Object.defineProperty;var ln=Object.getOwnPropertyDescriptor;var cn=Object.getOwnPropertyNames;var un=Object.prototype.hasOwnProperty;var mn=(e,t)=>{for(var n in t)Fe(e,n,{get:t[n],enumerable:!0})},fn=(e,t,n,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of cn(t))!un.call(e,r)&&r!==n&&Fe(e,r,{get:()=>t[r],enumerable:!(o=ln(t,r))||o.enumerable});return e};var gn=e=>fn(Fe({},"__esModule",{value:!0}),e);var lo={};mn(lo,{ApiDebugger:()=>pn,exportAsHar:()=>Oe,generateCurl:()=>ze,installAxiosInterceptor:()=>Pe,installFetchInterceptor:()=>Le,logStore:()=>E,uninstallFetchInterceptor:()=>Ce});module.exports=gn(lo);var X=require("react");var Xe=class{constructor(){this.logs=[];this.listeners=new Set;this.maxLogs=200;this.snapshot=[];this.getLogs=()=>(this.snapshot=this.logs,this.snapshot);this.subscribe=t=>(this.listeners.add(t),()=>this.listeners.delete(t))}setMaxLogs(t){this.maxLogs=Math.max(1,t),this.trim()}addLog(t){this.logs=[t,...this.logs],this.trim(),this.emit()}togglePin(t){this.logs=this.logs.map(n=>n.id===t?{...n,pinned:!n.pinned}:n),this.emit()}clear(){this.logs=[],this.emit()}trim(){if(this.logs.length<=this.maxLogs)return;let t=this.logs.filter(s=>s.pinned),o=this.logs.filter(s=>!s.pinned).slice(0,Math.max(0,this.maxLogs-t.length)),r=[...t,...o];r.sort((s,a)=>a.timestamp-s.timestamp),this.logs=r}emit(){this.listeners.forEach(t=>t())}},E=new Xe;var Ve=class{constructor(){this.entries=[];this.listeners=new Set;this.maxEntries=500;this.getEntries=()=>this.entries;this.subscribe=t=>(this.listeners.add(t),()=>this.listeners.delete(t))}setMaxEntries(t){this.maxEntries=Math.max(1,t),this.trim()}addEntry(t){let n=this.entries[0];n&&n.level===t.level&&n.preview===t.preview&&n.stack===t.stack?this.entries=[{...n,count:n.count+1,timestamp:t.timestamp},...this.entries.slice(1)]:this.entries=[t,...this.entries],this.trim(),this.emit()}clear(){this.entries=[],this.emit()}trim(){this.entries.length>this.maxEntries&&(this.entries=this.entries.slice(0,this.maxEntries))}emit(){this.listeners.forEach(t=>t())}},z=new Ve;var _="x-apd-skip";function U(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,9)}`}function J(e){if(!e)return null;try{return JSON.parse(e)}catch{return e}}function te(e){if(e==null)return null;if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return String(e)}}function F(e){if(!e)return 0;try{return new Blob([e]).size}catch{return e.length}}function Je(e){if(!e)return"0 B";let t=["B","KB","MB","GB"],n=Math.min(t.length-1,Math.floor(Math.log(e)/Math.log(1024))),o=e/Math.pow(1024,n);return`${n===0?o:o.toFixed(1)} ${t[n]}`}function ke(e){return e<1e3?`${e} ms`:`${(e/1e3).toFixed(2)} s`}function ne(e){let t=new Date(e);return t.toLocaleTimeString(void 0,{hour12:!1})+`.${String(t.getMilliseconds()).padStart(3,"0")}`}function oe(e){try{let t=typeof window!="undefined"?window.location.origin:"http://localhost",n=new URL(e,t),o={};return n.searchParams.forEach((r,s)=>{o[s]=r}),{endpoint:n.pathname,queryParams:o}}catch{return{endpoint:e,queryParams:{}}}}function Ee(e){let t={};return e&&e.forEach((n,o)=>{t[o]=n}),t}function ce(e){let t={};if(!e)return t;if(typeof e.toJSON=="function")return{...e.toJSON()};if(e instanceof Headers)return Ee(e);if(typeof e=="object")for(let[n,o]of Object.entries(e))o!=null&&(t[n]=String(o));return t}function re(e,t){return!t||t.length===0?!1:t.some(n=>n instanceof RegExp?n.test(e):e.includes(n))}function N(...e){return e.filter(Boolean).join(" ")}async function Se(e){try{if(navigator.clipboard&&window.isSecureContext)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select();let n=document.execCommand("copy");return document.body.removeChild(t),n}catch{return!1}}var K=null,Ne=!1;function hn(e){if(e==null)return null;if(typeof e=="string")return e;if(e instanceof URLSearchParams)return e.toString();if(e instanceof FormData){let t=[];return e.forEach((n,o)=>{t.push(`${o}=${n instanceof File?`[File: ${n.name}]`:n}`)}),t.join("&")}return"[binary data]"}function Le(e={}){Ne||typeof window=="undefined"||typeof window.fetch!="function"||(K=window.fetch.bind(window),Ne=!0,window.fetch=async function(n,o){var S,u,g,L,P;let r=n instanceof Request?n:null,s=r?r.url:String(n);if(re(s,e.ignoreUrls))return K(n,o);let a=Ee(new Headers((u=(S=o==null?void 0:o.headers)!=null?S:r==null?void 0:r.headers)!=null?u:void 0));if(a[_]){let y=new Headers((L=(g=o==null?void 0:o.headers)!=null?g:r==null?void 0:r.headers)!=null?L:void 0);return y.delete(_),r?K(new Request(r,{headers:y})):K(n,{...o,headers:y})}let i=Date.now(),l=performance.now(),m=((o==null?void 0:o.method)||(r==null?void 0:r.method)||"GET").toUpperCase(),{endpoint:p,queryParams:b}=oe(s),h=hn((P=o==null?void 0:o.body)!=null?P:null),v={id:U(),url:s,endpoint:p,method:m,requestHeaders:a,requestBody:J(h),requestBodyRaw:h,queryParams:b,timestamp:i,source:"fetch",requestSize:F(h),pinned:!1};try{let y=await K(n,o),T=Math.round(performance.now()-l),V=y.clone(),R=null;try{R=await V.text()}catch{R=null}return E.addLog({...v,duration:T,responseStatus:y.status,responseStatusText:y.statusText,responseHeaders:Ee(y.headers),responseBody:J(R),responseBodyRaw:R,responseSize:F(R),success:y.ok,error:y.ok?null:`HTTP ${y.status} ${y.statusText}`}),y}catch(y){let T=Math.round(performance.now()-l);throw E.addLog({...v,duration:T,responseStatus:null,responseStatusText:"",responseHeaders:{},responseBody:null,responseBodyRaw:null,responseSize:0,success:!1,error:(y==null?void 0:y.message)||"Network error"}),y}})}function Ce(){Ne&&K&&typeof window!="undefined"&&(window.fetch=K),Ne=!1,K=null}var ue=null,se=null,me=null,Re=!1,ae=Symbol("apd-xhr-meta");function bn(e){let t={};return e.trim().split(/[\r\n]+/).forEach(n=>{let o=n.indexOf(":");if(o===-1)return;let r=n.slice(0,o).trim().toLowerCase(),s=n.slice(o+1).trim();r&&(t[r]=s)}),t}function pt(e={}){Re||typeof window=="undefined"||typeof XMLHttpRequest=="undefined"||(ue=XMLHttpRequest.prototype.open,se=XMLHttpRequest.prototype.send,me=XMLHttpRequest.prototype.setRequestHeader,Re=!0,XMLHttpRequest.prototype.open=function(n,o,...r){let s=String(o);return this[ae]={id:U(),method:(n||"GET").toUpperCase(),url:s,startTime:0,startPerf:0,requestHeaders:{},ignored:re(s,e.ignoreUrls)},ue.apply(this,[n,o,...r])},XMLHttpRequest.prototype.setRequestHeader=function(n,o){if(n.toLowerCase()===_){this[ae]&&(this[ae].ignored=!0);return}return this[ae]&&(this[ae].requestHeaders[n]=o),me.apply(this,[n,o])},XMLHttpRequest.prototype.send=function(n){let o=this[ae];if(!o||o.ignored)return se.apply(this,[n]);o.startTime=Date.now(),o.startPerf=performance.now();let r=n==null?null:typeof n=="string"?n:n instanceof URLSearchParams?n.toString():n instanceof FormData?"[form data]":"[binary data]",s=()=>{let a=Math.round(performance.now()-o.startPerf),{endpoint:i,queryParams:l}=oe(o.url),m=bn(this.getAllResponseHeaders()||""),p=null;try{p=typeof this.responseText=="string"?this.responseText:null}catch{p=null}let b=this.status,h=b>=200&&b<400,v={id:o.id,url:o.url,endpoint:i,method:o.method,requestHeaders:o.requestHeaders,requestBody:J(r),requestBodyRaw:r,queryParams:l,responseStatus:b||null,responseStatusText:this.statusText||"",responseHeaders:m,responseBody:J(p),responseBodyRaw:p,duration:a,timestamp:o.startTime,success:h,error:h?null:b===0?"Network error":`HTTP ${b} ${this.statusText}`,source:"xhr",requestSize:F(r),responseSize:F(p),pinned:!1};E.addLog(v),this.removeEventListener("loadend",s)};return this.addEventListener("loadend",s),se.apply(this,[n])})}function lt(){Re&&typeof window!="undefined"&&typeof XMLHttpRequest!="undefined"&&(ue&&(XMLHttpRequest.prototype.open=ue),se&&(XMLHttpRequest.prototype.send=se),me&&(XMLHttpRequest.prototype.setRequestHeader=me)),Re=!1,ue=null,se=null,me=null}function xn(e){let t=(e==null?void 0:e.baseURL)||"",n=(e==null?void 0:e.url)||"",o=/^https?:\/\//i.test(n)?n:`${t}${t&&!t.endsWith("/")&&!n.startsWith("/")?"/":""}${n}`;if(e!=null&&e.params&&typeof e.params=="object"){let r=vn(e.params);r&&(o+=(o.includes("?")?"&":"?")+r)}return o}function vn(e){let t=new URLSearchParams;for(let[n,o]of Object.entries(e))o!=null&&(Array.isArray(o)?o.forEach(r=>t.append(n,String(r))):t.append(n,String(o)));return t.toString()}function ct(e){if(e==null)return null;if(typeof e=="string")return e;if(typeof URLSearchParams!="undefined"&&e instanceof URLSearchParams)return e.toString();if(typeof FormData!="undefined"&&e instanceof FormData){let t=[];return e.forEach((n,o)=>{t.push(`${o}=${n instanceof File?`[File: ${n.name}]`:n}`)}),t.join("&")}return te(e)}function Pe(e,t={}){var s;if(!e||!e.interceptors||typeof((s=e.interceptors.request)==null?void 0:s.use)!="function")return()=>{};if(e.__apiDebuggerInstalled)return()=>{};e.__apiDebuggerInstalled=!0;let n=e.interceptors.request.use(a=>{let i={id:U(),startTime:Date.now(),startPerf:performance.now(),requestBodyRaw:ct(a.data),requestHeadersSnapshot:ce(a.headers)};return a.__apdMeta=i,a.headers&&typeof a.headers.set=="function"?a.headers.set(_,"1"):a.headers={...a.headers||{},[_]:"1"},a});function o(a,i,l){var T,V,R,Q,O,$;if(!a)return;let m=xn(a);if(re(m,t.ignoreUrls))return;let p=a.__apdMeta||{id:U(),startTime:Date.now(),startPerf:performance.now(),requestBodyRaw:ct(a.data),requestHeadersSnapshot:ce(a.headers)},b=Math.round(performance.now()-p.startPerf),{endpoint:h,queryParams:v}=oe(m),S=ce(a.headers),u=Object.keys(S).length>0?S:p.requestHeadersSnapshot;delete u[_];let g=p.requestBodyRaw,L=(i==null?void 0:i.data)!==void 0?te(i.data):null,P=(R=(V=i==null?void 0:i.status)!=null?V:(T=l==null?void 0:l.response)==null?void 0:T.status)!=null?R:null,y={id:p.id,url:m,endpoint:h,method:(a.method||"get").toUpperCase(),requestHeaders:u,requestBody:(Q=J(g))!=null?Q:g,requestBodyRaw:g,queryParams:v,responseStatus:P,responseStatusText:(O=i==null?void 0:i.statusText)!=null?O:"",responseHeaders:ce(i==null?void 0:i.headers),responseBody:($=i==null?void 0:i.data)!=null?$:null,responseBodyRaw:L,duration:b,timestamp:p.startTime,success:!l&&!!P&&P<400,error:l?l.message||"Request failed":null,source:"axios",requestSize:F(g),responseSize:F(L),pinned:!1};E.addLog(y)}let r=e.interceptors.response.use(a=>(o(a.config,a),a),a=>(o(a==null?void 0:a.config,a==null?void 0:a.response,a),Promise.reject(a)));return()=>{e.interceptors.request.eject(n),e.interceptors.response.eject(r),e.__apiDebuggerInstalled=!1}}var ut=["log","info","warn","error","debug"],We={},fe=null,ge=null,Ye=!1;function yn(e,t=new WeakSet){var n;if(e===null)return"null";if(e===void 0)return"undefined";if(typeof e=="string")return e;if(typeof e=="number"||typeof e=="boolean")return String(e);if(e instanceof Error)return`${e.name}: ${e.message}`;if(typeof e=="function")return e.name?`\u0192 ${e.name}()`:"\u0192 ()";if(typeof e=="object"){if(t.has(e))return"[Circular]";t.add(e);try{return(n=JSON.stringify(e,(o,r)=>typeof r=="bigint"?r.toString():r,2))!=null?n:String(e)}catch{return Array.isArray(e)?"[Array]":"[Object]"}}return String(e)}function wn(e){for(let t of e)if(t instanceof Error&&t.stack)return t.stack;return null}function Ke(e,t,n){let o=t.map(r=>yn(r));return{id:U(),level:e,parts:o,preview:o.join(" "),stack:wn(t),timestamp:Date.now(),source:n,count:1}}function mt(e={}){var n,o;if(Ye||typeof window=="undefined"||typeof console=="undefined")return;Ye=!0;let t=(n=e.levels)!=null?n:ut;for(let r of t){let s=(o=console[r])==null?void 0:o.bind(console);s&&(We[r]=s,console[r]=(...a)=>{z.addEntry(Ke(r,a,"console")),s(...a)})}fe=r=>{let s=r.error?[r.error]:[r.message],a=Ke("error",s,"window.onerror");z.addEntry({...a,preview:a.preview||`${r.message} (${r.filename}:${r.lineno}:${r.colno})`})},window.addEventListener("error",fe),ge=r=>{let s=r.reason,a=Ke("error",[s],"unhandledrejection");z.addEntry({...a,preview:`Unhandled promise rejection: ${a.preview}`})},window.addEventListener("unhandledrejection",ge)}function ft(){if(typeof console!="undefined")for(let e of ut){let t=We[e];t&&(console[e]=t)}typeof window!="undefined"&&(fe&&window.removeEventListener("error",fe),ge&&window.removeEventListener("unhandledrejection",ge)),We={},fe=null,ge=null,Ye=!1}var Ge=new WeakMap,he=null,be=null,Ze=!1;function gt(){Ze||typeof document=="undefined"||(Ze=!0,he=document.createElement.bind(document),be=document.createElementNS.bind(document),document.createElement=function(t,n){let o=he(t,n);return Ge.set(o,new Error),o},document.createElementNS=function(t,n,o){let r=be(t,n,o);return Ge.set(r,new Error),r})}function ht(){he&&(document.createElement=he),be&&(document.createElementNS=be),Ze=!1,he=null,be=null}function bt(e){return Ge.get(e)}function xt(e){let t;try{t=new URL(e,window.location.href)}catch{return()=>{}}if(t.origin!==window.location.origin)return()=>{};let n=new Set,o=new AbortController,r=!1;async function s(){if(!r){r=!0;try{let i=await fetch(t.toString(),{cache:"no-store",credentials:"same-origin",signal:o.signal});if(!i.ok)return;let l=await i.json();if(o.signal.aborted||!Array.isArray(l))return;for(let m of l.slice().reverse()){if(!m||typeof m!="object")continue;let p=m;p.source!=="server-fetch"||typeof p.id!="string"||n.has(p.id)||(n.add(p.id),E.addLog(p))}if(n.size>1e3){let m=n.values();for(;n.size>500;){let p=m.next();if(p.done)break;n.delete(p.value)}}}catch{}finally{r=!1}}}s();let a=window.setInterval(()=>{s()},2e3);return()=>{window.clearInterval(a),o.abort()}}var xe=require("react");function vt(){let e=(0,xe.useSyncExternalStore)(E.subscribe,E.getLogs,E.getLogs),t=(0,xe.useCallback)(()=>E.clear(),[]),n=(0,xe.useCallback)(o=>E.togglePin(o),[]);return{logs:e,clear:t,togglePin:n}}var Te=require("react");function yt(){let e=(0,Te.useSyncExternalStore)(z.subscribe,z.getEntries,z.getEntries),t=(0,Te.useCallback)(()=>z.clear(),[]);return{entries:e,clear:t}}var wt=require("react");function kt(e,t,n=!0){(0,wt.useEffect)(()=>{if(!n||typeof window=="undefined")return;function o(r){let s=!e.ctrl||r.ctrlKey||r.metaKey,a=!e.shift||r.shiftKey;s&&a&&r.key.toLowerCase()===e.key.toLowerCase()&&(r.preventDefault(),t())}return window.addEventListener("keydown",o),()=>window.removeEventListener("keydown",o)},[e.ctrl,e.shift,e.key,t,n])}var ve=require("react");function Et(e,t,n){let o=(0,ve.useRef)(""),r=(0,ve.useRef)(0);(0,ve.useEffect)(()=>{if(!n||!e||!/^\d+$/.test(e))return;function s(a){if(a.repeat||!(a.ctrlKey||a.metaKey)||a.shiftKey||a.altKey){o.current="";return}let i=a.target;if(i instanceof HTMLElement&&(i.isContentEditable||/^(?:INPUT|TEXTAREA|SELECT)$/.test(i.tagName))){o.current="";return}Date.now()-r.current>3e3&&(o.current=""),r.current=Date.now();let l=(o.current+a.key).slice(-e.length);for(;l&&!e.startsWith(l);)l=l.slice(1);l&&(a.preventDefault(),o.current=l,l===e&&(o.current="",t()))}return window.addEventListener("keydown",s),()=>window.removeEventListener("keydown",s)},[e,t,n])}var Ae=require("react");function Qe(e){return e===" "?"space":e.toLowerCase()}function kn(e){var o;let t=e;if(!t)return!1;let n=(o=t.tagName)==null?void 0:o.toLowerCase();return n==="input"||n==="textarea"||n==="select"||t.isContentEditable}function St(e,t){if(typeof window=="undefined")return()=>{};let n=e.map(Qe),o=new Set;function r(i){if(kn(i.target))return;let l=Qe(i.key),m=o.has(l);o.add(l),!m&&n.every(p=>o.has(p))&&(i.preventDefault(),t())}function s(i){o.delete(Qe(i.key))}function a(){o.clear()}return window.addEventListener("keydown",r),window.addEventListener("keyup",s),window.addEventListener("blur",a),()=>{window.removeEventListener("keydown",r),window.removeEventListener("keyup",s),window.removeEventListener("blur",a)}}function Nt(e,t,n=!0){let o=(0,Ae.useRef)(t);o.current=t,(0,Ae.useEffect)(()=>{if(n)return St(e,()=>o.current())},[e.join(","),n])}var Rt=require("react");var Lt=`
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
`;var Ct="next-api-debugger-styles";function Pt(){return(0,Rt.useEffect)(()=>{if(typeof document=="undefined"||document.getElementById(Ct))return;let e=document.createElement("style");e.id=Ct,e.textContent=Lt,document.head.appendChild(e)},[]),null}var H=require("react"),Tt="apd-button-position",Me=56,At=5;function He(e){return typeof window=="undefined"?e:{x:Math.min(Math.max(8,e.x),window.innerWidth-Me-8),y:Math.min(Math.max(8,e.y),window.innerHeight-Me-8)}}function En(){return typeof window=="undefined"?{x:24,y:24}:{x:window.innerWidth-Me-24,y:window.innerHeight-Me-24}}function Ht(e){let[t,n]=(0,H.useState)(()=>{if(typeof window=="undefined")return e!=null?e:{x:24,y:24};try{let p=sessionStorage.getItem(Tt);if(p)return He(JSON.parse(p))}catch{}return He(e!=null?e:En())}),o=(0,H.useRef)(!1),r=(0,H.useRef)(!1),s=(0,H.useRef)({pointerX:0,pointerY:0,posX:0,posY:0}),a=(0,H.useCallback)(p=>{o.current=!0,r.current=!1,s.current={pointerX:p.clientX,pointerY:p.clientY,posX:t.x,posY:t.y},p.currentTarget.setPointerCapture(p.pointerId)},[t.x,t.y]),i=(0,H.useCallback)(p=>{if(!o.current)return;let b=p.clientX-s.current.pointerX,h=p.clientY-s.current.pointerY;(Math.abs(b)>At||Math.abs(h)>At)&&(r.current=!0),n(He({x:s.current.posX+b,y:s.current.posY+h}))},[]),l=(0,H.useCallback)(()=>{o.current=!1},[]);(0,H.useEffect)(()=>{try{sessionStorage.setItem(Tt,JSON.stringify(t))}catch{}},[t]),(0,H.useEffect)(()=>{function p(){n(b=>He(b))}return window.addEventListener("resize",p),()=>window.removeEventListener("resize",p)},[]);let m=(0,H.useCallback)(()=>r.current,[]);return{position:t,onPointerDown:a,onPointerMove:i,onPointerUp:l,wasDragged:m}}var Y=require("react/jsx-runtime");function Mt({count:e,hasErrors:t,onOpen:n,initialPosition:o}){let{position:r,onPointerDown:s,onPointerMove:a,onPointerUp:i,wasDragged:l}=Ht(o);return(0,Y.jsxs)("button",{type:"button",className:"apd-btn",style:{left:r.x,top:r.y},onPointerDown:s,onPointerMove:a,onPointerUp:i,onClick:()=>{l()||n()},"aria-label":"Open API debugger",title:"API Debugger (drag to move)",children:[(0,Y.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,Y.jsx)("polyline",{points:"16 18 22 12 16 6"}),(0,Y.jsx)("polyline",{points:"8 6 2 12 8 18"})]}),e>0&&(0,Y.jsx)("span",{className:N("apd-btn-dot",t&&"apd-has-errors"),children:e>99?"99+":e})]})}var q=require("react");var G=require("react/jsx-runtime");function et({value:e,onChange:t}){return(0,G.jsxs)("div",{className:"apd-search",children:[(0,G.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,G.jsx)("circle",{cx:"11",cy:"11",r:"7"}),(0,G.jsx)("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]}),(0,G.jsx)("input",{type:"text",placeholder:"Filter by URL, endpoint, method or status code...",value:e,onChange:n=>t(n.target.value),spellCheck:!1})]})}var W=require("react/jsx-runtime");function It({status:e,onStatusChange:t,methods:n,activeMethods:o,onToggleMethod:r}){return(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)("button",{type:"button",className:N("apd-chip apd-chip-success",e==="success"&&"apd-active"),onClick:()=>t(e==="success"?"all":"success"),children:"Success"}),(0,W.jsx)("button",{type:"button",className:N("apd-chip apd-chip-failed",e==="failed"&&"apd-active"),onClick:()=>t(e==="failed"?"all":"failed"),children:"Failed"}),n.map(s=>(0,W.jsx)("button",{type:"button",className:N("apd-chip",o.includes(s)&&"apd-active"),onClick:()=>r(s),children:s},s))]})}var I=require("react/jsx-runtime");function Sn(e){return["GET","POST","PUT","PATCH","DELETE"].includes(e.toUpperCase())?`apd-method-${e.toUpperCase()}`:"apd-method-OTHER"}function Dt({log:e,selected:t,onSelect:n,onTogglePin:o}){var r;return(0,I.jsxs)("div",{className:N("apd-item",t&&"apd-selected"),onClick:n,role:"button",tabIndex:0,onKeyDown:s=>s.key==="Enter"&&n(),children:[(0,I.jsxs)("div",{className:"apd-item-row1",children:[(0,I.jsx)("span",{className:N("apd-method",Sn(e.method)),children:e.method}),(0,I.jsx)("span",{className:"apd-item-url",title:e.url,children:e.endpoint}),(0,I.jsx)("span",{className:N("apd-status-dot",e.success?"apd-ok":"apd-fail")}),e.pinned&&(0,I.jsx)("button",{type:"button",className:"apd-pin-star",onClick:s=>{s.stopPropagation(),o()},title:"Unpin","aria-label":"Unpin request",style:{background:"none",border:"none",cursor:"pointer",padding:0},children:"\u2605"})]}),(0,I.jsxs)("div",{className:"apd-item-row2",children:[(0,I.jsx)("span",{children:(r=e.responseStatus)!=null?r:e.error?"ERR":"\u2014"}),(0,I.jsx)("span",{children:ke(e.duration)}),(0,I.jsx)("span",{children:ne(e.timestamp)}),(0,I.jsx)("span",{style:{marginLeft:"auto",textTransform:"uppercase"},children:e.source})]})]})}var Z=require("react/jsx-runtime");function qt({logs:e,selectedId:t,onSelect:n,onTogglePin:o}){return e.length===0?(0,Z.jsx)("div",{className:"apd-list",children:(0,Z.jsxs)("div",{className:"apd-empty",children:["No requests captured yet.",(0,Z.jsx)("br",{}),"Make an API call and it'll show up here."]})}):(0,Z.jsx)("div",{className:"apd-list",children:e.map(r=>(0,Z.jsx)(Dt,{log:r,selected:r.id===t,onSelect:()=>n(r.id),onTogglePin:()=>o(r.id)},r.id))})}var Be=require("react");var zt=require("react");var Bt=require("react/jsx-runtime");function Ie({getText:e,label:t,icon:n}){let[o,r]=(0,zt.useState)(!1);async function s(){await Se(e())&&(r(!0),setTimeout(()=>r(!1),1200))}return(0,Bt.jsxs)("button",{type:"button",className:N("apd-action-btn",o&&"apd-copied"),onClick:s,children:[n,o?"Copied":t]})}var B=require("react");var Nn=/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(\.\d+)?([eE][+-]?\d+)?)/g;function Ln(e){return e.replace(Nn,t=>{let n="apd-json-num";return/^"/.test(t)?n=/:$/.test(t)?"apd-json-key":"apd-json-str":/true|false/.test(t)?n="apd-json-bool":/null/.test(t)&&(n="apd-json-null"),`<span class="${n}">${t}</span>`})}function Cn(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Rn(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function $t(e,t){if(e!=null&&typeof e=="object")return{content:JSON.stringify(e,null,2),isJson:!0};if(typeof e=="string")try{return{content:JSON.stringify(JSON.parse(e),null,2),isJson:!0}}catch{return{content:t!=null?t:e,isJson:!1}}return{content:t!=null?t:String(e!=null?e:""),isJson:!1}}function jt(e,t,n){let o=Cn(e),r=0,s=o;if(n){let i=new RegExp(Rn(n),"gi");s=o.replace(i,l=>(r+=1,`<mark class='apd-json-highlight'>${l}</mark>`))}return{html:t?Ln(s):s,matchCount:r}}var D=require("react/jsx-runtime");function De({value:e,raw:t,searchable:n=!0}){let[o,r]=(0,B.useState)(""),[s,a]=(0,B.useState)(0),i=(0,B.useRef)(null),l=(0,B.useRef)(""),{content:m,isJson:p}=$t(e,t),b=o.trim(),{html:h,matchCount:v}=(0,B.useMemo)(()=>jt(m,p,b),[m,p,b]);(0,B.useEffect)(()=>{let u=b!==l.current;l.current=b,(u||s>=v)&&a(0)},[b,v]),(0,B.useEffect)(()=>{var g;if(!i.current)return;let u=i.current.querySelectorAll("mark.apd-json-highlight");u.forEach((L,P)=>L.classList.toggle("apd-active",P===s)),(g=u[s])==null||g.scrollIntoView({block:"center",behavior:"smooth"})},[h,s]);function S(u){v!==0&&a(g=>(g+u+v)%v)}return(0,D.jsxs)("div",{children:[n&&m.length>0&&(0,D.jsxs)("div",{className:"apd-json-search",children:[(0,D.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,D.jsx)("circle",{cx:"11",cy:"11",r:"7"}),(0,D.jsx)("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]}),(0,D.jsx)("input",{type:"text",placeholder:"Find in payload...",value:o,onChange:u=>r(u.target.value),onKeyDown:u=>{u.key==="Enter"&&(u.preventDefault(),S(u.shiftKey?-1:1))},spellCheck:!1}),o&&(0,D.jsx)("span",{className:"apd-json-search-count",children:v>0?`${s+1} / ${v}`:"No matches"}),o&&v>0&&(0,D.jsxs)("div",{className:"apd-json-search-nav",children:[(0,D.jsx)("button",{type:"button",onClick:()=>S(-1),"aria-label":"Previous match",title:"Previous match (Shift+Enter)",children:"\u2191"}),(0,D.jsx)("button",{type:"button",onClick:()=>S(1),"aria-label":"Next match",title:"Next match (Enter)",children:"\u2193"})]})]}),(0,D.jsx)("pre",{ref:i,className:"apd-json",dangerouslySetInnerHTML:{__html:h}})]})}function qe(e){return`'${e.replace(/'/g,"'\\''")}'`}function Pn(e){let t=e.trim();if(!t||!(t.startsWith("{")||t.startsWith("[")))return!1;try{return JSON.parse(t),!0}catch{return!1}}function ze(e){let t=[`curl -X ${e.method} ${qe(e.url)}`],n=Object.keys(e.requestHeaders).some(o=>o.toLowerCase()==="content-type");for(let[o,r]of Object.entries(e.requestHeaders))/^(host|content-length|connection)$/i.test(o)||t.push(`  -H ${qe(`${o}: ${r}`)}`);return e.requestBodyRaw&&(!n&&Pn(e.requestBodyRaw)&&t.push(`  -H ${qe("Content-Type: application/json")}`),t.push(`  --data-raw ${qe(e.requestBodyRaw)}`)),t.join(` \\
`)}var c=require("react/jsx-runtime");function ie({title:e,count:t,defaultOpen:n=!0,children:o}){let[r,s]=(0,Be.useState)(n);return(0,c.jsxs)("div",{className:"apd-section",children:[(0,c.jsxs)("div",{className:"apd-section-header",onClick:()=>s(a=>!a),children:[(0,c.jsxs)("span",{children:[e,typeof t=="number"?` (${t})`:""]}),(0,c.jsx)("span",{children:r?"\u2212":"+"})]}),r&&(0,c.jsx)("div",{className:"apd-section-body",children:o})]})}function tt({data:e}){let t=Object.entries(e);return t.length===0?(0,c.jsx)("div",{className:"apd-section-body apd-empty-body",children:"None"}):(0,c.jsx)("div",{className:"apd-kv",children:t.map(([n,o])=>(0,c.jsxs)(Be.Fragment,{children:[(0,c.jsx)("div",{className:"apd-kv-key",children:n}),(0,c.jsx)("div",{className:"apd-kv-val",children:o})]},n))})}function Ot({log:e,onTogglePin:t}){var s,a,i,l,m;if(!e)return(0,c.jsx)("div",{className:"apd-detail",children:(0,c.jsx)("div",{className:"apd-detail-empty",children:"Select a request to see full details"})});let n=ze(e),o=(a=(s=te(e.requestBody))!=null?s:e.requestBodyRaw)!=null?a:"",r=(l=(i=te(e.responseBody))!=null?i:e.responseBodyRaw)!=null?l:"";return(0,c.jsxs)("div",{className:"apd-detail",children:[(0,c.jsxs)("div",{className:"apd-detail-header",children:[(0,c.jsxs)("div",{className:"apd-detail-url",children:[(0,c.jsx)("strong",{children:e.method})," ",e.url]}),(0,c.jsx)("button",{type:"button",className:"apd-action-btn",onClick:()=>t(e.id),title:e.pinned?"Unpin":"Pin this request",children:e.pinned?"\u2605 Pinned":"\u2606 Pin"})]}),(0,c.jsxs)("div",{className:"apd-meta-grid",children:[(0,c.jsxs)("div",{children:[(0,c.jsx)("div",{className:"apd-meta-label",children:"Status"}),(0,c.jsxs)("div",{className:"apd-meta-value",style:{color:e.success?"var(--apd-success)":"var(--apd-error)"},children:[(m=e.responseStatus)!=null?m:"Failed"," ",e.responseStatusText]})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)("div",{className:"apd-meta-label",children:"Duration"}),(0,c.jsx)("div",{className:"apd-meta-value",children:ke(e.duration)})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)("div",{className:"apd-meta-label",children:"Time"}),(0,c.jsx)("div",{className:"apd-meta-value",children:ne(e.timestamp)})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)("div",{className:"apd-meta-label",children:"Source"}),(0,c.jsx)("div",{className:"apd-meta-value",children:e.source})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)("div",{className:"apd-meta-label",children:"Req. size"}),(0,c.jsx)("div",{className:"apd-meta-value",children:Je(e.requestSize)})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)("div",{className:"apd-meta-label",children:"Res. size"}),(0,c.jsx)("div",{className:"apd-meta-value",children:Je(e.responseSize)})]})]}),e.error&&(0,c.jsxs)("div",{className:"apd-section",style:{borderColor:"var(--apd-error)"},children:[(0,c.jsx)("div",{className:"apd-section-header",style:{color:"var(--apd-error)"},children:"Error"}),(0,c.jsx)("div",{className:"apd-section-body",children:e.error})]}),(0,c.jsxs)("div",{className:"apd-actions",children:[(0,c.jsx)(Ie,{label:"Copy cURL",getText:()=>n}),(0,c.jsx)(Ie,{label:"Copy Request",getText:()=>o}),(0,c.jsx)(Ie,{label:"Copy Response",getText:()=>r})]}),(0,c.jsx)(ie,{title:"cURL",children:(0,c.jsx)(De,{value:n,searchable:!1})}),(0,c.jsx)(ie,{title:"Query Params",count:Object.keys(e.queryParams).length,defaultOpen:!1,children:(0,c.jsx)(tt,{data:e.queryParams})}),(0,c.jsx)(ie,{title:"Request Headers",count:Object.keys(e.requestHeaders).length,defaultOpen:!1,children:(0,c.jsx)(tt,{data:e.requestHeaders})}),(0,c.jsx)(ie,{title:"Request Body",children:e.requestBodyRaw?(0,c.jsx)(De,{value:e.requestBody,raw:e.requestBodyRaw}):(0,c.jsx)("div",{className:"apd-empty-body",children:"No body"})}),(0,c.jsx)(ie,{title:"Response Headers",count:Object.keys(e.responseHeaders).length,defaultOpen:!1,children:(0,c.jsx)(tt,{data:e.responseHeaders})}),(0,c.jsx)(ie,{title:"Response Body",children:e.responseBodyRaw?(0,c.jsx)(De,{value:e.responseBody,raw:e.responseBodyRaw}):(0,c.jsx)("div",{className:"apd-empty-body",children:"No body"})})]})}var _t=require("react");var C=require("react/jsx-runtime"),Tn={log:"\u25B8",info:"\u2139",warn:"\u26A0",error:"\u2715",debug:"\u2699"};function An({entry:e}){var o;let[t,n]=(0,_t.useState)(!1);return(0,C.jsxs)("div",{className:`apd-console-item apd-console-${e.level}`,children:[(0,C.jsx)("span",{className:"apd-console-icon",children:(o=Tn[e.level])!=null?o:"\u25B8"}),(0,C.jsxs)("div",{className:"apd-console-body",children:[(0,C.jsx)("div",{className:"apd-console-preview",children:e.preview||"(empty)"}),(0,C.jsxs)("div",{className:"apd-console-meta",children:[(0,C.jsx)("span",{children:ne(e.timestamp)}),e.source!=="console"&&(0,C.jsx)("span",{children:e.source}),e.stack&&(0,C.jsx)("button",{type:"button",className:"apd-console-toggle-stack",onClick:()=>n(r=>!r),children:t?"Hide stack trace":"Show stack trace"})]}),t&&e.stack&&(0,C.jsx)("div",{className:"apd-console-stack",children:e.stack})]}),e.count>1&&(0,C.jsx)("span",{className:"apd-console-count",children:e.count})]})}function Ut({entries:e}){return e.length===0?(0,C.jsx)("div",{className:"apd-console-list",children:(0,C.jsxs)("div",{className:"apd-empty",children:["Nothing logged yet.",(0,C.jsx)("br",{}),"console.log/warn/error and uncaught errors will show up here."]})}):(0,C.jsx)("div",{className:"apd-console-list",children:e.map(t=>(0,C.jsx)(An,{entry:t},t.id))})}var j=require("react");var we="data-apd-source";function Hn(e){let t=e.getAttribute(we);if(!t)return null;let n=t.match(/^(.*):(\d+):(\d+)$/);return n?{file:n[1],line:Number(n[2]),column:Number(n[3]),confidence:"exact",origin:"build-plugin"}:{file:t,confidence:"exact",origin:"build-plugin"}}function nt(e){let t=Object.keys(e).find(n=>n.startsWith("__reactFiber$")||n.startsWith("__reactInternalInstance$"));return t?e[t]:null}function Mn(e){let t=nt(e);for(;t;){let n=t._debugSource;if(n&&n.fileName)return{file:n.fileName,line:typeof n.lineNumber=="number"?n.lineNumber:void 0,column:typeof n.columnNumber=="number"?n.columnNumber:void 0,confidence:"exact",origin:"react"};t=t.return}return null}function In(e){let t=nt(e);for(;t;){let n=t.type;if(typeof n=="function"&&n.name)return n.name;if(n&&typeof n=="object"&&n.displayName)return n.displayName;t=t.return}return null}function Ft(e){return e.__vueParentComponent?{version:3,inst:e.__vueParentComponent}:e.__vue__?{version:2,inst:e.__vue__}:null}function Dn(e){var n,o;let t=e;for(;t;){let r=Ft(t);if(r){let s=r.version===3?(n=r.inst.type)==null?void 0:n.__file:(o=r.inst.$options)==null?void 0:o.__file;if(s)return{file:s,confidence:"exact",origin:"vue"}}t=t.parentElement}return null}function qn(e){var n,o,r,s;let t=e;for(;t;){let a=Ft(t);if(a){let i=a.version===3?((n=a.inst.type)==null?void 0:n.__name)||((o=a.inst.type)==null?void 0:o.name):((r=a.inst.$options)==null?void 0:r.name)||((s=a.inst.$options)==null?void 0:s._componentTag);if(i)return i}t=t.parentElement}return null}function zn(e){var n,o;let t=window.ng;if(!(t!=null&&t.getComponent))return null;try{let r=t.getComponent(e);return(o=(n=r==null?void 0:r.constructor)==null?void 0:n.name)!=null?o:null}catch{return null}}var Bn=/(?:\()?(https?:\/\/[^\s)]+|\/[^\s)]+|[A-Za-z]:\\[^\s)]+):(\d+):(\d+)\)?/;function $n(e){return/next-api-debugger|core\/inspector\/|node_modules/.test(e)}function jn(e){let t=bt(e);if(!(t!=null&&t.stack))return null;let n=t.stack.split(`
`).slice(1);for(let o of n){if($n(o))continue;let r=o.match(Bn);if(r)return{file:r[1],line:Number(r[2]),column:Number(r[3]),confidence:"approximate",origin:"stack-trace"}}return null}var ye;async function On(){if(ye!==void 0)return ye;try{ye=await(await fetch(location.href,{cache:"force-cache"})).text()}catch{ye=null}return ye}function _n(e){if(e.id)return`id="${e.id}"`;for(let t of["data-testid","name"]){let n=e.getAttribute(t);if(n)return`${t}="${n}"`}return e.className&&typeof e.className=="string"?`class="${e.className}"`:null}async function Un(e){let t=location.pathname||"/",n=await On();if(n){let o=_n(e);if(o){let r=n.indexOf(o);if(r!==-1){let s=n.slice(0,r).split(`
`).length;return{file:t,line:s,confidence:"approximate",origin:"plain-html"}}}}return{file:t,confidence:"approximate",origin:"plain-html"}}function ot(e){let t=Hn(e);if(t)return t;let n=Mn(e);if(n)return n;let o=Dn(e);return o||jn(e)}async function Xt(e){let t=ot(e);return t||(nt(e)?null:Un(e))}function $e(e){var t,n;return(n=(t=In(e))!=null?t:qn(e))!=null?n:zn(e)}var Fn=["display","position","top","right","bottom","left","width","height","color","background-color","font-family","font-size","font-weight","line-height","text-align","flex-direction","justify-content","align-items","gap","grid-template-columns","grid-template-rows","z-index","opacity","overflow","box-sizing","cursor"];function M(e){let t=parseFloat(e);return Number.isFinite(t)?t:0}function Xn(e){return{margin:{top:M(e.marginTop),right:M(e.marginRight),bottom:M(e.marginBottom),left:M(e.marginLeft)},border:{top:M(e.borderTopWidth),right:M(e.borderRightWidth),bottom:M(e.borderBottomWidth),left:M(e.borderLeftWidth)},padding:{top:M(e.paddingTop),right:M(e.paddingRight),bottom:M(e.paddingBottom),left:M(e.paddingLeft)},content:{width:M(e.width),height:M(e.height)}}}function Vn(e){let t=[],n=e.parentElement;for(;n&&n.tagName.toLowerCase()!=="html";)t.push({tag:n.tagName.toLowerCase(),id:n.id||null,classes:Array.from(n.classList)}),n=n.parentElement;return t}async function Vt(e){let t=getComputedStyle(e),n=e.getBoundingClientRect(),o={};Array.from(e.attributes).forEach(i=>{i.name!==we&&(o[i.name]=i.value)});let r={};Fn.forEach(i=>{r[i]=t.getPropertyValue(i)});let a=e.children.length===0&&(e.textContent||"").trim().slice(0,120)||null;return{tag:e.tagName.toLowerCase(),id:e.id||null,classes:Array.from(e.classList),attributes:o,rect:{x:n.x,y:n.y,width:n.width,height:n.height},box:Xn(t),computedStyles:r,ancestors:Vn(e),childCount:e.children.length,textPreview:a,componentName:$e(e),source:await Xt(e)}}var Jt=3;function rt(e,t){if(e!=null){if(typeof e=="string"){t(e);return}if(typeof e=="number"||typeof e=="boolean"){t(String(e));return}if(Array.isArray(e)){e.forEach(n=>rt(n,t));return}typeof e=="object"&&Object.values(e).forEach(n=>rt(n,t))}}function Kt(e){let t=new Map;for(let n of e)rt(n.responseBody,o=>{let r=o.trim();r.length<Jt||t.has(r)||t.set(r,{log:n})});return t}function Wt(e,t){for(let n of e){let o=n.trim();if(o.length<Jt)continue;let r=t.get(o);if(r)return{kind:"api",endpoint:r.log.endpoint,method:r.log.method,matchedValue:o}}return e.some(n=>n.trim().length>0)?{kind:"static"}:{kind:"unknown"}}var Jn=8,at=40,Kn=20,Wn=["src","href","alt","title","value","placeholder"];function Yn(e){let t={};return Array.from(e.attributes).forEach(n=>{n.name!==we&&(t[n.name]=n.value)}),t}function Gn(e){let t=[],n=Array.from(e.childNodes).filter(o=>o.nodeType===Node.TEXT_NODE).map(o=>(o.textContent||"").trim()).filter(Boolean).join(" ");n&&t.push(n);for(let o of Wn){let r=e.getAttribute(o);r&&t.push(r)}return t}function Yt(e,t,n,o,r){return{tag:e.tagName.toLowerCase(),id:e.id||null,classes:Array.from(e.classList),attributes:Yn(e),componentName:$e(e),source:ot(e),dataSource:Wt(Gn(e),t),textPreview:o&&(e.textContent||"").trim().slice(0,80)||null,children:n,truncatedChildCount:r}}function Gt(e,t,n){let o=Array.from(e.children),r=o.slice(0,at),s=n<Jn?r.map(i=>Gt(i,t,n+1)):[],a=o.length>at?o.length-at:void 0;return Yt(e,t,s,e.children.length===0,a)}function Zn(e){let t=[],n=e.parentElement;for(;n&&n.tagName.toLowerCase()!=="html"&&t.length<Kn;)t.push(n),n=n.parentElement;return t.reverse()}function Zt(e,t){let n=Kt(t),o={...Gt(e,n,0),isSelected:!0},r=Zn(e),s=o;for(let a=r.length-1;a>=0;a--)s={...Yt(r[a],n,[s],!1),isAncestorPath:!0};return s}function Qn(e){return!!(e!=null&&e.closest(".apd-root"))}function Qt(e,t,n){let o=!0;function r(m){let p=document.elementFromPoint(m.clientX,m.clientY);return Qn(p)?null:p}function s(m){o&&(t==null||t(r(m)))}function a(m){if(!o)return;let p=r(m);p&&(m.preventDefault(),m.stopPropagation(),l(),e(p))}function i(m){m.key==="Escape"&&(l(),n==null||n())}function l(){o=!1,window.removeEventListener("mousemove",s,!0),window.removeEventListener("click",a,!0),window.removeEventListener("keydown",i,!0)}return window.addEventListener("mousemove",s,!0),window.addEventListener("click",a,!0),window.addEventListener("keydown",i,!0),{cancel:()=>{l(),n==null||n()}}}function en(){let e=document.createElement("div");e.className="apd-inspect-highlight",e.style.display="none";function t(o){e.style.display="",e.style.left=`${o.left}px`,e.style.top=`${o.top}px`,e.style.width=`${o.width}px`,e.style.height=`${o.height}px`}function n(){e.style.display="none"}return{el:e,show:t,hide:n}}function je(e,t){var i,l;if(!t||e.origin==="plain-html")return null;let n=t.replace(/\\/g,"/").replace(/\/+$/,""),o=e.file.replace(/\\/g,"/").replace(/^\.\//,"");if(!n||!/^(?:\/|[A-Za-z]:\/)/.test(n)||/^[a-z][a-z\d+.-]*:\/\//i.test(o)||o.split("/").includes("..")||!/\.(?:[cm]?[jt]sx?|vue|svelte|astro|html?|mdx|php)$/i.test(o))return null;let r=/^(?:\/|[A-Za-z]:\/)/.test(o),s=r?o:`${n}/${o}`;return r&&s!==n&&!s.startsWith(`${n}/`)?null:`vscode://file/${encodeURI(s).replace(/#/g,"%23").replace(/\?/g,"%3F")}:${(i=e.line)!=null?i:1}:${(l=e.column)!=null?l:1}`}var tn=require("react");var k=require("react/jsx-runtime"),eo=3;function to({info:e}){return e.kind==="unknown"?null:e.kind==="api"?(0,k.jsx)("span",{className:"apd-datasource-badge apd-datasource-api",title:`Matches a value from a captured response: ${e.method} ${e.endpoint}`,children:"API"}):(0,k.jsx)("span",{className:"apd-datasource-badge apd-datasource-static",title:"No matching value found in any captured API response this session \u2014 may be hardcoded, or fetched server-side before the page loaded",children:"STATIC"})}function no({node:e}){return(0,k.jsxs)("span",{className:e.isSelected?"apd-tree-tag apd-tree-selected-tag":"apd-tree-tag",children:["<",e.tag,e.id&&(0,k.jsxs)("span",{className:"apd-tree-id",children:[' id="',e.id,'"']}),e.classes.length>0&&(0,k.jsxs)("span",{className:"apd-tree-class",children:[' class="',e.classes.join(" "),'"']}),">"]})}function nn({node:e,editorProjectRoot:t,prefix:n,connector:o,depthFromSelected:r}){let[s,a]=(0,tn.useState)(e.isSelected||e.isAncestorPath||r<eo),i=e.children.length>0,l=n+(o===""?"":o==="\u2514\u2500\u2500 "?"    ":"\u2502   "),m=e.isSelected?0:r<0?-1:r+1,p=e.source?je(e.source,t):null,b=e.source?`${e.source.file}${e.source.line?`:${e.source.line}`:""}`:"";return(0,k.jsxs)("div",{className:"apd-tree-node",children:[(0,k.jsxs)("div",{className:i?`apd-tree-row apd-tree-clickable${e.isSelected?" apd-tree-selected-row":""}`:`apd-tree-row${e.isSelected?" apd-tree-selected-row":""}`,onClick:()=>i&&a(h=>!h),children:[(0,k.jsxs)("span",{className:"apd-tree-prefix",children:[n,o]}),i?(0,k.jsx)("span",{className:"apd-tree-toggle",children:s?"\u25BE":"\u25B8"}):(0,k.jsx)("span",{className:"apd-tree-toggle apd-tree-toggle-leaf",children:"\u2022"}),(0,k.jsx)(no,{node:e}),e.isSelected&&(0,k.jsx)("span",{className:"apd-tree-selected-label",children:"\u2190 Selected"}),e.componentName&&(0,k.jsx)("span",{className:"apd-tree-component",children:e.componentName}),(0,k.jsx)(to,{info:e.dataSource}),p?(0,k.jsx)("a",{className:"apd-tree-source apd-tree-source-link",href:p,title:"Open in VS Code",onClick:h=>h.stopPropagation(),children:b}):e.source?(0,k.jsx)("span",{className:"apd-tree-source",children:b}):null]}),s&&i&&(0,k.jsxs)("div",{children:[e.children.map((h,v)=>{let S=v===e.children.length-1;return(0,k.jsx)(nn,{node:h,editorProjectRoot:t,prefix:l,connector:S?"\u2514\u2500\u2500 ":"\u251C\u2500\u2500 ",depthFromSelected:m},v)}),typeof e.truncatedChildCount=="number"&&(0,k.jsxs)("div",{className:"apd-tree-truncated",children:[l,"+",e.truncatedChildCount," more not shown"]})]})]})}function on({root:e,editorProjectRoot:t}){return(0,k.jsx)("div",{className:"apd-tree",children:(0,k.jsx)(nn,{node:e,editorProjectRoot:t,prefix:"",connector:"",depthFromSelected:-1})})}var d=require("react/jsx-runtime");function rn({data:e}){let t=Object.entries(e).filter(([,n])=>n!=="");return t.length===0?(0,d.jsx)("div",{className:"apd-empty-body",children:"None"}):(0,d.jsx)("div",{className:"apd-kv",children:t.map(([n,o])=>(0,d.jsxs)("div",{style:{display:"contents"},children:[(0,d.jsx)("div",{className:"apd-kv-key",children:n}),(0,d.jsx)("div",{className:"apd-kv-val",children:o})]},n))})}function oo({info:e}){let{box:t}=e;return(0,d.jsx)("div",{className:"apd-box-model",children:(0,d.jsxs)("div",{className:"apd-box-layer apd-box-layer-margin",children:[(0,d.jsx)("span",{className:"apd-box-label apd-box-label-top",children:t.margin.top}),(0,d.jsx)("span",{className:"apd-box-label apd-box-label-right",children:t.margin.right}),(0,d.jsx)("span",{className:"apd-box-label apd-box-label-bottom",children:t.margin.bottom}),(0,d.jsx)("span",{className:"apd-box-label apd-box-label-left",children:t.margin.left}),(0,d.jsxs)("div",{className:"apd-box-layer apd-box-layer-border",children:[(0,d.jsx)("span",{className:"apd-box-label apd-box-label-top",children:t.border.top}),(0,d.jsx)("span",{className:"apd-box-label apd-box-label-right",children:t.border.right}),(0,d.jsx)("span",{className:"apd-box-label apd-box-label-bottom",children:t.border.bottom}),(0,d.jsx)("span",{className:"apd-box-label apd-box-label-left",children:t.border.left}),(0,d.jsxs)("div",{className:"apd-box-layer apd-box-layer-padding",children:[(0,d.jsx)("span",{className:"apd-box-label apd-box-label-top",children:t.padding.top}),(0,d.jsx)("span",{className:"apd-box-label apd-box-label-right",children:t.padding.right}),(0,d.jsx)("span",{className:"apd-box-label apd-box-label-bottom",children:t.padding.bottom}),(0,d.jsx)("span",{className:"apd-box-label apd-box-label-left",children:t.padding.left}),(0,d.jsxs)("div",{className:"apd-box-layer-content",children:[Math.round(t.content.width)," \xD7 ",Math.round(t.content.height)]})]})]})]})})}function ro({info:e,editorProjectRoot:t}){let{source:n,componentName:o}=e;if(!n)return(0,d.jsxs)("div",{className:"apd-source-card",children:[o&&(0,d.jsxs)("div",{children:["Component: ",(0,d.jsx)("strong",{children:o})]}),(0,d.jsx)("div",{className:"apd-source-none",children:"Source file unavailable. For React/Next.js, enable the Babel source plugin for exact JSX paths."})]});let r=n.line?`${n.file}:${n.line}${n.column?`:${n.column}`:""}`:n.file,s=n.origin==="plain-html"?`Rendered page: ${r}`:r,a=je(n,t);return(0,d.jsxs)("div",{className:"apd-source-card",children:[o&&(0,d.jsxs)("div",{style:{fontSize:11,color:"var(--apd-text-dim)",marginBottom:4},children:["Component: ",(0,d.jsx)("strong",{style:{color:"var(--apd-text)"},children:o})]}),a?(0,d.jsx)("a",{className:"apd-source-path",href:a,title:"Open in VS Code",children:s}):(0,d.jsx)("span",{className:"apd-source-path apd-source-path-plain",children:s}),(0,d.jsxs)("div",{className:"apd-source-meta",children:[(0,d.jsx)("span",{className:`apd-confidence-badge apd-confidence-${n.confidence}`,children:n.confidence}),(0,d.jsxs)("span",{children:["via ",n.origin]}),!a&&n.origin!=="plain-html"&&(0,d.jsx)("button",{type:"button",className:"apd-console-toggle-stack",onClick:()=>Se(s),style:{marginLeft:"auto"},children:"Copy path"})]})]})}function an({onInspectingChange:e,editorProjectRoot:t}){let[n,o]=(0,j.useState)(!1),[r,s]=(0,j.useState)(!1),[a,i]=(0,j.useState)(null),[l,m]=(0,j.useState)(null),p=(0,j.useRef)(null),b=(0,j.useRef)(null);(0,j.useEffect)(()=>()=>{var u,g;(u=p.current)==null||u.cancel(),(g=b.current)==null||g.el.remove()},[]);function h(){var u,g;(u=b.current)==null||u.hide(),(g=b.current)==null||g.el.remove(),b.current=null}function v(){o(!0),e(!0);let u=en();document.body.appendChild(u.el),b.current=u,p.current=Qt(async g=>{h(),o(!1),e(!1),s(!0);let L=await Vt(g);i(L),m(Zt(g,E.getLogs())),s(!1)},g=>{g?u.show(g.getBoundingClientRect()):u.hide()},()=>{h(),o(!1),e(!1)})}function S(){var u;(u=p.current)==null||u.cancel()}return a?(0,d.jsxs)("div",{className:"apd-inspector-body",children:[(0,d.jsxs)("div",{style:{display:"flex",alignItems:"flex-start",gap:10,marginBottom:12},children:[(0,d.jsxs)("div",{style:{flex:1},children:[(0,d.jsxs)("div",{className:"apd-inspector-tag",children:["<",a.tag,a.id&&(0,d.jsxs)("span",{className:"apd-tag-id",children:[" #",a.id]}),a.classes.map(u=>(0,d.jsxs)("span",{className:"apd-tag-class",children:[" ",".",u]},u)),">"]}),a.textPreview&&(0,d.jsxs)("div",{style:{fontSize:11.5,color:"var(--apd-text-dim)",fontFamily:"var(--apd-mono)"},children:['"',a.textPreview,'"']})]}),(0,d.jsx)("button",{type:"button",className:"apd-action-btn",onClick:v,children:"\u2316 Inspect another"})]}),a.ancestors.length>0&&(0,d.jsxs)("div",{className:"apd-inspector-breadcrumb",children:[[...a.ancestors].reverse().map((u,g)=>(0,d.jsxs)("span",{children:[u.tag,u.id?`#${u.id}`:""]},g)),(0,d.jsx)("span",{style:{color:"var(--apd-accent)"},children:a.tag})]}),(0,d.jsx)(ro,{info:a,editorProjectRoot:t}),(0,d.jsxs)("div",{className:"apd-meta-grid",children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{className:"apd-meta-label",children:"Position"}),(0,d.jsxs)("div",{className:"apd-meta-value",children:[Math.round(a.rect.x),", ",Math.round(a.rect.y)]})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{className:"apd-meta-label",children:"Size"}),(0,d.jsxs)("div",{className:"apd-meta-value",children:[Math.round(a.rect.width)," \xD7 ",Math.round(a.rect.height)]})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{className:"apd-meta-label",children:"Children"}),(0,d.jsx)("div",{className:"apd-meta-value",children:a.childCount})]})]}),(0,d.jsxs)("div",{className:"apd-section",children:[(0,d.jsx)("div",{className:"apd-section-header",children:"Box Model"}),(0,d.jsx)("div",{className:"apd-section-body",children:(0,d.jsx)(oo,{info:a})})]}),(0,d.jsxs)("div",{className:"apd-section",children:[(0,d.jsxs)("div",{className:"apd-section-header",children:["Attributes (",Object.keys(a.attributes).length,")"]}),(0,d.jsx)("div",{className:"apd-section-body",children:(0,d.jsx)(rn,{data:a.attributes})})]}),(0,d.jsxs)("div",{className:"apd-section",children:[(0,d.jsx)("div",{className:"apd-section-header",children:"Computed Styles"}),(0,d.jsx)("div",{className:"apd-section-body",children:(0,d.jsx)(rn,{data:a.computedStyles})})]}),l&&(0,d.jsxs)("div",{className:"apd-section",children:[(0,d.jsxs)("div",{className:"apd-section-header",children:["Element Tree",(0,d.jsxs)("span",{style:{fontWeight:400,color:"var(--apd-text-faint)",fontSize:10.5},children:[" ","\u2014 structure, source, and data origin for this element and its descendants"]})]}),(0,d.jsx)("div",{className:"apd-section-body",children:(0,d.jsx)(on,{root:l,editorProjectRoot:t})})]})]}):(0,d.jsxs)("div",{className:"apd-inspector-empty",children:[(0,d.jsx)("button",{type:"button",className:`apd-inspect-start-btn${n?" apd-inspecting":""}`,onClick:n?S:v,children:n?"\u25FC Stop Inspecting (Esc)":"\u2316 Start Inspecting"}),(0,d.jsx)("p",{children:n?"Hover any element on the page and click to select it.":r?"Resolving source location\u2026":"Pick any element on the page to see its DOM details, computed styles, and \u2014 when available \u2014 the exact source file responsible for it."})]})}function sn(e){return Object.entries(e).map(([t,n])=>({name:t,value:n}))}function ao(e){return Object.entries(e).map(([t,n])=>({name:t,value:n}))}function Oe(e){return{log:{version:"1.2",creator:{name:"next-api-debugger",version:"0.1.0"},entries:e.map(t=>{var n,o;return{startedDateTime:new Date(t.timestamp).toISOString(),time:t.duration,request:{method:t.method,url:t.url,httpVersion:"HTTP/1.1",headers:sn(t.requestHeaders),queryString:ao(t.queryParams),cookies:[],headersSize:-1,bodySize:t.requestSize,postData:t.requestBodyRaw?{mimeType:t.requestHeaders["content-type"]||"application/json",text:t.requestBodyRaw}:void 0},response:{status:(n=t.responseStatus)!=null?n:0,statusText:t.responseStatusText,httpVersion:"HTTP/1.1",headers:sn(t.responseHeaders),cookies:[],content:{size:t.responseSize,mimeType:t.responseHeaders["content-type"]||"application/json",text:(o=t.responseBodyRaw)!=null?o:""},redirectURL:"",headersSize:-1,bodySize:t.responseSize},cache:{},timings:{send:0,wait:t.duration,receive:0}}})}}}function st(e,t){let n=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),o=URL.createObjectURL(n),r=document.createElement("a");r.href=o,r.download=e,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(o)}var f=require("react/jsx-runtime"),so=["GET","POST","PUT","PATCH","DELETE"],io=["log","info","warn","error","debug"];function dn({logs:e,consoleEntries:t,onClose:n,onClear:o,onClearConsole:r,onTogglePin:s,theme:a,onToggleTheme:i,inspectorEnabled:l,editorProjectRoot:m}){var A,it,dt;let[p,b]=(0,q.useState)("network"),[h,v]=(0,q.useState)({search:"",status:"all",methods:[]}),[S,u]=(0,q.useState)(null),[g,L]=(0,q.useState)(!1),[P,y]=(0,q.useState)(""),[T,V]=(0,q.useState)([]);(0,q.useEffect)(()=>{!S&&e.length>0&&u(e[0].id)},[e,S]);let R=(0,q.useMemo)(()=>{let x=h.search.trim().toLowerCase();return e.filter(w=>{var ee;return!(h.status==="success"&&!w.success||h.status==="failed"&&w.success||h.methods.length>0&&!h.methods.includes(w.method)||x&&!`${w.url} ${w.endpoint} ${w.method} ${(ee=w.responseStatus)!=null?ee:""}`.toLowerCase().includes(x))})},[e,h]),Q=(0,q.useMemo)(()=>{let x=P.trim().toLowerCase();return t.filter(w=>!(T.length>0&&!T.includes(w.level)||x&&!w.preview.toLowerCase().includes(x)))},[t,P,T]),O=(it=(A=R.find(x=>x.id===S))!=null?A:R[0])!=null?it:null,$=e.filter(x=>!x.success).length,pe=t.filter(x=>x.level==="error").length;function _e(x){v(w=>({...w,methods:w.methods.includes(x)?w.methods.filter(ee=>ee!==x):[...w.methods,x]}))}function Ue(x){V(w=>w.includes(x)?w.filter(ee=>ee!==x):[...w,x])}let le=p==="network"?`${e.length} requests${$>0?` \xB7 ${$} failed`:""}`:p==="console"?`${t.length} logs${pe>0?` \xB7 ${pe} errors`:""}`:"element picker";return(0,f.jsx)("div",{className:N("apd-overlay",g&&"apd-overlay-passthrough"),onClick:n,children:(0,f.jsxs)("div",{className:`apd-modal${g?" apd-minimized":""}`,onClick:x=>x.stopPropagation(),children:[(0,f.jsxs)("div",{className:"apd-header",children:[(0,f.jsxs)("div",{className:"apd-header-title",children:[(0,f.jsx)("span",{className:"apd-live-dot"}),"API Debugger"]}),(0,f.jsx)("span",{className:"apd-header-count",children:le}),(0,f.jsx)("div",{className:"apd-spacer"}),(0,f.jsx)("button",{className:"apd-icon-btn",onClick:i,title:"Toggle theme",type:"button",children:a==="light"?"\u2600":"\u263E"}),p==="network"&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("button",{className:"apd-icon-btn",title:"Export JSON",type:"button",onClick:()=>st(`api-logs-${Date.now()}.json`,e),children:"\u2B73"}),(0,f.jsx)("button",{className:"apd-icon-btn",title:"Export HAR",type:"button",onClick:()=>st(`api-logs-${Date.now()}.har`,Oe(e)),children:"HAR"})]}),p!=="inspector"&&(0,f.jsx)("button",{className:"apd-icon-btn",title:p==="network"?"Clear logs":"Clear console",type:"button",onClick:p==="network"?o:r,children:"\u{1F5D1}"}),(0,f.jsx)("button",{className:"apd-icon-btn",title:g?"Restore":"Minimize",type:"button",onClick:()=>L(x=>!x),children:g?"\u25A2":"\u2014"}),(0,f.jsx)("button",{className:"apd-icon-btn",title:"Close",type:"button",onClick:n,children:"\u2715"})]}),!g&&(0,f.jsxs)("div",{className:"apd-tabs",children:[(0,f.jsxs)("button",{type:"button",className:N("apd-tab",p==="network"&&"apd-active"),onClick:()=>b("network"),children:["Network",e.length>0&&(0,f.jsx)("span",{className:N("apd-tab-badge",$>0&&"apd-tab-badge-error"),children:e.length})]}),(0,f.jsxs)("button",{type:"button",className:N("apd-tab",p==="console"&&"apd-active"),onClick:()=>b("console"),children:["Console",t.length>0&&(0,f.jsx)("span",{className:N("apd-tab-badge",pe>0&&"apd-tab-badge-error"),children:t.length})]}),l&&(0,f.jsx)("button",{type:"button",className:N("apd-tab",p==="inspector"&&"apd-active"),onClick:()=>b("inspector"),children:"Inspector"})]}),!g&&p==="network"&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)("div",{className:"apd-toolbar",children:[(0,f.jsx)(et,{value:h.search,onChange:x=>v(w=>({...w,search:x}))}),(0,f.jsx)(It,{status:h.status,onStatusChange:x=>v(w=>({...w,status:x})),methods:so,activeMethods:h.methods,onToggleMethod:_e})]}),(0,f.jsxs)("div",{className:"apd-body",children:[(0,f.jsx)(qt,{logs:R,selectedId:(dt=O==null?void 0:O.id)!=null?dt:null,onSelect:u,onTogglePin:s}),(0,f.jsx)(Ot,{log:O,onTogglePin:s})]})]}),!g&&p==="console"&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)("div",{className:"apd-toolbar",children:[(0,f.jsx)(et,{value:P,onChange:y}),io.map(x=>(0,f.jsx)("button",{type:"button",className:N("apd-chip",T.includes(x)&&"apd-active"),onClick:()=>Ue(x),children:x},x))]}),(0,f.jsx)(Ut,{entries:Q})]}),l&&(0,f.jsx)("div",{style:{display:!g&&p==="inspector"?"flex":"none",flexDirection:"column",flex:1,overflow:"hidden"},children:(0,f.jsx)(an,{onInspectingChange:L,editorProjectRoot:m})}),!g&&(0,f.jsxs)("div",{className:"apd-footer",children:[(0,f.jsxs)("span",{children:[(0,f.jsx)("span",{className:"apd-kbd",children:"Ctrl"}),"+",(0,f.jsx)("span",{className:"apd-kbd",children:"Shift"}),"+",(0,f.jsx)("span",{className:"apd-kbd",children:"D"})," to toggle \xB7 ",(0,f.jsx)("span",{className:"apd-kbd",children:"Space"}),"+",(0,f.jsx)("span",{className:"apd-kbd",children:"H"})," to hide"]}),(0,f.jsx)("span",{style:{marginLeft:"auto"},children:"next-api-debugger \xB7 dev only"})]})]})})}var de=require("react/jsx-runtime");function po(e){return typeof e=="boolean"?e:process.env.NODE_ENV!=="production"}function pn(e){let{enabled:t,maxLogs:n=200,initialPosition:o,axiosInstance:r,theme:s="dark",keyboardShortcut:a=!0,activationSequence:i,ignoreUrls:l,serverLogsUrl:m,inspector:p=!0,editorProjectRoot:b}=e,h=po(t),[v,S]=(0,X.useState)(!i),u=h&&v,[g,L]=(0,X.useState)(!1),[P,y]=(0,X.useState)(!1),[T,V]=(0,X.useState)(s),{logs:R,clear:Q,togglePin:O}=vt(),{entries:$,clear:pe}=yt();if((0,X.useEffect)(()=>S(!i),[i]),(0,X.useEffect)(()=>{if(!u||typeof window=="undefined")return;E.setMaxLogs(n),z.setMaxEntries(500),Le({ignoreUrls:m?[...l!=null?l:[],m]:l}),pt({ignoreUrls:l}),mt(),p&&gt();let A=r?Pe(r,{ignoreUrls:l}):()=>{};return()=>{Ce(),lt(),ft(),p&&ht(),A()}},[u,p,m]),(0,X.useEffect)(()=>{if(!(!u||!m||typeof window=="undefined"))return xt(m)},[u,m]),Et(i,()=>{S(!0),L(A=>!A)},h&&a),kt({ctrl:!0,shift:!0,key:"d"},()=>L(A=>!A),u&&a),Nt(["space","h"],()=>{y(A=>!A),L(!1)},u&&a),!u)return null;let _e=R.filter(A=>!A.success).length,Ue=$.filter(A=>A.level==="error").length,le=T==="system"?"dark":T;return(0,de.jsxs)("div",{className:`apd-root${le==="light"?" apd-light":""}`,children:[(0,de.jsx)(Pt,{}),!P&&!g&&(0,de.jsx)(Mt,{count:R.length+$.length,hasErrors:_e>0||Ue>0,onOpen:()=>L(!0),initialPosition:o}),!P&&g&&(0,de.jsx)(dn,{logs:R,consoleEntries:$,onClose:()=>L(!1),onClear:Q,onClearConsole:pe,onTogglePin:O,theme:le,onToggleTheme:()=>V(le==="light"?"dark":"light"),inspectorEnabled:p,editorProjectRoot:b})]})}0&&(module.exports={ApiDebugger,exportAsHar,generateCurl,installAxiosInterceptor,installFetchInterceptor,logStore,uninstallFetchInterceptor});
//# sourceMappingURL=index.js.map