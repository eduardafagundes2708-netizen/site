// MENU MOBILE
function abrirMenu() {
  document.getElementById('menu-mobile').classList.toggle('mostrar');
}
function irContato() {
  document.getElementById('contato').scrollIntoView({ behavior: 'smooth' });
}
function verOQueFazemos() {
  document.getElementById('o-que-fazemos').scrollIntoView({ behavior: 'smooth' });
}

// SAIBA MAIS - ABRIR / VOLTAR ARRUMADO
function abrirSaibaMais() {
  document.getElementById('sobre').style.display = 'none';
  document.getElementById('saiba-mais').style.display = 'block';
  document.getElementById('saiba-mais').scrollIntoView({ behavior: 'smooth' });
}
function voltarSaibaMais() {
  document.getElementById('saiba-mais').style.display = 'none';
  document.getElementById('sobre').style.display = 'block';
  document.getElementById('sobre').scrollIntoView({ behavior: 'smooth' });
}

// ACESSIBILIDADE
function alternarContraste() {
  document.body.classList.toggle('contraste');
}

// CONTADOR ANIMADO
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const raw = (el.dataset.count || '').trim();
      const prefixo = raw.startsWith('+') ? '+' : '';
      const final = parseInt(raw.replace(/\D/g, ''), 10) || 0;
      let atual = 0;
      const timer = setInterval(() => {
        atual += Math.max(1, Math.ceil(final / 40));
        if (atual >= final) {
          el.textContent = prefixo + final;
          clearInterval(timer);
        } else {
          el.textContent = prefixo + atual;
        }
      }, 30);
      observer.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => observer.observe(el));

// FORM -> WHATSAPP
function enviarLead(e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const msg = document.getElementById('msg').value.trim();
  const numero = '5551995148238';
  const texto = `Olá! Sou ${nome}. ${msg}`;
  window.open(`https://wa.me/${numero}?text=${encodeURIComponent(texto)}`, '_blank', 'noopener,noreferrer');
}

// BARRA DE PROGRESSO, HEADER NO SCROLL E MENU MOBILE
document.addEventListener('DOMContentLoaded', function () {
  const barra = document.getElementById('barra-progresso');
  const header = document.querySelector('.header');
  const menuMobile = document.getElementById('menu-mobile');

  function atualizarScrollUI() {
    const scrollTop = window.scrollY || 0;
    if (header) {
      header.classList.toggle('scrolled', scrollTop > 16);
    }
    if (barra) {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const pct = maxScroll > 0 ? Math.min(100, (scrollTop / maxScroll) * 100) : 0;
      barra.style.width = `${pct.toFixed(1)}%`;
    }
  }

  window.addEventListener('scroll', atualizarScrollUI, { passive: true });
  atualizarScrollUI();

  if (menuMobile) {
    menuMobile.querySelectorAll('a, button').forEach(function (item) {
      item.addEventListener('click', function () {
        menuMobile.classList.remove('mostrar');
      });
    });
  }
});

// ACESSIBILIDADE
document.addEventListener('DOMContentLoaded', function () {
  let tamanho = 16;
  const painel = document.getElementById('painel-acessibilidade');
  const btnAbrir = document.getElementById('btn-acessibilidade');
  const btnFechar = document.getElementById('btn-fechar');

  // ABRIR / FECHAR PELO BOTÃO AZUL
  btnAbrir.addEventListener('click', function (e) {
    e.stopPropagation();
    painel.classList.toggle('aberto');
  });

  // FECHAR
  btnFechar.addEventListener('click', function () {
    painel.classList.remove('aberto');
  });

  // FECHAR CLICANDO FORA
  document.addEventListener('click', function (e) {
    if (painel.classList.contains('aberto') &&
      !painel.contains(e.target) &&
      e.target !== btnAbrir) {
      painel.classList.remove('aberto');
    }
  });

  // FECHAR COM ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') painel.classList.remove('aberto');
  });

  // AUMENTAR
  document.getElementById('btn-aumentar').addEventListener('click', function () {
    tamanho += 2;
    document.body.style.fontSize = tamanho + 'px';
  });

  // DIMINUIR
  document.getElementById('btn-diminuir').addEventListener('click', function () {
    if (tamanho > 12) tamanho -= 2;
    document.body.style.fontSize = tamanho + 'px';
  });

  // CONTRASTE
  document.getElementById('btn-contraste').addEventListener('click', function () {
    document.body.classList.toggle('contraste');
  });

  // RESETAR
  document.getElementById('btn-resetar').addEventListener('click', function () {
    tamanho = 16;
    document.body.style.fontSize = '';
    document.body.classList.remove('contraste');
  });
});

