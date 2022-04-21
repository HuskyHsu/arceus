var G=Object.defineProperty,K=Object.defineProperties;var U=Object.getOwnPropertyDescriptors;var P=Object.getOwnPropertySymbols;var W=Object.prototype.hasOwnProperty,q=Object.prototype.propertyIsEnumerable;var S=(e,r,n)=>r in e?G(e,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[r]=n,h=(e,r)=>{for(var n in r||(r={}))W.call(r,n)&&S(e,n,r[n]);if(P)for(var n of P(r))q.call(r,n)&&S(e,n,r[n]);return e},x=(e,r)=>K(e,U(r));import{j as A,O as Z,c as u,r as s,L as C,u as J,R as Q,a as F,b as V,H as X}from"./vendor.783ddbdf.js";const Y=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))a(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const o of c.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerpolicy&&(c.referrerPolicy=l.referrerpolicy),l.crossorigin==="use-credentials"?c.credentials="include":l.crossorigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function a(l){if(l.ep)return;l.ep=!0;const c=n(l);fetch(l.href,c)}};Y();const t=A.exports.jsx,i=A.exports.jsxs,g=A.exports.Fragment;function M(){return t(Z,{})}var L=(e=>(e.\u87F2="from-type-bug/60",e.\u60E1="from-type-dark/60",e.\u9F8D="from-type-dragon/60",e.\u96FB="from-type-electric/60",e.\u5996\u7CBE="from-type-fairy/60",e.\u683C\u9B25="from-type-fighting/60",e.\u706B="from-type-fire/60",e.\u98DB\u884C="from-type-flying/60",e.\u5E7D\u9748="from-type-ghost/60",e.\u8349="from-type-grass/60",e.\u5730\u9762="from-type-ground/60",e.\u51B0="from-type-ice/60",e.\u4E00\u822C="from-type-normal/60",e.\u6BD2="from-type-poison/60",e.\u8D85\u80FD\u529B="from-type-psychic/60",e.\u5CA9\u77F3="from-type-rock/60",e.\u92FC="from-type-steel/60",e.\u6C34="from-type-water/60",e))(L||{}),O=(e=>(e.\u87F2="before:from-type-bug",e.\u60E1="before:from-type-dark",e.\u9F8D="before:from-type-dragon",e.\u96FB="before:from-type-electric",e.\u5996\u7CBE="before:from-type-fairy",e.\u683C\u9B25="before:from-type-fighting",e.\u706B="before:from-type-fire",e.\u98DB\u884C="before:from-type-flying",e.\u5E7D\u9748="before:from-type-ghost",e.\u8349="before:from-type-grass",e.\u5730\u9762="before:from-type-ground",e.\u51B0="before:from-type-ice",e.\u4E00\u822C="before:from-type-normal",e.\u6BD2="before:from-type-poison",e.\u8D85\u80FD\u529B="before:from-type-psychic",e.\u5CA9\u77F3="before:from-type-rock",e.\u92FC="before:from-type-steel",e.\u6C34="before:from-type-water",e.\u900F\u660E="before:from-transparent",e))(O||{}),R=(e=>(e.\u87F2="to-type-bug/60",e.\u60E1="to-type-dark/60",e.\u9F8D="to-type-dragon/60",e.\u96FB="to-type-electric/60",e.\u5996\u7CBE="to-type-fairy/60",e.\u683C\u9B25="to-type-fighting/60",e.\u706B="to-type-fire/60",e.\u98DB\u884C="to-type-flying/60",e.\u5E7D\u9748="to-type-ghost/60",e.\u8349="to-type-grass/60",e.\u5730\u9762="to-type-ground/60",e.\u51B0="to-type-ice/60",e.\u4E00\u822C="to-type-normal/60",e.\u6BD2="to-type-poison/60",e.\u8D85\u80FD\u529B="to-type-psychic/60",e.\u5CA9\u77F3="to-type-rock/60",e.\u92FC="to-type-steel/60",e.\u6C34="to-type-water/60",e))(R||{}),_=(e=>(e.\u87F2="before:to-type-bug",e.\u60E1="before:to-type-dark",e.\u9F8D="before:to-type-dragon",e.\u96FB="before:to-type-electric",e.\u5996\u7CBE="before:to-type-fairy",e.\u683C\u9B25="before:to-type-fighting",e.\u706B="before:to-type-fire",e.\u98DB\u884C="before:to-type-flying",e.\u5E7D\u9748="before:to-type-ghost",e.\u8349="before:to-type-grass",e.\u5730\u9762="before:to-type-ground",e.\u51B0="before:to-type-ice",e.\u4E00\u822C="before:to-type-normal",e.\u6BD2="before:to-type-poison",e.\u8D85\u80FD\u529B="before:to-type-psychic",e.\u5CA9\u77F3="before:to-type-rock",e.\u92FC="before:to-type-steel",e.\u6C34="before:to-type-water",e))(_||{});const j=([e,r],n=!1)=>{const a=L[e],l=R[r!=null?r:e],c=O[e],o=_[r!=null?r:e];return n?u("bg-gradient-to-b",c,o):u("bg-gradient-to-b",a,l)},w="/arceus/";function B({pm:e}){const r="absolute transform inset-1/2 -translate-x-1/2 -translate-y-1/2",n=`${w}image/icon/${e.link}.png`;return t("header",{className:"w-24 h-24 relative",children:t("div",{className:u("outline-white",j(e.types),"w-20 h-20 rounded-full outline-0 overflow-hidden","group-hover:outline group-hover:outline-4",r,"transition-all"),children:t("img",{src:n,loading:"lazy",alt:"",className:u("max-w-none w-24 rounded-full",r)})})})}var N=(e=>(e.\u87F2="Bug",e.\u60E1="Dark",e.\u9F8D="Dragon",e.\u96FB="Electric",e.\u5996\u7CBE="Fairy",e.\u683C\u9B25="Fighting",e.\u706B="Fire",e.\u98DB\u884C="Flying",e.\u5E7D\u9748="Ghost",e.\u8349="Grass",e.\u5730\u9762="Ground",e.\u51B0="Ice",e.\u4E00\u822C="Normal",e.\u6BD2="Poison",e.\u8D85\u80FD\u529B="Psychic",e.\u5CA9\u77F3="Rock",e.\u92FC="Steel",e.\u6C34="Water",e))(N||{});const b=({type:e,className:r="w-5 h-5",button:n=!1,clickFn:a=()=>{}})=>n?t("button",{type:"button",onClick:a,children:t("img",{src:`${w}image/type/${N[e]}.svg`,alt:e,className:r},e)}):t("img",{src:`${w}image/type/${N[e]}.svg`,alt:e,className:r},e),T=e=>s.exports.createElement("svg",h({viewBox:"0 0 24 24",fill:"none",width:"1em",height:"1em"},e),s.exports.createElement("path",{d:"M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z",stroke:"currentColor",strokeWidth:3,strokeLinecap:"round",strokeLinejoin:"round"})),ee=e=>s.exports.createElement("svg",h({fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em"},e),s.exports.createElement("path",{fillRule:"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",clipRule:"evenodd"}));async function I(e){return await(await fetch(e)).json()}function te(){const[e,r]=s.exports.useState([]),n=async()=>await I(`${w}data/pokemon.json`),a=l=>{for(let c of l)c.locations=new Set(c.locations);return l};return s.exports.useEffect(()=>{(async()=>{let l=await n();l=a(l),r(l)})()},[]),e}function re(){const[e,r]=s.exports.useState({types:$,keyword:"",area:"\u5168\u5340\u57DF",areaSelector:!1});return{filter:e,updateKeywordFilter:o=>{r(m=>x(h({},m),{keyword:o}))},updateTypeFilter:o=>{r(m=>{let{types:y}=m;return Object.values(y).every(p=>p)?y=x(h({},ne),{[o]:!0}):(y=x(h({},y),{[o]:!y[o]}),Object.values(y).every(p=>!p)&&(y=h({},$))),x(h({},m),{types:y})})},toggereAreaSelect:()=>{r(o=>x(h({},o),{areaSelector:!o.areaSelector}))},updateAreaSelect:o=>{r(m=>x(h({},m),{area:o,areaSelector:!1}))}}}const ne=Object.keys(N).reduce((e,r)=>(e[r]=!1,e),{}),$=Object.keys(N).reduce((e,r)=>(e[r]=!0,e),{}),z=e=>("000"+e).slice(-3);function ae({pm:e,filter:r}){var a;let n=!1;return r.keyword!==""&&(n=!e.name.includes(r.keyword)),!n&&r.area!=="\u5168\u5340\u57DF"&&(n=!((a=e.locations)==null?void 0:a.has(r.area))||!1),!n&&Object.values(r.types).some(l=>!l)&&(n=e.types.find(l=>r.types[l])===void 0),n}function le({pm:e}){return e.types.length===1?t(b,{type:e.types[0]}):t("li",{className:"flex gap-1",children:i(g,{children:[t(b,{type:e.types[0]}),t(b,{type:e.types[1]})]})})}function ie({pm:e}){return i("li",{className:u("flex flex-col items-center gap-y-1","text-lg font-medium leading-none group-hover:text-white transition-all"),children:[e.name,e.altForm&&t("span",{className:"text-xs font-thin",children:`(${e.altForm})`})]})}function ce({pm:e}){const{filter:r}=s.exports.useContext(k),n=ae({pm:e,filter:r});return i(C,{to:`/${e.link}`,className:u("group px-2 md:px-4 py-2 drop-shadow-md","hover:drop-shadow-xl","before:opacity-0 before:absolute before:inset-0 before:rounded-md","before:bg-gradient-to-b",j(e.types.slice(0).reverse(),!0),"before:hover:opacity-60 before:-z-10 before:transition-opacity before:duration-500",{hidden:n}),children:[t(B,{pm:e}),i("ul",{className:u("h-24 z-0 flex flex-col justify-start items-center gap-y-2","text-gray-700 group-hover:text-white"),children:[i("li",{className:"text-sm leading-none",children:["#",z(e.id)]}),t(le,{pm:e}),t(ie,{pm:e})]})]})}const oe={"0":"\u795D\u6176\u6751","1":"\u9ED1\u66DC\u539F\u91CE","2":"\u7D05\u84EE\u6FD5\u5730","3":"\u7FA4\u9752\u6D77\u5CB8","4":"\u5929\u51A0\u5C71\u9E93","5":"\u7D14\u767D\u51CD\u571F","-1":"\u5168\u5340\u57DF"};var v={area:oe,\u795D\u6176\u6751:["\u9280\u6CB3\u968A\u7E3D\u90E8","\u8863\u92EA","\u7406\u9AEE\u5E97","\u7167\u76F8\u9928","\u96DC\u8CA8\u5E97","\u8A13\u7DF4\u5834","\u8FB2\u5834","\u9280\u674F\u5546\u6703","\u8D77\u59CB\u6D77\u7058"],\u9ED1\u66DC\u539F\u91CE:["\u5927\u5FD7\u5761","\u8E44\u9435\u8349\u539F","\u89D2\u9E7F\u5C71\u9053","\u89D2\u9E7F\u9AD8\u5D17","\u9ED1\u66DC\u7011\u5E03","\u9ED1\u91D1\u96A7\u9053","\u68EE\u6797\u81B3\u623F","\u82D4\u5CA9","\u6DF1\u5E7D\u68EE\u6797","\u96AA\u6797","\u5FC3\u9F4A\u6E56","\u5FC3\u9F4A\u6E56\u6D1E\u7A9F","\u771F\u7802\u5E73\u539F","\u6CB3\u53E3\u5824\u5830","\u8352\u5712\u958B\u58BE\u5730","\u73AB\u7470\u5CF6","\u99B3\u98A8\u9053","\u524A\u77F3\u6A4B","\u5DE8\u6728\u6230\u5834"],\u7D05\u84EE\u6FD5\u5730:["\u91D1\u8272\u5E73\u91CE","\u5927\u5634\u6CBC\u6FA4","\u6CE5\u70AD\u53F0\u5730","\u7DCB\u7D05\u6CBC","\u9686\u9686\u5761","\u7ACB\u5FD7\u6E56","\u7ACB\u5FD7\u6E56\u6D1E\u7A9F","\u96F2\u6D77\u5C71\u9053","\u8A66\u7149\u6C99\u6D32","\u7FBD\u97F3\u539F\u91CE","\u7F8A\u9B0D\u8349\u539F","\u91D1\u525B\u5F8C\u5C71","\u718A\u7684\u6BD4\u6B66\u5834","\u96A8\u610F\u907A\u8DE1","\u96F2\u9727\u907A\u8DE1","\u91D1\u525B\u805A\u843D","\u821E\u53F0\u6230\u5834"],\u7FA4\u9752\u6D77\u5CB8:["\u901A\u6D77\u5761","\u9280\u674F\u6C99\u7058","\u9B3C\u67AF\u539F","\u5F8C\u6D66","\u6C99\u6D32\u9053","\u5E37\u5E55\u6D77\u89D2","\u6D77\u8349\u6A02\u5712","\u5439\u706B\u5CF6","\u96B1\u6CC9\u4E4B\u8DEF","\u6B78\u9014\u6D1E\u7A9F","\u5927\u9B5A\u96B1\u5CA9","\u671B\u5CF6\u7058","\u8FCE\u98A8\u6797","\u6F6E\u8DEF","\u6D77\u908A\u5C0F\u6D1E","\u706B\u5C71\u53E3\u7960","\u6C99\u624B","\u96E2\u6563\u77F3\u7058","\u9577\u5C3E\u602A\u624B\u5C71","\u5BE7\u975C\u7063","\u6232\u6C34\u6F5F\u6E56","\u963F\u8292\u7684\u5BB6","\u7194\u5CA9\u6230\u5834"],\u5929\u51A0\u5C71\u9E93:["\u795E\u524D\u9AD8\u5D17","\u8FF7\u5931\u5C71\u6797","\u53E4\u4EE3\u63A1\u77F3\u5834","\u795E\u95D4\u5C71\u9053","\u96E2\u6CC9","\u5996\u7CBE\u4E4B\u6CC9","\u9686\u9686\u5C71\u5730","\u5217\u77F3\u5C71\u9053","\u592A\u53E4\u6D1E\u7A74","\u6500\u5D16\u5D16","\u795E\u95D4\u5BFA\u9662\u907A\u5740","\u5CA9\u9580","\u8FF7\u5E7B\u6D1E\u7A9F","\u7B20\u96F2\u9310\u9053","\u5DE1\u79AE\u8005\u4E4B\u8DEF","\u7948\u79B1\u5EE3\u5834","\u795E\u5967\u795E\u6BBF","\u8FCE\u6708\u6230\u5834"],\u7D14\u767D\u51CD\u571F:["\u96EA\u6FE4\u8C37","\u51B0\u9699\u5C0F\u5F91","\u9177\u5BD2\u8352\u5730","\u51B0\u5CA9\u584A","\u51B0\u6CB3\u968E\u5761","\u5FC3\u5F62\u5CA9\u5C71","\u51B0\u9B3C\u7011","\u51AC\u87C4\u6D1E\u7A74","\u96EA\u5D29\u5761","\u5F80\u6230\u5834\u7684\u8DEF","\u51B0\u67F1\u7A9F","\u51CD\u77F3","\u51B0\u5C71\u5730\u4E0B\u9053","\u79D8\u5BC6\u5C0F\u6D1E","\u89C0\u96EA\u6EAB\u6CC9","\u777F\u667A\u6E56","\u777F\u667A\u6E56\u6D1E\u7A9F","\u96EA\u5CF0\u795E\u6BBF","\u73CD\u73E0\u805A\u843D","\u51B0\u5C71\u6230\u5834"]};function ue(){const{filter:e,toggereAreaSelect:r,updateAreaSelect:n}=s.exports.useContext(k);return i("div",{className:"relative",children:[i("button",{type:"button",className:"w-32 flex justify-evenly bg-white rounded-full shadow px-2 py-1",onClick:()=>r(),children:[t("span",{children:e.area}),t(ee,{className:"h-6 w-6"})]}),t("ul",{className:u("absolute z-20 w-32 mt-4 px-2 flex flex-col justify-center","bg-white rounded-md shadow-md border-2",{hidden:!e.areaSelector}),children:Object.keys(v.area).sort().map((a,l,c)=>t("li",{className:u("py-2 hover:bg-gray-200 text-center","transition-colors duration-200 transform cursor-pointer",{"border-b-2":l!==c.length-1}),onClick:()=>n(v.area[a]),children:v.area[a]},a))})]})}function se(){const{filter:e,updateKeywordFilter:r}=s.exports.useContext(k);function n(a){r(a.currentTarget.value)}return i(g,{children:[i("span",{className:"w-full flex items-center gap-2",children:[t(T,{className:"w-5 h-5 text-gray-400"}),t("input",{type:"text",className:"w-full bg-gray-100 focus:outline-0",placeholder:"Search",onChange:n,value:e.keyword})]}),t(ue,{})]})}function de(){const{filter:e,updateTypeFilter:r}=s.exports.useContext(k);return t("form",{onSubmit:a=>{a.preventDefault()},children:i("ul",{className:"flex flex-col items-center gap-y-8",children:[t("li",{className:u("w-full max-w-xl flex items-center gap-2 px-4 py-2 justify-between","rounded-full bg-gray-100 shadow-inner shadow-gray-700"),children:t(se,{})}),t("li",{className:"w-full md:w-5/6 flex flex-wrap justify-center items-center gap-4",children:Object.keys(N).map(a=>t(b,{type:a,className:u("w-8 h-8",{"opacity-30":!e.types[a]}),button:!0,clickFn:()=>r(a)},a))})]})})}const k=s.exports.createContext({});function pe({pokemonList:e}){return t(g,{children:e.map(r=>t(ce,{pm:r},`${r.link}`))})}function ye({pokemonList:e,filterModel:r}){return t(k.Provider,{value:r,children:i("article",{className:"flex flex-col justify-center items-center my-16 gap-8",children:[t("section",{className:"w-5/6 max-w-5xl",children:t(de,{})}),t("section",{className:u("flex justify-center items-center flex-wrap content-center","gap-x-2 gap-y-4 w-full md:w-5/6 max-w-5xl"),children:t(pe,{pokemonList:e})})]})})}function he({pokemon:e}){return e.types.length===0?t(g,{}):t("ul",{className:"flex gap-2 h-6",children:e.types.map(r=>i("li",{className:u("flex gap-2 pr-2 rounded-sm items-center","bg-slate-600 text-slate-100"),children:[t(b,{type:r,className:"w-6 h-6"}),t("span",{className:"",children:r})]},r))})}function fe({pokemon:e}){return i("ul",{className:"flex flex-col items-center gap-1",children:[t("li",{className:u("w-64 h-64 rounded-2xl",j(e.types)),children:t("img",{src:e.genderDiff?e.imgPath.m:e.imgPath.g,alt:"",className:"w-full"})}),t("li",{children:e.name}),i("li",{className:"text-sm leading-none",children:["#",z(e.id)]}),t("li",{className:"flex gap-1",children:t(he,{pokemon:e})})]})}const d=100,D=[d*1.4,d*1.4],f=(e,r)=>{const n=e*2*Math.PI/360;return[D[0]+r*Math.cos(n),D[1]+r*Math.sin(n)]},E=({deg:e})=>{const r=f(e,d),n=f(e+180,d);return t("line",{x1:r[0],y1:r[1],x2:n[0],y2:n[1],stroke:"#FFFFFF",strokeWidth:"2"})},me=({deg:e,text:r,value:n})=>{const a=f(e,d*1.1);return i(g,{children:[t("text",{x:a[0],y:a[1]-3,fontSize:"0.5em",textAnchor:"middle",children:r}),t("text",{x:a[0],y:a[1]+7,fontSize:"0.5em",textAnchor:"middle",children:n})]})};function ge({stats:[e,r,n,a,l,c]}){const o=[...Array(6).keys()].map((p,H)=>30+H*60).map(p=>f(p,d)),m=[f(270,e*d/255),f(330,r*d/165),f(30,n*d/200),f(90,c*d/150),f(150,l*d/200),f(210,a*d/165)],y=[{name:"HP",value:e,deg:270},{name:"\u653B\u64CA",value:r,deg:330},{name:"\u9632\u79A6",value:n,deg:30},{name:"\u901F\u5EA6",value:c,deg:90},{name:"\u7279\u9632",value:l,deg:150},{name:"\u7279\u653B",value:a,deg:210}];return i("svg",{className:"w-full h-auto",viewBox:`0 0 ${D[0]*2} ${D[1]*2}`,children:[t("polygon",{points:o.flat().join(", "),fill:"#e9e9e9"}),i("g",{children:[t(E,{deg:-30}),t(E,{deg:30}),t(E,{deg:90})]}),t("polygon",{points:m.flat().join(", "),fill:"#339DDF",fillOpacity:"0.6"}),t("g",{children:y.map(p=>t(me,{text:p.name,value:p.value,deg:p.deg},p.deg))})]})}function xe({pokemon:e}){return i(g,{children:[t("h3",{className:"text-xl",children:"\u7A2E\u65CF\u503C"}),i("ul",{className:"flex flex-col items-center",children:[t("li",{className:"w-60",children:t(ge,{stats:e.stats})}),i("li",{children:["total\uFF1A",e.stats.reduce((r,n)=>r+n,0)]})]})]})}function be({pokemon:e}){return i(g,{children:[t("h2",{className:"mt-2 text-xl font-semibold text-gray-800 md:mt-0 md:text-lg",children:"\u7372\u5F97\u65B9\u5F0F"}),i("table",{className:"table-auto w-full text-left text-sm whitespace-no-wrap",children:[t("thead",{children:i("tr",{children:[t("th",{className:"px-2 py-1 title-font tracking-wider text-gray-900 bg-gray-100",children:"\u5730\u9EDE"}),t("th",{className:"px-2 py-1 title-font tracking-wider text-gray-900 bg-gray-100",children:"\u65B9\u5F0F"}),t("th",{className:"px-2 py-1 title-font tracking-wider text-gray-900 bg-gray-100",children:"\u689D\u4EF6"})]})}),t("tbody",{children:e.getMethods.map((r,n)=>i("tr",{children:[t("td",{className:"border-t-2 border-gray-200 px-2 py-1",children:r.location&&(typeof r.location=="string"?r.location:Object.entries(r.location).map(([a,l])=>t("p",{children:`${a}\uFF1A${l.join(",")}`},a)))}),t("td",{className:"border-t-2 border-gray-200 px-2 py-1",children:r.mode}),t("td",{className:"border-t-2 border-gray-200 px-2 py-1",children:r.remark})]},n))})]})]})}function we({pokemon:e}){return i(g,{children:[t("h2",{className:"mt-2 text-xl font-semibold text-gray-800 md:mt-0 md:text-lg",children:"\u651C\u5E36\u9053\u5177"}),i("table",{className:"table-auto w-full text-left text-sm whitespace-no-wrap",children:[t("thead",{children:i("tr",{children:[t("th",{className:"px-2 py-1 title-font tracking-wider text-gray-900 bg-gray-100",children:"\u4F86\u6E90"}),t("th",{className:"px-2 py-1 title-font tracking-wider text-gray-900 bg-gray-100",children:"\u9053\u5177\u540D\u7A31"}),t("th",{className:"px-2 py-1 title-font tracking-wider text-gray-900 bg-gray-100",children:"\u6A5F\u7387(%)"})]})}),t("tbody",{children:e.items.map((r,n)=>i("tr",{children:[t("td",{className:"border-t-2 border-gray-200 px-2 py-1",children:r.boss?"\u982D\u76EE":"\u4E00\u822C"}),t("td",{className:"border-t-2 border-gray-200 px-2 py-1",children:r.name}),i("td",{className:"border-t-2 border-gray-200 px-2 py-1",children:[r["%"],"%"]})]},n))})]})]})}const Ne=async e=>await I(`${w}data/pokemon/${e}.json`),ke=e=>{const r=`${w}image/pokemon/${e.link}`;let n=null;return e.genderDiff?n={m:`${r}_m.png`,f:`${r}_f.png`,m_s:`${r}_m_s.png`,f_s:`${r}_f_s.png`}:n={g:`${r}.png`,g_s:`${r}_s.png`},n};function De(){let{link:e="722"}=J();const[r,n]=s.exports.useState({id:0,pid:0,name:"",types:[],genderDiff:!1,getMethods:[],stats:[0,0,0,0,0,0],items:[],link:"",learnset:{levelingUp:[],tutoring:[]},previous:{id:0,pid:0,name:"",types:[],genderDiff:!1,link:""},next:{id:0,pid:0,name:"",types:[],genderDiff:!1,link:""},imgPath:{}});return s.exports.useEffect(()=>{(async()=>{const a=await Ne(e);a.imgPath=ke(a),n(a)})()},[]),t("article",{className:"flex flex-col justify-center items-center my-16",children:i("article",{className:"w-5/6 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8",children:[t("section",{className:"max-w-md w-full px-4 py-4 mx-auto bg-slate-400/10 rounded-lg shadow-lg",children:t(fe,{pokemon:r})}),t("section",{className:"max-w-md w-full px-4 py-4 mx-auto bg-slate-400/10 rounded-lg shadow-lg",children:t(xe,{pokemon:r})}),t("section",{className:"max-w-md w-full px-4 py-4 mx-auto bg-slate-400/10 rounded-lg shadow-lg",children:t(be,{pokemon:r})}),t("section",{className:"max-w-md w-full px-4 py-4 mx-auto bg-slate-400/10 rounded-lg shadow-lg",children:t(we,{pokemon:r})}),i("section",{className:"max-w-md w-full px-4 py-4 mx-auto bg-slate-400/10 rounded-lg shadow-lg",children:[t("h2",{className:"mt-2 text-xl font-semibold text-gray-800 md:mt-0 md:text-lg",children:"\u5347\u7B49\u62DB\u5F0F"}),i("table",{className:"table-auto w-full text-left text-sm whitespace-no-wrap",children:[t("thead",{children:i("tr",{children:[t("th",{className:"px-2 py-1 title-font tracking-wider text-gray-900 bg-gray-100",children:"\u7B49\u7D1A"}),t("th",{className:"px-2 py-1 title-font tracking-wider text-gray-900 bg-gray-100",children:"\u7CBE\u901A"}),t("th",{className:"px-2 py-1 title-font tracking-wider text-gray-900 bg-gray-100",children:"\u62DB\u5F0F"}),t("th",{className:"px-2 py-1 title-font tracking-wider text-gray-900 bg-gray-100",children:"\u5C6C\u6027"}),t("th",{className:"px-2 py-1 title-font tracking-wider text-gray-900 bg-gray-100",children:"\u5206\u985E"}),t("th",{className:"px-2 py-1 title-font tracking-wider text-gray-900 bg-gray-100",children:"\u5A01\u529B"}),t("th",{className:"px-2 py-1 title-font tracking-wider text-gray-900 bg-gray-100",children:"\u547D\u4E2D"}),t("th",{className:"px-2 py-1 title-font tracking-wider text-gray-900 bg-gray-100",children:"PP"})]})}),t("tbody",{children:r.learnset.levelingUp.map((a,l)=>i("tr",{children:[t("td",{className:"border-t-2 border-gray-200 px-2 py-1",children:a.learn<0?"\u9032\u5316":a.learn}),t("td",{className:"border-t-2 border-gray-200 px-2 py-1",children:a.mastery}),t("td",{className:"border-t-2 border-gray-200 px-2 py-1",children:a.name}),t("td",{className:"border-t-2 border-gray-200 px-2 py-1",children:t(b,{type:a.type,className:"w-6 h-6"})}),t("td",{className:"border-t-2 border-gray-200 px-2 py-1",children:a.category}),t("td",{className:"border-t-2 border-gray-200 px-2 py-1",children:a.power}),t("td",{className:"border-t-2 border-gray-200 px-2 py-1",children:a.accuracy}),t("td",{className:"border-t-2 border-gray-200 px-2 py-1",children:a.PP})]},l))})]})]}),i("section",{className:"max-w-md w-full px-4 py-4 mx-auto bg-slate-400/10 rounded-lg shadow-lg",children:[t("h2",{className:"mt-2 text-xl font-semibold text-gray-800 md:mt-0 md:text-lg",children:"\u50B3\u6388\u62DB\u5F0F"}),i("table",{className:"table-auto w-full text-left text-sm whitespace-no-wrap",children:[t("thead",{children:i("tr",{children:[t("th",{className:"px-2 py-1 title-font tracking-wider text-gray-900 bg-gray-100",children:"\u62DB\u5F0F"}),t("th",{className:"px-2 py-1 title-font tracking-wider text-gray-900 bg-gray-100",children:"\u5C6C\u6027"}),t("th",{className:"px-2 py-1 title-font tracking-wider text-gray-900 bg-gray-100",children:"\u5206\u985E"}),t("th",{className:"px-2 py-1 title-font tracking-wider text-gray-900 bg-gray-100",children:"\u5A01\u529B"}),t("th",{className:"px-2 py-1 title-font tracking-wider text-gray-900 bg-gray-100",children:"\u547D\u4E2D"}),t("th",{className:"px-2 py-1 title-font tracking-wider text-gray-900 bg-gray-100",children:"PP"})]})}),t("tbody",{children:r.learnset.tutoring.map((a,l)=>i("tr",{children:[t("td",{className:"border-t-2 border-gray-200 px-2 py-1",children:a.name}),t("td",{className:"border-t-2 border-gray-200 px-2 py-1",children:t(b,{type:a.type,className:"w-6 h-6"})}),t("td",{className:"border-t-2 border-gray-200 px-2 py-1",children:a.category}),t("td",{className:"border-t-2 border-gray-200 px-2 py-1",children:a.power}),t("td",{className:"border-t-2 border-gray-200 px-2 py-1",children:a.accuracy}),t("td",{className:"border-t-2 border-gray-200 px-2 py-1",children:a.PP})]},l))})]})]}),t("section",{className:"md:col-span-2",children:t("h3",{className:"text-xl"})})]})})}function Fe(){const e=te(),r=re();return t(Q,{children:i(F,{path:"/",element:t(M,{}),children:[t(F,{index:!0,element:t(ye,{pokemonList:e,filterModel:r})}),t(F,{path:":link",element:t(De,{})})]})})}function ve(){return t(Fe,{})}V.render(t(X,{children:t(ve,{})}),document.getElementById("root"));
