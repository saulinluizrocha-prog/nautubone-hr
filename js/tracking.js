/* ============================================
   TRACKING.JS — captura de parâmetros da URL,
   máscara de telefone, validação do form.
   ============================================ */

(function () {
  "use strict";

  function getParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name) || "";
  }

  function injectHiddenFields(form) {
    OFFER_CONFIG.trackingParams.forEach(function (key) {
      const value = getParam(key);
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });
  }

  function attachPhoneMask(phoneInput) {
    if (!phoneInput) return;
    phoneInput.addEventListener("input", function (e) {
      let v = e.target.value.replace(/[^\d]/g, "").slice(0, 12);
      if (v.length > 3 && v.length <= 6) v = v.replace(/(\d{3})(\d+)/, "$1 $2");
      else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d+)/, "$1 $2 $3");
      e.target.value = v;
    });
  }

  function attachValidation(form, nameInput, phoneInput) {
    form.addEventListener("submit", function (e) {
      const nameOk = nameInput && nameInput.value.trim().length >= 2;
      const phoneRaw = phoneInput && phoneInput.value.replace(/\s+/g, "");
      const phoneOk = phoneRaw && phoneRaw.length >= 8;

      if (!nameOk || !phoneOk) {
        e.preventDefault();
        if (!nameOk) nameInput.focus();
        else if (!phoneOk) phoneInput.focus();
        alert(OFFER_CONFIG.textos.erroValidacao);
        return false;
      }

      const btn = form.querySelector(".cta-button");
      if (btn) {
        btn.disabled = true;
        btn.textContent = OFFER_CONFIG.textos.enviando;
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("order_form");
    if (!form) return;

    form.action = OFFER_CONFIG.form.actionUrl;
    form.method = OFFER_CONFIG.form.method;

    injectHiddenFields(form);
    attachPhoneMask(document.getElementById("label_phone"));
    attachValidation(form, document.getElementById("label_name"), document.getElementById("label_phone"));
  });
})();