// RODA DE FEEDBACK
document.addEventListener('DOMContentLoaded', function () {
  const secaoFeedback = document.getElementById('feedback');
  const trilha = document.getElementById('trilha');
  const bolinhasBox = document.getElementById('bolinhas');
  const cards = Array.from(trilha.children);
  const total = cards.length;
  const reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let atual = 0;
  let timer;
  let toqueInicioX = 0;

  if (secaoFeedback && !reduzMovimento && 'IntersectionObserver' in window) {
    secaoFeedback.classList.add('feedback-animar');
    const observerFeedback = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          requestAnimationFrame(function () {
            secaoFeedback.classList.add('feedback-visivel');
          });
          observerFeedback.unobserve(secaoFeedback);
        }
      });
    }, { threshold: 0.2 });
    observerFeedback.observe(secaoFeedback);
  }

  // CRIAR BOLINHAS
  for (let i = 0; i < total; i++) {
    const b = document.createElement('button');
    b.setAttribute('aria-label', `Ver feedback ${i + 1}`);
    b.addEventListener('click', function () {
      irPara(i);
      reiniciar();
    });
    bolinhasBox.appendChild(b);
  }

  function atualizar() {
    trilha.style.transform = `translateX(-${atual * 100}%)`;
    const bolinhas = bolinhasBox.children;
    for (let i = 0; i < total; i++) {
      bolinhas[i].classList.toggle('ativa', i === atual);
      cards[i].classList.toggle('card-ativo', i === atual);
    }
  }

  function irPara(i) {
    atual = i;
    if (atual >= total) atual = 0;
    if (atual < 0) atual = total - 1;
    atualizar();
  }

  function reiniciar() {
    clearInterval(timer);
    timer = setInterval(function () { irPara(atual + 1); }, 4500);
  }

  document.getElementById('btn-proximo').addEventListener('click', function () {
    irPara(atual + 1);
    reiniciar();
  });

  document.getElementById('btn-anterior').addEventListener('click', function () {
    irPara(atual - 1);
    reiniciar();
  });

  if (secaoFeedback) {
    secaoFeedback.addEventListener('mouseenter', function () {
      clearInterval(timer);
    });
    secaoFeedback.addEventListener('mouseleave', reiniciar);
  }

  trilha.addEventListener('touchstart', function (e) {
    toqueInicioX = e.changedTouches[0].clientX;
  }, { passive: true });

  trilha.addEventListener('touchend', function (e) {
    const diff = e.changedTouches[0].clientX - toqueInicioX;
    if (Math.abs(diff) > 40) {
      irPara(diff < 0 ? atual + 1 : atual - 1);
      reiniciar();
    }
  }, { passive: true });

  atualizar();
  reiniciar();
});

