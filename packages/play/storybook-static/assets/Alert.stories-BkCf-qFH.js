import{d as I,j as R,k as u,b as m,o as p,l as v,p as Y,T as S,q as T,v as D,s as l,t as f,x as _,y as $,z as g,A as h,B as b,e as z,f as N,C as V,w as j}from"./vue.esm-bundler-r7La-hl4.js";import{o as q,e as E,a as M,f as O}from"./index-3NOuXf9u.js";import{B as w}from"./Icon-Bwk7P39J-Di2yZ6Ez.js";import"./index-DuM-I7-B.js";const F={class:"yo-alert__content"},G={class:"yo-alert__description"},H={key:0,class:"yo-alert__close"},C=q(E(I({name:"YoAlert",__name:"Alert",props:{title:{},type:{default:"info"},description:{},effect:{default:"light"},closable:{type:Boolean,default:!0},center:{type:Boolean},showIcon:{type:Boolean}},emits:["close"],setup(o,{expose:t,emit:c}){const s=o,a=c,n=R(),i=u(!0),x=m(()=>M.get(s.type)??"circle-info"),d=m(()=>s.description||n.default);function y(){i.value=!1,a("close")}return t({close:y,open:function(){i.value=!0}}),(e,J)=>(p(),v(S,{name:"yo-alert-fade"},{default:Y(()=>[T(l("div",{class:f(["yo-alert",{[`yo-alert__${e.type}`]:e.type,[`yo-alert__${e.effect}`]:e.effect,"text-center":e.center}])},[e.showIcon?(p(),v(w,{key:0,class:f(["yo-alert__icon",{"big-icon":d.value}]),icon:x.value},null,8,["class","icon"])):_("",!0),l("div",F,[l("span",{class:f(["yo-alert__title",{"with-desc":d.value}]),style:$({display:e.center&&!e.showIcon?"flow":"inline"})},[g(e.$slots,"title",{},()=>[h(b(e.title),1)],!0)],6),l("p",G,[g(e.$slots,"default",{},()=>[h(b(e.description),1)],!0)]),e.closable?(p(),z("div",H,[N(w,{onClick:V(y,["stop"]),icon:"xmark"})])):_("",!0)])],2),[[D,i.value]])]),_:3}))}}),[["__scopeId","data-v-1450ce67"]])),U={title:"Components/Alert",component:C,tags:["autodocs"],argTypes:{type:{control:{type:"select"},options:["success","info","warning","error","danger"]},effect:{control:{type:"select"},options:["light","dark"]},center:{control:{type:"boolean"}}},args:{onClose:O()}},r={args:{title:"Title",description:"this is a description for YoAlert",type:"success",effect:"light",closable:!0,showIcon:!0,visible:!1},render:o=>({components:{YoAlert:C},setup(){const t=u(),c=u();return j(()=>o.visible,s=>{var a,n;s?(a=t.value)==null||a.open():(n=t.value)==null||n.close()}),{args:o,alertRef:t,a:c}},template:`
            <yo-alert ref="alertRef" v-bind="args"></yo-alert>
        `})};var B,A,k;r.parameters={...r.parameters,docs:{...(B=r.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    title: "Title",
    description: "this is a description for YoAlert",
    type: "success",
    effect: "light",
    closable: true,
    showIcon: true,
    visible: false
  },
  render: args => ({
    components: {
      YoAlert
    },
    setup() {
      const alertRef = ref<AlertInstance>();
      const a = ref();
      watch(() => (args as any).visible, (value: boolean) => {
        if (value) {
          alertRef.value?.open();
        } else {
          alertRef.value?.close();
        }
      });
      return {
        args,
        alertRef,
        a
      };
    },
    template: \`
            <yo-alert ref="alertRef" v-bind="args"></yo-alert>
        \`
  })
}`,...(k=(A=r.parameters)==null?void 0:A.docs)==null?void 0:k.source}}};const W=["Default"];export{r as Default,W as __namedExportsOrder,U as default};
