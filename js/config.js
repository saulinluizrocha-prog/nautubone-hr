/* ============================================
   CONFIG DA OFERTA — Nautubone, Croácia (HR)
   ============================================ */

const OFFER_CONFIG = {

  produto: {
    nome: "Nautubone",
    imagemFront: "img/nautubone_front.webp",
    imagemBack: "img/nautubone_back.webp",
  },

  oferta: {
    moeda: "€",
    precoDe: 78,
    precoPor: 39,
    percentualDesconto: 50,
  },

  geo: {
    paisCodigo: "HR",
    paisNome: "Hrvatska",
    paisDDI: "+385",
    idioma: "hr",
  },

  // Endpoint local: a serverless function cuida do resto (offer_id, stream_id,
  // chamada pra TerraLeads). Não precisa editar isso por oferta.
  form: {
    actionUrl: "/api/lead",
    method: "post",
  },

  trackingParams: [
    "gclid",
    "sub_id",
    "sub_id_1",
    "sub_id_2",
    "sub_id_3",
    "sub_id_4",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
  ],

  textos: {
    badgeOferta: "OGRANIČENA PONUDA",
    tituloForm: "Naručite Nautubone sada!",
    subtituloForm: "Popunite podatke i osigurajte svoju sniženu cijenu",
    labelPais: "Država",
    labelNome: "Vaše ime i prezime:",
    placeholderNome: "Ime i prezime",
    labelTelefone: "Broj telefona:",
    placeholderTelefone: "61 123 456",
    ajudaTelefone: "Naš operater će nazvati radi potvrde narudžbe.",
    botaoCta: "🛒 Naručite odmah",
    pagamento: "Plaćanje pri dostavi - platite kada primite paket",
    erroValidacao: "Molimo ispravno unesite ime i broj telefona.",
    enviando: "Slanje...",
  },
};
