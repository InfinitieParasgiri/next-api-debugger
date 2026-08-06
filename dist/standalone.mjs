var Le=class{constructor(){this.logs=[];this.listeners=new Set;this.maxLogs=200;this.snapshot=[];this.getLogs=()=>(this.snapshot=this.logs,this.snapshot);this.subscribe=t=>(this.listeners.add(t),()=>this.listeners.delete(t))}setMaxLogs(t){this.maxLogs=Math.max(1,t),this.trim()}addLog(t){this.logs=[t,...this.logs],this.trim(),this.emit()}togglePin(t){this.logs=this.logs.map(o=>o.id===t?{...o,pinned:!o.pinned}:o),this.emit()}clear(){this.logs=[],this.emit()}trim(){if(this.logs.length<=this.maxLogs)return;let t=this.logs.filter(a=>a.pinned),n=this.logs.filter(a=>!a.pinned).slice(0,Math.max(0,this.maxLogs-t.length)),r=[...t,...n];r.sort((a,i)=>i.timestamp-a.timestamp),this.logs=r}emit(){this.listeners.forEach(t=>t())}},R=new Le;var Ee=class{constructor(){this.entries=[];this.listeners=new Set;this.maxEntries=500;this.getEntries=()=>this.entries;this.subscribe=t=>(this.listeners.add(t),()=>this.listeners.delete(t))}setMaxEntries(t){this.maxEntries=Math.max(1,t),this.trim()}addEntry(t){let o=this.entries[0];o&&o.level===t.level&&o.preview===t.preview&&o.stack===t.stack?this.entries=[{...o,count:o.count+1,timestamp:t.timestamp},...this.entries.slice(1)]:this.entries=[t,...this.entries],this.trim(),this.emit()}clear(){this.entries=[],this.emit()}trim(){this.entries.length>this.maxEntries&&(this.entries=this.entries.slice(0,this.maxEntries))}emit(){this.listeners.forEach(t=>t())}},M=new Ee;var P="x-apd-skip";function B(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,9)}`}function I(e){if(!e)return null;try{return JSON.parse(e)}catch{return e}}function X(e){if(e==null)return null;if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return String(e)}}function $(e){if(!e)return 0;try{return new Blob([e]).size}catch{return e.length}}function Se(e){if(!e)return"0 B";let t=["B","KB","MB","GB"],o=Math.min(t.length-1,Math.floor(Math.log(e)/Math.log(1024))),n=e/Math.pow(1024,o);return`${o===0?n:n.toFixed(1)} ${t[o]}`}function ie(e){return e<1e3?`${e} ms`:`${(e/1e3).toFixed(2)} s`}function J(e){let t=new Date(e);return t.toLocaleTimeString(void 0,{hour12:!1})+`.${String(t.getMilliseconds()).padStart(3,"0")}`}function F(e){try{let t=typeof window!="undefined"?window.location.origin:"http://localhost",o=new URL(e,t),n={};return o.searchParams.forEach((r,a)=>{n[a]=r}),{endpoint:o.pathname,queryParams:n}}catch{return{endpoint:e,queryParams:{}}}}function de(e){let t={};return e&&e.forEach((o,n)=>{t[n]=o}),t}function Q(e){let t={};if(!e)return t;if(typeof e.toJSON=="function")return{...e.toJSON()};if(e instanceof Headers)return de(e);if(typeof e=="object")for(let[o,n]of Object.entries(e))n!=null&&(t[o]=String(n));return t}function _(e,t){return!t||t.length===0?!1:t.some(o=>o instanceof RegExp?o.test(e):e.includes(o))}async function De(e){try{if(navigator.clipboard&&window.isSecureContext)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select();let o=document.execCommand("copy");return document.body.removeChild(t),o}catch{return!1}}var O=null,pe=!1;function ht(e){if(e==null)return null;if(typeof e=="string")return e;if(e instanceof URLSearchParams)return e.toString();if(e instanceof FormData){let t=[];return e.forEach((o,n)=>{t.push(`${n}=${o instanceof File?`[File: ${o.name}]`:o}`)}),t.join("&")}return"[binary data]"}function Ne(e={}){pe||typeof window=="undefined"||typeof window.fetch!="function"||(O=window.fetch.bind(window),pe=!0,window.fetch=async function(o,n){var v,C,w,k,E;let r=o instanceof Request?o:null,a=r?r.url:String(o);if(_(a,e.ignoreUrls))return O(o,n);let i=de(new Headers((C=(v=n==null?void 0:n.headers)!=null?v:r==null?void 0:r.headers)!=null?C:void 0));if(i[P]){let g=new Headers((k=(w=n==null?void 0:n.headers)!=null?w:r==null?void 0:r.headers)!=null?k:void 0);return g.delete(P),r?O(new Request(r,{headers:g})):O(o,{...n,headers:g})}let d=Date.now(),p=performance.now(),c=((n==null?void 0:n.method)||(r==null?void 0:r.method)||"GET").toUpperCase(),{endpoint:l,queryParams:u}=F(a),f=ht((E=n==null?void 0:n.body)!=null?E:null),y={id:B(),url:a,endpoint:l,method:c,requestHeaders:i,requestBody:I(f),requestBodyRaw:f,queryParams:u,timestamp:d,source:"fetch",requestSize:$(f),pinned:!1};try{let g=await O(o,n),T=Math.round(performance.now()-p),x=g.clone(),b=null;try{b=await x.text()}catch{b=null}return R.addLog({...y,duration:T,responseStatus:g.status,responseStatusText:g.statusText,responseHeaders:de(g.headers),responseBody:I(b),responseBodyRaw:b,responseSize:$(b),success:g.ok,error:g.ok?null:`HTTP ${g.status} ${g.statusText}`}),g}catch(g){let T=Math.round(performance.now()-p);throw R.addLog({...y,duration:T,responseStatus:null,responseStatusText:"",responseHeaders:{},responseBody:null,responseBodyRaw:null,responseSize:0,success:!1,error:(g==null?void 0:g.message)||"Network error"}),g}})}function Xe(){pe&&O&&typeof window!="undefined"&&(window.fetch=O),pe=!1,O=null}var Z=null,W=null,ee=null,le=!1,V=Symbol("apd-xhr-meta");function bt(e){let t={};return e.trim().split(/[\r\n]+/).forEach(o=>{let n=o.indexOf(":");if(n===-1)return;let r=o.slice(0,n).trim().toLowerCase(),a=o.slice(n+1).trim();r&&(t[r]=a)}),t}function Je(e={}){le||typeof window=="undefined"||typeof XMLHttpRequest=="undefined"||(Z=XMLHttpRequest.prototype.open,W=XMLHttpRequest.prototype.send,ee=XMLHttpRequest.prototype.setRequestHeader,le=!0,XMLHttpRequest.prototype.open=function(o,n,...r){let a=String(n);return this[V]={id:B(),method:(o||"GET").toUpperCase(),url:a,startTime:0,startPerf:0,requestHeaders:{},ignored:_(a,e.ignoreUrls)},Z.apply(this,[o,n,...r])},XMLHttpRequest.prototype.setRequestHeader=function(o,n){if(o.toLowerCase()===P){this[V]&&(this[V].ignored=!0);return}return this[V]&&(this[V].requestHeaders[o]=n),ee.apply(this,[o,n])},XMLHttpRequest.prototype.send=function(o){let n=this[V];if(!n||n.ignored)return W.apply(this,[o]);n.startTime=Date.now(),n.startPerf=performance.now();let r=o==null?null:typeof o=="string"?o:o instanceof URLSearchParams?o.toString():o instanceof FormData?"[form data]":"[binary data]",a=()=>{let i=Math.round(performance.now()-n.startPerf),{endpoint:d,queryParams:p}=F(n.url),c=bt(this.getAllResponseHeaders()||""),l=null;try{l=typeof this.responseText=="string"?this.responseText:null}catch{l=null}let u=this.status,f=u>=200&&u<400,y={id:n.id,url:n.url,endpoint:d,method:n.method,requestHeaders:n.requestHeaders,requestBody:I(r),requestBodyRaw:r,queryParams:p,responseStatus:u||null,responseStatusText:this.statusText||"",responseHeaders:c,responseBody:I(l),responseBodyRaw:l,duration:i,timestamp:n.startTime,success:f,error:f?null:u===0?"Network error":`HTTP ${u} ${this.statusText}`,source:"xhr",requestSize:$(r),responseSize:$(l),pinned:!1};R.addLog(y),this.removeEventListener("loadend",a)};return this.addEventListener("loadend",a),W.apply(this,[o])})}function Fe(){le&&typeof window!="undefined"&&typeof XMLHttpRequest!="undefined"&&(Z&&(XMLHttpRequest.prototype.open=Z),W&&(XMLHttpRequest.prototype.send=W),ee&&(XMLHttpRequest.prototype.setRequestHeader=ee)),le=!1,Z=null,W=null,ee=null}function xt(e){let t=(e==null?void 0:e.baseURL)||"",o=(e==null?void 0:e.url)||"",n=/^https?:\/\//i.test(o)?o:`${t}${t&&!t.endsWith("/")&&!o.startsWith("/")?"/":""}${o}`;if(e!=null&&e.params&&typeof e.params=="object"){let r=yt(e.params);r&&(n+=(n.includes("?")?"&":"?")+r)}return n}function yt(e){let t=new URLSearchParams;for(let[o,n]of Object.entries(e))n!=null&&(Array.isArray(n)?n.forEach(r=>t.append(o,String(r))):t.append(o,String(n)));return t.toString()}function _e(e){if(e==null)return null;if(typeof e=="string")return e;if(typeof URLSearchParams!="undefined"&&e instanceof URLSearchParams)return e.toString();if(typeof FormData!="undefined"&&e instanceof FormData){let t=[];return e.forEach((o,n)=>{t.push(`${n}=${o instanceof File?`[File: ${o.name}]`:o}`)}),t.join("&")}return X(e)}function Ve(e,t={}){var a;if(!e||!e.interceptors||typeof((a=e.interceptors.request)==null?void 0:a.use)!="function")return()=>{};if(e.__apiDebuggerInstalled)return()=>{};e.__apiDebuggerInstalled=!0;let o=e.interceptors.request.use(i=>{let d={id:B(),startTime:Date.now(),startPerf:performance.now(),requestBodyRaw:_e(i.data),requestHeadersSnapshot:Q(i.headers)};return i.__apdMeta=d,i.headers&&typeof i.headers.set=="function"?i.headers.set(P,"1"):i.headers={...i.headers||{},[P]:"1"},i});function n(i,d,p){var T,x,b,L,j,q;if(!i)return;let c=xt(i);if(_(c,t.ignoreUrls))return;let l=i.__apdMeta||{id:B(),startTime:Date.now(),startPerf:performance.now(),requestBodyRaw:_e(i.data),requestHeadersSnapshot:Q(i.headers)},u=Math.round(performance.now()-l.startPerf),{endpoint:f,queryParams:y}=F(c),v=Q(i.headers),C=Object.keys(v).length>0?v:l.requestHeadersSnapshot;delete C[P];let w=l.requestBodyRaw,k=(d==null?void 0:d.data)!==void 0?X(d.data):null,E=(b=(x=d==null?void 0:d.status)!=null?x:(T=p==null?void 0:p.response)==null?void 0:T.status)!=null?b:null,g={id:l.id,url:c,endpoint:f,method:(i.method||"get").toUpperCase(),requestHeaders:C,requestBody:(L=I(w))!=null?L:w,requestBodyRaw:w,queryParams:y,responseStatus:E,responseStatusText:(j=d==null?void 0:d.statusText)!=null?j:"",responseHeaders:Q(d==null?void 0:d.headers),responseBody:(q=d==null?void 0:d.data)!=null?q:null,responseBodyRaw:k,duration:u,timestamp:l.startTime,success:!p&&!!E&&E<400,error:p?p.message||"Request failed":null,source:"axios",requestSize:$(w),responseSize:$(k),pinned:!1};R.addLog(g)}let r=e.interceptors.response.use(i=>(n(i.config,i),i),i=>(n(i==null?void 0:i.config,i==null?void 0:i.response,i),Promise.reject(i)));return()=>{e.interceptors.request.eject(o),e.interceptors.response.eject(r),e.__apiDebuggerInstalled=!1}}var We=["log","info","warn","error","debug"],Ce={},te=null,ne=null,He=!1;function vt(e,t=new WeakSet){var o;if(e===null)return"null";if(e===void 0)return"undefined";if(typeof e=="string")return e;if(typeof e=="number"||typeof e=="boolean")return String(e);if(e instanceof Error)return`${e.name}: ${e.message}`;if(typeof e=="function")return e.name?`\u0192 ${e.name}()`:"\u0192 ()";if(typeof e=="object"){if(t.has(e))return"[Circular]";t.add(e);try{return(o=JSON.stringify(e,(n,r)=>typeof r=="bigint"?r.toString():r,2))!=null?o:String(e)}catch{return Array.isArray(e)?"[Array]":"[Object]"}}return String(e)}function wt(e){for(let t of e)if(t instanceof Error&&t.stack)return t.stack;return null}function Re(e,t,o){let n=t.map(r=>vt(r));return{id:B(),level:e,parts:n,preview:n.join(" "),stack:wt(t),timestamp:Date.now(),source:o,count:1}}function Ke(e={}){var o,n;if(He||typeof window=="undefined"||typeof console=="undefined")return;He=!0;let t=(o=e.levels)!=null?o:We;for(let r of t){let a=(n=console[r])==null?void 0:n.bind(console);a&&(Ce[r]=a,console[r]=(...i)=>{M.addEntry(Re(r,i,"console")),a(...i)})}te=r=>{let a=r.error?[r.error]:[r.message],i=Re("error",a,"window.onerror");M.addEntry({...i,preview:i.preview||`${r.message} (${r.filename}:${r.lineno}:${r.colno})`})},window.addEventListener("error",te),ne=r=>{let a=r.reason,i=Re("error",[a],"unhandledrejection");M.addEntry({...i,preview:`Unhandled promise rejection: ${i.preview}`})},window.addEventListener("unhandledrejection",ne)}function Ge(){if(typeof console!="undefined")for(let e of We){let t=Ce[e];t&&(console[e]=t)}typeof window!="undefined"&&(te&&window.removeEventListener("error",te),ne&&window.removeEventListener("unhandledrejection",ne)),Ce={},te=null,ne=null,He=!1}var Ye=`
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
`;function s(e,t,o){let n=document.createElement(e);if(t)for(let[r,a]of Object.entries(t))a==null||a===!1||(r.startsWith("on")&&typeof a=="function"?n.addEventListener(r.slice(2).toLowerCase(),a):r==="class"?n.className=String(a):r==="html"?n.innerHTML=String(a):typeof a=="boolean"?a&&n.setAttribute(r,""):n.setAttribute(r,String(a)));if(o)for(let r of o)r==null||r===!1||n.appendChild(typeof r=="string"?document.createTextNode(r):r);return n}function K(e){for(;e.firstChild;)e.removeChild(e.firstChild)}var ce=56,Qe=5,Ze="apd-button-position";function oe(e){return{x:Math.min(Math.max(8,e.x),window.innerWidth-ce-8),y:Math.min(Math.max(8,e.y),window.innerHeight-ce-8)}}function kt(){try{let e=sessionStorage.getItem(Ze);if(e)return oe(JSON.parse(e))}catch{}return oe({x:window.innerWidth-ce-24,y:window.innerHeight-ce-24})}function et(e,t){let o=s("span",{class:"apd-btn-dot"},["0"]);o.style.display="none";let n=document.createElementNS("http://www.w3.org/2000/svg","svg");n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2"),n.setAttribute("stroke-linecap","round"),n.setAttribute("stroke-linejoin","round"),n.innerHTML='<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>';let r=s("button",{type:"button",class:"apd-btn","aria-label":"Open API debugger",title:"API Debugger (drag to move)"},[n,o]),a=t?oe(t):kt();r.style.left=`${a.x}px`,r.style.top=`${a.y}px`;let i=!1,d=!1,p={x:0,y:0,posX:0,posY:0};r.addEventListener("pointerdown",l=>{i=!0,d=!1,p={x:l.clientX,y:l.clientY,posX:a.x,posY:a.y},r.setPointerCapture(l.pointerId)}),r.addEventListener("pointermove",l=>{if(!i)return;let u=l.clientX-p.x,f=l.clientY-p.y;(Math.abs(u)>Qe||Math.abs(f)>Qe)&&(d=!0),a=oe({x:p.posX+u,y:p.posY+f}),r.style.left=`${a.x}px`,r.style.top=`${a.y}px`}),r.addEventListener("pointerup",()=>{i=!1;try{sessionStorage.setItem(Ze,JSON.stringify(a))}catch{}}),r.addEventListener("click",()=>{d||e()}),window.addEventListener("resize",()=>{a=oe(a),r.style.left=`${a.x}px`,r.style.top=`${a.y}px`});function c(l,u){o.textContent=l>99?"99+":String(l),o.style.display=l>0?"":"none",o.classList.toggle("apd-has-errors",u)}return{el:r,setCount:c}}function tt(e){return Object.entries(e).map(([t,o])=>({name:t,value:o}))}function Lt(e){return Object.entries(e).map(([t,o])=>({name:t,value:o}))}function nt(e){return{log:{version:"1.2",creator:{name:"next-api-debugger",version:"0.1.0"},entries:e.map(t=>{var o,n;return{startedDateTime:new Date(t.timestamp).toISOString(),time:t.duration,request:{method:t.method,url:t.url,httpVersion:"HTTP/1.1",headers:tt(t.requestHeaders),queryString:Lt(t.queryParams),cookies:[],headersSize:-1,bodySize:t.requestSize,postData:t.requestBodyRaw?{mimeType:t.requestHeaders["content-type"]||"application/json",text:t.requestBodyRaw}:void 0},response:{status:(o=t.responseStatus)!=null?o:0,statusText:t.responseStatusText,httpVersion:"HTTP/1.1",headers:tt(t.responseHeaders),cookies:[],content:{size:t.responseSize,mimeType:t.responseHeaders["content-type"]||"application/json",text:(n=t.responseBodyRaw)!=null?n:""},redirectURL:"",headersSize:-1,bodySize:t.responseSize},cache:{},timings:{send:0,wait:t.duration,receive:0}}})}}}function Te(e,t){let o=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),n=URL.createObjectURL(o),r=document.createElement("a");r.href=n,r.download=e,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(n)}function Et(e){return["GET","POST","PUT","PATCH","DELETE"].includes(e.toUpperCase())?`apd-method-${e.toUpperCase()}`:"apd-method-OTHER"}function ot(e,t){let o=s("div",{class:"apd-list"});function n(r,a){var i;if(K(o),r.length===0){o.appendChild(s("div",{class:"apd-empty"},["No requests captured yet.",s("br"),"Make an API call and it'll show up here."]));return}for(let d of r){let p=d.id===a,c=s("div",{class:"apd-item-row1"},[s("span",{class:`apd-method ${Et(d.method)}`},[d.method]),s("span",{class:"apd-item-url",title:d.url},[d.endpoint]),s("span",{class:`apd-status-dot ${d.success?"apd-ok":"apd-fail"}`})]);if(d.pinned){let f=s("button",{class:"apd-pin-star",style:"background:none;border:none;cursor:pointer;padding:0",title:"Unpin","aria-label":"Unpin request"},["\u2605"]);f.addEventListener("click",y=>{y.stopPropagation(),t(d.id)}),c.appendChild(f)}let l=s("div",{class:"apd-item-row2"},[s("span",{},[String((i=d.responseStatus)!=null?i:d.error?"ERR":"\u2014")]),s("span",{},[ie(d.duration)]),s("span",{},[J(d.timestamp)]),s("span",{style:"margin-left:auto;text-transform:uppercase"},[d.source])]),u=s("div",{class:`apd-item${p?" apd-selected":""}`,role:"button",tabindex:"0"},[c,l]);u.addEventListener("click",()=>e(d.id)),u.addEventListener("keydown",f=>{f.key==="Enter"&&e(d.id)}),o.appendChild(u)}}return{el:o,render:n}}function ue(e){return`'${e.replace(/'/g,"'\\''")}'`}function St(e){let t=e.trim();if(!t||!(t.startsWith("{")||t.startsWith("[")))return!1;try{return JSON.parse(t),!0}catch{return!1}}function rt(e){let t=[`curl -X ${e.method} ${ue(e.url)}`],o=Object.keys(e.requestHeaders).some(n=>n.toLowerCase()==="content-type");for(let[n,r]of Object.entries(e.requestHeaders))/^(host|content-length|connection)$/i.test(n)||t.push(`  -H ${ue(`${n}: ${r}`)}`);return e.requestBodyRaw&&(!o&&St(e.requestBodyRaw)&&t.push(`  -H ${ue("Content-Type: application/json")}`),t.push(`  --data-raw ${ue(e.requestBodyRaw)}`)),t.join(` \\
`)}var Rt=/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(\.\d+)?([eE][+-]?\d+)?)/g;function Ct(e){return e.replace(Rt,t=>{let o="apd-json-num";return/^"/.test(t)?o=/:$/.test(t)?"apd-json-key":"apd-json-str":/true|false/.test(t)?o="apd-json-bool":/null/.test(t)&&(o="apd-json-null"),`<span class="${o}">${t}</span>`})}function Ht(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Tt(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function st(e,t){if(e!=null&&typeof e=="object")return{content:JSON.stringify(e,null,2),isJson:!0};if(typeof e=="string")try{return{content:JSON.stringify(JSON.parse(e),null,2),isJson:!0}}catch{return{content:t!=null?t:e,isJson:!1}}return{content:t!=null?t:String(e!=null?e:""),isJson:!1}}function Ae(e,t,o){let n=Ht(e),r=0,a=n;if(o){let d=new RegExp(Tt(o),"gi");a=n.replace(d,p=>(r+=1,`<mark class='apd-json-highlight'>${p}</mark>`))}return{html:t?Ct(a):a,matchCount:r}}function fe(e,t,o=!0){let{content:n,isJson:r}=st(e,t),a="",i=0,d="",p=s("pre",{class:"apd-json"}),c=s("input",{type:"text",placeholder:"Find in payload...",spellcheck:"false"}),l=s("span",{class:"apd-json-search-count"}),u=s("button",{type:"button",title:"Previous match (Shift+Enter)","aria-label":"Previous match"},["\u2191"]),f=s("button",{type:"button",title:"Next match (Enter)","aria-label":"Next match"},["\u2193"]),y=s("div",{class:"apd-json-search-nav"},[u,f]),v=document.createElementNS("http://www.w3.org/2000/svg","svg");v.setAttribute("viewBox","0 0 24 24"),v.setAttribute("fill","none"),v.setAttribute("stroke","currentColor"),v.setAttribute("stroke-width","2"),v.innerHTML='<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>';let C=s("div",{class:"apd-json-search"},[v,c,l,y]);function w(x,b){var L;x.forEach((j,q)=>j.classList.toggle("apd-active",q===i)),(L=x[i])==null||L.scrollIntoView({block:"center",behavior:"smooth"}),l.textContent=a?b>0?`${i+1} / ${b}`:"No matches":"",l.style.display=a?"":"none",y.style.display=a&&b>0?"":"none"}function k(){let x=a.trim(),{html:b,matchCount:L}=Ae(n,r,x);p.innerHTML=b;let j=x!==d;d=x,(j||i>=L)&&(i=0);let q=Array.from(p.querySelectorAll("mark.apd-json-highlight"));w(q,L)}function E(x){let{matchCount:b}=Ae(n,r,a.trim());if(b===0)return;i=(i+x+b)%b;let L=Array.from(p.querySelectorAll("mark.apd-json-highlight"));w(L,b)}c.addEventListener("input",()=>{a=c.value,k()}),c.addEventListener("keydown",x=>{x.key==="Enter"&&(x.preventDefault(),E(x.shiftKey?-1:1))}),u.addEventListener("click",()=>E(-1)),f.addEventListener("click",()=>E(1)),k();let g=o&&n.length>0;return{el:s("div",{},[g?C:null,p])}}function qe(e,t){let o=s("button",{type:"button",class:"apd-action-btn"},[e]);return o.addEventListener("click",async()=>{if(await De(t())){let r=e;o.textContent="Copied",o.classList.add("apd-copied"),setTimeout(()=>{o.textContent=r,o.classList.remove("apd-copied")},1200)}}),o}function G(e,t,o,n){let r=o,a=s("span",{},[r?"\u2212":"+"]),i=`${e}${typeof t=="number"?` (${t})`:""}`,d=s("div",{class:"apd-section-header"},[s("span",{},[i]),a]),p=s("div",{class:"apd-section-body"},[n]);return p.style.display=r?"":"none",d.addEventListener("click",()=>{r=!r,p.style.display=r?"":"none",a.textContent=r?"\u2212":"+"}),s("div",{class:"apd-section"},[d,p])}function Me(e){let t=Object.entries(e);if(t.length===0)return s("div",{class:"apd-empty-body"},["None"]);let o=s("div",{class:"apd-kv"});return t.forEach(([n,r])=>{o.appendChild(s("div",{class:"apd-kv-key"},[n])),o.appendChild(s("div",{class:"apd-kv-val"},[r]))}),o}function at(e){let t=s("div",{class:"apd-detail"});function o(n){var l,u,f,y,v;if(K(t),!n){t.appendChild(s("div",{class:"apd-detail-empty"},["Select a request to see full details"]));return}let r=rt(n),a=(u=(l=X(n.requestBody))!=null?l:n.requestBodyRaw)!=null?u:"",i=(y=(f=X(n.responseBody))!=null?f:n.responseBodyRaw)!=null?y:"",d=s("button",{type:"button",class:"apd-action-btn",title:n.pinned?"Unpin":"Pin this request"},[n.pinned?"\u2605 Pinned":"\u2606 Pin"]);d.addEventListener("click",()=>e(n.id)),t.appendChild(s("div",{class:"apd-detail-header"},[s("div",{class:"apd-detail-url"},[s("strong",{},[n.method]),` ${n.url}`]),d]));let p=s("div",{class:"apd-meta-grid"}),c=(C,w,k)=>s("div",{},[s("div",{class:"apd-meta-label"},[C]),s("div",{class:"apd-meta-value",style:k?`color:${k}`:void 0},[w])]);p.appendChild(c("Status",`${(v=n.responseStatus)!=null?v:"Failed"} ${n.responseStatusText}`,n.success?"var(--apd-success)":"var(--apd-error)")),p.appendChild(c("Duration",ie(n.duration))),p.appendChild(c("Time",J(n.timestamp))),p.appendChild(c("Source",n.source)),p.appendChild(c("Req. size",Se(n.requestSize))),p.appendChild(c("Res. size",Se(n.responseSize))),t.appendChild(p),n.error&&t.appendChild(s("div",{class:"apd-section",style:"border-color: var(--apd-error)"},[s("div",{class:"apd-section-header",style:"color: var(--apd-error)"},["Error"]),s("div",{class:"apd-section-body"},[n.error])])),t.appendChild(s("div",{class:"apd-actions"},[qe("Copy cURL",()=>r),qe("Copy Request",()=>a),qe("Copy Response",()=>i)])),t.appendChild(G("cURL",void 0,!0,fe(r,null,!1).el)),t.appendChild(G("Query Params",Object.keys(n.queryParams).length,!1,Me(n.queryParams))),t.appendChild(G("Request Headers",Object.keys(n.requestHeaders).length,!1,Me(n.requestHeaders))),t.appendChild(G("Request Body",void 0,!0,n.requestBodyRaw?fe(n.requestBody,n.requestBodyRaw).el:s("div",{class:"apd-empty-body"},["No body"]))),t.appendChild(G("Response Headers",Object.keys(n.responseHeaders).length,!1,Me(n.responseHeaders))),t.appendChild(G("Response Body",void 0,!0,n.responseBodyRaw?fe(n.responseBody,n.responseBodyRaw).el:s("div",{class:"apd-empty-body"},["No body"])))}return o(null),{el:t,setLog:o}}var At={log:"\u25B8",info:"\u2139",warn:"\u26A0",error:"\u2715",debug:"\u2699"};function qt(e){var i,d;let t=!1,o=s("div",{class:"apd-console-stack"},[(i=e.stack)!=null?i:""]);o.style.display="none";let n=s("div",{class:"apd-console-meta"},[s("span",{},[J(e.timestamp)]),e.source!=="console"?s("span",{},[e.source]):null]);if(e.stack){let p=s("button",{type:"button",class:"apd-console-toggle-stack"},["Show stack trace"]);p.addEventListener("click",()=>{t=!t,p.textContent=t?"Hide stack trace":"Show stack trace",o.style.display=t?"":"none"}),n.appendChild(p)}let r=s("div",{class:"apd-console-body"},[s("div",{class:"apd-console-preview"},[e.preview||"(empty)"]),n,o]);return s("div",{class:`apd-console-item apd-console-${e.level}`},[s("span",{class:"apd-console-icon"},[(d=At[e.level])!=null?d:"\u25B8"]),r,e.count>1?s("span",{class:"apd-console-count"},[String(e.count)]):null])}function it(){let e=s("div",{class:"apd-console-list"});function t(o){if(K(e),o.length===0){e.appendChild(s("div",{class:"apd-empty"},["Nothing logged yet.",s("br"),"console.log/warn/error and uncaught errors will show up here."]));return}for(let n of o)e.appendChild(qt(n))}return{el:e,render:t}}var je=["GET","POST","PUT","PATCH","DELETE"],Pe=["log","info","warn","error","debug"];function dt(e){let t=s("input",{type:"text",placeholder:e}),o=document.createElementNS("http://www.w3.org/2000/svg","svg");return o.setAttribute("viewBox","0 0 24 24"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","2"),o.innerHTML='<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',{el:s("div",{class:"apd-search"},[o,t]),input:t}}function pt(e,t,o,n){let r="network",a={search:"",status:"all",methods:[]},i="",d=[],p=null,c=!1,l="dark",u=[],f=[],y=!1,v=ot(m=>{p=m,z()},e),C=at(e),w=it(),k=s("span",{class:"apd-header-count"}),E=s("button",{class:"apd-icon-btn",title:"Toggle theme",type:"button"},["\u263E"]),g=dt("Filter by URL, endpoint, method or status code..."),T=s("button",{type:"button",class:"apd-chip apd-chip-success"},["Success"]),x=s("button",{type:"button",class:"apd-chip apd-chip-failed"},["Failed"]),b=je.map(m=>s("button",{type:"button",class:"apd-chip"},[m]));T.addEventListener("click",()=>{a={...a,status:a.status==="success"?"all":"success"},z()}),x.addEventListener("click",()=>{a={...a,status:a.status==="failed"?"all":"failed"},z()}),b.forEach((m,S)=>{let h=je[S];m.addEventListener("click",()=>{a={...a,methods:a.methods.includes(h)?a.methods.filter(H=>H!==h):[...a.methods,h]},z()})}),g.input.addEventListener("input",()=>{a={...a,search:g.input.value},z()});let L=s("div",{class:"apd-toolbar"},[g.el,T,x,...b]),j=s("div",{class:"apd-body"},[v.el,C.el]),q=dt("Filter console output..."),ge=Pe.map(m=>s("button",{type:"button",class:"apd-chip"},[m]));ge.forEach((m,S)=>{let h=Pe[S];m.addEventListener("click",()=>{d=d.includes(h)?d.filter(H=>H!==h):[...d,h],se()})}),q.input.addEventListener("input",()=>{i=q.input.value,se()});let re=s("div",{class:"apd-toolbar"},[q.el,...ge]);re.style.display="none",L.style.display="";let U=s("button",{type:"button",class:"apd-tab apd-active"},["Network"]),D=s("button",{type:"button",class:"apd-tab"},["Console"]),Be=s("div",{class:"apd-tabs"},[U,D]);U.addEventListener("click",()=>ze("network")),D.addEventListener("click",()=>ze("console"));let $e=s("div",{class:"apd-footer"},[s("span",{},[s("span",{class:"apd-kbd"},["Ctrl"]),"+",s("span",{class:"apd-kbd"},["Shift"]),"+",s("span",{class:"apd-kbd"},["D"])," to toggle"]),s("span",{style:"margin-left:auto"},["api-debugger \xB7 dev only"])]),Ie=s("button",{class:"apd-icon-btn",title:"Close",type:"button"},["\u2715"]),he=s("button",{class:"apd-icon-btn",title:"Minimize",type:"button"},["\u2014"]),be=s("button",{class:"apd-icon-btn",title:"Clear logs",type:"button"},["\u{1F5D1}"]),xe=s("button",{class:"apd-icon-btn",title:"Export HAR",type:"button"},["HAR"]),ye=s("button",{class:"apd-icon-btn",title:"Export JSON",type:"button"},["\u2B73"]),ut=s("div",{class:"apd-header"},[s("div",{class:"apd-header-title"},[s("span",{class:"apd-live-dot"}),"API Debugger"]),k,s("div",{class:"apd-spacer"}),E,ye,xe,be,he,Ie]),Oe=s("div",{},[j,w.el]);w.el.style.display="none";let ve=s("div",{class:"apd-modal"},[ut,Be,L,re,Oe,$e]);ve.addEventListener("click",m=>m.stopPropagation());let N=s("div",{class:"apd-overlay"},[ve]);N.addEventListener("click",()=>ke()),Ie.addEventListener("click",()=>ke()),he.addEventListener("click",()=>{c=!c,ve.classList.toggle("apd-minimized",c),Be.style.display=c?"none":"",L.style.display=c||r!=="network"?"none":"",re.style.display=c||r!=="console"?"none":"",Oe.style.display=c?"none":"",$e.style.display=c?"none":"",he.textContent=c?"\u25A2":"\u2014"}),be.addEventListener("click",()=>r==="network"?t():o()),ye.addEventListener("click",()=>Te(`api-logs-${Date.now()}.json`,u)),xe.addEventListener("click",()=>Te(`api-logs-${Date.now()}.har`,nt(u))),E.addEventListener("click",()=>{l=l==="light"?"dark":"light",E.textContent=l==="light"?"\u2600":"\u263E";let m=N.closest(".apd-root");m==null||m.classList.toggle("apd-light",l==="light")});function ze(m){r=m,U.classList.toggle("apd-active",r==="network"),D.classList.toggle("apd-active",r==="console"),L.style.display=r==="network"?"":"none",re.style.display=r==="console"?"":"none",j.style.display=r==="network"?"":"none",w.el.style.display=r==="console"?"":"none",be.title=r==="network"?"Clear logs":"Clear console",ye.style.display=r==="network"?"":"none",xe.style.display=r==="network"?"":"none",we()}function we(){if(r==="network"){let h=u.filter(H=>!H.success).length;k.textContent=`${u.length} requests${h>0?` \xB7 ${h} failed`:""}`}else{let h=f.filter(H=>H.level==="error").length;k.textContent=`${f.length} logs${h>0?` \xB7 ${h} errors`:""}`}let m=u.length>0?s("span",{class:`apd-tab-badge${u.some(h=>!h.success)?" apd-tab-badge-error":""}`},[String(u.length)]):null,S=f.length>0?s("span",{class:`apd-tab-badge${f.some(h=>h.level==="error")?" apd-tab-badge-error":""}`},[String(f.length)]):null;U.textContent="Network",m&&U.appendChild(m),D.textContent="Console",S&&D.appendChild(S),U.classList.toggle("apd-active",r==="network"),D.classList.toggle("apd-active",r==="console")}function z(){var H,Ue;let m=a.search.trim().toLowerCase(),S=u.filter(A=>{var ae;return!(a.status==="success"&&!A.success||a.status==="failed"&&A.success||a.methods.length>0&&!a.methods.includes(A.method)||m&&!`${A.url} ${A.endpoint} ${A.method} ${(ae=A.responseStatus)!=null?ae:""}`.toLowerCase().includes(m))});!p&&S.length>0&&(p=S[0].id);let h=(Ue=(H=S.find(A=>A.id===p))!=null?H:S[0])!=null?Ue:null;h&&(p=h.id),v.render(S,p),C.setLog(h),T.classList.toggle("apd-active",a.status==="success"),x.classList.toggle("apd-active",a.status==="failed"),b.forEach((A,ae)=>A.classList.toggle("apd-active",a.methods.includes(je[ae]))),we()}function se(){let m=i.trim().toLowerCase(),S=f.filter(h=>!(d.length>0&&!d.includes(h.level)||m&&!h.preview.toLowerCase().includes(m)));w.render(S),ge.forEach((h,H)=>h.classList.toggle("apd-active",d.includes(Pe[H]))),we()}function ft(m){u=m,y&&z()}function mt(m){f=m,y&&se()}function gt(){y=!0,N.style.display="",z(),se(),n==null||n(!0)}function ke(){y=!1,N.style.display="none",n==null||n(!1)}return N.style.display="none",{el:N,open:gt,close:ke,update:ft,updateConsole:mt,isOpen:()=>y}}var lt="next-api-debugger-styles";function Mt(){if(typeof document=="undefined"||document.getElementById(lt))return;let e=document.createElement("style");e.id=lt,e.textContent=Ye,document.head.appendChild(e)}function ct(e={}){Mt();let t=s("div",{class:"apd-root"});document.body.appendChild(t);let o=et(()=>{o.el.style.display="none",n.open()},e.initialPosition),n=pt(p=>R.togglePin(p),()=>R.clear(),()=>M.clear(),p=>{o.el.style.display=p?"none":""});t.appendChild(o.el),t.appendChild(n.el);function r(){let p=R.getLogs(),c=M.getEntries();n.update(p),n.updateConsole(c);let l=p.some(u=>!u.success)||c.some(u=>u.level==="error");o.setCount(p.length+c.length,l)}let a=R.subscribe(r),i=M.subscribe(r);r();function d(p){(p.ctrlKey||p.metaKey)&&p.shiftKey&&p.key.toLowerCase()==="d"&&(p.preventDefault(),n.isOpen()?n.close():n.open())}return e.keyboardShortcut!==!1&&window.addEventListener("keydown",d),{destroy(){a(),i(),window.removeEventListener("keydown",d),t.remove()}}}var Y=null;function me(e={}){var r,a;if(typeof window=="undefined")return{destroy:()=>{}};if(Y&&(Y.destroy(),Y=null),e.enabled===!1)return{destroy:()=>{}};R.setMaxLogs((r=e.maxLogs)!=null?r:200),M.setMaxEntries((a=e.maxConsoleEntries)!=null?a:500),Ne({ignoreUrls:e.ignoreUrls}),e.captureXhr!==!1&&Je({ignoreUrls:e.ignoreUrls}),e.captureConsole!==!1&&Ke();let t=e.axiosInstance?Ve(e.axiosInstance,{ignoreUrls:e.ignoreUrls}):()=>{},o=ct({initialPosition:e.initialPosition,keyboardShortcut:e.keyboardShortcut}),n={destroy(){Xe(),Fe(),Ge(),t(),o.destroy(),Y===n&&(Y=null)}};return Y=n,n}if(typeof document!="undefined"){let e=document.currentScript;e!=null&&e.hasAttribute("data-manual-init")||(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>me()):me())}typeof window!="undefined"&&(window.ApiDebugger=Object.assign(window.ApiDebugger||{},{init:me}));var On={init:me};export{On as default,me as initApiDebugger};
//# sourceMappingURL=standalone.mjs.map