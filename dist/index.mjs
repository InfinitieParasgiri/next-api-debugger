'use client';
import{useEffect as nt,useState as He}from"react";var X=class{constructor(){this.logs=[];this.listeners=new Set;this.maxLogs=200;this.snapshot=[];this.getLogs=()=>(this.snapshot=this.logs,this.snapshot);this.subscribe=t=>(this.listeners.add(t),()=>this.listeners.delete(t))}setMaxLogs(t){this.maxLogs=Math.max(1,t),this.trim()}addLog(t){this.logs=[t,...this.logs],this.trim(),this.emit()}togglePin(t){this.logs=this.logs.map(o=>o.id===t?{...o,pinned:!o.pinned}:o),this.emit()}clear(){this.logs=[],this.emit()}trim(){if(this.logs.length<=this.maxLogs)return;let t=this.logs.filter(s=>s.pinned),r=this.logs.filter(s=>!s.pinned).slice(0,Math.max(0,this.maxLogs-t.length)),a=[...t,...r];a.sort((s,n)=>n.timestamp-s.timestamp),this.logs=a}emit(){this.listeners.forEach(t=>t())}},v=new X;function M(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,9)}`}function A(e){if(!e)return null;try{return JSON.parse(e)}catch{return e}}function L(e){if(e==null)return null;if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return String(e)}}function C(e){if(!e)return 0;try{return new Blob([e]).size}catch{return e.length}}function G(e){if(!e)return"0 B";let t=["B","KB","MB","GB"],o=Math.min(t.length-1,Math.floor(Math.log(e)/Math.log(1024))),r=e/Math.pow(1024,o);return`${o===0?r:r.toFixed(1)} ${t[o]}`}function H(e){return e<1e3?`${e} ms`:`${(e/1e3).toFixed(2)} s`}function z(e){let t=new Date(e);return t.toLocaleTimeString(void 0,{hour12:!1})+`.${String(t.getMilliseconds()).padStart(3,"0")}`}function D(e){try{let t=typeof window!="undefined"?window.location.origin:"http://localhost",o=new URL(e,t),r={};return o.searchParams.forEach((a,s)=>{r[s]=a}),{endpoint:o.pathname,queryParams:r}}catch{return{endpoint:e,queryParams:{}}}}function O(e){let t={};return e&&e.forEach((o,r)=>{t[r]=o}),t}function V(e){let t={};if(!e)return t;if(typeof e.toJSON=="function")return{...e.toJSON()};if(e instanceof Headers)return O(e);if(typeof e=="object")for(let[o,r]of Object.entries(e))r!=null&&(t[o]=String(r));return t}function I(e,t){return!t||t.length===0?!1:t.some(o=>o instanceof RegExp?o.test(e):e.includes(o))}function k(...e){return e.filter(Boolean).join(" ")}async function me(e){try{if(navigator.clipboard&&window.isSecureContext)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select();let o=document.execCommand("copy");return document.body.removeChild(t),o}catch{return!1}}var q=null,j=!1;function ze(e){if(e==null)return null;if(typeof e=="string")return e;if(e instanceof URLSearchParams)return e.toString();if(e instanceof FormData){let t=[];return e.forEach((o,r)=>{t.push(`${r}=${o instanceof File?`[File: ${o.name}]`:o}`)}),t.join("&")}return"[binary data]"}function W(e={}){j||typeof window=="undefined"||typeof window.fetch!="function"||(q=window.fetch.bind(window),j=!0,window.fetch=async function(o,r){var S,N,P;let a=o instanceof Request?o:null,s=a?a.url:String(o);if(I(s,e.ignoreUrls))return q(o,r);let n=Date.now(),d=performance.now(),c=((r==null?void 0:r.method)||(a==null?void 0:a.method)||"GET").toUpperCase(),b=O(new Headers((N=(S=r==null?void 0:r.headers)!=null?S:a==null?void 0:a.headers)!=null?N:void 0)),{endpoint:p,queryParams:y}=D(s),x=ze((P=r==null?void 0:r.body)!=null?P:null),w={id:M(),url:s,endpoint:p,method:c,requestHeaders:b,requestBody:A(x),requestBodyRaw:x,queryParams:y,timestamp:n,source:"fetch",requestSize:C(x),pinned:!1};try{let u=await q(o,r),h=Math.round(performance.now()-d),m=u.clone(),l=null;try{l=await m.text()}catch{l=null}return v.addLog({...w,duration:h,responseStatus:u.status,responseStatusText:u.statusText,responseHeaders:O(u.headers),responseBody:A(l),responseBodyRaw:l,responseSize:C(l),success:u.ok,error:u.ok?null:`HTTP ${u.status} ${u.statusText}`}),u}catch(u){let h=Math.round(performance.now()-d);throw v.addLog({...w,duration:h,responseStatus:null,responseStatusText:"",responseHeaders:{},responseBody:null,responseBodyRaw:null,responseSize:0,success:!1,error:(u==null?void 0:u.message)||"Network error"}),u}})}function Q(){j&&q&&typeof window!="undefined"&&(window.fetch=q),j=!1,q=null}function De(e){let t=(e==null?void 0:e.baseURL)||"",o=(e==null?void 0:e.url)||"";return/^https?:\/\//i.test(o)?o:`${t}${t&&!t.endsWith("/")&&!o.startsWith("/")?"/":""}${o}`}function Z(e,t={}){var s;if(!e||!e.interceptors||typeof((s=e.interceptors.request)==null?void 0:s.use)!="function")return()=>{};if(e.__apiDebuggerInstalled)return()=>{};e.__apiDebuggerInstalled=!0;let o=e.interceptors.request.use(n=>{let d={id:M(),startTime:Date.now(),startPerf:performance.now()};return n.__apdMeta=d,n});function r(n,d,c){var h,m,l,E,Y,ue;if(!n)return;let b=De(n);if(I(b,t.ignoreUrls))return;let p=n.__apdMeta||{id:M(),startTime:Date.now(),startPerf:performance.now()},y=Math.round(performance.now()-p.startPerf),{endpoint:x,queryParams:w}=D(b),S=L(n.data),N=(d==null?void 0:d.data)!==void 0?L(d.data):null,P=(l=(m=d==null?void 0:d.status)!=null?m:(h=c==null?void 0:c.response)==null?void 0:h.status)!=null?l:null,u={id:p.id,url:b,endpoint:x,method:(n.method||"get").toUpperCase(),requestHeaders:V(n.headers),requestBody:(E=n.data)!=null?E:A(S),requestBodyRaw:S,queryParams:{...w,...n.params||{}},responseStatus:P,responseStatusText:(Y=d==null?void 0:d.statusText)!=null?Y:"",responseHeaders:V(d==null?void 0:d.headers),responseBody:(ue=d==null?void 0:d.data)!=null?ue:null,responseBodyRaw:N,duration:y,timestamp:p.startTime,success:!c&&!!P&&P<400,error:c?c.message||"Request failed":null,source:"axios",requestSize:C(S),responseSize:C(N),pinned:!1};v.addLog(u)}let a=e.interceptors.response.use(n=>(r(n.config,n),n),n=>(r(n==null?void 0:n.config,n==null?void 0:n.response,n),Promise.reject(n)));return()=>{e.interceptors.request.eject(o),e.interceptors.response.eject(a),e.__apiDebuggerInstalled=!1}}import{useCallback as fe,useSyncExternalStore as Oe}from"react";function ge(){let e=Oe(v.subscribe,v.getLogs,v.getLogs),t=fe(()=>v.clear(),[]),o=fe(r=>v.togglePin(r),[]);return{logs:e,clear:t,togglePin:o}}import{useEffect as Ie}from"react";function be(e,t,o=!0){Ie(()=>{if(!o||typeof window=="undefined")return;function r(a){let s=!e.ctrl||a.ctrlKey||a.metaKey,n=!e.shift||a.shiftKey;s&&n&&a.key.toLowerCase()===e.key.toLowerCase()&&(a.preventDefault(),t())}return window.addEventListener("keydown",r),()=>window.removeEventListener("keydown",r)},[e.ctrl,e.shift,e.key,t,o])}import{useEffect as je}from"react";var he=`
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
`;var xe="next-api-debugger-styles";function ve(){return je(()=>{if(typeof document=="undefined"||document.getElementById(xe))return;let e=document.createElement("style");e.id=xe,e.textContent=he,document.head.appendChild(e)},[]),null}import{useCallback as F,useEffect as ye,useRef as ee,useState as Fe}from"react";var we="apd-button-position",U=56,ke=5;function $(e){return typeof window=="undefined"?e:{x:Math.min(Math.max(8,e.x),window.innerWidth-U-8),y:Math.min(Math.max(8,e.y),window.innerHeight-U-8)}}function $e(){return typeof window=="undefined"?{x:24,y:24}:{x:window.innerWidth-U-24,y:window.innerHeight-U-24}}function Se(e){let[t,o]=Fe(()=>{if(typeof window=="undefined")return e!=null?e:{x:24,y:24};try{let p=sessionStorage.getItem(we);if(p)return $(JSON.parse(p))}catch{}return $(e!=null?e:$e())}),r=ee(!1),a=ee(!1),s=ee({pointerX:0,pointerY:0,posX:0,posY:0}),n=F(p=>{r.current=!0,a.current=!1,s.current={pointerX:p.clientX,pointerY:p.clientY,posX:t.x,posY:t.y},p.currentTarget.setPointerCapture(p.pointerId)},[t.x,t.y]),d=F(p=>{if(!r.current)return;let y=p.clientX-s.current.pointerX,x=p.clientY-s.current.pointerY;(Math.abs(y)>ke||Math.abs(x)>ke)&&(a.current=!0),o($({x:s.current.posX+y,y:s.current.posY+x}))},[]),c=F(()=>{r.current=!1},[]);ye(()=>{try{sessionStorage.setItem(we,JSON.stringify(t))}catch{}},[t]),ye(()=>{function p(){o(y=>$(y))}return window.addEventListener("resize",p),()=>window.removeEventListener("resize",p)},[]);let b=F(()=>a.current,[]);return{position:t,onPointerDown:n,onPointerMove:d,onPointerUp:c,wasDragged:b}}import{jsx as te,jsxs as Pe}from"react/jsx-runtime";function Ne({count:e,hasErrors:t,onOpen:o,initialPosition:r}){let{position:a,onPointerDown:s,onPointerMove:n,onPointerUp:d,wasDragged:c}=Se(r);return Pe("button",{type:"button",className:"apd-btn",style:{left:a.x,top:a.y},onPointerDown:s,onPointerMove:n,onPointerUp:d,onClick:()=>{c()||o()},"aria-label":"Open API debugger",title:"API Debugger (drag to move)",children:[Pe("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[te("polyline",{points:"16 18 22 12 16 6"}),te("polyline",{points:"8 6 2 12 8 18"})]}),e>0&&te("span",{className:k("apd-btn-dot",t&&"apd-has-errors"),children:e>99?"99+":e})]})}import{useEffect as tt,useMemo as ot,useState as le}from"react";import{jsx as oe,jsxs as Re}from"react/jsx-runtime";function Te({value:e,onChange:t}){return Re("div",{className:"apd-search",children:[Re("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[oe("circle",{cx:"11",cy:"11",r:"7"}),oe("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]}),oe("input",{type:"text",placeholder:"Filter by URL, endpoint, method or status code...",value:e,onChange:o=>t(o.target.value),spellCheck:!1})]})}import{Fragment as Ue,jsx as re,jsxs as Je}from"react/jsx-runtime";function Ee({status:e,onStatusChange:t,methods:o,activeMethods:r,onToggleMethod:a}){return Je(Ue,{children:[re("button",{type:"button",className:k("apd-chip apd-chip-success",e==="success"&&"apd-active"),onClick:()=>t(e==="success"?"all":"success"),children:"Success"}),re("button",{type:"button",className:k("apd-chip apd-chip-failed",e==="failed"&&"apd-active"),onClick:()=>t(e==="failed"?"all":"failed"),children:"Failed"}),o.map(s=>re("button",{type:"button",className:k("apd-chip",r.includes(s)&&"apd-active"),onClick:()=>a(s),children:s},s))]})}import{jsx as T,jsxs as ae}from"react/jsx-runtime";function _e(e){return["GET","POST","PUT","PATCH","DELETE"].includes(e.toUpperCase())?`apd-method-${e.toUpperCase()}`:"apd-method-OTHER"}function Le({log:e,selected:t,onSelect:o,onTogglePin:r}){var a;return ae("div",{className:k("apd-item",t&&"apd-selected"),onClick:o,role:"button",tabIndex:0,onKeyDown:s=>s.key==="Enter"&&o(),children:[ae("div",{className:"apd-item-row1",children:[T("span",{className:k("apd-method",_e(e.method)),children:e.method}),T("span",{className:"apd-item-url",title:e.url,children:e.endpoint}),T("span",{className:k("apd-status-dot",e.success?"apd-ok":"apd-fail")}),e.pinned&&T("button",{type:"button",className:"apd-pin-star",onClick:s=>{s.stopPropagation(),r()},title:"Unpin","aria-label":"Unpin request",style:{background:"none",border:"none",cursor:"pointer",padding:0},children:"\u2605"})]}),ae("div",{className:"apd-item-row2",children:[T("span",{children:(a=e.responseStatus)!=null?a:e.error?"ERR":"\u2014"}),T("span",{children:H(e.duration)}),T("span",{children:z(e.timestamp)}),T("span",{style:{marginLeft:"auto",textTransform:"uppercase"},children:e.source})]})]})}import{jsx as J,jsxs as Ke}from"react/jsx-runtime";function Ce({logs:e,selectedId:t,onSelect:o,onTogglePin:r}){return e.length===0?J("div",{className:"apd-list",children:Ke("div",{className:"apd-empty",children:["No requests captured yet.",J("br",{}),"Make an API call and it'll show up here."]})}):J("div",{className:"apd-list",children:e.map(a=>J(Le,{log:a,selected:a.id===t,onSelect:()=>o(a.id),onTogglePin:()=>r(a.id)},a.id))})}import{Fragment as Qe,useState as Ze}from"react";import{useState as Ye}from"react";import{jsxs as Xe}from"react/jsx-runtime";function _({getText:e,label:t,icon:o}){let[r,a]=Ye(!1);async function s(){await me(e())&&(a(!0),setTimeout(()=>a(!1),1200))}return Xe("button",{type:"button",className:k("apd-action-btn",r&&"apd-copied"),onClick:s,children:[o,r?"Copied":t]})}import{jsx as We}from"react/jsx-runtime";var Ge=/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(\.\d+)?([eE][+-]?\d+)?)/g;function Ve(e){return e.replace(Ge,t=>{let o="apd-json-num";return/^"/.test(t)?o=/:$/.test(t)?"apd-json-key":"apd-json-str":/true|false/.test(t)?o="apd-json-bool":/null/.test(t)&&(o="apd-json-null"),`<span class="${o}">${t}</span>`})}function qe(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function K({value:e,raw:t}){let o,r=!0;if(e!=null&&typeof e=="object")o=JSON.stringify(e,null,2);else if(typeof e=="string")try{o=JSON.stringify(JSON.parse(e),null,2)}catch{o=t!=null?t:e,r=!1}else o=t!=null?t:String(e!=null?e:""),r=!1;let a=r?Ve(qe(o)):qe(o);return We("pre",{className:"apd-json",dangerouslySetInnerHTML:{__html:a}})}function ne(e){return`'${e.replace(/'/g,"'\\''")}'`}function se(e){let t=[`curl -X ${e.method} ${ne(e.url)}`];for(let[o,r]of Object.entries(e.requestHeaders))/^(host|content-length|connection)$/i.test(o)||t.push(`  -H ${ne(`${o}: ${r}`)}`);return e.requestBodyRaw&&t.push(`  --data-raw ${ne(e.requestBodyRaw)}`),t.join(` \\
`)}import{jsx as i,jsxs as f}from"react/jsx-runtime";function B({title:e,count:t,defaultOpen:o=!0,children:r}){let[a,s]=Ze(o);return f("div",{className:"apd-section",children:[f("div",{className:"apd-section-header",onClick:()=>s(n=>!n),children:[f("span",{children:[e,typeof t=="number"?` (${t})`:""]}),i("span",{children:a?"\u2212":"+"})]}),a&&i("div",{className:"apd-section-body",children:r})]})}function ie({data:e}){let t=Object.entries(e);return t.length===0?i("div",{className:"apd-section-body apd-empty-body",children:"None"}):i("div",{className:"apd-kv",children:t.map(([o,r])=>f(Qe,{children:[i("div",{className:"apd-kv-key",children:o}),i("div",{className:"apd-kv-val",children:r})]},o))})}function Be({log:e,onTogglePin:t}){var s,n,d,c,b;if(!e)return i("div",{className:"apd-detail",children:i("div",{className:"apd-detail-empty",children:"Select a request to see full details"})});let o=se(e),r=(n=(s=L(e.requestBody))!=null?s:e.requestBodyRaw)!=null?n:"",a=(c=(d=L(e.responseBody))!=null?d:e.responseBodyRaw)!=null?c:"";return f("div",{className:"apd-detail",children:[f("div",{className:"apd-detail-header",children:[f("div",{className:"apd-detail-url",children:[i("strong",{children:e.method})," ",e.url]}),i("button",{type:"button",className:"apd-action-btn",onClick:()=>t(e.id),title:e.pinned?"Unpin":"Pin this request",children:e.pinned?"\u2605 Pinned":"\u2606 Pin"})]}),f("div",{className:"apd-meta-grid",children:[f("div",{children:[i("div",{className:"apd-meta-label",children:"Status"}),f("div",{className:"apd-meta-value",style:{color:e.success?"var(--apd-success)":"var(--apd-error)"},children:[(b=e.responseStatus)!=null?b:"Failed"," ",e.responseStatusText]})]}),f("div",{children:[i("div",{className:"apd-meta-label",children:"Duration"}),i("div",{className:"apd-meta-value",children:H(e.duration)})]}),f("div",{children:[i("div",{className:"apd-meta-label",children:"Time"}),i("div",{className:"apd-meta-value",children:z(e.timestamp)})]}),f("div",{children:[i("div",{className:"apd-meta-label",children:"Source"}),i("div",{className:"apd-meta-value",children:e.source})]}),f("div",{children:[i("div",{className:"apd-meta-label",children:"Req. size"}),i("div",{className:"apd-meta-value",children:G(e.requestSize)})]}),f("div",{children:[i("div",{className:"apd-meta-label",children:"Res. size"}),i("div",{className:"apd-meta-value",children:G(e.responseSize)})]})]}),e.error&&f("div",{className:"apd-section",style:{borderColor:"var(--apd-error)"},children:[i("div",{className:"apd-section-header",style:{color:"var(--apd-error)"},children:"Error"}),i("div",{className:"apd-section-body",children:e.error})]}),f("div",{className:"apd-actions",children:[i(_,{label:"Copy cURL",getText:()=>o}),i(_,{label:"Copy Request",getText:()=>r}),i(_,{label:"Copy Response",getText:()=>a})]}),i(B,{title:"cURL",children:i(K,{value:o})}),i(B,{title:"Query Params",count:Object.keys(e.queryParams).length,defaultOpen:!1,children:i(ie,{data:e.queryParams})}),i(B,{title:"Request Headers",count:Object.keys(e.requestHeaders).length,defaultOpen:!1,children:i(ie,{data:e.requestHeaders})}),i(B,{title:"Request Body",children:e.requestBodyRaw?i(K,{value:e.requestBody,raw:e.requestBodyRaw}):i("div",{className:"apd-empty-body",children:"No body"})}),i(B,{title:"Response Headers",count:Object.keys(e.responseHeaders).length,defaultOpen:!1,children:i(ie,{data:e.responseHeaders})}),i(B,{title:"Response Body",children:e.responseBodyRaw?i(K,{value:e.responseBody,raw:e.responseBodyRaw}):i("div",{className:"apd-empty-body",children:"No body"})})]})}function Me(e){return Object.entries(e).map(([t,o])=>({name:t,value:o}))}function et(e){return Object.entries(e).map(([t,o])=>({name:t,value:o}))}function de(e){return{log:{version:"1.2",creator:{name:"next-api-debugger",version:"0.1.0"},entries:e.map(t=>{var o,r;return{startedDateTime:new Date(t.timestamp).toISOString(),time:t.duration,request:{method:t.method,url:t.url,httpVersion:"HTTP/1.1",headers:Me(t.requestHeaders),queryString:et(t.queryParams),cookies:[],headersSize:-1,bodySize:t.requestSize,postData:t.requestBodyRaw?{mimeType:t.requestHeaders["content-type"]||"application/json",text:t.requestBodyRaw}:void 0},response:{status:(o=t.responseStatus)!=null?o:0,statusText:t.responseStatusText,httpVersion:"HTTP/1.1",headers:Me(t.responseHeaders),cookies:[],content:{size:t.responseSize,mimeType:t.responseHeaders["content-type"]||"application/json",text:(r=t.responseBodyRaw)!=null?r:""},redirectURL:"",headersSize:-1,bodySize:t.responseSize},cache:{},timings:{send:0,wait:t.duration,receive:0}}})}}}function pe(e,t){let o=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),r=URL.createObjectURL(o),a=document.createElement("a");a.href=r,a.download=e,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(r)}import{Fragment as at,jsx as g,jsxs as R}from"react/jsx-runtime";var rt=["GET","POST","PUT","PATCH","DELETE"];function Ae({logs:e,onClose:t,onClear:o,onTogglePin:r,theme:a,onToggleTheme:s}){var P,u,h;let[n,d]=le({search:"",status:"all",methods:[]}),[c,b]=le(null),[p,y]=le(!1);tt(()=>{!c&&e.length>0&&b(e[0].id)},[e,c]);let x=ot(()=>{let m=n.search.trim().toLowerCase();return e.filter(l=>{var E;return!(n.status==="success"&&!l.success||n.status==="failed"&&l.success||n.methods.length>0&&!n.methods.includes(l.method)||m&&!`${l.url} ${l.endpoint} ${l.method} ${(E=l.responseStatus)!=null?E:""}`.toLowerCase().includes(m))})},[e,n]),w=(u=(P=x.find(m=>m.id===c))!=null?P:x[0])!=null?u:null,S=e.filter(m=>!m.success).length;function N(m){d(l=>({...l,methods:l.methods.includes(m)?l.methods.filter(E=>E!==m):[...l.methods,m]}))}return g("div",{className:"apd-overlay",onClick:t,children:R("div",{className:`apd-modal${p?" apd-minimized":""}`,onClick:m=>m.stopPropagation(),children:[R("div",{className:"apd-header",children:[R("div",{className:"apd-header-title",children:[g("span",{className:"apd-live-dot"}),"API Debugger"]}),R("span",{className:"apd-header-count",children:[e.length," requests",S>0?` \xB7 ${S} failed`:""]}),g("div",{className:"apd-spacer"}),g("button",{className:"apd-icon-btn",onClick:s,title:"Toggle theme",type:"button",children:a==="light"?"\u2600":"\u263E"}),g("button",{className:"apd-icon-btn",title:"Export JSON",type:"button",onClick:()=>pe(`api-logs-${Date.now()}.json`,e),children:"\u2B73"}),g("button",{className:"apd-icon-btn",title:"Export HAR",type:"button",onClick:()=>pe(`api-logs-${Date.now()}.har`,de(e)),children:"HAR"}),g("button",{className:"apd-icon-btn",title:"Clear logs",type:"button",onClick:o,children:"\u{1F5D1}"}),g("button",{className:"apd-icon-btn",title:p?"Restore":"Minimize",type:"button",onClick:()=>y(m=>!m),children:p?"\u25A2":"\u2014"}),g("button",{className:"apd-icon-btn",title:"Close",type:"button",onClick:t,children:"\u2715"})]}),!p&&R(at,{children:[R("div",{className:"apd-toolbar",children:[g(Te,{value:n.search,onChange:m=>d(l=>({...l,search:m}))}),g(Ee,{status:n.status,onStatusChange:m=>d(l=>({...l,status:m})),methods:rt,activeMethods:n.methods,onToggleMethod:N})]}),R("div",{className:"apd-body",children:[g(Ce,{logs:x,selectedId:(h=w==null?void 0:w.id)!=null?h:null,onSelect:b,onTogglePin:r}),g(Be,{log:w,onTogglePin:r})]}),R("div",{className:"apd-footer",children:[R("span",{children:[g("span",{className:"apd-kbd",children:"Ctrl"}),"+",g("span",{className:"apd-kbd",children:"Shift"}),"+",g("span",{className:"apd-kbd",children:"D"})," to toggle"]}),g("span",{style:{marginLeft:"auto"},children:"next-api-debugger \xB7 dev only"})]})]})]})})}import{jsx as ce,jsxs as dt}from"react/jsx-runtime";function st(e){return typeof e=="boolean"?e:process.env.NODE_ENV!=="production"}function it(e){let{enabled:t,maxLogs:o=200,initialPosition:r,axiosInstance:a,theme:s="dark",keyboardShortcut:n=!0,ignoreUrls:d}=e,c=st(t),[b,p]=He(!1),[y,x]=He(s),{logs:w,clear:S,togglePin:N}=ge();if(nt(()=>{if(!c||typeof window=="undefined")return;v.setMaxLogs(o),W({ignoreUrls:d});let h=a?Z(a,{ignoreUrls:d}):()=>{};return()=>{Q(),h()}},[c]),be({ctrl:!0,shift:!0,key:"d"},()=>p(h=>!h),c&&n),!c)return null;let P=w.filter(h=>!h.success).length,u=y==="system"?"dark":y;return dt("div",{className:`apd-root${u==="light"?" apd-light":""}`,children:[ce(ve,{}),!b&&ce(Ne,{count:w.length,hasErrors:P>0,onOpen:()=>p(!0),initialPosition:r}),b&&ce(Ae,{logs:w,onClose:()=>p(!1),onClear:S,onTogglePin:N,theme:u,onToggleTheme:()=>x(u==="light"?"dark":"light")})]})}export{it as ApiDebugger,de as exportAsHar,se as generateCurl,Z as installAxiosInterceptor,W as installFetchInterceptor,v as logStore,Q as uninstallFetchInterceptor};
//# sourceMappingURL=index.mjs.map