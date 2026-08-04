'use client';
"use strict";var pe=Object.defineProperty;var Fe=Object.getOwnPropertyDescriptor;var $e=Object.getOwnPropertyNames;var Ue=Object.prototype.hasOwnProperty;var Je=(e,t)=>{for(var o in t)pe(e,o,{get:t[o],enumerable:!0})},_e=(e,t,o,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of $e(t))!Ue.call(e,n)&&n!==o&&pe(e,n,{get:()=>t[n],enumerable:!(r=Fe(t,n))||r.enumerable});return e};var Ke=e=>_e(pe({},"__esModule",{value:!0}),e);var at={};Je(at,{ApiDebugger:()=>Ie,exportAsHar:()=>ie,generateCurl:()=>ae,installAxiosInterceptor:()=>Z,installFetchInterceptor:()=>G,logStore:()=>k,uninstallFetchInterceptor:()=>Q});module.exports=Ke(at);var J=require("react");var le=class{constructor(){this.logs=[];this.listeners=new Set;this.maxLogs=200;this.snapshot=[];this.getLogs=()=>(this.snapshot=this.logs,this.snapshot);this.subscribe=t=>(this.listeners.add(t),()=>this.listeners.delete(t))}setMaxLogs(t){this.maxLogs=Math.max(1,t),this.trim()}addLog(t){this.logs=[t,...this.logs],this.trim(),this.emit()}togglePin(t){this.logs=this.logs.map(o=>o.id===t?{...o,pinned:!o.pinned}:o),this.emit()}clear(){this.logs=[],this.emit()}trim(){if(this.logs.length<=this.maxLogs)return;let t=this.logs.filter(i=>i.pinned),r=this.logs.filter(i=>!i.pinned).slice(0,Math.max(0,this.maxLogs-t.length)),n=[...t,...r];n.sort((i,a)=>a.timestamp-i.timestamp),this.logs=n}emit(){this.listeners.forEach(t=>t())}},k=new le;function I(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,9)}`}function F(e){if(!e)return null;try{return JSON.parse(e)}catch{return e}}function j(e){if(e==null)return null;if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return String(e)}}function A(e){if(!e)return 0;try{return new Blob([e]).size}catch{return e.length}}function ce(e){if(!e)return"0 B";let t=["B","KB","MB","GB"],o=Math.min(t.length-1,Math.floor(Math.log(e)/Math.log(1024))),r=e/Math.pow(1024,o);return`${o===0?r:r.toFixed(1)} ${t[o]}`}function _(e){return e<1e3?`${e} ms`:`${(e/1e3).toFixed(2)} s`}function K(e){let t=new Date(e);return t.toLocaleTimeString(void 0,{hour12:!1})+`.${String(t.getMilliseconds()).padStart(3,"0")}`}function Y(e){try{let t=typeof window!="undefined"?window.location.origin:"http://localhost",o=new URL(e,t),r={};return o.searchParams.forEach((n,i)=>{r[i]=n}),{endpoint:o.pathname,queryParams:r}}catch{return{endpoint:e,queryParams:{}}}}function W(e){let t={};return e&&e.forEach((o,r)=>{t[r]=o}),t}function $(e){let t={};if(!e)return t;if(typeof e.toJSON=="function")return{...e.toJSON()};if(e instanceof Headers)return W(e);if(typeof e=="object")for(let[o,r]of Object.entries(e))r!=null&&(t[o]=String(r));return t}function X(e,t){return!t||t.length===0?!1:t.some(o=>o instanceof RegExp?o.test(e):e.includes(o))}function R(...e){return e.filter(Boolean).join(" ")}async function xe(e){try{if(navigator.clipboard&&window.isSecureContext)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select();let o=document.execCommand("copy");return document.body.removeChild(t),o}catch{return!1}}var z=null,V=!1;function Ye(e){if(e==null)return null;if(typeof e=="string")return e;if(e instanceof URLSearchParams)return e.toString();if(e instanceof FormData){let t=[];return e.forEach((o,r)=>{t.push(`${r}=${o instanceof File?`[File: ${o.name}]`:o}`)}),t.join("&")}return"[binary data]"}function G(e={}){V||typeof window=="undefined"||typeof window.fetch!="function"||(z=window.fetch.bind(window),V=!0,window.fetch=async function(o,r){var y,E,w;let n=o instanceof Request?o:null,i=n?n.url:String(o);if(X(i,e.ignoreUrls))return z(o,r);let a=Date.now(),d=performance.now(),c=((r==null?void 0:r.method)||(n==null?void 0:n.method)||"GET").toUpperCase(),g=W(new Headers((E=(y=r==null?void 0:r.headers)!=null?y:n==null?void 0:n.headers)!=null?E:void 0)),{endpoint:p,queryParams:v}=Y(i),u=Ye((w=r==null?void 0:r.body)!=null?w:null),x={id:I(),url:i,endpoint:p,method:c,requestHeaders:g,requestBody:F(u),requestBodyRaw:u,queryParams:v,timestamp:a,source:"fetch",requestSize:A(u),pinned:!1};try{let l=await z(o,r),b=Math.round(performance.now()-d),h=l.clone(),f=null;try{f=await h.text()}catch{f=null}return k.addLog({...x,duration:b,responseStatus:l.status,responseStatusText:l.statusText,responseHeaders:W(l.headers),responseBody:F(f),responseBodyRaw:f,responseSize:A(f),success:l.ok,error:l.ok?null:`HTTP ${l.status} ${l.statusText}`}),l}catch(l){let b=Math.round(performance.now()-d);throw k.addLog({...x,duration:b,responseStatus:null,responseStatusText:"",responseHeaders:{},responseBody:null,responseBodyRaw:null,responseSize:0,success:!1,error:(l==null?void 0:l.message)||"Network error"}),l}})}function Q(){V&&z&&typeof window!="undefined"&&(window.fetch=z),V=!1,z=null}function We(e){let t=(e==null?void 0:e.baseURL)||"",o=(e==null?void 0:e.url)||"",r=/^https?:\/\//i.test(o)?o:`${t}${t&&!t.endsWith("/")&&!o.startsWith("/")?"/":""}${o}`;if(e!=null&&e.params&&typeof e.params=="object"){let n=Xe(e.params);n&&(r+=(r.includes("?")?"&":"?")+n)}return r}function Xe(e){let t=new URLSearchParams;for(let[o,r]of Object.entries(e))r!=null&&(Array.isArray(r)?r.forEach(n=>t.append(o,String(n))):t.append(o,String(r)));return t.toString()}function be(e){if(e==null)return null;if(typeof e=="string")return e;if(typeof URLSearchParams!="undefined"&&e instanceof URLSearchParams)return e.toString();if(typeof FormData!="undefined"&&e instanceof FormData){let t=[];return e.forEach((o,r)=>{t.push(`${r}=${o instanceof File?`[File: ${o.name}]`:o}`)}),t.join("&")}return j(e)}function Z(e,t={}){var i;if(!e||!e.interceptors||typeof((i=e.interceptors.request)==null?void 0:i.use)!="function")return()=>{};if(e.__apiDebuggerInstalled)return()=>{};e.__apiDebuggerInstalled=!0;let o=e.interceptors.request.use(a=>{let d={id:I(),startTime:Date.now(),startPerf:performance.now(),requestBodyRaw:be(a.data),requestHeadersSnapshot:$(a.headers)};return a.__apdMeta=d,a});function r(a,d,c){var f,q,de,me,ge,he;if(!a)return;let g=We(a);if(X(g,t.ignoreUrls))return;let p=a.__apdMeta||{id:I(),startTime:Date.now(),startPerf:performance.now(),requestBodyRaw:be(a.data),requestHeadersSnapshot:$(a.headers)},v=Math.round(performance.now()-p.startPerf),{endpoint:u,queryParams:x}=Y(g),y=$(a.headers),E=Object.keys(y).length>0?y:p.requestHeadersSnapshot,w=p.requestBodyRaw,l=(d==null?void 0:d.data)!==void 0?j(d.data):null,b=(de=(q=d==null?void 0:d.status)!=null?q:(f=c==null?void 0:c.response)==null?void 0:f.status)!=null?de:null,h={id:p.id,url:g,endpoint:u,method:(a.method||"get").toUpperCase(),requestHeaders:E,requestBody:(me=F(w))!=null?me:w,requestBodyRaw:w,queryParams:x,responseStatus:b,responseStatusText:(ge=d==null?void 0:d.statusText)!=null?ge:"",responseHeaders:$(d==null?void 0:d.headers),responseBody:(he=d==null?void 0:d.data)!=null?he:null,responseBodyRaw:l,duration:v,timestamp:p.startTime,success:!c&&!!b&&b<400,error:c?c.message||"Request failed":null,source:"axios",requestSize:A(w),responseSize:A(l),pinned:!1};k.addLog(h)}let n=e.interceptors.response.use(a=>(r(a.config,a),a),a=>(r(a==null?void 0:a.config,a==null?void 0:a.response,a),Promise.reject(a)));return()=>{e.interceptors.request.eject(o),e.interceptors.response.eject(n),e.__apiDebuggerInstalled=!1}}var U=require("react");function ve(){let e=(0,U.useSyncExternalStore)(k.subscribe,k.getLogs,k.getLogs),t=(0,U.useCallback)(()=>k.clear(),[]),o=(0,U.useCallback)(r=>k.togglePin(r),[]);return{logs:e,clear:t,togglePin:o}}var ye=require("react");function we(e,t,o=!0){(0,ye.useEffect)(()=>{if(!o||typeof window=="undefined")return;function r(n){let i=!e.ctrl||n.ctrlKey||n.metaKey,a=!e.shift||n.shiftKey;i&&a&&n.key.toLowerCase()===e.key.toLowerCase()&&(n.preventDefault(),t())}return window.addEventListener("keydown",r),()=>window.removeEventListener("keydown",r)},[e.ctrl,e.shift,e.key,t,o])}var Ne=require("react");var ke=`
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
`;var Se="next-api-debugger-styles";function Pe(){return(0,Ne.useEffect)(()=>{if(typeof document=="undefined"||document.getElementById(Se))return;let e=document.createElement("style");e.id=Se,e.textContent=ke,document.head.appendChild(e)},[]),null}var S=require("react"),Re="apd-button-position",te=56,Te=5;function ee(e){return typeof window=="undefined"?e:{x:Math.min(Math.max(8,e.x),window.innerWidth-te-8),y:Math.min(Math.max(8,e.y),window.innerHeight-te-8)}}function Ve(){return typeof window=="undefined"?{x:24,y:24}:{x:window.innerWidth-te-24,y:window.innerHeight-te-24}}function Ee(e){let[t,o]=(0,S.useState)(()=>{if(typeof window=="undefined")return e!=null?e:{x:24,y:24};try{let p=sessionStorage.getItem(Re);if(p)return ee(JSON.parse(p))}catch{}return ee(e!=null?e:Ve())}),r=(0,S.useRef)(!1),n=(0,S.useRef)(!1),i=(0,S.useRef)({pointerX:0,pointerY:0,posX:0,posY:0}),a=(0,S.useCallback)(p=>{r.current=!0,n.current=!1,i.current={pointerX:p.clientX,pointerY:p.clientY,posX:t.x,posY:t.y},p.currentTarget.setPointerCapture(p.pointerId)},[t.x,t.y]),d=(0,S.useCallback)(p=>{if(!r.current)return;let v=p.clientX-i.current.pointerX,u=p.clientY-i.current.pointerY;(Math.abs(v)>Te||Math.abs(u)>Te)&&(n.current=!0),o(ee({x:i.current.posX+v,y:i.current.posY+u}))},[]),c=(0,S.useCallback)(()=>{r.current=!1},[]);(0,S.useEffect)(()=>{try{sessionStorage.setItem(Re,JSON.stringify(t))}catch{}},[t]),(0,S.useEffect)(()=>{function p(){o(v=>ee(v))}return window.addEventListener("resize",p),()=>window.removeEventListener("resize",p)},[]);let g=(0,S.useCallback)(()=>n.current,[]);return{position:t,onPointerDown:a,onPointerMove:d,onPointerUp:c,wasDragged:g}}var B=require("react/jsx-runtime");function Le({count:e,hasErrors:t,onOpen:o,initialPosition:r}){let{position:n,onPointerDown:i,onPointerMove:a,onPointerUp:d,wasDragged:c}=Ee(r);return(0,B.jsxs)("button",{type:"button",className:"apd-btn",style:{left:n.x,top:n.y},onPointerDown:i,onPointerMove:a,onPointerUp:d,onClick:()=>{c()||o()},"aria-label":"Open API debugger",title:"API Debugger (drag to move)",children:[(0,B.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,B.jsx)("polyline",{points:"16 18 22 12 16 6"}),(0,B.jsx)("polyline",{points:"8 6 2 12 8 18"})]}),e>0&&(0,B.jsx)("span",{className:R("apd-btn-dot",t&&"apd-has-errors"),children:e>99?"99+":e})]})}var C=require("react");var H=require("react/jsx-runtime");function Ce({value:e,onChange:t}){return(0,H.jsxs)("div",{className:"apd-search",children:[(0,H.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,H.jsx)("circle",{cx:"11",cy:"11",r:"7"}),(0,H.jsx)("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]}),(0,H.jsx)("input",{type:"text",placeholder:"Filter by URL, endpoint, method or status code...",value:e,onChange:o=>t(o.target.value),spellCheck:!1})]})}var L=require("react/jsx-runtime");function qe({status:e,onStatusChange:t,methods:o,activeMethods:r,onToggleMethod:n}){return(0,L.jsxs)(L.Fragment,{children:[(0,L.jsx)("button",{type:"button",className:R("apd-chip apd-chip-success",e==="success"&&"apd-active"),onClick:()=>t(e==="success"?"all":"success"),children:"Success"}),(0,L.jsx)("button",{type:"button",className:R("apd-chip apd-chip-failed",e==="failed"&&"apd-active"),onClick:()=>t(e==="failed"?"all":"failed"),children:"Failed"}),o.map(i=>(0,L.jsx)("button",{type:"button",className:R("apd-chip",r.includes(i)&&"apd-active"),onClick:()=>n(i),children:i},i))]})}var N=require("react/jsx-runtime");function Ge(e){return["GET","POST","PUT","PATCH","DELETE"].includes(e.toUpperCase())?`apd-method-${e.toUpperCase()}`:"apd-method-OTHER"}function Be({log:e,selected:t,onSelect:o,onTogglePin:r}){var n;return(0,N.jsxs)("div",{className:R("apd-item",t&&"apd-selected"),onClick:o,role:"button",tabIndex:0,onKeyDown:i=>i.key==="Enter"&&o(),children:[(0,N.jsxs)("div",{className:"apd-item-row1",children:[(0,N.jsx)("span",{className:R("apd-method",Ge(e.method)),children:e.method}),(0,N.jsx)("span",{className:"apd-item-url",title:e.url,children:e.endpoint}),(0,N.jsx)("span",{className:R("apd-status-dot",e.success?"apd-ok":"apd-fail")}),e.pinned&&(0,N.jsx)("button",{type:"button",className:"apd-pin-star",onClick:i=>{i.stopPropagation(),r()},title:"Unpin","aria-label":"Unpin request",style:{background:"none",border:"none",cursor:"pointer",padding:0},children:"\u2605"})]}),(0,N.jsxs)("div",{className:"apd-item-row2",children:[(0,N.jsx)("span",{children:(n=e.responseStatus)!=null?n:e.error?"ERR":"\u2014"}),(0,N.jsx)("span",{children:_(e.duration)}),(0,N.jsx)("span",{children:K(e.timestamp)}),(0,N.jsx)("span",{style:{marginLeft:"auto",textTransform:"uppercase"},children:e.source})]})]})}var M=require("react/jsx-runtime");function He({logs:e,selectedId:t,onSelect:o,onTogglePin:r}){return e.length===0?(0,M.jsx)("div",{className:"apd-list",children:(0,M.jsxs)("div",{className:"apd-empty",children:["No requests captured yet.",(0,M.jsx)("br",{}),"Make an API call and it'll show up here."]})}):(0,M.jsx)("div",{className:"apd-list",children:e.map(n=>(0,M.jsx)(Be,{log:n,selected:n.id===t,onSelect:()=>o(n.id),onTogglePin:()=>r(n.id)},n.id))})}var se=require("react");var Me=require("react");var je=require("react/jsx-runtime");function oe({getText:e,label:t,icon:o}){let[r,n]=(0,Me.useState)(!1);async function i(){await xe(e())&&(n(!0),setTimeout(()=>n(!1),1200))}return(0,je.jsxs)("button",{type:"button",className:R("apd-action-btn",r&&"apd-copied"),onClick:i,children:[o,r?"Copied":t]})}var T=require("react"),P=require("react/jsx-runtime"),Qe=/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(\.\d+)?([eE][+-]?\d+)?)/g;function Ze(e){return e.replace(Qe,t=>{let o="apd-json-num";return/^"/.test(t)?o=/:$/.test(t)?"apd-json-key":"apd-json-str":/true|false/.test(t)?o="apd-json-bool":/null/.test(t)&&(o="apd-json-null"),`<span class="${o}">${t}</span>`})}function Ae(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function et(e,t){var d;if(e.querySelectorAll("mark.apd-json-highlight").forEach(c=>{var p;let g=document.createTextNode(c.textContent||"");(p=c.parentNode)==null||p.replaceChild(g,c)}),e.normalize(),!t)return[];let o=t.toLowerCase(),r=document.createTreeWalker(e,NodeFilter.SHOW_TEXT),n=[],i;for(;i=r.nextNode();)n.push(i);let a=[];for(let c of n){let g=c.textContent||"",p=g.toLowerCase();if(!p.includes(o))continue;let v=document.createDocumentFragment(),u=0,x=p.indexOf(o);for(;x!==-1;){x>u&&v.appendChild(document.createTextNode(g.slice(u,x)));let y=document.createElement("mark");y.className="apd-json-highlight",y.textContent=g.slice(x,x+t.length),v.appendChild(y),a.push(y),u=x+t.length,x=p.indexOf(o,u)}u<g.length&&v.appendChild(document.createTextNode(g.slice(u))),(d=c.parentNode)==null||d.replaceChild(v,c)}return a}function re({value:e,raw:t,searchable:o=!0}){let[r,n]=(0,T.useState)(""),[i,a]=(0,T.useState)(0),[d,c]=(0,T.useState)(0),g=(0,T.useRef)(null),p=(0,T.useRef)([]),v=(0,T.useRef)(""),u,x=!0;if(e!=null&&typeof e=="object")u=JSON.stringify(e,null,2);else if(typeof e=="string")try{u=JSON.stringify(JSON.parse(e),null,2)}catch{u=t!=null?t:e,x=!1}else u=t!=null?t:String(e!=null?e:""),x=!1;let y=(0,T.useMemo)(()=>x?Ze(Ae(u)):Ae(u),[u,x]);function E(l){var b;p.current.forEach((h,f)=>h.classList.toggle("apd-active",f===l)),(b=p.current[l])==null||b.scrollIntoView({block:"center",behavior:"smooth"})}(0,T.useEffect)(()=>{if(!g.current)return;let l=r.trim(),b=l!==v.current;v.current=l;let h=et(g.current,l);p.current=h,c(h.length);let f=b||i>=h.length?0:i;a(f),E(f)},[y,r]);function w(l){if(d===0)return;let b=(i+l+d)%d;a(b),E(b)}return(0,P.jsxs)("div",{children:[o&&u.length>0&&(0,P.jsxs)("div",{className:"apd-json-search",children:[(0,P.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,P.jsx)("circle",{cx:"11",cy:"11",r:"7"}),(0,P.jsx)("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]}),(0,P.jsx)("input",{type:"text",placeholder:"Find in payload...",value:r,onChange:l=>n(l.target.value),onKeyDown:l=>{l.key==="Enter"&&(l.preventDefault(),w(l.shiftKey?-1:1))},spellCheck:!1}),r&&(0,P.jsx)("span",{className:"apd-json-search-count",children:d>0?`${i+1} / ${d}`:"No matches"}),r&&d>0&&(0,P.jsxs)("div",{className:"apd-json-search-nav",children:[(0,P.jsx)("button",{type:"button",onClick:()=>w(-1),"aria-label":"Previous match",title:"Previous match (Shift+Enter)",children:"\u2191"}),(0,P.jsx)("button",{type:"button",onClick:()=>w(1),"aria-label":"Next match",title:"Next match (Enter)",children:"\u2193"})]})]}),(0,P.jsx)("pre",{ref:g,className:"apd-json",dangerouslySetInnerHTML:{__html:y}})]})}function ne(e){return`'${e.replace(/'/g,"'\\''")}'`}function tt(e){let t=e.trim();if(!t||!(t.startsWith("{")||t.startsWith("[")))return!1;try{return JSON.parse(t),!0}catch{return!1}}function ae(e){let t=[`curl -X ${e.method} ${ne(e.url)}`],o=Object.keys(e.requestHeaders).some(r=>r.toLowerCase()==="content-type");for(let[r,n]of Object.entries(e.requestHeaders))/^(host|content-length|connection)$/i.test(r)||t.push(`  -H ${ne(`${r}: ${n}`)}`);return e.requestBodyRaw&&(!o&&tt(e.requestBodyRaw)&&t.push(`  -H ${ne("Content-Type: application/json")}`),t.push(`  --data-raw ${ne(e.requestBodyRaw)}`)),t.join(` \\
`)}var s=require("react/jsx-runtime");function D({title:e,count:t,defaultOpen:o=!0,children:r}){let[n,i]=(0,se.useState)(o);return(0,s.jsxs)("div",{className:"apd-section",children:[(0,s.jsxs)("div",{className:"apd-section-header",onClick:()=>i(a=>!a),children:[(0,s.jsxs)("span",{children:[e,typeof t=="number"?` (${t})`:""]}),(0,s.jsx)("span",{children:n?"\u2212":"+"})]}),n&&(0,s.jsx)("div",{className:"apd-section-body",children:r})]})}function ue({data:e}){let t=Object.entries(e);return t.length===0?(0,s.jsx)("div",{className:"apd-section-body apd-empty-body",children:"None"}):(0,s.jsx)("div",{className:"apd-kv",children:t.map(([o,r])=>(0,s.jsxs)(se.Fragment,{children:[(0,s.jsx)("div",{className:"apd-kv-key",children:o}),(0,s.jsx)("div",{className:"apd-kv-val",children:r})]},o))})}function ze({log:e,onTogglePin:t}){var i,a,d,c,g;if(!e)return(0,s.jsx)("div",{className:"apd-detail",children:(0,s.jsx)("div",{className:"apd-detail-empty",children:"Select a request to see full details"})});let o=ae(e),r=(a=(i=j(e.requestBody))!=null?i:e.requestBodyRaw)!=null?a:"",n=(c=(d=j(e.responseBody))!=null?d:e.responseBodyRaw)!=null?c:"";return(0,s.jsxs)("div",{className:"apd-detail",children:[(0,s.jsxs)("div",{className:"apd-detail-header",children:[(0,s.jsxs)("div",{className:"apd-detail-url",children:[(0,s.jsx)("strong",{children:e.method})," ",e.url]}),(0,s.jsx)("button",{type:"button",className:"apd-action-btn",onClick:()=>t(e.id),title:e.pinned?"Unpin":"Pin this request",children:e.pinned?"\u2605 Pinned":"\u2606 Pin"})]}),(0,s.jsxs)("div",{className:"apd-meta-grid",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("div",{className:"apd-meta-label",children:"Status"}),(0,s.jsxs)("div",{className:"apd-meta-value",style:{color:e.success?"var(--apd-success)":"var(--apd-error)"},children:[(g=e.responseStatus)!=null?g:"Failed"," ",e.responseStatusText]})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("div",{className:"apd-meta-label",children:"Duration"}),(0,s.jsx)("div",{className:"apd-meta-value",children:_(e.duration)})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("div",{className:"apd-meta-label",children:"Time"}),(0,s.jsx)("div",{className:"apd-meta-value",children:K(e.timestamp)})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("div",{className:"apd-meta-label",children:"Source"}),(0,s.jsx)("div",{className:"apd-meta-value",children:e.source})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("div",{className:"apd-meta-label",children:"Req. size"}),(0,s.jsx)("div",{className:"apd-meta-value",children:ce(e.requestSize)})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("div",{className:"apd-meta-label",children:"Res. size"}),(0,s.jsx)("div",{className:"apd-meta-value",children:ce(e.responseSize)})]})]}),e.error&&(0,s.jsxs)("div",{className:"apd-section",style:{borderColor:"var(--apd-error)"},children:[(0,s.jsx)("div",{className:"apd-section-header",style:{color:"var(--apd-error)"},children:"Error"}),(0,s.jsx)("div",{className:"apd-section-body",children:e.error})]}),(0,s.jsxs)("div",{className:"apd-actions",children:[(0,s.jsx)(oe,{label:"Copy cURL",getText:()=>o}),(0,s.jsx)(oe,{label:"Copy Request",getText:()=>r}),(0,s.jsx)(oe,{label:"Copy Response",getText:()=>n})]}),(0,s.jsx)(D,{title:"cURL",children:(0,s.jsx)(re,{value:o,searchable:!1})}),(0,s.jsx)(D,{title:"Query Params",count:Object.keys(e.queryParams).length,defaultOpen:!1,children:(0,s.jsx)(ue,{data:e.queryParams})}),(0,s.jsx)(D,{title:"Request Headers",count:Object.keys(e.requestHeaders).length,defaultOpen:!1,children:(0,s.jsx)(ue,{data:e.requestHeaders})}),(0,s.jsx)(D,{title:"Request Body",children:e.requestBodyRaw?(0,s.jsx)(re,{value:e.requestBody,raw:e.requestBodyRaw}):(0,s.jsx)("div",{className:"apd-empty-body",children:"No body"})}),(0,s.jsx)(D,{title:"Response Headers",count:Object.keys(e.responseHeaders).length,defaultOpen:!1,children:(0,s.jsx)(ue,{data:e.responseHeaders})}),(0,s.jsx)(D,{title:"Response Body",children:e.responseBodyRaw?(0,s.jsx)(re,{value:e.responseBody,raw:e.responseBodyRaw}):(0,s.jsx)("div",{className:"apd-empty-body",children:"No body"})})]})}function De(e){return Object.entries(e).map(([t,o])=>({name:t,value:o}))}function ot(e){return Object.entries(e).map(([t,o])=>({name:t,value:o}))}function ie(e){return{log:{version:"1.2",creator:{name:"next-api-debugger",version:"0.1.0"},entries:e.map(t=>{var o,r;return{startedDateTime:new Date(t.timestamp).toISOString(),time:t.duration,request:{method:t.method,url:t.url,httpVersion:"HTTP/1.1",headers:De(t.requestHeaders),queryString:ot(t.queryParams),cookies:[],headersSize:-1,bodySize:t.requestSize,postData:t.requestBodyRaw?{mimeType:t.requestHeaders["content-type"]||"application/json",text:t.requestBodyRaw}:void 0},response:{status:(o=t.responseStatus)!=null?o:0,statusText:t.responseStatusText,httpVersion:"HTTP/1.1",headers:De(t.responseHeaders),cookies:[],content:{size:t.responseSize,mimeType:t.responseHeaders["content-type"]||"application/json",text:(r=t.responseBodyRaw)!=null?r:""},redirectURL:"",headersSize:-1,bodySize:t.responseSize},cache:{},timings:{send:0,wait:t.duration,receive:0}}})}}}function fe(e,t){let o=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),r=URL.createObjectURL(o),n=document.createElement("a");n.href=r,n.download=e,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(r)}var m=require("react/jsx-runtime"),rt=["GET","POST","PUT","PATCH","DELETE"];function Oe({logs:e,onClose:t,onClear:o,onTogglePin:r,theme:n,onToggleTheme:i}){var w,l,b;let[a,d]=(0,C.useState)({search:"",status:"all",methods:[]}),[c,g]=(0,C.useState)(null),[p,v]=(0,C.useState)(!1);(0,C.useEffect)(()=>{!c&&e.length>0&&g(e[0].id)},[e,c]);let u=(0,C.useMemo)(()=>{let h=a.search.trim().toLowerCase();return e.filter(f=>{var q;return!(a.status==="success"&&!f.success||a.status==="failed"&&f.success||a.methods.length>0&&!a.methods.includes(f.method)||h&&!`${f.url} ${f.endpoint} ${f.method} ${(q=f.responseStatus)!=null?q:""}`.toLowerCase().includes(h))})},[e,a]),x=(l=(w=u.find(h=>h.id===c))!=null?w:u[0])!=null?l:null,y=e.filter(h=>!h.success).length;function E(h){d(f=>({...f,methods:f.methods.includes(h)?f.methods.filter(q=>q!==h):[...f.methods,h]}))}return(0,m.jsx)("div",{className:"apd-overlay",onClick:t,children:(0,m.jsxs)("div",{className:`apd-modal${p?" apd-minimized":""}`,onClick:h=>h.stopPropagation(),children:[(0,m.jsxs)("div",{className:"apd-header",children:[(0,m.jsxs)("div",{className:"apd-header-title",children:[(0,m.jsx)("span",{className:"apd-live-dot"}),"API Debugger"]}),(0,m.jsxs)("span",{className:"apd-header-count",children:[e.length," requests",y>0?` \xB7 ${y} failed`:""]}),(0,m.jsx)("div",{className:"apd-spacer"}),(0,m.jsx)("button",{className:"apd-icon-btn",onClick:i,title:"Toggle theme",type:"button",children:n==="light"?"\u2600":"\u263E"}),(0,m.jsx)("button",{className:"apd-icon-btn",title:"Export JSON",type:"button",onClick:()=>fe(`api-logs-${Date.now()}.json`,e),children:"\u2B73"}),(0,m.jsx)("button",{className:"apd-icon-btn",title:"Export HAR",type:"button",onClick:()=>fe(`api-logs-${Date.now()}.har`,ie(e)),children:"HAR"}),(0,m.jsx)("button",{className:"apd-icon-btn",title:"Clear logs",type:"button",onClick:o,children:"\u{1F5D1}"}),(0,m.jsx)("button",{className:"apd-icon-btn",title:p?"Restore":"Minimize",type:"button",onClick:()=>v(h=>!h),children:p?"\u25A2":"\u2014"}),(0,m.jsx)("button",{className:"apd-icon-btn",title:"Close",type:"button",onClick:t,children:"\u2715"})]}),!p&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)("div",{className:"apd-toolbar",children:[(0,m.jsx)(Ce,{value:a.search,onChange:h=>d(f=>({...f,search:h}))}),(0,m.jsx)(qe,{status:a.status,onStatusChange:h=>d(f=>({...f,status:h})),methods:rt,activeMethods:a.methods,onToggleMethod:E})]}),(0,m.jsxs)("div",{className:"apd-body",children:[(0,m.jsx)(He,{logs:u,selectedId:(b=x==null?void 0:x.id)!=null?b:null,onSelect:g,onTogglePin:r}),(0,m.jsx)(ze,{log:x,onTogglePin:r})]}),(0,m.jsxs)("div",{className:"apd-footer",children:[(0,m.jsxs)("span",{children:[(0,m.jsx)("span",{className:"apd-kbd",children:"Ctrl"}),"+",(0,m.jsx)("span",{className:"apd-kbd",children:"Shift"}),"+",(0,m.jsx)("span",{className:"apd-kbd",children:"D"})," to toggle"]}),(0,m.jsx)("span",{style:{marginLeft:"auto"},children:"next-api-debugger \xB7 dev only"})]})]})]})})}var O=require("react/jsx-runtime");function nt(e){return typeof e=="boolean"?e:process.env.NODE_ENV!=="production"}function Ie(e){let{enabled:t,maxLogs:o=200,initialPosition:r,axiosInstance:n,theme:i="dark",keyboardShortcut:a=!0,ignoreUrls:d}=e,c=nt(t),[g,p]=(0,J.useState)(!1),[v,u]=(0,J.useState)(i),{logs:x,clear:y,togglePin:E}=ve();if((0,J.useEffect)(()=>{if(!c||typeof window=="undefined")return;k.setMaxLogs(o),G({ignoreUrls:d});let b=n?Z(n,{ignoreUrls:d}):()=>{};return()=>{Q(),b()}},[c]),we({ctrl:!0,shift:!0,key:"d"},()=>p(b=>!b),c&&a),!c)return null;let w=x.filter(b=>!b.success).length,l=v==="system"?"dark":v;return(0,O.jsxs)("div",{className:`apd-root${l==="light"?" apd-light":""}`,children:[(0,O.jsx)(Pe,{}),!g&&(0,O.jsx)(Le,{count:x.length,hasErrors:w>0,onOpen:()=>p(!0),initialPosition:r}),g&&(0,O.jsx)(Oe,{logs:x,onClose:()=>p(!1),onClear:y,onTogglePin:E,theme:l,onToggleTheme:()=>u(l==="light"?"dark":"light")})]})}0&&(module.exports={ApiDebugger,exportAsHar,generateCurl,installAxiosInterceptor,installFetchInterceptor,logStore,uninstallFetchInterceptor});
//# sourceMappingURL=index.js.map