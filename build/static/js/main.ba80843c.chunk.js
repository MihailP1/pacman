(this.webpackJsonppacman=this.webpackJsonppacman||[]).push([[0],{10:function(e,t,n){},12:function(e,t,n){"use strict";n.r(t);var a=n(1),s=n.n(a),c=n(4),i=n.n(c),d=(n(9),n(2)),r=(n.p,n(10),n(0));function x(){var e=Object(a.useState)(),t=Object(d.a)(e,2),n=t[0],s=t[1],c=Object(a.useState)(),i=Object(d.a)(c,2),x=i[0],j=i[1],b=Object(a.useState)([]),o=Object(d.a)(b,2),O=o[0],u=o[1],f=Object(a.useState)(),h=Object(d.a)(f,2),l=h[0],m=h[1],p=Object(a.useState)([]),v=Object(d.a)(p,2),g=v[0],S=v[1],k=Object(a.useState)([]),N=Object(d.a)(k,2),I=N[0],_=N[1],y=Object(a.useState)(0),C=Object(d.a)(y,2),M=C[0],w=C[1],T=Object(a.useState)(),E=Object(d.a)(T,2),L=E[0],P=E[1],D=Object(a.useState)(),A=Object(d.a)(D,2),F=A[0],B=A[1],J=Object(a.useState)(1),G=Object(d.a)(J,2),R=G[0],V=G[1],q=Object(a.useState)(3),z=Object(d.a)(q,2),H=z[0],K=z[1],Q=Object(a.useState)(0),U=Object(d.a)(Q,2),W=U[0],X=U[1],Y=Object(a.useState)(),Z=Object(d.a)(Y,2),$=Z[0],ee=Z[1],te=Object(a.useState)(),ne=Object(d.a)(te,2),ae=ne[0],se=ne[1],ce=Object(a.useState)(1),ie=Object(d.a)(ce,2),de=ie[0],re=ie[1],xe=Object(a.useState)(3),je=Object(d.a)(xe,2),be=je[0],oe=je[1],Oe=Object(a.useState)(0),ue=Object(d.a)(Oe,2),fe=ue[0],he=ue[1],le=Object(a.useState)(),me=Object(d.a)(le,2),pe=me[0],ve=me[1],ge=Object(a.useState)(),Se=Object(d.a)(ge,2),ke=Se[0],Ne=Se[1],Ie=Object(a.useState)(1),_e=Object(d.a)(Ie,2),ye=_e[0],Ce=_e[1],Me=Object(a.useState)(3),we=Object(d.a)(Me,2),Te=we[0],Ee=we[1],Le=Object(a.useState)(0),Pe=Object(d.a)(Le,2),De=Pe[0],Ae=Pe[1],Fe=Object(a.useState)(),Be=Object(d.a)(Fe,2),Je=Be[0],Ge=Be[1],Re=Object(a.useState)(),Ve=Object(d.a)(Re,2),qe=Ve[0],ze=Ve[1],He=Object(a.useState)(1),Ke=Object(d.a)(He,2),Qe=Ke[0],Ue=Ke[1],We=Object(a.useState)(3),Xe=Object(d.a)(We,2),Ye=Xe[0],Ze=Xe[1],$e=Object(a.useState)(0),et=Object(d.a)($e,2),tt=et[0],nt=et[1],at=Object(a.useState)(1),st=Object(d.a)(at,2),ct=st[0],it=st[1],dt=Object(a.useState)(28),rt=Object(d.a)(dt,2),xt=rt[0];rt[1];Object(a.useLayoutEffect)((function(){function e(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e))+e}var t=function(t){var n=[],a=15;n.push(15);for(var s=[-2,2,2*-xt,2*+xt,-3,3,3*-xt,3*xt],c=0;c<t;c++){var i=e(0,4);switch(-1!==n.indexOf(a+s[i])&&(i=e(0,8)),-1!==n.indexOf(a+s[i])&&(i=e(0,8)),i){case 0:a%xt-1!==0&&(a-=1,n.push(a),a-=1,n.push(a));break;case 1:a%xt<xt-2&&(a+=1,n.push(a),a+=1,n.push(a));break;case 2:a-2*xt>=0&&(a-=xt,n.push(a),a-=xt,n.push(a));break;case 3:a+2*xt<xt*xt&&(a+=xt,n.push(a),a+=xt,n.push(a))}}for(var d=[],r=0;r<784;r++)-1!==n.indexOf(r)?d.push(0):d.push(1);return d.forEach((function(e,t){if(0===e){var n=0;0===d[t+1]&&n++,0===d[t-1]&&n++,0===d[t+28]&&n++,0===d[t-28]&&n++,n<1&&(d[t]=1)}})),d}(400),n=function(e){var t=[];return e.forEach((function(e,n){1===e&&t.push(n)})),t}(t);_(n),S(t);var a=[-1,1,xt,-xt];V(a[Math.floor(Math.random()*a.length)]),m("preparation")}),[]),Object(a.useLayoutEffect)((function(){if("preparation"===l){for(var e=0;e<200;e++)if(0===g[e]){P(e);break}for(var t=400;t>201;t--)if(0===g[t]){ee(t);break}for(var a=401;a<600;a++)if(0===g[a]){ve(a);break}for(var c=g.length;c>601;c--)if(0===g[c]){Ge(c);break}for(var i=301;i<500;i++)if(0===g[i]){s(i);break}u(function(){for(var e=[],t=0;t<g.length;t++)0===g[t]?e.push(Object(r.jsx)("div",{className:"pac-dot"},t)):1===g[t]&&e.push(Object(r.jsx)("div",{className:"wall"},t));function a(t){e[t]=Object(r.jsxs)("div",{className:"ghost",children:[Object(r.jsx)("div",{className:"left_eye"}),Object(r.jsx)("div",{className:"right_eye"})]},t)}return e[n]=Object(r.jsxs)("div",{className:"pac-man",children:[Object(r.jsx)("div",{className:"pacman_eye right_eye"}),Object(r.jsx)("div",{className:"pacman_mouth right_mouth"})]},n),a(L),a($),a(pe),a(Je),e}()),it(function(){for(var e=[],t=0;t<g.length;t++)0===g[t]&&e.push(t);return e}()),m("game")}else if("game"===l){var d=function(e){-1!==ct.indexOf(e.prevIndex)?O[e.prevIndex]=Object(r.jsx)("div",{className:"pac-dot"},e.prevIndex):-1===ct.indexOf(e.prevIndex)&&(O[e.prevIndex]=Object(r.jsx)("div",{},e.prevIndex)),e.setPrevIndex(e.index),O[e.index]=Object(r.jsxs)("div",{className:"ghost",children:[Object(r.jsx)("div",{className:"left_eye"}),Object(r.jsx)("div",{className:"right_eye"})]},e.index)};n!==L&&n!==$&&n!==pe&&n!==Je||m("game over");var j={index:$,prevIndex:ae,setPrevIndex:se},b={index:pe,prevIndex:ke,setPrevIndex:Ne},o={index:Je,prevIndex:qe,setPrevIndex:ze};if(d({index:L,prevIndex:F,setPrevIndex:B}),d(j),d(b),d(o),u(O),x!==n){-1!==ct.indexOf(n)&&(ct.splice(ct.indexOf(n),1),it(ct)),O[x]=Object(r.jsx)("div",{},x),n-x===1?O[n]=Object(r.jsxs)("div",{className:"pac-man",children:[Object(r.jsx)("div",{className:"pacman_eye right_eye"}),Object(r.jsx)("div",{className:"pacman_mouth right_mouth"})]},n):n-x===-1?O[n]=Object(r.jsxs)("div",{className:"pac-man",children:[Object(r.jsx)("div",{className:"pacman_eye left_eye"}),Object(r.jsx)("div",{className:"pacman_mouth left_mouth"})]},n):n-x===28?O[n]=Object(r.jsxs)("div",{className:"pac-man",children:[Object(r.jsx)("div",{className:"pacman_eye down_eye"}),Object(r.jsx)("div",{className:"pacman_mouth down_mouth"})]},n):n-x===-28?O[n]=Object(r.jsxs)("div",{className:"pac-man",children:[Object(r.jsx)("div",{className:"pacman_eye up_eye"}),Object(r.jsx)("div",{className:"pacman_mouth up_mouth"})]},n):void 0===x&&(O[n]=Object(r.jsxs)("div",{className:"pac-man",children:[Object(r.jsx)("div",{className:"pacman_eye right_eye"}),Object(r.jsx)("div",{className:"pacman_mouth right_mouth"})]},n)),u(O)}}})),Object(a.useLayoutEffect)((function(){if("game"===l){var e=function(e,t){var n=Math.floor(2*Math.random());var a=[-1,1,xt,-xt];function s(n){var s,c;e.steps!==e.stepsToChange?(t.setDirection(n),t.setSteps(e.steps+1)):e.steps===e.stepsToChange&&(t.setDirection(a[Math.floor(Math.random()*a.length)]),t.setStepToChange((s=2,c=3,s=Math.ceil(s),c=Math.floor(c),Math.floor(Math.random()*(c-s))+s)),t.setSteps(0))}switch(e.direction){case-1:if(e.index%xt!==0&&-1==I.indexOf(e.index-1)){t.setIndex(e.index-1),s(-1);break}if(0===n&&e.index-xt>=0&&-1==I.indexOf(e.index-xt)){t.setIndex(e.index-xt),s(-28);break}if(1===n&&e.index+xt<xt*xt&&-1==I.indexOf(e.index+xt)){t.setIndex(e.index+xt),s(28);break}if(e.index%xt<xt-1&&-1==I.indexOf(e.index+1)){t.setIndex(e.index+1),s(1);break}case-28:if(e.index-xt>=0&&-1==I.indexOf(e.index-xt)){t.setIndex(e.index-xt),s(-28);break}if(0===n&&e.index%xt<xt-1&&-1==I.indexOf(e.index+1)){t.setIndex(e.index+1),s(1);break}if(1===n&&e.index%xt!==0&&-1==I.indexOf(e.index-1)){t.setIndex(e.index-1),s(-1);break}if(e.index+xt<xt*xt&&-1==I.indexOf(e.index+xt)){t.setIndex(e.index+xt),s(28);break}case 1:if(e.index%xt<xt-1&&-1==I.indexOf(e.index+1)){t.setIndex(e.index+1),s(1);break}if(0===n&&e.index-xt>=0&&-1==I.indexOf(e.index-xt)){t.setIndex(e.index-xt),s(-28);break}if(1===n&&e.index+xt<xt*xt&&-1==I.indexOf(e.index+xt)){t.setIndex(e.index+xt),s(28);break}if(e.index%xt!==0&&-1==I.indexOf(e.index-1)){t.setIndex(e.index-1),s(-1);break}case 28:if(e.index+xt<xt*xt&&-1==I.indexOf(e.index+xt)){t.setIndex(e.index+xt),s(28);break}if(0===n&&e.index%xt<xt-1&&-1==I.indexOf(e.index+1)){t.setIndex(e.index+1),s(1);break}if(1===n&&e.index%xt!==0&&-1==I.indexOf(e.index-1)){t.setIndex(e.index-1),s(-1);break}if(e.index-xt>=0&&-1==I.indexOf(e.index-xt)){t.setIndex(e.index-xt),s(-28);break}}},t={index:L,direction:R,stepsToChange:H,steps:W},n={setIndex:P,setDirection:V,setStepToChange:K,setSteps:X},a={index:$,direction:de,stepsToChange:be,steps:fe},s={setIndex:ee,setDirection:re,setStepToChange:oe,setSteps:he},c={index:pe,direction:ye,stepsToChange:Te,steps:De},i={setIndex:ve,setDirection:Ce,setStepToChange:Ee,setSteps:Ae},d={index:Je,direction:Qe,stepsToChange:Ye,steps:tt},r={setIndex:Ge,setDirection:Ue,setStepToChange:Ze,setSteps:nt},x=setInterval((function(){e(t,n),e(a,s),e(c,i),e(d,r)}),100);return function(){clearInterval(x)}}})),Object(a.useLayoutEffect)((function(){if("game"===l){var e=function(e){switch(e.keyCode){case 37:n%xt!==0&&-1===I.indexOf(n-1)&&(j(n),s(n-1),w(M+1));break;case 38:n-xt>0&&-1===I.indexOf(n-xt)&&(j(n),s(n-xt),w(M+1));break;case 39:n%xt<xt-1&&-1===I.indexOf(n+1)&&(j(n),s(n+1),w(M+1));break;case 40:n+xt<xt*xt&&-1===I.indexOf(n+xt)&&(j(n),s(n+xt),w(M+1))}};return 0===ct.length&&m("game over"),document.addEventListener("keyup",e),function(){document.removeEventListener("keyup",e)}}}));var jt,bt,ot=function(e){switch(e.target.className){case"left":n%xt!==0&&-1===I.indexOf(n-1)&&(j(n),s(n-1));break;case"up":n-xt>0&&-1===I.indexOf(n-xt)&&(j(n),s(n-xt));break;case"right":n%xt<xt-1&&-1===I.indexOf(n+1)&&(j(n),s(n+1));break;case"down":n+xt<xt*xt&&-1===I.indexOf(n+xt)&&(j(n),s(n+xt))}},Ot="change map";return"game over"!==l?(jt=Object(r.jsx)("div",{className:"grid",children:O}),bt=Object(r.jsxs)("div",{className:"movement_buttons",children:[Object(r.jsx)("button",{className:"up",onClick:function(e){return ot(e)},children:"\u2191"}),Object(r.jsxs)("div",{children:[Object(r.jsx)("button",{className:"left",onClick:function(e){return ot(e)},children:"\u2190"}),Object(r.jsx)("button",{className:"down",onClick:function(e){return ot(e)},children:"\u2193"}),Object(r.jsx)("button",{className:"right",onClick:function(e){return ot(e)},children:"\u2192"})]})]})):"game over"===l&&(jt=Object(r.jsx)("div",{className:"gameover_text",children:"GAME OVER"}),Ot="new game"),Object(r.jsxs)("div",{className:"game",children:[jt,Object(r.jsxs)("div",{className:"game_data",children:["dots left: ",ct.length]}),Object(r.jsx)("button",{className:"change_map_button",onClick:function(){return window.location.reload()},children:Ot}),bt]})}var j=function(){return Object(r.jsxs)("div",{className:"App",children:[Object(r.jsx)("h1",{children:"PACMAN"}),Object(r.jsx)(x,{})]})},b=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,13)).then((function(t){var n=t.getCLS,a=t.getFID,s=t.getFCP,c=t.getLCP,i=t.getTTFB;n(e),a(e),s(e),c(e),i(e)}))};i.a.render(Object(r.jsx)(s.a.StrictMode,{children:Object(r.jsx)(j,{})}),document.getElementById("root")),b()},9:function(e,t,n){}},[[12,1,2]]]);
//# sourceMappingURL=main.ba80843c.chunk.js.map