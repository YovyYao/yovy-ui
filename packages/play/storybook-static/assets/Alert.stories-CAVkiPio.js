import{d as I,u as R,b as A,e as d,w as S,v as Y,o as c,f as y,g as $,n as i,j as m,k as p,l as D,m as v,p as N,q as T,s as g,t as _,x as V}from"./vue.esm-bundler-Cu3dBm_r.js";import{c as j,e as q,B as h,s as z,f as E}from"./index-B6pPhbgv.js";import"./index-Bqoxw6Vv.js";const M={class:"yo-alert__content"},O={class:"yo-alert__description"},F={key:0,class:"yo-alert__close"},B=j(q(I({name:"YoAlert",__name:"Alert",props:{title:{},type:{default:"info"},description:{},effect:{default:"light"},closable:{type:Boolean,default:!0},center:{type:Boolean},showIcon:{type:Boolean}},emits:["close"],setup(s,{expose:t,emit:l}){const o=s,a=l,x=R(),r=A(!0),C=d(()=>z.get(o.type)??"circle-info"),u=d(()=>o.description||x.default);function f(){r.value=!1,a("close")}return t({close:f,open:function(){r.value=!0}}),(e,G)=>S((c(),y("div",{class:i(["yo-alert",{[`yo-alert__${e.type}`]:e.type,[`yo-alert__${e.effect}`]:e.effect,"text-center":e.center}])},[e.showIcon?(c(),$(h,{key:0,class:i(["yo-alert__icon",{"big-icon":u.value}]),icon:C.value},null,8,["class","icon"])):m("",!0),p("div",M,[p("span",{class:i(["yo-alert__title",{"with-desc":u.value}]),style:D({display:e.center&&!e.showIcon?"flow":"inline"})},[v(e.$slots,"title",{},()=>[g(_(e.title),1)],!0)],6),p("p",O,[v(e.$slots,"default",{},()=>[g(_(e.description),1)],!0)]),e.closable?(c(),y("div",F,[N(h,{onClick:T(f,["stop"]),icon:"xmark"})])):m("",!0)])],2)),[[Y,r.value]])}}),[["__scopeId","data-v-cb960777"]])),L={title:"Components/Alert",component:B,tags:["autodocs"],argTypes:{type:{control:{type:"select",options:["success","info","warning","error","danger"]},effect:{control:{type:"select",options:["light","dark"]}},center:{control:{type:"boolean"}}}},args:{onClose:E()}},n={args:{title:"Title",description:"this is a description for YoAlert",type:"success",effect:"light",closable:!0,showIcon:!0,visible:!0},render:s=>({components:{YoAlert:B},setup(){const t=A();return V(()=>s.visible,l=>{var o,a;l?(o=t.value)==null||o.open():(a=t.value)==null||a.close()}),{args:s,alertRef:t}},template:`
            <yo-alert refs="alertRef" v-bind="args"></yo-alert>
        `})};var b,w,k;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    title: "Title",
    description: "this is a description for YoAlert",
    type: "success",
    effect: "light",
    closable: true,
    showIcon: true,
    visible: true
  },
  render: args => ({
    components: {
      YoAlert
    },
    setup() {
      const alertRef = ref<AlertInstance>();
      watch(() => (args as any).visible, (value: boolean) => {
        if (value) {
          alertRef.value?.open();
        } else {
          alertRef.value?.close();
        }
      });
      return {
        args,
        alertRef
      };
    },
    template: \`
            <yo-alert refs="alertRef" v-bind="args"></yo-alert>
        \`
  })
}`,...(k=(w=n.parameters)==null?void 0:w.docs)==null?void 0:k.source}}};const P=["Default"];export{n as Default,P as __namedExportsOrder,L as default};
