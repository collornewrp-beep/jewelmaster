// core/navegacao.js
// Monta o cabeçalho compartilhado por todas as telas logadas: nome do
// app (JewelMaster), nome de quem está logada, botão de tema e botão
// "Sair". As próximas sessões podem inserir um menu lateral (para o
// Admin) dentro do elemento com classe "area-menu-lateral", que este
// cabeçalho já deixa reservado — sem precisar reescrever nada aqui.
//
// Uso típico numa tela:
//   import { criarCabecalho } from '../../core/navegacao.js';
//   document.body.prepend(criarCabecalho({
//     nomeUsuario: perfil.name,
//     aoSair: async () => { await sair(); location.href = '../00-login/login.html'; },
//     aoAlternarTema: (novoTema) => salvarTemaDoUsuario(perfil.uid, novoTema)
//   }));

import { criarBotaoSeletorTema } from './components.js';

export function criarCabecalho({ nomeUsuario, aoSair, aoAlternarTema }) {
  const cabecalho = document.createElement('header');
  cabecalho.className = 'cabecalho-app';

  const marca = document.createElement('div');
  marca.className = 'cabecalho-app__marca';
  marca.innerHTML = `
    <span class="cabecalho-app__nome-app">JewelMaster</span>
    <span class="cabecalho-app__nome-usuario">${nomeUsuario || ''}</span>
  `;

  const acoes = document.createElement('div');
  acoes.className = 'cabecalho-app__acoes';

  const botaoTema = criarBotaoSeletorTema(aoAlternarTema);

  const botaoSair = document.createElement('button');
  botaoSair.type = 'button';
  botaoSair.className = 'botao botao-secundario';
  botaoSair.textContent = 'Sair';
  botaoSair.addEventListener('click', () => {
    if (typeof aoSair === 'function') aoSair();
  });

  acoes.append(botaoTema, botaoSair);
  cabecalho.append(marca, acoes);

  return cabecalho;
}
