'use client';
import{useEffect as ln,useState as ot}from"react";var Te=class{constructor(){this.logs=[];this.listeners=new Set;this.maxLogs=200;this.snapshot=[];this.getLogs=()=>(this.snapshot=this.logs,this.snapshot);this.subscribe=t=>(this.listeners.add(t),()=>this.listeners.delete(t))}setMaxLogs(t){this.maxLogs=Math.max(1,t),this.trim()}addLog(t){this.logs=[t,...this.logs],this.trim(),this.emit()}togglePin(t){this.logs=this.logs.map(n=>n.id===t?{...n,pinned:!n.pinned}:n),this.emit()}clear(){this.logs=[],this.emit()}trim(){if(this.logs.length<=this.maxLogs)return;let t=this.logs.filter(s=>s.pinned),o=this.logs.filter(s=>!s.pinned).slice(0,Math.max(0,this.maxLogs-t.length)),r=[...t,...o];r.sort((s,a)=>a.timestamp-s.timestamp),this.logs=r}emit(){this.listeners.forEach(t=>t())}},N=new Te;var He=class{constructor(){this.entries=[];this.listeners=new Set;this.maxEntries=500;this.getEntries=()=>this.entries;this.subscribe=t=>(this.listeners.add(t),()=>this.listeners.delete(t))}setMaxEntries(t){this.maxEntries=Math.max(1,t),this.trim()}addEntry(t){let n=this.entries[0];n&&n.level===t.level&&n.preview===t.preview&&n.stack===t.stack?this.entries=[{...n,count:n.count+1,timestamp:t.timestamp},...this.entries.slice(1)]:this.entries=[t,...this.entries],this.trim(),this.emit()}clear(){this.entries=[],this.emit()}trim(){this.entries.length>this.maxEntries&&(this.entries=this.entries.slice(0,this.maxEntries))}emit(){this.listeners.forEach(t=>t())}},q=new He;var j="x-apd-skip";function O(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,9)}`}function U(e){if(!e)return null;try{return JSON.parse(e)}catch{return e}}function Y(e){if(e==null)return null;if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return String(e)}}function _(e){if(!e)return 0;try{return new Blob([e]).size}catch{return e.length}}function Ae(e){if(!e)return"0 B";let t=["B","KB","MB","GB"],n=Math.min(t.length-1,Math.floor(Math.log(e)/Math.log(1024))),o=e/Math.pow(1024,n);return`${n===0?o:o.toFixed(1)} ${t[n]}`}function me(e){return e<1e3?`${e} ms`:`${(e/1e3).toFixed(2)} s`}function G(e){let t=new Date(e);return t.toLocaleTimeString(void 0,{hour12:!1})+`.${String(t.getMilliseconds()).padStart(3,"0")}`}function Z(e){try{let t=typeof window!="undefined"?window.location.origin:"http://localhost",n=new URL(e,t),o={};return n.searchParams.forEach((r,s)=>{o[s]=r}),{endpoint:n.pathname,queryParams:o}}catch{return{endpoint:e,queryParams:{}}}}function fe(e){let t={};return e&&e.forEach((n,o)=>{t[o]=n}),t}function re(e){let t={};if(!e)return t;if(typeof e.toJSON=="function")return{...e.toJSON()};if(e instanceof Headers)return fe(e);if(typeof e=="object")for(let[n,o]of Object.entries(e))o!=null&&(t[n]=String(o));return t}function Q(e,t){return!t||t.length===0?!1:t.some(n=>n instanceof RegExp?n.test(e):e.includes(n))}function S(...e){return e.filter(Boolean).join(" ")}async function ge(e){try{if(navigator.clipboard&&window.isSecureContext)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select();let n=document.execCommand("copy");return document.body.removeChild(t),n}catch{return!1}}var F=null,he=!1;function fn(e){if(e==null)return null;if(typeof e=="string")return e;if(e instanceof URLSearchParams)return e.toString();if(e instanceof FormData){let t=[];return e.forEach((n,o)=>{t.push(`${o}=${n instanceof File?`[File: ${n.name}]`:n}`)}),t.join("&")}return"[binary data]"}function Me(e={}){he||typeof window=="undefined"||typeof window.fetch!="function"||(F=window.fetch.bind(window),he=!0,window.fetch=async function(n,o){var E,c,g,R,C;let r=n instanceof Request?n:null,s=r?r.url:String(n);if(Q(s,e.ignoreUrls))return F(n,o);let a=fe(new Headers((c=(E=o==null?void 0:o.headers)!=null?E:r==null?void 0:r.headers)!=null?c:void 0));if(a[j]){let w=new Headers((R=(g=o==null?void 0:o.headers)!=null?g:r==null?void 0:r.headers)!=null?R:void 0);return w.delete(j),r?F(new Request(r,{headers:w})):F(n,{...o,headers:w})}let i=Date.now(),p=performance.now(),l=((o==null?void 0:o.method)||(r==null?void 0:r.method)||"GET").toUpperCase(),{endpoint:d,queryParams:m}=Z(s),h=fn((C=o==null?void 0:o.body)!=null?C:null),v={id:O(),url:s,endpoint:d,method:l,requestHeaders:a,requestBody:U(h),requestBodyRaw:h,queryParams:m,timestamp:i,source:"fetch",requestSize:_(h),pinned:!1};try{let w=await F(n,o),A=Math.round(performance.now()-p),z=w.clone(),P=null;try{P=await z.text()}catch{P=null}return N.addLog({...v,duration:A,responseStatus:w.status,responseStatusText:w.statusText,responseHeaders:fe(w.headers),responseBody:U(P),responseBodyRaw:P,responseSize:_(P),success:w.ok,error:w.ok?null:`HTTP ${w.status} ${w.statusText}`}),w}catch(w){let A=Math.round(performance.now()-p);throw N.addLog({...v,duration:A,responseStatus:null,responseStatusText:"",responseHeaders:{},responseBody:null,responseBodyRaw:null,responseSize:0,success:!1,error:(w==null?void 0:w.message)||"Network error"}),w}})}function Ie(){he&&F&&typeof window!="undefined"&&(window.fetch=F),he=!1,F=null}var ae=null,te=null,se=null,be=!1,ee=Symbol("apd-xhr-meta");function gn(e){let t={};return e.trim().split(/[\r\n]+/).forEach(n=>{let o=n.indexOf(":");if(o===-1)return;let r=n.slice(0,o).trim().toLowerCase(),s=n.slice(o+1).trim();r&&(t[r]=s)}),t}function dt(e={}){be||typeof window=="undefined"||typeof XMLHttpRequest=="undefined"||(ae=XMLHttpRequest.prototype.open,te=XMLHttpRequest.prototype.send,se=XMLHttpRequest.prototype.setRequestHeader,be=!0,XMLHttpRequest.prototype.open=function(n,o,...r){let s=String(o);return this[ee]={id:O(),method:(n||"GET").toUpperCase(),url:s,startTime:0,startPerf:0,requestHeaders:{},ignored:Q(s,e.ignoreUrls)},ae.apply(this,[n,o,...r])},XMLHttpRequest.prototype.setRequestHeader=function(n,o){if(n.toLowerCase()===j){this[ee]&&(this[ee].ignored=!0);return}return this[ee]&&(this[ee].requestHeaders[n]=o),se.apply(this,[n,o])},XMLHttpRequest.prototype.send=function(n){let o=this[ee];if(!o||o.ignored)return te.apply(this,[n]);o.startTime=Date.now(),o.startPerf=performance.now();let r=n==null?null:typeof n=="string"?n:n instanceof URLSearchParams?n.toString():n instanceof FormData?"[form data]":"[binary data]",s=()=>{let a=Math.round(performance.now()-o.startPerf),{endpoint:i,queryParams:p}=Z(o.url),l=gn(this.getAllResponseHeaders()||""),d=null;try{d=typeof this.responseText=="string"?this.responseText:null}catch{d=null}let m=this.status,h=m>=200&&m<400,v={id:o.id,url:o.url,endpoint:i,method:o.method,requestHeaders:o.requestHeaders,requestBody:U(r),requestBodyRaw:r,queryParams:p,responseStatus:m||null,responseStatusText:this.statusText||"",responseHeaders:l,responseBody:U(d),responseBodyRaw:d,duration:a,timestamp:o.startTime,success:h,error:h?null:m===0?"Network error":`HTTP ${m} ${this.statusText}`,source:"xhr",requestSize:_(r),responseSize:_(d),pinned:!1};N.addLog(v),this.removeEventListener("loadend",s)};return this.addEventListener("loadend",s),te.apply(this,[n])})}function pt(){be&&typeof window!="undefined"&&typeof XMLHttpRequest!="undefined"&&(ae&&(XMLHttpRequest.prototype.open=ae),te&&(XMLHttpRequest.prototype.send=te),se&&(XMLHttpRequest.prototype.setRequestHeader=se)),be=!1,ae=null,te=null,se=null}function hn(e){let t=(e==null?void 0:e.baseURL)||"",n=(e==null?void 0:e.url)||"",o=/^https?:\/\//i.test(n)?n:`${t}${t&&!t.endsWith("/")&&!n.startsWith("/")?"/":""}${n}`;if(e!=null&&e.params&&typeof e.params=="object"){let r=bn(e.params);r&&(o+=(o.includes("?")?"&":"?")+r)}return o}function bn(e){let t=new URLSearchParams;for(let[n,o]of Object.entries(e))o!=null&&(Array.isArray(o)?o.forEach(r=>t.append(n,String(r))):t.append(n,String(o)));return t.toString()}function lt(e){if(e==null)return null;if(typeof e=="string")return e;if(typeof URLSearchParams!="undefined"&&e instanceof URLSearchParams)return e.toString();if(typeof FormData!="undefined"&&e instanceof FormData){let t=[];return e.forEach((n,o)=>{t.push(`${o}=${n instanceof File?`[File: ${n.name}]`:n}`)}),t.join("&")}return Y(e)}function qe(e,t={}){var s;if(!e||!e.interceptors||typeof((s=e.interceptors.request)==null?void 0:s.use)!="function")return()=>{};if(e.__apiDebuggerInstalled)return()=>{};e.__apiDebuggerInstalled=!0;let n=e.interceptors.request.use(a=>{let i={id:O(),startTime:Date.now(),startPerf:performance.now(),requestBodyRaw:lt(a.data),requestHeadersSnapshot:re(a.headers)};return a.__apdMeta=i,a.headers&&typeof a.headers.set=="function"?a.headers.set(j,"1"):a.headers={...a.headers||{},[j]:"1"},a});function o(a,i,p){var A,z,P,K,$,B;if(!a)return;let l=hn(a);if(Q(l,t.ignoreUrls))return;let d=a.__apdMeta||{id:O(),startTime:Date.now(),startPerf:performance.now(),requestBodyRaw:lt(a.data),requestHeadersSnapshot:re(a.headers)},m=Math.round(performance.now()-d.startPerf),{endpoint:h,queryParams:v}=Z(l),E=re(a.headers),c=Object.keys(E).length>0?E:d.requestHeadersSnapshot;delete c[j];let g=d.requestBodyRaw,R=(i==null?void 0:i.data)!==void 0?Y(i.data):null,C=(P=(z=i==null?void 0:i.status)!=null?z:(A=p==null?void 0:p.response)==null?void 0:A.status)!=null?P:null,w={id:d.id,url:l,endpoint:h,method:(a.method||"get").toUpperCase(),requestHeaders:c,requestBody:(K=U(g))!=null?K:g,requestBodyRaw:g,queryParams:v,responseStatus:C,responseStatusText:($=i==null?void 0:i.statusText)!=null?$:"",responseHeaders:re(i==null?void 0:i.headers),responseBody:(B=i==null?void 0:i.data)!=null?B:null,responseBodyRaw:R,duration:m,timestamp:d.startTime,success:!p&&!!C&&C<400,error:p?p.message||"Request failed":null,source:"axios",requestSize:_(g),responseSize:_(R),pinned:!1};N.addLog(w)}let r=e.interceptors.response.use(a=>(o(a.config,a),a),a=>(o(a==null?void 0:a.config,a==null?void 0:a.response,a),Promise.reject(a)));return()=>{e.interceptors.request.eject(n),e.interceptors.response.eject(r),e.__apiDebuggerInstalled=!1}}var ct=["log","info","warn","error","debug"],ze={},ie=null,de=null,Be=!1;function xn(e,t=new WeakSet){var n;if(e===null)return"null";if(e===void 0)return"undefined";if(typeof e=="string")return e;if(typeof e=="number"||typeof e=="boolean")return String(e);if(e instanceof Error)return`${e.name}: ${e.message}`;if(typeof e=="function")return e.name?`\u0192 ${e.name}()`:"\u0192 ()";if(typeof e=="object"){if(t.has(e))return"[Circular]";t.add(e);try{return(n=JSON.stringify(e,(o,r)=>typeof r=="bigint"?r.toString():r,2))!=null?n:String(e)}catch{return Array.isArray(e)?"[Array]":"[Object]"}}return String(e)}function vn(e){for(let t of e)if(t instanceof Error&&t.stack)return t.stack;return null}function De(e,t,n){let o=t.map(r=>xn(r));return{id:O(),level:e,parts:o,preview:o.join(" "),stack:vn(t),timestamp:Date.now(),source:n,count:1}}function ut(e={}){var n,o;if(Be||typeof window=="undefined"||typeof console=="undefined")return;Be=!0;let t=(n=e.levels)!=null?n:ct;for(let r of t){let s=(o=console[r])==null?void 0:o.bind(console);s&&(ze[r]=s,console[r]=(...a)=>{q.addEntry(De(r,a,"console")),s(...a)})}ie=r=>{let s=r.error?[r.error]:[r.message],a=De("error",s,"window.onerror");q.addEntry({...a,preview:a.preview||`${r.message} (${r.filename}:${r.lineno}:${r.colno})`})},window.addEventListener("error",ie),de=r=>{let s=r.reason,a=De("error",[s],"unhandledrejection");q.addEntry({...a,preview:`Unhandled promise rejection: ${a.preview}`})},window.addEventListener("unhandledrejection",de)}function mt(){if(typeof console!="undefined")for(let e of ct){let t=ze[e];t&&(console[e]=t)}typeof window!="undefined"&&(ie&&window.removeEventListener("error",ie),de&&window.removeEventListener("unhandledrejection",de)),ze={},ie=null,de=null,Be=!1}var $e=new WeakMap,pe=null,le=null,je=!1;function ft(){je||typeof document=="undefined"||(je=!0,pe=document.createElement.bind(document),le=document.createElementNS.bind(document),document.createElement=function(t,n){let o=pe(t,n);return $e.set(o,new Error),o},document.createElementNS=function(t,n,o){let r=le(t,n,o);return $e.set(r,new Error),r})}function gt(){pe&&(document.createElement=pe),le&&(document.createElementNS=le),je=!1,pe=null,le=null}function ht(e){return $e.get(e)}function bt(e){let t;try{t=new URL(e,window.location.href)}catch{return()=>{}}if(t.origin!==window.location.origin)return()=>{};let n=new Set,o=new AbortController,r=!1;async function s(){if(!r){r=!0;try{let i=await fetch(t.toString(),{cache:"no-store",credentials:"same-origin",signal:o.signal});if(!i.ok)return;let p=await i.json();if(o.signal.aborted||!Array.isArray(p))return;for(let l of p.slice().reverse()){if(!l||typeof l!="object")continue;let d=l;d.source!=="server-fetch"||typeof d.id!="string"||n.has(d.id)||(n.add(d.id),N.addLog(d))}if(n.size>1e3){let l=n.values();for(;n.size>500;){let d=l.next();if(d.done)break;n.delete(d.value)}}}catch{}finally{r=!1}}}s();let a=window.setInterval(()=>{s()},2e3);return()=>{window.clearInterval(a),o.abort()}}import{useCallback as xt,useSyncExternalStore as yn}from"react";function vt(){let e=yn(N.subscribe,N.getLogs,N.getLogs),t=xt(()=>N.clear(),[]),n=xt(o=>N.togglePin(o),[]);return{logs:e,clear:t,togglePin:n}}import{useCallback as wn,useSyncExternalStore as kn}from"react";function yt(){let e=kn(q.subscribe,q.getEntries,q.getEntries),t=wn(()=>q.clear(),[]);return{entries:e,clear:t}}import{useEffect as En}from"react";function wt(e,t,n=!0){En(()=>{if(!n||typeof window=="undefined")return;function o(r){let s=!e.ctrl||r.ctrlKey||r.metaKey,a=!e.shift||r.shiftKey;s&&a&&r.key.toLowerCase()===e.key.toLowerCase()&&(r.preventDefault(),t())}return window.addEventListener("keydown",o),()=>window.removeEventListener("keydown",o)},[e.ctrl,e.shift,e.key,t,n])}import{useEffect as Sn,useRef as Ln}from"react";function Oe(e){return e===" "?"space":e.toLowerCase()}function Nn(e){var o;let t=e;if(!t)return!1;let n=(o=t.tagName)==null?void 0:o.toLowerCase();return n==="input"||n==="textarea"||n==="select"||t.isContentEditable}function kt(e,t){if(typeof window=="undefined")return()=>{};let n=e.map(Oe),o=new Set;function r(i){if(Nn(i.target))return;let p=Oe(i.key),l=o.has(p);o.add(p),!l&&n.every(d=>o.has(d))&&(i.preventDefault(),t())}function s(i){o.delete(Oe(i.key))}function a(){o.clear()}return window.addEventListener("keydown",r),window.addEventListener("keyup",s),window.addEventListener("blur",a),()=>{window.removeEventListener("keydown",r),window.removeEventListener("keyup",s),window.removeEventListener("blur",a)}}function Et(e,t,n=!0){let o=Ln(t);o.current=t,Sn(()=>{if(n)return kt(e,()=>o.current())},[e.join(","),n])}import{useEffect as Cn}from"react";var Nt=`
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
`;var St="next-api-debugger-styles";function Lt(){return Cn(()=>{if(typeof document=="undefined"||document.getElementById(St))return;let e=document.createElement("style");e.id=St,e.textContent=Nt,document.head.appendChild(e)},[]),null}import{useCallback as xe,useEffect as Ct,useRef as _e,useState as Rn}from"react";var Rt="apd-button-position",ye=56,Pt=5;function ve(e){return typeof window=="undefined"?e:{x:Math.min(Math.max(8,e.x),window.innerWidth-ye-8),y:Math.min(Math.max(8,e.y),window.innerHeight-ye-8)}}function Pn(){return typeof window=="undefined"?{x:24,y:24}:{x:window.innerWidth-ye-24,y:window.innerHeight-ye-24}}function Tt(e){let[t,n]=Rn(()=>{if(typeof window=="undefined")return e!=null?e:{x:24,y:24};try{let d=sessionStorage.getItem(Rt);if(d)return ve(JSON.parse(d))}catch{}return ve(e!=null?e:Pn())}),o=_e(!1),r=_e(!1),s=_e({pointerX:0,pointerY:0,posX:0,posY:0}),a=xe(d=>{o.current=!0,r.current=!1,s.current={pointerX:d.clientX,pointerY:d.clientY,posX:t.x,posY:t.y},d.currentTarget.setPointerCapture(d.pointerId)},[t.x,t.y]),i=xe(d=>{if(!o.current)return;let m=d.clientX-s.current.pointerX,h=d.clientY-s.current.pointerY;(Math.abs(m)>Pt||Math.abs(h)>Pt)&&(r.current=!0),n(ve({x:s.current.posX+m,y:s.current.posY+h}))},[]),p=xe(()=>{o.current=!1},[]);Ct(()=>{try{sessionStorage.setItem(Rt,JSON.stringify(t))}catch{}},[t]),Ct(()=>{function d(){n(m=>ve(m))}return window.addEventListener("resize",d),()=>window.removeEventListener("resize",d)},[]);let l=xe(()=>r.current,[]);return{position:t,onPointerDown:a,onPointerMove:i,onPointerUp:p,wasDragged:l}}import{jsx as Ue,jsxs as Ht}from"react/jsx-runtime";function At({count:e,hasErrors:t,onOpen:n,initialPosition:o}){let{position:r,onPointerDown:s,onPointerMove:a,onPointerUp:i,wasDragged:p}=Tt(o);return Ht("button",{type:"button",className:"apd-btn",style:{left:r.x,top:r.y},onPointerDown:s,onPointerMove:a,onPointerUp:i,onClick:()=>{p()||n()},"aria-label":"Open API debugger",title:"API Debugger (drag to move)",children:[Ht("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[Ue("polyline",{points:"16 18 22 12 16 6"}),Ue("polyline",{points:"8 6 2 12 8 18"})]}),e>0&&Ue("span",{className:S("apd-btn-dot",t&&"apd-has-errors"),children:e>99?"99+":e})]})}import{useEffect as No,useMemo as dn,useState as oe}from"react";import{jsx as Fe,jsxs as Mt}from"react/jsx-runtime";function Xe({value:e,onChange:t}){return Mt("div",{className:"apd-search",children:[Mt("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[Fe("circle",{cx:"11",cy:"11",r:"7"}),Fe("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]}),Fe("input",{type:"text",placeholder:"Filter by URL, endpoint, method or status code...",value:e,onChange:n=>t(n.target.value),spellCheck:!1})]})}import{Fragment as Tn,jsx as Ve,jsxs as Hn}from"react/jsx-runtime";function It({status:e,onStatusChange:t,methods:n,activeMethods:o,onToggleMethod:r}){return Hn(Tn,{children:[Ve("button",{type:"button",className:S("apd-chip apd-chip-success",e==="success"&&"apd-active"),onClick:()=>t(e==="success"?"all":"success"),children:"Success"}),Ve("button",{type:"button",className:S("apd-chip apd-chip-failed",e==="failed"&&"apd-active"),onClick:()=>t(e==="failed"?"all":"failed"),children:"Failed"}),n.map(s=>Ve("button",{type:"button",className:S("apd-chip",o.includes(s)&&"apd-active"),onClick:()=>r(s),children:s},s))]})}import{jsx as X,jsxs as Je}from"react/jsx-runtime";function An(e){return["GET","POST","PUT","PATCH","DELETE"].includes(e.toUpperCase())?`apd-method-${e.toUpperCase()}`:"apd-method-OTHER"}function qt({log:e,selected:t,onSelect:n,onTogglePin:o}){var r;return Je("div",{className:S("apd-item",t&&"apd-selected"),onClick:n,role:"button",tabIndex:0,onKeyDown:s=>s.key==="Enter"&&n(),children:[Je("div",{className:"apd-item-row1",children:[X("span",{className:S("apd-method",An(e.method)),children:e.method}),X("span",{className:"apd-item-url",title:e.url,children:e.endpoint}),X("span",{className:S("apd-status-dot",e.success?"apd-ok":"apd-fail")}),e.pinned&&X("button",{type:"button",className:"apd-pin-star",onClick:s=>{s.stopPropagation(),o()},title:"Unpin","aria-label":"Unpin request",style:{background:"none",border:"none",cursor:"pointer",padding:0},children:"\u2605"})]}),Je("div",{className:"apd-item-row2",children:[X("span",{children:(r=e.responseStatus)!=null?r:e.error?"ERR":"\u2014"}),X("span",{children:me(e.duration)}),X("span",{children:G(e.timestamp)}),X("span",{style:{marginLeft:"auto",textTransform:"uppercase"},children:e.source})]})]})}import{jsx as we,jsxs as Mn}from"react/jsx-runtime";function Dt({logs:e,selectedId:t,onSelect:n,onTogglePin:o}){return e.length===0?we("div",{className:"apd-list",children:Mn("div",{className:"apd-empty",children:["No requests captured yet.",we("br",{}),"Make an API call and it'll show up here."]})}):we("div",{className:"apd-list",children:e.map(r=>we(qt,{log:r,selected:r.id===t,onSelect:()=>n(r.id),onTogglePin:()=>o(r.id)},r.id))})}import{Fragment as _n,useState as Un}from"react";import{useState as In}from"react";import{jsxs as qn}from"react/jsx-runtime";function ke({getText:e,label:t,icon:n}){let[o,r]=In(!1);async function s(){await ge(e())&&(r(!0),setTimeout(()=>r(!1),1200))}return qn("button",{type:"button",className:S("apd-action-btn",o&&"apd-copied"),onClick:s,children:[n,o?"Copied":t]})}import{useEffect as $t,useMemo as jn,useRef as jt,useState as Ot}from"react";var Dn=/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(\.\d+)?([eE][+-]?\d+)?)/g;function zn(e){return e.replace(Dn,t=>{let n="apd-json-num";return/^"/.test(t)?n=/:$/.test(t)?"apd-json-key":"apd-json-str":/true|false/.test(t)?n="apd-json-bool":/null/.test(t)&&(n="apd-json-null"),`<span class="${n}">${t}</span>`})}function Bn(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function $n(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function zt(e,t){if(e!=null&&typeof e=="object")return{content:JSON.stringify(e,null,2),isJson:!0};if(typeof e=="string")try{return{content:JSON.stringify(JSON.parse(e),null,2),isJson:!0}}catch{return{content:t!=null?t:e,isJson:!1}}return{content:t!=null?t:String(e!=null?e:""),isJson:!1}}function Bt(e,t,n){let o=Bn(e),r=0,s=o;if(n){let i=new RegExp($n(n),"gi");s=o.replace(i,p=>(r+=1,`<mark class='apd-json-highlight'>${p}</mark>`))}return{html:t?zn(s):s,matchCount:r}}import{jsx as J,jsxs as Ee}from"react/jsx-runtime";function Ne({value:e,raw:t,searchable:n=!0}){let[o,r]=Ot(""),[s,a]=Ot(0),i=jt(null),p=jt(""),{content:l,isJson:d}=zt(e,t),m=o.trim(),{html:h,matchCount:v}=jn(()=>Bt(l,d,m),[l,d,m]);$t(()=>{let c=m!==p.current;p.current=m,(c||s>=v)&&a(0)},[m,v]),$t(()=>{var g;if(!i.current)return;let c=i.current.querySelectorAll("mark.apd-json-highlight");c.forEach((R,C)=>R.classList.toggle("apd-active",C===s)),(g=c[s])==null||g.scrollIntoView({block:"center",behavior:"smooth"})},[h,s]);function E(c){v!==0&&a(g=>(g+c+v)%v)}return Ee("div",{children:[n&&l.length>0&&Ee("div",{className:"apd-json-search",children:[Ee("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[J("circle",{cx:"11",cy:"11",r:"7"}),J("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]}),J("input",{type:"text",placeholder:"Find in payload...",value:o,onChange:c=>r(c.target.value),onKeyDown:c=>{c.key==="Enter"&&(c.preventDefault(),E(c.shiftKey?-1:1))},spellCheck:!1}),o&&J("span",{className:"apd-json-search-count",children:v>0?`${s+1} / ${v}`:"No matches"}),o&&v>0&&Ee("div",{className:"apd-json-search-nav",children:[J("button",{type:"button",onClick:()=>E(-1),"aria-label":"Previous match",title:"Previous match (Shift+Enter)",children:"\u2191"}),J("button",{type:"button",onClick:()=>E(1),"aria-label":"Next match",title:"Next match (Enter)",children:"\u2193"})]})]}),J("pre",{ref:i,className:"apd-json",dangerouslySetInnerHTML:{__html:h}})]})}function Se(e){return`'${e.replace(/'/g,"'\\''")}'`}function On(e){let t=e.trim();if(!t||!(t.startsWith("{")||t.startsWith("[")))return!1;try{return JSON.parse(t),!0}catch{return!1}}function Ke(e){let t=[`curl -X ${e.method} ${Se(e.url)}`],n=Object.keys(e.requestHeaders).some(o=>o.toLowerCase()==="content-type");for(let[o,r]of Object.entries(e.requestHeaders))/^(host|content-length|connection)$/i.test(o)||t.push(`  -H ${Se(`${o}: ${r}`)}`);return e.requestBodyRaw&&(!n&&On(e.requestBodyRaw)&&t.push(`  -H ${Se("Content-Type: application/json")}`),t.push(`  --data-raw ${Se(e.requestBodyRaw)}`)),t.join(` \\
`)}import{jsx as f,jsxs as L}from"react/jsx-runtime";function ne({title:e,count:t,defaultOpen:n=!0,children:o}){let[r,s]=Un(n);return L("div",{className:"apd-section",children:[L("div",{className:"apd-section-header",onClick:()=>s(a=>!a),children:[L("span",{children:[e,typeof t=="number"?` (${t})`:""]}),f("span",{children:r?"\u2212":"+"})]}),r&&f("div",{className:"apd-section-body",children:o})]})}function We({data:e}){let t=Object.entries(e);return t.length===0?f("div",{className:"apd-section-body apd-empty-body",children:"None"}):f("div",{className:"apd-kv",children:t.map(([n,o])=>L(_n,{children:[f("div",{className:"apd-kv-key",children:n}),f("div",{className:"apd-kv-val",children:o})]},n))})}function _t({log:e,onTogglePin:t}){var s,a,i,p,l;if(!e)return f("div",{className:"apd-detail",children:f("div",{className:"apd-detail-empty",children:"Select a request to see full details"})});let n=Ke(e),o=(a=(s=Y(e.requestBody))!=null?s:e.requestBodyRaw)!=null?a:"",r=(p=(i=Y(e.responseBody))!=null?i:e.responseBodyRaw)!=null?p:"";return L("div",{className:"apd-detail",children:[L("div",{className:"apd-detail-header",children:[L("div",{className:"apd-detail-url",children:[f("strong",{children:e.method})," ",e.url]}),f("button",{type:"button",className:"apd-action-btn",onClick:()=>t(e.id),title:e.pinned?"Unpin":"Pin this request",children:e.pinned?"\u2605 Pinned":"\u2606 Pin"})]}),L("div",{className:"apd-meta-grid",children:[L("div",{children:[f("div",{className:"apd-meta-label",children:"Status"}),L("div",{className:"apd-meta-value",style:{color:e.success?"var(--apd-success)":"var(--apd-error)"},children:[(l=e.responseStatus)!=null?l:"Failed"," ",e.responseStatusText]})]}),L("div",{children:[f("div",{className:"apd-meta-label",children:"Duration"}),f("div",{className:"apd-meta-value",children:me(e.duration)})]}),L("div",{children:[f("div",{className:"apd-meta-label",children:"Time"}),f("div",{className:"apd-meta-value",children:G(e.timestamp)})]}),L("div",{children:[f("div",{className:"apd-meta-label",children:"Source"}),f("div",{className:"apd-meta-value",children:e.source})]}),L("div",{children:[f("div",{className:"apd-meta-label",children:"Req. size"}),f("div",{className:"apd-meta-value",children:Ae(e.requestSize)})]}),L("div",{children:[f("div",{className:"apd-meta-label",children:"Res. size"}),f("div",{className:"apd-meta-value",children:Ae(e.responseSize)})]})]}),e.error&&L("div",{className:"apd-section",style:{borderColor:"var(--apd-error)"},children:[f("div",{className:"apd-section-header",style:{color:"var(--apd-error)"},children:"Error"}),f("div",{className:"apd-section-body",children:e.error})]}),L("div",{className:"apd-actions",children:[f(ke,{label:"Copy cURL",getText:()=>n}),f(ke,{label:"Copy Request",getText:()=>o}),f(ke,{label:"Copy Response",getText:()=>r})]}),f(ne,{title:"cURL",children:f(Ne,{value:n,searchable:!1})}),f(ne,{title:"Query Params",count:Object.keys(e.queryParams).length,defaultOpen:!1,children:f(We,{data:e.queryParams})}),f(ne,{title:"Request Headers",count:Object.keys(e.requestHeaders).length,defaultOpen:!1,children:f(We,{data:e.requestHeaders})}),f(ne,{title:"Request Body",children:e.requestBodyRaw?f(Ne,{value:e.requestBody,raw:e.requestBodyRaw}):f("div",{className:"apd-empty-body",children:"No body"})}),f(ne,{title:"Response Headers",count:Object.keys(e.responseHeaders).length,defaultOpen:!1,children:f(We,{data:e.responseHeaders})}),f(ne,{title:"Response Body",children:e.responseBodyRaw?f(Ne,{value:e.responseBody,raw:e.responseBodyRaw}):f("div",{className:"apd-empty-body",children:"No body"})})]})}import{useState as Fn}from"react";import{jsx as D,jsxs as Le}from"react/jsx-runtime";var Xn={log:"\u25B8",info:"\u2139",warn:"\u26A0",error:"\u2715",debug:"\u2699"};function Vn({entry:e}){var o;let[t,n]=Fn(!1);return Le("div",{className:`apd-console-item apd-console-${e.level}`,children:[D("span",{className:"apd-console-icon",children:(o=Xn[e.level])!=null?o:"\u25B8"}),Le("div",{className:"apd-console-body",children:[D("div",{className:"apd-console-preview",children:e.preview||"(empty)"}),Le("div",{className:"apd-console-meta",children:[D("span",{children:G(e.timestamp)}),e.source!=="console"&&D("span",{children:e.source}),e.stack&&D("button",{type:"button",className:"apd-console-toggle-stack",onClick:()=>n(r=>!r),children:t?"Hide stack trace":"Show stack trace"})]}),t&&e.stack&&D("div",{className:"apd-console-stack",children:e.stack})]}),e.count>1&&D("span",{className:"apd-console-count",children:e.count})]})}function Ut({entries:e}){return e.length===0?D("div",{className:"apd-console-list",children:Le("div",{className:"apd-empty",children:["Nothing logged yet.",D("br",{}),"console.log/warn/error and uncaught errors will show up here."]})}):D("div",{className:"apd-console-list",children:e.map(t=>D(Vn,{entry:t},t.id))})}import{useEffect as yo,useRef as on,useState as Pe}from"react";var ue="data-apd-source";function Jn(e){let t=e.getAttribute(ue);if(!t)return null;let n=t.match(/^(.*):(\d+):(\d+)$/);return n?{file:n[1],line:Number(n[2]),column:Number(n[3]),confidence:"exact",origin:"build-plugin"}:{file:t,confidence:"exact",origin:"build-plugin"}}function Ye(e){let t=Object.keys(e).find(n=>n.startsWith("__reactFiber$")||n.startsWith("__reactInternalInstance$"));return t?e[t]:null}function Kn(e){let t=Ye(e);for(;t;){let n=t._debugSource;if(n&&n.fileName)return{file:n.fileName,line:typeof n.lineNumber=="number"?n.lineNumber:void 0,column:typeof n.columnNumber=="number"?n.columnNumber:void 0,confidence:"exact",origin:"react"};t=t.return}return null}function Wn(e){let t=Ye(e);for(;t;){let n=t.type;if(typeof n=="function"&&n.name)return n.name;if(n&&typeof n=="object"&&n.displayName)return n.displayName;t=t.return}return null}function Ft(e){return e.__vueParentComponent?{version:3,inst:e.__vueParentComponent}:e.__vue__?{version:2,inst:e.__vue__}:null}function Yn(e){var n,o;let t=e;for(;t;){let r=Ft(t);if(r){let s=r.version===3?(n=r.inst.type)==null?void 0:n.__file:(o=r.inst.$options)==null?void 0:o.__file;if(s)return{file:s,confidence:"exact",origin:"vue"}}t=t.parentElement}return null}function Gn(e){var n,o,r,s;let t=e;for(;t;){let a=Ft(t);if(a){let i=a.version===3?((n=a.inst.type)==null?void 0:n.__name)||((o=a.inst.type)==null?void 0:o.name):((r=a.inst.$options)==null?void 0:r.name)||((s=a.inst.$options)==null?void 0:s._componentTag);if(i)return i}t=t.parentElement}return null}function Zn(e){var n,o;let t=window.ng;if(!(t!=null&&t.getComponent))return null;try{let r=t.getComponent(e);return(o=(n=r==null?void 0:r.constructor)==null?void 0:n.name)!=null?o:null}catch{return null}}var Qn=/(?:\()?(https?:\/\/[^\s)]+|\/[^\s)]+|[A-Za-z]:\\[^\s)]+):(\d+):(\d+)\)?/;function eo(e){return/next-api-debugger|core\/inspector\/|node_modules/.test(e)}function to(e){let t=ht(e);if(!(t!=null&&t.stack))return null;let n=t.stack.split(`
`).slice(1);for(let o of n){if(eo(o))continue;let r=o.match(Qn);if(r)return{file:r[1],line:Number(r[2]),column:Number(r[3]),confidence:"approximate",origin:"stack-trace"}}return null}var ce;async function no(){if(ce!==void 0)return ce;try{ce=await(await fetch(location.href,{cache:"force-cache"})).text()}catch{ce=null}return ce}function oo(e){if(e.id)return`id="${e.id}"`;for(let t of["data-testid","name"]){let n=e.getAttribute(t);if(n)return`${t}="${n}"`}return e.className&&typeof e.className=="string"?`class="${e.className}"`:null}async function ro(e){let t=location.pathname||"/",n=await no();if(n){let o=oo(e);if(o){let r=n.indexOf(o);if(r!==-1){let s=n.slice(0,r).split(`
`).length;return{file:t,line:s,confidence:"approximate",origin:"plain-html"}}}}return{file:t,confidence:"approximate",origin:"plain-html"}}function Ge(e){let t=Jn(e);if(t)return t;let n=Kn(e);if(n)return n;let o=Yn(e);return o||to(e)}async function Xt(e){let t=Ge(e);return t||(Ye(e)?null:ro(e))}function Ce(e){var t,n;return(n=(t=Wn(e))!=null?t:Gn(e))!=null?n:Zn(e)}var ao=["display","position","top","right","bottom","left","width","height","color","background-color","font-family","font-size","font-weight","line-height","text-align","flex-direction","justify-content","align-items","gap","grid-template-columns","grid-template-rows","z-index","opacity","overflow","box-sizing","cursor"];function T(e){let t=parseFloat(e);return Number.isFinite(t)?t:0}function so(e){return{margin:{top:T(e.marginTop),right:T(e.marginRight),bottom:T(e.marginBottom),left:T(e.marginLeft)},border:{top:T(e.borderTopWidth),right:T(e.borderRightWidth),bottom:T(e.borderBottomWidth),left:T(e.borderLeftWidth)},padding:{top:T(e.paddingTop),right:T(e.paddingRight),bottom:T(e.paddingBottom),left:T(e.paddingLeft)},content:{width:T(e.width),height:T(e.height)}}}function io(e){let t=[],n=e.parentElement;for(;n&&n.tagName.toLowerCase()!=="html";)t.push({tag:n.tagName.toLowerCase(),id:n.id||null,classes:Array.from(n.classList)}),n=n.parentElement;return t}async function Vt(e){let t=getComputedStyle(e),n=e.getBoundingClientRect(),o={};Array.from(e.attributes).forEach(i=>{i.name!==ue&&(o[i.name]=i.value)});let r={};ao.forEach(i=>{r[i]=t.getPropertyValue(i)});let a=e.children.length===0&&(e.textContent||"").trim().slice(0,120)||null;return{tag:e.tagName.toLowerCase(),id:e.id||null,classes:Array.from(e.classList),attributes:o,rect:{x:n.x,y:n.y,width:n.width,height:n.height},box:so(t),computedStyles:r,ancestors:io(e),childCount:e.children.length,textPreview:a,componentName:Ce(e),source:await Xt(e)}}var Jt=3;function Ze(e,t){if(e!=null){if(typeof e=="string"){t(e);return}if(typeof e=="number"||typeof e=="boolean"){t(String(e));return}if(Array.isArray(e)){e.forEach(n=>Ze(n,t));return}typeof e=="object"&&Object.values(e).forEach(n=>Ze(n,t))}}function Kt(e){let t=new Map;for(let n of e)Ze(n.responseBody,o=>{let r=o.trim();r.length<Jt||t.has(r)||t.set(r,{log:n})});return t}function Wt(e,t){for(let n of e){let o=n.trim();if(o.length<Jt)continue;let r=t.get(o);if(r)return{kind:"api",endpoint:r.log.endpoint,method:r.log.method,matchedValue:o}}return e.some(n=>n.trim().length>0)?{kind:"static"}:{kind:"unknown"}}var po=8,Qe=40,lo=20,co=["src","href","alt","title","value","placeholder"];function uo(e){let t={};return Array.from(e.attributes).forEach(n=>{n.name!==ue&&(t[n.name]=n.value)}),t}function mo(e){let t=[],n=Array.from(e.childNodes).filter(o=>o.nodeType===Node.TEXT_NODE).map(o=>(o.textContent||"").trim()).filter(Boolean).join(" ");n&&t.push(n);for(let o of co){let r=e.getAttribute(o);r&&t.push(r)}return t}function Yt(e,t,n,o,r){return{tag:e.tagName.toLowerCase(),id:e.id||null,classes:Array.from(e.classList),attributes:uo(e),componentName:Ce(e),source:Ge(e),dataSource:Wt(mo(e),t),textPreview:o&&(e.textContent||"").trim().slice(0,80)||null,children:n,truncatedChildCount:r}}function Gt(e,t,n){let o=Array.from(e.children),r=o.slice(0,Qe),s=n<po?r.map(i=>Gt(i,t,n+1)):[],a=o.length>Qe?o.length-Qe:void 0;return Yt(e,t,s,e.children.length===0,a)}function fo(e){let t=[],n=e.parentElement;for(;n&&n.tagName.toLowerCase()!=="html"&&t.length<lo;)t.push(n),n=n.parentElement;return t.reverse()}function Zt(e,t){let n=Kt(t),o={...Gt(e,n,0),isSelected:!0},r=fo(e),s=o;for(let a=r.length-1;a>=0;a--)s={...Yt(r[a],n,[s],!1),isAncestorPath:!0};return s}function go(e){return!!(e!=null&&e.closest(".apd-root"))}function Qt(e,t,n){let o=!0;function r(l){let d=document.elementFromPoint(l.clientX,l.clientY);return go(d)?null:d}function s(l){o&&(t==null||t(r(l)))}function a(l){if(!o)return;let d=r(l);d&&(l.preventDefault(),l.stopPropagation(),p(),e(d))}function i(l){l.key==="Escape"&&(p(),n==null||n())}function p(){o=!1,window.removeEventListener("mousemove",s,!0),window.removeEventListener("click",a,!0),window.removeEventListener("keydown",i,!0)}return window.addEventListener("mousemove",s,!0),window.addEventListener("click",a,!0),window.addEventListener("keydown",i,!0),{cancel:()=>{p(),n==null||n()}}}function en(){let e=document.createElement("div");e.className="apd-inspect-highlight",e.style.display="none";function t(o){e.style.display="",e.style.left=`${o.left}px`,e.style.top=`${o.top}px`,e.style.width=`${o.width}px`,e.style.height=`${o.height}px`}function n(){e.style.display="none"}return{el:e,show:t,hide:n}}function Re(e,t){var i,p;if(!t||e.origin==="plain-html")return null;let n=t.replace(/\\/g,"/").replace(/\/+$/,""),o=e.file.replace(/\\/g,"/").replace(/^\.\//,"");if(!n||!/^(?:\/|[A-Za-z]:\/)/.test(n)||/^[a-z][a-z\d+.-]*:\/\//i.test(o)||o.split("/").includes("..")||!/\.(?:[cm]?[jt]sx?|vue|svelte|astro|html?|mdx|php)$/i.test(o))return null;let r=/^(?:\/|[A-Za-z]:\/)/.test(o),s=r?o:`${n}/${o}`;return r&&s!==n&&!s.startsWith(`${n}/`)?null:`vscode://file/${encodeURI(s).replace(/#/g,"%23").replace(/\?/g,"%3F")}:${(i=e.line)!=null?i:1}:${(p=e.column)!=null?p:1}`}import{useState as ho}from"react";import{jsx as I,jsxs as V}from"react/jsx-runtime";var bo=3;function xo({info:e}){return e.kind==="unknown"?null:e.kind==="api"?I("span",{className:"apd-datasource-badge apd-datasource-api",title:`Matches a value from a captured response: ${e.method} ${e.endpoint}`,children:"API"}):I("span",{className:"apd-datasource-badge apd-datasource-static",title:"No matching value found in any captured API response this session \u2014 may be hardcoded, or fetched server-side before the page loaded",children:"STATIC"})}function vo({node:e}){return V("span",{className:e.isSelected?"apd-tree-tag apd-tree-selected-tag":"apd-tree-tag",children:["<",e.tag,e.id&&V("span",{className:"apd-tree-id",children:[' id="',e.id,'"']}),e.classes.length>0&&V("span",{className:"apd-tree-class",children:[' class="',e.classes.join(" "),'"']}),">"]})}function tn({node:e,editorProjectRoot:t,prefix:n,connector:o,depthFromSelected:r}){let[s,a]=ho(e.isSelected||e.isAncestorPath||r<bo),i=e.children.length>0,p=n+(o===""?"":o==="\u2514\u2500\u2500 "?"    ":"\u2502   "),l=e.isSelected?0:r<0?-1:r+1,d=e.source?Re(e.source,t):null,m=e.source?`${e.source.file}${e.source.line?`:${e.source.line}`:""}`:"";return V("div",{className:"apd-tree-node",children:[V("div",{className:i?`apd-tree-row apd-tree-clickable${e.isSelected?" apd-tree-selected-row":""}`:`apd-tree-row${e.isSelected?" apd-tree-selected-row":""}`,onClick:()=>i&&a(h=>!h),children:[V("span",{className:"apd-tree-prefix",children:[n,o]}),i?I("span",{className:"apd-tree-toggle",children:s?"\u25BE":"\u25B8"}):I("span",{className:"apd-tree-toggle apd-tree-toggle-leaf",children:"\u2022"}),I(vo,{node:e}),e.isSelected&&I("span",{className:"apd-tree-selected-label",children:"\u2190 Selected"}),e.componentName&&I("span",{className:"apd-tree-component",children:e.componentName}),I(xo,{info:e.dataSource}),d?I("a",{className:"apd-tree-source apd-tree-source-link",href:d,title:"Open in VS Code",onClick:h=>h.stopPropagation(),children:m}):e.source?I("span",{className:"apd-tree-source",children:m}):null]}),s&&i&&V("div",{children:[e.children.map((h,v)=>{let E=v===e.children.length-1;return I(tn,{node:h,editorProjectRoot:t,prefix:p,connector:E?"\u2514\u2500\u2500 ":"\u251C\u2500\u2500 ",depthFromSelected:l},v)}),typeof e.truncatedChildCount=="number"&&V("div",{className:"apd-tree-truncated",children:[p,"+",e.truncatedChildCount," more not shown"]})]})]})}function nn({root:e,editorProjectRoot:t}){return I("div",{className:"apd-tree",children:I(tn,{node:e,editorProjectRoot:t,prefix:"",connector:"",depthFromSelected:-1})})}import{jsx as u,jsxs as b}from"react/jsx-runtime";function rn({data:e}){let t=Object.entries(e).filter(([,n])=>n!=="");return t.length===0?u("div",{className:"apd-empty-body",children:"None"}):u("div",{className:"apd-kv",children:t.map(([n,o])=>b("div",{style:{display:"contents"},children:[u("div",{className:"apd-kv-key",children:n}),u("div",{className:"apd-kv-val",children:o})]},n))})}function wo({info:e}){let{box:t}=e;return u("div",{className:"apd-box-model",children:b("div",{className:"apd-box-layer apd-box-layer-margin",children:[u("span",{className:"apd-box-label apd-box-label-top",children:t.margin.top}),u("span",{className:"apd-box-label apd-box-label-right",children:t.margin.right}),u("span",{className:"apd-box-label apd-box-label-bottom",children:t.margin.bottom}),u("span",{className:"apd-box-label apd-box-label-left",children:t.margin.left}),b("div",{className:"apd-box-layer apd-box-layer-border",children:[u("span",{className:"apd-box-label apd-box-label-top",children:t.border.top}),u("span",{className:"apd-box-label apd-box-label-right",children:t.border.right}),u("span",{className:"apd-box-label apd-box-label-bottom",children:t.border.bottom}),u("span",{className:"apd-box-label apd-box-label-left",children:t.border.left}),b("div",{className:"apd-box-layer apd-box-layer-padding",children:[u("span",{className:"apd-box-label apd-box-label-top",children:t.padding.top}),u("span",{className:"apd-box-label apd-box-label-right",children:t.padding.right}),u("span",{className:"apd-box-label apd-box-label-bottom",children:t.padding.bottom}),u("span",{className:"apd-box-label apd-box-label-left",children:t.padding.left}),b("div",{className:"apd-box-layer-content",children:[Math.round(t.content.width)," \xD7 ",Math.round(t.content.height)]})]})]})]})})}function ko({info:e,editorProjectRoot:t}){let{source:n,componentName:o}=e;if(!n)return b("div",{className:"apd-source-card",children:[o&&b("div",{children:["Component: ",u("strong",{children:o})]}),u("div",{className:"apd-source-none",children:"Source file unavailable. For React/Next.js, enable the Babel source plugin for exact JSX paths."})]});let r=n.line?`${n.file}:${n.line}${n.column?`:${n.column}`:""}`:n.file,s=n.origin==="plain-html"?`Rendered page: ${r}`:r,a=Re(n,t);return b("div",{className:"apd-source-card",children:[o&&b("div",{style:{fontSize:11,color:"var(--apd-text-dim)",marginBottom:4},children:["Component: ",u("strong",{style:{color:"var(--apd-text)"},children:o})]}),a?u("a",{className:"apd-source-path",href:a,title:"Open in VS Code",children:s}):u("span",{className:"apd-source-path apd-source-path-plain",children:s}),b("div",{className:"apd-source-meta",children:[u("span",{className:`apd-confidence-badge apd-confidence-${n.confidence}`,children:n.confidence}),b("span",{children:["via ",n.origin]}),!a&&n.origin!=="plain-html"&&u("button",{type:"button",className:"apd-console-toggle-stack",onClick:()=>ge(s),style:{marginLeft:"auto"},children:"Copy path"})]})]})}function an({onInspectingChange:e,editorProjectRoot:t}){let[n,o]=Pe(!1),[r,s]=Pe(!1),[a,i]=Pe(null),[p,l]=Pe(null),d=on(null),m=on(null);yo(()=>()=>{var c,g;(c=d.current)==null||c.cancel(),(g=m.current)==null||g.el.remove()},[]);function h(){var c,g;(c=m.current)==null||c.hide(),(g=m.current)==null||g.el.remove(),m.current=null}function v(){o(!0),e(!0);let c=en();document.body.appendChild(c.el),m.current=c,d.current=Qt(async g=>{h(),o(!1),e(!1),s(!0);let R=await Vt(g);i(R),l(Zt(g,N.getLogs())),s(!1)},g=>{g?c.show(g.getBoundingClientRect()):c.hide()},()=>{h(),o(!1),e(!1)})}function E(){var c;(c=d.current)==null||c.cancel()}return a?b("div",{className:"apd-inspector-body",children:[b("div",{style:{display:"flex",alignItems:"flex-start",gap:10,marginBottom:12},children:[b("div",{style:{flex:1},children:[b("div",{className:"apd-inspector-tag",children:["<",a.tag,a.id&&b("span",{className:"apd-tag-id",children:[" #",a.id]}),a.classes.map(c=>b("span",{className:"apd-tag-class",children:[" ",".",c]},c)),">"]}),a.textPreview&&b("div",{style:{fontSize:11.5,color:"var(--apd-text-dim)",fontFamily:"var(--apd-mono)"},children:['"',a.textPreview,'"']})]}),u("button",{type:"button",className:"apd-action-btn",onClick:v,children:"\u2316 Inspect another"})]}),a.ancestors.length>0&&b("div",{className:"apd-inspector-breadcrumb",children:[[...a.ancestors].reverse().map((c,g)=>b("span",{children:[c.tag,c.id?`#${c.id}`:""]},g)),u("span",{style:{color:"var(--apd-accent)"},children:a.tag})]}),u(ko,{info:a,editorProjectRoot:t}),b("div",{className:"apd-meta-grid",children:[b("div",{children:[u("div",{className:"apd-meta-label",children:"Position"}),b("div",{className:"apd-meta-value",children:[Math.round(a.rect.x),", ",Math.round(a.rect.y)]})]}),b("div",{children:[u("div",{className:"apd-meta-label",children:"Size"}),b("div",{className:"apd-meta-value",children:[Math.round(a.rect.width)," \xD7 ",Math.round(a.rect.height)]})]}),b("div",{children:[u("div",{className:"apd-meta-label",children:"Children"}),u("div",{className:"apd-meta-value",children:a.childCount})]})]}),b("div",{className:"apd-section",children:[u("div",{className:"apd-section-header",children:"Box Model"}),u("div",{className:"apd-section-body",children:u(wo,{info:a})})]}),b("div",{className:"apd-section",children:[b("div",{className:"apd-section-header",children:["Attributes (",Object.keys(a.attributes).length,")"]}),u("div",{className:"apd-section-body",children:u(rn,{data:a.attributes})})]}),b("div",{className:"apd-section",children:[u("div",{className:"apd-section-header",children:"Computed Styles"}),u("div",{className:"apd-section-body",children:u(rn,{data:a.computedStyles})})]}),p&&b("div",{className:"apd-section",children:[b("div",{className:"apd-section-header",children:["Element Tree",b("span",{style:{fontWeight:400,color:"var(--apd-text-faint)",fontSize:10.5},children:[" ","\u2014 structure, source, and data origin for this element and its descendants"]})]}),u("div",{className:"apd-section-body",children:u(nn,{root:p,editorProjectRoot:t})})]})]}):b("div",{className:"apd-inspector-empty",children:[u("button",{type:"button",className:`apd-inspect-start-btn${n?" apd-inspecting":""}`,onClick:n?E:v,children:n?"\u25FC Stop Inspecting (Esc)":"\u2316 Start Inspecting"}),u("p",{children:n?"Hover any element on the page and click to select it.":r?"Resolving source location\u2026":"Pick any element on the page to see its DOM details, computed styles, and \u2014 when available \u2014 the exact source file responsible for it."})]})}function sn(e){return Object.entries(e).map(([t,n])=>({name:t,value:n}))}function Eo(e){return Object.entries(e).map(([t,n])=>({name:t,value:n}))}function et(e){return{log:{version:"1.2",creator:{name:"next-api-debugger",version:"0.1.0"},entries:e.map(t=>{var n,o;return{startedDateTime:new Date(t.timestamp).toISOString(),time:t.duration,request:{method:t.method,url:t.url,httpVersion:"HTTP/1.1",headers:sn(t.requestHeaders),queryString:Eo(t.queryParams),cookies:[],headersSize:-1,bodySize:t.requestSize,postData:t.requestBodyRaw?{mimeType:t.requestHeaders["content-type"]||"application/json",text:t.requestBodyRaw}:void 0},response:{status:(n=t.responseStatus)!=null?n:0,statusText:t.responseStatusText,httpVersion:"HTTP/1.1",headers:sn(t.responseHeaders),cookies:[],content:{size:t.responseSize,mimeType:t.responseHeaders["content-type"]||"application/json",text:(o=t.responseBodyRaw)!=null?o:""},redirectURL:"",headersSize:-1,bodySize:t.responseSize},cache:{},timings:{send:0,wait:t.duration,receive:0}}})}}}function tt(e,t){let n=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),o=URL.createObjectURL(n),r=document.createElement("a");r.href=o,r.download=e,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(o)}import{Fragment as nt,jsx as y,jsxs as H}from"react/jsx-runtime";var So=["GET","POST","PUT","PATCH","DELETE"],Lo=["log","info","warn","error","debug"];function pn({logs:e,consoleEntries:t,onClose:n,onClear:o,onClearConsole:r,onTogglePin:s,theme:a,onToggleTheme:i,inspectorEnabled:p,editorProjectRoot:l}){var at,st,it;let[d,m]=oe("network"),[h,v]=oe({search:"",status:"all",methods:[]}),[E,c]=oe(null),[g,R]=oe(!1),[C,w]=oe(""),[A,z]=oe([]);No(()=>{!E&&e.length>0&&c(e[0].id)},[e,E]);let P=dn(()=>{let x=h.search.trim().toLowerCase();return e.filter(k=>{var W;return!(h.status==="success"&&!k.success||h.status==="failed"&&k.success||h.methods.length>0&&!h.methods.includes(k.method)||x&&!`${k.url} ${k.endpoint} ${k.method} ${(W=k.responseStatus)!=null?W:""}`.toLowerCase().includes(x))})},[e,h]),K=dn(()=>{let x=C.trim().toLowerCase();return t.filter(k=>!(A.length>0&&!A.includes(k.level)||x&&!k.preview.toLowerCase().includes(x)))},[t,C,A]),$=(st=(at=P.find(x=>x.id===E))!=null?at:P[0])!=null?st:null,B=e.filter(x=>!x.success).length,M=t.filter(x=>x.level==="error").length;function cn(x){v(k=>({...k,methods:k.methods.includes(x)?k.methods.filter(W=>W!==x):[...k.methods,x]}))}function un(x){z(k=>k.includes(x)?k.filter(W=>W!==x):[...k,x])}let mn=d==="network"?`${e.length} requests${B>0?` \xB7 ${B} failed`:""}`:d==="console"?`${t.length} logs${M>0?` \xB7 ${M} errors`:""}`:"element picker";return y("div",{className:S("apd-overlay",g&&"apd-overlay-passthrough"),onClick:n,children:H("div",{className:`apd-modal${g?" apd-minimized":""}`,onClick:x=>x.stopPropagation(),children:[H("div",{className:"apd-header",children:[H("div",{className:"apd-header-title",children:[y("span",{className:"apd-live-dot"}),"API Debugger"]}),y("span",{className:"apd-header-count",children:mn}),y("div",{className:"apd-spacer"}),y("button",{className:"apd-icon-btn",onClick:i,title:"Toggle theme",type:"button",children:a==="light"?"\u2600":"\u263E"}),d==="network"&&H(nt,{children:[y("button",{className:"apd-icon-btn",title:"Export JSON",type:"button",onClick:()=>tt(`api-logs-${Date.now()}.json`,e),children:"\u2B73"}),y("button",{className:"apd-icon-btn",title:"Export HAR",type:"button",onClick:()=>tt(`api-logs-${Date.now()}.har`,et(e)),children:"HAR"})]}),d!=="inspector"&&y("button",{className:"apd-icon-btn",title:d==="network"?"Clear logs":"Clear console",type:"button",onClick:d==="network"?o:r,children:"\u{1F5D1}"}),y("button",{className:"apd-icon-btn",title:g?"Restore":"Minimize",type:"button",onClick:()=>R(x=>!x),children:g?"\u25A2":"\u2014"}),y("button",{className:"apd-icon-btn",title:"Close",type:"button",onClick:n,children:"\u2715"})]}),!g&&H("div",{className:"apd-tabs",children:[H("button",{type:"button",className:S("apd-tab",d==="network"&&"apd-active"),onClick:()=>m("network"),children:["Network",e.length>0&&y("span",{className:S("apd-tab-badge",B>0&&"apd-tab-badge-error"),children:e.length})]}),H("button",{type:"button",className:S("apd-tab",d==="console"&&"apd-active"),onClick:()=>m("console"),children:["Console",t.length>0&&y("span",{className:S("apd-tab-badge",M>0&&"apd-tab-badge-error"),children:t.length})]}),p&&y("button",{type:"button",className:S("apd-tab",d==="inspector"&&"apd-active"),onClick:()=>m("inspector"),children:"Inspector"})]}),!g&&d==="network"&&H(nt,{children:[H("div",{className:"apd-toolbar",children:[y(Xe,{value:h.search,onChange:x=>v(k=>({...k,search:x}))}),y(It,{status:h.status,onStatusChange:x=>v(k=>({...k,status:x})),methods:So,activeMethods:h.methods,onToggleMethod:cn})]}),H("div",{className:"apd-body",children:[y(Dt,{logs:P,selectedId:(it=$==null?void 0:$.id)!=null?it:null,onSelect:c,onTogglePin:s}),y(_t,{log:$,onTogglePin:s})]})]}),!g&&d==="console"&&H(nt,{children:[H("div",{className:"apd-toolbar",children:[y(Xe,{value:C,onChange:w}),Lo.map(x=>y("button",{type:"button",className:S("apd-chip",A.includes(x)&&"apd-active"),onClick:()=>un(x),children:x},x))]}),y(Ut,{entries:K})]}),p&&y("div",{style:{display:!g&&d==="inspector"?"flex":"none",flexDirection:"column",flex:1,overflow:"hidden"},children:y(an,{onInspectingChange:R,editorProjectRoot:l})}),!g&&H("div",{className:"apd-footer",children:[H("span",{children:[y("span",{className:"apd-kbd",children:"Ctrl"}),"+",y("span",{className:"apd-kbd",children:"Shift"}),"+",y("span",{className:"apd-kbd",children:"D"})," to toggle \xB7 ",y("span",{className:"apd-kbd",children:"Space"}),"+",y("span",{className:"apd-kbd",children:"H"})," to hide"]}),y("span",{style:{marginLeft:"auto"},children:"next-api-debugger \xB7 dev only"})]})]})})}import{jsx as rt,jsxs as Po}from"react/jsx-runtime";function Co(e){return typeof e=="boolean"?e:process.env.NODE_ENV!=="production"}function Ro(e){let{enabled:t,maxLogs:n=200,initialPosition:o,axiosInstance:r,theme:s="dark",keyboardShortcut:a=!0,ignoreUrls:i,serverLogsUrl:p,inspector:l=!0,editorProjectRoot:d}=e,m=Co(t),[h,v]=ot(!1),[E,c]=ot(!1),[g,R]=ot(s),{logs:C,clear:w,togglePin:A}=vt(),{entries:z,clear:P}=yt();if(ln(()=>{if(!m||typeof window=="undefined")return;N.setMaxLogs(n),q.setMaxEntries(500),Me({ignoreUrls:p?[...i!=null?i:[],p]:i}),dt({ignoreUrls:i}),ut(),l&&ft();let M=r?qe(r,{ignoreUrls:i}):()=>{};return()=>{Ie(),pt(),mt(),l&&gt(),M()}},[m,l,p]),ln(()=>{if(!(!m||!p||typeof window=="undefined"))return bt(p)},[m,p]),wt({ctrl:!0,shift:!0,key:"d"},()=>v(M=>!M),m&&a),Et(["space","h"],()=>{c(M=>!M),v(!1)},m&&a),!m)return null;let K=C.filter(M=>!M.success).length,$=z.filter(M=>M.level==="error").length,B=g==="system"?"dark":g;return Po("div",{className:`apd-root${B==="light"?" apd-light":""}`,children:[rt(Lt,{}),!E&&!h&&rt(At,{count:C.length+z.length,hasErrors:K>0||$>0,onOpen:()=>v(!0),initialPosition:o}),!E&&h&&rt(pn,{logs:C,consoleEntries:z,onClose:()=>v(!1),onClear:w,onClearConsole:P,onTogglePin:A,theme:B,onToggleTheme:()=>R(B==="light"?"dark":"light"),inspectorEnabled:l,editorProjectRoot:d})]})}export{Ro as ApiDebugger,et as exportAsHar,Ke as generateCurl,qe as installAxiosInterceptor,Me as installFetchInterceptor,N as logStore,Ie as uninstallFetchInterceptor};
//# sourceMappingURL=index.mjs.map