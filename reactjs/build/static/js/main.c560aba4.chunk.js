(this.webpackJsonpreactjs=this.webpackJsonpreactjs||[]).push([[0],{10:function(e,t,r){},11:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n),o=r(3),c=r.n(o),i=r(1),l=(r(10),{light:{textPrimary:"#000000",textSecondary:"#4D4D4D",textDisabled:"#8E8E93",bgBase:"#F2F2F7",bgElevated:"#FFFFFF",separator:"#CECED9",red:"#FF3B30",orange:"#FF9500",yellow:"#FFCC00",green:"#34C759",blue:"#007AFF",purple:"#AF52DE"},dark:{textPrimary:"#FFFFFF",textSecondary:"#C6C6C8",textDisabled:"#8E8E93",bgBase:"#000000",bgElevated:"#1C1C1E",separator:"#4D4D4D",red:"#FF453A",orange:"#FF9F0A",yellow:"#FFD60A",green:"#32D74B",blue:"#0A84FF",purple:"#BF5AF2"}});function u(e){var t=l[e];for(var r in t)document.documentElement.style.setProperty("--".concat(r),t[r])}var s=r(4);function p(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}var F={theme:"light"},d=function(e,t){switch(t.type){case"themeSwitch":return u(t.payload),function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?p(r,!0).forEach((function(t){Object(s.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):p(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},e,{theme:t.payload});default:return e}},b=JSON.parse(localStorage.getItem("state")),m=Object(n.createContext)(),f=function(){return Object(n.useContext)(m)},h=function(e){e.children;var t=f(),r=Object(i.a)(t,2),n=r[0],o=r[1];return a.a.createElement("button",{onClick:function(){return o({type:"themeSwitch",payload:"dark"===n.theme?"light":"dark"})}},n.theme)};var y=function(){var e=f(),t=Object(i.a)(e,2),r=t[0];return t[1],u(r.theme),Object(n.useEffect)((function(){localStorage.setItem("state",JSON.stringify(r))}),[r]),a.a.createElement("div",{id:"App"},"Theme: ",a.a.createElement(h,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(a.a.createElement((function(e){var t=e.children;return a.a.createElement(m.Provider,{value:Object(n.useReducer)(d,b||F)},t)}),null,a.a.createElement(y,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},5:function(e,t,r){e.exports=r(11)}},[[5,1,2]]]);
//# sourceMappingURL=main.c560aba4.chunk.js.map