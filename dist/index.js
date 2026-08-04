'use client';
"use strict";var pe=Object.defineProperty;var Fe=Object.getOwnPropertyDescriptor;var $e=Object.getOwnPropertyNames;var Ue=Object.prototype.hasOwnProperty;var Je=(e,t)=>{for(var o in t)pe(e,o,{get:t[o],enumerable:!0})},_e=(e,t,o,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of $e(t))!Ue.call(e,a)&&a!==o&&pe(e,a,{get:()=>t[a],enumerable:!(r=Fe(t,a))||r.enumerable});return e};var Ke=e=>_e(pe({},"__esModule",{value:!0}),e);var at={};Je(at,{ApiDebugger:()=>Ie,exportAsHar:()=>ie,generateCurl:()=>ne,installAxiosInterceptor:()=>Z,installFetchInterceptor:()=>G,logStore:()=>k,uninstallFetchInterceptor:()=>Q});module.exports=Ke(at);var J=require("react");var le=class{constructor(){this.logs=[];this.listeners=new Set;this.maxLogs=200;this.snapshot=[];this.getLogs=()=>(this.snapshot=this.logs,this.snapshot);this.subscribe=t=>(this.listeners.add(t),()=>this.listeners.delete(t))}setMaxLogs(t){this.maxLogs=Math.max(1,t),this.trim()}addLog(t){this.logs=[t,...this.logs],this.trim(),this.emit()}togglePin(t){this.logs=this.logs.map(o=>o.id===t?{...o,pinned:!o.pinned}:o),this.emit()}clear(){this.logs=[],this.emit()}trim(){if(this.logs.length<=this.maxLogs)return;let t=this.logs.filter(i=>i.pinned),r=this.logs.filter(i=>!i.pinned).slice(0,Math.max(0,this.maxLogs-t.length)),a=[...t,...r];a.sort((i,n)=>n.timestamp-i.timestamp),this.logs=a}emit(){this.listeners.forEach(t=>t())}},k=new le;function I(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,9)}`}function F(e){if(!e)return null;try{return JSON.parse(e)}catch{return e}}function M(e){if(e==null)return null;if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return String(e)}}function A(e){if(!e)return 0;try{return new Blob([e]).size}catch{return e.length}}function ce(e){if(!e)return"0 B";let t=["B","KB","MB","GB"],o=Math.min(t.length-1,Math.floor(Math.log(e)/Math.log(1024))),r=e/Math.pow(1024,o);return`${o===0?r:r.toFixed(1)} ${t[o]}`}function _(e){return e<1e3?`${e} ms`:`${(e/1e3).toFixed(2)} s`}function K(e){let t=new Date(e);return t.toLocaleTimeString(void 0,{hour12:!1})+`.${String(t.getMilliseconds()).padStart(3,"0")}`}function Y(e){try{let t=typeof window!="undefined"?window.location.origin:"http://localhost",o=new URL(e,t),r={};return o.searchParams.forEach((a,i)=>{r[i]=a}),{endpoint:o.pathname,queryParams:r}}catch{return{endpoint:e,queryParams:{}}}}function W(e){let t={};return e&&e.forEach((o,r)=>{t[r]=o}),t}function $(e){let t={};if(!e)return t;if(typeof e.toJSON=="function")return{...e.toJSON()};if(e instanceof Headers)return W(e);if(typeof e=="object")for(let[o,r]of Object.entries(e))r!=null&&(t[o]=String(r));return t}function X(e,t){return!t||t.length===0?!1:t.some(o=>o instanceof RegExp?o.test(e):e.includes(o))}function R(...e){return e.filter(Boolean).join(" ")}async function xe(e){try{if(navigator.clipboard&&window.isSecureContext)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select();let o=document.execCommand("copy");return document.body.removeChild(t),o}catch{return!1}}var z=null,V=!1;function Ye(e){if(e==null)return null;if(typeof e=="string")return e;if(e instanceof URLSearchParams)return e.toString();if(e instanceof FormData){let t=[];return e.forEach((o,r)=>{t.push(`${r}=${o instanceof File?`[File: ${o.name}]`:o}`)}),t.join("&")}return"[binary data]"}function G(e={}){V||typeof window=="undefined"||typeof window.fetch!="function"||(z=window.fetch.bind(window),V=!0,window.fetch=async function(o,r){var c,y,T;let a=o instanceof Request?o:null,i=a?a.url:String(o);if(X(i,e.ignoreUrls))return z(o,r);let n=Date.now(),d=performance.now(),f=((r==null?void 0:r.method)||(a==null?void 0:a.method)||"GET").toUpperCase(),l=W(new Headers((y=(c=r==null?void 0:r.headers)!=null?c:a==null?void 0:a.headers)!=null?y:void 0)),{endpoint:p,queryParams:m}=Y(i),b=Ye((T=r==null?void 0:r.body)!=null?T:null),h={id:I(),url:i,endpoint:p,method:f,requestHeaders:l,requestBody:F(b),requestBodyRaw:b,queryParams:m,timestamp:n,source:"fetch",requestSize:A(b),pinned:!1};try{let x=await z(o,r),w=Math.round(performance.now()-d),v=x.clone(),g=null;try{g=await v.text()}catch{g=null}return k.addLog({...h,duration:w,responseStatus:x.status,responseStatusText:x.statusText,responseHeaders:W(x.headers),responseBody:F(g),responseBodyRaw:g,responseSize:A(g),success:x.ok,error:x.ok?null:`HTTP ${x.status} ${x.statusText}`}),x}catch(x){let w=Math.round(performance.now()-d);throw k.addLog({...h,duration:w,responseStatus:null,responseStatusText:"",responseHeaders:{},responseBody:null,responseBodyRaw:null,responseSize:0,success:!1,error:(x==null?void 0:x.message)||"Network error"}),x}})}function Q(){V&&z&&typeof window!="undefined"&&(window.fetch=z),V=!1,z=null}function We(e){let t=(e==null?void 0:e.baseURL)||"",o=(e==null?void 0:e.url)||"";return/^https?:\/\//i.test(o)?o:`${t}${t&&!t.endsWith("/")&&!o.startsWith("/")?"/":""}${o}`}function be(e){if(e==null)return null;if(typeof e=="string")return e;if(typeof URLSearchParams!="undefined"&&e instanceof URLSearchParams)return e.toString();if(typeof FormData!="undefined"&&e instanceof FormData){let t=[];return e.forEach((o,r)=>{t.push(`${r}=${o instanceof File?`[File: ${o.name}]`:o}`)}),t.join("&")}return M(e)}function Z(e,t={}){var i;if(!e||!e.interceptors||typeof((i=e.interceptors.request)==null?void 0:i.use)!="function")return()=>{};if(e.__apiDebuggerInstalled)return()=>{};e.__apiDebuggerInstalled=!0;let o=e.interceptors.request.use(n=>{let d={id:I(),startTime:Date.now(),startPerf:performance.now(),requestBodyRaw:be(n.data),requestHeadersSnapshot:$(n.headers)};return n.__apdMeta=d,n});function r(n,d,f){var g,q,de,me,ge,he;if(!n)return;let l=We(n);if(X(l,t.ignoreUrls))return;let p=n.__apdMeta||{id:I(),startTime:Date.now(),startPerf:performance.now(),requestBodyRaw:be(n.data),requestHeadersSnapshot:$(n.headers)},m=Math.round(performance.now()-p.startPerf),{endpoint:b,queryParams:h}=Y(l),c=$(n.headers),y=Object.keys(c).length>0?c:p.requestHeadersSnapshot,T=p.requestBodyRaw,x=(d==null?void 0:d.data)!==void 0?M(d.data):null,w=(de=(q=d==null?void 0:d.status)!=null?q:(g=f==null?void 0:f.response)==null?void 0:g.status)!=null?de:null,v={id:p.id,url:l,endpoint:b,method:(n.method||"get").toUpperCase(),requestHeaders:y,requestBody:(me=F(T))!=null?me:T,requestBodyRaw:T,queryParams:{...h,...n.params||{}},responseStatus:w,responseStatusText:(ge=d==null?void 0:d.statusText)!=null?ge:"",responseHeaders:$(d==null?void 0:d.headers),responseBody:(he=d==null?void 0:d.data)!=null?he:null,responseBodyRaw:x,duration:m,timestamp:p.startTime,success:!f&&!!w&&w<400,error:f?f.message||"Request failed":null,source:"axios",requestSize:A(T),responseSize:A(x),pinned:!1};k.addLog(v)}let a=e.interceptors.response.use(n=>(r(n.config,n),n),n=>(r(n==null?void 0:n.config,n==null?void 0:n.response,n),Promise.reject(n)));return()=>{e.interceptors.request.eject(o),e.interceptors.response.eject(a),e.__apiDebuggerInstalled=!1}}var U=require("react");function ve(){let e=(0,U.useSyncExternalStore)(k.subscribe,k.getLogs,k.getLogs),t=(0,U.useCallback)(()=>k.clear(),[]),o=(0,U.useCallback)(r=>k.togglePin(r),[]);return{logs:e,clear:t,togglePin:o}}var ye=require("react");function we(e,t,o=!0){(0,ye.useEffect)(()=>{if(!o||typeof window=="undefined")return;function r(a){let i=!e.ctrl||a.ctrlKey||a.metaKey,n=!e.shift||a.shiftKey;i&&n&&a.key.toLowerCase()===e.key.toLowerCase()&&(a.preventDefault(),t())}return window.addEventListener("keydown",r),()=>window.removeEventListener("keydown",r)},[e.ctrl,e.shift,e.key,t,o])}var Ne=require("react");var ke=`
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
`;var Se="next-api-debugger-styles";function Pe(){return(0,Ne.useEffect)(()=>{if(typeof document=="undefined"||document.getElementById(Se))return;let e=document.createElement("style");e.id=Se,e.textContent=ke,document.head.appendChild(e)},[]),null}var S=require("react"),Te="apd-button-position",te=56,Re=5;function ee(e){return typeof window=="undefined"?e:{x:Math.min(Math.max(8,e.x),window.innerWidth-te-8),y:Math.min(Math.max(8,e.y),window.innerHeight-te-8)}}function Xe(){return typeof window=="undefined"?{x:24,y:24}:{x:window.innerWidth-te-24,y:window.innerHeight-te-24}}function Ee(e){let[t,o]=(0,S.useState)(()=>{if(typeof window=="undefined")return e!=null?e:{x:24,y:24};try{let p=sessionStorage.getItem(Te);if(p)return ee(JSON.parse(p))}catch{}return ee(e!=null?e:Xe())}),r=(0,S.useRef)(!1),a=(0,S.useRef)(!1),i=(0,S.useRef)({pointerX:0,pointerY:0,posX:0,posY:0}),n=(0,S.useCallback)(p=>{r.current=!0,a.current=!1,i.current={pointerX:p.clientX,pointerY:p.clientY,posX:t.x,posY:t.y},p.currentTarget.setPointerCapture(p.pointerId)},[t.x,t.y]),d=(0,S.useCallback)(p=>{if(!r.current)return;let m=p.clientX-i.current.pointerX,b=p.clientY-i.current.pointerY;(Math.abs(m)>Re||Math.abs(b)>Re)&&(a.current=!0),o(ee({x:i.current.posX+m,y:i.current.posY+b}))},[]),f=(0,S.useCallback)(()=>{r.current=!1},[]);(0,S.useEffect)(()=>{try{sessionStorage.setItem(Te,JSON.stringify(t))}catch{}},[t]),(0,S.useEffect)(()=>{function p(){o(m=>ee(m))}return window.addEventListener("resize",p),()=>window.removeEventListener("resize",p)},[]);let l=(0,S.useCallback)(()=>a.current,[]);return{position:t,onPointerDown:n,onPointerMove:d,onPointerUp:f,wasDragged:l}}var B=require("react/jsx-runtime");function Ce({count:e,hasErrors:t,onOpen:o,initialPosition:r}){let{position:a,onPointerDown:i,onPointerMove:n,onPointerUp:d,wasDragged:f}=Ee(r);return(0,B.jsxs)("button",{type:"button",className:"apd-btn",style:{left:a.x,top:a.y},onPointerDown:i,onPointerMove:n,onPointerUp:d,onClick:()=>{f()||o()},"aria-label":"Open API debugger",title:"API Debugger (drag to move)",children:[(0,B.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,B.jsx)("polyline",{points:"16 18 22 12 16 6"}),(0,B.jsx)("polyline",{points:"8 6 2 12 8 18"})]}),e>0&&(0,B.jsx)("span",{className:R("apd-btn-dot",t&&"apd-has-errors"),children:e>99?"99+":e})]})}var L=require("react");var H=require("react/jsx-runtime");function Le({value:e,onChange:t}){return(0,H.jsxs)("div",{className:"apd-search",children:[(0,H.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,H.jsx)("circle",{cx:"11",cy:"11",r:"7"}),(0,H.jsx)("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]}),(0,H.jsx)("input",{type:"text",placeholder:"Filter by URL, endpoint, method or status code...",value:e,onChange:o=>t(o.target.value),spellCheck:!1})]})}var C=require("react/jsx-runtime");function qe({status:e,onStatusChange:t,methods:o,activeMethods:r,onToggleMethod:a}){return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)("button",{type:"button",className:R("apd-chip apd-chip-success",e==="success"&&"apd-active"),onClick:()=>t(e==="success"?"all":"success"),children:"Success"}),(0,C.jsx)("button",{type:"button",className:R("apd-chip apd-chip-failed",e==="failed"&&"apd-active"),onClick:()=>t(e==="failed"?"all":"failed"),children:"Failed"}),o.map(i=>(0,C.jsx)("button",{type:"button",className:R("apd-chip",r.includes(i)&&"apd-active"),onClick:()=>a(i),children:i},i))]})}var N=require("react/jsx-runtime");function Ve(e){return["GET","POST","PUT","PATCH","DELETE"].includes(e.toUpperCase())?`apd-method-${e.toUpperCase()}`:"apd-method-OTHER"}function Be({log:e,selected:t,onSelect:o,onTogglePin:r}){var a;return(0,N.jsxs)("div",{className:R("apd-item",t&&"apd-selected"),onClick:o,role:"button",tabIndex:0,onKeyDown:i=>i.key==="Enter"&&o(),children:[(0,N.jsxs)("div",{className:"apd-item-row1",children:[(0,N.jsx)("span",{className:R("apd-method",Ve(e.method)),children:e.method}),(0,N.jsx)("span",{className:"apd-item-url",title:e.url,children:e.endpoint}),(0,N.jsx)("span",{className:R("apd-status-dot",e.success?"apd-ok":"apd-fail")}),e.pinned&&(0,N.jsx)("button",{type:"button",className:"apd-pin-star",onClick:i=>{i.stopPropagation(),r()},title:"Unpin","aria-label":"Unpin request",style:{background:"none",border:"none",cursor:"pointer",padding:0},children:"\u2605"})]}),(0,N.jsxs)("div",{className:"apd-item-row2",children:[(0,N.jsx)("span",{children:(a=e.responseStatus)!=null?a:e.error?"ERR":"\u2014"}),(0,N.jsx)("span",{children:_(e.duration)}),(0,N.jsx)("span",{children:K(e.timestamp)}),(0,N.jsx)("span",{style:{marginLeft:"auto",textTransform:"uppercase"},children:e.source})]})]})}var j=require("react/jsx-runtime");function He({logs:e,selectedId:t,onSelect:o,onTogglePin:r}){return e.length===0?(0,j.jsx)("div",{className:"apd-list",children:(0,j.jsxs)("div",{className:"apd-empty",children:["No requests captured yet.",(0,j.jsx)("br",{}),"Make an API call and it'll show up here."]})}):(0,j.jsx)("div",{className:"apd-list",children:e.map(a=>(0,j.jsx)(Be,{log:a,selected:a.id===t,onSelect:()=>o(a.id),onTogglePin:()=>r(a.id)},a.id))})}var se=require("react");var je=require("react");var Me=require("react/jsx-runtime");function oe({getText:e,label:t,icon:o}){let[r,a]=(0,je.useState)(!1);async function i(){await xe(e())&&(a(!0),setTimeout(()=>a(!1),1200))}return(0,Me.jsxs)("button",{type:"button",className:R("apd-action-btn",r&&"apd-copied"),onClick:i,children:[o,r?"Copied":t]})}var E=require("react"),P=require("react/jsx-runtime"),Ge=/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(\.\d+)?([eE][+-]?\d+)?)/g;function Qe(e){return e.replace(Ge,t=>{let o="apd-json-num";return/^"/.test(t)?o=/:$/.test(t)?"apd-json-key":"apd-json-str":/true|false/.test(t)?o="apd-json-bool":/null/.test(t)&&(o="apd-json-null"),`<span class="${o}">${t}</span>`})}function Ae(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Ze(e,t){var f;if(e.querySelectorAll("mark.apd-json-highlight").forEach(l=>{var m;let p=document.createTextNode(l.textContent||"");(m=l.parentNode)==null||m.replaceChild(p,l)}),e.normalize(),!t)return 0;let r=t.toLowerCase(),a=document.createTreeWalker(e,NodeFilter.SHOW_TEXT),i=[],n;for(;n=a.nextNode();)i.push(n);let d=0;for(let l of i){let p=l.textContent||"",m=p.toLowerCase();if(!m.includes(r))continue;let b=document.createDocumentFragment(),h=0,c=m.indexOf(r);for(;c!==-1;){c>h&&b.appendChild(document.createTextNode(p.slice(h,c)));let y=document.createElement("mark");y.className="apd-json-highlight",y.dataset.apdMatchIndex=String(d),y.textContent=p.slice(c,c+t.length),b.appendChild(y),d+=1,h=c+t.length,c=m.indexOf(r,h)}h<p.length&&b.appendChild(document.createTextNode(p.slice(h))),(f=l.parentNode)==null||f.replaceChild(b,l)}return d}function re({value:e,raw:t,searchable:o=!0}){let[r,a]=(0,E.useState)(""),[i,n]=(0,E.useState)(0),[d,f]=(0,E.useState)(0),l=(0,E.useRef)(null),p,m=!0;if(e!=null&&typeof e=="object")p=JSON.stringify(e,null,2);else if(typeof e=="string")try{p=JSON.stringify(JSON.parse(e),null,2)}catch{p=t!=null?t:e,m=!1}else p=t!=null?t:String(e!=null?e:""),m=!1;let b=(0,E.useMemo)(()=>m?Qe(Ae(p)):Ae(p),[p,m]);(0,E.useEffect)(()=>{if(!l.current)return;let c=Ze(l.current,r.trim());f(c),n(0)},[b,r]),(0,E.useEffect)(()=>{if(!l.current||d===0)return;l.current.querySelectorAll("mark.apd-json-highlight").forEach(y=>{y.classList.toggle("apd-active",y.getAttribute("data-apd-match-index")===String(i))});let c=l.current.querySelector(`mark.apd-json-highlight[data-apd-match-index="${i}"]`);c==null||c.scrollIntoView({block:"center",behavior:"smooth"})},[i,d]);function h(c){d!==0&&n(y=>(y+c+d)%d)}return(0,P.jsxs)("div",{children:[o&&p.length>0&&(0,P.jsxs)("div",{className:"apd-json-search",children:[(0,P.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,P.jsx)("circle",{cx:"11",cy:"11",r:"7"}),(0,P.jsx)("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]}),(0,P.jsx)("input",{type:"text",placeholder:"Find in payload...",value:r,onChange:c=>a(c.target.value),onKeyDown:c=>{c.key==="Enter"&&h(c.shiftKey?-1:1)},spellCheck:!1}),r&&(0,P.jsx)("span",{className:"apd-json-search-count",children:d>0?`${i+1} / ${d}`:"No matches"}),r&&d>0&&(0,P.jsxs)("div",{className:"apd-json-search-nav",children:[(0,P.jsx)("button",{type:"button",onClick:()=>h(-1),"aria-label":"Previous match",title:"Previous match (Shift+Enter)",children:"\u2191"}),(0,P.jsx)("button",{type:"button",onClick:()=>h(1),"aria-label":"Next match",title:"Next match (Enter)",children:"\u2193"})]})]}),(0,P.jsx)("pre",{ref:l,className:"apd-json",dangerouslySetInnerHTML:{__html:b}})]})}function ae(e){return`'${e.replace(/'/g,"'\\''")}'`}function et(e){let t=e.trim();if(!t||!(t.startsWith("{")||t.startsWith("[")))return!1;try{return JSON.parse(t),!0}catch{return!1}}function ne(e){let t=[`curl -X ${e.method} ${ae(e.url)}`],o=Object.keys(e.requestHeaders).some(r=>r.toLowerCase()==="content-type");for(let[r,a]of Object.entries(e.requestHeaders))/^(host|content-length|connection)$/i.test(r)||t.push(`  -H ${ae(`${r}: ${a}`)}`);return e.requestBodyRaw&&(!o&&et(e.requestBodyRaw)&&t.push(`  -H ${ae("Content-Type: application/json")}`),t.push(`  --data-raw ${ae(e.requestBodyRaw)}`)),t.join(` \\
`)}var s=require("react/jsx-runtime");function D({title:e,count:t,defaultOpen:o=!0,children:r}){let[a,i]=(0,se.useState)(o);return(0,s.jsxs)("div",{className:"apd-section",children:[(0,s.jsxs)("div",{className:"apd-section-header",onClick:()=>i(n=>!n),children:[(0,s.jsxs)("span",{children:[e,typeof t=="number"?` (${t})`:""]}),(0,s.jsx)("span",{children:a?"\u2212":"+"})]}),a&&(0,s.jsx)("div",{className:"apd-section-body",children:r})]})}function ue({data:e}){let t=Object.entries(e);return t.length===0?(0,s.jsx)("div",{className:"apd-section-body apd-empty-body",children:"None"}):(0,s.jsx)("div",{className:"apd-kv",children:t.map(([o,r])=>(0,s.jsxs)(se.Fragment,{children:[(0,s.jsx)("div",{className:"apd-kv-key",children:o}),(0,s.jsx)("div",{className:"apd-kv-val",children:r})]},o))})}function ze({log:e,onTogglePin:t}){var i,n,d,f,l;if(!e)return(0,s.jsx)("div",{className:"apd-detail",children:(0,s.jsx)("div",{className:"apd-detail-empty",children:"Select a request to see full details"})});let o=ne(e),r=(n=(i=M(e.requestBody))!=null?i:e.requestBodyRaw)!=null?n:"",a=(f=(d=M(e.responseBody))!=null?d:e.responseBodyRaw)!=null?f:"";return(0,s.jsxs)("div",{className:"apd-detail",children:[(0,s.jsxs)("div",{className:"apd-detail-header",children:[(0,s.jsxs)("div",{className:"apd-detail-url",children:[(0,s.jsx)("strong",{children:e.method})," ",e.url]}),(0,s.jsx)("button",{type:"button",className:"apd-action-btn",onClick:()=>t(e.id),title:e.pinned?"Unpin":"Pin this request",children:e.pinned?"\u2605 Pinned":"\u2606 Pin"})]}),(0,s.jsxs)("div",{className:"apd-meta-grid",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("div",{className:"apd-meta-label",children:"Status"}),(0,s.jsxs)("div",{className:"apd-meta-value",style:{color:e.success?"var(--apd-success)":"var(--apd-error)"},children:[(l=e.responseStatus)!=null?l:"Failed"," ",e.responseStatusText]})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("div",{className:"apd-meta-label",children:"Duration"}),(0,s.jsx)("div",{className:"apd-meta-value",children:_(e.duration)})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("div",{className:"apd-meta-label",children:"Time"}),(0,s.jsx)("div",{className:"apd-meta-value",children:K(e.timestamp)})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("div",{className:"apd-meta-label",children:"Source"}),(0,s.jsx)("div",{className:"apd-meta-value",children:e.source})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("div",{className:"apd-meta-label",children:"Req. size"}),(0,s.jsx)("div",{className:"apd-meta-value",children:ce(e.requestSize)})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("div",{className:"apd-meta-label",children:"Res. size"}),(0,s.jsx)("div",{className:"apd-meta-value",children:ce(e.responseSize)})]})]}),e.error&&(0,s.jsxs)("div",{className:"apd-section",style:{borderColor:"var(--apd-error)"},children:[(0,s.jsx)("div",{className:"apd-section-header",style:{color:"var(--apd-error)"},children:"Error"}),(0,s.jsx)("div",{className:"apd-section-body",children:e.error})]}),(0,s.jsxs)("div",{className:"apd-actions",children:[(0,s.jsx)(oe,{label:"Copy cURL",getText:()=>o}),(0,s.jsx)(oe,{label:"Copy Request",getText:()=>r}),(0,s.jsx)(oe,{label:"Copy Response",getText:()=>a})]}),(0,s.jsx)(D,{title:"cURL",children:(0,s.jsx)(re,{value:o,searchable:!1})}),(0,s.jsx)(D,{title:"Query Params",count:Object.keys(e.queryParams).length,defaultOpen:!1,children:(0,s.jsx)(ue,{data:e.queryParams})}),(0,s.jsx)(D,{title:"Request Headers",count:Object.keys(e.requestHeaders).length,defaultOpen:!1,children:(0,s.jsx)(ue,{data:e.requestHeaders})}),(0,s.jsx)(D,{title:"Request Body",children:e.requestBodyRaw?(0,s.jsx)(re,{value:e.requestBody,raw:e.requestBodyRaw}):(0,s.jsx)("div",{className:"apd-empty-body",children:"No body"})}),(0,s.jsx)(D,{title:"Response Headers",count:Object.keys(e.responseHeaders).length,defaultOpen:!1,children:(0,s.jsx)(ue,{data:e.responseHeaders})}),(0,s.jsx)(D,{title:"Response Body",children:e.responseBodyRaw?(0,s.jsx)(re,{value:e.responseBody,raw:e.responseBodyRaw}):(0,s.jsx)("div",{className:"apd-empty-body",children:"No body"})})]})}function De(e){return Object.entries(e).map(([t,o])=>({name:t,value:o}))}function tt(e){return Object.entries(e).map(([t,o])=>({name:t,value:o}))}function ie(e){return{log:{version:"1.2",creator:{name:"next-api-debugger",version:"0.1.0"},entries:e.map(t=>{var o,r;return{startedDateTime:new Date(t.timestamp).toISOString(),time:t.duration,request:{method:t.method,url:t.url,httpVersion:"HTTP/1.1",headers:De(t.requestHeaders),queryString:tt(t.queryParams),cookies:[],headersSize:-1,bodySize:t.requestSize,postData:t.requestBodyRaw?{mimeType:t.requestHeaders["content-type"]||"application/json",text:t.requestBodyRaw}:void 0},response:{status:(o=t.responseStatus)!=null?o:0,statusText:t.responseStatusText,httpVersion:"HTTP/1.1",headers:De(t.responseHeaders),cookies:[],content:{size:t.responseSize,mimeType:t.responseHeaders["content-type"]||"application/json",text:(r=t.responseBodyRaw)!=null?r:""},redirectURL:"",headersSize:-1,bodySize:t.responseSize},cache:{},timings:{send:0,wait:t.duration,receive:0}}})}}}function fe(e,t){let o=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),r=URL.createObjectURL(o),a=document.createElement("a");a.href=r,a.download=e,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(r)}var u=require("react/jsx-runtime"),ot=["GET","POST","PUT","PATCH","DELETE"];function Oe({logs:e,onClose:t,onClear:o,onTogglePin:r,theme:a,onToggleTheme:i}){var T,x,w;let[n,d]=(0,L.useState)({search:"",status:"all",methods:[]}),[f,l]=(0,L.useState)(null),[p,m]=(0,L.useState)(!1);(0,L.useEffect)(()=>{!f&&e.length>0&&l(e[0].id)},[e,f]);let b=(0,L.useMemo)(()=>{let v=n.search.trim().toLowerCase();return e.filter(g=>{var q;return!(n.status==="success"&&!g.success||n.status==="failed"&&g.success||n.methods.length>0&&!n.methods.includes(g.method)||v&&!`${g.url} ${g.endpoint} ${g.method} ${(q=g.responseStatus)!=null?q:""}`.toLowerCase().includes(v))})},[e,n]),h=(x=(T=b.find(v=>v.id===f))!=null?T:b[0])!=null?x:null,c=e.filter(v=>!v.success).length;function y(v){d(g=>({...g,methods:g.methods.includes(v)?g.methods.filter(q=>q!==v):[...g.methods,v]}))}return(0,u.jsx)("div",{className:"apd-overlay",onClick:t,children:(0,u.jsxs)("div",{className:`apd-modal${p?" apd-minimized":""}`,onClick:v=>v.stopPropagation(),children:[(0,u.jsxs)("div",{className:"apd-header",children:[(0,u.jsxs)("div",{className:"apd-header-title",children:[(0,u.jsx)("span",{className:"apd-live-dot"}),"API Debugger"]}),(0,u.jsxs)("span",{className:"apd-header-count",children:[e.length," requests",c>0?` \xB7 ${c} failed`:""]}),(0,u.jsx)("div",{className:"apd-spacer"}),(0,u.jsx)("button",{className:"apd-icon-btn",onClick:i,title:"Toggle theme",type:"button",children:a==="light"?"\u2600":"\u263E"}),(0,u.jsx)("button",{className:"apd-icon-btn",title:"Export JSON",type:"button",onClick:()=>fe(`api-logs-${Date.now()}.json`,e),children:"\u2B73"}),(0,u.jsx)("button",{className:"apd-icon-btn",title:"Export HAR",type:"button",onClick:()=>fe(`api-logs-${Date.now()}.har`,ie(e)),children:"HAR"}),(0,u.jsx)("button",{className:"apd-icon-btn",title:"Clear logs",type:"button",onClick:o,children:"\u{1F5D1}"}),(0,u.jsx)("button",{className:"apd-icon-btn",title:p?"Restore":"Minimize",type:"button",onClick:()=>m(v=>!v),children:p?"\u25A2":"\u2014"}),(0,u.jsx)("button",{className:"apd-icon-btn",title:"Close",type:"button",onClick:t,children:"\u2715"})]}),!p&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)("div",{className:"apd-toolbar",children:[(0,u.jsx)(Le,{value:n.search,onChange:v=>d(g=>({...g,search:v}))}),(0,u.jsx)(qe,{status:n.status,onStatusChange:v=>d(g=>({...g,status:v})),methods:ot,activeMethods:n.methods,onToggleMethod:y})]}),(0,u.jsxs)("div",{className:"apd-body",children:[(0,u.jsx)(He,{logs:b,selectedId:(w=h==null?void 0:h.id)!=null?w:null,onSelect:l,onTogglePin:r}),(0,u.jsx)(ze,{log:h,onTogglePin:r})]}),(0,u.jsxs)("div",{className:"apd-footer",children:[(0,u.jsxs)("span",{children:[(0,u.jsx)("span",{className:"apd-kbd",children:"Ctrl"}),"+",(0,u.jsx)("span",{className:"apd-kbd",children:"Shift"}),"+",(0,u.jsx)("span",{className:"apd-kbd",children:"D"})," to toggle"]}),(0,u.jsx)("span",{style:{marginLeft:"auto"},children:"next-api-debugger \xB7 dev only"})]})]})]})})}var O=require("react/jsx-runtime");function rt(e){return typeof e=="boolean"?e:process.env.NODE_ENV!=="production"}function Ie(e){let{enabled:t,maxLogs:o=200,initialPosition:r,axiosInstance:a,theme:i="dark",keyboardShortcut:n=!0,ignoreUrls:d}=e,f=rt(t),[l,p]=(0,J.useState)(!1),[m,b]=(0,J.useState)(i),{logs:h,clear:c,togglePin:y}=ve();if((0,J.useEffect)(()=>{if(!f||typeof window=="undefined")return;k.setMaxLogs(o),G({ignoreUrls:d});let w=a?Z(a,{ignoreUrls:d}):()=>{};return()=>{Q(),w()}},[f]),we({ctrl:!0,shift:!0,key:"d"},()=>p(w=>!w),f&&n),!f)return null;let T=h.filter(w=>!w.success).length,x=m==="system"?"dark":m;return(0,O.jsxs)("div",{className:`apd-root${x==="light"?" apd-light":""}`,children:[(0,O.jsx)(Pe,{}),!l&&(0,O.jsx)(Ce,{count:h.length,hasErrors:T>0,onOpen:()=>p(!0),initialPosition:r}),l&&(0,O.jsx)(Oe,{logs:h,onClose:()=>p(!1),onClear:c,onTogglePin:y,theme:x,onToggleTheme:()=>b(x==="light"?"dark":"light")})]})}0&&(module.exports={ApiDebugger,exportAsHar,generateCurl,installAxiosInterceptor,installFetchInterceptor,logStore,uninstallFetchInterceptor});
//# sourceMappingURL=index.js.map