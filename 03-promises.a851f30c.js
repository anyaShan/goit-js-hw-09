const e={formEl:document.querySelector(".form"),submitBtnEl:document.querySelector('button[type="submit"]')};function t(e,t){return new Promise(((o,s)=>{const i=Math.random()>.3;setTimeout((()=>{i?o({position:e,delay:t}):s({position:e,delay:t})}),t)}))}function o({position:t,delay:o}){const s=`<li class="promises-item fulfilled-text">✅ Fulfilled promise ${t} in ${o}ms</li>`;e.listOfPromises.insertAdjacentHTML("beforeend",s)}function s({position:t,delay:o}){const s=`<li class="promises-item rejected-text">❌ Rejected promise ${t} in ${o}ms</li>`;e.listOfPromises.insertAdjacentHTML("beforeend",s)}document.body.classList="container",e.formEl.addEventListener("submit",(function(i){i.preventDefault();const{elements:{delay:n,step:l,amount:r}}=i.currentTarget;let m=Number(n.value),c=Number(l.value),u=Number(r.value);if(m<0||c<0||u<0)return void alert("Enter a number greater than 0");console.log(m,c,u),e.listOfPromises.innerHTML="";for(let e=1;e<=u;e+=1)t(e,m).then((({position:e,delay:t})=>{console.log(`✅ Fulfilled promise ${e} in ${t}ms`),o({position:e,delay:t})})).catch((({position:e,delay:t})=>{console.log(`❌ Rejected promise ${e} in ${t}ms`),s({position:e,delay:t})})),m+=c})),function(){const t=document.createElement("ul");t.classList="promises-list",e.formEl.after(t),e.listOfPromises=document.querySelector(".promises-list")}();
//# sourceMappingURL=03-promises.a851f30c.js.map
