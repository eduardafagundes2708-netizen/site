// MENU MOBILE
function abrirMenu() {
  document.getElementById('menu-mobile').classList.toggle('mostrar');
}

// BOTÃO VOLTAR PARA A PÁGINA INICIAL
function voltarParaInicio() {
  // Se veio da página inicial, volta no histórico
  if (window.history.length > 1) {
    window.history.back();
  } else {
    // Se abriu o link direto, vai pra inicial
    window.location.href = 'index.html';
  }
}

// Deixa o botão voltar também com a tecla ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    voltarParaInicio();
  }
});