/* ============================================
   MAIN.JS — injeta os dados de OFFER_CONFIG
   nos elementos da página.
   ============================================ */

(function () {
  "use strict";

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function setAttr(id, attr, value) {
    const el = document.getElementById(id);
    if (el) el.setAttribute(attr, value);
  }

  document.addEventListener("DOMContentLoaded", function () {
    const o = OFFER_CONFIG;

    document.documentElement.lang = o.geo.idioma;

    setText("price-old-value", o.oferta.moeda + " " + o.oferta.precoDe);
    setText("price-old-value-sticky", o.oferta.moeda + " " + o.oferta.precoDe);
    setText("price-new-value", o.oferta.moeda + " " + o.oferta.precoPor);
    setText("price-new-value-sticky", o.oferta.moeda + " " + o.oferta.precoPor);
    setText("price-discount-value", "🔥 -" + o.oferta.percentualDesconto + "% 🔥");

    setText("form-badge", o.textos.badgeOferta);
    setText("form-title", o.textos.tituloForm);
    setText("form-subtitle", o.textos.subtituloForm);
    setText("label-pais", o.textos.labelPais);
    setText("label-nome", o.textos.labelNome);
    setAttr("label_name", "placeholder", o.textos.placeholderNome);
    setText("label-telefone", o.textos.labelTelefone);
    setAttr("label_phone", "placeholder", o.textos.placeholderTelefone);
    setText("phone-ddi", o.geo.paisDDI);
    setText("ajuda-telefone", o.textos.ajudaTelefone);
    setText("cta-button-text", o.textos.botaoCta);
    setText("payment-info-text", o.textos.pagamento);

    const paisOption = document.getElementById("pais-option");
    if (paisOption) {
      paisOption.value = o.geo.paisCodigo;
      paisOption.textContent = o.geo.paisNome;
    }

    document.querySelectorAll(".product-img-front").forEach(function (img) {
      img.src = o.produto.imagemFront;
      img.alt = o.produto.nome;
    });
    document.querySelectorAll(".product-img-back").forEach(function (img) {
      img.src = o.produto.imagemBack;
      img.alt = o.produto.nome + " - poleđina";
    });

    document.querySelectorAll(".produto-nome").forEach(function (el) {
      el.textContent = o.produto.nome;
    });
  });
})();
