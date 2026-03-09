# 🕯️ Fii o Lumină de Paște

Platformă de donații pentru campania **„Fii o Lumină de Paște"** organizată de **Asociația Something New**. Campania strânge fonduri pentru pachete alimentare destinate familiilor nevoiașe și pentru organizarea unei Mese Festive de Paște.

## Despre campanie

- **Pachete familie** — donații fixe de 150, 250 sau 400 lei pentru pachete alimentare
- **Masa Festivă** — donații cu sumă variabilă pentru organizarea mesei festive comunitare
- Progres vizibil în timp real pe pagina de donații
- Plăți securizate prin **EuPlatesc**

## Tehnologii

| Componentă   | Tehnologie                                      |
| ------------ | ----------------------------------------------- |
| Frontend     | HTML, CSS, Vanilla JS                           |
| Backend      | Supabase Edge Functions (Deno/TypeScript)       |
| Baza de date | Supabase (PostgreSQL)                           |
| Plăți        | EuPlatesc                                       |
| Hosting      | Static (orice hosting / GitHub Pages / Netlify) |

## Structura proiectului

```
├── index.html              # Pagina principală cu donații
├── success.html            # Pagina de confirmare plată
├── cancel.html             # Pagina de anulare plată
├── config.json             # Configurări Supabase (URL, chei publice)
├── css/style.css           # Stiluri
├── js/
│   ├── main.js             # UI: modale, carusel, scroll
│   ├── donations.js        # Logica de donații și integrare EuPlatesc
│   └── progress.js         # Bara de progres campanie
├── images/                 # Imagini familii
└── supabase/
    ├── schema.sql          # Schema bazei de date
    ├── seed.sql            # Date inițiale (campanie)
    └── functions/
        ├── create-payment/ # Generare link plată EuPlatesc
        └── notify/         # IPN handler (webhook EuPlatesc)
```

## Setup

### 1. Supabase

1. Creează un proiect pe [supabase.com](https://supabase.com)
2. Rulează `supabase/schema.sql` în SQL Editor pentru a crea tabelele
3. Rulează `supabase/seed.sql` pentru a adăuga campania inițială

### 2. Configurare frontend

Editează `config.json` cu datele proiectului tău Supabase:

```json
{
  "supabaseUrl": "https://YOUR_PROJECT.supabase.co",
  "supabasePublishableKey": "your_anon_key",
  "createPaymentUrl": "https://YOUR_PROJECT.supabase.co/functions/v1/create-payment"
}
```

### 3. Deploy Edge Functions

```bash
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase functions deploy create-payment
supabase functions deploy notify
```

### 4. Setare secrete

```bash
supabase secrets set EUPLATESC_MERCHANT_ID=your_merchant_id
supabase secrets set EUPLATESC_KEY=your_hex_key
supabase secrets set EUPLATESC_SUCCESS_URL=https://your-domain.com/success.html
supabase secrets set EUPLATESC_CANCEL_URL=https://your-domain.com/cancel.html
```

> `SUPABASE_URL` și `SUPABASE_SERVICE_ROLE_KEY` sunt disponibile automat în Edge Functions.

### 5. Hosting

Servește fișierele statice (`index.html`, `css/`, `js/`, `images/`) cu orice hosting static.

## Licență

Proiect realizat pentru Asociația Something New.
