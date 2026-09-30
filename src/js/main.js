import '../styles/style.css';

const $ = (selector) => document.querySelector(selector);

// ---------- Toast ----------
function showToast(message) {
  const toast = $('#copy-toast');
  $('#toast-text').textContent = message;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 3000);
}

// ---------- Copiar contato ----------
async function copyText(text, button) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(`Copiado: ${text}`);
    const original = button.innerHTML;
    button.innerHTML =
      '<span class="material-symbols-outlined text-sm text-emerald-400">done</span><span class="text-emerald-400">Copiado!</span>';
    setTimeout(() => (button.innerHTML = original), 2000);
  } catch {
    showToast('Erro ao copiar');
  }
}

// ---------- Modal de projeto ----------
const modal = $('#project-modal');
const openModal = ({ title, description, url }) => {
  $('#modal-title').textContent = title;
  $('#modal-desc').textContent = description;
  $('#modal-link').href = url;
  modal.classList.remove('hidden');
};
const closeModal = () => modal.classList.add('hidden');

// ---------- Eventos (delegação via data-attributes) ----------
document.addEventListener('click', (event) => {
  const copy = event.target.closest('[data-copy]');
  if (copy) return copyText(copy.dataset.copy, copy);

  const project = event.target.closest('[data-project]');
  if (project) return openModal(project.dataset);

  if (event.target.closest('[data-modal-close]') || event.target === modal) closeModal();
});
document.addEventListener('keydown', (event) => event.key === 'Escape' && closeModal());

// ---------- Menu mobile ----------
const menu = $('#mobile-menu');
$('#mobile-nav-toggle').addEventListener('click', () => menu.classList.toggle('hidden'));
menu
  .querySelectorAll('a')
  .forEach((link) => link.addEventListener('click', () => menu.classList.add('hidden')));

// ---------- Ano do rodapé ----------
$('[data-year]').textContent = new Date().getFullYear();