// PREVIEW DE IMAGEM (LIGHTBOX)
document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('modal-imagem');
  const modalImg = document.getElementById('modal-imagem-img');
  const modalLegenda = document.getElementById('modal-imagem-legenda');
  const btnFechar = document.getElementById('modal-imagem-fechar');

  function abrirModal(img) {
    const figure = img.closest('figure');
    const figcaption = figure ? figure.querySelector('figcaption') : null;
    const texto = figcaption ? figcaption.textContent.trim() : (img.alt || '');

    modalImg.src = img.src;
    modalImg.alt = img.alt || '';
    modalLegenda.textContent = texto;
    modalLegenda.style.display = texto ? 'block' : 'none';

    modal.classList.add('aberto');
    document.body.style.overflow = 'hidden';
  }

  function fecharModal() {
    modal.classList.remove('aberto');
    document.body.style.overflow = '';
    setTimeout(function () {
      if (!modal.classList.contains('aberto')) {
        modalImg.src = '';
      }
    }, 300);
  }

  document.querySelectorAll('.foto').forEach(function (foto) {
    foto.addEventListener('click', function () {
      const img = foto.querySelector('img');
      if (img) abrirModal(img);
    });
  });

  document.querySelectorAll('.hero-img img').forEach(function (img) {
    img.addEventListener('click', function () {
      abrirModal(img);
    });
  });

  btnFechar.addEventListener('click', fecharModal);

  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      fecharModal();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('aberto')) {
      fecharModal();
    }
  });
});

// EFEITO DE ENTRADA E INTERAÇÃO NA GALERIA
document.addEventListener('DOMContentLoaded', function () {
  const topos = document.querySelectorAll('.danca-topo, .acao-topo, .oficinas-topo');
  const fotos = document.querySelectorAll('.foto');
  const reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const temHoverFino = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  fotos.forEach(function (foto) {
    if (!foto.querySelector('.foto-badge')) {
      const badge = document.createElement('span');
      badge.className = 'foto-badge';
      badge.setAttribute('aria-hidden', 'true');
      badge.textContent = '⤢ Ampliar';
      foto.appendChild(badge);
    }
  });

  if (reduzMovimento || !('IntersectionObserver' in window)) {
    fotos.forEach(function (foto) {
      foto.classList.add('foto-pronta');
    });
    return;
  }

  topos.forEach(function (topo) {
    topo.classList.add('topo-animar');
  });

  fotos.forEach(function (foto) {
    const grid = foto.parentElement;
    const indice = grid ? Array.prototype.indexOf.call(grid.children, foto) : 0;
    const coluna = indice % 3;
    const atraso = (indice % 6) * 100;
    const deslocX = coluna === 0 ? '-22px' : (coluna === 2 ? '22px' : '0px');
    const giroY = coluna === 0 ? '6deg' : (coluna === 2 ? '-6deg' : '0deg');

    foto.style.setProperty('--enter-x', deslocX);
    foto.style.setProperty('--enter-ry', giroY);
    foto.style.transitionDelay = `${atraso}ms`;
    foto.classList.add('foto-animar');
  });

  const observerTopos = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        requestAnimationFrame(function () {
          entry.target.classList.add('topo-visivel');
        });
        observerTopos.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  const observerFotos = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const foto = entry.target;
        const grid = foto.parentElement;
        const indice = grid ? Array.prototype.indexOf.call(grid.children, foto) : 0;
        const marcarPronta = function () {
          if (foto.classList.contains('foto-pronta')) return;
          foto.style.transitionDelay = '';
          foto.classList.remove('foto-animar', 'foto-visivel');
          foto.classList.add('foto-pronta');
        };

        requestAnimationFrame(function () {
          foto.classList.add('foto-visivel');
        });
        foto.addEventListener('transitionend', function aoTerminar(e) {
          if (e.target === foto && e.propertyName === 'opacity') {
            marcarPronta();
            foto.removeEventListener('transitionend', aoTerminar);
          }
        });
        setTimeout(marcarPronta, (indice % 6) * 100 + 1000);
        observerFotos.unobserve(foto);
      }
    });
  }, { threshold: 0.12 });

  requestAnimationFrame(function () {
    topos.forEach(function (topo) {
      observerTopos.observe(topo);
    });
    fotos.forEach(function (foto) {
      observerFotos.observe(foto);
    });
  });

  if (temHoverFino) {
    fotos.forEach(function (foto) {
      foto.addEventListener('mousemove', function (e) {
        if (!foto.classList.contains('foto-pronta')) return;
        const rect = foto.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rx = ((0.5 - y) * 10).toFixed(2);
        const ry = ((x - 0.5) * 10).toFixed(2);
        const px = ((0.5 - x) * 14).toFixed(2);
        const py = ((0.5 - y) * 10).toFixed(2);
        const cx = ((x - 0.5) * 6).toFixed(2);
        const cy = ((y - 0.5) * 6).toFixed(2);

        foto.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
        foto.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
        foto.style.setProperty('--rx', `${rx}deg`);
        foto.style.setProperty('--ry', `${ry}deg`);
        foto.style.setProperty('--px', `${px}px`);
        foto.style.setProperty('--py', `${py}px`);
        foto.style.setProperty('--cx', `${cx}px`);
        foto.style.setProperty('--cy', `${cy}px`);
      });

      foto.addEventListener('mouseleave', function () {
        foto.style.removeProperty('--rx');
        foto.style.removeProperty('--ry');
        foto.style.removeProperty('--px');
        foto.style.removeProperty('--py');
        foto.style.removeProperty('--cx');
        foto.style.removeProperty('--cy');
      });
    });
  }
});

