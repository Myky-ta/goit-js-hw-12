import{a as w,S as q,i as l}from"./assets/vendor-DfRjFiQT.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const S="52827134-53a8d98a66d236597fa2c26fa",B=15;async function u(r,t){return(await w.get("https://pixabay.com/api/",{params:{key:S,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:B,page:t}})).data}const f=document.querySelector(".gallery"),m=document.querySelector(".loader"),p=document.querySelector(".load-more"),E=new q(".gallery a");function g(r){const t=r.map(({webformatURL:s,largeImageURL:a,tags:e,likes:o,views:n,comments:L,downloads:v})=>`
    <li class="gallery__item">
      <a href="${a}">
        <img src="${s}" alt="${e}" loading="lazy" />
      </a>
      <div class="info">
        <p><b>Likes</b><br>${o}</p>
        <p><b>Views</b><br>${n}</p>
        <p><b>Comments</b><br>${L}</p>
        <p><b>Downloads</b><br>${v}</p>
      </div>
    </li>
  `).join("");f.insertAdjacentHTML("beforeend",t),E.refresh()}function _(){f.innerHTML=""}function y(){m.classList.add("is-loading")}function h(){m.classList.remove("is-loading")}function $(){p.classList.remove("hidden")}function b(){p.classList.add("hidden")}const M=document.querySelector(".form"),P=document.querySelector('input[name="search-text"]'),O=document.querySelector(".load-more");let c="",i=1,d=0;M.addEventListener("submit",async r=>{if(r.preventDefault(),c=P.value.trim(),!!c){i=1,_(),b(),y();try{const t=await u(c,i);if(d=t.totalHits,t.hits.length===0){l.warning({message:"No images found.",position:"topRight"});return}g(t.hits),d>i*15&&$()}catch{l.error({message:"Error fetching images.",position:"topRight"})}finally{h()}}});O.addEventListener("click",async()=>{i+=1,y();try{const r=await u(c,i);g(r.hits),i*15>=d&&(b(),l.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})),R()}catch{l.error({message:"Error loading more images.",position:"topRight"})}finally{h()}});function R(){const r=document.querySelector(".gallery__item");if(r){const{height:t}=r.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}}
//# sourceMappingURL=index.js.map
