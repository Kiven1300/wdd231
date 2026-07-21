const timestampField = document.querySelector('#timestamp');

if (timestampField) {
  timestampField.value = new Date().toISOString();
}

const modalButtons = document.querySelectorAll('[data-dialog]');
const closeButtons = document.querySelectorAll('.close-modal');

modalButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const dialogId = button.getAttribute('data-dialog');
    const dialog = document.querySelector(`#${dialogId}`);

    if (dialog) {
      dialog.showModal();
    }
  });
});

closeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const dialog = button.closest('dialog');

    if (dialog) {
      dialog.close();
    }
  });
});

document.querySelectorAll('dialog').forEach((dialog) => {
  dialog.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();
    const clickedInDialog =
      rect.top <= event.clientY
      && event.clientY <= rect.top + rect.height
      && rect.left <= event.clientX
      && event.clientX <= rect.left + rect.width;

    if (!clickedInDialog) {
      dialog.close();
    }
  });
});
