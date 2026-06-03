const whatsappNumber = '201127344298';
const whatsappUrl = `https://wa.me/${whatsappNumber}`;
const unitPrice = 50;

const form = document.querySelector('#order-form');
const errorElements = document.querySelectorAll('[data-error-for]');
const whatsappLinks = document.querySelectorAll('.js-whatsapp-link');
const totalPrice = document.querySelector('#total-price');

whatsappLinks.forEach((link) => {
  link.setAttribute('href', whatsappUrl);
});

const errorMap = [...errorElements].reduce((currentMap, element) => {
  currentMap[element.dataset.errorFor] = element;
  return currentMap;
}, {});

const formatPrice = (quantity) => `${quantity * unitPrice} EGP`;

const updateTotal = () => {
  const quantity = Math.max(Number(form.elements.quantity.value) || 1, 1);
  totalPrice.textContent = formatPrice(quantity);
  return quantity * unitPrice;
};

const setFieldError = (fieldName, message = '') => {
  const field = form.elements[fieldName];
  const errorElement = errorMap[fieldName];

  if (!field || !errorElement) {
    return;
  }

  field.setAttribute('aria-invalid', message ? 'true' : 'false');
  errorElement.textContent = message;
};

const clearErrors = () => {
  Object.keys(errorMap).forEach((fieldName) => setFieldError(fieldName));
};

const validateForm = () => {
  const errors = {};
  const cleanPhone = form.elements.phone.value.replace(/\s/g, '');

  if (!form.elements.name.value.trim()) {
    errors.name = 'اكتب اسمك من فضلك.';
  }

  if (!cleanPhone) {
    errors.phone = 'اكتب رقم الموبايل.';
  } else if (!/^01[0-9]{9}$/.test(cleanPhone)) {
    errors.phone = 'اكتب رقم موبايل مصري صحيح مكوّن من 11 رقم.';
  }

  if (!form.elements.address.value.trim()) {
    errors.address = 'اكتب العنوان داخل الإسكندرية بالتفصيل.';
  }

  if (!form.elements.quantity.value || Number(form.elements.quantity.value) < 1) {
    errors.quantity = 'اختار كمية صحيحة.';
  }

  return errors;
};

const buildOrderMessage = () => {
  const quantity = Math.max(Number(form.elements.quantity.value) || 1, 1);
  const notes = form.elements.notes.value.trim() || '-';

  return [
    'New Order - Ze2reda',
    `Name: ${form.elements.name.value.trim()}`,
    `Phone: ${form.elements.phone.value.trim()}`,
    `Address: ${form.elements.address.value.trim()}`,
    `Quantity: ${quantity}`,
    `Total: ${quantity * unitPrice} EGP`,
    `Notes: ${notes}`,
  ].join('\n');
};

const openWhatsAppOrder = () => {
  const message = encodeURIComponent(buildOrderMessage());
  const orderUrl = `${whatsappUrl}?text=${message}`;
  const openedWindow = window.open(orderUrl, '_blank', 'noopener,noreferrer');

  if (!openedWindow) {
    window.location.href = orderUrl;
  }
};

form.addEventListener('input', (event) => {
  if (event.target.name === 'quantity') {
    updateTotal();
  }

  if (event.target.name && errorMap[event.target.name]) {
    setFieldError(event.target.name);
  }
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  clearErrors();

  const errors = validateForm();

  if (Object.keys(errors).length > 0) {
    Object.entries(errors).forEach(([fieldName, message]) => setFieldError(fieldName, message));
    form.querySelector('[aria-invalid="true"]')?.focus();
    return;
  }

  openWhatsAppOrder();
});

updateTotal();
