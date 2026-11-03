'use strict';
const whatsappProfissionais = {
  dani: { nome: 'Dani Jêje', numero: '5573988791015' },
  ashanti: { nome: 'Preta Ashanti', numero: '557381736832' }
};
const menuButton = document.getElementById('menuButton');
const navigation = document.getElementById('navigation');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  navigation.classList.toggle('open', open);
});
navigation.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navigation.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
}));
document.querySelectorAll('[data-servico]').forEach(link => link.addEventListener('click', () => {
  document.getElementById('servico').value = link.dataset.servico;
}));
const dateInput = document.getElementById('data');
const now = new Date();
const todayLocal = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
dateInput.min = todayLocal;
document.getElementById('bookingForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const profissional = whatsappProfissionais[data.get('profissional')];
  if (!profissional) { alert('Selecione uma profissional.'); return; }
  const date = data.get('data');
  if (date && date < todayLocal) { dateInput.setCustomValidity('Escolha uma data a partir de hoje.'); dateInput.reportValidity(); return; }
  dateInput.setCustomValidity('');
  const message = [
    'Olá, Kumpudur! Gostaria de consultar um atendimento.',
    `Nome: ${data.get('nome')}`,
    `Profissional: ${profissional.nome}`,
    `Serviço: ${data.get('servico')}`,
    date ? `Data desejada: ${date.split('-').reverse().join('/')}` : '',
    data.get('mensagem') ? `Observações: ${data.get('mensagem')}` : '',
    'Aguardo informações sobre orçamento e disponibilidade.'
  ].filter(Boolean).join('\n');
  window.open(`https://wa.me/${profissional.numero}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});
dateInput.addEventListener('input', () => dateInput.setCustomValidity(''));
document.getElementById('year').textContent = String(new Date().getFullYear());
