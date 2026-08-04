'use client';
import{useEffect as gt,useState as $e}from"react";var Q=class{constructor(){this.logs=[];this.listeners=new Set;this.maxLogs=200;this.snapshot=[];this.getLogs=()=>(this.snapshot=this.logs,this.snapshot);this.subscribe=t=>(this.listeners.add(t),()=>this.listeners.delete(t))}setMaxLogs(t){this.maxLogs=Math.max(1,t),this.trim()}addLog(t){this.logs=[t,...this.logs],this.trim(),this.emit()}togglePin(t){this.logs=this.logs.map(o=>o.id===t?{...o,pinned:!o.pinned}:o),this.emit()}clear(){this.logs=[],this.emit()}trim(){if(this.logs.length<=this.maxLogs)return;let t=this.logs.filter(s=>s.pinned),r=this.logs.filter(s=>!s.pinned).slice(0,Math.max(0,this.maxLogs-t.length)),a=[...t,...r];a.sort((s,n)=>n.timestamp-s.timestamp),this.logs=a}emit(){this.listeners.forEach(t=>t())}},S=new Q;function j(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,9)}`}function M(e){if(!e)return null;try{return JSON.parse(e)}catch{return e}}function L(e){if(e==null)return null;if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return String(e)}}function q(e){if(!e)return 0;try{return new Blob([e]).size}catch{return e.length}}function Z(e){if(!e)return"0 B";let t=["B","KB","MB","GB"],o=Math.min(t.length-1,Math.floor(Math.log(e)/Math.log(1024))),r=e/Math.pow(1024,o);return`${o===0?r:r.toFixed(1)} ${t[o]}`}function z(e){return e<1e3?`${e} ms`:`${(e/1e3).toFixed(2)} s`}function D(e){let t=new Date(e);return t.toLocaleTimeString(void 0,{hour12:!1})+`.${String(t.getMilliseconds()).padStart(3,"0")}`}function O(e){try{let t=typeof window!="undefined"?window.location.origin:"http://localhost",o=new URL(e,t),r={};return o.searchParams.forEach((a,s)=>{r[s]=a}),{endpoint:o.pathname,queryParams:r}}catch{return{endpoint:e,queryParams:{}}}}function I(e){let t={};return e&&e.forEach((o,r)=>{t[r]=o}),t}function A(e){let t={};if(!e)return t;if(typeof e.toJSON=="function")return{...e.toJSON()};if(e instanceof Headers)return I(e);if(typeof e=="object")for(let[o,r]of Object.entries(e))r!=null&&(t[o]=String(r));return t}function F(e,t){return!t||t.length===0?!1:t.some(o=>o instanceof RegExp?o.test(e):e.includes(o))}function P(...e){return e.filter(Boolean).join(" ")}async function be(e){try{if(navigator.clipboard&&window.isSecureContext)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select();let o=document.execCommand("copy");return document.body.removeChild(t),o}catch{return!1}}var B=null,$=!1;function Ue(e){if(e==null)return null;if(typeof e=="string")return e;if(e instanceof URLSearchParams)return e.toString();if(e instanceof FormData){let t=[];return e.forEach((o,r)=>{t.push(`${r}=${o instanceof File?`[File: ${o.name}]`:o}`)}),t.join("&")}return"[binary data]"}function ee(e={}){$||typeof window=="undefined"||typeof window.fetch!="function"||(B=window.fetch.bind(window),$=!0,window.fetch=async function(o,r){var c,v,N;let a=o instanceof Request?o:null,s=a?a.url:String(o);if(F(s,e.ignoreUrls))return B(o,r);let n=Date.now(),i=performance.now(),u=((r==null?void 0:r.method)||(a==null?void 0:a.method)||"GET").toUpperCase(),l=I(new Headers((v=(c=r==null?void 0:r.headers)!=null?c:a==null?void 0:a.headers)!=null?v:void 0)),{endpoint:d,queryParams:f}=O(s),x=Ue((N=r==null?void 0:r.body)!=null?N:null),g={id:j(),url:s,endpoint:d,method:u,requestHeaders:l,requestBody:M(x),requestBodyRaw:x,queryParams:f,timestamp:n,source:"fetch",requestSize:q(x),pinned:!1};try{let h=await B(o,r),k=Math.round(performance.now()-i),b=h.clone(),m=null;try{m=await b.text()}catch{m=null}return S.addLog({...g,duration:k,responseStatus:h.status,responseStatusText:h.statusText,responseHeaders:I(h.headers),responseBody:M(m),responseBodyRaw:m,responseSize:q(m),success:h.ok,error:h.ok?null:`HTTP ${h.status} ${h.statusText}`}),h}catch(h){let k=Math.round(performance.now()-i);throw S.addLog({...g,duration:k,responseStatus:null,responseStatusText:"",responseHeaders:{},responseBody:null,responseBodyRaw:null,responseSize:0,success:!1,error:(h==null?void 0:h.message)||"Network error"}),h}})}function te(){$&&B&&typeof window!="undefined"&&(window.fetch=B),$=!1,B=null}function Je(e){let t=(e==null?void 0:e.baseURL)||"",o=(e==null?void 0:e.url)||"";return/^https?:\/\//i.test(o)?o:`${t}${t&&!t.endsWith("/")&&!o.startsWith("/")?"/":""}${o}`}function ve(e){if(e==null)return null;if(typeof e=="string")return e;if(typeof URLSearchParams!="undefined"&&e instanceof URLSearchParams)return e.toString();if(typeof FormData!="undefined"&&e instanceof FormData){let t=[];return e.forEach((o,r)=>{t.push(`${r}=${o instanceof File?`[File: ${o.name}]`:o}`)}),t.join("&")}return L(e)}function oe(e,t={}){var s;if(!e||!e.interceptors||typeof((s=e.interceptors.request)==null?void 0:s.use)!="function")return()=>{};if(e.__apiDebuggerInstalled)return()=>{};e.__apiDebuggerInstalled=!0;let o=e.interceptors.request.use(n=>{let i={id:j(),startTime:Date.now(),startPerf:performance.now(),requestBodyRaw:ve(n.data),requestHeadersSnapshot:A(n.headers)};return n.__apdMeta=i,n});function r(n,i,u){var m,E,G,ge,he,xe;if(!n)return;let l=Je(n);if(F(l,t.ignoreUrls))return;let d=n.__apdMeta||{id:j(),startTime:Date.now(),startPerf:performance.now(),requestBodyRaw:ve(n.data),requestHeadersSnapshot:A(n.headers)},f=Math.round(performance.now()-d.startPerf),{endpoint:x,queryParams:g}=O(l),c=A(n.headers),v=Object.keys(c).length>0?c:d.requestHeadersSnapshot,N=d.requestBodyRaw,h=(i==null?void 0:i.data)!==void 0?L(i.data):null,k=(G=(E=i==null?void 0:i.status)!=null?E:(m=u==null?void 0:u.response)==null?void 0:m.status)!=null?G:null,b={id:d.id,url:l,endpoint:x,method:(n.method||"get").toUpperCase(),requestHeaders:v,requestBody:(ge=M(N))!=null?ge:N,requestBodyRaw:N,queryParams:{...g,...n.params||{}},responseStatus:k,responseStatusText:(he=i==null?void 0:i.statusText)!=null?he:"",responseHeaders:A(i==null?void 0:i.headers),responseBody:(xe=i==null?void 0:i.data)!=null?xe:null,responseBodyRaw:h,duration:f,timestamp:d.startTime,success:!u&&!!k&&k<400,error:u?u.message||"Request failed":null,source:"axios",requestSize:q(N),responseSize:q(h),pinned:!1};S.addLog(b)}let a=e.interceptors.response.use(n=>(r(n.config,n),n),n=>(r(n==null?void 0:n.config,n==null?void 0:n.response,n),Promise.reject(n)));return()=>{e.interceptors.request.eject(o),e.interceptors.response.eject(a),e.__apiDebuggerInstalled=!1}}import{useCallback as ye,useSyncExternalStore as _e}from"react";function we(){let e=_e(S.subscribe,S.getLogs,S.getLogs),t=ye(()=>S.clear(),[]),o=ye(r=>S.togglePin(r),[]);return{logs:e,clear:t,togglePin:o}}import{useEffect as Ke}from"react";function ke(e,t,o=!0){Ke(()=>{if(!o||typeof window=="undefined")return;function r(a){let s=!e.ctrl||a.ctrlKey||a.metaKey,n=!e.shift||a.shiftKey;s&&n&&a.key.toLowerCase()===e.key.toLowerCase()&&(a.preventDefault(),t())}return window.addEventListener("keydown",r),()=>window.removeEventListener("keydown",r)},[e.ctrl,e.shift,e.key,t,o])}import{useEffect as Ye}from"react";var Se=`
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
`;var Ne="next-api-debugger-styles";function Pe(){return Ye(()=>{if(typeof document=="undefined"||document.getElementById(Ne))return;let e=document.createElement("style");e.id=Ne,e.textContent=Se,document.head.appendChild(e)},[]),null}import{useCallback as U,useEffect as Te,useRef as re,useState as We}from"react";var Re="apd-button-position",_=56,Ee=5;function J(e){return typeof window=="undefined"?e:{x:Math.min(Math.max(8,e.x),window.innerWidth-_-8),y:Math.min(Math.max(8,e.y),window.innerHeight-_-8)}}function Xe(){return typeof window=="undefined"?{x:24,y:24}:{x:window.innerWidth-_-24,y:window.innerHeight-_-24}}function Ce(e){let[t,o]=We(()=>{if(typeof window=="undefined")return e!=null?e:{x:24,y:24};try{let d=sessionStorage.getItem(Re);if(d)return J(JSON.parse(d))}catch{}return J(e!=null?e:Xe())}),r=re(!1),a=re(!1),s=re({pointerX:0,pointerY:0,posX:0,posY:0}),n=U(d=>{r.current=!0,a.current=!1,s.current={pointerX:d.clientX,pointerY:d.clientY,posX:t.x,posY:t.y},d.currentTarget.setPointerCapture(d.pointerId)},[t.x,t.y]),i=U(d=>{if(!r.current)return;let f=d.clientX-s.current.pointerX,x=d.clientY-s.current.pointerY;(Math.abs(f)>Ee||Math.abs(x)>Ee)&&(a.current=!0),o(J({x:s.current.posX+f,y:s.current.posY+x}))},[]),u=U(()=>{r.current=!1},[]);Te(()=>{try{sessionStorage.setItem(Re,JSON.stringify(t))}catch{}},[t]),Te(()=>{function d(){o(f=>J(f))}return window.addEventListener("resize",d),()=>window.removeEventListener("resize",d)},[]);let l=U(()=>a.current,[]);return{position:t,onPointerDown:n,onPointerMove:i,onPointerUp:u,wasDragged:l}}import{jsx as ae,jsxs as Le}from"react/jsx-runtime";function qe({count:e,hasErrors:t,onOpen:o,initialPosition:r}){let{position:a,onPointerDown:s,onPointerMove:n,onPointerUp:i,wasDragged:u}=Ce(r);return Le("button",{type:"button",className:"apd-btn",style:{left:a.x,top:a.y},onPointerDown:s,onPointerMove:n,onPointerUp:i,onClick:()=>{u()||o()},"aria-label":"Open API debugger",title:"API Debugger (drag to move)",children:[Le("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[ae("polyline",{points:"16 18 22 12 16 6"}),ae("polyline",{points:"8 6 2 12 8 18"})]}),e>0&&ae("span",{className:P("apd-btn-dot",t&&"apd-has-errors"),children:e>99?"99+":e})]})}import{useEffect as ct,useMemo as ut,useState as fe}from"react";import{jsx as ne,jsxs as Be}from"react/jsx-runtime";function He({value:e,onChange:t}){return Be("div",{className:"apd-search",children:[Be("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[ne("circle",{cx:"11",cy:"11",r:"7"}),ne("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]}),ne("input",{type:"text",placeholder:"Filter by URL, endpoint, method or status code...",value:e,onChange:o=>t(o.target.value),spellCheck:!1})]})}import{Fragment as Ve,jsx as se,jsxs as Ge}from"react/jsx-runtime";function je({status:e,onStatusChange:t,methods:o,activeMethods:r,onToggleMethod:a}){return Ge(Ve,{children:[se("button",{type:"button",className:P("apd-chip apd-chip-success",e==="success"&&"apd-active"),onClick:()=>t(e==="success"?"all":"success"),children:"Success"}),se("button",{type:"button",className:P("apd-chip apd-chip-failed",e==="failed"&&"apd-active"),onClick:()=>t(e==="failed"?"all":"failed"),children:"Failed"}),o.map(s=>se("button",{type:"button",className:P("apd-chip",r.includes(s)&&"apd-active"),onClick:()=>a(s),children:s},s))]})}import{jsx as R,jsxs as ie}from"react/jsx-runtime";function Qe(e){return["GET","POST","PUT","PATCH","DELETE"].includes(e.toUpperCase())?`apd-method-${e.toUpperCase()}`:"apd-method-OTHER"}function Me({log:e,selected:t,onSelect:o,onTogglePin:r}){var a;return ie("div",{className:P("apd-item",t&&"apd-selected"),onClick:o,role:"button",tabIndex:0,onKeyDown:s=>s.key==="Enter"&&o(),children:[ie("div",{className:"apd-item-row1",children:[R("span",{className:P("apd-method",Qe(e.method)),children:e.method}),R("span",{className:"apd-item-url",title:e.url,children:e.endpoint}),R("span",{className:P("apd-status-dot",e.success?"apd-ok":"apd-fail")}),e.pinned&&R("button",{type:"button",className:"apd-pin-star",onClick:s=>{s.stopPropagation(),r()},title:"Unpin","aria-label":"Unpin request",style:{background:"none",border:"none",cursor:"pointer",padding:0},children:"\u2605"})]}),ie("div",{className:"apd-item-row2",children:[R("span",{children:(a=e.responseStatus)!=null?a:e.error?"ERR":"\u2014"}),R("span",{children:z(e.duration)}),R("span",{children:D(e.timestamp)}),R("span",{style:{marginLeft:"auto",textTransform:"uppercase"},children:e.source})]})]})}import{jsx as K,jsxs as Ze}from"react/jsx-runtime";function Ae({logs:e,selectedId:t,onSelect:o,onTogglePin:r}){return e.length===0?K("div",{className:"apd-list",children:Ze("div",{className:"apd-empty",children:["No requests captured yet.",K("br",{}),"Make an API call and it'll show up here."]})}):K("div",{className:"apd-list",children:e.map(a=>K(Me,{log:a,selected:a.id===t,onSelect:()=>o(a.id),onTogglePin:()=>r(a.id)},a.id))})}import{Fragment as dt,useState as pt}from"react";import{useState as et}from"react";import{jsxs as tt}from"react/jsx-runtime";function Y({getText:e,label:t,icon:o}){let[r,a]=et(!1);async function s(){await be(e())&&(a(!0),setTimeout(()=>a(!1),1200))}return tt("button",{type:"button",className:P("apd-action-btn",r&&"apd-copied"),onClick:s,children:[o,r?"Copied":t]})}import{useEffect as ze,useMemo as ot,useRef as rt,useState as de}from"react";import{jsx as C,jsxs as W}from"react/jsx-runtime";var at=/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(\.\d+)?([eE][+-]?\d+)?)/g;function nt(e){return e.replace(at,t=>{let o="apd-json-num";return/^"/.test(t)?o=/:$/.test(t)?"apd-json-key":"apd-json-str":/true|false/.test(t)?o="apd-json-bool":/null/.test(t)&&(o="apd-json-null"),`<span class="${o}">${t}</span>`})}function De(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function st(e,t){var u;if(e.querySelectorAll("mark.apd-json-highlight").forEach(l=>{var f;let d=document.createTextNode(l.textContent||"");(f=l.parentNode)==null||f.replaceChild(d,l)}),e.normalize(),!t)return 0;let r=t.toLowerCase(),a=document.createTreeWalker(e,NodeFilter.SHOW_TEXT),s=[],n;for(;n=a.nextNode();)s.push(n);let i=0;for(let l of s){let d=l.textContent||"",f=d.toLowerCase();if(!f.includes(r))continue;let x=document.createDocumentFragment(),g=0,c=f.indexOf(r);for(;c!==-1;){c>g&&x.appendChild(document.createTextNode(d.slice(g,c)));let v=document.createElement("mark");v.className="apd-json-highlight",v.dataset.apdMatchIndex=String(i),v.textContent=d.slice(c,c+t.length),x.appendChild(v),i+=1,g=c+t.length,c=f.indexOf(r,g)}g<d.length&&x.appendChild(document.createTextNode(d.slice(g))),(u=l.parentNode)==null||u.replaceChild(x,l)}return i}function X({value:e,raw:t,searchable:o=!0}){let[r,a]=de(""),[s,n]=de(0),[i,u]=de(0),l=rt(null),d,f=!0;if(e!=null&&typeof e=="object")d=JSON.stringify(e,null,2);else if(typeof e=="string")try{d=JSON.stringify(JSON.parse(e),null,2)}catch{d=t!=null?t:e,f=!1}else d=t!=null?t:String(e!=null?e:""),f=!1;let x=ot(()=>f?nt(De(d)):De(d),[d,f]);ze(()=>{if(!l.current)return;let c=st(l.current,r.trim());u(c),n(0)},[x,r]),ze(()=>{if(!l.current||i===0)return;l.current.querySelectorAll("mark.apd-json-highlight").forEach(v=>{v.classList.toggle("apd-active",v.getAttribute("data-apd-match-index")===String(s))});let c=l.current.querySelector(`mark.apd-json-highlight[data-apd-match-index="${s}"]`);c==null||c.scrollIntoView({block:"center",behavior:"smooth"})},[s,i]);function g(c){i!==0&&n(v=>(v+c+i)%i)}return W("div",{children:[o&&d.length>0&&W("div",{className:"apd-json-search",children:[W("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[C("circle",{cx:"11",cy:"11",r:"7"}),C("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]}),C("input",{type:"text",placeholder:"Find in payload...",value:r,onChange:c=>a(c.target.value),onKeyDown:c=>{c.key==="Enter"&&g(c.shiftKey?-1:1)},spellCheck:!1}),r&&C("span",{className:"apd-json-search-count",children:i>0?`${s+1} / ${i}`:"No matches"}),r&&i>0&&W("div",{className:"apd-json-search-nav",children:[C("button",{type:"button",onClick:()=>g(-1),"aria-label":"Previous match",title:"Previous match (Shift+Enter)",children:"\u2191"}),C("button",{type:"button",onClick:()=>g(1),"aria-label":"Next match",title:"Next match (Enter)",children:"\u2193"})]})]}),C("pre",{ref:l,className:"apd-json",dangerouslySetInnerHTML:{__html:x}})]})}function V(e){return`'${e.replace(/'/g,"'\\''")}'`}function it(e){let t=e.trim();if(!t||!(t.startsWith("{")||t.startsWith("[")))return!1;try{return JSON.parse(t),!0}catch{return!1}}function pe(e){let t=[`curl -X ${e.method} ${V(e.url)}`],o=Object.keys(e.requestHeaders).some(r=>r.toLowerCase()==="content-type");for(let[r,a]of Object.entries(e.requestHeaders))/^(host|content-length|connection)$/i.test(r)||t.push(`  -H ${V(`${r}: ${a}`)}`);return e.requestBodyRaw&&(!o&&it(e.requestBodyRaw)&&t.push(`  -H ${V("Content-Type: application/json")}`),t.push(`  --data-raw ${V(e.requestBodyRaw)}`)),t.join(` \\
`)}import{jsx as p,jsxs as y}from"react/jsx-runtime";function H({title:e,count:t,defaultOpen:o=!0,children:r}){let[a,s]=pt(o);return y("div",{className:"apd-section",children:[y("div",{className:"apd-section-header",onClick:()=>s(n=>!n),children:[y("span",{children:[e,typeof t=="number"?` (${t})`:""]}),p("span",{children:a?"\u2212":"+"})]}),a&&p("div",{className:"apd-section-body",children:r})]})}function le({data:e}){let t=Object.entries(e);return t.length===0?p("div",{className:"apd-section-body apd-empty-body",children:"None"}):p("div",{className:"apd-kv",children:t.map(([o,r])=>y(dt,{children:[p("div",{className:"apd-kv-key",children:o}),p("div",{className:"apd-kv-val",children:r})]},o))})}function Oe({log:e,onTogglePin:t}){var s,n,i,u,l;if(!e)return p("div",{className:"apd-detail",children:p("div",{className:"apd-detail-empty",children:"Select a request to see full details"})});let o=pe(e),r=(n=(s=L(e.requestBody))!=null?s:e.requestBodyRaw)!=null?n:"",a=(u=(i=L(e.responseBody))!=null?i:e.responseBodyRaw)!=null?u:"";return y("div",{className:"apd-detail",children:[y("div",{className:"apd-detail-header",children:[y("div",{className:"apd-detail-url",children:[p("strong",{children:e.method})," ",e.url]}),p("button",{type:"button",className:"apd-action-btn",onClick:()=>t(e.id),title:e.pinned?"Unpin":"Pin this request",children:e.pinned?"\u2605 Pinned":"\u2606 Pin"})]}),y("div",{className:"apd-meta-grid",children:[y("div",{children:[p("div",{className:"apd-meta-label",children:"Status"}),y("div",{className:"apd-meta-value",style:{color:e.success?"var(--apd-success)":"var(--apd-error)"},children:[(l=e.responseStatus)!=null?l:"Failed"," ",e.responseStatusText]})]}),y("div",{children:[p("div",{className:"apd-meta-label",children:"Duration"}),p("div",{className:"apd-meta-value",children:z(e.duration)})]}),y("div",{children:[p("div",{className:"apd-meta-label",children:"Time"}),p("div",{className:"apd-meta-value",children:D(e.timestamp)})]}),y("div",{children:[p("div",{className:"apd-meta-label",children:"Source"}),p("div",{className:"apd-meta-value",children:e.source})]}),y("div",{children:[p("div",{className:"apd-meta-label",children:"Req. size"}),p("div",{className:"apd-meta-value",children:Z(e.requestSize)})]}),y("div",{children:[p("div",{className:"apd-meta-label",children:"Res. size"}),p("div",{className:"apd-meta-value",children:Z(e.responseSize)})]})]}),e.error&&y("div",{className:"apd-section",style:{borderColor:"var(--apd-error)"},children:[p("div",{className:"apd-section-header",style:{color:"var(--apd-error)"},children:"Error"}),p("div",{className:"apd-section-body",children:e.error})]}),y("div",{className:"apd-actions",children:[p(Y,{label:"Copy cURL",getText:()=>o}),p(Y,{label:"Copy Request",getText:()=>r}),p(Y,{label:"Copy Response",getText:()=>a})]}),p(H,{title:"cURL",children:p(X,{value:o,searchable:!1})}),p(H,{title:"Query Params",count:Object.keys(e.queryParams).length,defaultOpen:!1,children:p(le,{data:e.queryParams})}),p(H,{title:"Request Headers",count:Object.keys(e.requestHeaders).length,defaultOpen:!1,children:p(le,{data:e.requestHeaders})}),p(H,{title:"Request Body",children:e.requestBodyRaw?p(X,{value:e.requestBody,raw:e.requestBodyRaw}):p("div",{className:"apd-empty-body",children:"No body"})}),p(H,{title:"Response Headers",count:Object.keys(e.responseHeaders).length,defaultOpen:!1,children:p(le,{data:e.responseHeaders})}),p(H,{title:"Response Body",children:e.responseBodyRaw?p(X,{value:e.responseBody,raw:e.responseBodyRaw}):p("div",{className:"apd-empty-body",children:"No body"})})]})}function Ie(e){return Object.entries(e).map(([t,o])=>({name:t,value:o}))}function lt(e){return Object.entries(e).map(([t,o])=>({name:t,value:o}))}function ce(e){return{log:{version:"1.2",creator:{name:"next-api-debugger",version:"0.1.0"},entries:e.map(t=>{var o,r;return{startedDateTime:new Date(t.timestamp).toISOString(),time:t.duration,request:{method:t.method,url:t.url,httpVersion:"HTTP/1.1",headers:Ie(t.requestHeaders),queryString:lt(t.queryParams),cookies:[],headersSize:-1,bodySize:t.requestSize,postData:t.requestBodyRaw?{mimeType:t.requestHeaders["content-type"]||"application/json",text:t.requestBodyRaw}:void 0},response:{status:(o=t.responseStatus)!=null?o:0,statusText:t.responseStatusText,httpVersion:"HTTP/1.1",headers:Ie(t.responseHeaders),cookies:[],content:{size:t.responseSize,mimeType:t.responseHeaders["content-type"]||"application/json",text:(r=t.responseBodyRaw)!=null?r:""},redirectURL:"",headersSize:-1,bodySize:t.responseSize},cache:{},timings:{send:0,wait:t.duration,receive:0}}})}}}function ue(e,t){let o=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),r=URL.createObjectURL(o),a=document.createElement("a");a.href=r,a.download=e,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(r)}import{Fragment as mt,jsx as w,jsxs as T}from"react/jsx-runtime";var ft=["GET","POST","PUT","PATCH","DELETE"];function Fe({logs:e,onClose:t,onClear:o,onTogglePin:r,theme:a,onToggleTheme:s}){var N,h,k;let[n,i]=fe({search:"",status:"all",methods:[]}),[u,l]=fe(null),[d,f]=fe(!1);ct(()=>{!u&&e.length>0&&l(e[0].id)},[e,u]);let x=ut(()=>{let b=n.search.trim().toLowerCase();return e.filter(m=>{var E;return!(n.status==="success"&&!m.success||n.status==="failed"&&m.success||n.methods.length>0&&!n.methods.includes(m.method)||b&&!`${m.url} ${m.endpoint} ${m.method} ${(E=m.responseStatus)!=null?E:""}`.toLowerCase().includes(b))})},[e,n]),g=(h=(N=x.find(b=>b.id===u))!=null?N:x[0])!=null?h:null,c=e.filter(b=>!b.success).length;function v(b){i(m=>({...m,methods:m.methods.includes(b)?m.methods.filter(E=>E!==b):[...m.methods,b]}))}return w("div",{className:"apd-overlay",onClick:t,children:T("div",{className:`apd-modal${d?" apd-minimized":""}`,onClick:b=>b.stopPropagation(),children:[T("div",{className:"apd-header",children:[T("div",{className:"apd-header-title",children:[w("span",{className:"apd-live-dot"}),"API Debugger"]}),T("span",{className:"apd-header-count",children:[e.length," requests",c>0?` \xB7 ${c} failed`:""]}),w("div",{className:"apd-spacer"}),w("button",{className:"apd-icon-btn",onClick:s,title:"Toggle theme",type:"button",children:a==="light"?"\u2600":"\u263E"}),w("button",{className:"apd-icon-btn",title:"Export JSON",type:"button",onClick:()=>ue(`api-logs-${Date.now()}.json`,e),children:"\u2B73"}),w("button",{className:"apd-icon-btn",title:"Export HAR",type:"button",onClick:()=>ue(`api-logs-${Date.now()}.har`,ce(e)),children:"HAR"}),w("button",{className:"apd-icon-btn",title:"Clear logs",type:"button",onClick:o,children:"\u{1F5D1}"}),w("button",{className:"apd-icon-btn",title:d?"Restore":"Minimize",type:"button",onClick:()=>f(b=>!b),children:d?"\u25A2":"\u2014"}),w("button",{className:"apd-icon-btn",title:"Close",type:"button",onClick:t,children:"\u2715"})]}),!d&&T(mt,{children:[T("div",{className:"apd-toolbar",children:[w(He,{value:n.search,onChange:b=>i(m=>({...m,search:b}))}),w(je,{status:n.status,onStatusChange:b=>i(m=>({...m,status:b})),methods:ft,activeMethods:n.methods,onToggleMethod:v})]}),T("div",{className:"apd-body",children:[w(Ae,{logs:x,selectedId:(k=g==null?void 0:g.id)!=null?k:null,onSelect:l,onTogglePin:r}),w(Oe,{log:g,onTogglePin:r})]}),T("div",{className:"apd-footer",children:[T("span",{children:[w("span",{className:"apd-kbd",children:"Ctrl"}),"+",w("span",{className:"apd-kbd",children:"Shift"}),"+",w("span",{className:"apd-kbd",children:"D"})," to toggle"]}),w("span",{style:{marginLeft:"auto"},children:"next-api-debugger \xB7 dev only"})]})]})]})})}import{jsx as me,jsxs as bt}from"react/jsx-runtime";function ht(e){return typeof e=="boolean"?e:process.env.NODE_ENV!=="production"}function xt(e){let{enabled:t,maxLogs:o=200,initialPosition:r,axiosInstance:a,theme:s="dark",keyboardShortcut:n=!0,ignoreUrls:i}=e,u=ht(t),[l,d]=$e(!1),[f,x]=$e(s),{logs:g,clear:c,togglePin:v}=we();if(gt(()=>{if(!u||typeof window=="undefined")return;S.setMaxLogs(o),ee({ignoreUrls:i});let k=a?oe(a,{ignoreUrls:i}):()=>{};return()=>{te(),k()}},[u]),ke({ctrl:!0,shift:!0,key:"d"},()=>d(k=>!k),u&&n),!u)return null;let N=g.filter(k=>!k.success).length,h=f==="system"?"dark":f;return bt("div",{className:`apd-root${h==="light"?" apd-light":""}`,children:[me(Pe,{}),!l&&me(qe,{count:g.length,hasErrors:N>0,onOpen:()=>d(!0),initialPosition:r}),l&&me(Fe,{logs:g,onClose:()=>d(!1),onClear:c,onTogglePin:v,theme:h,onToggleTheme:()=>x(h==="light"?"dark":"light")})]})}export{xt as ApiDebugger,ce as exportAsHar,pe as generateCurl,oe as installAxiosInterceptor,ee as installFetchInterceptor,S as logStore,te as uninstallFetchInterceptor};
//# sourceMappingURL=index.mjs.map