'use client';
import{useEffect as ht,useState as $e}from"react";var Q=class{constructor(){this.logs=[];this.listeners=new Set;this.maxLogs=200;this.snapshot=[];this.getLogs=()=>(this.snapshot=this.logs,this.snapshot);this.subscribe=t=>(this.listeners.add(t),()=>this.listeners.delete(t))}setMaxLogs(t){this.maxLogs=Math.max(1,t),this.trim()}addLog(t){this.logs=[t,...this.logs],this.trim(),this.emit()}togglePin(t){this.logs=this.logs.map(o=>o.id===t?{...o,pinned:!o.pinned}:o),this.emit()}clear(){this.logs=[],this.emit()}trim(){if(this.logs.length<=this.maxLogs)return;let t=this.logs.filter(s=>s.pinned),r=this.logs.filter(s=>!s.pinned).slice(0,Math.max(0,this.maxLogs-t.length)),n=[...t,...r];n.sort((s,a)=>a.timestamp-s.timestamp),this.logs=n}emit(){this.listeners.forEach(t=>t())}},S=new Q;function M(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,9)}`}function j(e){if(!e)return null;try{return JSON.parse(e)}catch{return e}}function C(e){if(e==null)return null;if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return String(e)}}function q(e){if(!e)return 0;try{return new Blob([e]).size}catch{return e.length}}function Z(e){if(!e)return"0 B";let t=["B","KB","MB","GB"],o=Math.min(t.length-1,Math.floor(Math.log(e)/Math.log(1024))),r=e/Math.pow(1024,o);return`${o===0?r:r.toFixed(1)} ${t[o]}`}function z(e){return e<1e3?`${e} ms`:`${(e/1e3).toFixed(2)} s`}function D(e){let t=new Date(e);return t.toLocaleTimeString(void 0,{hour12:!1})+`.${String(t.getMilliseconds()).padStart(3,"0")}`}function O(e){try{let t=typeof window!="undefined"?window.location.origin:"http://localhost",o=new URL(e,t),r={};return o.searchParams.forEach((n,s)=>{r[s]=n}),{endpoint:o.pathname,queryParams:r}}catch{return{endpoint:e,queryParams:{}}}}function I(e){let t={};return e&&e.forEach((o,r)=>{t[r]=o}),t}function A(e){let t={};if(!e)return t;if(typeof e.toJSON=="function")return{...e.toJSON()};if(e instanceof Headers)return I(e);if(typeof e=="object")for(let[o,r]of Object.entries(e))r!=null&&(t[o]=String(r));return t}function F(e,t){return!t||t.length===0?!1:t.some(o=>o instanceof RegExp?o.test(e):e.includes(o))}function N(...e){return e.filter(Boolean).join(" ")}async function ve(e){try{if(navigator.clipboard&&window.isSecureContext)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select();let o=document.execCommand("copy");return document.body.removeChild(t),o}catch{return!1}}var B=null,$=!1;function Ue(e){if(e==null)return null;if(typeof e=="string")return e;if(e instanceof URLSearchParams)return e.toString();if(e instanceof FormData){let t=[];return e.forEach((o,r)=>{t.push(`${r}=${o instanceof File?`[File: ${o.name}]`:o}`)}),t.join("&")}return"[binary data]"}function ee(e={}){$||typeof window=="undefined"||typeof window.fetch!="function"||(B=window.fetch.bind(window),$=!0,window.fetch=async function(o,r){var v,P,k;let n=o instanceof Request?o:null,s=n?n.url:String(o);if(F(s,e.ignoreUrls))return B(o,r);let a=Date.now(),i=performance.now(),c=((r==null?void 0:r.method)||(n==null?void 0:n.method)||"GET").toUpperCase(),m=I(new Headers((P=(v=r==null?void 0:r.headers)!=null?v:n==null?void 0:n.headers)!=null?P:void 0)),{endpoint:d,queryParams:b}=O(s),u=Ue((k=r==null?void 0:r.body)!=null?k:null),h={id:M(),url:s,endpoint:d,method:c,requestHeaders:m,requestBody:j(u),requestBodyRaw:u,queryParams:b,timestamp:a,source:"fetch",requestSize:q(u),pinned:!1};try{let l=await B(o,r),x=Math.round(performance.now()-i),g=l.clone(),f=null;try{f=await g.text()}catch{f=null}return S.addLog({...h,duration:x,responseStatus:l.status,responseStatusText:l.statusText,responseHeaders:I(l.headers),responseBody:j(f),responseBodyRaw:f,responseSize:q(f),success:l.ok,error:l.ok?null:`HTTP ${l.status} ${l.statusText}`}),l}catch(l){let x=Math.round(performance.now()-i);throw S.addLog({...h,duration:x,responseStatus:null,responseStatusText:"",responseHeaders:{},responseBody:null,responseBodyRaw:null,responseSize:0,success:!1,error:(l==null?void 0:l.message)||"Network error"}),l}})}function te(){$&&B&&typeof window!="undefined"&&(window.fetch=B),$=!1,B=null}function Je(e){let t=(e==null?void 0:e.baseURL)||"",o=(e==null?void 0:e.url)||"",r=/^https?:\/\//i.test(o)?o:`${t}${t&&!t.endsWith("/")&&!o.startsWith("/")?"/":""}${o}`;if(e!=null&&e.params&&typeof e.params=="object"){let n=_e(e.params);n&&(r+=(r.includes("?")?"&":"?")+n)}return r}function _e(e){let t=new URLSearchParams;for(let[o,r]of Object.entries(e))r!=null&&(Array.isArray(r)?r.forEach(n=>t.append(o,String(n))):t.append(o,String(r)));return t.toString()}function ye(e){if(e==null)return null;if(typeof e=="string")return e;if(typeof URLSearchParams!="undefined"&&e instanceof URLSearchParams)return e.toString();if(typeof FormData!="undefined"&&e instanceof FormData){let t=[];return e.forEach((o,r)=>{t.push(`${r}=${o instanceof File?`[File: ${o.name}]`:o}`)}),t.join("&")}return C(e)}function oe(e,t={}){var s;if(!e||!e.interceptors||typeof((s=e.interceptors.request)==null?void 0:s.use)!="function")return()=>{};if(e.__apiDebuggerInstalled)return()=>{};e.__apiDebuggerInstalled=!0;let o=e.interceptors.request.use(a=>{let i={id:M(),startTime:Date.now(),startPerf:performance.now(),requestBodyRaw:ye(a.data),requestHeadersSnapshot:A(a.headers)};return a.__apdMeta=i,a});function r(a,i,c){var f,E,G,he,xe,be;if(!a)return;let m=Je(a);if(F(m,t.ignoreUrls))return;let d=a.__apdMeta||{id:M(),startTime:Date.now(),startPerf:performance.now(),requestBodyRaw:ye(a.data),requestHeadersSnapshot:A(a.headers)},b=Math.round(performance.now()-d.startPerf),{endpoint:u,queryParams:h}=O(m),v=A(a.headers),P=Object.keys(v).length>0?v:d.requestHeadersSnapshot,k=d.requestBodyRaw,l=(i==null?void 0:i.data)!==void 0?C(i.data):null,x=(G=(E=i==null?void 0:i.status)!=null?E:(f=c==null?void 0:c.response)==null?void 0:f.status)!=null?G:null,g={id:d.id,url:m,endpoint:u,method:(a.method||"get").toUpperCase(),requestHeaders:P,requestBody:(he=j(k))!=null?he:k,requestBodyRaw:k,queryParams:h,responseStatus:x,responseStatusText:(xe=i==null?void 0:i.statusText)!=null?xe:"",responseHeaders:A(i==null?void 0:i.headers),responseBody:(be=i==null?void 0:i.data)!=null?be:null,responseBodyRaw:l,duration:b,timestamp:d.startTime,success:!c&&!!x&&x<400,error:c?c.message||"Request failed":null,source:"axios",requestSize:q(k),responseSize:q(l),pinned:!1};S.addLog(g)}let n=e.interceptors.response.use(a=>(r(a.config,a),a),a=>(r(a==null?void 0:a.config,a==null?void 0:a.response,a),Promise.reject(a)));return()=>{e.interceptors.request.eject(o),e.interceptors.response.eject(n),e.__apiDebuggerInstalled=!1}}import{useCallback as we,useSyncExternalStore as Ke}from"react";function ke(){let e=Ke(S.subscribe,S.getLogs,S.getLogs),t=we(()=>S.clear(),[]),o=we(r=>S.togglePin(r),[]);return{logs:e,clear:t,togglePin:o}}import{useEffect as Ye}from"react";function Se(e,t,o=!0){Ye(()=>{if(!o||typeof window=="undefined")return;function r(n){let s=!e.ctrl||n.ctrlKey||n.metaKey,a=!e.shift||n.shiftKey;s&&a&&n.key.toLowerCase()===e.key.toLowerCase()&&(n.preventDefault(),t())}return window.addEventListener("keydown",r),()=>window.removeEventListener("keydown",r)},[e.ctrl,e.shift,e.key,t,o])}import{useEffect as We}from"react";var Ne=`
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
`;var Pe="next-api-debugger-styles";function Re(){return We(()=>{if(typeof document=="undefined"||document.getElementById(Pe))return;let e=document.createElement("style");e.id=Pe,e.textContent=Ne,document.head.appendChild(e)},[]),null}import{useCallback as U,useEffect as Te,useRef as re,useState as Xe}from"react";var Ee="apd-button-position",_=56,Le=5;function J(e){return typeof window=="undefined"?e:{x:Math.min(Math.max(8,e.x),window.innerWidth-_-8),y:Math.min(Math.max(8,e.y),window.innerHeight-_-8)}}function Ve(){return typeof window=="undefined"?{x:24,y:24}:{x:window.innerWidth-_-24,y:window.innerHeight-_-24}}function Ce(e){let[t,o]=Xe(()=>{if(typeof window=="undefined")return e!=null?e:{x:24,y:24};try{let d=sessionStorage.getItem(Ee);if(d)return J(JSON.parse(d))}catch{}return J(e!=null?e:Ve())}),r=re(!1),n=re(!1),s=re({pointerX:0,pointerY:0,posX:0,posY:0}),a=U(d=>{r.current=!0,n.current=!1,s.current={pointerX:d.clientX,pointerY:d.clientY,posX:t.x,posY:t.y},d.currentTarget.setPointerCapture(d.pointerId)},[t.x,t.y]),i=U(d=>{if(!r.current)return;let b=d.clientX-s.current.pointerX,u=d.clientY-s.current.pointerY;(Math.abs(b)>Le||Math.abs(u)>Le)&&(n.current=!0),o(J({x:s.current.posX+b,y:s.current.posY+u}))},[]),c=U(()=>{r.current=!1},[]);Te(()=>{try{sessionStorage.setItem(Ee,JSON.stringify(t))}catch{}},[t]),Te(()=>{function d(){o(b=>J(b))}return window.addEventListener("resize",d),()=>window.removeEventListener("resize",d)},[]);let m=U(()=>n.current,[]);return{position:t,onPointerDown:a,onPointerMove:i,onPointerUp:c,wasDragged:m}}import{jsx as ne,jsxs as qe}from"react/jsx-runtime";function Be({count:e,hasErrors:t,onOpen:o,initialPosition:r}){let{position:n,onPointerDown:s,onPointerMove:a,onPointerUp:i,wasDragged:c}=Ce(r);return qe("button",{type:"button",className:"apd-btn",style:{left:n.x,top:n.y},onPointerDown:s,onPointerMove:a,onPointerUp:i,onClick:()=>{c()||o()},"aria-label":"Open API debugger",title:"API Debugger (drag to move)",children:[qe("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[ne("polyline",{points:"16 18 22 12 16 6"}),ne("polyline",{points:"8 6 2 12 8 18"})]}),e>0&&ne("span",{className:N("apd-btn-dot",t&&"apd-has-errors"),children:e>99?"99+":e})]})}import{useEffect as ut,useMemo as ft,useState as me}from"react";import{jsx as ae,jsxs as He}from"react/jsx-runtime";function Me({value:e,onChange:t}){return He("div",{className:"apd-search",children:[He("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[ae("circle",{cx:"11",cy:"11",r:"7"}),ae("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]}),ae("input",{type:"text",placeholder:"Filter by URL, endpoint, method or status code...",value:e,onChange:o=>t(o.target.value),spellCheck:!1})]})}import{Fragment as Ge,jsx as se,jsxs as Qe}from"react/jsx-runtime";function je({status:e,onStatusChange:t,methods:o,activeMethods:r,onToggleMethod:n}){return Qe(Ge,{children:[se("button",{type:"button",className:N("apd-chip apd-chip-success",e==="success"&&"apd-active"),onClick:()=>t(e==="success"?"all":"success"),children:"Success"}),se("button",{type:"button",className:N("apd-chip apd-chip-failed",e==="failed"&&"apd-active"),onClick:()=>t(e==="failed"?"all":"failed"),children:"Failed"}),o.map(s=>se("button",{type:"button",className:N("apd-chip",r.includes(s)&&"apd-active"),onClick:()=>n(s),children:s},s))]})}import{jsx as T,jsxs as ie}from"react/jsx-runtime";function Ze(e){return["GET","POST","PUT","PATCH","DELETE"].includes(e.toUpperCase())?`apd-method-${e.toUpperCase()}`:"apd-method-OTHER"}function Ae({log:e,selected:t,onSelect:o,onTogglePin:r}){var n;return ie("div",{className:N("apd-item",t&&"apd-selected"),onClick:o,role:"button",tabIndex:0,onKeyDown:s=>s.key==="Enter"&&o(),children:[ie("div",{className:"apd-item-row1",children:[T("span",{className:N("apd-method",Ze(e.method)),children:e.method}),T("span",{className:"apd-item-url",title:e.url,children:e.endpoint}),T("span",{className:N("apd-status-dot",e.success?"apd-ok":"apd-fail")}),e.pinned&&T("button",{type:"button",className:"apd-pin-star",onClick:s=>{s.stopPropagation(),r()},title:"Unpin","aria-label":"Unpin request",style:{background:"none",border:"none",cursor:"pointer",padding:0},children:"\u2605"})]}),ie("div",{className:"apd-item-row2",children:[T("span",{children:(n=e.responseStatus)!=null?n:e.error?"ERR":"\u2014"}),T("span",{children:z(e.duration)}),T("span",{children:D(e.timestamp)}),T("span",{style:{marginLeft:"auto",textTransform:"uppercase"},children:e.source})]})]})}import{jsx as K,jsxs as et}from"react/jsx-runtime";function ze({logs:e,selectedId:t,onSelect:o,onTogglePin:r}){return e.length===0?K("div",{className:"apd-list",children:et("div",{className:"apd-empty",children:["No requests captured yet.",K("br",{}),"Make an API call and it'll show up here."]})}):K("div",{className:"apd-list",children:e.map(n=>K(Ae,{log:n,selected:n.id===t,onSelect:()=>o(n.id),onTogglePin:()=>r(n.id)},n.id))})}import{Fragment as pt,useState as lt}from"react";import{useState as tt}from"react";import{jsxs as ot}from"react/jsx-runtime";function Y({getText:e,label:t,icon:o}){let[r,n]=tt(!1);async function s(){await ve(e())&&(n(!0),setTimeout(()=>n(!1),1200))}return ot("button",{type:"button",className:N("apd-action-btn",r&&"apd-copied"),onClick:s,children:[o,r?"Copied":t]})}import{useEffect as rt,useMemo as nt,useRef as de,useState as pe}from"react";import{jsx as L,jsxs as W}from"react/jsx-runtime";var at=/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(\.\d+)?([eE][+-]?\d+)?)/g;function st(e){return e.replace(at,t=>{let o="apd-json-num";return/^"/.test(t)?o=/:$/.test(t)?"apd-json-key":"apd-json-str":/true|false/.test(t)?o="apd-json-bool":/null/.test(t)&&(o="apd-json-null"),`<span class="${o}">${t}</span>`})}function De(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function it(e,t){var i;if(e.querySelectorAll("mark.apd-json-highlight").forEach(c=>{var d;let m=document.createTextNode(c.textContent||"");(d=c.parentNode)==null||d.replaceChild(m,c)}),e.normalize(),!t)return[];let o=t.toLowerCase(),r=document.createTreeWalker(e,NodeFilter.SHOW_TEXT),n=[],s;for(;s=r.nextNode();)n.push(s);let a=[];for(let c of n){let m=c.textContent||"",d=m.toLowerCase();if(!d.includes(o))continue;let b=document.createDocumentFragment(),u=0,h=d.indexOf(o);for(;h!==-1;){h>u&&b.appendChild(document.createTextNode(m.slice(u,h)));let v=document.createElement("mark");v.className="apd-json-highlight",v.textContent=m.slice(h,h+t.length),b.appendChild(v),a.push(v),u=h+t.length,h=d.indexOf(o,u)}u<m.length&&b.appendChild(document.createTextNode(m.slice(u))),(i=c.parentNode)==null||i.replaceChild(b,c)}return a}function X({value:e,raw:t,searchable:o=!0}){let[r,n]=pe(""),[s,a]=pe(0),[i,c]=pe(0),m=de(null),d=de([]),b=de(""),u,h=!0;if(e!=null&&typeof e=="object")u=JSON.stringify(e,null,2);else if(typeof e=="string")try{u=JSON.stringify(JSON.parse(e),null,2)}catch{u=t!=null?t:e,h=!1}else u=t!=null?t:String(e!=null?e:""),h=!1;let v=nt(()=>h?st(De(u)):De(u),[u,h]);function P(l){var x;d.current.forEach((g,f)=>g.classList.toggle("apd-active",f===l)),(x=d.current[l])==null||x.scrollIntoView({block:"center",behavior:"smooth"})}rt(()=>{if(!m.current)return;let l=r.trim(),x=l!==b.current;b.current=l;let g=it(m.current,l);d.current=g,c(g.length);let f=x||s>=g.length?0:s;a(f),P(f)},[v,r]);function k(l){if(i===0)return;let x=(s+l+i)%i;a(x),P(x)}return W("div",{children:[o&&u.length>0&&W("div",{className:"apd-json-search",children:[W("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[L("circle",{cx:"11",cy:"11",r:"7"}),L("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]}),L("input",{type:"text",placeholder:"Find in payload...",value:r,onChange:l=>n(l.target.value),onKeyDown:l=>{l.key==="Enter"&&(l.preventDefault(),k(l.shiftKey?-1:1))},spellCheck:!1}),r&&L("span",{className:"apd-json-search-count",children:i>0?`${s+1} / ${i}`:"No matches"}),r&&i>0&&W("div",{className:"apd-json-search-nav",children:[L("button",{type:"button",onClick:()=>k(-1),"aria-label":"Previous match",title:"Previous match (Shift+Enter)",children:"\u2191"}),L("button",{type:"button",onClick:()=>k(1),"aria-label":"Next match",title:"Next match (Enter)",children:"\u2193"})]})]}),L("pre",{ref:m,className:"apd-json",dangerouslySetInnerHTML:{__html:v}})]})}function V(e){return`'${e.replace(/'/g,"'\\''")}'`}function dt(e){let t=e.trim();if(!t||!(t.startsWith("{")||t.startsWith("[")))return!1;try{return JSON.parse(t),!0}catch{return!1}}function le(e){let t=[`curl -X ${e.method} ${V(e.url)}`],o=Object.keys(e.requestHeaders).some(r=>r.toLowerCase()==="content-type");for(let[r,n]of Object.entries(e.requestHeaders))/^(host|content-length|connection)$/i.test(r)||t.push(`  -H ${V(`${r}: ${n}`)}`);return e.requestBodyRaw&&(!o&&dt(e.requestBodyRaw)&&t.push(`  -H ${V("Content-Type: application/json")}`),t.push(`  --data-raw ${V(e.requestBodyRaw)}`)),t.join(` \\
`)}import{jsx as p,jsxs as y}from"react/jsx-runtime";function H({title:e,count:t,defaultOpen:o=!0,children:r}){let[n,s]=lt(o);return y("div",{className:"apd-section",children:[y("div",{className:"apd-section-header",onClick:()=>s(a=>!a),children:[y("span",{children:[e,typeof t=="number"?` (${t})`:""]}),p("span",{children:n?"\u2212":"+"})]}),n&&p("div",{className:"apd-section-body",children:r})]})}function ce({data:e}){let t=Object.entries(e);return t.length===0?p("div",{className:"apd-section-body apd-empty-body",children:"None"}):p("div",{className:"apd-kv",children:t.map(([o,r])=>y(pt,{children:[p("div",{className:"apd-kv-key",children:o}),p("div",{className:"apd-kv-val",children:r})]},o))})}function Oe({log:e,onTogglePin:t}){var s,a,i,c,m;if(!e)return p("div",{className:"apd-detail",children:p("div",{className:"apd-detail-empty",children:"Select a request to see full details"})});let o=le(e),r=(a=(s=C(e.requestBody))!=null?s:e.requestBodyRaw)!=null?a:"",n=(c=(i=C(e.responseBody))!=null?i:e.responseBodyRaw)!=null?c:"";return y("div",{className:"apd-detail",children:[y("div",{className:"apd-detail-header",children:[y("div",{className:"apd-detail-url",children:[p("strong",{children:e.method})," ",e.url]}),p("button",{type:"button",className:"apd-action-btn",onClick:()=>t(e.id),title:e.pinned?"Unpin":"Pin this request",children:e.pinned?"\u2605 Pinned":"\u2606 Pin"})]}),y("div",{className:"apd-meta-grid",children:[y("div",{children:[p("div",{className:"apd-meta-label",children:"Status"}),y("div",{className:"apd-meta-value",style:{color:e.success?"var(--apd-success)":"var(--apd-error)"},children:[(m=e.responseStatus)!=null?m:"Failed"," ",e.responseStatusText]})]}),y("div",{children:[p("div",{className:"apd-meta-label",children:"Duration"}),p("div",{className:"apd-meta-value",children:z(e.duration)})]}),y("div",{children:[p("div",{className:"apd-meta-label",children:"Time"}),p("div",{className:"apd-meta-value",children:D(e.timestamp)})]}),y("div",{children:[p("div",{className:"apd-meta-label",children:"Source"}),p("div",{className:"apd-meta-value",children:e.source})]}),y("div",{children:[p("div",{className:"apd-meta-label",children:"Req. size"}),p("div",{className:"apd-meta-value",children:Z(e.requestSize)})]}),y("div",{children:[p("div",{className:"apd-meta-label",children:"Res. size"}),p("div",{className:"apd-meta-value",children:Z(e.responseSize)})]})]}),e.error&&y("div",{className:"apd-section",style:{borderColor:"var(--apd-error)"},children:[p("div",{className:"apd-section-header",style:{color:"var(--apd-error)"},children:"Error"}),p("div",{className:"apd-section-body",children:e.error})]}),y("div",{className:"apd-actions",children:[p(Y,{label:"Copy cURL",getText:()=>o}),p(Y,{label:"Copy Request",getText:()=>r}),p(Y,{label:"Copy Response",getText:()=>n})]}),p(H,{title:"cURL",children:p(X,{value:o,searchable:!1})}),p(H,{title:"Query Params",count:Object.keys(e.queryParams).length,defaultOpen:!1,children:p(ce,{data:e.queryParams})}),p(H,{title:"Request Headers",count:Object.keys(e.requestHeaders).length,defaultOpen:!1,children:p(ce,{data:e.requestHeaders})}),p(H,{title:"Request Body",children:e.requestBodyRaw?p(X,{value:e.requestBody,raw:e.requestBodyRaw}):p("div",{className:"apd-empty-body",children:"No body"})}),p(H,{title:"Response Headers",count:Object.keys(e.responseHeaders).length,defaultOpen:!1,children:p(ce,{data:e.responseHeaders})}),p(H,{title:"Response Body",children:e.responseBodyRaw?p(X,{value:e.responseBody,raw:e.responseBodyRaw}):p("div",{className:"apd-empty-body",children:"No body"})})]})}function Ie(e){return Object.entries(e).map(([t,o])=>({name:t,value:o}))}function ct(e){return Object.entries(e).map(([t,o])=>({name:t,value:o}))}function ue(e){return{log:{version:"1.2",creator:{name:"next-api-debugger",version:"0.1.0"},entries:e.map(t=>{var o,r;return{startedDateTime:new Date(t.timestamp).toISOString(),time:t.duration,request:{method:t.method,url:t.url,httpVersion:"HTTP/1.1",headers:Ie(t.requestHeaders),queryString:ct(t.queryParams),cookies:[],headersSize:-1,bodySize:t.requestSize,postData:t.requestBodyRaw?{mimeType:t.requestHeaders["content-type"]||"application/json",text:t.requestBodyRaw}:void 0},response:{status:(o=t.responseStatus)!=null?o:0,statusText:t.responseStatusText,httpVersion:"HTTP/1.1",headers:Ie(t.responseHeaders),cookies:[],content:{size:t.responseSize,mimeType:t.responseHeaders["content-type"]||"application/json",text:(r=t.responseBodyRaw)!=null?r:""},redirectURL:"",headersSize:-1,bodySize:t.responseSize},cache:{},timings:{send:0,wait:t.duration,receive:0}}})}}}function fe(e,t){let o=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),r=URL.createObjectURL(o),n=document.createElement("a");n.href=r,n.download=e,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(r)}import{Fragment as gt,jsx as w,jsxs as R}from"react/jsx-runtime";var mt=["GET","POST","PUT","PATCH","DELETE"];function Fe({logs:e,onClose:t,onClear:o,onTogglePin:r,theme:n,onToggleTheme:s}){var k,l,x;let[a,i]=me({search:"",status:"all",methods:[]}),[c,m]=me(null),[d,b]=me(!1);ut(()=>{!c&&e.length>0&&m(e[0].id)},[e,c]);let u=ft(()=>{let g=a.search.trim().toLowerCase();return e.filter(f=>{var E;return!(a.status==="success"&&!f.success||a.status==="failed"&&f.success||a.methods.length>0&&!a.methods.includes(f.method)||g&&!`${f.url} ${f.endpoint} ${f.method} ${(E=f.responseStatus)!=null?E:""}`.toLowerCase().includes(g))})},[e,a]),h=(l=(k=u.find(g=>g.id===c))!=null?k:u[0])!=null?l:null,v=e.filter(g=>!g.success).length;function P(g){i(f=>({...f,methods:f.methods.includes(g)?f.methods.filter(E=>E!==g):[...f.methods,g]}))}return w("div",{className:"apd-overlay",onClick:t,children:R("div",{className:`apd-modal${d?" apd-minimized":""}`,onClick:g=>g.stopPropagation(),children:[R("div",{className:"apd-header",children:[R("div",{className:"apd-header-title",children:[w("span",{className:"apd-live-dot"}),"API Debugger"]}),R("span",{className:"apd-header-count",children:[e.length," requests",v>0?` \xB7 ${v} failed`:""]}),w("div",{className:"apd-spacer"}),w("button",{className:"apd-icon-btn",onClick:s,title:"Toggle theme",type:"button",children:n==="light"?"\u2600":"\u263E"}),w("button",{className:"apd-icon-btn",title:"Export JSON",type:"button",onClick:()=>fe(`api-logs-${Date.now()}.json`,e),children:"\u2B73"}),w("button",{className:"apd-icon-btn",title:"Export HAR",type:"button",onClick:()=>fe(`api-logs-${Date.now()}.har`,ue(e)),children:"HAR"}),w("button",{className:"apd-icon-btn",title:"Clear logs",type:"button",onClick:o,children:"\u{1F5D1}"}),w("button",{className:"apd-icon-btn",title:d?"Restore":"Minimize",type:"button",onClick:()=>b(g=>!g),children:d?"\u25A2":"\u2014"}),w("button",{className:"apd-icon-btn",title:"Close",type:"button",onClick:t,children:"\u2715"})]}),!d&&R(gt,{children:[R("div",{className:"apd-toolbar",children:[w(Me,{value:a.search,onChange:g=>i(f=>({...f,search:g}))}),w(je,{status:a.status,onStatusChange:g=>i(f=>({...f,status:g})),methods:mt,activeMethods:a.methods,onToggleMethod:P})]}),R("div",{className:"apd-body",children:[w(ze,{logs:u,selectedId:(x=h==null?void 0:h.id)!=null?x:null,onSelect:m,onTogglePin:r}),w(Oe,{log:h,onTogglePin:r})]}),R("div",{className:"apd-footer",children:[R("span",{children:[w("span",{className:"apd-kbd",children:"Ctrl"}),"+",w("span",{className:"apd-kbd",children:"Shift"}),"+",w("span",{className:"apd-kbd",children:"D"})," to toggle"]}),w("span",{style:{marginLeft:"auto"},children:"next-api-debugger \xB7 dev only"})]})]})]})})}import{jsx as ge,jsxs as vt}from"react/jsx-runtime";function xt(e){return typeof e=="boolean"?e:process.env.NODE_ENV!=="production"}function bt(e){let{enabled:t,maxLogs:o=200,initialPosition:r,axiosInstance:n,theme:s="dark",keyboardShortcut:a=!0,ignoreUrls:i}=e,c=xt(t),[m,d]=$e(!1),[b,u]=$e(s),{logs:h,clear:v,togglePin:P}=ke();if(ht(()=>{if(!c||typeof window=="undefined")return;S.setMaxLogs(o),ee({ignoreUrls:i});let x=n?oe(n,{ignoreUrls:i}):()=>{};return()=>{te(),x()}},[c]),Se({ctrl:!0,shift:!0,key:"d"},()=>d(x=>!x),c&&a),!c)return null;let k=h.filter(x=>!x.success).length,l=b==="system"?"dark":b;return vt("div",{className:`apd-root${l==="light"?" apd-light":""}`,children:[ge(Re,{}),!m&&ge(Be,{count:h.length,hasErrors:k>0,onOpen:()=>d(!0),initialPosition:r}),m&&ge(Fe,{logs:h,onClose:()=>d(!1),onClear:v,onTogglePin:P,theme:l,onToggleTheme:()=>u(l==="light"?"dark":"light")})]})}export{bt as ApiDebugger,ue as exportAsHar,le as generateCurl,oe as installAxiosInterceptor,ee as installFetchInterceptor,S as logStore,te as uninstallFetchInterceptor};
//# sourceMappingURL=index.mjs.map