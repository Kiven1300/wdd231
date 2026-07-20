// Stamp the hidden timestamp field when the page loads
const timestampField = document.querySelector('#timestamp');
if (timestampField) {
  timestampField.value = new Date().toISOString();
}
