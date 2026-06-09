// nav scroll state
const nav=document.getElementById('nav');
addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>10),{passive:true});

// mobile menu
const burger=document.getElementById('burger'),navlinks=document.getElementById('navlinks');
burger.addEventListener('click',()=>navlinks.classList.toggle('open'));
navlinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>navlinks.classList.remove('open')));

// reveal on scroll
const io=new IntersectionObserver((es)=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.12,rootMargin:'0px 0px -8% 0px'});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(q=>{
  q.addEventListener('click',()=>{
    const item=q.parentElement,a=item.querySelector('.faq-a'),open=item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(o=>{o.classList.remove('open');o.querySelector('.faq-a').style.maxHeight=null;});
    if(!open){item.classList.add('open');a.style.maxHeight=a.scrollHeight+'px';}
  });
});

// toast helper
const toast=document.getElementById('toast'),toastMsg=document.getElementById('toastMsg');
let tT;
function showToast(msg){toastMsg.textContent=msg;toast.classList.add('show');clearTimeout(tT);tT=setTimeout(()=>toast.classList.remove('show'),4200);}

// register / sponsor placeholder actions
document.querySelectorAll('.js-register').forEach(b=>b.addEventListener('click',e=>{
  const href=b.getAttribute('href');
  if(href==='#'||href===null){e.preventDefault();showToast('Registration link coming soon — drop your email below and you\'ll be first in.');}
}));
document.querySelectorAll('.js-sponsor').forEach(b=>b.addEventListener('click',e=>{
  if(b.getAttribute('href')==='#'){e.preventDefault();showToast('Thanks for the interest! Sponsor inbox opens soon — email hello@techfrontier.lounge.');}
}));

// newsletter
document.getElementById('newsForm').addEventListener('submit',e=>{
  e.preventDefault();e.target.reset();showToast('You\'re on the list — we\'ll ping you when the next edition is live. 🎉');
});

// ---- animated network background ----
(function(){
  const c=document.getElementById('net'),ctx=c.getContext('2d');
  let w,h,dpr,pts,raf;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function size(){
    dpr=Math.min(devicePixelRatio||1,2);
    const r=c.parentElement.getBoundingClientRect();
    w=r.width;h=r.height;c.width=w*dpr;h&&(c.height=h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
    const n=Math.max(26,Math.min(64,Math.round(w/26)));
    pts=Array.from({length:n},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.22,vy:(Math.random()-.5)*.22,r:Math.random()*1.6+.7,v:Math.random()<.16}));
  }
  function draw(){
    ctx.clearRect(0,0,w,h);
    for(let i=0;i<pts.length;i++){
      const p=pts[i];p.x+=p.vx;p.y+=p.vy;
      if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;
      for(let j=i+1;j<pts.length;j++){
        const q=pts[j],dx=p.x-q.x,dy=p.y-q.y,d=Math.hypot(dx,dy);
        if(d<128){const a=(1-d/128)*.22;ctx.strokeStyle='rgba(36,58,107,'+a+')';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();}
      }
    }
    for(const p of pts){
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,7);
      ctx.fillStyle=p.v?'rgba(123,109,176,.55)':'rgba(36,58,107,.4)';ctx.fill();
      if(p.v){ctx.beginPath();ctx.arc(p.x,p.y,p.r+4,0,7);ctx.fillStyle='rgba(123,109,176,.10)';ctx.fill();}
    }
    raf=requestAnimationFrame(draw);
  }
  function start(){size();cancelAnimationFrame(raf);if(reduce){draw();cancelAnimationFrame(raf);}else draw();}
  addEventListener('resize',()=>{cancelAnimationFrame(raf);size();if(!reduce)draw();});
  start();
})();
