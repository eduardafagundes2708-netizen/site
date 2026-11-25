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
      const final = +el.dataset.count;
      let atual = 0;
      const timer = setInterval(() => {
        atual += Math.ceil(final / 40);
        if (atual >= final) { el.textContent = final; clearInterval(timer); }
        else el.textContent = atual;
      }, 30);
      observer.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => observer.observe(el));

// FORM -> WHATSAPP
function enviarLead(e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const msg = document.getElementById('msg').value;
  const numero = '5551999999999'; // <-- TROCA PELO SEU
  const texto = `Olá! Sou ${nome}. ${msg}`;
  window.open(`https://wa.me/${numero}?text=${encodeURIComponent(texto)}`, '_blank');
}
document.addEventListener('DOMContentLoaded', function() {

  let tamanho = 16;

  const painel = document.getElementById('painel-acessibilidade');
  const btnAbrir = document.getElementById('btn-acessibilidade');
  const btnFechar = document.getElementById('btn-fechar');
  const btnAumentar = document.getElementById('btn-aumentar');
  const btnDiminuir = document.getElementById('btn-diminuir');
  const btnContraste = document.getElementById('btn-contraste');
  const btnResetar = document.getElementById('btn-resetar');

  // ABRIR / FECHAR PELO BOTÃO AZUL
  btnAbrir.addEventListener('click', function() {
    painel.classList.toggle('aberto');
  });

  // FECHAR COM X
  btnFechar.addEventListener('click', function() {
    painel.classList.remove('aberto');
  });

  // FECHAR CLICANDO FORA
  document.addEventListener('click', function(e) {
    if (painel.classList.contains('aberto') &&
        !painel.contains(e.target) &&
        e.target !== btnAbrir) {
      painel.classList.remove('aberto');
    }
  });

  // AUMENTAR LETRA
  btnAumentar.addEventListener('click', function() {
    tamanho += 2;
    document.body.style.fontSize = tamanho + 'px';
  });

  // DIMINUIR LETRA
  btnDiminuir.addEventListener('click', function() {
    if (tamanho > 12) tamanho -= 2;
    document.body.style.fontSize = tamanho + 'px';
  });

  // CONTRASTE
  btnContraste.addEventListener('click', function() {
    document.body.classList.toggle('contraste');
  });

  // RESETAR
  btnResetar.addEventListener('click', function() {
    tamanho = 16;
    document.body.style.fontSize = '';
    document.body.classList.remove('contraste');
  });

}); // <-- SÓ UM FECHAMENTO AQUI


   