import{e as w,o as B,g as Y,w as $,u as N,d as S}from"./index-3NOuXf9u.js";import{d as V,k as T,H as A,w as F,F as H,o as k,e as I,z as r,D as j,b as z,s as c,f as m,t as u,p as L,m as O,I as q,u as M,T as G,A as P,B as J,q as K,v as Q}from"./vue.esm-bundler-r7La-hl4.js";import{B as R}from"./Icon-Bwk7P39J-Di2yZ6Ez.js";import{s as U}from"./set-DOkouqcH.js";import"./index-DuM-I7-B.js";const E=Symbol("collapseContext"),W={class:"yo-collapse"},X="YoCollapse",Z=w(V({name:X,__name:"Collapse",props:{modelValue:{},accordion:{type:Boolean}},emits:["update:modelValue","change"],setup(e,{emit:n}){const l=e,i=n,o=T(l.modelValue);function t(a){o.value=a,i("update:modelValue",a),i("change",a)}return A(()=>{l.accordion&&o.value.length>1&&Y()}),F(()=>l.modelValue,a=>t(a)),H(E,{activeNames:o,handleItemClick:function(a){let s=[...o.value];if(l.accordion)return s=[s[0]===a?"":a],void t(s);const p=s.indexOf(a);p>-1?s.splice(p,1):s.push(a),t(s)}}),(a,s)=>(k(),I("div",W,[r(a.$slots,"default",{},void 0,!0)]))}}),[["__scopeId","data-v-88d51a89"]]),v=e=>e.style.height="0px",y=e=>e.style.height=`${e.scrollHeight}px`,f=e=>e.style.height="",g=e=>e.style.overflow="hidden",h=e=>e.style.overflow="",ee={beforeEnter(e){v(e),g(e)},enter:e=>y(e),afterEnter(e){f(e),h(e)},beforeLeave(e){y(e),g(e)},leave:e=>v(e),afterLeave(e){f(e),h(e)}},te=["id"],ae={class:"yo-collapse-item__title"},le={class:"yo-collapse-item__wrapper"},oe=["id"],se=w(V({name:"YoCollapseItem",__name:"CollapseItem",props:{name:{},title:{},disabled:{type:Boolean}},setup(e){const n=e,l=j(E,void 0),i=z(()=>{var t;return(t=l==null?void 0:l.activeNames.value)==null?void 0:t.includes(n.name)});function o(){n.disabled||(l==null||l.handleItemClick(n.name))}return(t,a)=>(k(),I("div",{class:u(["yo-collapse-item",{"is-disabled":t.disabled}])},[c("div",{class:u(["yo-collapse-item__header",{"is-active":i.value,"is-disabled":t.disabled}]),onClick:o,id:`item-header-${t.name}`},[c("span",ae,[r(t.$slots,"title",{},()=>[P(J(t.title),1)],!0)]),m(R,{icon:"angle-right",class:"header-angle"})],10,te),m(G,O({name:"slide"},q(M(ee))),{default:L(()=>[K(c("div",le,[c("div",{class:"yo-collapse-item__content",id:`item-content-${t.name}`},[r(t.$slots,"default",{},void 0,!0)],8,oe)],512),[[Q,i.value]])]),_:3},16)],2))}}),[["__scopeId","data-v-16a4f227"]]),x=B(Z),D=B(se),pe={title:"Components/Collapse",component:x,subcomponents:{YoCollapseItem:D},tags:["autodocs"],argTypes:{accordion:{control:{type:"boolean"}},modelValue:{control:{type:"object"}}}},d={args:{accordion:!1,modelValue:["b"]},render:e=>({components:{YoCollapse:x,YoCollapseItem:D},setup(){return{args:e}},template:`
            <yo-collapse :modelValue="[]" data-testid="story-test-collapse">
                <yo-collapse-item title="title a" name="a">
                    <div>content a</div>
                </yo-collapse-item>
                <yo-collapse-item title="title b" name="b">
                    <div>content b</div>
                </yo-collapse-item>
                <yo-collapse-item title="title c ❌" name="c" disabled>
                    <div>content c</div>
                </yo-collapse-item>
                <yo-collapse-item title="title d" name="d">
                    <div>content d</div>
                </yo-collapse-item>
            </yo-collapse>
        `}),play:async({canvasElement:e,args:n,step:l})=>{const o=$(e).getByTestId("story-test-collapse");await l("测试手风琴模式",async()=>{U(n,"accordion",!0),await N.tripleClick(o),S()})}};var b,C,_;d.parameters={...d.parameters,docs:{...(b=d.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    accordion: false,
    modelValue: ['b']
  },
  render: args => ({
    components: {
      YoCollapse,
      YoCollapseItem
    },
    setup() {
      return {
        args
      };
    },
    template: \`
            <yo-collapse :modelValue="[]" data-testid="story-test-collapse">
                <yo-collapse-item title="title a" name="a">
                    <div>content a</div>
                </yo-collapse-item>
                <yo-collapse-item title="title b" name="b">
                    <div>content b</div>
                </yo-collapse-item>
                <yo-collapse-item title="title c ❌" name="c" disabled>
                    <div>content c</div>
                </yo-collapse-item>
                <yo-collapse-item title="title d" name="d">
                    <div>content d</div>
                </yo-collapse-item>
            </yo-collapse>
        \`
  }),
  play: async ({
    canvasElement,
    args,
    step
  }) => {
    const canvas = within(canvasElement);
    const collapse = canvas.getByTestId('story-test-collapse');
    await step("测试手风琴模式", async () => {
      set(args, "accordion", true);
      await userEvent.tripleClick(collapse);
      // expect(atgs.onClick)
      clearAllMocks();
    });
  }
}`,...(_=(C=d.parameters)==null?void 0:C.docs)==null?void 0:_.source}}};const me=["Default"];export{d as Default,me as __namedExportsOrder,pe as default};
