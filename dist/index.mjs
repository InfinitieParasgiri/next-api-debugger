'use client';
import{useEffect as oo,useState as yt}from"react";var be=class{constructor(){this.logs=[];this.listeners=new Set;this.maxLogs=200;this.snapshot=[];this.getLogs=()=>(this.snapshot=this.logs,this.snapshot);this.subscribe=t=>(this.listeners.add(t),()=>this.listeners.delete(t))}setMaxLogs(t){this.maxLogs=Math.max(1,t),this.trim()}addLog(t){this.logs=[t,...this.logs],this.trim(),this.emit()}togglePin(t){this.logs=this.logs.map(o=>o.id===t?{...o,pinned:!o.pinned}:o),this.emit()}clear(){this.logs=[],this.emit()}trim(){if(this.logs.length<=this.maxLogs)return;let t=this.logs.filter(a=>a.pinned),r=this.logs.filter(a=>!a.pinned).slice(0,Math.max(0,this.maxLogs-t.length)),n=[...t,...r];n.sort((a,s)=>s.timestamp-a.timestamp),this.logs=n}emit(){this.listeners.forEach(t=>t())}},E=new be;var xe=class{constructor(){this.entries=[];this.listeners=new Set;this.maxEntries=500;this.getEntries=()=>this.entries;this.subscribe=t=>(this.listeners.add(t),()=>this.listeners.delete(t))}setMaxEntries(t){this.maxEntries=Math.max(1,t),this.trim()}addEntry(t){let o=this.entries[0];o&&o.level===t.level&&o.preview===t.preview&&o.stack===t.stack?this.entries=[{...o,count:o.count+1,timestamp:t.timestamp},...this.entries.slice(1)]:this.entries=[t,...this.entries],this.trim(),this.emit()}clear(){this.entries=[],this.emit()}trim(){this.entries.length>this.maxEntries&&(this.entries=this.entries.slice(0,this.maxEntries))}emit(){this.listeners.forEach(t=>t())}},H=new xe;var M="x-apd-skip";function A(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,9)}`}function j(e){if(!e)return null;try{return JSON.parse(e)}catch{return e}}function F(e){if(e==null)return null;if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return String(e)}}function B(e){if(!e)return 0;try{return new Blob([e]).size}catch{return e.length}}function ve(e){if(!e)return"0 B";let t=["B","KB","MB","GB"],o=Math.min(t.length-1,Math.floor(Math.log(e)/Math.log(1024))),r=e/Math.pow(1024,o);return`${o===0?r:r.toFixed(1)} ${t[o]}`}function re(e){return e<1e3?`${e} ms`:`${(e/1e3).toFixed(2)} s`}function X(e){let t=new Date(e);return t.toLocaleTimeString(void 0,{hour12:!1})+`.${String(t.getMilliseconds()).padStart(3,"0")}`}function J(e){try{let t=typeof window!="undefined"?window.location.origin:"http://localhost",o=new URL(e,t),r={};return o.searchParams.forEach((n,a)=>{r[a]=n}),{endpoint:o.pathname,queryParams:r}}catch{return{endpoint:e,queryParams:{}}}}function ne(e){let t={};return e&&e.forEach((o,r)=>{t[r]=o}),t}function G(e){let t={};if(!e)return t;if(typeof e.toJSON=="function")return{...e.toJSON()};if(e instanceof Headers)return ne(e);if(typeof e=="object")for(let[o,r]of Object.entries(e))r!=null&&(t[o]=String(r));return t}function _(e,t){return!t||t.length===0?!1:t.some(o=>o instanceof RegExp?o.test(e):e.includes(o))}function w(...e){return e.filter(Boolean).join(" ")}async function Ie(e){try{if(navigator.clipboard&&window.isSecureContext)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select();let o=document.execCommand("copy");return document.body.removeChild(t),o}catch{return!1}}var D=null,ae=!1;function kt(e){if(e==null)return null;if(typeof e=="string")return e;if(e instanceof URLSearchParams)return e.toString();if(e instanceof FormData){let t=[];return e.forEach((o,r)=>{t.push(`${r}=${o instanceof File?`[File: ${o.name}]`:o}`)}),t.join("&")}return"[binary data]"}function ye(e={}){ae||typeof window=="undefined"||typeof window.fetch!="function"||(D=window.fetch.bind(window),ae=!0,window.fetch=async function(o,r){var S,x,y,T,L;let n=o instanceof Request?o:null,a=n?n.url:String(o);if(_(a,e.ignoreUrls))return D(o,r);let s=ne(new Headers((x=(S=r==null?void 0:r.headers)!=null?S:n==null?void 0:n.headers)!=null?x:void 0));if(s[M]){let f=new Headers((T=(y=r==null?void 0:r.headers)!=null?y:n==null?void 0:n.headers)!=null?T:void 0);return f.delete(M),n?D(new Request(n,{headers:f})):D(o,{...r,headers:f})}let d=Date.now(),l=performance.now(),h=((r==null?void 0:r.method)||(n==null?void 0:n.method)||"GET").toUpperCase(),{endpoint:i,queryParams:u}=J(a),v=kt((L=r==null?void 0:r.body)!=null?L:null),b={id:A(),url:a,endpoint:i,method:h,requestHeaders:s,requestBody:j(v),requestBodyRaw:v,queryParams:u,timestamp:d,source:"fetch",requestSize:B(v),pinned:!1};try{let f=await D(o,r),C=Math.round(performance.now()-l),P=f.clone(),N=null;try{N=await P.text()}catch{N=null}return E.addLog({...b,duration:C,responseStatus:f.status,responseStatusText:f.statusText,responseHeaders:ne(f.headers),responseBody:j(N),responseBodyRaw:N,responseSize:B(N),success:f.ok,error:f.ok?null:`HTTP ${f.status} ${f.statusText}`}),f}catch(f){let C=Math.round(performance.now()-l);throw E.addLog({...b,duration:C,responseStatus:null,responseStatusText:"",responseHeaders:{},responseBody:null,responseBodyRaw:null,responseSize:0,success:!1,error:(f==null?void 0:f.message)||"Network error"}),f}})}function we(){ae&&D&&typeof window!="undefined"&&(window.fetch=D),ae=!1,D=null}var Q=null,K=null,Z=null,se=!1,V=Symbol("apd-xhr-meta");function St(e){let t={};return e.trim().split(/[\r\n]+/).forEach(o=>{let r=o.indexOf(":");if(r===-1)return;let n=o.slice(0,r).trim().toLowerCase(),a=o.slice(r+1).trim();n&&(t[n]=a)}),t}function $e(e={}){se||typeof window=="undefined"||typeof XMLHttpRequest=="undefined"||(Q=XMLHttpRequest.prototype.open,K=XMLHttpRequest.prototype.send,Z=XMLHttpRequest.prototype.setRequestHeader,se=!0,XMLHttpRequest.prototype.open=function(o,r,...n){let a=String(r);return this[V]={id:A(),method:(o||"GET").toUpperCase(),url:a,startTime:0,startPerf:0,requestHeaders:{},ignored:_(a,e.ignoreUrls)},Q.apply(this,[o,r,...n])},XMLHttpRequest.prototype.setRequestHeader=function(o,r){if(o.toLowerCase()===M){this[V]&&(this[V].ignored=!0);return}return this[V]&&(this[V].requestHeaders[o]=r),Z.apply(this,[o,r])},XMLHttpRequest.prototype.send=function(o){let r=this[V];if(!r||r.ignored)return K.apply(this,[o]);r.startTime=Date.now(),r.startPerf=performance.now();let n=o==null?null:typeof o=="string"?o:o instanceof URLSearchParams?o.toString():o instanceof FormData?"[form data]":"[binary data]",a=()=>{let s=Math.round(performance.now()-r.startPerf),{endpoint:d,queryParams:l}=J(r.url),h=St(this.getAllResponseHeaders()||""),i=null;try{i=typeof this.responseText=="string"?this.responseText:null}catch{i=null}let u=this.status,v=u>=200&&u<400,b={id:r.id,url:r.url,endpoint:d,method:r.method,requestHeaders:r.requestHeaders,requestBody:j(n),requestBodyRaw:n,queryParams:l,responseStatus:u||null,responseStatusText:this.statusText||"",responseHeaders:h,responseBody:j(i),responseBodyRaw:i,duration:s,timestamp:r.startTime,success:v,error:v?null:u===0?"Network error":`HTTP ${u} ${this.statusText}`,source:"xhr",requestSize:B(n),responseSize:B(i),pinned:!1};E.addLog(b),this.removeEventListener("loadend",a)};return this.addEventListener("loadend",a),K.apply(this,[o])})}function Ue(){se&&typeof window!="undefined"&&typeof XMLHttpRequest!="undefined"&&(Q&&(XMLHttpRequest.prototype.open=Q),K&&(XMLHttpRequest.prototype.send=K),Z&&(XMLHttpRequest.prototype.setRequestHeader=Z)),se=!1,Q=null,K=null,Z=null}function Et(e){let t=(e==null?void 0:e.baseURL)||"",o=(e==null?void 0:e.url)||"",r=/^https?:\/\//i.test(o)?o:`${t}${t&&!t.endsWith("/")&&!o.startsWith("/")?"/":""}${o}`;if(e!=null&&e.params&&typeof e.params=="object"){let n=Lt(e.params);n&&(r+=(r.includes("?")?"&":"?")+n)}return r}function Lt(e){let t=new URLSearchParams;for(let[o,r]of Object.entries(e))r!=null&&(Array.isArray(r)?r.forEach(n=>t.append(o,String(n))):t.append(o,String(r)));return t.toString()}function Fe(e){if(e==null)return null;if(typeof e=="string")return e;if(typeof URLSearchParams!="undefined"&&e instanceof URLSearchParams)return e.toString();if(typeof FormData!="undefined"&&e instanceof FormData){let t=[];return e.forEach((o,r)=>{t.push(`${r}=${o instanceof File?`[File: ${o.name}]`:o}`)}),t.join("&")}return F(e)}function ke(e,t={}){var a;if(!e||!e.interceptors||typeof((a=e.interceptors.request)==null?void 0:a.use)!="function")return()=>{};if(e.__apiDebuggerInstalled)return()=>{};e.__apiDebuggerInstalled=!0;let o=e.interceptors.request.use(s=>{let d={id:A(),startTime:Date.now(),startPerf:performance.now(),requestBodyRaw:Fe(s.data),requestHeadersSnapshot:G(s.headers)};return s.__apdMeta=d,s.headers&&typeof s.headers.set=="function"?s.headers.set(M,"1"):s.headers={...s.headers||{},[M]:"1"},s});function r(s,d,l){var C,P,N,I,$,oe;if(!s)return;let h=Et(s);if(_(h,t.ignoreUrls))return;let i=s.__apdMeta||{id:A(),startTime:Date.now(),startPerf:performance.now(),requestBodyRaw:Fe(s.data),requestHeadersSnapshot:G(s.headers)},u=Math.round(performance.now()-i.startPerf),{endpoint:v,queryParams:b}=J(h),S=G(s.headers),x=Object.keys(S).length>0?S:i.requestHeadersSnapshot;delete x[M];let y=i.requestBodyRaw,T=(d==null?void 0:d.data)!==void 0?F(d.data):null,L=(N=(P=d==null?void 0:d.status)!=null?P:(C=l==null?void 0:l.response)==null?void 0:C.status)!=null?N:null,f={id:i.id,url:h,endpoint:v,method:(s.method||"get").toUpperCase(),requestHeaders:x,requestBody:(I=j(y))!=null?I:y,requestBodyRaw:y,queryParams:b,responseStatus:L,responseStatusText:($=d==null?void 0:d.statusText)!=null?$:"",responseHeaders:G(d==null?void 0:d.headers),responseBody:(oe=d==null?void 0:d.data)!=null?oe:null,responseBodyRaw:T,duration:u,timestamp:i.startTime,success:!l&&!!L&&L<400,error:l?l.message||"Request failed":null,source:"axios",requestSize:B(y),responseSize:B(T),pinned:!1};E.addLog(f)}let n=e.interceptors.response.use(s=>(r(s.config,s),s),s=>(r(s==null?void 0:s.config,s==null?void 0:s.response,s),Promise.reject(s)));return()=>{e.interceptors.request.eject(o),e.interceptors.response.eject(n),e.__apiDebuggerInstalled=!1}}var Xe=["log","info","warn","error","debug"],Ee={},ee=null,te=null,Le=!1;function Rt(e,t=new WeakSet){var o;if(e===null)return"null";if(e===void 0)return"undefined";if(typeof e=="string")return e;if(typeof e=="number"||typeof e=="boolean")return String(e);if(e instanceof Error)return`${e.name}: ${e.message}`;if(typeof e=="function")return e.name?`\u0192 ${e.name}()`:"\u0192 ()";if(typeof e=="object"){if(t.has(e))return"[Circular]";t.add(e);try{return(o=JSON.stringify(e,(r,n)=>typeof n=="bigint"?n.toString():n,2))!=null?o:String(e)}catch{return Array.isArray(e)?"[Array]":"[Object]"}}return String(e)}function Ct(e){for(let t of e)if(t instanceof Error&&t.stack)return t.stack;return null}function Se(e,t,o){let r=t.map(n=>Rt(n));return{id:A(),level:e,parts:r,preview:r.join(" "),stack:Ct(t),timestamp:Date.now(),source:o,count:1}}function Je(e={}){var o,r;if(Le||typeof window=="undefined"||typeof console=="undefined")return;Le=!0;let t=(o=e.levels)!=null?o:Xe;for(let n of t){let a=(r=console[n])==null?void 0:r.bind(console);a&&(Ee[n]=a,console[n]=(...s)=>{H.addEntry(Se(n,s,"console")),a(...s)})}ee=n=>{let a=n.error?[n.error]:[n.message],s=Se("error",a,"window.onerror");H.addEntry({...s,preview:s.preview||`${n.message} (${n.filename}:${n.lineno}:${n.colno})`})},window.addEventListener("error",ee),te=n=>{let a=n.reason,s=Se("error",[a],"unhandledrejection");H.addEntry({...s,preview:`Unhandled promise rejection: ${s.preview}`})},window.addEventListener("unhandledrejection",te)}function _e(){if(typeof console!="undefined")for(let e of Xe){let t=Ee[e];t&&(console[e]=t)}typeof window!="undefined"&&(ee&&window.removeEventListener("error",ee),te&&window.removeEventListener("unhandledrejection",te)),Ee={},ee=null,te=null,Le=!1}import{useCallback as Ve,useSyncExternalStore as Pt}from"react";function Ke(){let e=Pt(E.subscribe,E.getLogs,E.getLogs),t=Ve(()=>E.clear(),[]),o=Ve(r=>E.togglePin(r),[]);return{logs:e,clear:t,togglePin:o}}import{useCallback as Nt,useSyncExternalStore as Tt}from"react";function Ye(){let e=Tt(H.subscribe,H.getEntries,H.getEntries),t=Nt(()=>H.clear(),[]);return{entries:e,clear:t}}import{useEffect as Ht}from"react";function We(e,t,o=!0){Ht(()=>{if(!o||typeof window=="undefined")return;function r(n){let a=!e.ctrl||n.ctrlKey||n.metaKey,s=!e.shift||n.shiftKey;a&&s&&n.key.toLowerCase()===e.key.toLowerCase()&&(n.preventDefault(),t())}return window.addEventListener("keydown",r),()=>window.removeEventListener("keydown",r)},[e.ctrl,e.shift,e.key,t,o])}import{useEffect as qt}from"react";var Ge=`
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
`;var Qe="next-api-debugger-styles";function Ze(){return qt(()=>{if(typeof document=="undefined"||document.getElementById(Qe))return;let e=document.createElement("style");e.id=Qe,e.textContent=Ge,document.head.appendChild(e)},[]),null}import{useCallback as ie,useEffect as et,useRef as Re,useState as Mt}from"react";var tt="apd-button-position",pe=56,ot=5;function de(e){return typeof window=="undefined"?e:{x:Math.min(Math.max(8,e.x),window.innerWidth-pe-8),y:Math.min(Math.max(8,e.y),window.innerHeight-pe-8)}}function At(){return typeof window=="undefined"?{x:24,y:24}:{x:window.innerWidth-pe-24,y:window.innerHeight-pe-24}}function rt(e){let[t,o]=Mt(()=>{if(typeof window=="undefined")return e!=null?e:{x:24,y:24};try{let i=sessionStorage.getItem(tt);if(i)return de(JSON.parse(i))}catch{}return de(e!=null?e:At())}),r=Re(!1),n=Re(!1),a=Re({pointerX:0,pointerY:0,posX:0,posY:0}),s=ie(i=>{r.current=!0,n.current=!1,a.current={pointerX:i.clientX,pointerY:i.clientY,posX:t.x,posY:t.y},i.currentTarget.setPointerCapture(i.pointerId)},[t.x,t.y]),d=ie(i=>{if(!r.current)return;let u=i.clientX-a.current.pointerX,v=i.clientY-a.current.pointerY;(Math.abs(u)>ot||Math.abs(v)>ot)&&(n.current=!0),o(de({x:a.current.posX+u,y:a.current.posY+v}))},[]),l=ie(()=>{r.current=!1},[]);et(()=>{try{sessionStorage.setItem(tt,JSON.stringify(t))}catch{}},[t]),et(()=>{function i(){o(u=>de(u))}return window.addEventListener("resize",i),()=>window.removeEventListener("resize",i)},[]);let h=ie(()=>n.current,[]);return{position:t,onPointerDown:s,onPointerMove:d,onPointerUp:l,wasDragged:h}}import{jsx as Ce,jsxs as nt}from"react/jsx-runtime";function at({count:e,hasErrors:t,onOpen:o,initialPosition:r}){let{position:n,onPointerDown:a,onPointerMove:s,onPointerUp:d,wasDragged:l}=rt(r);return nt("button",{type:"button",className:"apd-btn",style:{left:n.x,top:n.y},onPointerDown:a,onPointerMove:s,onPointerUp:d,onClick:()=>{l()||o()},"aria-label":"Open API debugger",title:"API Debugger (drag to move)",children:[nt("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[Ce("polyline",{points:"16 18 22 12 16 6"}),Ce("polyline",{points:"8 6 2 12 8 18"})]}),e>0&&Ce("span",{className:w("apd-btn-dot",t&&"apd-has-errors"),children:e>99?"99+":e})]})}import{useEffect as Zt,useMemo as xt,useState as W}from"react";import{jsx as Pe,jsxs as st}from"react/jsx-runtime";function Ne({value:e,onChange:t}){return st("div",{className:"apd-search",children:[st("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[Pe("circle",{cx:"11",cy:"11",r:"7"}),Pe("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]}),Pe("input",{type:"text",placeholder:"Filter by URL, endpoint, method or status code...",value:e,onChange:o=>t(o.target.value),spellCheck:!1})]})}import{Fragment as Bt,jsx as Te,jsxs as jt}from"react/jsx-runtime";function it({status:e,onStatusChange:t,methods:o,activeMethods:r,onToggleMethod:n}){return jt(Bt,{children:[Te("button",{type:"button",className:w("apd-chip apd-chip-success",e==="success"&&"apd-active"),onClick:()=>t(e==="success"?"all":"success"),children:"Success"}),Te("button",{type:"button",className:w("apd-chip apd-chip-failed",e==="failed"&&"apd-active"),onClick:()=>t(e==="failed"?"all":"failed"),children:"Failed"}),o.map(a=>Te("button",{type:"button",className:w("apd-chip",r.includes(a)&&"apd-active"),onClick:()=>n(a),children:a},a))]})}import{jsx as z,jsxs as He}from"react/jsx-runtime";function Dt(e){return["GET","POST","PUT","PATCH","DELETE"].includes(e.toUpperCase())?`apd-method-${e.toUpperCase()}`:"apd-method-OTHER"}function dt({log:e,selected:t,onSelect:o,onTogglePin:r}){var n;return He("div",{className:w("apd-item",t&&"apd-selected"),onClick:o,role:"button",tabIndex:0,onKeyDown:a=>a.key==="Enter"&&o(),children:[He("div",{className:"apd-item-row1",children:[z("span",{className:w("apd-method",Dt(e.method)),children:e.method}),z("span",{className:"apd-item-url",title:e.url,children:e.endpoint}),z("span",{className:w("apd-status-dot",e.success?"apd-ok":"apd-fail")}),e.pinned&&z("button",{type:"button",className:"apd-pin-star",onClick:a=>{a.stopPropagation(),r()},title:"Unpin","aria-label":"Unpin request",style:{background:"none",border:"none",cursor:"pointer",padding:0},children:"\u2605"})]}),He("div",{className:"apd-item-row2",children:[z("span",{children:(n=e.responseStatus)!=null?n:e.error?"ERR":"\u2014"}),z("span",{children:re(e.duration)}),z("span",{children:X(e.timestamp)}),z("span",{style:{marginLeft:"auto",textTransform:"uppercase"},children:e.source})]})]})}import{jsx as le,jsxs as zt}from"react/jsx-runtime";function pt({logs:e,selectedId:t,onSelect:o,onTogglePin:r}){return e.length===0?le("div",{className:"apd-list",children:zt("div",{className:"apd-empty",children:["No requests captured yet.",le("br",{}),"Make an API call and it'll show up here."]})}):le("div",{className:"apd-list",children:e.map(n=>le(dt,{log:n,selected:n.id===t,onSelect:()=>o(n.id),onTogglePin:()=>r(n.id)},n.id))})}import{Fragment as Vt,useState as Kt}from"react";import{useState as Ot}from"react";import{jsxs as It}from"react/jsx-runtime";function ce({getText:e,label:t,icon:o}){let[r,n]=Ot(!1);async function a(){await Ie(e())&&(n(!0),setTimeout(()=>n(!1),1200))}return It("button",{type:"button",className:w("apd-action-btn",r&&"apd-copied"),onClick:a,children:[o,r?"Copied":t]})}import{useEffect as ut,useMemo as Jt,useRef as ft,useState as mt}from"react";var $t=/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(\.\d+)?([eE][+-]?\d+)?)/g;function Ut(e){return e.replace($t,t=>{let o="apd-json-num";return/^"/.test(t)?o=/:$/.test(t)?"apd-json-key":"apd-json-str":/true|false/.test(t)?o="apd-json-bool":/null/.test(t)&&(o="apd-json-null"),`<span class="${o}">${t}</span>`})}function Ft(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Xt(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function lt(e,t){if(e!=null&&typeof e=="object")return{content:JSON.stringify(e,null,2),isJson:!0};if(typeof e=="string")try{return{content:JSON.stringify(JSON.parse(e),null,2),isJson:!0}}catch{return{content:t!=null?t:e,isJson:!1}}return{content:t!=null?t:String(e!=null?e:""),isJson:!1}}function ct(e,t,o){let r=Ft(e),n=0,a=r;if(o){let d=new RegExp(Xt(o),"gi");a=r.replace(d,l=>(n+=1,`<mark class='apd-json-highlight'>${l}</mark>`))}return{html:t?Ut(a):a,matchCount:n}}import{jsx as O,jsxs as ue}from"react/jsx-runtime";function fe({value:e,raw:t,searchable:o=!0}){let[r,n]=mt(""),[a,s]=mt(0),d=ft(null),l=ft(""),{content:h,isJson:i}=lt(e,t),u=r.trim(),{html:v,matchCount:b}=Jt(()=>ct(h,i,u),[h,i,u]);ut(()=>{let x=u!==l.current;l.current=u,(x||a>=b)&&s(0)},[u,b]),ut(()=>{var y;if(!d.current)return;let x=d.current.querySelectorAll("mark.apd-json-highlight");x.forEach((T,L)=>T.classList.toggle("apd-active",L===a)),(y=x[a])==null||y.scrollIntoView({block:"center",behavior:"smooth"})},[v,a]);function S(x){b!==0&&s(y=>(y+x+b)%b)}return ue("div",{children:[o&&h.length>0&&ue("div",{className:"apd-json-search",children:[ue("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[O("circle",{cx:"11",cy:"11",r:"7"}),O("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]}),O("input",{type:"text",placeholder:"Find in payload...",value:r,onChange:x=>n(x.target.value),onKeyDown:x=>{x.key==="Enter"&&(x.preventDefault(),S(x.shiftKey?-1:1))},spellCheck:!1}),r&&O("span",{className:"apd-json-search-count",children:b>0?`${a+1} / ${b}`:"No matches"}),r&&b>0&&ue("div",{className:"apd-json-search-nav",children:[O("button",{type:"button",onClick:()=>S(-1),"aria-label":"Previous match",title:"Previous match (Shift+Enter)",children:"\u2191"}),O("button",{type:"button",onClick:()=>S(1),"aria-label":"Next match",title:"Next match (Enter)",children:"\u2193"})]})]}),O("pre",{ref:d,className:"apd-json",dangerouslySetInnerHTML:{__html:v}})]})}function me(e){return`'${e.replace(/'/g,"'\\''")}'`}function _t(e){let t=e.trim();if(!t||!(t.startsWith("{")||t.startsWith("[")))return!1;try{return JSON.parse(t),!0}catch{return!1}}function qe(e){let t=[`curl -X ${e.method} ${me(e.url)}`],o=Object.keys(e.requestHeaders).some(r=>r.toLowerCase()==="content-type");for(let[r,n]of Object.entries(e.requestHeaders))/^(host|content-length|connection)$/i.test(r)||t.push(`  -H ${me(`${r}: ${n}`)}`);return e.requestBodyRaw&&(!o&&_t(e.requestBodyRaw)&&t.push(`  -H ${me("Content-Type: application/json")}`),t.push(`  --data-raw ${me(e.requestBodyRaw)}`)),t.join(` \\
`)}import{jsx as p,jsxs as k}from"react/jsx-runtime";function Y({title:e,count:t,defaultOpen:o=!0,children:r}){let[n,a]=Kt(o);return k("div",{className:"apd-section",children:[k("div",{className:"apd-section-header",onClick:()=>a(s=>!s),children:[k("span",{children:[e,typeof t=="number"?` (${t})`:""]}),p("span",{children:n?"\u2212":"+"})]}),n&&p("div",{className:"apd-section-body",children:r})]})}function Me({data:e}){let t=Object.entries(e);return t.length===0?p("div",{className:"apd-section-body apd-empty-body",children:"None"}):p("div",{className:"apd-kv",children:t.map(([o,r])=>k(Vt,{children:[p("div",{className:"apd-kv-key",children:o}),p("div",{className:"apd-kv-val",children:r})]},o))})}function gt({log:e,onTogglePin:t}){var a,s,d,l,h;if(!e)return p("div",{className:"apd-detail",children:p("div",{className:"apd-detail-empty",children:"Select a request to see full details"})});let o=qe(e),r=(s=(a=F(e.requestBody))!=null?a:e.requestBodyRaw)!=null?s:"",n=(l=(d=F(e.responseBody))!=null?d:e.responseBodyRaw)!=null?l:"";return k("div",{className:"apd-detail",children:[k("div",{className:"apd-detail-header",children:[k("div",{className:"apd-detail-url",children:[p("strong",{children:e.method})," ",e.url]}),p("button",{type:"button",className:"apd-action-btn",onClick:()=>t(e.id),title:e.pinned?"Unpin":"Pin this request",children:e.pinned?"\u2605 Pinned":"\u2606 Pin"})]}),k("div",{className:"apd-meta-grid",children:[k("div",{children:[p("div",{className:"apd-meta-label",children:"Status"}),k("div",{className:"apd-meta-value",style:{color:e.success?"var(--apd-success)":"var(--apd-error)"},children:[(h=e.responseStatus)!=null?h:"Failed"," ",e.responseStatusText]})]}),k("div",{children:[p("div",{className:"apd-meta-label",children:"Duration"}),p("div",{className:"apd-meta-value",children:re(e.duration)})]}),k("div",{children:[p("div",{className:"apd-meta-label",children:"Time"}),p("div",{className:"apd-meta-value",children:X(e.timestamp)})]}),k("div",{children:[p("div",{className:"apd-meta-label",children:"Source"}),p("div",{className:"apd-meta-value",children:e.source})]}),k("div",{children:[p("div",{className:"apd-meta-label",children:"Req. size"}),p("div",{className:"apd-meta-value",children:ve(e.requestSize)})]}),k("div",{children:[p("div",{className:"apd-meta-label",children:"Res. size"}),p("div",{className:"apd-meta-value",children:ve(e.responseSize)})]})]}),e.error&&k("div",{className:"apd-section",style:{borderColor:"var(--apd-error)"},children:[p("div",{className:"apd-section-header",style:{color:"var(--apd-error)"},children:"Error"}),p("div",{className:"apd-section-body",children:e.error})]}),k("div",{className:"apd-actions",children:[p(ce,{label:"Copy cURL",getText:()=>o}),p(ce,{label:"Copy Request",getText:()=>r}),p(ce,{label:"Copy Response",getText:()=>n})]}),p(Y,{title:"cURL",children:p(fe,{value:o,searchable:!1})}),p(Y,{title:"Query Params",count:Object.keys(e.queryParams).length,defaultOpen:!1,children:p(Me,{data:e.queryParams})}),p(Y,{title:"Request Headers",count:Object.keys(e.requestHeaders).length,defaultOpen:!1,children:p(Me,{data:e.requestHeaders})}),p(Y,{title:"Request Body",children:e.requestBodyRaw?p(fe,{value:e.requestBody,raw:e.requestBodyRaw}):p("div",{className:"apd-empty-body",children:"No body"})}),p(Y,{title:"Response Headers",count:Object.keys(e.responseHeaders).length,defaultOpen:!1,children:p(Me,{data:e.responseHeaders})}),p(Y,{title:"Response Body",children:e.responseBodyRaw?p(fe,{value:e.responseBody,raw:e.responseBodyRaw}):p("div",{className:"apd-empty-body",children:"No body"})})]})}import{useState as Yt}from"react";import{jsx as q,jsxs as ge}from"react/jsx-runtime";var Wt={log:"\u25B8",info:"\u2139",warn:"\u26A0",error:"\u2715",debug:"\u2699"};function Gt({entry:e}){var r;let[t,o]=Yt(!1);return ge("div",{className:`apd-console-item apd-console-${e.level}`,children:[q("span",{className:"apd-console-icon",children:(r=Wt[e.level])!=null?r:"\u25B8"}),ge("div",{className:"apd-console-body",children:[q("div",{className:"apd-console-preview",children:e.preview||"(empty)"}),ge("div",{className:"apd-console-meta",children:[q("span",{children:X(e.timestamp)}),e.source!=="console"&&q("span",{children:e.source}),e.stack&&q("button",{type:"button",className:"apd-console-toggle-stack",onClick:()=>o(n=>!n),children:t?"Hide stack trace":"Show stack trace"})]}),t&&e.stack&&q("div",{className:"apd-console-stack",children:e.stack})]}),e.count>1&&q("span",{className:"apd-console-count",children:e.count})]})}function ht({entries:e}){return e.length===0?q("div",{className:"apd-console-list",children:ge("div",{className:"apd-empty",children:["Nothing logged yet.",q("br",{}),"console.log/warn/error and uncaught errors will show up here."]})}):q("div",{className:"apd-console-list",children:e.map(t=>q(Gt,{entry:t},t.id))})}function bt(e){return Object.entries(e).map(([t,o])=>({name:t,value:o}))}function Qt(e){return Object.entries(e).map(([t,o])=>({name:t,value:o}))}function Ae(e){return{log:{version:"1.2",creator:{name:"next-api-debugger",version:"0.1.0"},entries:e.map(t=>{var o,r;return{startedDateTime:new Date(t.timestamp).toISOString(),time:t.duration,request:{method:t.method,url:t.url,httpVersion:"HTTP/1.1",headers:bt(t.requestHeaders),queryString:Qt(t.queryParams),cookies:[],headersSize:-1,bodySize:t.requestSize,postData:t.requestBodyRaw?{mimeType:t.requestHeaders["content-type"]||"application/json",text:t.requestBodyRaw}:void 0},response:{status:(o=t.responseStatus)!=null?o:0,statusText:t.responseStatusText,httpVersion:"HTTP/1.1",headers:bt(t.responseHeaders),cookies:[],content:{size:t.responseSize,mimeType:t.responseHeaders["content-type"]||"application/json",text:(r=t.responseBodyRaw)!=null?r:""},redirectURL:"",headersSize:-1,bodySize:t.responseSize},cache:{},timings:{send:0,wait:t.duration,receive:0}}})}}}function Be(e,t){let o=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),r=URL.createObjectURL(o),n=document.createElement("a");n.href=r,n.download=e,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(r)}import{Fragment as he,jsx as g,jsxs as R}from"react/jsx-runtime";var eo=["GET","POST","PUT","PATCH","DELETE"],to=["log","info","warn","error","debug"];function vt({logs:e,consoleEntries:t,onClose:o,onClear:r,onClearConsole:n,onTogglePin:a,theme:s,onToggleTheme:d}){var De,ze,Oe;let[l,h]=W("network"),[i,u]=W({search:"",status:"all",methods:[]}),[v,b]=W(null),[S,x]=W(!1),[y,T]=W(""),[L,f]=W([]);Zt(()=>{!v&&e.length>0&&b(e[0].id)},[e,v]);let C=xt(()=>{let c=i.search.trim().toLowerCase();return e.filter(m=>{var U;return!(i.status==="success"&&!m.success||i.status==="failed"&&m.success||i.methods.length>0&&!i.methods.includes(m.method)||c&&!`${m.url} ${m.endpoint} ${m.method} ${(U=m.responseStatus)!=null?U:""}`.toLowerCase().includes(c))})},[e,i]),P=xt(()=>{let c=y.trim().toLowerCase();return t.filter(m=>!(L.length>0&&!L.includes(m.level)||c&&!m.preview.toLowerCase().includes(c)))},[t,y,L]),N=(ze=(De=C.find(c=>c.id===v))!=null?De:C[0])!=null?ze:null,I=e.filter(c=>!c.success).length,$=t.filter(c=>c.level==="error").length;function oe(c){u(m=>({...m,methods:m.methods.includes(c)?m.methods.filter(U=>U!==c):[...m.methods,c]}))}function wt(c){f(m=>m.includes(c)?m.filter(U=>U!==c):[...m,c])}return g("div",{className:"apd-overlay",onClick:o,children:R("div",{className:`apd-modal${S?" apd-minimized":""}`,onClick:c=>c.stopPropagation(),children:[R("div",{className:"apd-header",children:[R("div",{className:"apd-header-title",children:[g("span",{className:"apd-live-dot"}),"API Debugger"]}),g("span",{className:"apd-header-count",children:l==="network"?`${e.length} requests${I>0?` \xB7 ${I} failed`:""}`:`${t.length} logs${$>0?` \xB7 ${$} errors`:""}`}),g("div",{className:"apd-spacer"}),g("button",{className:"apd-icon-btn",onClick:d,title:"Toggle theme",type:"button",children:s==="light"?"\u2600":"\u263E"}),l==="network"&&R(he,{children:[g("button",{className:"apd-icon-btn",title:"Export JSON",type:"button",onClick:()=>Be(`api-logs-${Date.now()}.json`,e),children:"\u2B73"}),g("button",{className:"apd-icon-btn",title:"Export HAR",type:"button",onClick:()=>Be(`api-logs-${Date.now()}.har`,Ae(e)),children:"HAR"})]}),g("button",{className:"apd-icon-btn",title:l==="network"?"Clear logs":"Clear console",type:"button",onClick:l==="network"?r:n,children:"\u{1F5D1}"}),g("button",{className:"apd-icon-btn",title:S?"Restore":"Minimize",type:"button",onClick:()=>x(c=>!c),children:S?"\u25A2":"\u2014"}),g("button",{className:"apd-icon-btn",title:"Close",type:"button",onClick:o,children:"\u2715"})]}),!S&&R(he,{children:[R("div",{className:"apd-tabs",children:[R("button",{type:"button",className:w("apd-tab",l==="network"&&"apd-active"),onClick:()=>h("network"),children:["Network",e.length>0&&g("span",{className:w("apd-tab-badge",I>0&&"apd-tab-badge-error"),children:e.length})]}),R("button",{type:"button",className:w("apd-tab",l==="console"&&"apd-active"),onClick:()=>h("console"),children:["Console",t.length>0&&g("span",{className:w("apd-tab-badge",$>0&&"apd-tab-badge-error"),children:t.length})]})]}),l==="network"?R(he,{children:[R("div",{className:"apd-toolbar",children:[g(Ne,{value:i.search,onChange:c=>u(m=>({...m,search:c}))}),g(it,{status:i.status,onStatusChange:c=>u(m=>({...m,status:c})),methods:eo,activeMethods:i.methods,onToggleMethod:oe})]}),R("div",{className:"apd-body",children:[g(pt,{logs:C,selectedId:(Oe=N==null?void 0:N.id)!=null?Oe:null,onSelect:b,onTogglePin:a}),g(gt,{log:N,onTogglePin:a})]})]}):R(he,{children:[R("div",{className:"apd-toolbar",children:[g(Ne,{value:y,onChange:T}),to.map(c=>g("button",{type:"button",className:w("apd-chip",L.includes(c)&&"apd-active"),onClick:()=>wt(c),children:c},c))]}),g(ht,{entries:P})]}),R("div",{className:"apd-footer",children:[R("span",{children:[g("span",{className:"apd-kbd",children:"Ctrl"}),"+",g("span",{className:"apd-kbd",children:"Shift"}),"+",g("span",{className:"apd-kbd",children:"D"})," to toggle"]}),g("span",{style:{marginLeft:"auto"},children:"next-api-debugger \xB7 dev only"})]})]})]})})}import{jsx as je,jsxs as ao}from"react/jsx-runtime";function ro(e){return typeof e=="boolean"?e:process.env.NODE_ENV!=="production"}function no(e){let{enabled:t,maxLogs:o=200,initialPosition:r,axiosInstance:n,theme:a="dark",keyboardShortcut:s=!0,ignoreUrls:d}=e,l=ro(t),[h,i]=yt(!1),[u,v]=yt(a),{logs:b,clear:S,togglePin:x}=Ke(),{entries:y,clear:T}=Ye();if(oo(()=>{if(!l||typeof window=="undefined")return;E.setMaxLogs(o),H.setMaxEntries(500),ye({ignoreUrls:d}),$e({ignoreUrls:d}),Je();let P=n?ke(n,{ignoreUrls:d}):()=>{};return()=>{we(),Ue(),_e(),P()}},[l]),We({ctrl:!0,shift:!0,key:"d"},()=>i(P=>!P),l&&s),!l)return null;let L=b.filter(P=>!P.success).length,f=y.filter(P=>P.level==="error").length,C=u==="system"?"dark":u;return ao("div",{className:`apd-root${C==="light"?" apd-light":""}`,children:[je(Ze,{}),!h&&je(at,{count:b.length+y.length,hasErrors:L>0||f>0,onOpen:()=>i(!0),initialPosition:r}),h&&je(vt,{logs:b,consoleEntries:y,onClose:()=>i(!1),onClear:S,onClearConsole:T,onTogglePin:x,theme:C,onToggleTheme:()=>v(C==="light"?"dark":"light")})]})}export{no as ApiDebugger,Ae as exportAsHar,qe as generateCurl,ke as installAxiosInterceptor,ye as installFetchInterceptor,E as logStore,we as uninstallFetchInterceptor};
//# sourceMappingURL=index.mjs.map