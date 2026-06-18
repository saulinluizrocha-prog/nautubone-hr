# Nautubone - Presell HR (Croácia)

## Antes de subir na Vercel

1. No painel da Vercel, vá em **Project Settings > Environment Variables**.
2. Adicione:
   - **Nome:** `c66289394c2a6e8515c8e8b382fba719`
   - **Valor:** sua chave de API da TerraLeads para essa conta/plataforma de anúncio
3. Salve e faça o deploy (ou redeploy se já tinha subido sem a variável).

A chave nunca está escrita em nenhum arquivo deste projeto. Isso é proposital: se você
reaproveitar este projeto pra outra plataforma de anúncio, é só trocar o valor dessa
variável no painel, sem tocar no código.

## Dados fixos desta oferta (em `api/lead.js`)

- offer_id: `406096`
- stream_id: `vCQn`
- país padrão: `HR`

Se for clonar esse projeto pra outra oferta, troque esses três valores no topo do
`api/lead.js` e os textos/preço em `js/config.js`.

## Estrutura

```
index.html        - página principal (copy em croata)
success.html       - página de obrigado pós-formulário
css/style.css       - visual
js/config.js        - preço, textos, geo (edite por oferta)
js/main.js          - injeta config.js na página (não editar)
js/tracking.js       - captura de tracking e valida o form (não editar)
api/lead.js          - serverless function que envia o lead pra TerraLeads
vercel.json          - configuração do runtime Node da function
```

## Pendências antes de ir ao ar

- [ ] Trocar as imagens placeholder em `img/` pelas reais do produto (front/back)
- [ ] Confirmar `user_id` (75329) no `api/lead.js` é o correto pra essa conta
- [ ] Testar o envio do formulário em ambiente de preview da Vercel antes de rodar tráfego
