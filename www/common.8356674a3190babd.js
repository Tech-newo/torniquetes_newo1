"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8592],{1924:(M,v,i)=>{i.d(v,{c:()=>r});var f=i(4254),l=i(1765),a=i(5067);const r=(n,o)=>{let e,t;const u=(c,E,m)=>{if(typeof document>"u")return;const w=document.elementFromPoint(c,E);w&&o(w)?w!==e&&(s(),d(w,m)):s()},d=(c,E)=>{e=c,t||(t=e);const m=e;(0,f.w)(()=>m.classList.add("ion-activated")),E()},s=(c=!1)=>{if(!e)return;const E=e;(0,f.w)(()=>E.classList.remove("ion-activated")),c&&t!==e&&e.click(),e=void 0};return(0,a.createGesture)({el:n,gestureName:"buttonActiveDrag",threshold:0,onStart:c=>u(c.currentX,c.currentY,l.a),onMove:c=>u(c.currentX,c.currentY,l.b),onEnd:()=>{s(!0),(0,l.h)(),t=void 0}})}},6319:(M,v,i)=>{i.d(v,{g:()=>l});var f=i(2972);const l=()=>{if(void 0!==f.w)return f.w.Capacitor}},2890:(M,v,i)=>{i.d(v,{c:()=>f,i:()=>l});const f=(a,r,n)=>"function"==typeof n?n(a,r):"string"==typeof n?a[n]===r[n]:Array.isArray(r)?r.includes(a):a===r,l=(a,r,n)=>void 0!==a&&(Array.isArray(a)?a.some(o=>f(o,r,n)):f(a,r,n))},5069:(M,v,i)=>{i.d(v,{g:()=>f});const f=(o,e,t,u,d)=>a(o[1],e[1],t[1],u[1],d).map(s=>l(o[0],e[0],t[0],u[0],s)),l=(o,e,t,u,d)=>d*(3*e*Math.pow(d-1,2)+d*(-3*t*d+3*t+u*d))-o*Math.pow(d-1,3),a=(o,e,t,u,d)=>n((u-=d)-3*(t-=d)+3*(e-=d)-(o-=d),3*t-6*e+3*o,3*e-3*o,o).filter(c=>c>=0&&c<=1),n=(o,e,t,u)=>{if(0===o)return((o,e,t)=>{const u=e*e-4*o*t;return u<0?[]:[(-e+Math.sqrt(u))/(2*o),(-e-Math.sqrt(u))/(2*o)]})(e,t,u);const d=(3*(t/=o)-(e/=o)*e)/3,s=(2*e*e*e-9*e*t+27*(u/=o))/27;if(0===d)return[Math.pow(-s,1/3)];if(0===s)return[Math.sqrt(-d),-Math.sqrt(-d)];const c=Math.pow(s/2,2)+Math.pow(d/3,3);if(0===c)return[Math.pow(s/2,.5)-e/3];if(c>0)return[Math.pow(-s/2+Math.sqrt(c),1/3)-Math.pow(s/2+Math.sqrt(c),1/3)-e/3];const E=Math.sqrt(Math.pow(-d/3,3)),m=Math.acos(-s/(2*Math.sqrt(Math.pow(-d/3,3)))),w=2*Math.pow(E,1/3);return[w*Math.cos(m/3)-e/3,w*Math.cos((m+2*Math.PI)/3)-e/3,w*Math.cos((m+4*Math.PI)/3)-e/3]}},6879:(M,v,i)=>{i.d(v,{i:()=>f});const f=l=>l&&""!==l.dir?"rtl"===l.dir.toLowerCase():"rtl"===document?.dir.toLowerCase()},6390:(M,v,i)=>{i.r(v),i.d(v,{startFocusVisible:()=>r});const f="ion-focused",a=["Tab","ArrowDown","Space","Escape"," ","Shift","Enter","ArrowLeft","ArrowRight","ArrowUp","Home","End"],r=n=>{let o=[],e=!0;const t=n?n.shadowRoot:document,u=n||document.body,d=y=>{o.forEach(_=>_.classList.remove(f)),y.forEach(_=>_.classList.add(f)),o=y},s=()=>{e=!1,d([])},c=y=>{e=a.includes(y.key),e||d([])},E=y=>{if(e&&void 0!==y.composedPath){const _=y.composedPath().filter(g=>!!g.classList&&g.classList.contains("ion-focusable"));d(_)}},m=()=>{t.activeElement===u&&d([])};return t.addEventListener("keydown",c),t.addEventListener("focusin",E),t.addEventListener("focusout",m),t.addEventListener("touchstart",s,{passive:!0}),t.addEventListener("mousedown",s),{destroy:()=>{t.removeEventListener("keydown",c),t.removeEventListener("focusin",E),t.removeEventListener("focusout",m),t.removeEventListener("touchstart",s),t.removeEventListener("mousedown",s)},setFocus:d}}},372:(M,v,i)=>{i.d(v,{c:()=>l});var f=i(6711);const l=o=>{const e=o;let t;return{hasLegacyControl:()=>{if(void 0===t){const d=void 0!==e.label||a(e),s=e.hasAttribute("aria-label")||e.hasAttribute("aria-labelledby")&&null===e.shadowRoot,c=(0,f.h)(e);t=!0===e.legacy||!d&&!s&&null!==c}return t}}},a=o=>!!(r.includes(o.tagName)&&null!==o.querySelector('[slot="label"]')||n.includes(o.tagName)&&""!==o.textContent),r=["ION-INPUT","ION-TEXTAREA","ION-SELECT","ION-RANGE"],n=["ION-TOGGLE","ION-CHECKBOX","ION-RADIO"]},1765:(M,v,i)=>{i.d(v,{I:()=>l,a:()=>e,b:()=>t,c:()=>o,d:()=>d,h:()=>u});var f=i(6319),l=(()=>{return(s=l||(l={})).Heavy="HEAVY",s.Medium="MEDIUM",s.Light="LIGHT",l;var s})();const r={getEngine(){const s=window.TapticEngine;if(s)return s;const c=(0,f.g)();return c?.isPluginAvailable("Haptics")?c.Plugins.Haptics:void 0},available(){return!!this.getEngine()&&("web"!==(0,f.g)()?.getPlatform()||typeof navigator<"u"&&void 0!==navigator.vibrate)},isCordova:()=>void 0!==window.TapticEngine,isCapacitor:()=>void 0!==(0,f.g)(),impact(s){const c=this.getEngine();if(!c)return;const E=this.isCapacitor()?s.style:s.style.toLowerCase();c.impact({style:E})},notification(s){const c=this.getEngine();if(!c)return;const E=this.isCapacitor()?s.type:s.type.toLowerCase();c.notification({type:E})},selection(){const s=this.isCapacitor()?l.Light:"light";this.impact({style:s})},selectionStart(){const s=this.getEngine();!s||(this.isCapacitor()?s.selectionStart():s.gestureSelectionStart())},selectionChanged(){const s=this.getEngine();!s||(this.isCapacitor()?s.selectionChanged():s.gestureSelectionChanged())},selectionEnd(){const s=this.getEngine();!s||(this.isCapacitor()?s.selectionEnd():s.gestureSelectionEnd())}},n=()=>r.available(),o=()=>{n()&&r.selection()},e=()=>{n()&&r.selectionStart()},t=()=>{n()&&r.selectionChanged()},u=()=>{n()&&r.selectionEnd()},d=s=>{n()&&r.impact(s)}},577:(M,v,i)=>{i.d(v,{I:()=>o,a:()=>d,b:()=>n,c:()=>E,d:()=>w,f:()=>s,g:()=>u,i:()=>t,p:()=>m,r:()=>y,s:()=>c});var f=i(5861),l=i(6711),a=i(8909);const n="ion-content",o=".ion-content-scroll-host",e=`${n}, ${o}`,t=_=>"ION-CONTENT"===_.tagName,u=function(){var _=(0,f.Z)(function*(g){return t(g)?(yield new Promise(p=>(0,l.c)(g,p)),g.getScrollElement()):g});return function(p){return _.apply(this,arguments)}}(),d=_=>_.querySelector(o)||_.querySelector(e),s=_=>_.closest(e),c=(_,g)=>t(_)?_.scrollToTop(g):Promise.resolve(_.scrollTo({top:0,left:0,behavior:g>0?"smooth":"auto"})),E=(_,g,p,O)=>t(_)?_.scrollByPoint(g,p,O):Promise.resolve(_.scrollBy({top:p,left:g,behavior:O>0?"smooth":"auto"})),m=_=>(0,a.b)(_,n),w=_=>{if(t(_)){const p=_.scrollY;return _.scrollY=!1,p}return _.style.setProperty("overflow","hidden"),!0},y=(_,g)=>{t(_)?_.scrollY=g:_.style.removeProperty("overflow")}},4896:(M,v,i)=>{i.d(v,{a:()=>f,b:()=>E,c:()=>e,d:()=>m,e:()=>L,f:()=>o,g:()=>w,h:()=>a,i:()=>l,j:()=>O,k:()=>C,l:()=>t,m:()=>s,n:()=>y,o:()=>d,p:()=>n,q:()=>r,r:()=>p,s:()=>h,t:()=>c,u:()=>_,v:()=>g,w:()=>u});const f="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='square' stroke-miterlimit='10' stroke-width='48' d='M244 400L100 256l144-144M120 256h292' class='ionicon-fill-none'/></svg>",l="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 268l144 144 144-144M256 392V100' class='ionicon-fill-none'/></svg>",a="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M368 64L144 256l224 192V64z'/></svg>",r="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M64 144l192 224 192-224H64z'/></svg>",n="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M448 368L256 144 64 368h384z'/></svg>",o="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' d='M416 128L192 384l-96-96' class='ionicon-fill-none ionicon-stroke-width'/></svg>",e="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M328 112L184 256l144 144' class='ionicon-fill-none'/></svg>",t="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144' class='ionicon-fill-none'/></svg>",u="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M136 208l120-104 120 104M136 304l120 104 120-104' stroke-width='48' stroke-linecap='round' stroke-linejoin='round' class='ionicon-fill-none'/></svg>",d="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M184 112l144 144-144 144' class='ionicon-fill-none'/></svg>",s="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M184 112l144 144-144 144' class='ionicon-fill-none'/></svg>",c="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z'/></svg>",E="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm75.31 260.69a16 16 0 11-22.62 22.62L256 278.63l-52.69 52.68a16 16 0 01-22.62-22.62L233.37 256l-52.68-52.69a16 16 0 0122.62-22.62L256 233.37l52.69-52.68a16 16 0 0122.62 22.62L278.63 256z'/></svg>",m="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M400 145.49L366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49z'/></svg>",w="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><circle cx='256' cy='256' r='192' stroke-linecap='round' stroke-linejoin='round' class='ionicon-fill-none ionicon-stroke-width'/></svg>",y="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><circle cx='256' cy='256' r='48'/><circle cx='416' cy='256' r='48'/><circle cx='96' cy='256' r='48'/></svg>",_="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-miterlimit='10' d='M80 160h352M80 256h352M80 352h352' class='ionicon-fill-none ionicon-stroke-width'/></svg>",g="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M64 384h384v-42.67H64zm0-106.67h384v-42.66H64zM64 128v42.67h384V128z'/></svg>",p="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' d='M400 256H112' class='ionicon-fill-none ionicon-stroke-width'/></svg>",O="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' d='M96 256h320M96 176h320M96 336h320' class='ionicon-fill-none ionicon-stroke-width'/></svg>",C="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='square' stroke-linejoin='round' stroke-width='44' d='M118 304h276M118 208h276' class='ionicon-fill-none'/></svg>",h="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z' stroke-miterlimit='10' class='ionicon-fill-none ionicon-stroke-width'/><path stroke-linecap='round' stroke-miterlimit='10' d='M338.29 338.29L448 448' class='ionicon-fill-none ionicon-stroke-width'/></svg>",L="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M464 428L339.92 303.9a160.48 160.48 0 0030.72-94.58C370.64 120.37 298.27 48 209.32 48S48 120.37 48 209.32s72.37 161.32 161.32 161.32a160.48 160.48 0 0094.58-30.72L428 464zM209.32 319.69a110.38 110.38 0 11110.37-110.37 110.5 110.5 0 01-110.37 110.37z'/></svg>"},7464:(M,v,i)=>{i.d(v,{c:()=>r,g:()=>n});var f=i(2972),l=i(6711),a=i(8909);const r=(e,t,u)=>{let d,s;if(void 0!==f.w&&"MutationObserver"in f.w){const w=Array.isArray(t)?t:[t];d=new MutationObserver(y=>{for(const _ of y)for(const g of _.addedNodes)if(g.nodeType===Node.ELEMENT_NODE&&w.includes(g.slot))return u(),void(0,l.r)(()=>c(g))}),d.observe(e,{childList:!0})}const c=w=>{var y;s&&(s.disconnect(),s=void 0),s=new MutationObserver(_=>{u();for(const g of _)for(const p of g.removedNodes)p.nodeType===Node.ELEMENT_NODE&&p.slot===t&&m()}),s.observe(null!==(y=w.parentElement)&&void 0!==y?y:w,{subtree:!0,childList:!0})},m=()=>{s&&(s.disconnect(),s=void 0)};return{destroy:()=>{d&&(d.disconnect(),d=void 0),m()}}},n=(e,t,u)=>{const d=null==e?0:e.toString().length,s=o(d,t);if(void 0===u)return s;try{return u(d,t)}catch(c){return(0,a.a)("Exception in provided `counterFormatter`.",c),s}},o=(e,t)=>`${e} / ${t}`},922:(M,v,i)=>{i.r(v),i.d(v,{KEYBOARD_DID_CLOSE:()=>n,KEYBOARD_DID_OPEN:()=>r,copyVisualViewport:()=>C,keyboardDidClose:()=>_,keyboardDidOpen:()=>w,keyboardDidResize:()=>y,resetKeyboardAssist:()=>d,setKeyboardClose:()=>m,setKeyboardOpen:()=>E,startKeyboardAssist:()=>s,trackViewportChanges:()=>O});var f=i(3037);i(6319),i(2972);const r="ionKeyboardDidShow",n="ionKeyboardDidHide";let e={},t={},u=!1;const d=()=>{e={},t={},u=!1},s=h=>{if(f.K.getEngine())c(h);else{if(!h.visualViewport)return;t=C(h.visualViewport),h.visualViewport.onresize=()=>{O(h),w()||y(h)?E(h):_(h)&&m(h)}}},c=h=>{h.addEventListener("keyboardDidShow",L=>E(h,L)),h.addEventListener("keyboardDidHide",()=>m(h))},E=(h,L)=>{g(h,L),u=!0},m=h=>{p(h),u=!1},w=()=>!u&&e.width===t.width&&(e.height-t.height)*t.scale>150,y=h=>u&&!_(h),_=h=>u&&t.height===h.innerHeight,g=(h,L)=>{const D=new CustomEvent(r,{detail:{keyboardHeight:L?L.keyboardHeight:h.innerHeight-t.height}});h.dispatchEvent(D)},p=h=>{const L=new CustomEvent(n);h.dispatchEvent(L)},O=h=>{e=Object.assign({},t),t=C(h.visualViewport)},C=h=>({width:Math.round(h.width),height:Math.round(h.height),offsetTop:h.offsetTop,offsetLeft:h.offsetLeft,pageTop:h.pageTop,pageLeft:h.pageLeft,scale:h.scale})},3037:(M,v,i)=>{i.d(v,{K:()=>r,a:()=>a});var f=i(6319),l=(()=>{return(n=l||(l={})).Unimplemented="UNIMPLEMENTED",n.Unavailable="UNAVAILABLE",l;var n})(),a=(()=>{return(n=a||(a={})).Body="body",n.Ionic="ionic",n.Native="native",n.None="none",a;var n})();const r={getEngine(){const n=(0,f.g)();if(n?.isPluginAvailable("Keyboard"))return n.Plugins.Keyboard},getResizeMode(){const n=this.getEngine();return n?.getResizeMode?n.getResizeMode().catch(o=>{if(o.code!==l.Unimplemented)throw o}):Promise.resolve(void 0)}}},2930:(M,v,i)=>{i.d(v,{c:()=>o});var f=i(5861),l=i(2972),a=i(3037);const r=e=>void 0===l.d||e===a.a.None||void 0===e?null:l.d.querySelector("ion-app")??l.d.body,n=e=>{const t=r(e);return null===t?0:t.clientHeight},o=function(){var e=(0,f.Z)(function*(t){let u,d,s,c;const E=function(){var g=(0,f.Z)(function*(){const p=yield a.K.getResizeMode(),O=void 0===p?void 0:p.mode;u=()=>{void 0===c&&(c=n(O)),s=!0,m(s,O)},d=()=>{s=!1,m(s,O)},null==l.w||l.w.addEventListener("keyboardWillShow",u),null==l.w||l.w.addEventListener("keyboardWillHide",d)});return function(){return g.apply(this,arguments)}}(),m=(g,p)=>{t&&t(g,w(p))},w=g=>{if(0===c||c===n(g))return;const p=r(g);return null!==p?new Promise(O=>{const h=new ResizeObserver(()=>{p.clientHeight===c&&(h.disconnect(),O())});h.observe(p)}):void 0};return yield E(),{init:E,destroy:()=>{null==l.w||l.w.removeEventListener("keyboardWillShow",u),null==l.w||l.w.removeEventListener("keyboardWillHide",d),u=d=void 0},isKeyboardVisible:()=>s}});return function(u){return e.apply(this,arguments)}}()},7389:(M,v,i)=>{i.d(v,{c:()=>l});var f=i(5861);const l=()=>{let a;return{lock:function(){var n=(0,f.Z)(function*(){const o=a;let e;return a=new Promise(t=>e=t),void 0!==o&&(yield o),e});return function(){return n.apply(this,arguments)}}()}}},3423:(M,v,i)=>{i.d(v,{c:()=>a});var f=i(2972),l=i(6711);const a=(r,n,o)=>{let e;const t=()=>!(void 0===n()||void 0!==r.label||null===o()),d=()=>{const c=n();if(void 0===c)return;if(!t())return void c.style.removeProperty("width");const E=o().scrollWidth;if(0===E&&null===c.offsetParent&&void 0!==f.w&&"IntersectionObserver"in f.w){if(void 0!==e)return;const m=e=new IntersectionObserver(w=>{1===w[0].intersectionRatio&&(d(),m.disconnect(),e=void 0)},{threshold:.01,root:r});m.observe(c)}else c.style.setProperty("width",.75*E+"px")};return{calculateNotchWidth:()=>{t()&&(0,l.r)(()=>{d()})},destroy:()=>{e&&(e.disconnect(),e=void 0)}}}},2677:(M,v,i)=>{i.d(v,{S:()=>l});const l={bubbles:{dur:1e3,circles:9,fn:(a,r,n)=>{const o=a*r/n-a+"ms",e=2*Math.PI*r/n;return{r:5,style:{top:32*Math.sin(e)+"%",left:32*Math.cos(e)+"%","animation-delay":o}}}},circles:{dur:1e3,circles:8,fn:(a,r,n)=>{const o=r/n,e=a*o-a+"ms",t=2*Math.PI*o;return{r:5,style:{top:32*Math.sin(t)+"%",left:32*Math.cos(t)+"%","animation-delay":e}}}},circular:{dur:1400,elmDuration:!0,circles:1,fn:()=>({r:20,cx:48,cy:48,fill:"none",viewBox:"24 24 48 48",transform:"translate(0,0)",style:{}})},crescent:{dur:750,circles:1,fn:()=>({r:26,style:{}})},dots:{dur:750,circles:3,fn:(a,r)=>({r:6,style:{left:32-32*r+"%","animation-delay":-110*r+"ms"}})},lines:{dur:1e3,lines:8,fn:(a,r,n)=>({y1:14,y2:26,style:{transform:`rotate(${360/n*r+(r<n/2?180:-180)}deg)`,"animation-delay":a*r/n-a+"ms"}})},"lines-small":{dur:1e3,lines:8,fn:(a,r,n)=>({y1:12,y2:20,style:{transform:`rotate(${360/n*r+(r<n/2?180:-180)}deg)`,"animation-delay":a*r/n-a+"ms"}})},"lines-sharp":{dur:1e3,lines:12,fn:(a,r,n)=>({y1:17,y2:29,style:{transform:`rotate(${30*r+(r<6?180:-180)}deg)`,"animation-delay":a*r/n-a+"ms"}})},"lines-sharp-small":{dur:1e3,lines:12,fn:(a,r,n)=>({y1:12,y2:20,style:{transform:`rotate(${30*r+(r<6?180:-180)}deg)`,"animation-delay":a*r/n-a+"ms"}})}}},4668:(M,v,i)=>{i.r(v),i.d(v,{createSwipeBackGesture:()=>n});var f=i(6711),l=i(6879),a=i(5067);i(2889);const n=(o,e,t,u,d)=>{const s=o.ownerDocument.defaultView;let c=(0,l.i)(o);const m=p=>c?-p.deltaX:p.deltaX;return(0,a.createGesture)({el:o,gestureName:"goback-swipe",gesturePriority:101,threshold:10,canStart:p=>(c=(0,l.i)(o),(p=>{const{startX:C}=p;return c?C>=s.innerWidth-50:C<=50})(p)&&e()),onStart:t,onMove:p=>{const C=m(p)/s.innerWidth;u(C)},onEnd:p=>{const O=m(p),C=s.innerWidth,h=O/C,L=(p=>c?-p.velocityX:p.velocityX)(p),D=L>=0&&(L>.2||O>C/2),A=(D?1-h:h)*C;let b=0;if(A>5){const T=A/Math.abs(L);b=Math.min(T,540)}d(D,h<=0?.01:(0,f.l)(0,h,.9999),b)}})}},2754:(M,v,i)=>{i.d(v,{w:()=>f});const f=(r,n,o)=>{if(typeof MutationObserver>"u")return;const e=new MutationObserver(t=>{o(l(t,n))});return e.observe(r,{childList:!0,subtree:!0}),e},l=(r,n)=>{let o;return r.forEach(e=>{for(let t=0;t<e.addedNodes.length;t++)o=a(e.addedNodes[t],n)||o}),o},a=(r,n)=>{if(1!==r.nodeType)return;const o=r;return(o.tagName===n.toUpperCase()?[o]:Array.from(o.querySelectorAll(n))).find(t=>t.value===o.value)}},1284:(M,v,i)=>{i.d(v,{Z:()=>n});var f=i(4650),l=i(7771),a=i(958),r=i(150);let n=(()=>{class o{constructor(t,u,d){this.router=t,this.navController=u,this.accountService=d}canActivate(t,u){return this.checkLogin(t.data.authorities,u.url)}checkLogin(t,u){return this.accountService.identity().then(d=>!(t&&0!==t.length&&(d?!this.accountService.hasAnyAuthority(t)&&((0,f.X6Q)()&&console.error("User has not any of required authorities: ",t),1):(this.navController.navigateRoot("/accessdenied"),1))))}}return o.\u0275fac=function(t){return new(t||o)(f.LFG(l.F0),f.LFG(a.SH),f.LFG(r.B))},o.\u0275prov=f.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})()},9726:(M,v,i)=>{i.d(v,{y:()=>n});var f=i(5146),l=i(9393),a=i(4650),r=i(529);let n=(()=>{class o{constructor(t){this.http=t,this.resourceUrl=f.s.API_URL+"/sedes"}find(t){return this.http.get(`${this.resourceUrl}/${t}`,{observe:"response"})}findBySedeId(t){return this.http.get(`${this.resourceUrl}?id.equals=${t}&page=0&size=1&sort=id,desc`,{observe:"response"})}query(t){const u=(0,l.b)(t);return this.http.get(this.resourceUrl,{params:u,observe:"response"})}}return o.\u0275fac=function(t){return new(t||o)(a.LFG(r.eN))},o.\u0275prov=a.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})()},9393:(M,v,i)=>{i.d(v,{b:()=>l});var f=i(529);const l=a=>{let r=new f.LE;return a&&(Object.keys(a).forEach(n=>{"sort"!==n&&(r=r.set(n,a[n]))}),a.sort&&a.sort.forEach(n=>{r=r.append("sort",n)})),r}}}]);