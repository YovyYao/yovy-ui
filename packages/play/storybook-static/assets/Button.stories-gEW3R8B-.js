import{t as U,n as V,_ as Q,B as A,f as Z,w as k,s as c,u,e as r,c as l}from"./index-DekuyO_J.js";import{d as q,b as tt,u as et,e as nt,f as p,o as m,g as _,n as ot,j as at,k as st,p as ut,r as rt,t as v,l as ct,m as C,w as lt,q as it,s as z,v as Y}from"./vue.esm-bundler-CzGIvhYB.js";import"./index-Bqoxw6Vv.js";const K=Symbol("BUTTON_GROUP_CTX_KEY"),pt=U(q({name:"YoButton",__name:"Button",props:{tag:{default:"button"},type:{},size:{},nativeType:{default:"button"},disabled:{type:Boolean},loading:{type:Boolean},loadingIcon:{},icon:{},circle:{type:Boolean},plain:{type:Boolean},round:{type:Boolean},autofocus:{type:Boolean},useThrottle:{type:Boolean,default:!0},throttleDuration:{default:500}},emits:["click"],setup(t,{expose:e,emit:a}){const o=t,s=tt(K,void 0),X=a,J=et(),f=nt(),h=p(()=>(s==null?void 0:s.size)??(o==null?void 0:o.size)??""),F=p(()=>(s==null?void 0:s.type)??(o==null?void 0:o.type)??""),w=p(()=>(s==null?void 0:s.disabled)||(o==null?void 0:o.disabled)||!1),E=p(()=>({marginRight:J.default?"6px":"0px"})),T=n=>X("click",n),L=Q(T,o.throttleDuration,{trailing:!1});return e({ref:f}),(n,x)=>(m(),_(st(n.tag),{ref_key:"_ref",ref:f,class:ot(["yo-button",{[`yo-button--${F.value}`]:F.value,[`yo-button--${h.value}`]:h.value,"is-plain":n.plain,"is-round":n.round,"is-circle":n.circle,"is-disabled":w.value,"is-loading":n.loading}]),autofocus:n.autofocus,type:n.tag==="button"?n.nativeType:void 0,disabled:!(!w.value&&!n.loading)||void 0,onClick:x[0]||(x[0]=D=>n.useThrottle?at(L)(D):T(D))},{default:lt(()=>[n.loading?C(n.$slots,"loading",{key:0},()=>[it(A,{class:"loading-icon",icon:n.loadingIcon??"spinner",style:z(E.value),spin:""},null,8,["icon","style"])],!0):Y("",!0),n.icon&&!n.loading?(m(),_(A,{key:1,icon:n.icon,style:z(E.value),size:"1x"},null,8,["icon","style"])):Y("",!0),C(n.$slots,"default",{},void 0,!0)]),_:3},8,["autofocus","type","disabled","class"]))}}),[["__scopeId","data-v-9fc14360"]]),dt={class:"yo-button-group"},yt=U(q({name:"YoButtonGroup",__name:"ButtonGroup",props:{size:{},type:{},disabled:{type:Boolean}},setup(t){const e=t;return ut(K,rt({size:v(e,"size"),type:v(e,"type"),disabled:v(e,"disabled")})),(a,o)=>(m(),ct("div",dt,[C(a.$slots,"default",{},void 0,!0)]))}}),[["__scopeId","data-v-772f2102"]]),i=V(pt),bt=V(yt),mt={title:"Components/Button",component:i,tags:["autodocs"],argTypes:{type:{control:{type:"select"},options:["primary","success","warning","danger","info"]},size:{control:{type:"select"},options:["small","medium","large"]},disabled:{control:{type:"boolean"}},loading:{control:{type:"boolean"}},useThrottle:{control:{type:"boolean"}},throttleDuration:{control:{type:"number"}},autofocus:{control:{type:"boolean"}},tag:{control:{type:"text"}},nativeType:{control:{type:"select"},options:["button","submit","reset"]},icon:{control:{type:"text"}},loadingIcon:{control:{type:"text"}},plain:{control:{type:"boolean"}},round:{control:{type:"boolean"}},circle:{control:{type:"boolean"}}},args:{onClick:Z()}},B=t=>`
  <div style="margin:5px">
    ${t}
  </div>
`,d={argTypes:{content:{control:{type:"text"}}},args:{type:"primary",content:"Button"},render:t=>({components:{YoButton:i},setup(){return{args:t}},template:B(`
      <yo-button data-testid="story-test-btn" :type="args.type" v-bind="args">
        {{ args.content }}
      </yo-button>`)}),play:async({canvasElement:t,args:e,step:a})=>{const s=k(t).getByTestId("story-test-btn");await a("When useThrottl is set be true, the conClick can be called once",async()=>{c(e,"useThrottle",!0),await u.tripleClick(s),r(e.onClick).toHaveBeenCalledOnce(),l()}),await a("When useThrottl is set be false, the conClick can be called three times",async()=>{c(e,"useThrottle",!1),await u.tripleClick(s),r(e.onClick).toHaveBeenCalledTimes(3),l()}),await a("When disabled is set be true, the conClick can not be called",async()=>{c(e,"disabled",!0),await u.click(s),r(e.onClick).toHaveBeenCalledTimes(0),c(e,"disabled",!1),l()}),await a("When loading is set be true, the onClick can not be called",async()=>{c(e,"loading",!0),await u.click(s),r(e.onClick).toHaveBeenCalledTimes(0),c(e,"loading",!1),l()})}},y={argTypes:{content:{control:{type:"text"}}},args:{content:"Button",autofocus:!0},render:t=>({components:{YoButton:i},setup(){return{args:t}},template:B(`
      <p>Please refresh the browser in order to make the button to get focus </p>
      <yo-button data-testid="story-test-btn" v-bind="args">
        {{args.content}}
      </yo-button>`)}),play:async({args:t})=>{await u.keyboard("{enter}"),r(t.onClick).toHaveBeenCalledOnce(),l()}},b={args:{icon:"search"},render:t=>({components:{YoButton:i},setup(){return{args:t}},template:B(`
      <yo-button circle v-bind="args" />
    `)}),play:async({canvasElement:t,args:e,step:a})=>{const o=k(t);await a("click button",async()=>{await u.click(o.getByRole("button"))}),r(e.onClick).toHaveBeenCalled(),l()}},g={argTypes:{content:{control:{type:"text"}}},args:{content1:"Button1",content2:"Button2",content3:"Button3"},render:t=>({components:{YoButton:i,YoButtonGroup:bt},setup(){return{args:t}},template:B(`
    <yo-button-group :type="args.groupType" :size="args.groupSize" :disabled="args.groupDisabled">
      <yo-button v-bind="args">{{args.content1}}</yo-button>
      <yo-button v-bind="args">{{args.content2}}</yo-button>
      <yo-button v-bind="args">{{args.content3}}</yo-button>
    </yo-button-group>
    `)}),play:async({canvasElement:t,args:e,step:a})=>{const o=k(t);await a("click btn1",async()=>{await u.click(o.getByText("Button1"))}),await a("click btn2",async()=>{await u.click(o.getByText("Button2"))}),await a("click btn3",async()=>{await u.click(o.getByText("Button3"))}),r(e.onClick).toHaveBeenCalled()}};var H,S,I;d.parameters={...d.parameters,docs:{...(H=d.parameters)==null?void 0:H.docs,source:{originalSource:`{
  argTypes: {
    content: {
      control: {
        type: 'text'
      }
    }
  },
  args: {
    type: "primary",
    content: 'Button'
  },
  render: args => ({
    components: {
      YoButton
    },
    setup() {
      return {
        args
      };
    },
    template: container(\`
      <yo-button data-testid="story-test-btn" :type="args.type" v-bind="args">
        {{ args.content }}
      </yo-button>\`)
  }),
  play: async ({
    canvasElement,
    args,
    step
  }) => {
    const canvas = within(canvasElement);
    const btn = canvas.getByTestId('story-test-btn');
    /**\r
     * 此函数是一个异步函数，它作为参数传递给step函数。\r
     * 在函数内部，它首先通过set函数将useThrottle参数设置为true。\r
     * 然后，它使用await等待userEvent.tripleClick(btn)执行，模拟用户快速连续点击按钮三次。\r
     * 接下来，它使用expect函数断言args.onClick方法被调用了一次。\r
     * 最后，它调用clearAllMocks函数清除所有模拟函数的调用信息。\r
     * 这个函数的作用是测试当useThrottl参数为true时，onClick方法是否只能被调用一次。\r
     */
    await step("When useThrottl is set be true, the conClick can be called once", async () => {
      set(args, "useThrottle", true);
      await userEvent.tripleClick(btn);
      expect(args.onClick).toHaveBeenCalledOnce();
      clearAllMocks();
    });
    await step("When useThrottl is set be false, the conClick can be called three times", async () => {
      set(args, "useThrottle", false);
      await userEvent.tripleClick(btn);
      expect(args.onClick).toHaveBeenCalledTimes(3);
      clearAllMocks();
    });
    await step("When disabled is set be true, the conClick can not be called", async () => {
      set(args, "disabled", true);
      await userEvent.click(btn);
      expect(args.onClick).toHaveBeenCalledTimes(0);
      set(args, "disabled", false);
      clearAllMocks();
    });
    await step("When loading is set be true, the onClick can not be called", async () => {
      set(args, "loading", true);
      await userEvent.click(btn);
      expect(args.onClick).toHaveBeenCalledTimes(0);
      set(args, "loading", false);
      clearAllMocks();
    });
  }
}`,...(I=(S=d.parameters)==null?void 0:S.docs)==null?void 0:I.source}}};var G,M,W;y.parameters={...y.parameters,docs:{...(G=y.parameters)==null?void 0:G.docs,source:{originalSource:`{
  argTypes: {
    content: {
      control: {
        type: "text"
      }
    }
  },
  args: {
    content: "Button",
    autofocus: true
  },
  render: args => ({
    components: {
      YoButton
    },
    setup() {
      return {
        args
      };
    },
    template: container(\`
      <p>Please refresh the browser in order to make the button to get focus </p>
      <yo-button data-testid="story-test-btn" v-bind="args">
        {{args.content}}
      </yo-button>\`)
  }),
  play: async ({
    args
  }) => {
    await userEvent.keyboard("{enter}");
    expect(args.onClick).toHaveBeenCalledOnce();
    clearAllMocks();
  }
}`,...(W=(M=y.parameters)==null?void 0:M.docs)==null?void 0:W.source}}};var $,O,R;b.parameters={...b.parameters,docs:{...($=b.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    icon: "search"
  },
  render: args => ({
    components: {
      YoButton
    },
    setup() {
      return {
        args
      };
    },
    template: container(\`
      <yo-button circle v-bind="args" />
    \`)
  }),
  play: async ({
    canvasElement,
    args,
    step
  }) => {
    const canvas = within(canvasElement);
    await step("click button", async () => {
      await userEvent.click(canvas.getByRole("button"));
    });
    expect(args.onClick).toHaveBeenCalled();
    clearAllMocks();
  }
}`,...(R=(O=b.parameters)==null?void 0:O.docs)==null?void 0:R.source}}};var j,N,P;g.parameters={...g.parameters,docs:{...(j=g.parameters)==null?void 0:j.docs,source:{originalSource:`{
  argTypes: {
    content: {
      control: {
        type: "text"
      }
    }
  },
  args: {
    content1: "Button1",
    content2: "Button2",
    content3: "Button3"
  },
  render: args => ({
    components: {
      YoButton,
      YoButtonGroup
    },
    setup() {
      return {
        args
      };
    },
    template: container(\`
    <yo-button-group :type="args.groupType" :size="args.groupSize" :disabled="args.groupDisabled">
      <yo-button v-bind="args">{{args.content1}}</yo-button>
      <yo-button v-bind="args">{{args.content2}}</yo-button>
      <yo-button v-bind="args">{{args.content3}}</yo-button>
    </yo-button-group>
    \`)
  }),
  play: async ({
    canvasElement,
    args,
    step
  }) => {
    const canvas = within(canvasElement);
    await step("click btn1", async () => {
      await userEvent.click(canvas.getByText("Button1"));
    });
    await step("click btn2", async () => {
      await userEvent.click(canvas.getByText("Button2"));
    });
    await step("click btn3", async () => {
      await userEvent.click(canvas.getByText("Button3"));
    });
    expect(args.onClick).toHaveBeenCalled();
  }
}`,...(P=(N=g.parameters)==null?void 0:N.docs)==null?void 0:P.source}}};const Ct=["Default","Autofocus","Circle","Group"];export{y as Autofocus,b as Circle,d as Default,g as Group,Ct as __namedExportsOrder,mt as default};
