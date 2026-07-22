const initializeContactForms = () => {
  document.querySelectorAll('[data-contact-form]').forEach((element) => {
    if (!(element instanceof HTMLFormElement) || element.dataset.enhanced === 'true') return;

    const form = element;
    const submitButton = form.querySelector('button[type="submit"]');
    const status = form.querySelector('[data-contact-status]');
    const requiredFields = [...form.querySelectorAll('input[required], select[required], textarea[required]')];
    let submitting = false;

    if (!(submitButton instanceof HTMLButtonElement) || !(status instanceof HTMLElement)) return;

    form.dataset.enhanced = 'true';

    const setFieldValidity = (field) => {
      if (!(field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement)) return;

      field.setCustomValidity('');
      if (field instanceof HTMLInputElement && ['checkbox', 'radio'].includes(field.type) && field.required && !field.checked) {
        field.setCustomValidity(form.dataset.requiredMessage ?? 'Complete this field.');
      } else if (field.required && field.value.trim() === '') {
        field.setCustomValidity(form.dataset.requiredMessage ?? 'Complete this field.');
      } else if (field instanceof HTMLInputElement && field.type === 'email' && field.validity.typeMismatch) {
        field.setCustomValidity(form.dataset.emailMessage ?? 'Enter a valid email address.');
      }
    };

    requiredFields.forEach((field) => {
      field.addEventListener('input', () => setFieldValidity(field));
      field.addEventListener('change', () => setFieldValidity(field));
      field.addEventListener('invalid', () => setFieldValidity(field));
    });

    const showStatus = (message, kind) => {
      status.setAttribute('role', kind === 'error' ? 'alert' : 'status');
      status.dataset.state = kind;
      status.textContent = message;
      status.focus({ preventScroll: true });
    };

    form.addEventListener('submit', async (event) => {
      if (submitting) return;

      // Keep the HTML action/method as the final fallback. If fetch is unavailable,
      // or a previous enhanced request failed, allow the browser to submit natively.
      if (typeof window.fetch !== 'function' || form.dataset.nativeFallback === 'true') return;

      event.preventDefault();

      requiredFields.forEach(setFieldValidity);
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      submitting = true;
      submitButton.disabled = true;
      submitButton.textContent = submitButton.dataset.submittingLabel ?? 'Sending...';
      status.setAttribute('role', 'status');
      status.textContent = '';
      delete status.dataset.state;

      const formData = new FormData(form);
      for (const [fieldName, value] of formData.entries()) {
        if (typeof value === 'string') formData.set(fieldName, value.trim());
      }

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' },
        });

        const contentType = response.headers.get('content-type') ?? '';
        if (!response.ok || !contentType.includes('application/json')) throw new Error('Form submission failed');

        const payload = await response.json();
        if (payload?.ok !== true) throw new Error('Form submission was not confirmed');

        form.reset();
        requiredFields.forEach((field) => field.setCustomValidity(''));
        showStatus(form.dataset.successMessage ?? 'Your message has been sent.', 'success');
      } catch {
        form.dataset.nativeFallback = 'true';
        showStatus(form.dataset.errorMessage ?? 'The message could not be sent.', 'error');
      } finally {
        submitting = false;
        submitButton.disabled = false;
        submitButton.textContent = submitButton.dataset.idleLabel ?? 'Send message';
      }
    });
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeContactForms, { once: true });
} else {
  initializeContactForms();
}

document.addEventListener('astro:page-load', initializeContactForms);
