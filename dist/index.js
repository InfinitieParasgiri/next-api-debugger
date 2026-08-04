'use client';
"use strict";var ne=Object.defineProperty;var De=Object.getOwnPropertyDescriptor;var Oe=Object.getOwnPropertyNames;var Ie=Object.prototype.hasOwnProperty;var je=(e,t)=>{for(var o in t)ne(e,o,{get:t[o],enumerable:!0})},Fe=(e,t,o,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of Oe(t))!Ie.call(e,a)&&a!==o&&ne(e,a,{get:()=>t[a],enumerable:!(r=De(t,a))||r.enumerable});return e};var $e=e=>Fe(ne({},"__esModule",{value:!0}),e);var Qe={};je(Qe,{ApiDebugger:()=>ze,exportAsHar:()=>re,generateCurl:()=>te,installAxiosInterceptor:()=>V,installFetchInterceptor:()=>X,logStore:()=>h,uninstallFetchInterceptor:()=>G});module.exports=$e(Qe);var F=require("react");var se=class{constructor(){this.logs=[];this.listeners=new Set;this.maxLogs=200;this.snapshot=[];this.getLogs=()=>(this.snapshot=this.logs,this.snapshot);this.subscribe=t=>(this.listeners.add(t),()=>this.listeners.delete(t))}setMaxLogs(t){this.maxLogs=Math.max(1,t),this.trim()}addLog(t){this.logs=[t,...this.logs],this.trim(),this.emit()}togglePin(t){this.logs=this.logs.map(o=>o.id===t?{...o,pinned:!o.pinned}:o),this.emit()}clear(){this.logs=[],this.emit()}trim(){if(this.logs.length<=this.maxLogs)return;let t=this.logs.filter(i=>i.pinned),r=this.logs.filter(i=>!i.pinned).slice(0,Math.max(0,this.maxLogs-t.length)),a=[...t,...r];a.sort((i,s)=>s.timestamp-i.timestamp),this.logs=a}emit(){this.listeners.forEach(t=>t())}},h=new se;function O(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,9)}`}function I(e){if(!e)return null;try{return JSON.parse(e)}catch{return e}}function M(e){if(e==null)return null;if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return String(e)}}function A(e){if(!e)return 0;try{return new Blob([e]).size}catch{return e.length}}function ie(e){if(!e)return"0 B";let t=["B","KB","MB","GB"],o=Math.min(t.length-1,Math.floor(Math.log(e)/Math.log(1024))),r=e/Math.pow(1024,o);return`${o===0?r:r.toFixed(1)} ${t[o]}`}function $(e){return e<1e3?`${e} ms`:`${(e/1e3).toFixed(2)} s`}function U(e){let t=new Date(e);return t.toLocaleTimeString(void 0,{hour12:!1})+`.${String(t.getMilliseconds()).padStart(3,"0")}`}function J(e){try{let t=typeof window!="undefined"?window.location.origin:"http://localhost",o=new URL(e,t),r={};return o.searchParams.forEach((a,i)=>{r[i]=a}),{endpoint:o.pathname,queryParams:r}}catch{return{endpoint:e,queryParams:{}}}}function _(e){let t={};return e&&e.forEach((o,r)=>{t[r]=o}),t}function de(e){let t={};if(!e)return t;if(typeof e.toJSON=="function")return{...e.toJSON()};if(e instanceof Headers)return _(e);if(typeof e=="object")for(let[o,r]of Object.entries(e))r!=null&&(t[o]=String(r));return t}function K(e,t){return!t||t.length===0?!1:t.some(o=>o instanceof RegExp?o.test(e):e.includes(o))}function S(...e){return e.filter(Boolean).join(" ")}async function me(e){try{if(navigator.clipboard&&window.isSecureContext)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select();let o=document.execCommand("copy");return document.body.removeChild(t),o}catch{return!1}}var H=null,Y=!1;function Ue(e){if(e==null)return null;if(typeof e=="string")return e;if(e instanceof URLSearchParams)return e.toString();if(e instanceof FormData){let t=[];return e.forEach((o,r)=>{t.push(`${r}=${o instanceof File?`[File: ${o.name}]`:o}`)}),t.join("&")}return"[binary data]"}function X(e={}){Y||typeof window=="undefined"||typeof window.fetch!="function"||(H=window.fetch.bind(window),Y=!0,window.fetch=async function(o,r){var P,R,N;let a=o instanceof Request?o:null,i=a?a.url:String(o);if(K(i,e.ignoreUrls))return H(o,r);let s=Date.now(),d=performance.now(),u=((r==null?void 0:r.method)||(a==null?void 0:a.method)||"GET").toUpperCase(),g=_(new Headers((R=(P=r==null?void 0:r.headers)!=null?P:a==null?void 0:a.headers)!=null?R:void 0)),{endpoint:l,queryParams:y}=J(i),x=Ue((N=r==null?void 0:r.body)!=null?N:null),w={id:O(),url:i,endpoint:l,method:u,requestHeaders:g,requestBody:I(x),requestBodyRaw:x,queryParams:y,timestamp:s,source:"fetch",requestSize:A(x),pinned:!1};try{let m=await H(o,r),b=Math.round(performance.now()-d),f=m.clone(),c=null;try{c=await f.text()}catch{c=null}return h.addLog({...w,duration:b,responseStatus:m.status,responseStatusText:m.statusText,responseHeaders:_(m.headers),responseBody:I(c),responseBodyRaw:c,responseSize:A(c),success:m.ok,error:m.ok?null:`HTTP ${m.status} ${m.statusText}`}),m}catch(m){let b=Math.round(performance.now()-d);throw h.addLog({...w,duration:b,responseStatus:null,responseStatusText:"",responseHeaders:{},responseBody:null,responseBodyRaw:null,responseSize:0,success:!1,error:(m==null?void 0:m.message)||"Network error"}),m}})}function G(){Y&&H&&typeof window!="undefined"&&(window.fetch=H),Y=!1,H=null}function Je(e){let t=(e==null?void 0:e.baseURL)||"",o=(e==null?void 0:e.url)||"";return/^https?:\/\//i.test(o)?o:`${t}${t&&!t.endsWith("/")&&!o.startsWith("/")?"/":""}${o}`}function V(e,t={}){var i;if(!e||!e.interceptors||typeof((i=e.interceptors.request)==null?void 0:i.use)!="function")return()=>{};if(e.__apiDebuggerInstalled)return()=>{};e.__apiDebuggerInstalled=!0;let o=e.interceptors.request.use(s=>{let d={id:O(),startTime:Date.now(),startPerf:performance.now()};return s.__apdMeta=d,s});function r(s,d,u){var b,f,c,L,ae,ue;if(!s)return;let g=Je(s);if(K(g,t.ignoreUrls))return;let l=s.__apdMeta||{id:O(),startTime:Date.now(),startPerf:performance.now()},y=Math.round(performance.now()-l.startPerf),{endpoint:x,queryParams:w}=J(g),P=M(s.data),R=(d==null?void 0:d.data)!==void 0?M(d.data):null,N=(c=(f=d==null?void 0:d.status)!=null?f:(b=u==null?void 0:u.response)==null?void 0:b.status)!=null?c:null,m={id:l.id,url:g,endpoint:x,method:(s.method||"get").toUpperCase(),requestHeaders:de(s.headers),requestBody:(L=s.data)!=null?L:I(P),requestBodyRaw:P,queryParams:{...w,...s.params||{}},responseStatus:N,responseStatusText:(ae=d==null?void 0:d.statusText)!=null?ae:"",responseHeaders:de(d==null?void 0:d.headers),responseBody:(ue=d==null?void 0:d.data)!=null?ue:null,responseBodyRaw:R,duration:y,timestamp:l.startTime,success:!u&&!!N&&N<400,error:u?u.message||"Request failed":null,source:"axios",requestSize:A(P),responseSize:A(R),pinned:!1};h.addLog(m)}let a=e.interceptors.response.use(s=>(r(s.config,s),s),s=>(r(s==null?void 0:s.config,s==null?void 0:s.response,s),Promise.reject(s)));return()=>{e.interceptors.request.eject(o),e.interceptors.response.eject(a),e.__apiDebuggerInstalled=!1}}var j=require("react");function fe(){let e=(0,j.useSyncExternalStore)(h.subscribe,h.getLogs,h.getLogs),t=(0,j.useCallback)(()=>h.clear(),[]),o=(0,j.useCallback)(r=>h.togglePin(r),[]);return{logs:e,clear:t,togglePin:o}}var ge=require("react");function be(e,t,o=!0){(0,ge.useEffect)(()=>{if(!o||typeof window=="undefined")return;function r(a){let i=!e.ctrl||a.ctrlKey||a.metaKey,s=!e.shift||a.shiftKey;i&&s&&a.key.toLowerCase()===e.key.toLowerCase()&&(a.preventDefault(),t())}return window.addEventListener("keydown",r),()=>window.removeEventListener("keydown",r)},[e.ctrl,e.shift,e.key,t,o])}var ve=require("react");var he=`
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
}
.apd-json .apd-json-key { color: #67e8f9; }
.apd-json .apd-json-str { color: #86efac; }
.apd-json .apd-json-num { color: #fcd34d; }
.apd-json .apd-json-bool { color: #f0abfc; }
.apd-json .apd-json-null { color: var(--apd-text-faint); }

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
`;var xe="next-api-debugger-styles";function ye(){return(0,ve.useEffect)(()=>{if(typeof document=="undefined"||document.getElementById(xe))return;let e=document.createElement("style");e.id=xe,e.textContent=he,document.head.appendChild(e)},[]),null}var v=require("react"),we="apd-button-position",Q=56,ke=5;function W(e){return typeof window=="undefined"?e:{x:Math.min(Math.max(8,e.x),window.innerWidth-Q-8),y:Math.min(Math.max(8,e.y),window.innerHeight-Q-8)}}function _e(){return typeof window=="undefined"?{x:24,y:24}:{x:window.innerWidth-Q-24,y:window.innerHeight-Q-24}}function Se(e){let[t,o]=(0,v.useState)(()=>{if(typeof window=="undefined")return e!=null?e:{x:24,y:24};try{let l=sessionStorage.getItem(we);if(l)return W(JSON.parse(l))}catch{}return W(e!=null?e:_e())}),r=(0,v.useRef)(!1),a=(0,v.useRef)(!1),i=(0,v.useRef)({pointerX:0,pointerY:0,posX:0,posY:0}),s=(0,v.useCallback)(l=>{r.current=!0,a.current=!1,i.current={pointerX:l.clientX,pointerY:l.clientY,posX:t.x,posY:t.y},l.currentTarget.setPointerCapture(l.pointerId)},[t.x,t.y]),d=(0,v.useCallback)(l=>{if(!r.current)return;let y=l.clientX-i.current.pointerX,x=l.clientY-i.current.pointerY;(Math.abs(y)>ke||Math.abs(x)>ke)&&(a.current=!0),o(W({x:i.current.posX+y,y:i.current.posY+x}))},[]),u=(0,v.useCallback)(()=>{r.current=!1},[]);(0,v.useEffect)(()=>{try{sessionStorage.setItem(we,JSON.stringify(t))}catch{}},[t]),(0,v.useEffect)(()=>{function l(){o(y=>W(y))}return window.addEventListener("resize",l),()=>window.removeEventListener("resize",l)},[]);let g=(0,v.useCallback)(()=>a.current,[]);return{position:t,onPointerDown:s,onPointerMove:d,onPointerUp:u,wasDragged:g}}var C=require("react/jsx-runtime");function Pe({count:e,hasErrors:t,onOpen:o,initialPosition:r}){let{position:a,onPointerDown:i,onPointerMove:s,onPointerUp:d,wasDragged:u}=Se(r);return(0,C.jsxs)("button",{type:"button",className:"apd-btn",style:{left:a.x,top:a.y},onPointerDown:i,onPointerMove:s,onPointerUp:d,onClick:()=>{u()||o()},"aria-label":"Open API debugger",title:"API Debugger (drag to move)",children:[(0,C.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,C.jsx)("polyline",{points:"16 18 22 12 16 6"}),(0,C.jsx)("polyline",{points:"8 6 2 12 8 18"})]}),e>0&&(0,C.jsx)("span",{className:S("apd-btn-dot",t&&"apd-has-errors"),children:e>99?"99+":e})]})}var E=require("react");var q=require("react/jsx-runtime");function Ne({value:e,onChange:t}){return(0,q.jsxs)("div",{className:"apd-search",children:[(0,q.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,q.jsx)("circle",{cx:"11",cy:"11",r:"7"}),(0,q.jsx)("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]}),(0,q.jsx)("input",{type:"text",placeholder:"Filter by URL, endpoint, method or status code...",value:e,onChange:o=>t(o.target.value),spellCheck:!1})]})}var T=require("react/jsx-runtime");function Re({status:e,onStatusChange:t,methods:o,activeMethods:r,onToggleMethod:a}){return(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)("button",{type:"button",className:S("apd-chip apd-chip-success",e==="success"&&"apd-active"),onClick:()=>t(e==="success"?"all":"success"),children:"Success"}),(0,T.jsx)("button",{type:"button",className:S("apd-chip apd-chip-failed",e==="failed"&&"apd-active"),onClick:()=>t(e==="failed"?"all":"failed"),children:"Failed"}),o.map(i=>(0,T.jsx)("button",{type:"button",className:S("apd-chip",r.includes(i)&&"apd-active"),onClick:()=>a(i),children:i},i))]})}var k=require("react/jsx-runtime");function Ke(e){return["GET","POST","PUT","PATCH","DELETE"].includes(e.toUpperCase())?`apd-method-${e.toUpperCase()}`:"apd-method-OTHER"}function Te({log:e,selected:t,onSelect:o,onTogglePin:r}){var a;return(0,k.jsxs)("div",{className:S("apd-item",t&&"apd-selected"),onClick:o,role:"button",tabIndex:0,onKeyDown:i=>i.key==="Enter"&&o(),children:[(0,k.jsxs)("div",{className:"apd-item-row1",children:[(0,k.jsx)("span",{className:S("apd-method",Ke(e.method)),children:e.method}),(0,k.jsx)("span",{className:"apd-item-url",title:e.url,children:e.endpoint}),(0,k.jsx)("span",{className:S("apd-status-dot",e.success?"apd-ok":"apd-fail")}),e.pinned&&(0,k.jsx)("button",{type:"button",className:"apd-pin-star",onClick:i=>{i.stopPropagation(),r()},title:"Unpin","aria-label":"Unpin request",style:{background:"none",border:"none",cursor:"pointer",padding:0},children:"\u2605"})]}),(0,k.jsxs)("div",{className:"apd-item-row2",children:[(0,k.jsx)("span",{children:(a=e.responseStatus)!=null?a:e.error?"ERR":"\u2014"}),(0,k.jsx)("span",{children:$(e.duration)}),(0,k.jsx)("span",{children:U(e.timestamp)}),(0,k.jsx)("span",{style:{marginLeft:"auto",textTransform:"uppercase"},children:e.source})]})]})}var B=require("react/jsx-runtime");function Ee({logs:e,selectedId:t,onSelect:o,onTogglePin:r}){return e.length===0?(0,B.jsx)("div",{className:"apd-list",children:(0,B.jsxs)("div",{className:"apd-empty",children:["No requests captured yet.",(0,B.jsx)("br",{}),"Make an API call and it'll show up here."]})}):(0,B.jsx)("div",{className:"apd-list",children:e.map(a=>(0,B.jsx)(Te,{log:a,selected:a.id===t,onSelect:()=>o(a.id),onTogglePin:()=>r(a.id)},a.id))})}var oe=require("react");var Le=require("react");var Ce=require("react/jsx-runtime");function Z({getText:e,label:t,icon:o}){let[r,a]=(0,Le.useState)(!1);async function i(){await me(e())&&(a(!0),setTimeout(()=>a(!1),1200))}return(0,Ce.jsxs)("button",{type:"button",className:S("apd-action-btn",r&&"apd-copied"),onClick:i,children:[o,r?"Copied":t]})}var Be=require("react/jsx-runtime"),Ye=/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(\.\d+)?([eE][+-]?\d+)?)/g;function Xe(e){return e.replace(Ye,t=>{let o="apd-json-num";return/^"/.test(t)?o=/:$/.test(t)?"apd-json-key":"apd-json-str":/true|false/.test(t)?o="apd-json-bool":/null/.test(t)&&(o="apd-json-null"),`<span class="${o}">${t}</span>`})}function qe(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function ee({value:e,raw:t}){let o,r=!0;if(e!=null&&typeof e=="object")o=JSON.stringify(e,null,2);else if(typeof e=="string")try{o=JSON.stringify(JSON.parse(e),null,2)}catch{o=t!=null?t:e,r=!1}else o=t!=null?t:String(e!=null?e:""),r=!1;let a=r?Xe(qe(o)):qe(o);return(0,Be.jsx)("pre",{className:"apd-json",dangerouslySetInnerHTML:{__html:a}})}function pe(e){return`'${e.replace(/'/g,"'\\''")}'`}function te(e){let t=[`curl -X ${e.method} ${pe(e.url)}`];for(let[o,r]of Object.entries(e.requestHeaders))/^(host|content-length|connection)$/i.test(o)||t.push(`  -H ${pe(`${o}: ${r}`)}`);return e.requestBodyRaw&&t.push(`  --data-raw ${pe(e.requestBodyRaw)}`),t.join(` \\
`)}var n=require("react/jsx-runtime");function z({title:e,count:t,defaultOpen:o=!0,children:r}){let[a,i]=(0,oe.useState)(o);return(0,n.jsxs)("div",{className:"apd-section",children:[(0,n.jsxs)("div",{className:"apd-section-header",onClick:()=>i(s=>!s),children:[(0,n.jsxs)("span",{children:[e,typeof t=="number"?` (${t})`:""]}),(0,n.jsx)("span",{children:a?"\u2212":"+"})]}),a&&(0,n.jsx)("div",{className:"apd-section-body",children:r})]})}function le({data:e}){let t=Object.entries(e);return t.length===0?(0,n.jsx)("div",{className:"apd-section-body apd-empty-body",children:"None"}):(0,n.jsx)("div",{className:"apd-kv",children:t.map(([o,r])=>(0,n.jsxs)(oe.Fragment,{children:[(0,n.jsx)("div",{className:"apd-kv-key",children:o}),(0,n.jsx)("div",{className:"apd-kv-val",children:r})]},o))})}function Me({log:e,onTogglePin:t}){var i,s,d,u,g;if(!e)return(0,n.jsx)("div",{className:"apd-detail",children:(0,n.jsx)("div",{className:"apd-detail-empty",children:"Select a request to see full details"})});let o=te(e),r=(s=(i=M(e.requestBody))!=null?i:e.requestBodyRaw)!=null?s:"",a=(u=(d=M(e.responseBody))!=null?d:e.responseBodyRaw)!=null?u:"";return(0,n.jsxs)("div",{className:"apd-detail",children:[(0,n.jsxs)("div",{className:"apd-detail-header",children:[(0,n.jsxs)("div",{className:"apd-detail-url",children:[(0,n.jsx)("strong",{children:e.method})," ",e.url]}),(0,n.jsx)("button",{type:"button",className:"apd-action-btn",onClick:()=>t(e.id),title:e.pinned?"Unpin":"Pin this request",children:e.pinned?"\u2605 Pinned":"\u2606 Pin"})]}),(0,n.jsxs)("div",{className:"apd-meta-grid",children:[(0,n.jsxs)("div",{children:[(0,n.jsx)("div",{className:"apd-meta-label",children:"Status"}),(0,n.jsxs)("div",{className:"apd-meta-value",style:{color:e.success?"var(--apd-success)":"var(--apd-error)"},children:[(g=e.responseStatus)!=null?g:"Failed"," ",e.responseStatusText]})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("div",{className:"apd-meta-label",children:"Duration"}),(0,n.jsx)("div",{className:"apd-meta-value",children:$(e.duration)})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("div",{className:"apd-meta-label",children:"Time"}),(0,n.jsx)("div",{className:"apd-meta-value",children:U(e.timestamp)})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("div",{className:"apd-meta-label",children:"Source"}),(0,n.jsx)("div",{className:"apd-meta-value",children:e.source})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("div",{className:"apd-meta-label",children:"Req. size"}),(0,n.jsx)("div",{className:"apd-meta-value",children:ie(e.requestSize)})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("div",{className:"apd-meta-label",children:"Res. size"}),(0,n.jsx)("div",{className:"apd-meta-value",children:ie(e.responseSize)})]})]}),e.error&&(0,n.jsxs)("div",{className:"apd-section",style:{borderColor:"var(--apd-error)"},children:[(0,n.jsx)("div",{className:"apd-section-header",style:{color:"var(--apd-error)"},children:"Error"}),(0,n.jsx)("div",{className:"apd-section-body",children:e.error})]}),(0,n.jsxs)("div",{className:"apd-actions",children:[(0,n.jsx)(Z,{label:"Copy cURL",getText:()=>o}),(0,n.jsx)(Z,{label:"Copy Request",getText:()=>r}),(0,n.jsx)(Z,{label:"Copy Response",getText:()=>a})]}),(0,n.jsx)(z,{title:"cURL",children:(0,n.jsx)(ee,{value:o})}),(0,n.jsx)(z,{title:"Query Params",count:Object.keys(e.queryParams).length,defaultOpen:!1,children:(0,n.jsx)(le,{data:e.queryParams})}),(0,n.jsx)(z,{title:"Request Headers",count:Object.keys(e.requestHeaders).length,defaultOpen:!1,children:(0,n.jsx)(le,{data:e.requestHeaders})}),(0,n.jsx)(z,{title:"Request Body",children:e.requestBodyRaw?(0,n.jsx)(ee,{value:e.requestBody,raw:e.requestBodyRaw}):(0,n.jsx)("div",{className:"apd-empty-body",children:"No body"})}),(0,n.jsx)(z,{title:"Response Headers",count:Object.keys(e.responseHeaders).length,defaultOpen:!1,children:(0,n.jsx)(le,{data:e.responseHeaders})}),(0,n.jsx)(z,{title:"Response Body",children:e.responseBodyRaw?(0,n.jsx)(ee,{value:e.responseBody,raw:e.responseBodyRaw}):(0,n.jsx)("div",{className:"apd-empty-body",children:"No body"})})]})}function Ae(e){return Object.entries(e).map(([t,o])=>({name:t,value:o}))}function Ge(e){return Object.entries(e).map(([t,o])=>({name:t,value:o}))}function re(e){return{log:{version:"1.2",creator:{name:"next-api-debugger",version:"0.1.0"},entries:e.map(t=>{var o,r;return{startedDateTime:new Date(t.timestamp).toISOString(),time:t.duration,request:{method:t.method,url:t.url,httpVersion:"HTTP/1.1",headers:Ae(t.requestHeaders),queryString:Ge(t.queryParams),cookies:[],headersSize:-1,bodySize:t.requestSize,postData:t.requestBodyRaw?{mimeType:t.requestHeaders["content-type"]||"application/json",text:t.requestBodyRaw}:void 0},response:{status:(o=t.responseStatus)!=null?o:0,statusText:t.responseStatusText,httpVersion:"HTTP/1.1",headers:Ae(t.responseHeaders),cookies:[],content:{size:t.responseSize,mimeType:t.responseHeaders["content-type"]||"application/json",text:(r=t.responseBodyRaw)!=null?r:""},redirectURL:"",headersSize:-1,bodySize:t.responseSize},cache:{},timings:{send:0,wait:t.duration,receive:0}}})}}}function ce(e,t){let o=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),r=URL.createObjectURL(o),a=document.createElement("a");a.href=r,a.download=e,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(r)}var p=require("react/jsx-runtime"),Ve=["GET","POST","PUT","PATCH","DELETE"];function He({logs:e,onClose:t,onClear:o,onTogglePin:r,theme:a,onToggleTheme:i}){var N,m,b;let[s,d]=(0,E.useState)({search:"",status:"all",methods:[]}),[u,g]=(0,E.useState)(null),[l,y]=(0,E.useState)(!1);(0,E.useEffect)(()=>{!u&&e.length>0&&g(e[0].id)},[e,u]);let x=(0,E.useMemo)(()=>{let f=s.search.trim().toLowerCase();return e.filter(c=>{var L;return!(s.status==="success"&&!c.success||s.status==="failed"&&c.success||s.methods.length>0&&!s.methods.includes(c.method)||f&&!`${c.url} ${c.endpoint} ${c.method} ${(L=c.responseStatus)!=null?L:""}`.toLowerCase().includes(f))})},[e,s]),w=(m=(N=x.find(f=>f.id===u))!=null?N:x[0])!=null?m:null,P=e.filter(f=>!f.success).length;function R(f){d(c=>({...c,methods:c.methods.includes(f)?c.methods.filter(L=>L!==f):[...c.methods,f]}))}return(0,p.jsx)("div",{className:"apd-overlay",onClick:t,children:(0,p.jsxs)("div",{className:`apd-modal${l?" apd-minimized":""}`,onClick:f=>f.stopPropagation(),children:[(0,p.jsxs)("div",{className:"apd-header",children:[(0,p.jsxs)("div",{className:"apd-header-title",children:[(0,p.jsx)("span",{className:"apd-live-dot"}),"API Debugger"]}),(0,p.jsxs)("span",{className:"apd-header-count",children:[e.length," requests",P>0?` \xB7 ${P} failed`:""]}),(0,p.jsx)("div",{className:"apd-spacer"}),(0,p.jsx)("button",{className:"apd-icon-btn",onClick:i,title:"Toggle theme",type:"button",children:a==="light"?"\u2600":"\u263E"}),(0,p.jsx)("button",{className:"apd-icon-btn",title:"Export JSON",type:"button",onClick:()=>ce(`api-logs-${Date.now()}.json`,e),children:"\u2B73"}),(0,p.jsx)("button",{className:"apd-icon-btn",title:"Export HAR",type:"button",onClick:()=>ce(`api-logs-${Date.now()}.har`,re(e)),children:"HAR"}),(0,p.jsx)("button",{className:"apd-icon-btn",title:"Clear logs",type:"button",onClick:o,children:"\u{1F5D1}"}),(0,p.jsx)("button",{className:"apd-icon-btn",title:l?"Restore":"Minimize",type:"button",onClick:()=>y(f=>!f),children:l?"\u25A2":"\u2014"}),(0,p.jsx)("button",{className:"apd-icon-btn",title:"Close",type:"button",onClick:t,children:"\u2715"})]}),!l&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)("div",{className:"apd-toolbar",children:[(0,p.jsx)(Ne,{value:s.search,onChange:f=>d(c=>({...c,search:f}))}),(0,p.jsx)(Re,{status:s.status,onStatusChange:f=>d(c=>({...c,status:f})),methods:Ve,activeMethods:s.methods,onToggleMethod:R})]}),(0,p.jsxs)("div",{className:"apd-body",children:[(0,p.jsx)(Ee,{logs:x,selectedId:(b=w==null?void 0:w.id)!=null?b:null,onSelect:g,onTogglePin:r}),(0,p.jsx)(Me,{log:w,onTogglePin:r})]}),(0,p.jsxs)("div",{className:"apd-footer",children:[(0,p.jsxs)("span",{children:[(0,p.jsx)("span",{className:"apd-kbd",children:"Ctrl"}),"+",(0,p.jsx)("span",{className:"apd-kbd",children:"Shift"}),"+",(0,p.jsx)("span",{className:"apd-kbd",children:"D"})," to toggle"]}),(0,p.jsx)("span",{style:{marginLeft:"auto"},children:"next-api-debugger \xB7 dev only"})]})]})]})})}var D=require("react/jsx-runtime");function We(e){return typeof e=="boolean"?e:process.env.NODE_ENV!=="production"}function ze(e){let{enabled:t,maxLogs:o=200,initialPosition:r,axiosInstance:a,theme:i="dark",keyboardShortcut:s=!0,ignoreUrls:d}=e,u=We(t),[g,l]=(0,F.useState)(!1),[y,x]=(0,F.useState)(i),{logs:w,clear:P,togglePin:R}=fe();if((0,F.useEffect)(()=>{if(!u||typeof window=="undefined")return;h.setMaxLogs(o),X({ignoreUrls:d});let b=a?V(a,{ignoreUrls:d}):()=>{};return()=>{G(),b()}},[u]),be({ctrl:!0,shift:!0,key:"d"},()=>l(b=>!b),u&&s),!u)return null;let N=w.filter(b=>!b.success).length,m=y==="system"?"dark":y;return(0,D.jsxs)("div",{className:`apd-root${m==="light"?" apd-light":""}`,children:[(0,D.jsx)(ye,{}),!g&&(0,D.jsx)(Pe,{count:w.length,hasErrors:N>0,onOpen:()=>l(!0),initialPosition:r}),g&&(0,D.jsx)(He,{logs:w,onClose:()=>l(!1),onClear:P,onTogglePin:R,theme:m,onToggleTheme:()=>x(m==="light"?"dark":"light")})]})}0&&(module.exports={ApiDebugger,exportAsHar,generateCurl,installAxiosInterceptor,installFetchInterceptor,logStore,uninstallFetchInterceptor});
//# sourceMappingURL=index.js.map