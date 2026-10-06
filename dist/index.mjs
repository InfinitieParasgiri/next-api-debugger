'use client';
import{useEffect as dt,useState as He}from"react";var De=class{constructor(){this.logs=[];this.listeners=new Set;this.maxLogs=200;this.snapshot=[];this.getLogs=()=>(this.snapshot=this.logs,this.snapshot);this.subscribe=t=>(this.listeners.add(t),()=>this.listeners.delete(t))}setMaxLogs(t){this.maxLogs=Math.max(1,t),this.trim()}addLog(t){this.logs=[t,...this.logs],this.trim(),this.emit()}togglePin(t){this.logs=this.logs.map(n=>n.id===t?{...n,pinned:!n.pinned}:n),this.emit()}clear(){this.logs=[],this.emit()}trim(){if(this.logs.length<=this.maxLogs)return;let t=this.logs.filter(s=>s.pinned),o=this.logs.filter(s=>!s.pinned).slice(0,Math.max(0,this.maxLogs-t.length)),r=[...t,...o];r.sort((s,a)=>a.timestamp-s.timestamp),this.logs=r}emit(){this.listeners.forEach(t=>t())}},S=new De;var qe=class{constructor(){this.entries=[];this.listeners=new Set;this.maxEntries=500;this.getEntries=()=>this.entries;this.subscribe=t=>(this.listeners.add(t),()=>this.listeners.delete(t))}setMaxEntries(t){this.maxEntries=Math.max(1,t),this.trim()}addEntry(t){let n=this.entries[0];n&&n.level===t.level&&n.preview===t.preview&&n.stack===t.stack?this.entries=[{...n,count:n.count+1,timestamp:t.timestamp},...this.entries.slice(1)]:this.entries=[t,...this.entries],this.trim(),this.emit()}clear(){this.entries=[],this.emit()}trim(){this.entries.length>this.maxEntries&&(this.entries=this.entries.slice(0,this.maxEntries))}emit(){this.listeners.forEach(t=>t())}},D=new qe;var $="x-apd-skip";function j(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,9)}`}function U(e){if(!e)return null;try{return JSON.parse(e)}catch{return e}}function Y(e){if(e==null)return null;if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return String(e)}}function O(e){if(!e)return 0;try{return new Blob([e]).size}catch{return e.length}}function ze(e){if(!e)return"0 B";let t=["B","KB","MB","GB"],n=Math.min(t.length-1,Math.floor(Math.log(e)/Math.log(1024))),o=e/Math.pow(1024,n);return`${n===0?o:o.toFixed(1)} ${t[n]}`}function ge(e){return e<1e3?`${e} ms`:`${(e/1e3).toFixed(2)} s`}function G(e){let t=new Date(e);return t.toLocaleTimeString(void 0,{hour12:!1})+`.${String(t.getMilliseconds()).padStart(3,"0")}`}function Z(e){try{let t=typeof window!="undefined"?window.location.origin:"http://localhost",n=new URL(e,t),o={};return n.searchParams.forEach((r,s)=>{o[s]=r}),{endpoint:n.pathname,queryParams:o}}catch{return{endpoint:e,queryParams:{}}}}function he(e){let t={};return e&&e.forEach((n,o)=>{t[o]=n}),t}function se(e){let t={};if(!e)return t;if(typeof e.toJSON=="function")return{...e.toJSON()};if(e instanceof Headers)return he(e);if(typeof e=="object")for(let[n,o]of Object.entries(e))o!=null&&(t[n]=String(o));return t}function Q(e,t){return!t||t.length===0?!1:t.some(n=>n instanceof RegExp?n.test(e):e.includes(n))}function N(...e){return e.filter(Boolean).join(" ")}async function be(e){try{if(navigator.clipboard&&window.isSecureContext)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select();let n=document.execCommand("copy");return document.body.removeChild(t),n}catch{return!1}}var F=null,xe=!1;function hn(e){if(e==null)return null;if(typeof e=="string")return e;if(e instanceof URLSearchParams)return e.toString();if(e instanceof FormData){let t=[];return e.forEach((n,o)=>{t.push(`${o}=${n instanceof File?`[File: ${n.name}]`:n}`)}),t.join("&")}return"[binary data]"}function Be(e={}){xe||typeof window=="undefined"||typeof window.fetch!="function"||(F=window.fetch.bind(window),xe=!0,window.fetch=async function(n,o){var E,l,f,L,P;let r=n instanceof Request?n:null,s=r?r.url:String(n);if(Q(s,e.ignoreUrls))return F(n,o);let a=he(new Headers((l=(E=o==null?void 0:o.headers)!=null?E:r==null?void 0:r.headers)!=null?l:void 0));if(a[$]){let w=new Headers((L=(f=o==null?void 0:o.headers)!=null?f:r==null?void 0:r.headers)!=null?L:void 0);return w.delete($),r?F(new Request(r,{headers:w})):F(n,{...o,headers:w})}let i=Date.now(),p=performance.now(),c=((o==null?void 0:o.method)||(r==null?void 0:r.method)||"GET").toUpperCase(),{endpoint:d,queryParams:h}=Z(s),g=hn((P=o==null?void 0:o.body)!=null?P:null),y={id:j(),url:s,endpoint:d,method:c,requestHeaders:a,requestBody:U(g),requestBodyRaw:g,queryParams:h,timestamp:i,source:"fetch",requestSize:O(g),pinned:!1};try{let w=await F(n,o),T=Math.round(performance.now()-p),_=w.clone(),R=null;try{R=await _.text()}catch{R=null}return S.addLog({...y,duration:T,responseStatus:w.status,responseStatusText:w.statusText,responseHeaders:he(w.headers),responseBody:U(R),responseBodyRaw:R,responseSize:O(R),success:w.ok,error:w.ok?null:`HTTP ${w.status} ${w.statusText}`}),w}catch(w){let T=Math.round(performance.now()-p);throw S.addLog({...y,duration:T,responseStatus:null,responseStatusText:"",responseHeaders:{},responseBody:null,responseBodyRaw:null,responseSize:0,success:!1,error:(w==null?void 0:w.message)||"Network error"}),w}})}function $e(){xe&&F&&typeof window!="undefined"&&(window.fetch=F),xe=!1,F=null}var ie=null,te=null,de=null,ve=!1,ee=Symbol("apd-xhr-meta");function bn(e){let t={};return e.trim().split(/[\r\n]+/).forEach(n=>{let o=n.indexOf(":");if(o===-1)return;let r=n.slice(0,o).trim().toLowerCase(),s=n.slice(o+1).trim();r&&(t[r]=s)}),t}function ut(e={}){ve||typeof window=="undefined"||typeof XMLHttpRequest=="undefined"||(ie=XMLHttpRequest.prototype.open,te=XMLHttpRequest.prototype.send,de=XMLHttpRequest.prototype.setRequestHeader,ve=!0,XMLHttpRequest.prototype.open=function(n,o,...r){let s=String(o);return this[ee]={id:j(),method:(n||"GET").toUpperCase(),url:s,startTime:0,startPerf:0,requestHeaders:{},ignored:Q(s,e.ignoreUrls)},ie.apply(this,[n,o,...r])},XMLHttpRequest.prototype.setRequestHeader=function(n,o){if(n.toLowerCase()===$){this[ee]&&(this[ee].ignored=!0);return}return this[ee]&&(this[ee].requestHeaders[n]=o),de.apply(this,[n,o])},XMLHttpRequest.prototype.send=function(n){let o=this[ee];if(!o||o.ignored)return te.apply(this,[n]);o.startTime=Date.now(),o.startPerf=performance.now();let r=n==null?null:typeof n=="string"?n:n instanceof URLSearchParams?n.toString():n instanceof FormData?"[form data]":"[binary data]",s=()=>{let a=Math.round(performance.now()-o.startPerf),{endpoint:i,queryParams:p}=Z(o.url),c=bn(this.getAllResponseHeaders()||""),d=null;try{d=typeof this.responseText=="string"?this.responseText:null}catch{d=null}let h=this.status,g=h>=200&&h<400,y={id:o.id,url:o.url,endpoint:i,method:o.method,requestHeaders:o.requestHeaders,requestBody:U(r),requestBodyRaw:r,queryParams:p,responseStatus:h||null,responseStatusText:this.statusText||"",responseHeaders:c,responseBody:U(d),responseBodyRaw:d,duration:a,timestamp:o.startTime,success:g,error:g?null:h===0?"Network error":`HTTP ${h} ${this.statusText}`,source:"xhr",requestSize:O(r),responseSize:O(d),pinned:!1};S.addLog(y),this.removeEventListener("loadend",s)};return this.addEventListener("loadend",s),te.apply(this,[n])})}function mt(){ve&&typeof window!="undefined"&&typeof XMLHttpRequest!="undefined"&&(ie&&(XMLHttpRequest.prototype.open=ie),te&&(XMLHttpRequest.prototype.send=te),de&&(XMLHttpRequest.prototype.setRequestHeader=de)),ve=!1,ie=null,te=null,de=null}function xn(e){let t=(e==null?void 0:e.baseURL)||"",n=(e==null?void 0:e.url)||"",o=/^https?:\/\//i.test(n)?n:`${t}${t&&!t.endsWith("/")&&!n.startsWith("/")?"/":""}${n}`;if(e!=null&&e.params&&typeof e.params=="object"){let r=vn(e.params);r&&(o+=(o.includes("?")?"&":"?")+r)}return o}function vn(e){let t=new URLSearchParams;for(let[n,o]of Object.entries(e))o!=null&&(Array.isArray(o)?o.forEach(r=>t.append(n,String(r))):t.append(n,String(o)));return t.toString()}function ft(e){if(e==null)return null;if(typeof e=="string")return e;if(typeof URLSearchParams!="undefined"&&e instanceof URLSearchParams)return e.toString();if(typeof FormData!="undefined"&&e instanceof FormData){let t=[];return e.forEach((n,o)=>{t.push(`${o}=${n instanceof File?`[File: ${n.name}]`:n}`)}),t.join("&")}return Y(e)}function je(e,t={}){var s;if(!e||!e.interceptors||typeof((s=e.interceptors.request)==null?void 0:s.use)!="function")return()=>{};if(e.__apiDebuggerInstalled)return()=>{};e.__apiDebuggerInstalled=!0;let n=e.interceptors.request.use(a=>{let i={id:j(),startTime:Date.now(),startPerf:performance.now(),requestBodyRaw:ft(a.data),requestHeadersSnapshot:se(a.headers)};return a.__apdMeta=i,a.headers&&typeof a.headers.set=="function"?a.headers.set($,"1"):a.headers={...a.headers||{},[$]:"1"},a});function o(a,i,p){var T,_,R,K,B,z;if(!a)return;let c=xn(a);if(Q(c,t.ignoreUrls))return;let d=a.__apdMeta||{id:j(),startTime:Date.now(),startPerf:performance.now(),requestBodyRaw:ft(a.data),requestHeadersSnapshot:se(a.headers)},h=Math.round(performance.now()-d.startPerf),{endpoint:g,queryParams:y}=Z(c),E=se(a.headers),l=Object.keys(E).length>0?E:d.requestHeadersSnapshot;delete l[$];let f=d.requestBodyRaw,L=(i==null?void 0:i.data)!==void 0?Y(i.data):null,P=(R=(_=i==null?void 0:i.status)!=null?_:(T=p==null?void 0:p.response)==null?void 0:T.status)!=null?R:null,w={id:d.id,url:c,endpoint:g,method:(a.method||"get").toUpperCase(),requestHeaders:l,requestBody:(K=U(f))!=null?K:f,requestBodyRaw:f,queryParams:y,responseStatus:P,responseStatusText:(B=i==null?void 0:i.statusText)!=null?B:"",responseHeaders:se(i==null?void 0:i.headers),responseBody:(z=i==null?void 0:i.data)!=null?z:null,responseBodyRaw:L,duration:h,timestamp:d.startTime,success:!p&&!!P&&P<400,error:p?p.message||"Request failed":null,source:"axios",requestSize:O(f),responseSize:O(L),pinned:!1};S.addLog(w)}let r=e.interceptors.response.use(a=>(o(a.config,a),a),a=>(o(a==null?void 0:a.config,a==null?void 0:a.response,a),Promise.reject(a)));return()=>{e.interceptors.request.eject(n),e.interceptors.response.eject(r),e.__apiDebuggerInstalled=!1}}var gt=["log","info","warn","error","debug"],_e={},pe=null,le=null,Ue=!1;function yn(e,t=new WeakSet){var n;if(e===null)return"null";if(e===void 0)return"undefined";if(typeof e=="string")return e;if(typeof e=="number"||typeof e=="boolean")return String(e);if(e instanceof Error)return`${e.name}: ${e.message}`;if(typeof e=="function")return e.name?`\u0192 ${e.name}()`:"\u0192 ()";if(typeof e=="object"){if(t.has(e))return"[Circular]";t.add(e);try{return(n=JSON.stringify(e,(o,r)=>typeof r=="bigint"?r.toString():r,2))!=null?n:String(e)}catch{return Array.isArray(e)?"[Array]":"[Object]"}}return String(e)}function wn(e){for(let t of e)if(t instanceof Error&&t.stack)return t.stack;return null}function Oe(e,t,n){let o=t.map(r=>yn(r));return{id:j(),level:e,parts:o,preview:o.join(" "),stack:wn(t),timestamp:Date.now(),source:n,count:1}}function ht(e={}){var n,o;if(Ue||typeof window=="undefined"||typeof console=="undefined")return;Ue=!0;let t=(n=e.levels)!=null?n:gt;for(let r of t){let s=(o=console[r])==null?void 0:o.bind(console);s&&(_e[r]=s,console[r]=(...a)=>{D.addEntry(Oe(r,a,"console")),s(...a)})}pe=r=>{let s=r.error?[r.error]:[r.message],a=Oe("error",s,"window.onerror");D.addEntry({...a,preview:a.preview||`${r.message} (${r.filename}:${r.lineno}:${r.colno})`})},window.addEventListener("error",pe),le=r=>{let s=r.reason,a=Oe("error",[s],"unhandledrejection");D.addEntry({...a,preview:`Unhandled promise rejection: ${a.preview}`})},window.addEventListener("unhandledrejection",le)}function bt(){if(typeof console!="undefined")for(let e of gt){let t=_e[e];t&&(console[e]=t)}typeof window!="undefined"&&(pe&&window.removeEventListener("error",pe),le&&window.removeEventListener("unhandledrejection",le)),_e={},pe=null,le=null,Ue=!1}var Fe=new WeakMap,ce=null,ue=null,Xe=!1;function xt(){Xe||typeof document=="undefined"||(Xe=!0,ce=document.createElement.bind(document),ue=document.createElementNS.bind(document),document.createElement=function(t,n){let o=ce(t,n);return Fe.set(o,new Error),o},document.createElementNS=function(t,n,o){let r=ue(t,n,o);return Fe.set(r,new Error),r})}function vt(){ce&&(document.createElement=ce),ue&&(document.createElementNS=ue),Xe=!1,ce=null,ue=null}function yt(e){return Fe.get(e)}function wt(e){let t;try{t=new URL(e,window.location.href)}catch{return()=>{}}if(t.origin!==window.location.origin)return()=>{};let n=new Set,o=new AbortController,r=!1;async function s(){if(!r){r=!0;try{let i=await fetch(t.toString(),{cache:"no-store",credentials:"same-origin",signal:o.signal});if(!i.ok)return;let p=await i.json();if(o.signal.aborted||!Array.isArray(p))return;for(let c of p.slice().reverse()){if(!c||typeof c!="object")continue;let d=c;d.source!=="server-fetch"||typeof d.id!="string"||n.has(d.id)||(n.add(d.id),S.addLog(d))}if(n.size>1e3){let c=n.values();for(;n.size>500;){let d=c.next();if(d.done)break;n.delete(d.value)}}}catch{}finally{r=!1}}}s();let a=window.setInterval(()=>{s()},2e3);return()=>{window.clearInterval(a),o.abort()}}import{useCallback as kt,useSyncExternalStore as kn}from"react";function Et(){let e=kn(S.subscribe,S.getLogs,S.getLogs),t=kt(()=>S.clear(),[]),n=kt(o=>S.togglePin(o),[]);return{logs:e,clear:t,togglePin:n}}import{useCallback as En,useSyncExternalStore as Sn}from"react";function St(){let e=Sn(D.subscribe,D.getEntries,D.getEntries),t=En(()=>D.clear(),[]);return{entries:e,clear:t}}import{useEffect as Nn}from"react";function Nt(e,t,n=!0){Nn(()=>{if(!n||typeof window=="undefined")return;function o(r){let s=!e.ctrl||r.ctrlKey||r.metaKey,a=!e.shift||r.shiftKey;s&&a&&r.key.toLowerCase()===e.key.toLowerCase()&&(r.preventDefault(),t())}return window.addEventListener("keydown",o),()=>window.removeEventListener("keydown",o)},[e.ctrl,e.shift,e.key,t,n])}import{useEffect as Ln,useRef as Lt}from"react";function Ct(e,t,n){let o=Lt(""),r=Lt(0);Ln(()=>{if(!n||!e||!/^\d+$/.test(e))return;function s(a){if(a.repeat||!(a.ctrlKey||a.metaKey)||a.shiftKey||a.altKey){o.current="";return}let i=a.target;if(i instanceof HTMLElement&&(i.isContentEditable||/^(?:INPUT|TEXTAREA|SELECT)$/.test(i.tagName))){o.current="";return}Date.now()-r.current>3e3&&(o.current=""),r.current=Date.now();let p=(o.current+a.key).slice(-e.length);for(;p&&!e.startsWith(p);)p=p.slice(1);p&&(a.preventDefault(),o.current=p,p===e&&(o.current="",t()))}return window.addEventListener("keydown",s),()=>window.removeEventListener("keydown",s)},[e,t,n])}import{useEffect as Rn,useRef as Pn}from"react";function Ve(e){return e===" "?"space":e.toLowerCase()}function Cn(e){var o;let t=e;if(!t)return!1;let n=(o=t.tagName)==null?void 0:o.toLowerCase();return n==="input"||n==="textarea"||n==="select"||t.isContentEditable}function Rt(e,t){if(typeof window=="undefined")return()=>{};let n=e.map(Ve),o=new Set;function r(i){if(Cn(i.target))return;let p=Ve(i.key),c=o.has(p);o.add(p),!c&&n.every(d=>o.has(d))&&(i.preventDefault(),t())}function s(i){o.delete(Ve(i.key))}function a(){o.clear()}return window.addEventListener("keydown",r),window.addEventListener("keyup",s),window.addEventListener("blur",a),()=>{window.removeEventListener("keydown",r),window.removeEventListener("keyup",s),window.removeEventListener("blur",a)}}function Pt(e,t,n=!0){let o=Pn(t);o.current=t,Rn(()=>{if(n)return Rt(e,()=>o.current())},[e.join(","),n])}import{useEffect as Tn}from"react";var Tt=`
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
`;var At="next-api-debugger-styles";function Ht(){return Tn(()=>{if(typeof document=="undefined"||document.getElementById(At))return;let e=document.createElement("style");e.id=At,e.textContent=Tt,document.head.appendChild(e)},[]),null}import{useCallback as ye,useEffect as Mt,useRef as Je,useState as An}from"react";var It="apd-button-position",ke=56,Dt=5;function we(e){return typeof window=="undefined"?e:{x:Math.min(Math.max(8,e.x),window.innerWidth-ke-8),y:Math.min(Math.max(8,e.y),window.innerHeight-ke-8)}}function Hn(){return typeof window=="undefined"?{x:24,y:24}:{x:window.innerWidth-ke-24,y:window.innerHeight-ke-24}}function qt(e){let[t,n]=An(()=>{if(typeof window=="undefined")return e!=null?e:{x:24,y:24};try{let d=sessionStorage.getItem(It);if(d)return we(JSON.parse(d))}catch{}return we(e!=null?e:Hn())}),o=Je(!1),r=Je(!1),s=Je({pointerX:0,pointerY:0,posX:0,posY:0}),a=ye(d=>{o.current=!0,r.current=!1,s.current={pointerX:d.clientX,pointerY:d.clientY,posX:t.x,posY:t.y},d.currentTarget.setPointerCapture(d.pointerId)},[t.x,t.y]),i=ye(d=>{if(!o.current)return;let h=d.clientX-s.current.pointerX,g=d.clientY-s.current.pointerY;(Math.abs(h)>Dt||Math.abs(g)>Dt)&&(r.current=!0),n(we({x:s.current.posX+h,y:s.current.posY+g}))},[]),p=ye(()=>{o.current=!1},[]);Mt(()=>{try{sessionStorage.setItem(It,JSON.stringify(t))}catch{}},[t]),Mt(()=>{function d(){n(h=>we(h))}return window.addEventListener("resize",d),()=>window.removeEventListener("resize",d)},[]);let c=ye(()=>r.current,[]);return{position:t,onPointerDown:a,onPointerMove:i,onPointerUp:p,wasDragged:c}}import{jsx as Ke,jsxs as zt}from"react/jsx-runtime";function Bt({count:e,hasErrors:t,onOpen:n,initialPosition:o}){let{position:r,onPointerDown:s,onPointerMove:a,onPointerUp:i,wasDragged:p}=qt(o);return zt("button",{type:"button",className:"apd-btn",style:{left:r.x,top:r.y},onPointerDown:s,onPointerMove:a,onPointerUp:i,onClick:()=>{p()||n()},"aria-label":"Open API debugger",title:"API Debugger (drag to move)",children:[zt("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[Ke("polyline",{points:"16 18 22 12 16 6"}),Ke("polyline",{points:"8 6 2 12 8 18"})]}),e>0&&Ke("span",{className:N("apd-btn-dot",t&&"apd-has-errors"),children:e>99?"99+":e})]})}import{useEffect as Co,useMemo as fn,useState as oe}from"react";import{jsx as We,jsxs as $t}from"react/jsx-runtime";function Ye({value:e,onChange:t}){return $t("div",{className:"apd-search",children:[$t("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[We("circle",{cx:"11",cy:"11",r:"7"}),We("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]}),We("input",{type:"text",placeholder:"Filter by URL, endpoint, method or status code...",value:e,onChange:n=>t(n.target.value),spellCheck:!1})]})}import{Fragment as Mn,jsx as Ge,jsxs as In}from"react/jsx-runtime";function jt({status:e,onStatusChange:t,methods:n,activeMethods:o,onToggleMethod:r}){return In(Mn,{children:[Ge("button",{type:"button",className:N("apd-chip apd-chip-success",e==="success"&&"apd-active"),onClick:()=>t(e==="success"?"all":"success"),children:"Success"}),Ge("button",{type:"button",className:N("apd-chip apd-chip-failed",e==="failed"&&"apd-active"),onClick:()=>t(e==="failed"?"all":"failed"),children:"Failed"}),n.map(s=>Ge("button",{type:"button",className:N("apd-chip",o.includes(s)&&"apd-active"),onClick:()=>r(s),children:s},s))]})}import{jsx as X,jsxs as Ze}from"react/jsx-runtime";function Dn(e){return["GET","POST","PUT","PATCH","DELETE"].includes(e.toUpperCase())?`apd-method-${e.toUpperCase()}`:"apd-method-OTHER"}function Ot({log:e,selected:t,onSelect:n,onTogglePin:o}){var r;return Ze("div",{className:N("apd-item",t&&"apd-selected"),onClick:n,role:"button",tabIndex:0,onKeyDown:s=>s.key==="Enter"&&n(),children:[Ze("div",{className:"apd-item-row1",children:[X("span",{className:N("apd-method",Dn(e.method)),children:e.method}),X("span",{className:"apd-item-url",title:e.url,children:e.endpoint}),X("span",{className:N("apd-status-dot",e.success?"apd-ok":"apd-fail")}),e.pinned&&X("button",{type:"button",className:"apd-pin-star",onClick:s=>{s.stopPropagation(),o()},title:"Unpin","aria-label":"Unpin request",style:{background:"none",border:"none",cursor:"pointer",padding:0},children:"\u2605"})]}),Ze("div",{className:"apd-item-row2",children:[X("span",{children:(r=e.responseStatus)!=null?r:e.error?"ERR":"\u2014"}),X("span",{children:ge(e.duration)}),X("span",{children:G(e.timestamp)}),X("span",{style:{marginLeft:"auto",textTransform:"uppercase"},children:e.source})]})]})}import{jsx as Ee,jsxs as qn}from"react/jsx-runtime";function _t({logs:e,selectedId:t,onSelect:n,onTogglePin:o}){return e.length===0?Ee("div",{className:"apd-list",children:qn("div",{className:"apd-empty",children:["No requests captured yet.",Ee("br",{}),"Make an API call and it'll show up here."]})}):Ee("div",{className:"apd-list",children:e.map(r=>Ee(Ot,{log:r,selected:r.id===t,onSelect:()=>n(r.id),onTogglePin:()=>o(r.id)},r.id))})}import{Fragment as Xn,useState as Vn}from"react";import{useState as zn}from"react";import{jsxs as Bn}from"react/jsx-runtime";function Se({getText:e,label:t,icon:n}){let[o,r]=zn(!1);async function s(){await be(e())&&(r(!0),setTimeout(()=>r(!1),1200))}return Bn("button",{type:"button",className:N("apd-action-btn",o&&"apd-copied"),onClick:s,children:[n,o?"Copied":t]})}import{useEffect as Xt,useMemo as Un,useRef as Vt,useState as Jt}from"react";var $n=/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(\.\d+)?([eE][+-]?\d+)?)/g;function jn(e){return e.replace($n,t=>{let n="apd-json-num";return/^"/.test(t)?n=/:$/.test(t)?"apd-json-key":"apd-json-str":/true|false/.test(t)?n="apd-json-bool":/null/.test(t)&&(n="apd-json-null"),`<span class="${n}">${t}</span>`})}function On(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function _n(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Ut(e,t){if(e!=null&&typeof e=="object")return{content:JSON.stringify(e,null,2),isJson:!0};if(typeof e=="string")try{return{content:JSON.stringify(JSON.parse(e),null,2),isJson:!0}}catch{return{content:t!=null?t:e,isJson:!1}}return{content:t!=null?t:String(e!=null?e:""),isJson:!1}}function Ft(e,t,n){let o=On(e),r=0,s=o;if(n){let i=new RegExp(_n(n),"gi");s=o.replace(i,p=>(r+=1,`<mark class='apd-json-highlight'>${p}</mark>`))}return{html:t?jn(s):s,matchCount:r}}import{jsx as J,jsxs as Ne}from"react/jsx-runtime";function Le({value:e,raw:t,searchable:n=!0}){let[o,r]=Jt(""),[s,a]=Jt(0),i=Vt(null),p=Vt(""),{content:c,isJson:d}=Ut(e,t),h=o.trim(),{html:g,matchCount:y}=Un(()=>Ft(c,d,h),[c,d,h]);Xt(()=>{let l=h!==p.current;p.current=h,(l||s>=y)&&a(0)},[h,y]),Xt(()=>{var f;if(!i.current)return;let l=i.current.querySelectorAll("mark.apd-json-highlight");l.forEach((L,P)=>L.classList.toggle("apd-active",P===s)),(f=l[s])==null||f.scrollIntoView({block:"center",behavior:"smooth"})},[g,s]);function E(l){y!==0&&a(f=>(f+l+y)%y)}return Ne("div",{children:[n&&c.length>0&&Ne("div",{className:"apd-json-search",children:[Ne("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[J("circle",{cx:"11",cy:"11",r:"7"}),J("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]}),J("input",{type:"text",placeholder:"Find in payload...",value:o,onChange:l=>r(l.target.value),onKeyDown:l=>{l.key==="Enter"&&(l.preventDefault(),E(l.shiftKey?-1:1))},spellCheck:!1}),o&&J("span",{className:"apd-json-search-count",children:y>0?`${s+1} / ${y}`:"No matches"}),o&&y>0&&Ne("div",{className:"apd-json-search-nav",children:[J("button",{type:"button",onClick:()=>E(-1),"aria-label":"Previous match",title:"Previous match (Shift+Enter)",children:"\u2191"}),J("button",{type:"button",onClick:()=>E(1),"aria-label":"Next match",title:"Next match (Enter)",children:"\u2193"})]})]}),J("pre",{ref:i,className:"apd-json",dangerouslySetInnerHTML:{__html:g}})]})}function Ce(e){return`'${e.replace(/'/g,"'\\''")}'`}function Fn(e){let t=e.trim();if(!t||!(t.startsWith("{")||t.startsWith("[")))return!1;try{return JSON.parse(t),!0}catch{return!1}}function Qe(e){let t=[`curl -X ${e.method} ${Ce(e.url)}`],n=Object.keys(e.requestHeaders).some(o=>o.toLowerCase()==="content-type");for(let[o,r]of Object.entries(e.requestHeaders))/^(host|content-length|connection)$/i.test(o)||t.push(`  -H ${Ce(`${o}: ${r}`)}`);return e.requestBodyRaw&&(!n&&Fn(e.requestBodyRaw)&&t.push(`  -H ${Ce("Content-Type: application/json")}`),t.push(`  --data-raw ${Ce(e.requestBodyRaw)}`)),t.join(` \\
`)}import{jsx as m,jsxs as C}from"react/jsx-runtime";function ne({title:e,count:t,defaultOpen:n=!0,children:o}){let[r,s]=Vn(n);return C("div",{className:"apd-section",children:[C("div",{className:"apd-section-header",onClick:()=>s(a=>!a),children:[C("span",{children:[e,typeof t=="number"?` (${t})`:""]}),m("span",{children:r?"\u2212":"+"})]}),r&&m("div",{className:"apd-section-body",children:o})]})}function et({data:e}){let t=Object.entries(e);return t.length===0?m("div",{className:"apd-section-body apd-empty-body",children:"None"}):m("div",{className:"apd-kv",children:t.map(([n,o])=>C(Xn,{children:[m("div",{className:"apd-kv-key",children:n}),m("div",{className:"apd-kv-val",children:o})]},n))})}function Kt({log:e,onTogglePin:t}){var s,a,i,p,c;if(!e)return m("div",{className:"apd-detail",children:m("div",{className:"apd-detail-empty",children:"Select a request to see full details"})});let n=Qe(e),o=(a=(s=Y(e.requestBody))!=null?s:e.requestBodyRaw)!=null?a:"",r=(p=(i=Y(e.responseBody))!=null?i:e.responseBodyRaw)!=null?p:"";return C("div",{className:"apd-detail",children:[C("div",{className:"apd-detail-header",children:[C("div",{className:"apd-detail-url",children:[m("strong",{children:e.method})," ",e.url]}),m("button",{type:"button",className:"apd-action-btn",onClick:()=>t(e.id),title:e.pinned?"Unpin":"Pin this request",children:e.pinned?"\u2605 Pinned":"\u2606 Pin"})]}),C("div",{className:"apd-meta-grid",children:[C("div",{children:[m("div",{className:"apd-meta-label",children:"Status"}),C("div",{className:"apd-meta-value",style:{color:e.success?"var(--apd-success)":"var(--apd-error)"},children:[(c=e.responseStatus)!=null?c:"Failed"," ",e.responseStatusText]})]}),C("div",{children:[m("div",{className:"apd-meta-label",children:"Duration"}),m("div",{className:"apd-meta-value",children:ge(e.duration)})]}),C("div",{children:[m("div",{className:"apd-meta-label",children:"Time"}),m("div",{className:"apd-meta-value",children:G(e.timestamp)})]}),C("div",{children:[m("div",{className:"apd-meta-label",children:"Source"}),m("div",{className:"apd-meta-value",children:e.source})]}),C("div",{children:[m("div",{className:"apd-meta-label",children:"Req. size"}),m("div",{className:"apd-meta-value",children:ze(e.requestSize)})]}),C("div",{children:[m("div",{className:"apd-meta-label",children:"Res. size"}),m("div",{className:"apd-meta-value",children:ze(e.responseSize)})]})]}),e.error&&C("div",{className:"apd-section",style:{borderColor:"var(--apd-error)"},children:[m("div",{className:"apd-section-header",style:{color:"var(--apd-error)"},children:"Error"}),m("div",{className:"apd-section-body",children:e.error})]}),C("div",{className:"apd-actions",children:[m(Se,{label:"Copy cURL",getText:()=>n}),m(Se,{label:"Copy Request",getText:()=>o}),m(Se,{label:"Copy Response",getText:()=>r})]}),m(ne,{title:"cURL",children:m(Le,{value:n,searchable:!1})}),m(ne,{title:"Query Params",count:Object.keys(e.queryParams).length,defaultOpen:!1,children:m(et,{data:e.queryParams})}),m(ne,{title:"Request Headers",count:Object.keys(e.requestHeaders).length,defaultOpen:!1,children:m(et,{data:e.requestHeaders})}),m(ne,{title:"Request Body",children:e.requestBodyRaw?m(Le,{value:e.requestBody,raw:e.requestBodyRaw}):m("div",{className:"apd-empty-body",children:"No body"})}),m(ne,{title:"Response Headers",count:Object.keys(e.responseHeaders).length,defaultOpen:!1,children:m(et,{data:e.responseHeaders})}),m(ne,{title:"Response Body",children:e.responseBodyRaw?m(Le,{value:e.responseBody,raw:e.responseBodyRaw}):m("div",{className:"apd-empty-body",children:"No body"})})]})}import{useState as Jn}from"react";import{jsx as q,jsxs as Re}from"react/jsx-runtime";var Kn={log:"\u25B8",info:"\u2139",warn:"\u26A0",error:"\u2715",debug:"\u2699"};function Wn({entry:e}){var o;let[t,n]=Jn(!1);return Re("div",{className:`apd-console-item apd-console-${e.level}`,children:[q("span",{className:"apd-console-icon",children:(o=Kn[e.level])!=null?o:"\u25B8"}),Re("div",{className:"apd-console-body",children:[q("div",{className:"apd-console-preview",children:e.preview||"(empty)"}),Re("div",{className:"apd-console-meta",children:[q("span",{children:G(e.timestamp)}),e.source!=="console"&&q("span",{children:e.source}),e.stack&&q("button",{type:"button",className:"apd-console-toggle-stack",onClick:()=>n(r=>!r),children:t?"Hide stack trace":"Show stack trace"})]}),t&&e.stack&&q("div",{className:"apd-console-stack",children:e.stack})]}),e.count>1&&q("span",{className:"apd-console-count",children:e.count})]})}function Wt({entries:e}){return e.length===0?q("div",{className:"apd-console-list",children:Re("div",{className:"apd-empty",children:["Nothing logged yet.",q("br",{}),"console.log/warn/error and uncaught errors will show up here."]})}):q("div",{className:"apd-console-list",children:e.map(t=>q(Wn,{entry:t},t.id))})}import{useEffect as Eo,useRef as ln,useState as Ae}from"react";var fe="data-apd-source";function Yn(e){let t=e.getAttribute(fe);if(!t)return null;let n=t.match(/^(.*):(\d+):(\d+)$/);return n?{file:n[1],line:Number(n[2]),column:Number(n[3]),confidence:"exact",origin:"build-plugin"}:{file:t,confidence:"exact",origin:"build-plugin"}}function tt(e){let t=Object.keys(e).find(n=>n.startsWith("__reactFiber$")||n.startsWith("__reactInternalInstance$"));return t?e[t]:null}function Gn(e){let t=tt(e);for(;t;){let n=t._debugSource;if(n&&n.fileName)return{file:n.fileName,line:typeof n.lineNumber=="number"?n.lineNumber:void 0,column:typeof n.columnNumber=="number"?n.columnNumber:void 0,confidence:"exact",origin:"react"};t=t.return}return null}function Zn(e){let t=tt(e);for(;t;){let n=t.type;if(typeof n=="function"&&n.name)return n.name;if(n&&typeof n=="object"&&n.displayName)return n.displayName;t=t.return}return null}function Yt(e){return e.__vueParentComponent?{version:3,inst:e.__vueParentComponent}:e.__vue__?{version:2,inst:e.__vue__}:null}function Qn(e){var n,o;let t=e;for(;t;){let r=Yt(t);if(r){let s=r.version===3?(n=r.inst.type)==null?void 0:n.__file:(o=r.inst.$options)==null?void 0:o.__file;if(s)return{file:s,confidence:"exact",origin:"vue"}}t=t.parentElement}return null}function eo(e){var n,o,r,s;let t=e;for(;t;){let a=Yt(t);if(a){let i=a.version===3?((n=a.inst.type)==null?void 0:n.__name)||((o=a.inst.type)==null?void 0:o.name):((r=a.inst.$options)==null?void 0:r.name)||((s=a.inst.$options)==null?void 0:s._componentTag);if(i)return i}t=t.parentElement}return null}function to(e){var n,o;let t=window.ng;if(!(t!=null&&t.getComponent))return null;try{let r=t.getComponent(e);return(o=(n=r==null?void 0:r.constructor)==null?void 0:n.name)!=null?o:null}catch{return null}}var no=/(?:\()?(https?:\/\/[^\s)]+|\/[^\s)]+|[A-Za-z]:\\[^\s)]+):(\d+):(\d+)\)?/;function oo(e){return/next-api-debugger|core\/inspector\/|node_modules/.test(e)}function ro(e){let t=yt(e);if(!(t!=null&&t.stack))return null;let n=t.stack.split(`
`).slice(1);for(let o of n){if(oo(o))continue;let r=o.match(no);if(r)return{file:r[1],line:Number(r[2]),column:Number(r[3]),confidence:"approximate",origin:"stack-trace"}}return null}var me;async function ao(){if(me!==void 0)return me;try{me=await(await fetch(location.href,{cache:"force-cache"})).text()}catch{me=null}return me}function so(e){if(e.id)return`id="${e.id}"`;for(let t of["data-testid","name"]){let n=e.getAttribute(t);if(n)return`${t}="${n}"`}return e.className&&typeof e.className=="string"?`class="${e.className}"`:null}async function io(e){let t=location.pathname||"/",n=await ao();if(n){let o=so(e);if(o){let r=n.indexOf(o);if(r!==-1){let s=n.slice(0,r).split(`
`).length;return{file:t,line:s,confidence:"approximate",origin:"plain-html"}}}}return{file:t,confidence:"approximate",origin:"plain-html"}}function nt(e){let t=Yn(e);if(t)return t;let n=Gn(e);if(n)return n;let o=Qn(e);return o||ro(e)}async function Gt(e){let t=nt(e);return t||(tt(e)?null:io(e))}function Pe(e){var t,n;return(n=(t=Zn(e))!=null?t:eo(e))!=null?n:to(e)}var po=["display","position","top","right","bottom","left","width","height","color","background-color","font-family","font-size","font-weight","line-height","text-align","flex-direction","justify-content","align-items","gap","grid-template-columns","grid-template-rows","z-index","opacity","overflow","box-sizing","cursor"];function H(e){let t=parseFloat(e);return Number.isFinite(t)?t:0}function lo(e){return{margin:{top:H(e.marginTop),right:H(e.marginRight),bottom:H(e.marginBottom),left:H(e.marginLeft)},border:{top:H(e.borderTopWidth),right:H(e.borderRightWidth),bottom:H(e.borderBottomWidth),left:H(e.borderLeftWidth)},padding:{top:H(e.paddingTop),right:H(e.paddingRight),bottom:H(e.paddingBottom),left:H(e.paddingLeft)},content:{width:H(e.width),height:H(e.height)}}}function co(e){let t=[],n=e.parentElement;for(;n&&n.tagName.toLowerCase()!=="html";)t.push({tag:n.tagName.toLowerCase(),id:n.id||null,classes:Array.from(n.classList)}),n=n.parentElement;return t}async function Zt(e){let t=getComputedStyle(e),n=e.getBoundingClientRect(),o={};Array.from(e.attributes).forEach(i=>{i.name!==fe&&(o[i.name]=i.value)});let r={};po.forEach(i=>{r[i]=t.getPropertyValue(i)});let a=e.children.length===0&&(e.textContent||"").trim().slice(0,120)||null;return{tag:e.tagName.toLowerCase(),id:e.id||null,classes:Array.from(e.classList),attributes:o,rect:{x:n.x,y:n.y,width:n.width,height:n.height},box:lo(t),computedStyles:r,ancestors:co(e),childCount:e.children.length,textPreview:a,componentName:Pe(e),source:await Gt(e)}}var Qt=3;function ot(e,t){if(e!=null){if(typeof e=="string"){t(e);return}if(typeof e=="number"||typeof e=="boolean"){t(String(e));return}if(Array.isArray(e)){e.forEach(n=>ot(n,t));return}typeof e=="object"&&Object.values(e).forEach(n=>ot(n,t))}}function en(e){let t=new Map;for(let n of e)ot(n.responseBody,o=>{let r=o.trim();r.length<Qt||t.has(r)||t.set(r,{log:n})});return t}function tn(e,t){for(let n of e){let o=n.trim();if(o.length<Qt)continue;let r=t.get(o);if(r)return{kind:"api",endpoint:r.log.endpoint,method:r.log.method,matchedValue:o}}return e.some(n=>n.trim().length>0)?{kind:"static"}:{kind:"unknown"}}var uo=8,rt=40,mo=20,fo=["src","href","alt","title","value","placeholder"];function go(e){let t={};return Array.from(e.attributes).forEach(n=>{n.name!==fe&&(t[n.name]=n.value)}),t}function ho(e){let t=[],n=Array.from(e.childNodes).filter(o=>o.nodeType===Node.TEXT_NODE).map(o=>(o.textContent||"").trim()).filter(Boolean).join(" ");n&&t.push(n);for(let o of fo){let r=e.getAttribute(o);r&&t.push(r)}return t}function nn(e,t,n,o,r){return{tag:e.tagName.toLowerCase(),id:e.id||null,classes:Array.from(e.classList),attributes:go(e),componentName:Pe(e),source:nt(e),dataSource:tn(ho(e),t),textPreview:o&&(e.textContent||"").trim().slice(0,80)||null,children:n,truncatedChildCount:r}}function on(e,t,n){let o=Array.from(e.children),r=o.slice(0,rt),s=n<uo?r.map(i=>on(i,t,n+1)):[],a=o.length>rt?o.length-rt:void 0;return nn(e,t,s,e.children.length===0,a)}function bo(e){let t=[],n=e.parentElement;for(;n&&n.tagName.toLowerCase()!=="html"&&t.length<mo;)t.push(n),n=n.parentElement;return t.reverse()}function rn(e,t){let n=en(t),o={...on(e,n,0),isSelected:!0},r=bo(e),s=o;for(let a=r.length-1;a>=0;a--)s={...nn(r[a],n,[s],!1),isAncestorPath:!0};return s}function xo(e){return!!(e!=null&&e.closest(".apd-root"))}function an(e,t,n){let o=!0;function r(c){let d=document.elementFromPoint(c.clientX,c.clientY);return xo(d)?null:d}function s(c){o&&(t==null||t(r(c)))}function a(c){if(!o)return;let d=r(c);d&&(c.preventDefault(),c.stopPropagation(),p(),e(d))}function i(c){c.key==="Escape"&&(p(),n==null||n())}function p(){o=!1,window.removeEventListener("mousemove",s,!0),window.removeEventListener("click",a,!0),window.removeEventListener("keydown",i,!0)}return window.addEventListener("mousemove",s,!0),window.addEventListener("click",a,!0),window.addEventListener("keydown",i,!0),{cancel:()=>{p(),n==null||n()}}}function sn(){let e=document.createElement("div");e.className="apd-inspect-highlight",e.style.display="none";function t(o){e.style.display="",e.style.left=`${o.left}px`,e.style.top=`${o.top}px`,e.style.width=`${o.width}px`,e.style.height=`${o.height}px`}function n(){e.style.display="none"}return{el:e,show:t,hide:n}}function Te(e,t){var i,p;if(!t||e.origin==="plain-html")return null;let n=t.replace(/\\/g,"/").replace(/\/+$/,""),o=e.file.replace(/\\/g,"/").replace(/^\.\//,"");if(!n||!/^(?:\/|[A-Za-z]:\/)/.test(n)||/^[a-z][a-z\d+.-]*:\/\//i.test(o)||o.split("/").includes("..")||!/\.(?:[cm]?[jt]sx?|vue|svelte|astro|html?|mdx|php)$/i.test(o))return null;let r=/^(?:\/|[A-Za-z]:\/)/.test(o),s=r?o:`${n}/${o}`;return r&&s!==n&&!s.startsWith(`${n}/`)?null:`vscode://file/${encodeURI(s).replace(/#/g,"%23").replace(/\?/g,"%3F")}:${(i=e.line)!=null?i:1}:${(p=e.column)!=null?p:1}`}import{useState as vo}from"react";import{jsx as I,jsxs as V}from"react/jsx-runtime";var yo=3;function wo({info:e}){return e.kind==="unknown"?null:e.kind==="api"?I("span",{className:"apd-datasource-badge apd-datasource-api",title:`Matches a value from a captured response: ${e.method} ${e.endpoint}`,children:"API"}):I("span",{className:"apd-datasource-badge apd-datasource-static",title:"No matching value found in any captured API response this session \u2014 may be hardcoded, or fetched server-side before the page loaded",children:"STATIC"})}function ko({node:e}){return V("span",{className:e.isSelected?"apd-tree-tag apd-tree-selected-tag":"apd-tree-tag",children:["<",e.tag,e.id&&V("span",{className:"apd-tree-id",children:[' id="',e.id,'"']}),e.classes.length>0&&V("span",{className:"apd-tree-class",children:[' class="',e.classes.join(" "),'"']}),">"]})}function dn({node:e,editorProjectRoot:t,prefix:n,connector:o,depthFromSelected:r}){let[s,a]=vo(e.isSelected||e.isAncestorPath||r<yo),i=e.children.length>0,p=n+(o===""?"":o==="\u2514\u2500\u2500 "?"    ":"\u2502   "),c=e.isSelected?0:r<0?-1:r+1,d=e.source?Te(e.source,t):null,h=e.source?`${e.source.file}${e.source.line?`:${e.source.line}`:""}`:"";return V("div",{className:"apd-tree-node",children:[V("div",{className:i?`apd-tree-row apd-tree-clickable${e.isSelected?" apd-tree-selected-row":""}`:`apd-tree-row${e.isSelected?" apd-tree-selected-row":""}`,onClick:()=>i&&a(g=>!g),children:[V("span",{className:"apd-tree-prefix",children:[n,o]}),i?I("span",{className:"apd-tree-toggle",children:s?"\u25BE":"\u25B8"}):I("span",{className:"apd-tree-toggle apd-tree-toggle-leaf",children:"\u2022"}),I(ko,{node:e}),e.isSelected&&I("span",{className:"apd-tree-selected-label",children:"\u2190 Selected"}),e.componentName&&I("span",{className:"apd-tree-component",children:e.componentName}),I(wo,{info:e.dataSource}),d?I("a",{className:"apd-tree-source apd-tree-source-link",href:d,title:"Open in VS Code",onClick:g=>g.stopPropagation(),children:h}):e.source?I("span",{className:"apd-tree-source",children:h}):null]}),s&&i&&V("div",{children:[e.children.map((g,y)=>{let E=y===e.children.length-1;return I(dn,{node:g,editorProjectRoot:t,prefix:p,connector:E?"\u2514\u2500\u2500 ":"\u251C\u2500\u2500 ",depthFromSelected:c},y)}),typeof e.truncatedChildCount=="number"&&V("div",{className:"apd-tree-truncated",children:[p,"+",e.truncatedChildCount," more not shown"]})]})]})}function pn({root:e,editorProjectRoot:t}){return I("div",{className:"apd-tree",children:I(dn,{node:e,editorProjectRoot:t,prefix:"",connector:"",depthFromSelected:-1})})}import{jsx as u,jsxs as b}from"react/jsx-runtime";function cn({data:e}){let t=Object.entries(e).filter(([,n])=>n!=="");return t.length===0?u("div",{className:"apd-empty-body",children:"None"}):u("div",{className:"apd-kv",children:t.map(([n,o])=>b("div",{style:{display:"contents"},children:[u("div",{className:"apd-kv-key",children:n}),u("div",{className:"apd-kv-val",children:o})]},n))})}function So({info:e}){let{box:t}=e;return u("div",{className:"apd-box-model",children:b("div",{className:"apd-box-layer apd-box-layer-margin",children:[u("span",{className:"apd-box-label apd-box-label-top",children:t.margin.top}),u("span",{className:"apd-box-label apd-box-label-right",children:t.margin.right}),u("span",{className:"apd-box-label apd-box-label-bottom",children:t.margin.bottom}),u("span",{className:"apd-box-label apd-box-label-left",children:t.margin.left}),b("div",{className:"apd-box-layer apd-box-layer-border",children:[u("span",{className:"apd-box-label apd-box-label-top",children:t.border.top}),u("span",{className:"apd-box-label apd-box-label-right",children:t.border.right}),u("span",{className:"apd-box-label apd-box-label-bottom",children:t.border.bottom}),u("span",{className:"apd-box-label apd-box-label-left",children:t.border.left}),b("div",{className:"apd-box-layer apd-box-layer-padding",children:[u("span",{className:"apd-box-label apd-box-label-top",children:t.padding.top}),u("span",{className:"apd-box-label apd-box-label-right",children:t.padding.right}),u("span",{className:"apd-box-label apd-box-label-bottom",children:t.padding.bottom}),u("span",{className:"apd-box-label apd-box-label-left",children:t.padding.left}),b("div",{className:"apd-box-layer-content",children:[Math.round(t.content.width)," \xD7 ",Math.round(t.content.height)]})]})]})]})})}function No({info:e,editorProjectRoot:t}){let{source:n,componentName:o}=e;if(!n)return b("div",{className:"apd-source-card",children:[o&&b("div",{children:["Component: ",u("strong",{children:o})]}),u("div",{className:"apd-source-none",children:"Source file unavailable. For React/Next.js, enable the Babel source plugin for exact JSX paths."})]});let r=n.line?`${n.file}:${n.line}${n.column?`:${n.column}`:""}`:n.file,s=n.origin==="plain-html"?`Rendered page: ${r}`:r,a=Te(n,t);return b("div",{className:"apd-source-card",children:[o&&b("div",{style:{fontSize:11,color:"var(--apd-text-dim)",marginBottom:4},children:["Component: ",u("strong",{style:{color:"var(--apd-text)"},children:o})]}),a?u("a",{className:"apd-source-path",href:a,title:"Open in VS Code",children:s}):u("span",{className:"apd-source-path apd-source-path-plain",children:s}),b("div",{className:"apd-source-meta",children:[u("span",{className:`apd-confidence-badge apd-confidence-${n.confidence}`,children:n.confidence}),b("span",{children:["via ",n.origin]}),!a&&n.origin!=="plain-html"&&u("button",{type:"button",className:"apd-console-toggle-stack",onClick:()=>be(s),style:{marginLeft:"auto"},children:"Copy path"})]})]})}function un({onInspectingChange:e,editorProjectRoot:t}){let[n,o]=Ae(!1),[r,s]=Ae(!1),[a,i]=Ae(null),[p,c]=Ae(null),d=ln(null),h=ln(null);Eo(()=>()=>{var l,f;(l=d.current)==null||l.cancel(),(f=h.current)==null||f.el.remove()},[]);function g(){var l,f;(l=h.current)==null||l.hide(),(f=h.current)==null||f.el.remove(),h.current=null}function y(){o(!0),e(!0);let l=sn();document.body.appendChild(l.el),h.current=l,d.current=an(async f=>{g(),o(!1),e(!1),s(!0);let L=await Zt(f);i(L),c(rn(f,S.getLogs())),s(!1)},f=>{f?l.show(f.getBoundingClientRect()):l.hide()},()=>{g(),o(!1),e(!1)})}function E(){var l;(l=d.current)==null||l.cancel()}return a?b("div",{className:"apd-inspector-body",children:[b("div",{style:{display:"flex",alignItems:"flex-start",gap:10,marginBottom:12},children:[b("div",{style:{flex:1},children:[b("div",{className:"apd-inspector-tag",children:["<",a.tag,a.id&&b("span",{className:"apd-tag-id",children:[" #",a.id]}),a.classes.map(l=>b("span",{className:"apd-tag-class",children:[" ",".",l]},l)),">"]}),a.textPreview&&b("div",{style:{fontSize:11.5,color:"var(--apd-text-dim)",fontFamily:"var(--apd-mono)"},children:['"',a.textPreview,'"']})]}),u("button",{type:"button",className:"apd-action-btn",onClick:y,children:"\u2316 Inspect another"})]}),a.ancestors.length>0&&b("div",{className:"apd-inspector-breadcrumb",children:[[...a.ancestors].reverse().map((l,f)=>b("span",{children:[l.tag,l.id?`#${l.id}`:""]},f)),u("span",{style:{color:"var(--apd-accent)"},children:a.tag})]}),u(No,{info:a,editorProjectRoot:t}),b("div",{className:"apd-meta-grid",children:[b("div",{children:[u("div",{className:"apd-meta-label",children:"Position"}),b("div",{className:"apd-meta-value",children:[Math.round(a.rect.x),", ",Math.round(a.rect.y)]})]}),b("div",{children:[u("div",{className:"apd-meta-label",children:"Size"}),b("div",{className:"apd-meta-value",children:[Math.round(a.rect.width)," \xD7 ",Math.round(a.rect.height)]})]}),b("div",{children:[u("div",{className:"apd-meta-label",children:"Children"}),u("div",{className:"apd-meta-value",children:a.childCount})]})]}),b("div",{className:"apd-section",children:[u("div",{className:"apd-section-header",children:"Box Model"}),u("div",{className:"apd-section-body",children:u(So,{info:a})})]}),b("div",{className:"apd-section",children:[b("div",{className:"apd-section-header",children:["Attributes (",Object.keys(a.attributes).length,")"]}),u("div",{className:"apd-section-body",children:u(cn,{data:a.attributes})})]}),b("div",{className:"apd-section",children:[u("div",{className:"apd-section-header",children:"Computed Styles"}),u("div",{className:"apd-section-body",children:u(cn,{data:a.computedStyles})})]}),p&&b("div",{className:"apd-section",children:[b("div",{className:"apd-section-header",children:["Element Tree",b("span",{style:{fontWeight:400,color:"var(--apd-text-faint)",fontSize:10.5},children:[" ","\u2014 structure, source, and data origin for this element and its descendants"]})]}),u("div",{className:"apd-section-body",children:u(pn,{root:p,editorProjectRoot:t})})]})]}):b("div",{className:"apd-inspector-empty",children:[u("button",{type:"button",className:`apd-inspect-start-btn${n?" apd-inspecting":""}`,onClick:n?E:y,children:n?"\u25FC Stop Inspecting (Esc)":"\u2316 Start Inspecting"}),u("p",{children:n?"Hover any element on the page and click to select it.":r?"Resolving source location\u2026":"Pick any element on the page to see its DOM details, computed styles, and \u2014 when available \u2014 the exact source file responsible for it."})]})}function mn(e){return Object.entries(e).map(([t,n])=>({name:t,value:n}))}function Lo(e){return Object.entries(e).map(([t,n])=>({name:t,value:n}))}function at(e){return{log:{version:"1.2",creator:{name:"next-api-debugger",version:"0.1.0"},entries:e.map(t=>{var n,o;return{startedDateTime:new Date(t.timestamp).toISOString(),time:t.duration,request:{method:t.method,url:t.url,httpVersion:"HTTP/1.1",headers:mn(t.requestHeaders),queryString:Lo(t.queryParams),cookies:[],headersSize:-1,bodySize:t.requestSize,postData:t.requestBodyRaw?{mimeType:t.requestHeaders["content-type"]||"application/json",text:t.requestBodyRaw}:void 0},response:{status:(n=t.responseStatus)!=null?n:0,statusText:t.responseStatusText,httpVersion:"HTTP/1.1",headers:mn(t.responseHeaders),cookies:[],content:{size:t.responseSize,mimeType:t.responseHeaders["content-type"]||"application/json",text:(o=t.responseBodyRaw)!=null?o:""},redirectURL:"",headersSize:-1,bodySize:t.responseSize},cache:{},timings:{send:0,wait:t.duration,receive:0}}})}}}function st(e,t){let n=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),o=URL.createObjectURL(n),r=document.createElement("a");r.href=o,r.download=e,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(o)}import{Fragment as it,jsx as v,jsxs as M}from"react/jsx-runtime";var Ro=["GET","POST","PUT","PATCH","DELETE"],Po=["log","info","warn","error","debug"];function gn({logs:e,consoleEntries:t,onClose:n,onClear:o,onClearConsole:r,onTogglePin:s,theme:a,onToggleTheme:i,inspectorEnabled:p,editorProjectRoot:c}){var A,lt,ct;let[d,h]=oe("network"),[g,y]=oe({search:"",status:"all",methods:[]}),[E,l]=oe(null),[f,L]=oe(!1),[P,w]=oe(""),[T,_]=oe([]);Co(()=>{!E&&e.length>0&&l(e[0].id)},[e,E]);let R=fn(()=>{let x=g.search.trim().toLowerCase();return e.filter(k=>{var W;return!(g.status==="success"&&!k.success||g.status==="failed"&&k.success||g.methods.length>0&&!g.methods.includes(k.method)||x&&!`${k.url} ${k.endpoint} ${k.method} ${(W=k.responseStatus)!=null?W:""}`.toLowerCase().includes(x))})},[e,g]),K=fn(()=>{let x=P.trim().toLowerCase();return t.filter(k=>!(T.length>0&&!T.includes(k.level)||x&&!k.preview.toLowerCase().includes(x)))},[t,P,T]),B=(lt=(A=R.find(x=>x.id===E))!=null?A:R[0])!=null?lt:null,z=e.filter(x=>!x.success).length,re=t.filter(x=>x.level==="error").length;function Me(x){y(k=>({...k,methods:k.methods.includes(x)?k.methods.filter(W=>W!==x):[...k.methods,x]}))}function Ie(x){_(k=>k.includes(x)?k.filter(W=>W!==x):[...k,x])}let ae=d==="network"?`${e.length} requests${z>0?` \xB7 ${z} failed`:""}`:d==="console"?`${t.length} logs${re>0?` \xB7 ${re} errors`:""}`:"element picker";return v("div",{className:N("apd-overlay",f&&"apd-overlay-passthrough"),onClick:n,children:M("div",{className:`apd-modal${f?" apd-minimized":""}`,onClick:x=>x.stopPropagation(),children:[M("div",{className:"apd-header",children:[M("div",{className:"apd-header-title",children:[v("span",{className:"apd-live-dot"}),"API Debugger"]}),v("span",{className:"apd-header-count",children:ae}),v("div",{className:"apd-spacer"}),v("button",{className:"apd-icon-btn",onClick:i,title:"Toggle theme",type:"button",children:a==="light"?"\u2600":"\u263E"}),d==="network"&&M(it,{children:[v("button",{className:"apd-icon-btn",title:"Export JSON",type:"button",onClick:()=>st(`api-logs-${Date.now()}.json`,e),children:"\u2B73"}),v("button",{className:"apd-icon-btn",title:"Export HAR",type:"button",onClick:()=>st(`api-logs-${Date.now()}.har`,at(e)),children:"HAR"})]}),d!=="inspector"&&v("button",{className:"apd-icon-btn",title:d==="network"?"Clear logs":"Clear console",type:"button",onClick:d==="network"?o:r,children:"\u{1F5D1}"}),v("button",{className:"apd-icon-btn",title:f?"Restore":"Minimize",type:"button",onClick:()=>L(x=>!x),children:f?"\u25A2":"\u2014"}),v("button",{className:"apd-icon-btn",title:"Close",type:"button",onClick:n,children:"\u2715"})]}),!f&&M("div",{className:"apd-tabs",children:[M("button",{type:"button",className:N("apd-tab",d==="network"&&"apd-active"),onClick:()=>h("network"),children:["Network",e.length>0&&v("span",{className:N("apd-tab-badge",z>0&&"apd-tab-badge-error"),children:e.length})]}),M("button",{type:"button",className:N("apd-tab",d==="console"&&"apd-active"),onClick:()=>h("console"),children:["Console",t.length>0&&v("span",{className:N("apd-tab-badge",re>0&&"apd-tab-badge-error"),children:t.length})]}),p&&v("button",{type:"button",className:N("apd-tab",d==="inspector"&&"apd-active"),onClick:()=>h("inspector"),children:"Inspector"})]}),!f&&d==="network"&&M(it,{children:[M("div",{className:"apd-toolbar",children:[v(Ye,{value:g.search,onChange:x=>y(k=>({...k,search:x}))}),v(jt,{status:g.status,onStatusChange:x=>y(k=>({...k,status:x})),methods:Ro,activeMethods:g.methods,onToggleMethod:Me})]}),M("div",{className:"apd-body",children:[v(_t,{logs:R,selectedId:(ct=B==null?void 0:B.id)!=null?ct:null,onSelect:l,onTogglePin:s}),v(Kt,{log:B,onTogglePin:s})]})]}),!f&&d==="console"&&M(it,{children:[M("div",{className:"apd-toolbar",children:[v(Ye,{value:P,onChange:w}),Po.map(x=>v("button",{type:"button",className:N("apd-chip",T.includes(x)&&"apd-active"),onClick:()=>Ie(x),children:x},x))]}),v(Wt,{entries:K})]}),p&&v("div",{style:{display:!f&&d==="inspector"?"flex":"none",flexDirection:"column",flex:1,overflow:"hidden"},children:v(un,{onInspectingChange:L,editorProjectRoot:c})}),!f&&M("div",{className:"apd-footer",children:[M("span",{children:[v("span",{className:"apd-kbd",children:"Ctrl"}),"+",v("span",{className:"apd-kbd",children:"Shift"}),"+",v("span",{className:"apd-kbd",children:"D"})," to toggle \xB7 ",v("span",{className:"apd-kbd",children:"Space"}),"+",v("span",{className:"apd-kbd",children:"H"})," to hide"]}),v("span",{style:{marginLeft:"auto"},children:"next-api-debugger \xB7 dev only"})]})]})})}import{jsx as pt,jsxs as Ho}from"react/jsx-runtime";function To(e){return typeof e=="boolean"?e:process.env.NODE_ENV!=="production"}function Ao(e){let{enabled:t,maxLogs:n=200,initialPosition:o,axiosInstance:r,theme:s="dark",keyboardShortcut:a=!0,activationSequence:i,ignoreUrls:p,serverLogsUrl:c,inspector:d=!0,editorProjectRoot:h}=e,g=To(t),[y,E]=He(!i),l=g&&y,[f,L]=He(!1),[P,w]=He(!1),[T,_]=He(s),{logs:R,clear:K,togglePin:B}=Et(),{entries:z,clear:re}=St();if(dt(()=>E(!i),[i]),dt(()=>{if(!l||typeof window=="undefined")return;S.setMaxLogs(n),D.setMaxEntries(500),Be({ignoreUrls:c?[...p!=null?p:[],c]:p}),ut({ignoreUrls:p}),ht(),d&&xt();let A=r?je(r,{ignoreUrls:p}):()=>{};return()=>{$e(),mt(),bt(),d&&vt(),A()}},[l,d,c]),dt(()=>{if(!(!l||!c||typeof window=="undefined"))return wt(c)},[l,c]),Ct(i,()=>{E(!0),L(A=>!A)},g&&a),Nt({ctrl:!0,shift:!0,key:"d"},()=>L(A=>!A),l&&a),Pt(["space","h"],()=>{w(A=>!A),L(!1)},l&&a),!l)return null;let Me=R.filter(A=>!A.success).length,Ie=z.filter(A=>A.level==="error").length,ae=T==="system"?"dark":T;return Ho("div",{className:`apd-root${ae==="light"?" apd-light":""}`,children:[pt(Ht,{}),!P&&!f&&pt(Bt,{count:R.length+z.length,hasErrors:Me>0||Ie>0,onOpen:()=>L(!0),initialPosition:o}),!P&&f&&pt(gn,{logs:R,consoleEntries:z,onClose:()=>L(!1),onClear:K,onClearConsole:re,onTogglePin:B,theme:ae,onToggleTheme:()=>_(ae==="light"?"dark":"light"),inspectorEnabled:d,editorProjectRoot:h})]})}export{Ao as ApiDebugger,at as exportAsHar,Qe as generateCurl,je as installAxiosInterceptor,Be as installFetchInterceptor,S as logStore,$e as uninstallFetchInterceptor};
//# sourceMappingURL=index.mjs.map