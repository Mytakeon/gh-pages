import{S as Q,i as T,s as B,H as V,e as v,k as A,t as w,O as W,c as k,d as s,m as q,a as P,h as b,b as j,F as _,g as d,j as N,I as X,J as Y,K as Z,q as J,o as K,C as U,w as x,x as ee,y as te,z as ae,A as M,B as se,P as S,G as ne}from"../../chunks/vendor-8d39e998.js";function le(i){let t,l,f,o,n,r,p,c,E,I,h,O,y=i[2].join(", ")+"",g,R,u;document.title=t=i[0];const D=i[4].default,m=V(D,i,i[3],null);return{c(){l=v("meta"),f=A(),o=v("h1"),n=w(i[0]),r=A(),p=v("p"),c=w("Published: "),E=w(i[1]),I=A(),h=v("p"),O=w("tags: "),g=w(y),R=A(),m&&m.c(),this.h()},l(e){const a=W('[data-svelte="svelte-1fi5dar"]',document.head);l=k(a,"META",{property:!0,content:!0}),a.forEach(s),f=q(e),o=k(e,"H1",{});var z=P(o);n=b(z,i[0]),z.forEach(s),r=q(e),p=k(e,"P",{});var G=P(p);c=b(G,"Published: "),E=b(G,i[1]),G.forEach(s),I=q(e),h=k(e,"P",{});var $=P(h);O=b($,"tags: "),g=b($,y),$.forEach(s),R=q(e),m&&m.l(e),this.h()},h(){j(l,"property","og:title"),j(l,"content",i[0])},m(e,a){_(document.head,l),d(e,f,a),d(e,o,a),_(o,n),d(e,r,a),d(e,p,a),_(p,c),_(p,E),d(e,I,a),d(e,h,a),_(h,O),_(h,g),d(e,R,a),m&&m.m(e,a),u=!0},p(e,[a]){(!u||a&1)&&t!==(t=e[0])&&(document.title=t),(!u||a&1)&&j(l,"content",e[0]),(!u||a&1)&&N(n,e[0]),(!u||a&2)&&N(E,e[1]),(!u||a&4)&&y!==(y=e[2].join(", ")+"")&&N(g,y),m&&m.p&&(!u||a&8)&&X(m,D,e,e[3],u?Z(D,e[3],a,null):Y(e[3]),null)},i(e){u||(J(m,e),u=!0)},o(e){K(m,e),u=!1},d(e){s(l),e&&s(f),e&&s(o),e&&s(r),e&&s(p),e&&s(I),e&&s(h),e&&s(R),m&&m.d(e)}}}function oe(i,t,l){let{$$slots:f={},$$scope:o}=t,{title:n}=t,{date:r}=t,{tags:p}=t;return i.$$set=c=>{"title"in c&&l(0,n=c.title),"date"in c&&l(1,r=c.date),"tags"in c&&l(2,p=c.tags),"$$scope"in c&&l(3,o=c.$$scope)},[n,r,p,o,f]}class ie extends Q{constructor(t){super();T(this,t,oe,le,B,{title:0,date:1,tags:2})}}function re(i){let t,l,f,o,n=`<code class="language-powershell"><span class="token keyword">Function</span> quickpr<span class="token punctuation">(</span><span class="token variable">$branchName</span><span class="token punctuation">,</span> <span class="token variable">$message</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    git checkout <span class="token operator">-</span>b <span class="token variable">$branchName</span>
    git add <span class="token punctuation">.</span>
    git commit <span class="token operator">-</span>m <span class="token string">"<span class="token variable">$message</span>"</span>
    git push <span class="token operator">--</span><span class="token function">set-upstream</span> origin <span class="token variable">$branchName</span>
    <span class="token variable">$remoteUrl</span> = git remote <span class="token function">get-url</span> origin
    <span class="token variable">$createPRUrl</span> = <span class="token string">"<span class="token variable">$remoteUrl</span>/pullrequestcreate?sourceRef=<span class="token variable">$branchName</span>&amp;targetRef=main"</span>
    <span class="token function">Start-Process</span> <span class="token variable">$createPRUrl</span>
<span class="token punctuation">&#125;</span></code>`,r,p,c,E,I,h,O,y,g,R,u,D,m;return{c(){t=v("p"),l=w(`I often end up create small alias or utilities to use Git in the CLI.
I use the following (super simple) function to speed-up the process of opening a pull request in Azure DevOps (ADO):`),f=A(),o=v("pre"),r=A(),p=v("p"),c=v("em"),E=w("(note the hardcoded bits you might want to modify: the remote name - \u201Corigin\u201D - and the target branch - \u201Cmain\u201D, and of course the PR API that will vary depending on the Git service you\u2019re using)"),I=A(),h=v("p"),O=w("It will add and commit all your local changes, create then push a new branch, and finally open your default browser at the PR creation page, where you can update the title, description, add reviewers, etc."),y=A(),g=v("p"),R=w(`I use it specifically when the PR is fairly small and making the changes takes 20/30 minutes at most.
I find it appropriate for example for configuration changes, nitpicks, dependency version bumps, etc., nothing that would require several commits and/or adding only some of the changed files.
It must save me about one minute per PR, and since it took me 5 minutes to write it, I\u2019d say `),u=v("a"),D=w("it was worth the time"),m=w("."),this.h()},l(e){t=k(e,"P",{});var a=P(t);l=b(a,`I often end up create small alias or utilities to use Git in the CLI.
I use the following (super simple) function to speed-up the process of opening a pull request in Azure DevOps (ADO):`),a.forEach(s),f=q(e),o=k(e,"PRE",{class:!0});var z=P(o);z.forEach(s),r=q(e),p=k(e,"P",{});var G=P(p);c=k(G,"EM",{});var $=P(c);E=b($,"(note the hardcoded bits you might want to modify: the remote name - \u201Corigin\u201D - and the target branch - \u201Cmain\u201D, and of course the PR API that will vary depending on the Git service you\u2019re using)"),$.forEach(s),G.forEach(s),I=q(e),h=k(e,"P",{});var H=P(h);O=b(H,"It will add and commit all your local changes, create then push a new branch, and finally open your default browser at the PR creation page, where you can update the title, description, add reviewers, etc."),H.forEach(s),y=q(e),g=k(e,"P",{});var C=P(g);R=b(C,`I use it specifically when the PR is fairly small and making the changes takes 20/30 minutes at most.
I find it appropriate for example for configuration changes, nitpicks, dependency version bumps, etc., nothing that would require several commits and/or adding only some of the changed files.
It must save me about one minute per PR, and since it took me 5 minutes to write it, I\u2019d say `),u=k(C,"A",{href:!0,rel:!0});var L=P(u);D=b(L,"it was worth the time"),L.forEach(s),m=b(C,"."),C.forEach(s),this.h()},h(){j(o,"class","language-powershell"),j(u,"href","https://xkcd.com/1205/"),j(u,"rel","nofollow")},m(e,a){d(e,t,a),_(t,l),d(e,f,a),d(e,o,a),o.innerHTML=n,d(e,r,a),d(e,p,a),_(p,c),_(c,E),d(e,I,a),d(e,h,a),_(h,O),d(e,y,a),d(e,g,a),_(g,R),_(g,u),_(u,D),_(g,m)},p:ne,d(e){e&&s(t),e&&s(f),e&&s(o),e&&s(r),e&&s(p),e&&s(I),e&&s(h),e&&s(y),e&&s(g)}}}function pe(i){let t,l;const f=[i[0],F];let o={$$slots:{default:[re]},$$scope:{ctx:i}};for(let n=0;n<f.length;n+=1)o=U(o,f[n]);return t=new ie({props:o}),{c(){x(t.$$.fragment)},l(n){ee(t.$$.fragment,n)},m(n,r){te(t,n,r),l=!0},p(n,[r]){const p=r&1?ae(f,[r&1&&M(n[0]),r&0&&M(F)]):{};r&2&&(p.$$scope={dirty:r,ctx:n}),t.$set(p)},i(n){l||(J(t.$$.fragment,n),l=!0)},o(n){K(t.$$.fragment,n),l=!1},d(n){se(t,n)}}}const F={title:"Quick PR helper for Azure DevOps",date:"17/03/2022",tags:["powershell","git"]};function ue(i,t,l){return i.$$set=f=>{l(0,t=U(U({},t),S(f)))},t=S(t),[t]}class fe extends Q{constructor(t){super();T(this,t,ue,pe,B,{})}}export{fe as default,F as metadata};
