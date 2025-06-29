# 🧠 Pravděpodobnostní fráze - Online verze

Profesionální webová aplikace pro sběr dat o českých pravděpodobnostních frázích s Supabase databází a skrytou administrací.

## 🚀 Quick Start

### 1. Nastavení Supabase

1. **Vytvoř projekt na [supabase.com](https://supabase.com)**
   - Registruj se / přihlaš se
   - Klikni "New Project"
   - Vyber organizaci, zadej název: `probab-phrases`
   - Vygeneruj silné heslo
   - Vyber region: `Central EU (Frankfurt)`

2. **Vytvoř tabulky**
   - Jdi do **SQL Editor** v Supabase
   - Zkopíruj a spusť obsah `supabase-schema.sql`
   - Tím se vytvoří všechny potřebné tabulky a indexy

3. **Získej přístupové údaje**
   - Jdi do **Settings** → **API**
   - Zkopíruj:
     - **URL**: `https://xxxxx.supabase.co`
     - **anon public key**: `eyJhbGciOiJI...`

### 2. Konfigurace aplikace

1. **Otevři `config.js`**
2. **Uprav tyto řádky:**
   ```javascript
   SUPABASE_URL: 'https://tvuj-projekt.supabase.co',
   SUPABASE_ANON_KEY: 'tvuj-anon-key',
   ADMIN_PASSWORD: 'tvoje-silne-heslo',
   ```

### 3. Nasazení

#### 🎯 Netlify (Doporučeno - nejjednodušší)
1. Nahraj složku `online-probab` na GitHub
2. Jdi na [netlify.com](https://netlify.com)
3. Klikni "New site from Git"
4. Vyber svůj GitHub repo
5. **Deploy!** ✨

#### 🎯 Vercel
1. Nahraj na GitHub
2. Jdi na [vercel.com](https://vercel.com)
3. Import GitHub repo
4. **Deploy!** ✨

#### 🎯 GitHub Pages
1. Nahraj na GitHub
2. Jdi do Settings → Pages
3. Vyber source: GitHub Actions
4. **Deploy!** ✨

## 📁 Struktura projektu

```
online-probab/
├── index.html           # 🌐 Hlavní webová aplikace
├── admin.html           # 🔐 Skrytá administrace
├── config.js            # ⚙️ Konfigurace (editovatelná)
├── database.js          # 🗃️ Supabase funkce
├── supabase-schema.sql  # 📊 SQL schéma pro databázi
└── README.md           # 📖 Tento návod
```

## 🎮 Jak používat

### 🌐 Hlavní web
- Uživatelé jdou na tvou URL (např. `https://tvoj-web.netlify.app`)
- Vyplní demografické údaje
- Odpoví na 10 otázek pomocí sliderů
- Uvidí porovnání s ostatními

### 🔐 Administrace
- Jdi na `https://tvoj-web.netlify.app/admin.html`
- Nebo `https://tvoj-web.netlify.app/admin.html?key=tvoje-heslo`
- Přihlaš se svým admin heslem
- Máš přístup k:
  - 📊 **Dashboard** - statistiky, grafy, counts
  - 📋 **Data** - všechny odpovědi, filtry, export CSV/JSON
  - ✏️ **Editor otázek** - úprava otázek online
  - ⚙️ **Systém** - monitoring databáze

## 🛠️ Úprava otázek

### Způsob 1: Online (doporučeno)
1. Jdi do admin panelu
2. Sekce "Editor otázek"
3. Uprav, přidej, smaž otázky
4. Klikni "Uložit změny"

### Způsob 2: Soubor
1. Otevři `config.js`
2. Uprav sekci `QUESTIONS`
3. Upload na server

## 📊 Export dat

- **Admin panel**: Export CSV/JSON tlačítka
- **API**: `https://tvuj-web.com/api/export` (později)
- **Supabase**: Přímý přístup k databázi

## 🎨 Customizace

### Změna vzhledu
- Uprav CSS v `index.html` a `admin.html`
- Změň barvy v `:root` CSS proměnných

### Změna textu
- Uprav `config.js` sekci s texty
- Nebo přímo v HTML souborech

### Přidání funkcí
- Edituj `database.js` pro nové API funkce
- Přidej nové stránky / komponenty

## 🔒 Bezpečnost

### Admin přístup
- Změň `ADMIN_PASSWORD` v config.js
- Admin URL můžeš skrýt/přejmenovat

### GDPR Compliance
- ✅ Anonymní sběr dat
- ✅ EU hosting (Supabase Frankfurt)
- ✅ Žádné cookies
- ✅ IP hash místo přímé IP
- ✅ Volitelný email

### Rate Limiting
- Supabase má built-in rate limiting
- Pro více ochrany přidej Cloudflare

## 📈 Monitoring

### Supabase Dashboard
- Real-time databáze monitoring
- Query performance
- API usage

### Admin Panel
- Živé statistiky
- Graf odpovědí
- Demografické údaje

## 🔧 Troubleshooting

### Databáze nefunguje
1. Zkontroluj Supabase URL a klíč v `config.js`
2. Zkontroluj, že RLS (Row Level Security) je správně nastavena
3. Otevři browser console pro error zprávy

### Admin přístup nefunguje
1. Zkontroluj heslo v `config.js`
2. Zkus URL s parametrem: `?key=tvoje-heslo`

### Grafy se nezobrazují
1. Zkontroluj, že máš data v databázi
2. Otevři browser console pro error zprávy

## 🚀 Performance Tips

### Optimalizace
- Supabase má built-in caching
- Statické soubory jsou cachované browsery
- Grafy se načítají lazy

### Škálování
- Supabase free tier: 500MB, 2GB transfer
- Pro více trafficu upgrade na Pro: $25/měsíc
- Možno přidat CDN (Cloudflare)

## 💡 Rozšíření

### Možná vylepšení
- 🔔 Email notifikace při nové odpovědi
- 📱 PWA (Progressive Web App)
- 🌍 Vícejazyčnost
- 📊 Advanced analytics
- 🔐 User auth pro opakované vyplnění
- 📤 Auto-export do Google Sheets
- 🤖 AI analýza odpovědí

### API Endpoints (pro budoucí rozšíření)
- `GET /api/stats` - statistiky
- `POST /api/submit` - nová odpověď
- `GET /api/export` - export dat
- `GET /api/health` - health check

## 📞 Support

Pro technickou podporu nebo custom úpravy kontaktuj vývojáře.

---

**🎉 Hotovo! Máš profesionální výzkumnou aplikaci připravenou na tisíce uživatelů!**