// EFEITOS INTERATIVOS NOS ELEMENTOS DE FUNDO (SCROLL + PARALAXE DO MOUSE)
document.addEventListener('DOMContentLoaded', function () {
  const fundo = document.querySelector('.fundo-elementos');
  if (!fundo) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const temHoverFino = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  let alvoSy = window.scrollY || 0;
  let atualSy = alvoSy;
  let alvoPx = 0;
  let alvoPy = 0;
  let atualPx = 0;
  let atualPy = 0;
  let alvoMx = 50;
  let alvoMy = 50;
  let atualMx = 50;
  let atualMy = 50;
  let frameId = null;

  function animarFundo() {
    atualSy += (alvoSy - atualSy) * 0.1;
    atualPx += (alvoPx - atualPx) * 0.08;
    atualPy += (alvoPy - atualPy) * 0.08;
    atualMx += (alvoMx - atualMx) * 0.12;
    atualMy += (alvoMy - atualMy) * 0.12;

    fundo.style.setProperty('--sy', atualSy.toFixed(2));
    fundo.style.setProperty('--px', `${atualPx.toFixed(2)}px`);
    fundo.style.setProperty('--py', `${atualPy.toFixed(2)}px`);
    fundo.style.setProperty('--mx', `${atualMx.toFixed(2)}%`);
    fundo.style.setProperty('--my', `${atualMy.toFixed(2)}%`);

    const parado =
      Math.abs(alvoSy - atualSy) < 0.2 &&
      Math.abs(alvoPx - atualPx) < 0.1 &&
      Math.abs(alvoPy - atualPy) < 0.1 &&
      Math.abs(alvoMx - atualMx) < 0.05 &&
      Math.abs(alvoMy - atualMy) < 0.05;

    if (!parado) {
      frameId = requestAnimationFrame(animarFundo);
    } else {
      frameId = null;
    }
  }

  function agendarFundo() {
    if (!frameId) {
      frameId = requestAnimationFrame(animarFundo);
    }
  }

  window.addEventListener('scroll', function () {
    alvoSy = window.scrollY || 0;
    agendarFundo();
  }, { passive: true });

  if (temHoverFino) {
    window.addEventListener('mousemove', function (e) {
      const rx = e.clientX / window.innerWidth;
      const ry = e.clientY / window.innerHeight;
      alvoMx = rx * 100;
      alvoMy = ry * 100;
      alvoPx = (0.5 - rx) * 32;
      alvoPy = (0.5 - ry) * 26;
      fundo.classList.add('bg-interativo');
      agendarFundo();
    }, { passive: true });

    document.addEventListener('mouseleave', function () {
      fundo.classList.remove('bg-interativo');
      alvoPx = 0;
      alvoPy = 0;
      agendarFundo();
    });
  }
});