'use client';
import{useEffect as eo,useState as We}from"react";var Se=class{constructor(){this.logs=[];this.listeners=new Set;this.maxLogs=200;this.snapshot=[];this.getLogs=()=>(this.snapshot=this.logs,this.snapshot);this.subscribe=t=>(this.listeners.add(t),()=>this.listeners.delete(t))}setMaxLogs(t){this.maxLogs=Math.max(1,t),this.trim()}addLog(t){this.logs=[t,...this.logs],this.trim(),this.emit()}togglePin(t){this.logs=this.logs.map(n=>n.id===t?{...n,pinned:!n.pinned}:n),this.emit()}clear(){this.logs=[],this.emit()}trim(){if(this.logs.length<=this.maxLogs)return;let t=this.logs.filter(s=>s.pinned),o=this.logs.filter(s=>!s.pinned).slice(0,Math.max(0,this.maxLogs-t.length)),r=[...t,...o];r.sort((s,a)=>a.timestamp-s.timestamp),this.logs=r}emit(){this.listeners.forEach(t=>t())}},C=new Se;var Ne=class{constructor(){this.entries=[];this.listeners=new Set;this.maxEntries=500;this.getEntries=()=>this.entries;this.subscribe=t=>(this.listeners.add(t),()=>this.listeners.delete(t))}setMaxEntries(t){this.maxEntries=Math.max(1,t),this.trim()}addEntry(t){let n=this.entries[0];n&&n.level===t.level&&n.preview===t.preview&&n.stack===t.stack?this.entries=[{...n,count:n.count+1,timestamp:t.timestamp},...this.entries.slice(1)]:this.entries=[t,...this.entries],this.trim(),this.emit()}clear(){this.entries=[],this.emit()}trim(){this.entries.length>this.maxEntries&&(this.entries=this.entries.slice(0,this.maxEntries))}emit(){this.listeners.forEach(t=>t())}},B=new Ne;var $="x-apd-skip";function j(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,9)}`}function O(e){if(!e)return null;try{return JSON.parse(e)}catch{return e}}function V(e){if(e==null)return null;if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return String(e)}}function z(e){if(!e)return 0;try{return new Blob([e]).size}catch{return e.length}}function Le(e){if(!e)return"0 B";let t=["B","KB","MB","GB"],n=Math.min(t.length-1,Math.floor(Math.log(e)/Math.log(1024))),o=e/Math.pow(1024,n);return`${n===0?o:o.toFixed(1)} ${t[n]}`}function pe(e){return e<1e3?`${e} ms`:`${(e/1e3).toFixed(2)} s`}function K(e){let t=new Date(e);return t.toLocaleTimeString(void 0,{hour12:!1})+`.${String(t.getMilliseconds()).padStart(3,"0")}`}function W(e){try{let t=typeof window!="undefined"?window.location.origin:"http://localhost",n=new URL(e,t),o={};return n.searchParams.forEach((r,s)=>{o[s]=r}),{endpoint:n.pathname,queryParams:o}}catch{return{endpoint:e,queryParams:{}}}}function le(e){let t={};return e&&e.forEach((n,o)=>{t[o]=n}),t}function te(e){let t={};if(!e)return t;if(typeof e.toJSON=="function")return{...e.toJSON()};if(e instanceof Headers)return le(e);if(typeof e=="object")for(let[n,o]of Object.entries(e))o!=null&&(t[n]=String(o));return t}function Y(e,t){return!t||t.length===0?!1:t.some(n=>n instanceof RegExp?n.test(e):e.includes(n))}function S(...e){return e.filter(Boolean).join(" ")}async function ce(e){try{if(navigator.clipboard&&window.isSecureContext)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select();let n=document.execCommand("copy");return document.body.removeChild(t),n}catch{return!1}}var _=null,ue=!1;function Gt(e){if(e==null)return null;if(typeof e=="string")return e;if(e instanceof URLSearchParams)return e.toString();if(e instanceof FormData){let t=[];return e.forEach((n,o)=>{t.push(`${o}=${n instanceof File?`[File: ${n.name}]`:n}`)}),t.join("&")}return"[binary data]"}function Ce(e={}){ue||typeof window=="undefined"||typeof window.fetch!="function"||(_=window.fetch.bind(window),ue=!0,window.fetch=async function(n,o){var x,y,w,P,T;let r=n instanceof Request?n:null,s=r?r.url:String(n);if(Y(s,e.ignoreUrls))return _(n,o);let a=le(new Headers((y=(x=o==null?void 0:o.headers)!=null?x:r==null?void 0:r.headers)!=null?y:void 0));if(a[$]){let k=new Headers((P=(w=o==null?void 0:o.headers)!=null?w:r==null?void 0:r.headers)!=null?P:void 0);return k.delete($),r?_(new Request(r,{headers:k})):_(n,{...o,headers:k})}let i=Date.now(),l=performance.now(),m=((o==null?void 0:o.method)||(r==null?void 0:r.method)||"GET").toUpperCase(),{endpoint:d,queryParams:h}=W(s),g=Gt((T=o==null?void 0:o.body)!=null?T:null),p={id:j(),url:s,endpoint:d,method:m,requestHeaders:a,requestBody:O(g),requestBodyRaw:g,queryParams:h,timestamp:i,source:"fetch",requestSize:z(g),pinned:!1};try{let k=await _(n,o),R=Math.round(performance.now()-l),D=k.clone(),H=null;try{H=await D.text()}catch{H=null}return C.addLog({...p,duration:R,responseStatus:k.status,responseStatusText:k.statusText,responseHeaders:le(k.headers),responseBody:O(H),responseBodyRaw:H,responseSize:z(H),success:k.ok,error:k.ok?null:`HTTP ${k.status} ${k.statusText}`}),k}catch(k){let R=Math.round(performance.now()-l);throw C.addLog({...p,duration:R,responseStatus:null,responseStatusText:"",responseHeaders:{},responseBody:null,responseBodyRaw:null,responseSize:0,success:!1,error:(k==null?void 0:k.message)||"Network error"}),k}})}function Re(){ue&&_&&typeof window!="undefined"&&(window.fetch=_),ue=!1,_=null}var ne=null,Z=null,oe=null,me=!1,G=Symbol("apd-xhr-meta");function Zt(e){let t={};return e.trim().split(/[\r\n]+/).forEach(n=>{let o=n.indexOf(":");if(o===-1)return;let r=n.slice(0,o).trim().toLowerCase(),s=n.slice(o+1).trim();r&&(t[r]=s)}),t}function et(e={}){me||typeof window=="undefined"||typeof XMLHttpRequest=="undefined"||(ne=XMLHttpRequest.prototype.open,Z=XMLHttpRequest.prototype.send,oe=XMLHttpRequest.prototype.setRequestHeader,me=!0,XMLHttpRequest.prototype.open=function(n,o,...r){let s=String(o);return this[G]={id:j(),method:(n||"GET").toUpperCase(),url:s,startTime:0,startPerf:0,requestHeaders:{},ignored:Y(s,e.ignoreUrls)},ne.apply(this,[n,o,...r])},XMLHttpRequest.prototype.setRequestHeader=function(n,o){if(n.toLowerCase()===$){this[G]&&(this[G].ignored=!0);return}return this[G]&&(this[G].requestHeaders[n]=o),oe.apply(this,[n,o])},XMLHttpRequest.prototype.send=function(n){let o=this[G];if(!o||o.ignored)return Z.apply(this,[n]);o.startTime=Date.now(),o.startPerf=performance.now();let r=n==null?null:typeof n=="string"?n:n instanceof URLSearchParams?n.toString():n instanceof FormData?"[form data]":"[binary data]",s=()=>{let a=Math.round(performance.now()-o.startPerf),{endpoint:i,queryParams:l}=W(o.url),m=Zt(this.getAllResponseHeaders()||""),d=null;try{d=typeof this.responseText=="string"?this.responseText:null}catch{d=null}let h=this.status,g=h>=200&&h<400,p={id:o.id,url:o.url,endpoint:i,method:o.method,requestHeaders:o.requestHeaders,requestBody:O(r),requestBodyRaw:r,queryParams:l,responseStatus:h||null,responseStatusText:this.statusText||"",responseHeaders:m,responseBody:O(d),responseBodyRaw:d,duration:a,timestamp:o.startTime,success:g,error:g?null:h===0?"Network error":`HTTP ${h} ${this.statusText}`,source:"xhr",requestSize:z(r),responseSize:z(d),pinned:!1};C.addLog(p),this.removeEventListener("loadend",s)};return this.addEventListener("loadend",s),Z.apply(this,[n])})}function tt(){me&&typeof window!="undefined"&&typeof XMLHttpRequest!="undefined"&&(ne&&(XMLHttpRequest.prototype.open=ne),Z&&(XMLHttpRequest.prototype.send=Z),oe&&(XMLHttpRequest.prototype.setRequestHeader=oe)),me=!1,ne=null,Z=null,oe=null}function Qt(e){let t=(e==null?void 0:e.baseURL)||"",n=(e==null?void 0:e.url)||"",o=/^https?:\/\//i.test(n)?n:`${t}${t&&!t.endsWith("/")&&!n.startsWith("/")?"/":""}${n}`;if(e!=null&&e.params&&typeof e.params=="object"){let r=en(e.params);r&&(o+=(o.includes("?")?"&":"?")+r)}return o}function en(e){let t=new URLSearchParams;for(let[n,o]of Object.entries(e))o!=null&&(Array.isArray(o)?o.forEach(r=>t.append(n,String(r))):t.append(n,String(o)));return t.toString()}function nt(e){if(e==null)return null;if(typeof e=="string")return e;if(typeof URLSearchParams!="undefined"&&e instanceof URLSearchParams)return e.toString();if(typeof FormData!="undefined"&&e instanceof FormData){let t=[];return e.forEach((n,o)=>{t.push(`${o}=${n instanceof File?`[File: ${n.name}]`:n}`)}),t.join("&")}return V(e)}function Pe(e,t={}){var s;if(!e||!e.interceptors||typeof((s=e.interceptors.request)==null?void 0:s.use)!="function")return()=>{};if(e.__apiDebuggerInstalled)return()=>{};e.__apiDebuggerInstalled=!0;let n=e.interceptors.request.use(a=>{let i={id:j(),startTime:Date.now(),startPerf:performance.now(),requestBodyRaw:nt(a.data),requestHeadersSnapshot:te(a.headers)};return a.__apdMeta=i,a.headers&&typeof a.headers.set=="function"?a.headers.set($,"1"):a.headers={...a.headers||{},[$]:"1"},a});function o(a,i,l){var R,D,H,X,A,L;if(!a)return;let m=Qt(a);if(Y(m,t.ignoreUrls))return;let d=a.__apdMeta||{id:j(),startTime:Date.now(),startPerf:performance.now(),requestBodyRaw:nt(a.data),requestHeadersSnapshot:te(a.headers)},h=Math.round(performance.now()-d.startPerf),{endpoint:g,queryParams:p}=W(m),x=te(a.headers),y=Object.keys(x).length>0?x:d.requestHeadersSnapshot;delete y[$];let w=d.requestBodyRaw,P=(i==null?void 0:i.data)!==void 0?V(i.data):null,T=(H=(D=i==null?void 0:i.status)!=null?D:(R=l==null?void 0:l.response)==null?void 0:R.status)!=null?H:null,k={id:d.id,url:m,endpoint:g,method:(a.method||"get").toUpperCase(),requestHeaders:y,requestBody:(X=O(w))!=null?X:w,requestBodyRaw:w,queryParams:p,responseStatus:T,responseStatusText:(A=i==null?void 0:i.statusText)!=null?A:"",responseHeaders:te(i==null?void 0:i.headers),responseBody:(L=i==null?void 0:i.data)!=null?L:null,responseBodyRaw:P,duration:h,timestamp:d.startTime,success:!l&&!!T&&T<400,error:l?l.message||"Request failed":null,source:"axios",requestSize:z(w),responseSize:z(P),pinned:!1};C.addLog(k)}let r=e.interceptors.response.use(a=>(o(a.config,a),a),a=>(o(a==null?void 0:a.config,a==null?void 0:a.response,a),Promise.reject(a)));return()=>{e.interceptors.request.eject(n),e.interceptors.response.eject(r),e.__apiDebuggerInstalled=!1}}var ot=["log","info","warn","error","debug"],He={},re=null,ae=null,Me=!1;function tn(e,t=new WeakSet){var n;if(e===null)return"null";if(e===void 0)return"undefined";if(typeof e=="string")return e;if(typeof e=="number"||typeof e=="boolean")return String(e);if(e instanceof Error)return`${e.name}: ${e.message}`;if(typeof e=="function")return e.name?`\u0192 ${e.name}()`:"\u0192 ()";if(typeof e=="object"){if(t.has(e))return"[Circular]";t.add(e);try{return(n=JSON.stringify(e,(o,r)=>typeof r=="bigint"?r.toString():r,2))!=null?n:String(e)}catch{return Array.isArray(e)?"[Array]":"[Object]"}}return String(e)}function nn(e){for(let t of e)if(t instanceof Error&&t.stack)return t.stack;return null}function Te(e,t,n){let o=t.map(r=>tn(r));return{id:j(),level:e,parts:o,preview:o.join(" "),stack:nn(t),timestamp:Date.now(),source:n,count:1}}function rt(e={}){var n,o;if(Me||typeof window=="undefined"||typeof console=="undefined")return;Me=!0;let t=(n=e.levels)!=null?n:ot;for(let r of t){let s=(o=console[r])==null?void 0:o.bind(console);s&&(He[r]=s,console[r]=(...a)=>{B.addEntry(Te(r,a,"console")),s(...a)})}re=r=>{let s=r.error?[r.error]:[r.message],a=Te("error",s,"window.onerror");B.addEntry({...a,preview:a.preview||`${r.message} (${r.filename}:${r.lineno}:${r.colno})`})},window.addEventListener("error",re),ae=r=>{let s=r.reason,a=Te("error",[s],"unhandledrejection");B.addEntry({...a,preview:`Unhandled promise rejection: ${a.preview}`})},window.addEventListener("unhandledrejection",ae)}function at(){if(typeof console!="undefined")for(let e of ot){let t=He[e];t&&(console[e]=t)}typeof window!="undefined"&&(re&&window.removeEventListener("error",re),ae&&window.removeEventListener("unhandledrejection",ae)),He={},re=null,ae=null,Me=!1}var qe=new WeakMap,se=null,ie=null,Ae=!1;function st(){Ae||typeof document=="undefined"||(Ae=!0,se=document.createElement.bind(document),ie=document.createElementNS.bind(document),document.createElement=function(t,n){let o=se(t,n);return qe.set(o,new Error),o},document.createElementNS=function(t,n,o){let r=ie(t,n,o);return qe.set(r,new Error),r})}function it(){se&&(document.createElement=se),ie&&(document.createElementNS=ie),Ae=!1,se=null,ie=null}function dt(e){return qe.get(e)}import{useCallback as pt,useSyncExternalStore as on}from"react";function lt(){let e=on(C.subscribe,C.getLogs,C.getLogs),t=pt(()=>C.clear(),[]),n=pt(o=>C.togglePin(o),[]);return{logs:e,clear:t,togglePin:n}}import{useCallback as rn,useSyncExternalStore as an}from"react";function ct(){let e=an(B.subscribe,B.getEntries,B.getEntries),t=rn(()=>B.clear(),[]);return{entries:e,clear:t}}import{useEffect as sn}from"react";function ut(e,t,n=!0){sn(()=>{if(!n||typeof window=="undefined")return;function o(r){let s=!e.ctrl||r.ctrlKey||r.metaKey,a=!e.shift||r.shiftKey;s&&a&&r.key.toLowerCase()===e.key.toLowerCase()&&(r.preventDefault(),t())}return window.addEventListener("keydown",o),()=>window.removeEventListener("keydown",o)},[e.ctrl,e.shift,e.key,t,n])}import{useEffect as pn,useRef as ln}from"react";function Be(e){return e===" "?"space":e.toLowerCase()}function dn(e){var o;let t=e;if(!t)return!1;let n=(o=t.tagName)==null?void 0:o.toLowerCase();return n==="input"||n==="textarea"||n==="select"||t.isContentEditable}function mt(e,t){if(typeof window=="undefined")return()=>{};let n=e.map(Be),o=new Set;function r(i){if(dn(i.target))return;let l=Be(i.key),m=o.has(l);o.add(l),!m&&n.every(d=>o.has(d))&&(i.preventDefault(),t())}function s(i){o.delete(Be(i.key))}function a(){o.clear()}return window.addEventListener("keydown",r),window.addEventListener("keyup",s),window.addEventListener("blur",a),()=>{window.removeEventListener("keydown",r),window.removeEventListener("keyup",s),window.removeEventListener("blur",a)}}function ft(e,t,n=!0){let o=ln(t);o.current=t,pn(()=>{if(n)return mt(e,()=>o.current())},[e.join(","),n])}import{useEffect as cn}from"react";var gt=`
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
`;var ht="next-api-debugger-styles";function bt(){return cn(()=>{if(typeof document=="undefined"||document.getElementById(ht))return;let e=document.createElement("style");e.id=ht,e.textContent=gt,document.head.appendChild(e)},[]),null}import{useCallback as fe,useEffect as xt,useRef as Ie,useState as un}from"react";var vt="apd-button-position",he=56,yt=5;function ge(e){return typeof window=="undefined"?e:{x:Math.min(Math.max(8,e.x),window.innerWidth-he-8),y:Math.min(Math.max(8,e.y),window.innerHeight-he-8)}}function mn(){return typeof window=="undefined"?{x:24,y:24}:{x:window.innerWidth-he-24,y:window.innerHeight-he-24}}function wt(e){let[t,n]=un(()=>{if(typeof window=="undefined")return e!=null?e:{x:24,y:24};try{let d=sessionStorage.getItem(vt);if(d)return ge(JSON.parse(d))}catch{}return ge(e!=null?e:mn())}),o=Ie(!1),r=Ie(!1),s=Ie({pointerX:0,pointerY:0,posX:0,posY:0}),a=fe(d=>{o.current=!0,r.current=!1,s.current={pointerX:d.clientX,pointerY:d.clientY,posX:t.x,posY:t.y},d.currentTarget.setPointerCapture(d.pointerId)},[t.x,t.y]),i=fe(d=>{if(!o.current)return;let h=d.clientX-s.current.pointerX,g=d.clientY-s.current.pointerY;(Math.abs(h)>yt||Math.abs(g)>yt)&&(r.current=!0),n(ge({x:s.current.posX+h,y:s.current.posY+g}))},[]),l=fe(()=>{o.current=!1},[]);xt(()=>{try{sessionStorage.setItem(vt,JSON.stringify(t))}catch{}},[t]),xt(()=>{function d(){n(h=>ge(h))}return window.addEventListener("resize",d),()=>window.removeEventListener("resize",d)},[]);let m=fe(()=>r.current,[]);return{position:t,onPointerDown:a,onPointerMove:i,onPointerUp:l,wasDragged:m}}import{jsx as $e,jsxs as kt}from"react/jsx-runtime";function Et({count:e,hasErrors:t,onOpen:n,initialPosition:o}){let{position:r,onPointerDown:s,onPointerMove:a,onPointerUp:i,wasDragged:l}=wt(o);return kt("button",{type:"button",className:"apd-btn",style:{left:r.x,top:r.y},onPointerDown:s,onPointerMove:a,onPointerUp:i,onClick:()=>{l()||n()},"aria-label":"Open API debugger",title:"API Debugger (drag to move)",children:[kt("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[$e("polyline",{points:"16 18 22 12 16 6"}),$e("polyline",{points:"8 6 2 12 8 18"})]}),e>0&&$e("span",{className:S("apd-btn-dot",t&&"apd-has-errors"),children:e>99?"99+":e})]})}import{useEffect as Gn,useMemo as Jt,useState as ee}from"react";import{jsx as je,jsxs as St}from"react/jsx-runtime";function ze({value:e,onChange:t}){return St("div",{className:"apd-search",children:[St("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[je("circle",{cx:"11",cy:"11",r:"7"}),je("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]}),je("input",{type:"text",placeholder:"Filter by URL, endpoint, method or status code...",value:e,onChange:n=>t(n.target.value),spellCheck:!1})]})}import{Fragment as fn,jsx as De,jsxs as gn}from"react/jsx-runtime";function Nt({status:e,onStatusChange:t,methods:n,activeMethods:o,onToggleMethod:r}){return gn(fn,{children:[De("button",{type:"button",className:S("apd-chip apd-chip-success",e==="success"&&"apd-active"),onClick:()=>t(e==="success"?"all":"success"),children:"Success"}),De("button",{type:"button",className:S("apd-chip apd-chip-failed",e==="failed"&&"apd-active"),onClick:()=>t(e==="failed"?"all":"failed"),children:"Failed"}),n.map(s=>De("button",{type:"button",className:S("apd-chip",o.includes(s)&&"apd-active"),onClick:()=>r(s),children:s},s))]})}import{jsx as U,jsxs as Oe}from"react/jsx-runtime";function hn(e){return["GET","POST","PUT","PATCH","DELETE"].includes(e.toUpperCase())?`apd-method-${e.toUpperCase()}`:"apd-method-OTHER"}function Lt({log:e,selected:t,onSelect:n,onTogglePin:o}){var r;return Oe("div",{className:S("apd-item",t&&"apd-selected"),onClick:n,role:"button",tabIndex:0,onKeyDown:s=>s.key==="Enter"&&n(),children:[Oe("div",{className:"apd-item-row1",children:[U("span",{className:S("apd-method",hn(e.method)),children:e.method}),U("span",{className:"apd-item-url",title:e.url,children:e.endpoint}),U("span",{className:S("apd-status-dot",e.success?"apd-ok":"apd-fail")}),e.pinned&&U("button",{type:"button",className:"apd-pin-star",onClick:s=>{s.stopPropagation(),o()},title:"Unpin","aria-label":"Unpin request",style:{background:"none",border:"none",cursor:"pointer",padding:0},children:"\u2605"})]}),Oe("div",{className:"apd-item-row2",children:[U("span",{children:(r=e.responseStatus)!=null?r:e.error?"ERR":"\u2014"}),U("span",{children:pe(e.duration)}),U("span",{children:K(e.timestamp)}),U("span",{style:{marginLeft:"auto",textTransform:"uppercase"},children:e.source})]})]})}import{jsx as be,jsxs as bn}from"react/jsx-runtime";function Ct({logs:e,selectedId:t,onSelect:n,onTogglePin:o}){return e.length===0?be("div",{className:"apd-list",children:bn("div",{className:"apd-empty",children:["No requests captured yet.",be("br",{}),"Make an API call and it'll show up here."]})}):be("div",{className:"apd-list",children:e.map(r=>be(Lt,{log:r,selected:r.id===t,onSelect:()=>n(r.id),onTogglePin:()=>o(r.id)},r.id))})}import{Fragment as Ln,useState as Cn}from"react";import{useState as xn}from"react";import{jsxs as vn}from"react/jsx-runtime";function xe({getText:e,label:t,icon:n}){let[o,r]=xn(!1);async function s(){await ce(e())&&(r(!0),setTimeout(()=>r(!1),1200))}return vn("button",{type:"button",className:S("apd-action-btn",o&&"apd-copied"),onClick:s,children:[n,o?"Copied":t]})}import{useEffect as Tt,useMemo as Sn,useRef as Ht,useState as Mt}from"react";var yn=/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(\.\d+)?([eE][+-]?\d+)?)/g;function wn(e){return e.replace(yn,t=>{let n="apd-json-num";return/^"/.test(t)?n=/:$/.test(t)?"apd-json-key":"apd-json-str":/true|false/.test(t)?n="apd-json-bool":/null/.test(t)&&(n="apd-json-null"),`<span class="${n}">${t}</span>`})}function kn(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function En(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Rt(e,t){if(e!=null&&typeof e=="object")return{content:JSON.stringify(e,null,2),isJson:!0};if(typeof e=="string")try{return{content:JSON.stringify(JSON.parse(e),null,2),isJson:!0}}catch{return{content:t!=null?t:e,isJson:!1}}return{content:t!=null?t:String(e!=null?e:""),isJson:!1}}function Pt(e,t,n){let o=kn(e),r=0,s=o;if(n){let i=new RegExp(En(n),"gi");s=o.replace(i,l=>(r+=1,`<mark class='apd-json-highlight'>${l}</mark>`))}return{html:t?wn(s):s,matchCount:r}}import{jsx as F,jsxs as ve}from"react/jsx-runtime";function ye({value:e,raw:t,searchable:n=!0}){let[o,r]=Mt(""),[s,a]=Mt(0),i=Ht(null),l=Ht(""),{content:m,isJson:d}=Rt(e,t),h=o.trim(),{html:g,matchCount:p}=Sn(()=>Pt(m,d,h),[m,d,h]);Tt(()=>{let y=h!==l.current;l.current=h,(y||s>=p)&&a(0)},[h,p]),Tt(()=>{var w;if(!i.current)return;let y=i.current.querySelectorAll("mark.apd-json-highlight");y.forEach((P,T)=>P.classList.toggle("apd-active",T===s)),(w=y[s])==null||w.scrollIntoView({block:"center",behavior:"smooth"})},[g,s]);function x(y){p!==0&&a(w=>(w+y+p)%p)}return ve("div",{children:[n&&m.length>0&&ve("div",{className:"apd-json-search",children:[ve("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[F("circle",{cx:"11",cy:"11",r:"7"}),F("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]}),F("input",{type:"text",placeholder:"Find in payload...",value:o,onChange:y=>r(y.target.value),onKeyDown:y=>{y.key==="Enter"&&(y.preventDefault(),x(y.shiftKey?-1:1))},spellCheck:!1}),o&&F("span",{className:"apd-json-search-count",children:p>0?`${s+1} / ${p}`:"No matches"}),o&&p>0&&ve("div",{className:"apd-json-search-nav",children:[F("button",{type:"button",onClick:()=>x(-1),"aria-label":"Previous match",title:"Previous match (Shift+Enter)",children:"\u2191"}),F("button",{type:"button",onClick:()=>x(1),"aria-label":"Next match",title:"Next match (Enter)",children:"\u2193"})]})]}),F("pre",{ref:i,className:"apd-json",dangerouslySetInnerHTML:{__html:g}})]})}function we(e){return`'${e.replace(/'/g,"'\\''")}'`}function Nn(e){let t=e.trim();if(!t||!(t.startsWith("{")||t.startsWith("[")))return!1;try{return JSON.parse(t),!0}catch{return!1}}function _e(e){let t=[`curl -X ${e.method} ${we(e.url)}`],n=Object.keys(e.requestHeaders).some(o=>o.toLowerCase()==="content-type");for(let[o,r]of Object.entries(e.requestHeaders))/^(host|content-length|connection)$/i.test(o)||t.push(`  -H ${we(`${o}: ${r}`)}`);return e.requestBodyRaw&&(!n&&Nn(e.requestBodyRaw)&&t.push(`  -H ${we("Content-Type: application/json")}`),t.push(`  --data-raw ${we(e.requestBodyRaw)}`)),t.join(` \\
`)}import{jsx as u,jsxs as N}from"react/jsx-runtime";function Q({title:e,count:t,defaultOpen:n=!0,children:o}){let[r,s]=Cn(n);return N("div",{className:"apd-section",children:[N("div",{className:"apd-section-header",onClick:()=>s(a=>!a),children:[N("span",{children:[e,typeof t=="number"?` (${t})`:""]}),u("span",{children:r?"\u2212":"+"})]}),r&&u("div",{className:"apd-section-body",children:o})]})}function Ue({data:e}){let t=Object.entries(e);return t.length===0?u("div",{className:"apd-section-body apd-empty-body",children:"None"}):u("div",{className:"apd-kv",children:t.map(([n,o])=>N(Ln,{children:[u("div",{className:"apd-kv-key",children:n}),u("div",{className:"apd-kv-val",children:o})]},n))})}function qt({log:e,onTogglePin:t}){var s,a,i,l,m;if(!e)return u("div",{className:"apd-detail",children:u("div",{className:"apd-detail-empty",children:"Select a request to see full details"})});let n=_e(e),o=(a=(s=V(e.requestBody))!=null?s:e.requestBodyRaw)!=null?a:"",r=(l=(i=V(e.responseBody))!=null?i:e.responseBodyRaw)!=null?l:"";return N("div",{className:"apd-detail",children:[N("div",{className:"apd-detail-header",children:[N("div",{className:"apd-detail-url",children:[u("strong",{children:e.method})," ",e.url]}),u("button",{type:"button",className:"apd-action-btn",onClick:()=>t(e.id),title:e.pinned?"Unpin":"Pin this request",children:e.pinned?"\u2605 Pinned":"\u2606 Pin"})]}),N("div",{className:"apd-meta-grid",children:[N("div",{children:[u("div",{className:"apd-meta-label",children:"Status"}),N("div",{className:"apd-meta-value",style:{color:e.success?"var(--apd-success)":"var(--apd-error)"},children:[(m=e.responseStatus)!=null?m:"Failed"," ",e.responseStatusText]})]}),N("div",{children:[u("div",{className:"apd-meta-label",children:"Duration"}),u("div",{className:"apd-meta-value",children:pe(e.duration)})]}),N("div",{children:[u("div",{className:"apd-meta-label",children:"Time"}),u("div",{className:"apd-meta-value",children:K(e.timestamp)})]}),N("div",{children:[u("div",{className:"apd-meta-label",children:"Source"}),u("div",{className:"apd-meta-value",children:e.source})]}),N("div",{children:[u("div",{className:"apd-meta-label",children:"Req. size"}),u("div",{className:"apd-meta-value",children:Le(e.requestSize)})]}),N("div",{children:[u("div",{className:"apd-meta-label",children:"Res. size"}),u("div",{className:"apd-meta-value",children:Le(e.responseSize)})]})]}),e.error&&N("div",{className:"apd-section",style:{borderColor:"var(--apd-error)"},children:[u("div",{className:"apd-section-header",style:{color:"var(--apd-error)"},children:"Error"}),u("div",{className:"apd-section-body",children:e.error})]}),N("div",{className:"apd-actions",children:[u(xe,{label:"Copy cURL",getText:()=>n}),u(xe,{label:"Copy Request",getText:()=>o}),u(xe,{label:"Copy Response",getText:()=>r})]}),u(Q,{title:"cURL",children:u(ye,{value:n,searchable:!1})}),u(Q,{title:"Query Params",count:Object.keys(e.queryParams).length,defaultOpen:!1,children:u(Ue,{data:e.queryParams})}),u(Q,{title:"Request Headers",count:Object.keys(e.requestHeaders).length,defaultOpen:!1,children:u(Ue,{data:e.requestHeaders})}),u(Q,{title:"Request Body",children:e.requestBodyRaw?u(ye,{value:e.requestBody,raw:e.requestBodyRaw}):u("div",{className:"apd-empty-body",children:"No body"})}),u(Q,{title:"Response Headers",count:Object.keys(e.responseHeaders).length,defaultOpen:!1,children:u(Ue,{data:e.responseHeaders})}),u(Q,{title:"Response Body",children:e.responseBodyRaw?u(ye,{value:e.responseBody,raw:e.responseBodyRaw}):u("div",{className:"apd-empty-body",children:"No body"})})]})}import{useState as Rn}from"react";import{jsx as I,jsxs as ke}from"react/jsx-runtime";var Pn={log:"\u25B8",info:"\u2139",warn:"\u26A0",error:"\u2715",debug:"\u2699"};function Tn({entry:e}){var o;let[t,n]=Rn(!1);return ke("div",{className:`apd-console-item apd-console-${e.level}`,children:[I("span",{className:"apd-console-icon",children:(o=Pn[e.level])!=null?o:"\u25B8"}),ke("div",{className:"apd-console-body",children:[I("div",{className:"apd-console-preview",children:e.preview||"(empty)"}),ke("div",{className:"apd-console-meta",children:[I("span",{children:K(e.timestamp)}),e.source!=="console"&&I("span",{children:e.source}),e.stack&&I("button",{type:"button",className:"apd-console-toggle-stack",onClick:()=>n(r=>!r),children:t?"Hide stack trace":"Show stack trace"})]}),t&&e.stack&&I("div",{className:"apd-console-stack",children:e.stack})]}),e.count>1&&I("span",{className:"apd-console-count",children:e.count})]})}function At({entries:e}){return e.length===0?I("div",{className:"apd-console-list",children:ke("div",{className:"apd-empty",children:["Nothing logged yet.",I("br",{}),"console.log/warn/error and uncaught errors will show up here."]})}):I("div",{className:"apd-console-list",children:e.map(t=>I(Tn,{entry:t},t.id))})}import{useEffect as Vn,useRef as _t,useState as Xe}from"react";var Fe="data-apd-source";function Hn(e){let t=e.getAttribute(Fe);if(!t)return null;let n=t.match(/^(.*):(\d+):(\d+)$/);return n?{file:n[1],line:Number(n[2]),column:Number(n[3]),confidence:"exact",origin:"build-plugin"}:{file:t,confidence:"exact",origin:"build-plugin"}}function Bt(e){let t=Object.keys(e).find(n=>n.startsWith("__reactFiber$")||n.startsWith("__reactInternalInstance$"));return t?e[t]:null}function Mn(e){let t=Bt(e);for(;t;){let n=t._debugSource;if(n&&n.fileName)return{file:n.fileName,line:typeof n.lineNumber=="number"?n.lineNumber:void 0,column:typeof n.columnNumber=="number"?n.columnNumber:void 0,confidence:"exact",origin:"react"};t=t.return}return null}function qn(e){let t=Bt(e);for(;t;){let n=t.type;if(typeof n=="function"&&n.name)return n.name;if(n&&typeof n=="object"&&n.displayName)return n.displayName;t=t.return}return null}function It(e){return e.__vueParentComponent?{version:3,inst:e.__vueParentComponent}:e.__vue__?{version:2,inst:e.__vue__}:null}function An(e){var n,o;let t=e;for(;t;){let r=It(t);if(r){let s=r.version===3?(n=r.inst.type)==null?void 0:n.__file:(o=r.inst.$options)==null?void 0:o.__file;if(s)return{file:s,confidence:"exact",origin:"vue"}}t=t.parentElement}return null}function Bn(e){var n,o,r,s;let t=e;for(;t;){let a=It(t);if(a){let i=a.version===3?((n=a.inst.type)==null?void 0:n.__name)||((o=a.inst.type)==null?void 0:o.name):((r=a.inst.$options)==null?void 0:r.name)||((s=a.inst.$options)==null?void 0:s._componentTag);if(i)return i}t=t.parentElement}return null}function In(e){var n,o;let t=window.ng;if(!(t!=null&&t.getComponent))return null;try{let r=t.getComponent(e);return(o=(n=r==null?void 0:r.constructor)==null?void 0:n.name)!=null?o:null}catch{return null}}var $n=/(?:\()?(https?:\/\/[^\s)]+|\/[^\s)]+|[A-Za-z]:\\[^\s)]+):(\d+):(\d+)\)?/;function jn(e){return/next-api-debugger|core\/inspector\/|node_modules/.test(e)}function zn(e){let t=dt(e);if(!(t!=null&&t.stack))return null;let n=t.stack.split(`
`).slice(1);for(let o of n){if(jn(o))continue;let r=o.match($n);if(r)return{file:r[1],line:Number(r[2]),column:Number(r[3]),confidence:"approximate",origin:"stack-trace"}}return null}var de;async function Dn(){if(de!==void 0)return de;try{de=await(await fetch(location.href,{cache:"force-cache"})).text()}catch{de=null}return de}function On(e){if(e.id)return`id="${e.id}"`;for(let t of["data-testid","name"]){let n=e.getAttribute(t);if(n)return`${t}="${n}"`}return e.className&&typeof e.className=="string"?`class="${e.className}"`:null}async function _n(e){let t=location.pathname||"/",n=await Dn();if(n){let o=On(e);if(o){let r=n.indexOf(o);if(r!==-1){let s=n.slice(0,r).split(`
`).length;return{file:t,line:s,confidence:"approximate",origin:"plain-html"}}}}return{file:t,confidence:"approximate",origin:"plain-html"}}async function $t(e){let t=Hn(e);if(t)return t;let n=Mn(e);if(n)return n;let o=An(e);if(o)return o;let r=zn(e);return r||_n(e)}function jt(e){var t,n;return(n=(t=qn(e))!=null?t:Bn(e))!=null?n:In(e)}var Un=["display","position","top","right","bottom","left","width","height","color","background-color","font-family","font-size","font-weight","line-height","text-align","flex-direction","justify-content","align-items","gap","grid-template-columns","grid-template-rows","z-index","opacity","overflow","box-sizing","cursor"];function M(e){let t=parseFloat(e);return Number.isFinite(t)?t:0}function Fn(e){return{margin:{top:M(e.marginTop),right:M(e.marginRight),bottom:M(e.marginBottom),left:M(e.marginLeft)},border:{top:M(e.borderTopWidth),right:M(e.borderRightWidth),bottom:M(e.borderBottomWidth),left:M(e.borderLeftWidth)},padding:{top:M(e.paddingTop),right:M(e.paddingRight),bottom:M(e.paddingBottom),left:M(e.paddingLeft)},content:{width:M(e.width),height:M(e.height)}}}function Xn(e){let t=[],n=e.parentElement;for(;n&&n.tagName.toLowerCase()!=="html";)t.push({tag:n.tagName.toLowerCase(),id:n.id||null,classes:Array.from(n.classList)}),n=n.parentElement;return t}async function zt(e){let t=getComputedStyle(e),n=e.getBoundingClientRect(),o={};Array.from(e.attributes).forEach(i=>{i.name!==Fe&&(o[i.name]=i.value)});let r={};Un.forEach(i=>{r[i]=t.getPropertyValue(i)});let a=e.children.length===0&&(e.textContent||"").trim().slice(0,120)||null;return{tag:e.tagName.toLowerCase(),id:e.id||null,classes:Array.from(e.classList),attributes:o,rect:{x:n.x,y:n.y,width:n.width,height:n.height},box:Fn(t),computedStyles:r,ancestors:Xn(e),childCount:e.children.length,textPreview:a,componentName:jt(e),source:await $t(e)}}function Jn(e){return!!(e!=null&&e.closest(".apd-root"))}function Dt(e,t,n){let o=!0;function r(m){let d=document.elementFromPoint(m.clientX,m.clientY);return Jn(d)?null:d}function s(m){o&&(t==null||t(r(m)))}function a(m){if(!o)return;let d=r(m);d&&(m.preventDefault(),m.stopPropagation(),l(),e(d))}function i(m){m.key==="Escape"&&(l(),n==null||n())}function l(){o=!1,window.removeEventListener("mousemove",s,!0),window.removeEventListener("click",a,!0),window.removeEventListener("keydown",i,!0)}return window.addEventListener("mousemove",s,!0),window.addEventListener("click",a,!0),window.addEventListener("keydown",i,!0),{cancel:()=>{l(),n==null||n()}}}function Ot(){let e=document.createElement("div");e.className="apd-inspect-highlight",e.style.display="none";function t(o){e.style.display="",e.style.left=`${o.left}px`,e.style.top=`${o.top}px`,e.style.width=`${o.width}px`,e.style.height=`${o.height}px`}function n(){e.style.display="none"}return{el:e,show:t,hide:n}}import{jsx as c,jsxs as b}from"react/jsx-runtime";function Ut({data:e}){let t=Object.entries(e).filter(([,n])=>n!=="");return t.length===0?c("div",{className:"apd-empty-body",children:"None"}):c("div",{className:"apd-kv",children:t.map(([n,o])=>b("div",{style:{display:"contents"},children:[c("div",{className:"apd-kv-key",children:n}),c("div",{className:"apd-kv-val",children:o})]},n))})}function Kn({info:e}){let{box:t}=e;return c("div",{className:"apd-box-model",children:b("div",{className:"apd-box-layer apd-box-layer-margin",children:[c("span",{className:"apd-box-label apd-box-label-top",children:t.margin.top}),c("span",{className:"apd-box-label apd-box-label-right",children:t.margin.right}),c("span",{className:"apd-box-label apd-box-label-bottom",children:t.margin.bottom}),c("span",{className:"apd-box-label apd-box-label-left",children:t.margin.left}),b("div",{className:"apd-box-layer apd-box-layer-border",children:[c("span",{className:"apd-box-label apd-box-label-top",children:t.border.top}),c("span",{className:"apd-box-label apd-box-label-right",children:t.border.right}),c("span",{className:"apd-box-label apd-box-label-bottom",children:t.border.bottom}),c("span",{className:"apd-box-label apd-box-label-left",children:t.border.left}),b("div",{className:"apd-box-layer apd-box-layer-padding",children:[c("span",{className:"apd-box-label apd-box-label-top",children:t.padding.top}),c("span",{className:"apd-box-label apd-box-label-right",children:t.padding.right}),c("span",{className:"apd-box-label apd-box-label-bottom",children:t.padding.bottom}),c("span",{className:"apd-box-label apd-box-label-left",children:t.padding.left}),b("div",{className:"apd-box-layer-content",children:[Math.round(t.content.width)," \xD7 ",Math.round(t.content.height)]})]})]})]})})}function Wn({info:e,editorProjectRoot:t}){var i;let{source:n,componentName:o}=e;if(!n)return c("div",{className:"apd-source-card",children:c("div",{className:"apd-source-none",children:"Source location unavailable for this element."})});let r=n.line?`${n.file}:${n.line}${n.column?`:${n.column}`:""}`:n.file,s=!!t,a=s?`vscode://file/${t.replace(/\/$/,"")}/${n.file.replace(/^\//,"")}${n.line?`:${n.line}:${(i=n.column)!=null?i:1}`:""}`:void 0;return b("div",{className:"apd-source-card",children:[o&&b("div",{style:{fontSize:11,color:"var(--apd-text-dim)",marginBottom:4},children:["Component: ",c("strong",{style:{color:"var(--apd-text)"},children:o})]}),s?c("a",{className:"apd-source-path",href:a,title:"Open in VS Code",children:r}):c("span",{className:"apd-source-path apd-source-path-plain",children:r}),b("div",{className:"apd-source-meta",children:[c("span",{className:`apd-confidence-badge apd-confidence-${n.confidence}`,children:n.confidence}),b("span",{children:["via ",n.origin]}),!s&&c("button",{type:"button",className:"apd-console-toggle-stack",onClick:()=>ce(r),style:{marginLeft:"auto"},children:"Copy path"})]})]})}function Ft({onInspectingChange:e,editorProjectRoot:t}){let[n,o]=Xe(!1),[r,s]=Xe(!1),[a,i]=Xe(null),l=_t(null),m=_t(null);Vn(()=>()=>{var p,x;(p=l.current)==null||p.cancel(),(x=m.current)==null||x.el.remove()},[]);function d(){var p,x;(p=m.current)==null||p.hide(),(x=m.current)==null||x.el.remove(),m.current=null}function h(){o(!0),e(!0);let p=Ot();document.body.appendChild(p.el),m.current=p,l.current=Dt(async x=>{d(),o(!1),e(!1),s(!0);let y=await zt(x);i(y),s(!1)},x=>{x?p.show(x.getBoundingClientRect()):p.hide()},()=>{d(),o(!1),e(!1)})}function g(){var p;(p=l.current)==null||p.cancel()}return a?b("div",{className:"apd-inspector-body",children:[b("div",{style:{display:"flex",alignItems:"flex-start",gap:10,marginBottom:12},children:[b("div",{style:{flex:1},children:[b("div",{className:"apd-inspector-tag",children:["<",a.tag,a.id&&b("span",{className:"apd-tag-id",children:[" #",a.id]}),a.classes.map(p=>b("span",{className:"apd-tag-class",children:[" ",".",p]},p)),">"]}),a.textPreview&&b("div",{style:{fontSize:11.5,color:"var(--apd-text-dim)",fontFamily:"var(--apd-mono)"},children:['"',a.textPreview,'"']})]}),c("button",{type:"button",className:"apd-action-btn",onClick:h,children:"\u2316 Inspect another"})]}),a.ancestors.length>0&&b("div",{className:"apd-inspector-breadcrumb",children:[[...a.ancestors].reverse().map((p,x)=>b("span",{children:[p.tag,p.id?`#${p.id}`:""]},x)),c("span",{style:{color:"var(--apd-accent)"},children:a.tag})]}),c(Wn,{info:a,editorProjectRoot:t}),b("div",{className:"apd-meta-grid",children:[b("div",{children:[c("div",{className:"apd-meta-label",children:"Position"}),b("div",{className:"apd-meta-value",children:[Math.round(a.rect.x),", ",Math.round(a.rect.y)]})]}),b("div",{children:[c("div",{className:"apd-meta-label",children:"Size"}),b("div",{className:"apd-meta-value",children:[Math.round(a.rect.width)," \xD7 ",Math.round(a.rect.height)]})]}),b("div",{children:[c("div",{className:"apd-meta-label",children:"Children"}),c("div",{className:"apd-meta-value",children:a.childCount})]})]}),b("div",{className:"apd-section",children:[c("div",{className:"apd-section-header",children:"Box Model"}),c("div",{className:"apd-section-body",children:c(Kn,{info:a})})]}),b("div",{className:"apd-section",children:[b("div",{className:"apd-section-header",children:["Attributes (",Object.keys(a.attributes).length,")"]}),c("div",{className:"apd-section-body",children:c(Ut,{data:a.attributes})})]}),b("div",{className:"apd-section",children:[c("div",{className:"apd-section-header",children:"Computed Styles"}),c("div",{className:"apd-section-body",children:c(Ut,{data:a.computedStyles})})]})]}):b("div",{className:"apd-inspector-empty",children:[c("button",{type:"button",className:`apd-inspect-start-btn${n?" apd-inspecting":""}`,onClick:n?g:h,children:n?"\u25FC Stop Inspecting (Esc)":"\u2316 Start Inspecting"}),c("p",{children:n?"Hover any element on the page and click to select it.":r?"Resolving source location\u2026":"Pick any element on the page to see its DOM details, computed styles, and \u2014 when available \u2014 the exact source file responsible for it."})]})}function Xt(e){return Object.entries(e).map(([t,n])=>({name:t,value:n}))}function Yn(e){return Object.entries(e).map(([t,n])=>({name:t,value:n}))}function Je(e){return{log:{version:"1.2",creator:{name:"next-api-debugger",version:"0.1.0"},entries:e.map(t=>{var n,o;return{startedDateTime:new Date(t.timestamp).toISOString(),time:t.duration,request:{method:t.method,url:t.url,httpVersion:"HTTP/1.1",headers:Xt(t.requestHeaders),queryString:Yn(t.queryParams),cookies:[],headersSize:-1,bodySize:t.requestSize,postData:t.requestBodyRaw?{mimeType:t.requestHeaders["content-type"]||"application/json",text:t.requestBodyRaw}:void 0},response:{status:(n=t.responseStatus)!=null?n:0,statusText:t.responseStatusText,httpVersion:"HTTP/1.1",headers:Xt(t.responseHeaders),cookies:[],content:{size:t.responseSize,mimeType:t.responseHeaders["content-type"]||"application/json",text:(o=t.responseBodyRaw)!=null?o:""},redirectURL:"",headersSize:-1,bodySize:t.responseSize},cache:{},timings:{send:0,wait:t.duration,receive:0}}})}}}function Ve(e,t){let n=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),o=URL.createObjectURL(n),r=document.createElement("a");r.href=o,r.download=e,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(o)}import{Fragment as Ke,jsx as v,jsxs as q}from"react/jsx-runtime";var Zn=["GET","POST","PUT","PATCH","DELETE"],Qn=["log","info","warn","error","debug"];function Vt({logs:e,consoleEntries:t,onClose:n,onClear:o,onClearConsole:r,onTogglePin:s,theme:a,onToggleTheme:i,inspectorEnabled:l,editorProjectRoot:m}){var Ge,Ze,Qe;let[d,h]=ee("network"),[g,p]=ee({search:"",status:"all",methods:[]}),[x,y]=ee(null),[w,P]=ee(!1),[T,k]=ee(""),[R,D]=ee([]);Gn(()=>{!x&&e.length>0&&y(e[0].id)},[e,x]);let H=Jt(()=>{let f=g.search.trim().toLowerCase();return e.filter(E=>{var J;return!(g.status==="success"&&!E.success||g.status==="failed"&&E.success||g.methods.length>0&&!g.methods.includes(E.method)||f&&!`${E.url} ${E.endpoint} ${E.method} ${(J=E.responseStatus)!=null?J:""}`.toLowerCase().includes(f))})},[e,g]),X=Jt(()=>{let f=T.trim().toLowerCase();return t.filter(E=>!(R.length>0&&!R.includes(E.level)||f&&!E.preview.toLowerCase().includes(f)))},[t,T,R]),A=(Ze=(Ge=H.find(f=>f.id===x))!=null?Ge:H[0])!=null?Ze:null,L=e.filter(f=>!f.success).length,Ee=t.filter(f=>f.level==="error").length;function Kt(f){p(E=>({...E,methods:E.methods.includes(f)?E.methods.filter(J=>J!==f):[...E.methods,f]}))}function Wt(f){D(E=>E.includes(f)?E.filter(J=>J!==f):[...E,f])}let Yt=d==="network"?`${e.length} requests${L>0?` \xB7 ${L} failed`:""}`:d==="console"?`${t.length} logs${Ee>0?` \xB7 ${Ee} errors`:""}`:"element picker";return v("div",{className:S("apd-overlay",w&&"apd-overlay-passthrough"),onClick:n,children:q("div",{className:`apd-modal${w?" apd-minimized":""}`,onClick:f=>f.stopPropagation(),children:[q("div",{className:"apd-header",children:[q("div",{className:"apd-header-title",children:[v("span",{className:"apd-live-dot"}),"API Debugger"]}),v("span",{className:"apd-header-count",children:Yt}),v("div",{className:"apd-spacer"}),v("button",{className:"apd-icon-btn",onClick:i,title:"Toggle theme",type:"button",children:a==="light"?"\u2600":"\u263E"}),d==="network"&&q(Ke,{children:[v("button",{className:"apd-icon-btn",title:"Export JSON",type:"button",onClick:()=>Ve(`api-logs-${Date.now()}.json`,e),children:"\u2B73"}),v("button",{className:"apd-icon-btn",title:"Export HAR",type:"button",onClick:()=>Ve(`api-logs-${Date.now()}.har`,Je(e)),children:"HAR"})]}),d!=="inspector"&&v("button",{className:"apd-icon-btn",title:d==="network"?"Clear logs":"Clear console",type:"button",onClick:d==="network"?o:r,children:"\u{1F5D1}"}),v("button",{className:"apd-icon-btn",title:w?"Restore":"Minimize",type:"button",onClick:()=>P(f=>!f),children:w?"\u25A2":"\u2014"}),v("button",{className:"apd-icon-btn",title:"Close",type:"button",onClick:n,children:"\u2715"})]}),!w&&q("div",{className:"apd-tabs",children:[q("button",{type:"button",className:S("apd-tab",d==="network"&&"apd-active"),onClick:()=>h("network"),children:["Network",e.length>0&&v("span",{className:S("apd-tab-badge",L>0&&"apd-tab-badge-error"),children:e.length})]}),q("button",{type:"button",className:S("apd-tab",d==="console"&&"apd-active"),onClick:()=>h("console"),children:["Console",t.length>0&&v("span",{className:S("apd-tab-badge",Ee>0&&"apd-tab-badge-error"),children:t.length})]}),l&&v("button",{type:"button",className:S("apd-tab",d==="inspector"&&"apd-active"),onClick:()=>h("inspector"),children:"Inspector"})]}),!w&&d==="network"&&q(Ke,{children:[q("div",{className:"apd-toolbar",children:[v(ze,{value:g.search,onChange:f=>p(E=>({...E,search:f}))}),v(Nt,{status:g.status,onStatusChange:f=>p(E=>({...E,status:f})),methods:Zn,activeMethods:g.methods,onToggleMethod:Kt})]}),q("div",{className:"apd-body",children:[v(Ct,{logs:H,selectedId:(Qe=A==null?void 0:A.id)!=null?Qe:null,onSelect:y,onTogglePin:s}),v(qt,{log:A,onTogglePin:s})]})]}),!w&&d==="console"&&q(Ke,{children:[q("div",{className:"apd-toolbar",children:[v(ze,{value:T,onChange:k}),Qn.map(f=>v("button",{type:"button",className:S("apd-chip",R.includes(f)&&"apd-active"),onClick:()=>Wt(f),children:f},f))]}),v(At,{entries:X})]}),l&&v("div",{style:{display:!w&&d==="inspector"?"flex":"none",flexDirection:"column",flex:1,overflow:"hidden"},children:v(Ft,{onInspectingChange:P,editorProjectRoot:m})}),!w&&q("div",{className:"apd-footer",children:[q("span",{children:[v("span",{className:"apd-kbd",children:"Ctrl"}),"+",v("span",{className:"apd-kbd",children:"Shift"}),"+",v("span",{className:"apd-kbd",children:"D"})," to toggle \xB7 ",v("span",{className:"apd-kbd",children:"Space"}),"+",v("span",{className:"apd-kbd",children:"H"})," to hide"]}),v("span",{style:{marginLeft:"auto"},children:"next-api-debugger \xB7 dev only"})]})]})})}import{jsx as Ye,jsxs as oo}from"react/jsx-runtime";function to(e){return typeof e=="boolean"?e:process.env.NODE_ENV!=="production"}function no(e){let{enabled:t,maxLogs:n=200,initialPosition:o,axiosInstance:r,theme:s="dark",keyboardShortcut:a=!0,ignoreUrls:i,inspector:l=!0,editorProjectRoot:m}=e,d=to(t),[h,g]=We(!1),[p,x]=We(!1),[y,w]=We(s),{logs:P,clear:T,togglePin:k}=lt(),{entries:R,clear:D}=ct();if(eo(()=>{if(!d||typeof window=="undefined")return;C.setMaxLogs(n),B.setMaxEntries(500),Ce({ignoreUrls:i}),et({ignoreUrls:i}),rt(),l&&st();let L=r?Pe(r,{ignoreUrls:i}):()=>{};return()=>{Re(),tt(),at(),l&&it(),L()}},[d,l]),ut({ctrl:!0,shift:!0,key:"d"},()=>g(L=>!L),d&&a),ft(["space","h"],()=>{x(L=>!L),g(!1)},d&&a),!d)return null;let H=P.filter(L=>!L.success).length,X=R.filter(L=>L.level==="error").length,A=y==="system"?"dark":y;return oo("div",{className:`apd-root${A==="light"?" apd-light":""}`,children:[Ye(bt,{}),!p&&!h&&Ye(Et,{count:P.length+R.length,hasErrors:H>0||X>0,onOpen:()=>g(!0),initialPosition:o}),!p&&h&&Ye(Vt,{logs:P,consoleEntries:R,onClose:()=>g(!1),onClear:T,onClearConsole:D,onTogglePin:k,theme:A,onToggleTheme:()=>w(A==="light"?"dark":"light"),inspectorEnabled:l,editorProjectRoot:m})]})}export{no as ApiDebugger,Je as exportAsHar,_e as generateCurl,Pe as installAxiosInterceptor,Ce as installFetchInterceptor,C as logStore,Re as uninstallFetchInterceptor};
//# sourceMappingURL=index.mjs.map