(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},19:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(13),u=t.n(c),o=(t(19),t(2)),l=function(e){var n=e.handleFilter,t=e.filter;return r.a.createElement("form",null,r.a.createElement("div",null,"filter shown with ",r.a.createElement("input",{value:t,onChange:n})))},i=function(e){return r.a.createElement("form",null,r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:e.newName,onChange:e.handleNewName}),r.a.createElement("br",null),"number: ",r.a.createElement("input",{value:e.newNumber,onChange:e.handleNewNumber})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit",onClick:e.handleAdd},"add")))},m=function(e){var n=e.persons,t=e.handleDelete;return r.a.createElement("div",null,n.map((function(e){return r.a.createElement("p",{key:e.name},e.name," ",e.number,r.a.createElement("button",{onClick:function(){return t(e.id)}},"delete"))})))},f=t(3),d=t.n(f),s="/api/persons",h=function(){return d.a.get(s).then((function(e){return e.data}))},b=function(e){return d.a.post(s,e).then((function(e){return e.data}))},p=function(e,n){return d.a.put("".concat(s,"/").concat(e),n).then((function(e){return e.data}))},v=function(e){return d.a.delete("".concat(s,"/").concat(e)).then((function(e){return e.data}))},E=function(e){var n=e.message;if(null===n)return null;console.log("notification",n);var t="notification "+n.type;return r.a.createElement("div",{className:t},n.message)},w=function(){var e=Object(a.useState)(""),n=Object(o.a)(e,2),t=n[0],c=n[1],u=Object(a.useState)(""),f=Object(o.a)(u,2),d=f[0],s=f[1],w=Object(a.useState)([]),g=Object(o.a)(w,2),N=g[0],j=g[1],y=Object(a.useState)(""),O=Object(o.a)(y,2),k=O[0],S=O[1],C=Object(a.useState)(null),D=Object(o.a)(C,2),A=D[0],F=D[1];Object(a.useEffect)((function(){console.log("effect"),h().then((function(e){j(e)}))}),[]);var J=N.filter((function(e){return e.name.includes(k)}));return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(E,{message:A}),r.a.createElement(l,{handleFilter:function(e){return S(e.target.value)},filter:k}),r.a.createElement("h2",null,"add new contact"),r.a.createElement(i,{handleAdd:function(e){e.preventDefault();var n=N.find((function(e){return e.name===t.trim()}));if(n)!function(e){var n=N.find((function(n){return n.id===e})).name+" is already in the phonebook, do you want to replace their old number with a new number?";if(window.confirm(n)){var a={name:t,number:d};p(e,a).then((function(n){j(N.filter((function(n){return n.id!==e})).concat(n)),F({type:"success",message:"Replaced "+a.name})})).catch((function(e){F({type:"error",message:"Error "+a.name+" already removed from server"})}))}}(n.id);else{var a={name:t.trim(),number:d.trim()};b(a).then((function(e){j(N.concat(e)),c(""),s(""),F({type:"success",message:"Added "+a.name})})).catch((function(e){console.log(e.response.data);var n={type:"error",message:e.response.data.error};F(n)}))}},newName:t,handleNewName:function(e){return c(e.target.value)},newNumber:d,handleNewNumber:function(e){return s(e.target.value)}}),r.a.createElement("h2",null,"contacts"),r.a.createElement(m,{persons:J,handleDelete:function(e){console.log(N.find((function(n){return n.id===e})).name);var n="Delete "+N.find((function(n){return n.id===e})).name+"?";window.confirm(n)&&v(e).then((function(n){j(N.filter((function(n){return n.id!==e})))}))}}))};u.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(w,null)),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.84dd0741.chunk.js.map