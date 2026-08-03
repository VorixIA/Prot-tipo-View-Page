(function(){
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- ano do rodapé ---- */
  document.getElementById('ano').textContent = new Date().getFullYear();

  /* ---- cabeçalho ao rolar ---- */
  var header = document.getElementById('header');
  var onScroll = function(){ header.classList.toggle('is-stuck', window.scrollY > 24); };
  onScroll(); window.addEventListener('scroll', onScroll, {passive:true});

  /* ---- menu mobile ---- */
  var burger = document.getElementById('burger'), drawer = document.getElementById('drawer');
  burger.addEventListener('click', function(){
    var open = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!open));
    burger.setAttribute('aria-label', open ? 'Abrir menu' : 'Fechar menu');
    drawer.classList.toggle('is-open', !open);
  });
  drawer.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      burger.setAttribute('aria-expanded','false');
      drawer.classList.remove('is-open');
    });
  });

  /* ---- reveal ao entrar na tela ---- */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    });
  }, {threshold:.14, rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('[data-reveal],[data-reveal-flow]').forEach(function(el){ io.observe(el); });

  /* ---- contadores ---- */
  var fmt = function(n){ return n.toLocaleString('pt-BR'); };
  var counters = document.querySelectorAll('[data-count]');
  var cio = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(!e.isIntersecting) return;
      var el = e.target, alvo = parseInt(el.dataset.count, 10), t0 = null, dur = 1500;
      if(reduced){ el.textContent = fmt(alvo); cio.unobserve(el); return; }
      var tick = function(t){
        if(!t0) t0 = t;
        var p = Math.min((t - t0) / dur, 1);
        el.textContent = fmt(Math.round(alvo * (1 - Math.pow(1 - p, 3))));
        if(p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      cio.unobserve(el);
    });
  }, {threshold:.5});
  counters.forEach(function(el){ cio.observe(el); });

  /* ---- carrossel de depoimentos ---- */
  var track = document.getElementById('track');
  if(track){
    var slides = track.children, total = slides.length, i = 0, timer = null;
    var dots = document.getElementById('dots');
    for(var d = 0; d < total; d++){
      var b = document.createElement('button');
      b.className = 'dot'; b.setAttribute('role','tab');
      b.setAttribute('aria-label', 'Depoimento ' + (d+1) + ' de ' + total);
      b.dataset.i = d;
      dots.appendChild(b);
    }
    var render = function(){
      track.style.transform = 'translateX(' + (-i * 100) + '%)';
      Array.prototype.forEach.call(dots.children, function(el, k){
        el.setAttribute('aria-current', String(k === i));
      });
      Array.prototype.forEach.call(slides, function(s, k){
        s.setAttribute('aria-hidden', String(k !== i));
      });
    };
    var go = function(n){ i = (n + total) % total; render(); };
    document.getElementById('prev').addEventListener('click', function(){ go(i-1); restart(); });
    document.getElementById('next').addEventListener('click', function(){ go(i+1); restart(); });
    dots.addEventListener('click', function(e){
      var t = e.target.closest('.dot'); if(!t) return; go(+t.dataset.i); restart();
    });
    var start = function(){ if(!reduced) timer = setInterval(function(){ go(i+1); }, 7000); };
    var stop = function(){ clearInterval(timer); };
    var restart = function(){ stop(); start(); };
    track.parentElement.addEventListener('mouseenter', stop);
    track.parentElement.addEventListener('mouseleave', start);
    track.parentElement.addEventListener('focusin', stop);
    render(); start();
  }

  /* ---- FAQ ---- */
  document.querySelectorAll('.faq__q').forEach(function(q){
    var painel = q.nextElementSibling;
    q.addEventListener('click', function(){
      var aberto = q.getAttribute('aria-expanded') === 'true';
      document.querySelectorAll('.faq__q').forEach(function(o){
        o.setAttribute('aria-expanded','false');
        o.nextElementSibling.style.maxHeight = null;
      });
      if(!aberto){
        q.setAttribute('aria-expanded','true');
        painel.style.maxHeight = painel.scrollHeight + 'px';
      }
    });
  });
  window.addEventListener('resize', function(){
    document.querySelectorAll('.faq__q[aria-expanded="true"]').forEach(function(q){
      q.nextElementSibling.style.maxHeight = q.nextElementSibling.scrollHeight + 'px';
    });
  });
})();
