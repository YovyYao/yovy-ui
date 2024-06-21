import{t as w,n as B,B as Y,a as $,w as N,s as S,u as T,c as A}from"./index-DekuyO_J.js";import{d as V,e as j,x as F,y as z,p as H,o as E,l as k,m as r,b as L,f as O,z as c,q as m,n as u,w as q,A as M,B as G,j as P,T as J,C as K,D as Q,E as R,F as U}from"./vue.esm-bundler-CzGIvhYB.js";import"./index-Bqoxw6Vv.js";const I=Symbol("collapseContext"),W={class:"yo-collapse"},X="YoCollapse",Z=w(V({name:X,__name:"Collapse",props:{modelValue:{},accordion:{type:Boolean}},emits:["update:modelValue","change"],setup(e,{emit:n}){const l=e,i=n,o=j(l.modelValue);function a(t){o.value=t,i("update:modelValue",t),i("change",t)}return F(()=>{l.accordion&&o.value.length>1&&$()}),z(()=>l.modelValue,t=>a(t)),H(I,{activeNames:o,handleItemClick:function(t){let s=[...o.value];if(l.accordion)return s=[s[0]===t?"":t],void a(s);const p=s.indexOf(t);p>-1?s.splice(p,1):s.push(t),a(s)}}),(t,s)=>(E(),k("div",W,[r(t.$slots,"default",{},void 0,!0)]))}}),[["__scopeId","data-v-88d51a89"]]),v=e=>e.style.height="0px",y=e=>e.style.height=`${e.scrollHeight}px`,f=e=>e.style.height="",h=e=>e.style.overflow="hidden",b=e=>e.style.overflow="",ee={beforeEnter(e){v(e),h(e)},enter:e=>y(e),afterEnter(e){f(e),b(e)},beforeLeave(e){y(e),h(e)},leave:e=>v(e),afterLeave(e){f(e),b(e)}},ae=["id"],te={class:"yo-collapse-item__title"},le={class:"yo-collapse-item__wrapper"},oe=["id"],se=w(V({name:"YoCollapseItem",__name:"CollapseItem",props:{name:{},title:{},disabled:{type:Boolean}},setup(e){const n=e,l=L(I,void 0),i=O(()=>{var a;return(a=l==null?void 0:l.activeNames.value)==null?void 0:a.includes(n.name)});function o(){n.disabled||(l==null||l.handleItemClick(n.name))}return(a,t)=>(E(),k("div",{class:u(["yo-collapse-item",{"is-disabled":a.disabled}])},[c("div",{class:u(["yo-collapse-item__header",{"is-active":i.value,"is-disabled":a.disabled}]),onClick:o,id:`item-header-${a.name}`},[c("span",te,[r(a.$slots,"title",{},()=>[K(Q(a.title),1)],!0)]),m(Y,{icon:"angle-right",class:"header-angle"})],10,ae),m(J,M({name:"slide"},G(P(ee))),{default:q(()=>[R(c("div",le,[c("div",{class:"yo-collapse-item__content",id:`item-content-${a.name}`},[r(a.$slots,"default",{},void 0,!0)],8,oe)],512),[[U,i.value]])]),_:3},16)],2))}}),[["__scopeId","data-v-9badd552"]]),x=B(Z),D=B(se),de={title:"Components/Collapse",component:x,subcomponents:{YoCollapseItem:D},tags:["autodocs"],argTypes:{accordion:{control:{type:"boolean"}},modelValue:{control:{type:"object"}}}},d={args:{accordion:!1,modelValue:["b"]},render:e=>({components:{YoCollapse:x,YoCollapseItem:D},setup(){return{args:e}},template:`
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
        `}),play:async({canvasElement:e,args:n,step:l})=>{const o=N(e).getByTestId("story-test-collapse");await l("测试手风琴模式",async()=>{S(n,"accordion",!0),await T.tripleClick(o),A()})}};var g,C,_;d.parameters={...d.parameters,docs:{...(g=d.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(_=(C=d.parameters)==null?void 0:C.docs)==null?void 0:_.source}}};const re=["Default"];export{d as Default,re as __namedExportsOrder,de as default};
