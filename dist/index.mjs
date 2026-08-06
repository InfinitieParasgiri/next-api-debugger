'use client';
import{useEffect as po,useState as De}from"react";var be=class{constructor(){this.logs=[];this.listeners=new Set;this.maxLogs=200;this.snapshot=[];this.getLogs=()=>(this.snapshot=this.logs,this.snapshot);this.subscribe=t=>(this.listeners.add(t),()=>this.listeners.delete(t))}setMaxLogs(t){this.maxLogs=Math.max(1,t),this.trim()}addLog(t){this.logs=[t,...this.logs],this.trim(),this.emit()}togglePin(t){this.logs=this.logs.map(o=>o.id===t?{...o,pinned:!o.pinned}:o),this.emit()}clear(){this.logs=[],this.emit()}trim(){if(this.logs.length<=this.maxLogs)return;let t=this.logs.filter(a=>a.pinned),r=this.logs.filter(a=>!a.pinned).slice(0,Math.max(0,this.maxLogs-t.length)),n=[...t,...r];n.sort((a,s)=>s.timestamp-a.timestamp),this.logs=n}emit(){this.listeners.forEach(t=>t())}},C=new be;var xe=class{constructor(){this.entries=[];this.listeners=new Set;this.maxEntries=500;this.getEntries=()=>this.entries;this.subscribe=t=>(this.listeners.add(t),()=>this.listeners.delete(t))}setMaxEntries(t){this.maxEntries=Math.max(1,t),this.trim()}addEntry(t){let o=this.entries[0];o&&o.level===t.level&&o.preview===t.preview&&o.stack===t.stack?this.entries=[{...o,count:o.count+1,timestamp:t.timestamp},...this.entries.slice(1)]:this.entries=[t,...this.entries],this.trim(),this.emit()}clear(){this.entries=[],this.emit()}trim(){this.entries.length>this.maxEntries&&(this.entries=this.entries.slice(0,this.maxEntries))}emit(){this.listeners.forEach(t=>t())}},T=new xe;var M="x-apd-skip";function A(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,9)}`}function D(e){if(!e)return null;try{return JSON.parse(e)}catch{return e}}function F(e){if(e==null)return null;if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return String(e)}}function B(e){if(!e)return 0;try{return new Blob([e]).size}catch{return e.length}}function ve(e){if(!e)return"0 B";let t=["B","KB","MB","GB"],o=Math.min(t.length-1,Math.floor(Math.log(e)/Math.log(1024))),r=e/Math.pow(1024,o);return`${o===0?r:r.toFixed(1)} ${t[o]}`}function re(e){return e<1e3?`${e} ms`:`${(e/1e3).toFixed(2)} s`}function X(e){let t=new Date(e);return t.toLocaleTimeString(void 0,{hour12:!1})+`.${String(t.getMilliseconds()).padStart(3,"0")}`}function J(e){try{let t=typeof window!="undefined"?window.location.origin:"http://localhost",o=new URL(e,t),r={};return o.searchParams.forEach((n,a)=>{r[a]=n}),{endpoint:o.pathname,queryParams:r}}catch{return{endpoint:e,queryParams:{}}}}function ne(e){let t={};return e&&e.forEach((o,r)=>{t[r]=o}),t}function G(e){let t={};if(!e)return t;if(typeof e.toJSON=="function")return{...e.toJSON()};if(e instanceof Headers)return ne(e);if(typeof e=="object")for(let[o,r]of Object.entries(e))r!=null&&(t[o]=String(r));return t}function _(e,t){return!t||t.length===0?!1:t.some(o=>o instanceof RegExp?o.test(e):e.includes(o))}function w(...e){return e.filter(Boolean).join(" ")}async function Ue(e){try{if(navigator.clipboard&&window.isSecureContext)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select();let o=document.execCommand("copy");return document.body.removeChild(t),o}catch{return!1}}var z=null,ae=!1;function Lt(e){if(e==null)return null;if(typeof e=="string")return e;if(e instanceof URLSearchParams)return e.toString();if(e instanceof FormData){let t=[];return e.forEach((o,r)=>{t.push(`${r}=${o instanceof File?`[File: ${o.name}]`:o}`)}),t.join("&")}return"[binary data]"}function ye(e={}){ae||typeof window=="undefined"||typeof window.fetch!="function"||(z=window.fetch.bind(window),ae=!0,window.fetch=async function(o,r){var L,g,y,H,k;let n=o instanceof Request?o:null,a=n?n.url:String(o);if(_(a,e.ignoreUrls))return z(o,r);let s=ne(new Headers((g=(L=r==null?void 0:r.headers)!=null?L:n==null?void 0:n.headers)!=null?g:void 0));if(s[M]){let h=new Headers((H=(y=r==null?void 0:r.headers)!=null?y:n==null?void 0:n.headers)!=null?H:void 0);return h.delete(M),n?z(new Request(n,{headers:h})):z(o,{...r,headers:h})}let i=Date.now(),p=performance.now(),m=((r==null?void 0:r.method)||(n==null?void 0:n.method)||"GET").toUpperCase(),{endpoint:d,queryParams:u}=J(a),v=Lt((k=r==null?void 0:r.body)!=null?k:null),x={id:A(),url:a,endpoint:d,method:m,requestHeaders:s,requestBody:D(v),requestBodyRaw:v,queryParams:u,timestamp:i,source:"fetch",requestSize:B(v),pinned:!1};try{let h=await z(o,r),P=Math.round(performance.now()-p),j=h.clone(),S=null;try{S=await j.text()}catch{S=null}return C.addLog({...x,duration:P,responseStatus:h.status,responseStatusText:h.statusText,responseHeaders:ne(h.headers),responseBody:D(S),responseBodyRaw:S,responseSize:B(S),success:h.ok,error:h.ok?null:`HTTP ${h.status} ${h.statusText}`}),h}catch(h){let P=Math.round(performance.now()-p);throw C.addLog({...x,duration:P,responseStatus:null,responseStatusText:"",responseHeaders:{},responseBody:null,responseBodyRaw:null,responseSize:0,success:!1,error:(h==null?void 0:h.message)||"Network error"}),h}})}function we(){ae&&z&&typeof window!="undefined"&&(window.fetch=z),ae=!1,z=null}var Q=null,V=null,Z=null,se=!1,K=Symbol("apd-xhr-meta");function Rt(e){let t={};return e.trim().split(/[\r\n]+/).forEach(o=>{let r=o.indexOf(":");if(r===-1)return;let n=o.slice(0,r).trim().toLowerCase(),a=o.slice(r+1).trim();n&&(t[n]=a)}),t}function Fe(e={}){se||typeof window=="undefined"||typeof XMLHttpRequest=="undefined"||(Q=XMLHttpRequest.prototype.open,V=XMLHttpRequest.prototype.send,Z=XMLHttpRequest.prototype.setRequestHeader,se=!0,XMLHttpRequest.prototype.open=function(o,r,...n){let a=String(r);return this[K]={id:A(),method:(o||"GET").toUpperCase(),url:a,startTime:0,startPerf:0,requestHeaders:{},ignored:_(a,e.ignoreUrls)},Q.apply(this,[o,r,...n])},XMLHttpRequest.prototype.setRequestHeader=function(o,r){if(o.toLowerCase()===M){this[K]&&(this[K].ignored=!0);return}return this[K]&&(this[K].requestHeaders[o]=r),Z.apply(this,[o,r])},XMLHttpRequest.prototype.send=function(o){let r=this[K];if(!r||r.ignored)return V.apply(this,[o]);r.startTime=Date.now(),r.startPerf=performance.now();let n=o==null?null:typeof o=="string"?o:o instanceof URLSearchParams?o.toString():o instanceof FormData?"[form data]":"[binary data]",a=()=>{let s=Math.round(performance.now()-r.startPerf),{endpoint:i,queryParams:p}=J(r.url),m=Rt(this.getAllResponseHeaders()||""),d=null;try{d=typeof this.responseText=="string"?this.responseText:null}catch{d=null}let u=this.status,v=u>=200&&u<400,x={id:r.id,url:r.url,endpoint:i,method:r.method,requestHeaders:r.requestHeaders,requestBody:D(n),requestBodyRaw:n,queryParams:p,responseStatus:u||null,responseStatusText:this.statusText||"",responseHeaders:m,responseBody:D(d),responseBodyRaw:d,duration:s,timestamp:r.startTime,success:v,error:v?null:u===0?"Network error":`HTTP ${u} ${this.statusText}`,source:"xhr",requestSize:B(n),responseSize:B(d),pinned:!1};C.addLog(x),this.removeEventListener("loadend",a)};return this.addEventListener("loadend",a),V.apply(this,[o])})}function Xe(){se&&typeof window!="undefined"&&typeof XMLHttpRequest!="undefined"&&(Q&&(XMLHttpRequest.prototype.open=Q),V&&(XMLHttpRequest.prototype.send=V),Z&&(XMLHttpRequest.prototype.setRequestHeader=Z)),se=!1,Q=null,V=null,Z=null}function Ct(e){let t=(e==null?void 0:e.baseURL)||"",o=(e==null?void 0:e.url)||"",r=/^https?:\/\//i.test(o)?o:`${t}${t&&!t.endsWith("/")&&!o.startsWith("/")?"/":""}${o}`;if(e!=null&&e.params&&typeof e.params=="object"){let n=Nt(e.params);n&&(r+=(r.includes("?")?"&":"?")+n)}return r}function Nt(e){let t=new URLSearchParams;for(let[o,r]of Object.entries(e))r!=null&&(Array.isArray(r)?r.forEach(n=>t.append(o,String(n))):t.append(o,String(r)));return t.toString()}function Je(e){if(e==null)return null;if(typeof e=="string")return e;if(typeof URLSearchParams!="undefined"&&e instanceof URLSearchParams)return e.toString();if(typeof FormData!="undefined"&&e instanceof FormData){let t=[];return e.forEach((o,r)=>{t.push(`${r}=${o instanceof File?`[File: ${o.name}]`:o}`)}),t.join("&")}return F(e)}function ke(e,t={}){var a;if(!e||!e.interceptors||typeof((a=e.interceptors.request)==null?void 0:a.use)!="function")return()=>{};if(e.__apiDebuggerInstalled)return()=>{};e.__apiDebuggerInstalled=!0;let o=e.interceptors.request.use(s=>{let i={id:A(),startTime:Date.now(),startPerf:performance.now(),requestBodyRaw:Je(s.data),requestHeadersSnapshot:G(s.headers)};return s.__apdMeta=i,s.headers&&typeof s.headers.set=="function"?s.headers.set(M,"1"):s.headers={...s.headers||{},[M]:"1"},s});function r(s,i,p){var P,j,S,R,$,oe;if(!s)return;let m=Ct(s);if(_(m,t.ignoreUrls))return;let d=s.__apdMeta||{id:A(),startTime:Date.now(),startPerf:performance.now(),requestBodyRaw:Je(s.data),requestHeadersSnapshot:G(s.headers)},u=Math.round(performance.now()-d.startPerf),{endpoint:v,queryParams:x}=J(m),L=G(s.headers),g=Object.keys(L).length>0?L:d.requestHeadersSnapshot;delete g[M];let y=d.requestBodyRaw,H=(i==null?void 0:i.data)!==void 0?F(i.data):null,k=(S=(j=i==null?void 0:i.status)!=null?j:(P=p==null?void 0:p.response)==null?void 0:P.status)!=null?S:null,h={id:d.id,url:m,endpoint:v,method:(s.method||"get").toUpperCase(),requestHeaders:g,requestBody:(R=D(y))!=null?R:y,requestBodyRaw:y,queryParams:x,responseStatus:k,responseStatusText:($=i==null?void 0:i.statusText)!=null?$:"",responseHeaders:G(i==null?void 0:i.headers),responseBody:(oe=i==null?void 0:i.data)!=null?oe:null,responseBodyRaw:H,duration:u,timestamp:d.startTime,success:!p&&!!k&&k<400,error:p?p.message||"Request failed":null,source:"axios",requestSize:B(y),responseSize:B(H),pinned:!1};C.addLog(h)}let n=e.interceptors.response.use(s=>(r(s.config,s),s),s=>(r(s==null?void 0:s.config,s==null?void 0:s.response,s),Promise.reject(s)));return()=>{e.interceptors.request.eject(o),e.interceptors.response.eject(n),e.__apiDebuggerInstalled=!1}}var _e=["log","info","warn","error","debug"],Ee={},ee=null,te=null,Le=!1;function Pt(e,t=new WeakSet){var o;if(e===null)return"null";if(e===void 0)return"undefined";if(typeof e=="string")return e;if(typeof e=="number"||typeof e=="boolean")return String(e);if(e instanceof Error)return`${e.name}: ${e.message}`;if(typeof e=="function")return e.name?`\u0192 ${e.name}()`:"\u0192 ()";if(typeof e=="object"){if(t.has(e))return"[Circular]";t.add(e);try{return(o=JSON.stringify(e,(r,n)=>typeof n=="bigint"?n.toString():n,2))!=null?o:String(e)}catch{return Array.isArray(e)?"[Array]":"[Object]"}}return String(e)}function Ht(e){for(let t of e)if(t instanceof Error&&t.stack)return t.stack;return null}function Se(e,t,o){let r=t.map(n=>Pt(n));return{id:A(),level:e,parts:r,preview:r.join(" "),stack:Ht(t),timestamp:Date.now(),source:o,count:1}}function Ke(e={}){var o,r;if(Le||typeof window=="undefined"||typeof console=="undefined")return;Le=!0;let t=(o=e.levels)!=null?o:_e;for(let n of t){let a=(r=console[n])==null?void 0:r.bind(console);a&&(Ee[n]=a,console[n]=(...s)=>{T.addEntry(Se(n,s,"console")),a(...s)})}ee=n=>{let a=n.error?[n.error]:[n.message],s=Se("error",a,"window.onerror");T.addEntry({...s,preview:s.preview||`${n.message} (${n.filename}:${n.lineno}:${n.colno})`})},window.addEventListener("error",ee),te=n=>{let a=n.reason,s=Se("error",[a],"unhandledrejection");T.addEntry({...s,preview:`Unhandled promise rejection: ${s.preview}`})},window.addEventListener("unhandledrejection",te)}function Ve(){if(typeof console!="undefined")for(let e of _e){let t=Ee[e];t&&(console[e]=t)}typeof window!="undefined"&&(ee&&window.removeEventListener("error",ee),te&&window.removeEventListener("unhandledrejection",te)),Ee={},ee=null,te=null,Le=!1}import{useCallback as Ye,useSyncExternalStore as Tt}from"react";function We(){let e=Tt(C.subscribe,C.getLogs,C.getLogs),t=Ye(()=>C.clear(),[]),o=Ye(r=>C.togglePin(r),[]);return{logs:e,clear:t,togglePin:o}}import{useCallback as qt,useSyncExternalStore as Mt}from"react";function Ge(){let e=Mt(T.subscribe,T.getEntries,T.getEntries),t=qt(()=>T.clear(),[]);return{entries:e,clear:t}}import{useEffect as At}from"react";function Qe(e,t,o=!0){At(()=>{if(!o||typeof window=="undefined")return;function r(n){let a=!e.ctrl||n.ctrlKey||n.metaKey,s=!e.shift||n.shiftKey;a&&s&&n.key.toLowerCase()===e.key.toLowerCase()&&(n.preventDefault(),t())}return window.addEventListener("keydown",r),()=>window.removeEventListener("keydown",r)},[e.ctrl,e.shift,e.key,t,o])}import{useEffect as jt,useRef as Dt}from"react";function Re(e){return e===" "?"space":e.toLowerCase()}function Bt(e){var r;let t=e;if(!t)return!1;let o=(r=t.tagName)==null?void 0:r.toLowerCase();return o==="input"||o==="textarea"||o==="select"||t.isContentEditable}function Ze(e,t){if(typeof window=="undefined")return()=>{};let o=e.map(Re),r=new Set;function n(i){if(Bt(i.target))return;let p=Re(i.key),m=r.has(p);r.add(p),!m&&o.every(d=>r.has(d))&&(i.preventDefault(),t())}function a(i){r.delete(Re(i.key))}function s(){r.clear()}return window.addEventListener("keydown",n),window.addEventListener("keyup",a),window.addEventListener("blur",s),()=>{window.removeEventListener("keydown",n),window.removeEventListener("keyup",a),window.removeEventListener("blur",s)}}function et(e,t,o=!0){let r=Dt(t);r.current=t,jt(()=>{if(o)return Ze(e,()=>r.current())},[e.join(","),o])}import{useEffect as zt}from"react";var tt=`
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
`;var ot="next-api-debugger-styles";function rt(){return zt(()=>{if(typeof document=="undefined"||document.getElementById(ot))return;let e=document.createElement("style");e.id=ot,e.textContent=tt,document.head.appendChild(e)},[]),null}import{useCallback as ie,useEffect as nt,useRef as Ce,useState as Ot}from"react";var at="apd-button-position",pe=56,st=5;function de(e){return typeof window=="undefined"?e:{x:Math.min(Math.max(8,e.x),window.innerWidth-pe-8),y:Math.min(Math.max(8,e.y),window.innerHeight-pe-8)}}function It(){return typeof window=="undefined"?{x:24,y:24}:{x:window.innerWidth-pe-24,y:window.innerHeight-pe-24}}function it(e){let[t,o]=Ot(()=>{if(typeof window=="undefined")return e!=null?e:{x:24,y:24};try{let d=sessionStorage.getItem(at);if(d)return de(JSON.parse(d))}catch{}return de(e!=null?e:It())}),r=Ce(!1),n=Ce(!1),a=Ce({pointerX:0,pointerY:0,posX:0,posY:0}),s=ie(d=>{r.current=!0,n.current=!1,a.current={pointerX:d.clientX,pointerY:d.clientY,posX:t.x,posY:t.y},d.currentTarget.setPointerCapture(d.pointerId)},[t.x,t.y]),i=ie(d=>{if(!r.current)return;let u=d.clientX-a.current.pointerX,v=d.clientY-a.current.pointerY;(Math.abs(u)>st||Math.abs(v)>st)&&(n.current=!0),o(de({x:a.current.posX+u,y:a.current.posY+v}))},[]),p=ie(()=>{r.current=!1},[]);nt(()=>{try{sessionStorage.setItem(at,JSON.stringify(t))}catch{}},[t]),nt(()=>{function d(){o(u=>de(u))}return window.addEventListener("resize",d),()=>window.removeEventListener("resize",d)},[]);let m=ie(()=>n.current,[]);return{position:t,onPointerDown:s,onPointerMove:i,onPointerUp:p,wasDragged:m}}import{jsx as Ne,jsxs as dt}from"react/jsx-runtime";function pt({count:e,hasErrors:t,onOpen:o,initialPosition:r}){let{position:n,onPointerDown:a,onPointerMove:s,onPointerUp:i,wasDragged:p}=it(r);return dt("button",{type:"button",className:"apd-btn",style:{left:n.x,top:n.y},onPointerDown:a,onPointerMove:s,onPointerUp:i,onClick:()=>{p()||o()},"aria-label":"Open API debugger",title:"API Debugger (drag to move)",children:[dt("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[Ne("polyline",{points:"16 18 22 12 16 6"}),Ne("polyline",{points:"8 6 2 12 8 18"})]}),e>0&&Ne("span",{className:w("apd-btn-dot",t&&"apd-has-errors"),children:e>99?"99+":e})]})}import{useEffect as ao,useMemo as kt,useState as W}from"react";import{jsx as Pe,jsxs as lt}from"react/jsx-runtime";function He({value:e,onChange:t}){return lt("div",{className:"apd-search",children:[lt("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[Pe("circle",{cx:"11",cy:"11",r:"7"}),Pe("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]}),Pe("input",{type:"text",placeholder:"Filter by URL, endpoint, method or status code...",value:e,onChange:o=>t(o.target.value),spellCheck:!1})]})}import{Fragment as $t,jsx as Te,jsxs as Ut}from"react/jsx-runtime";function ct({status:e,onStatusChange:t,methods:o,activeMethods:r,onToggleMethod:n}){return Ut($t,{children:[Te("button",{type:"button",className:w("apd-chip apd-chip-success",e==="success"&&"apd-active"),onClick:()=>t(e==="success"?"all":"success"),children:"Success"}),Te("button",{type:"button",className:w("apd-chip apd-chip-failed",e==="failed"&&"apd-active"),onClick:()=>t(e==="failed"?"all":"failed"),children:"Failed"}),o.map(a=>Te("button",{type:"button",className:w("apd-chip",r.includes(a)&&"apd-active"),onClick:()=>n(a),children:a},a))]})}import{jsx as O,jsxs as qe}from"react/jsx-runtime";function Ft(e){return["GET","POST","PUT","PATCH","DELETE"].includes(e.toUpperCase())?`apd-method-${e.toUpperCase()}`:"apd-method-OTHER"}function ut({log:e,selected:t,onSelect:o,onTogglePin:r}){var n;return qe("div",{className:w("apd-item",t&&"apd-selected"),onClick:o,role:"button",tabIndex:0,onKeyDown:a=>a.key==="Enter"&&o(),children:[qe("div",{className:"apd-item-row1",children:[O("span",{className:w("apd-method",Ft(e.method)),children:e.method}),O("span",{className:"apd-item-url",title:e.url,children:e.endpoint}),O("span",{className:w("apd-status-dot",e.success?"apd-ok":"apd-fail")}),e.pinned&&O("button",{type:"button",className:"apd-pin-star",onClick:a=>{a.stopPropagation(),r()},title:"Unpin","aria-label":"Unpin request",style:{background:"none",border:"none",cursor:"pointer",padding:0},children:"\u2605"})]}),qe("div",{className:"apd-item-row2",children:[O("span",{children:(n=e.responseStatus)!=null?n:e.error?"ERR":"\u2014"}),O("span",{children:re(e.duration)}),O("span",{children:X(e.timestamp)}),O("span",{style:{marginLeft:"auto",textTransform:"uppercase"},children:e.source})]})]})}import{jsx as le,jsxs as Xt}from"react/jsx-runtime";function ft({logs:e,selectedId:t,onSelect:o,onTogglePin:r}){return e.length===0?le("div",{className:"apd-list",children:Xt("div",{className:"apd-empty",children:["No requests captured yet.",le("br",{}),"Make an API call and it'll show up here."]})}):le("div",{className:"apd-list",children:e.map(n=>le(ut,{log:n,selected:n.id===t,onSelect:()=>o(n.id),onTogglePin:()=>r(n.id)},n.id))})}import{Fragment as Zt,useState as eo}from"react";import{useState as Jt}from"react";import{jsxs as _t}from"react/jsx-runtime";function ce({getText:e,label:t,icon:o}){let[r,n]=Jt(!1);async function a(){await Ue(e())&&(n(!0),setTimeout(()=>n(!1),1200))}return _t("button",{type:"button",className:w("apd-action-btn",r&&"apd-copied"),onClick:a,children:[o,r?"Copied":t]})}import{useEffect as ht,useMemo as Gt,useRef as bt,useState as xt}from"react";var Kt=/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(\.\d+)?([eE][+-]?\d+)?)/g;function Vt(e){return e.replace(Kt,t=>{let o="apd-json-num";return/^"/.test(t)?o=/:$/.test(t)?"apd-json-key":"apd-json-str":/true|false/.test(t)?o="apd-json-bool":/null/.test(t)&&(o="apd-json-null"),`<span class="${o}">${t}</span>`})}function Yt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Wt(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function mt(e,t){if(e!=null&&typeof e=="object")return{content:JSON.stringify(e,null,2),isJson:!0};if(typeof e=="string")try{return{content:JSON.stringify(JSON.parse(e),null,2),isJson:!0}}catch{return{content:t!=null?t:e,isJson:!1}}return{content:t!=null?t:String(e!=null?e:""),isJson:!1}}function gt(e,t,o){let r=Yt(e),n=0,a=r;if(o){let i=new RegExp(Wt(o),"gi");a=r.replace(i,p=>(n+=1,`<mark class='apd-json-highlight'>${p}</mark>`))}return{html:t?Vt(a):a,matchCount:n}}import{jsx as I,jsxs as ue}from"react/jsx-runtime";function fe({value:e,raw:t,searchable:o=!0}){let[r,n]=xt(""),[a,s]=xt(0),i=bt(null),p=bt(""),{content:m,isJson:d}=mt(e,t),u=r.trim(),{html:v,matchCount:x}=Gt(()=>gt(m,d,u),[m,d,u]);ht(()=>{let g=u!==p.current;p.current=u,(g||a>=x)&&s(0)},[u,x]),ht(()=>{var y;if(!i.current)return;let g=i.current.querySelectorAll("mark.apd-json-highlight");g.forEach((H,k)=>H.classList.toggle("apd-active",k===a)),(y=g[a])==null||y.scrollIntoView({block:"center",behavior:"smooth"})},[v,a]);function L(g){x!==0&&s(y=>(y+g+x)%x)}return ue("div",{children:[o&&m.length>0&&ue("div",{className:"apd-json-search",children:[ue("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[I("circle",{cx:"11",cy:"11",r:"7"}),I("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]}),I("input",{type:"text",placeholder:"Find in payload...",value:r,onChange:g=>n(g.target.value),onKeyDown:g=>{g.key==="Enter"&&(g.preventDefault(),L(g.shiftKey?-1:1))},spellCheck:!1}),r&&I("span",{className:"apd-json-search-count",children:x>0?`${a+1} / ${x}`:"No matches"}),r&&x>0&&ue("div",{className:"apd-json-search-nav",children:[I("button",{type:"button",onClick:()=>L(-1),"aria-label":"Previous match",title:"Previous match (Shift+Enter)",children:"\u2191"}),I("button",{type:"button",onClick:()=>L(1),"aria-label":"Next match",title:"Next match (Enter)",children:"\u2193"})]})]}),I("pre",{ref:i,className:"apd-json",dangerouslySetInnerHTML:{__html:v}})]})}function me(e){return`'${e.replace(/'/g,"'\\''")}'`}function Qt(e){let t=e.trim();if(!t||!(t.startsWith("{")||t.startsWith("[")))return!1;try{return JSON.parse(t),!0}catch{return!1}}function Me(e){let t=[`curl -X ${e.method} ${me(e.url)}`],o=Object.keys(e.requestHeaders).some(r=>r.toLowerCase()==="content-type");for(let[r,n]of Object.entries(e.requestHeaders))/^(host|content-length|connection)$/i.test(r)||t.push(`  -H ${me(`${r}: ${n}`)}`);return e.requestBodyRaw&&(!o&&Qt(e.requestBodyRaw)&&t.push(`  -H ${me("Content-Type: application/json")}`),t.push(`  --data-raw ${me(e.requestBodyRaw)}`)),t.join(` \\
`)}import{jsx as l,jsxs as E}from"react/jsx-runtime";function Y({title:e,count:t,defaultOpen:o=!0,children:r}){let[n,a]=eo(o);return E("div",{className:"apd-section",children:[E("div",{className:"apd-section-header",onClick:()=>a(s=>!s),children:[E("span",{children:[e,typeof t=="number"?` (${t})`:""]}),l("span",{children:n?"\u2212":"+"})]}),n&&l("div",{className:"apd-section-body",children:r})]})}function Ae({data:e}){let t=Object.entries(e);return t.length===0?l("div",{className:"apd-section-body apd-empty-body",children:"None"}):l("div",{className:"apd-kv",children:t.map(([o,r])=>E(Zt,{children:[l("div",{className:"apd-kv-key",children:o}),l("div",{className:"apd-kv-val",children:r})]},o))})}function vt({log:e,onTogglePin:t}){var a,s,i,p,m;if(!e)return l("div",{className:"apd-detail",children:l("div",{className:"apd-detail-empty",children:"Select a request to see full details"})});let o=Me(e),r=(s=(a=F(e.requestBody))!=null?a:e.requestBodyRaw)!=null?s:"",n=(p=(i=F(e.responseBody))!=null?i:e.responseBodyRaw)!=null?p:"";return E("div",{className:"apd-detail",children:[E("div",{className:"apd-detail-header",children:[E("div",{className:"apd-detail-url",children:[l("strong",{children:e.method})," ",e.url]}),l("button",{type:"button",className:"apd-action-btn",onClick:()=>t(e.id),title:e.pinned?"Unpin":"Pin this request",children:e.pinned?"\u2605 Pinned":"\u2606 Pin"})]}),E("div",{className:"apd-meta-grid",children:[E("div",{children:[l("div",{className:"apd-meta-label",children:"Status"}),E("div",{className:"apd-meta-value",style:{color:e.success?"var(--apd-success)":"var(--apd-error)"},children:[(m=e.responseStatus)!=null?m:"Failed"," ",e.responseStatusText]})]}),E("div",{children:[l("div",{className:"apd-meta-label",children:"Duration"}),l("div",{className:"apd-meta-value",children:re(e.duration)})]}),E("div",{children:[l("div",{className:"apd-meta-label",children:"Time"}),l("div",{className:"apd-meta-value",children:X(e.timestamp)})]}),E("div",{children:[l("div",{className:"apd-meta-label",children:"Source"}),l("div",{className:"apd-meta-value",children:e.source})]}),E("div",{children:[l("div",{className:"apd-meta-label",children:"Req. size"}),l("div",{className:"apd-meta-value",children:ve(e.requestSize)})]}),E("div",{children:[l("div",{className:"apd-meta-label",children:"Res. size"}),l("div",{className:"apd-meta-value",children:ve(e.responseSize)})]})]}),e.error&&E("div",{className:"apd-section",style:{borderColor:"var(--apd-error)"},children:[l("div",{className:"apd-section-header",style:{color:"var(--apd-error)"},children:"Error"}),l("div",{className:"apd-section-body",children:e.error})]}),E("div",{className:"apd-actions",children:[l(ce,{label:"Copy cURL",getText:()=>o}),l(ce,{label:"Copy Request",getText:()=>r}),l(ce,{label:"Copy Response",getText:()=>n})]}),l(Y,{title:"cURL",children:l(fe,{value:o,searchable:!1})}),l(Y,{title:"Query Params",count:Object.keys(e.queryParams).length,defaultOpen:!1,children:l(Ae,{data:e.queryParams})}),l(Y,{title:"Request Headers",count:Object.keys(e.requestHeaders).length,defaultOpen:!1,children:l(Ae,{data:e.requestHeaders})}),l(Y,{title:"Request Body",children:e.requestBodyRaw?l(fe,{value:e.requestBody,raw:e.requestBodyRaw}):l("div",{className:"apd-empty-body",children:"No body"})}),l(Y,{title:"Response Headers",count:Object.keys(e.responseHeaders).length,defaultOpen:!1,children:l(Ae,{data:e.responseHeaders})}),l(Y,{title:"Response Body",children:e.responseBodyRaw?l(fe,{value:e.responseBody,raw:e.responseBodyRaw}):l("div",{className:"apd-empty-body",children:"No body"})})]})}import{useState as to}from"react";import{jsx as q,jsxs as ge}from"react/jsx-runtime";var oo={log:"\u25B8",info:"\u2139",warn:"\u26A0",error:"\u2715",debug:"\u2699"};function ro({entry:e}){var r;let[t,o]=to(!1);return ge("div",{className:`apd-console-item apd-console-${e.level}`,children:[q("span",{className:"apd-console-icon",children:(r=oo[e.level])!=null?r:"\u25B8"}),ge("div",{className:"apd-console-body",children:[q("div",{className:"apd-console-preview",children:e.preview||"(empty)"}),ge("div",{className:"apd-console-meta",children:[q("span",{children:X(e.timestamp)}),e.source!=="console"&&q("span",{children:e.source}),e.stack&&q("button",{type:"button",className:"apd-console-toggle-stack",onClick:()=>o(n=>!n),children:t?"Hide stack trace":"Show stack trace"})]}),t&&e.stack&&q("div",{className:"apd-console-stack",children:e.stack})]}),e.count>1&&q("span",{className:"apd-console-count",children:e.count})]})}function yt({entries:e}){return e.length===0?q("div",{className:"apd-console-list",children:ge("div",{className:"apd-empty",children:["Nothing logged yet.",q("br",{}),"console.log/warn/error and uncaught errors will show up here."]})}):q("div",{className:"apd-console-list",children:e.map(t=>q(ro,{entry:t},t.id))})}function wt(e){return Object.entries(e).map(([t,o])=>({name:t,value:o}))}function no(e){return Object.entries(e).map(([t,o])=>({name:t,value:o}))}function Be(e){return{log:{version:"1.2",creator:{name:"next-api-debugger",version:"0.1.0"},entries:e.map(t=>{var o,r;return{startedDateTime:new Date(t.timestamp).toISOString(),time:t.duration,request:{method:t.method,url:t.url,httpVersion:"HTTP/1.1",headers:wt(t.requestHeaders),queryString:no(t.queryParams),cookies:[],headersSize:-1,bodySize:t.requestSize,postData:t.requestBodyRaw?{mimeType:t.requestHeaders["content-type"]||"application/json",text:t.requestBodyRaw}:void 0},response:{status:(o=t.responseStatus)!=null?o:0,statusText:t.responseStatusText,httpVersion:"HTTP/1.1",headers:wt(t.responseHeaders),cookies:[],content:{size:t.responseSize,mimeType:t.responseHeaders["content-type"]||"application/json",text:(r=t.responseBodyRaw)!=null?r:""},redirectURL:"",headersSize:-1,bodySize:t.responseSize},cache:{},timings:{send:0,wait:t.duration,receive:0}}})}}}function je(e,t){let o=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),r=URL.createObjectURL(o),n=document.createElement("a");n.href=r,n.download=e,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(r)}import{Fragment as he,jsx as f,jsxs as N}from"react/jsx-runtime";var so=["GET","POST","PUT","PATCH","DELETE"],io=["log","info","warn","error","debug"];function St({logs:e,consoleEntries:t,onClose:o,onClear:r,onClearConsole:n,onTogglePin:a,theme:s,onToggleTheme:i}){var Oe,Ie,$e;let[p,m]=W("network"),[d,u]=W({search:"",status:"all",methods:[]}),[v,x]=W(null),[L,g]=W(!1),[y,H]=W(""),[k,h]=W([]);ao(()=>{!v&&e.length>0&&x(e[0].id)},[e,v]);let P=kt(()=>{let c=d.search.trim().toLowerCase();return e.filter(b=>{var U;return!(d.status==="success"&&!b.success||d.status==="failed"&&b.success||d.methods.length>0&&!d.methods.includes(b.method)||c&&!`${b.url} ${b.endpoint} ${b.method} ${(U=b.responseStatus)!=null?U:""}`.toLowerCase().includes(c))})},[e,d]),j=kt(()=>{let c=y.trim().toLowerCase();return t.filter(b=>!(k.length>0&&!k.includes(b.level)||c&&!b.preview.toLowerCase().includes(c)))},[t,y,k]),S=(Ie=(Oe=P.find(c=>c.id===v))!=null?Oe:P[0])!=null?Ie:null,R=e.filter(c=>!c.success).length,$=t.filter(c=>c.level==="error").length;function oe(c){u(b=>({...b,methods:b.methods.includes(c)?b.methods.filter(U=>U!==c):[...b.methods,c]}))}function Et(c){h(b=>b.includes(c)?b.filter(U=>U!==c):[...b,c])}return f("div",{className:"apd-overlay",onClick:o,children:N("div",{className:`apd-modal${L?" apd-minimized":""}`,onClick:c=>c.stopPropagation(),children:[N("div",{className:"apd-header",children:[N("div",{className:"apd-header-title",children:[f("span",{className:"apd-live-dot"}),"API Debugger"]}),f("span",{className:"apd-header-count",children:p==="network"?`${e.length} requests${R>0?` \xB7 ${R} failed`:""}`:`${t.length} logs${$>0?` \xB7 ${$} errors`:""}`}),f("div",{className:"apd-spacer"}),f("button",{className:"apd-icon-btn",onClick:i,title:"Toggle theme",type:"button",children:s==="light"?"\u2600":"\u263E"}),p==="network"&&N(he,{children:[f("button",{className:"apd-icon-btn",title:"Export JSON",type:"button",onClick:()=>je(`api-logs-${Date.now()}.json`,e),children:"\u2B73"}),f("button",{className:"apd-icon-btn",title:"Export HAR",type:"button",onClick:()=>je(`api-logs-${Date.now()}.har`,Be(e)),children:"HAR"})]}),f("button",{className:"apd-icon-btn",title:p==="network"?"Clear logs":"Clear console",type:"button",onClick:p==="network"?r:n,children:"\u{1F5D1}"}),f("button",{className:"apd-icon-btn",title:L?"Restore":"Minimize",type:"button",onClick:()=>g(c=>!c),children:L?"\u25A2":"\u2014"}),f("button",{className:"apd-icon-btn",title:"Close",type:"button",onClick:o,children:"\u2715"})]}),!L&&N(he,{children:[N("div",{className:"apd-tabs",children:[N("button",{type:"button",className:w("apd-tab",p==="network"&&"apd-active"),onClick:()=>m("network"),children:["Network",e.length>0&&f("span",{className:w("apd-tab-badge",R>0&&"apd-tab-badge-error"),children:e.length})]}),N("button",{type:"button",className:w("apd-tab",p==="console"&&"apd-active"),onClick:()=>m("console"),children:["Console",t.length>0&&f("span",{className:w("apd-tab-badge",$>0&&"apd-tab-badge-error"),children:t.length})]})]}),p==="network"?N(he,{children:[N("div",{className:"apd-toolbar",children:[f(He,{value:d.search,onChange:c=>u(b=>({...b,search:c}))}),f(ct,{status:d.status,onStatusChange:c=>u(b=>({...b,status:c})),methods:so,activeMethods:d.methods,onToggleMethod:oe})]}),N("div",{className:"apd-body",children:[f(ft,{logs:P,selectedId:($e=S==null?void 0:S.id)!=null?$e:null,onSelect:x,onTogglePin:a}),f(vt,{log:S,onTogglePin:a})]})]}):N(he,{children:[N("div",{className:"apd-toolbar",children:[f(He,{value:y,onChange:H}),io.map(c=>f("button",{type:"button",className:w("apd-chip",k.includes(c)&&"apd-active"),onClick:()=>Et(c),children:c},c))]}),f(yt,{entries:j})]}),N("div",{className:"apd-footer",children:[N("span",{children:[f("span",{className:"apd-kbd",children:"Ctrl"}),"+",f("span",{className:"apd-kbd",children:"Shift"}),"+",f("span",{className:"apd-kbd",children:"D"})," to toggle \xB7 ",f("span",{className:"apd-kbd",children:"Space"}),"+",f("span",{className:"apd-kbd",children:"H"})," to hide"]}),f("span",{style:{marginLeft:"auto"},children:"next-api-debugger \xB7 dev only"})]})]})]})})}import{jsx as ze,jsxs as uo}from"react/jsx-runtime";function lo(e){return typeof e=="boolean"?e:process.env.NODE_ENV!=="production"}function co(e){let{enabled:t,maxLogs:o=200,initialPosition:r,axiosInstance:n,theme:a="dark",keyboardShortcut:s=!0,ignoreUrls:i}=e,p=lo(t),[m,d]=De(!1),[u,v]=De(!1),[x,L]=De(a),{logs:g,clear:y,togglePin:H}=We(),{entries:k,clear:h}=Ge();if(po(()=>{if(!p||typeof window=="undefined")return;C.setMaxLogs(o),T.setMaxEntries(500),ye({ignoreUrls:i}),Fe({ignoreUrls:i}),Ke();let R=n?ke(n,{ignoreUrls:i}):()=>{};return()=>{we(),Xe(),Ve(),R()}},[p]),Qe({ctrl:!0,shift:!0,key:"d"},()=>d(R=>!R),p&&s),et(["space","h"],()=>{v(R=>!R),d(!1)},p&&s),!p)return null;let P=g.filter(R=>!R.success).length,j=k.filter(R=>R.level==="error").length,S=x==="system"?"dark":x;return uo("div",{className:`apd-root${S==="light"?" apd-light":""}`,children:[ze(rt,{}),!u&&!m&&ze(pt,{count:g.length+k.length,hasErrors:P>0||j>0,onOpen:()=>d(!0),initialPosition:r}),!u&&m&&ze(St,{logs:g,consoleEntries:k,onClose:()=>d(!1),onClear:y,onClearConsole:h,onTogglePin:H,theme:S,onToggleTheme:()=>L(S==="light"?"dark":"light")})]})}export{co as ApiDebugger,Be as exportAsHar,Me as generateCurl,ke as installAxiosInterceptor,ye as installFetchInterceptor,C as logStore,we as uninstallFetchInterceptor};
//# sourceMappingURL=index.mjs.map