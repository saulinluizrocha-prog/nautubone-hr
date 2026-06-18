// api/lead.js
// Serverless function (Vercel, runtime Node.js nativo).
// Recebe o POST do formulario da presell e repassa para a API da TerraLeads.
//
// IMPORTANTE - CONFIGURACAO DA CHAVE API:
// A chave NUNCA fica escrita neste arquivo. Configure-a no painel da Vercel:
// Project Settings > Environment Variables > adicione:
//   Nome:  TERRALEADS_API_KEY
//   Valor: (sua chave da TerraLeads para esta conta/plataforma)
// Cada ambiente/projeto na Vercel tem sua própria variável -- ao clonar este
// projeto para uma oferta nova, configure a variável de novo no painel daquele
// projeto especifico.

const crypto = require("crypto");

// ---------- DADOS FIXOS DESTA OFERTA ----------
// Estes dois você só muda se trocar de oferta/produto na TerraLeads.
const OFFER_ID = "8245";
const STREAM_ID = "vCQn";
const USER_ID = "75329"; // ID de afiliado TerraLeads (confirme se mudar de conta)
const API_DOMAIN = "https://t-api.org";
const DEFAULT_COUNTRY = "HR";

function checkSum(jsonData, apiKey) {
  return crypto.createHash("sha1").update(jsonData + apiKey).digest("hex");
}

async function callTerraLeads(apiKey, data) {
  const payload = JSON.stringify({ user_id: USER_ID, data });
  const sum = checkSum(payload, apiKey);
  const url = `${API_DOMAIN}/api/lead/create?check_sum=${encodeURIComponent(sum)}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
  });

  const text = await response.text();
  let body;
  try {
    body = JSON.parse(text);
  } catch {
    throw new Error("Resposta da TerraLeads não é JSON válido.");
  }

  if (body.status === "ok") return body.data;
  throw new Error(body.error || "Erro desconhecido na TerraLeads.");
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send("Method not allowed");
    return;
  }

  const apiKey = process.env.TERRALEADS_API_KEY;
  if (!apiKey) {
    res.status(500).send("TERRALEADS_API_KEY não configurada nas variáveis de ambiente da Vercel.");
    return;
  }

  const body = req.body || {};
  const query = req.query || {};

  if (!body.name || !body.phone) {
    res.redirect(302, req.headers.referer || "/");
    return;
  }

  const leadData = {
    name: String(body.name).trim(),
    phone: String(body.phone).trim(),
    offer_id: OFFER_ID,
    stream_id: STREAM_ID,
    country: body.country || DEFAULT_COUNTRY,
    region: body.region || null,
    city: body.city || null,
    address: body.address || null,
    email: body.email || null,
    zip: body.zip || null,
    user_comment: body.user_comment || null,
    referer: req.headers.referer || null,

    utm_source: query.utm_source || body.utm_source || null,
    utm_medium: query.utm_medium || body.utm_medium || null,
    utm_campaign: query.utm_campaign || body.utm_campaign || null,
    utm_term: query.utm_term || body.utm_term || null,
    utm_content: query.utm_content || body.utm_content || null,

    sub_id: query.sub_id || body.sub_id || null,
    sub_id_1: query.sub_id_1 || body.sub_id_1 || null,
    sub_id_2: query.sub_id_2 || body.sub_id_2 || null,
    sub_id_3: query.sub_id_3 || body.sub_id_3 || null,
    sub_id_4: query.sub_id_4 || body.sub_id_4 || null,
  };

  try {
    const lead = await callTerraLeads(apiKey, leadData);
    res.redirect(302, `/success.html?id=${lead.id}`);
  } catch (err) {
    res.status(500).send("Erro ao enviar lead: " + err.message);
  }
};
