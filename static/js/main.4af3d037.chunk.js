(this.webpackJsonpusdc_frontend=this.webpackJsonpusdc_frontend||[]).push([[0],{68:function(e,t){},86:function(e,t,n){"use strict";n.r(t);var a=n(7),s=n.n(a),c=n(25),r=n.n(c),i=n(2),o=n.n(i),h=n(35),u=n(3),l=n(4),d=n(6),b=n(5),j=n(19),x=n(24),f=n(88),m=n(90),O=n(93),g=n(50),p=n(91),w=n(92),v=n(56),S=n(11);var C=function(e){Object(d.a)(n,e);var t=Object(b.a)(n);function n(e){var a;return Object(u.a)(this,n),(a=t.call(this,e)).state={address:"waiting",ethBalance:j.a.from(0),balance:j.a.from(0),waiting:!1,txHash:void 0},a}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=Object(h.a)(o.a.mark((function e(){var t,n,a,s,c,r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new x.a.providers.Web3Provider(window.ethereum),n=t.getSigner(),a=new x.a.Contract("0x68ec573C119826db2eaEA1Efbfc2970cDaC869c4",["function balanceOf(address _owner) public view returns (uint256 balance)"],n),e.next=5,n.getAddress();case 5:return s=e.sent,e.next=8,a.balanceOf(s);case 8:return c=e.sent,e.next=11,n.getBalance();case 11:r=e.sent,this.setState({balance:c,ethBalance:r,address:s});case 13:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"gimmeSome",value:function(){var e=Object(h.a)(o.a.mark((function e(){var t,n,a,s,c,r,i,h;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new x.a.providers.Web3Provider(window.ethereum),n=t.getSigner(),a=new x.a.Contract("0x68ec573C119826db2eaEA1Efbfc2970cDaC869c4",["function gimmeSome() external","function balanceOf(address _owner) public view returns (uint256 balance)"],n),e.next=5,n.getAddress();case 5:return s=e.sent,e.next=8,a.gimmeSome({gasPrice:4e10});case 8:return c=e.sent,console.log("Transaction hash: ".concat(c.hash)),this.setState({waiting:!0,txHash:c.hash}),e.next=13,c.wait();case 13:return r=e.sent,console.log("Transaction confirmed in block ".concat(r.blockNumber)),console.log("Gas used: ".concat(r.gasUsed.toString())),e.next=18,a.balanceOf(s);case 18:return i=e.sent,e.next=21,n.getBalance();case 21:h=e.sent,this.setState({balance:i,waiting:!1,ethBalance:h});case 23:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,t=Object(S.jsx)(S.Fragment,{}),n=Object(S.jsx)(S.Fragment,{});return this.state.waiting&&(n=Object(S.jsx)(m.a,{animation:"border",role:"status",children:Object(S.jsx)("span",{className:"sr-only",children:"Loading..."})})),this.state.txHash&&(t=Object(S.jsxs)(O.a,{children:[n,Object(S.jsx)(O.a.Link,{href:"https://ropsten.etherscan.io/tx/"+this.state.txHash,children:"Transaction"})]})),Object(S.jsxs)(S.Fragment,{children:[Object(S.jsxs)(p.a,{children:[Object(S.jsxs)(w.a,{children:[Object(S.jsx)("h2",{children:"User Address"}),Object(S.jsxs)("p",{children:[" ",this.state.address," "]})]}),Object(S.jsx)(w.a,{children:Object(S.jsxs)("h2",{children:["User ETH Balance: ",x.a.utils.formatUnits(this.state.ethBalance,18)]})})]}),Object(S.jsxs)(p.a,{children:[Object(S.jsx)(w.a,{children:Object(S.jsxs)("h2",{children:["User USDC Balance: ",x.a.utils.formatUnits(this.state.balance,6)]})}),Object(S.jsxs)(w.a,{children:[Object(S.jsx)(v.a,{onClick:Object(h.a)(o.a.mark((function t(){return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.gimmeSome();case 2:case"end":return t.stop()}}),t)}))),children:"GimmeSome!"}),t]})]})]})}}]),n}(a.Component),k=function(){return Object(S.jsxs)(g.a,{children:[Object(S.jsx)(f.a,{children:Object(S.jsx)("h1",{className:"header",children:"USDC FrontEnd Example"})}),Object(S.jsx)(C,{})]})},B=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,94)).then((function(t){var n=t.getCLS,a=t.getFID,s=t.getFCP,c=t.getLCP,r=t.getTTFB;n(e),a(e),s(e),c(e),r(e)}))};n(85);r.a.render(Object(S.jsx)(s.a.StrictMode,{children:Object(S.jsx)(k,{})}),document.getElementById("root")),B()}},[[86,1,2]]]);
//# sourceMappingURL=main.4af3d037.chunk.js.map