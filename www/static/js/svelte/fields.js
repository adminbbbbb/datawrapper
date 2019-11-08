!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define("svelte/fields",e):(t=t||self).fields=e()}(this,(function(){"use strict";function t(){}function e(t,e){for(var n in e)t[n]=e[n];return t}function n(t,e){for(var n in e)t[n]=1;return t}function i(t){t()}function o(t,e){t.appendChild(e)}function s(t,e,n){t.insertBefore(e,n)}function r(t){t.parentNode.removeChild(t)}function a(){return document.createDocumentFragment()}function l(t){return document.createElement(t)}function d(t){return document.createTextNode(t)}function u(){return document.createComment("")}function c(t,e,n,i){t.addEventListener(e,n,i)}function h(t,e,n,i){t.removeEventListener(e,n,i)}function f(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function p(t,e){t.data=""+e}function m(t,e,n){t.style.setProperty(e,n)}function v(t,e,n){t.classList[n?"add":"remove"](e)}function g(t){return t}function _(e,n,o,s,r){var a,l,d,u=o.call(e,n,s),c=!1;return{t:r?0:1,running:!1,program:null,pending:null,run:function(t,e){var n=this;"function"==typeof u?y.wait().then((function(){u=u(),n._run(t,e)})):this._run(t,e)},_run:function(e,i){a=u.duration||300,l=u.easing||g;var o={start:window.performance.now()+(u.delay||0),b:e,callback:i||t};r&&!c&&(u.css&&u.delay&&(d=n.style.cssText,n.style.cssText+=u.css(0,1)),u.tick&&u.tick(0,1),c=!0),e||(o.group=b.current,b.current.remaining+=1),u.delay?this.pending=o:this.start(o),this.running||(this.running=!0,y.add(this))},start:function(t){if(e.fire((t.b?"intro":"outro")+".start",{node:n}),t.a=this.t,t.delta=t.b-t.a,t.duration=a*Math.abs(t.b-t.a),t.end=t.start+t.duration,u.css){u.delay&&(n.style.cssText=d);var i=function(t,e,n){for(var i=t.a,o=t.b,s=t.delta,r=16.666/t.duration,a="{\n",l=0;l<=1;l+=r){var d=i+s*e(l);a+=100*l+"%{"+n(d,1-d)+"}\n"}return a+"100% {"+n(o,1-o)+"}\n}"}(t,l,u.css);y.addRule(i,t.name="__svelte_"+function(t){for(var e=5381,n=t.length;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}(i)),n.style.animation=(n.style.animation||"").split(", ").filter((function(e){return e&&(t.delta<0||!/__svelte/.test(e))})).concat(t.name+" "+t.duration+"ms linear 1 forwards").join(", ")}this.program=t,this.pending=null},update:function(t){var e=this.program;if(e){var n=t-e.start;this.t=e.a+e.delta*l(n/e.duration),u.tick&&u.tick(this.t,1-this.t)}},done:function(){var t=this.program;this.t=t.b,u.tick&&u.tick(this.t,1-this.t),e.fire((t.b?"intro":"outro")+".end",{node:n}),t.b||t.invalidated?u.css&&y.deleteRule(n,t.name):(t.group.callbacks.push((function(){t.callback(),u.css&&y.deleteRule(n,t.name)})),0==--t.group.remaining&&t.group.callbacks.forEach(i)),this.running=!!this.pending},abort:function(t){this.program&&(t&&u.tick&&u.tick(1,0),u.css&&y.deleteRule(n,this.program.name),this.program=this.pending=null,this.running=!1)},invalidate:function(){this.program&&(this.program.invalidated=!0)}}}var b={};var y={running:!1,transitions:[],bound:null,stylesheet:null,activeRules:{},promise:null,add:function(t){this.transitions.push(t),this.running||(this.running=!0,requestAnimationFrame(this.bound||(this.bound=this.next.bind(this))))},addRule:function(t,e){if(!this.stylesheet){var n=l("style");document.head.appendChild(n),y.stylesheet=n.sheet}this.activeRules[e]||(this.activeRules[e]=!0,this.stylesheet.insertRule("@keyframes "+e+" "+t,this.stylesheet.cssRules.length))},next:function(){this.running=!1;for(var t=window.performance.now(),e=this.transitions.length;e--;){var n=this.transitions[e];n.program&&t>=n.program.end&&n.done(),n.pending&&t>=n.pending.start&&n.start(n.pending),n.running?(n.update(t),this.running=!0):n.pending||this.transitions.splice(e,1)}if(this.running)requestAnimationFrame(this.bound);else if(this.stylesheet){for(var i=this.stylesheet.cssRules.length;i--;)this.stylesheet.deleteRule(i);this.activeRules={}}},deleteRule:function(t,e){t.style.animation=t.style.animation.split(", ").filter((function(t){return t&&-1===t.indexOf(e)})).join(", ")},wait:function(){return y.promise||(y.promise=Promise.resolve(),y.promise.then((function(){y.promise=null}))),y.promise}};function w(){return Object.create(null)}function k(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function x(t,e){return t!=t?e==e:t!==e}function F(t,e){var n=t in this._handlers&&this._handlers[t].slice();if(n)for(var i=0;i<n.length;i+=1){var o=n[i];if(!o.__calling)try{o.__calling=!0,o.call(this,e)}finally{o.__calling=!1}}}function N(t){t._lock=!0,E(t._beforecreate),E(t._oncreate),E(t._aftercreate),t._lock=!1}function C(){return this._state}function R(t,e){t._handlers=w(),t._slots=w(),t._bind=e._bind,t._staged={},t.options=e,t.root=e.root||t,t.store=e.store||t.root.store,e.root||(t._beforecreate=[],t._oncreate=[],t._aftercreate=[])}function T(t,e){var n=this._handlers[t]||(this._handlers[t]=[]);return n.push(e),{cancel:function(){var t=n.indexOf(e);~t&&n.splice(t,1)}}}function E(t){for(;t&&t.length;)t.shift()()}var L={destroy:function(e){this.destroy=t,this.fire("destroy"),this.set=t,this._fragment.d(!1!==e),this._fragment=null,this._state={}},get:C,fire:F,on:T,set:function(t){this._set(e({},t)),this.root._lock||N(this.root)},_recompute:t,_set:function(t){var n=this._state,i={},o=!1;for(var s in t=e(this._staged,t),this._staged={},t)this._differs(t[s],n[s])&&(i[s]=o=!0);o&&(this._state=e(e({},n),t),this._recompute(i,this._state),this._bind&&this._bind(i,this._state),this._fragment&&(this.fire("state",{changed:i,current:this._state,previous:n}),this._fragment.p(i,this._state),this.fire("update",{changed:i,current:this._state,previous:n})))},_stage:function(t){e(this._staged,t)},_mount:function(t,e){this._fragment[this._fragment.i?"i":"m"](t,e||null)},_differs:k};var z={width:"100px"};function M(t,e){var n;return{c:function(){m(n=l("label"),"width",e.width||z.width),n.className="control-label svelte-xyokw0",v(n,"disabled",e.disabled)},m:function(t,i){s(t,n,i),n.innerHTML=e.label},p:function(t,e){t.label&&(n.innerHTML=e.label),t.width&&m(n,"width",e.width||z.width),t.disabled&&v(n,"disabled",e.disabled)},d:function(t){t&&r(n)}}}function P(t,e){var n,i;return{c:function(){(n=l("p")).className=i="mini-help "+e.type+" svelte-xyokw0"},m:function(t,i){s(t,n,i),n.innerHTML=e.help},p:function(t,e){t.help&&(n.innerHTML=e.help),t.type&&i!==(i="mini-help "+e.type+" svelte-xyokw0")&&(n.className=i)},d:function(t){t&&r(n)}}}function A(t){var n,i,a,c,h,f,p,g,_,b,y;R(this,t),this._state=e({disabled:!1,help:!1,type:"default",valign:"baseline",inline:!1},t.data),this._intro=!0,this._slotted=t.slots||{},this._fragment=(n=this,i=this._state,_=n._slotted.default,b=i.label&&M(0,i),y=i.help&&P(0,i),{c:function(){a=l("div"),b&&b.c(),c=d("\n    "),h=l("div"),p=d("\n        "),y&&y.c(),h.className="controls svelte-xyokw0",m(h,"width","calc(100% - "+(i.width||z.width)+" - 40px)"),v(h,"form-inline",i.inline),a.className=g="control-group vis-option-group vis-option-group-"+i.type+" label-"+i.valign+" svelte-xyokw0"},m:function(t,e){s(t,a,e),b&&b.m(a,null),o(a,c),o(a,h),_&&(o(h,_),o(h,f||(f=u()))),o(h,p),y&&y.m(h,null)},p:function(t,e){e.label?b?b.p(t,e):((b=M(0,e)).c(),b.m(a,c)):b&&(b.d(1),b=null),e.help?y?y.p(t,e):((y=P(0,e)).c(),y.m(h,null)):y&&(y.d(1),y=null),t.width&&m(h,"width","calc(100% - "+(e.width||z.width)+" - 40px)"),t.inline&&v(h,"form-inline",e.inline),(t.type||t.valign)&&g!==(g="control-group vis-option-group vis-option-group-"+e.type+" label-"+e.valign+" svelte-xyokw0")&&(a.className=g)},d:function(t){t&&r(a),b&&b.d(),_&&function(t,e){for(var n=t.parentNode;n.firstChild!==t;)e.appendChild(n.firstChild)}(f,_),y&&y.d()}}),t.target&&(this._fragment.c(),this._mount(t.target,t.anchor))}function j(t){var e=t-1;return e*e*e+1}function H(t,e){var n=e.delay;void 0===n&&(n=0);var i=e.duration;void 0===i&&(i=400);var o=e.easing;void 0===o&&(o=j);var s=getComputedStyle(t),r=+s.opacity,a=parseFloat(s.height),l=parseFloat(s.paddingTop),d=parseFloat(s.paddingBottom),u=parseFloat(s.marginTop),c=parseFloat(s.marginBottom),h=parseFloat(s.borderTopWidth),f=parseFloat(s.borderBottomWidth);return{delay:n,duration:i,easing:o,css:function(t){return"overflow: hidden;opacity: "+Math.min(20*t,1)*r+";height: "+t*a+"px;padding-top: "+t*l+"px;padding-bottom: "+t*d+"px;margin-top: "+t*u+"px;margin-bottom: "+t*c+"px;border-top-width: "+t*h+"px;border-bottom-width: "+t*f+"px;"}}}function B(t,e){var n,i,p,m,v,g,_=!1,y=e.prepend&&O(t,e);function w(){_=!0,t.set({value:p.value}),_=!1}var k=e.append&&S(t,e),x={disabled:e.disabled,type:"text",width:e.width,label:e.label,help:e.help},F=new A({root:t.root,store:t.store,slots:{default:a()},data:x}),N=e.disabled&&e.disabled_msg&&W(t,e);return{c:function(){n=l("div"),y&&y.c(),i=d("\n        "),p=l("input"),m=d("\n        "),k&&k.c(),F._fragment.c(),v=d("\n\n"),N&&N.c(),g=u(),c(p,"input",w),p.disabled=e.disabled,f(p,"type","text"),p.className="input-large svelte-lyrczp",p.placeholder=e.placeholder,n.className="flex svelte-lyrczp"},m:function(t,r){o(F._slotted.default,n),y&&y.m(n,null),o(n,i),o(n,p),p.value=e.value,o(n,m),k&&k.m(n,null),F._mount(t,r),s(t,v,r),N&&N.i(t,r),s(t,g,r)},p:function(e,o){o.prepend?y?y.p(e,o):((y=O(t,o)).c(),y.m(n,i)):y&&(y.d(1),y=null),!_&&e.value&&(p.value=o.value),e.disabled&&(p.disabled=o.disabled),e.placeholder&&(p.placeholder=o.placeholder),o.append?k?k.p(e,o):((k=S(t,o)).c(),k.m(n,null)):k&&(k.d(1),k=null);var s={};e.disabled&&(s.disabled=o.disabled),e.width&&(s.width=o.width),e.label&&(s.label=o.label),e.help&&(s.help=o.help),F._set(s),o.disabled&&o.disabled_msg?(N?N.p(e,o):(N=W(t,o))&&N.c(),N.i(g.parentNode,g)):N&&(b.current={remaining:0,callbacks:[]},N.o((function(){N.d(1),N=null})))},d:function(t){y&&y.d(),h(p,"input",w),k&&k.d(),F.destroy(t),t&&r(v),N&&N.d(t),t&&r(g)}}}function O(t,e){var n,i;return{c:function(){n=l("div"),i=d(e.prepend),n.className="prepend"},m:function(t,e){s(t,n,e),o(n,i)},p:function(t,e){t.prepend&&p(i,e.prepend)},d:function(t){t&&r(n)}}}function S(t,e){var n,i;return{c:function(){n=l("div"),i=d(e.append),n.className="append"},m:function(t,e){s(t,n,e),o(n,i)},p:function(t,e){t.append&&p(i,e.append)},d:function(t){t&&r(n)}}}function W(t,e){var n,i,a,d;return{c:function(){n=l("div"),(i=l("div")).className="disabled-msg svelte-lyrczp"},m:function(t,r){s(t,n,r),o(n,i),i.innerHTML=e.disabled_msg,d=!0},p:function(t,e){d&&!t.disabled_msg||(i.innerHTML=e.disabled_msg)},i:function(e,i){d||(t.root._intro&&(a&&a.invalidate(),t.root._aftercreate.push((function(){a||(a=_(t,n,H,{},!0)),a.run(1)}))),this.m(e,i))},o:function(e){d&&(a||(a=_(t,n,H,{},!1)),a.run(0,(function(){e(),a=null})),d=!1)},d:function(t){t&&(r(n),a&&a.abort())}}}function q(t){R(this,t),this._state=e({disabled:!1,disabled_msg:"",width:"100px",help:"",placeholder:"",prepend:"",append:""},t.data),this._intro=!0,this._fragment=B(this,this._state),t.target&&(this._fragment.c(),this._mount(t.target,t.anchor),N(this))}function $(t){var e=t.changed,n=t.current,i=this.store.get().dw_chart;if(e.customFields&&n.customFields){var o=i.get("metadata.custom",{});n.customFields.forEach((function(t){o[t.key]||(o[t.key]="")})),this.set({custom:o,initialized:!0})}e.custom&&n.initialized&&(i.set("metadata.custom",n.custom),i.saveSoon&&i.saveSoon())}function D(t,e,n){var i=Object.create(t);return i.field=e[n],i}function G(t,e){var n,i,a,u,f,p,m=!e.notoggle&&I();function v(e){t.toggle()}for(var g=e.customFields,_=[],b=0;b<g.length;b+=1)_[b]=Q(t,D(e,g,b));return{c:function(){n=l("div"),i=l("label"),m&&m.c(),a=d(" Custom fields"),u=d("\n\n    "),f=l("div"),p=l("div");for(var t=0;t<_.length;t+=1)_[t].c();c(i,"click",v),i.className="group-title",f.className="option-group-content vis-option-type-chart-description",n.className="vis-option-type-group group-open"},m:function(e,r){s(e,n,r),o(n,i),m&&m.m(i,null),o(i,a),o(n,u),o(n,f),o(f,p);for(var l=0;l<_.length;l+=1)_[l].m(p,null);t.refs.customFields=p},p:function(e,n){if(n.notoggle?m&&(m.d(1),m=null):m||((m=I()).c(),m.m(i,a)),e.customFields||e.custom){g=n.customFields;for(var o=0;o<g.length;o+=1){var s=D(n,g,o);_[o]?_[o].p(e,s):(_[o]=Q(t,s),_[o].c(),_[o].m(p,null))}for(;o<_.length;o+=1)_[o].d(1);_.length=g.length}},d:function(e){e&&r(n),m&&m.d(),h(i,"click",v),function(t,e){for(var n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}(_,e),t.refs.customFields===p&&(t.refs.customFields=null)}}}function I(t,e){var n,i,o;return{c:function(){n=l("i"),i=d("\n        "),o=l("i"),n.className="fa fa-chevron-up expand-group pull-right",o.className="fa fa-chevron-down collapse-group pull-right"},m:function(t,e){s(t,n,e),s(t,i,e),s(t,o,e)},d:function(t){t&&(r(n),r(i),r(o))}}}function J(t,e){var n,i,o,a=!1;function d(){a=!0,e.custom[e.field.key]=n.value,t.set({custom:e.custom,customFields:e.customFields}),a=!1}return{c:function(){c(n=l("textarea"),"input",d),f(n,"labelwidth","auto"),f(n,"label",i=e.field.title),f(n,"help",o=e.field.description)},m:function(t,i){s(t,n,i),n.value=e.custom[e.field.key]},p:function(t,s){e=s,a||!t.custom&&!t.customFields||(n.value=e.custom[e.field.key]),t.customFields&&i!==(i=e.field.title)&&f(n,"label",i),t.customFields&&o!==(o=e.field.description)&&f(n,"help",o)},d:function(t){t&&r(n),h(n,"input",d)}}}function K(t,e){var n={},i={labelWidth:"auto",label:e.field.title,help:e.field.description};void 0!==e.custom[e.field.key]&&(i.value=e.custom[e.field.key],n.value=!0);var o=new q({root:t.root,store:t.store,data:i,_bind:function(i,o){var s={};!n.value&&i.value&&(e.custom[e.field.key]=o.value,s.custom=e.custom),t._set(s),n={}}});return t.root._beforecreate.push((function(){o._bind({value:1},o.get())})),{c:function(){o._fragment.c()},m:function(t,e){o._mount(t,e)},p:function(t,i){e=i;var s={};t.customFields&&(s.label=e.field.title),t.customFields&&(s.help=e.field.description),(!n.value&&t.custom||t.customFields)&&(s.value=e.custom[e.field.key],n.value=void 0!==e.custom[e.field.key]),o._set(s),n={}},d:function(t){o.destroy(t)}}}function Q(t,e){var n;function i(t){return"text"==t.field.type?K:"textArea"==t.field.type?J:void 0}var o=i(e),a=o&&o(t,e);return{c:function(){a&&a.c(),n=u()},m:function(t,e){a&&a.m(t,e),s(t,n,e)},p:function(e,s){o===(o=i(s))&&a?a.p(e,s):(a&&a.d(1),(a=o&&o(t,s))&&a.c(),a&&a.m(n.parentNode,n))},d:function(t){a&&a.d(t),t&&r(n)}}}function U(t){var i,o,a,l,d=this;R(this,t),this.refs={},this._state=e({customFields:[],custom:{},initialized:!1},t.data),this._intro=!0,this._handlers.state=[$],$.call(this,{changed:n({},this._state),current:this._state}),this._fragment=(i=this,o=this._state,l=o.customFields.length&&o.initialized&&G(i,o),{c:function(){l&&l.c(),a=u()},m:function(t,e){l&&l.m(t,e),s(t,a,e)},p:function(t,e){e.customFields.length&&e.initialized?l?l.p(t,e):((l=G(i,e)).c(),l.m(a.parentNode,a)):l&&(l.d(1),l=null)},d:function(t){l&&l.d(t),t&&r(a)}}),this.root._oncreate.push((function(){d.fire("update",{changed:n({},d._state),current:d._state})})),t.target&&(this._fragment.c(),this._mount(t.target,t.anchor),N(this))}function V(t,n){this._handlers={},this._dependents=[],this._computed=w(),this._sortedComputedProperties=[],this._state=e({},t),this._differs=n&&n.immutable?x:k}e(A.prototype,L),e(function(t){R(this,t),this._state=e({placeholder:""},t.data),this._intro=!0,this._fragment=function(t,e){var n,i=!1;function s(){i=!0,t.set({value:n.value}),i=!1}var r={disabled:e.disabled,type:"textarea",width:e.width,label:e.label,help:e.help},d=new A({root:t.root,store:t.store,slots:{default:a()},data:r});return{c:function(){n=l("textarea"),d._fragment.c(),c(n,"input",s),n.placeholder=e.placeholder,m(n,"width",e.width||"auto")},m:function(t,i){o(d._slotted.default,n),n.value=e.value,d._mount(t,i)},p:function(t,e){!i&&t.value&&(n.value=e.value),t.placeholder&&(n.placeholder=e.placeholder),t.width&&m(n,"width",e.width||"auto");var o={};t.disabled&&(o.disabled=e.disabled),t.width&&(o.width=e.width),t.label&&(o.label=e.label),t.help&&(o.help=e.help),d._set(o)},d:function(t){h(n,"input",s),d.destroy(t)}}}(this,this._state),t.target&&(this._fragment.c(),this._mount(t.target,t.anchor),N(this))}.prototype,L),e(q.prototype,L),e(U.prototype,L),e(V.prototype,{_add:function(t,e){this._dependents.push({component:t,props:e})},_init:function(t){for(var e={},n=0;n<t.length;n+=1){var i=t[n];e["$"+i]=this._state[i]}return e},_remove:function(t){for(var e=this._dependents.length;e--;)if(this._dependents[e].component===t)return void this._dependents.splice(e,1)},_set:function(t,n){var i=this,o=this._state;this._state=e(e({},o),t);for(var s=0;s<this._sortedComputedProperties.length;s+=1)this._sortedComputedProperties[s].update(this._state,n);this.fire("state",{changed:n,previous:o,current:this._state}),this._dependents.filter((function(t){for(var e={},o=!1,s=0;s<t.props.length;s+=1){var r=t.props[s];r in n&&(e["$"+r]=i._state[r],o=!0)}if(o)return t.component._stage(e),!0})).forEach((function(t){t.component.set({})})),this.fire("update",{changed:n,previous:o,current:this._state})},_sortComputedProperties:function(){var t,e=this._computed,n=this._sortedComputedProperties=[],i=w();function o(s){var r=e[s];r&&(r.deps.forEach((function(e){if(e===t)throw new Error("Cyclical dependency detected between "+e+" <-> "+s);o(e)})),i[s]||(i[s]=!0,n.push(r)))}for(var s in this._computed)o(t=s)},compute:function(t,n,i){var o,s=this,r={deps:n,update:function(e,r,a){var l=n.map((function(t){return t in r&&(a=!0),e[t]}));if(a){var d=i.apply(null,l);s._differs(d,o)&&(o=d,r[t]=!0,e[t]=o)}}};this._computed[t]=r,this._sortComputedProperties();var a=e({},this._state),l={};r.update(a,l,!0),this._set(a,l)},fire:F,get:C,on:T,set:function(t){var e=this._state,n=this._changed={},i=!1;for(var o in t){if(this._computed[o])throw new Error("'"+o+"' is a read-only computed property");this._differs(t[o],e[o])&&(n[o]=i=!0)}i&&this._set(t,n)}});return{App:U,data:{chart:{id:""}},store:new V({}),init:function(t){window.dw.backend.on("dataset-loaded",(function(){t.store.set({dataset:chart.dataset()})})).on("theme-changed-and-loaded",(function(){t.store.set({theme:window.dw.theme(chart.get("theme"))})})).on("backend-vis-loaded",(function(e){t.store.set({vis:e})}))}}}));
