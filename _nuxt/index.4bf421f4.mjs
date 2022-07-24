import{a as v,b as j,o as r,e as i,f as t,t as p,u as n,F as g,r as x,h as B,w as m,v as F,i as $,j as h,c as A,p as C,k as I}from"./entry.7630783a.mjs";import{_ as y}from"./_plugin-vue_export-helper.7287ed4b.mjs";const E={class:"artifact"},k={class:"artifact-type"},D={class:"score"},S={class:"sub-options"},w=["id","onUpdate:modelValue"],O=["for"],P=["onUpdate:modelValue","disabled"],T=v({__name:"artifact-detail",props:{artifact:Object},emits:["change:subop"],setup(l,{emit:_}){const f=l,{$language:d}=j(),s=f.artifact,b=a=>{const c={cr:2,cd:1,ar:1};a.score=a.sub.reduce((e,u)=>e+(u.score||0)*(c[u.id]||0),0),_("change:subop")},o=a=>({flower:{ja:"\u82B1",en:"Flower"},plume:{ja:"\u7FBD",en:"Plume"},eon:{ja:"\u6642\u8A08",en:"Eon"},goblet:{ja:"\u676F",en:"Goblet"},circlet:{ja:"\u51A0",en:"Circlet"}})[a][d.selected];return(a,c)=>(r(),i("div",E,[t("div",k,[t("h3",null,p(o(n(s).piece)),1),t("span",D,p(n(s).score),1)]),t("div",S,[(r(!0),i(g,null,x(n(s).sub,e=>(r(),i("div",{class:B(["sub-option",{selected:e.selected}])},[t("label",null,[m(t("input",{id:`check-${n(s).piece}-${e.name}`,type:"checkbox","onUpdate:modelValue":u=>e.selected=u},null,8,w),[[F,e.selected]]),t("label",{for:`check-${n(s).piece}-${e.name}`},p(e.name),9,O)]),m(t("input",{type:"number","onUpdate:modelValue":u=>e.score=u,disabled:!e.selected,onInput:c[0]||(c[0]=u=>b(n(s)))},null,40,P),[[$,e.score]])],2))),256))])]))}}),V=y(T,[["__scopeId","data-v-0e78213f"]]),H=l=>(C("data-v-b065f0ee"),l=l(),I(),l),M={class:"title-area"},U=H(()=>t("h2",null,"\u8056\u907A\u7269 - Artifacts",-1)),z={class:"score"},G={style:{display:"flex","flex-wrap":"wrap"}},N=v({__name:"index",setup(l){const{$language:_}=j(),f=[{id:"cr",ja:"\u4F1A\u5FC3\u7387",en:"CRIT Rate"},{id:"cd",ja:"\u4F1A\u5FC3\u30C0\u30E1",en:"CIT DMG"},{id:"em",ja:"\u5143\u7D20\u719F\u77E5",en:"Elemental Mastery",zhCH:"\u5143\u7D20\u7CBE\u901A"},{id:"er",ja:"\u5143\u7D20\u30C1\u30E3\u52B9\u7387",en:"Energy Recharge"},{id:"hp",ja:"HP",en:"HP"},{id:"hpr",ja:"HP%",en:"HP%"},{id:"atk",ja:"\u653B\u6483\u529B",en:"ATK"},{id:"ar",ja:"\u653B\u6483\u529B%",en:"ATK%"},{id:"def",ja:"\u9632\u5FA1\u529B",en:"DEF"},{id:"dr",ja:"\u9632\u5FA1\u529B%",en:"DEF%"}],d=h("totalScore",()=>0,"$SB0OD8x0zq"),s=h("artifacts",()=>{const o={flower:{piece:"flower",typeId:"",level:0,score:0,sub:[]},plume:{piece:"plume",typeId:"",level:0,score:0,sub:[]},eon:{piece:"eon",typeId:"",level:0,score:0,sub:[]},goblet:{piece:"goblet",typeId:"",level:0,score:0,sub:[]},circlet:{piece:"circlet",typeId:"",level:0,score:0,sub:[]}};return Object.values(o).forEach(a=>{f.forEach(c=>a.sub.push({id:c.id,name:c[_.selected],score:null,selected:!1}))}),o},"$2aPGV7kQpn"),b=()=>d.value=Object.values(s.value).reduce((o,a)=>o+a.score,0);return(o,a)=>{const c=V;return r(),i("div",null,[t("div",M,[U,t("span",z,p(n(d)),1)]),t("div",G,[(r(!0),i(g,null,x(Object.keys(n(s)),e=>(r(),A(c,{artifact:n(s)[e],"onChange:subop":b},null,8,["artifact"]))),256))])])}}});const q=y(N,[["__scopeId","data-v-b065f0ee"]]);export{q as default};
