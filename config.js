// Konfigurace aplikace
const CONFIG = {
  // Supabase konfigurace - POZOR: Nastavte environment variables v Netlify!
  // Tyto hodnoty musíte vyplnit ručně po nasazení
  SUPABASE_URL: 'https://zjmzvuobafpvirhlrpvb.supabase.co',
  SUPABASE_ANON_KEY: 'PLEASE_SET_YOUR_NEW_ANON_KEY_HERE',
  
  // Admin konfigurace
  ADMIN_PASSWORD: 'PLEASE_SET_YOUR_ADMIN_PASSWORD_HERE',
  
  // Aplikace nastavení
  APP_TITLE: 'Tenhle dotazník "pravděpodobně" vyplníte. Nebo ne?',
  APP_SUBTITLE: 'Jak rozumíme neformálnímu, slovnímu vyjádření pravděpodobnosti?',
  APP_DESCRIPTION: 'Je víc "asi", anebo "nejspíš"? Vyplňte krátký dotazník a porovnejte se s ostatními.',
  
  // Otázky - lze upravit online přes admin
  QUESTIONS: [
    {
      id: 'pravdepodobne',
      text: 'Pravděpodobně to bude dobré.',
      context: 'Počasí na víkend'
    },
    {
      id: 'mozna',
      text: 'Možná přijdu.',
      context: 'Na párty'
    },
    {
      id: 'urcite',
      text: 'Určitě to zvládneme.',
      context: 'Projekt v práci'
    },
    {
      id: 'asi',
      text: 'Asi bude pršet.',
      context: 'Zítřejší počasí'
    },
    {
      id: 'zrejme',
      text: 'Zřejmě se opozdím.',
      context: 'Schůzka'
    },
    {
      id: 'nepravdepodobne',
      text: 'Nepravděpodobně se to stane.',
      context: 'Výhra v loterii'
    },
    {
      id: 'skoro-jiste',
      text: 'Skoro jistě uspějeme.',
      context: 'Zkouška'
    },
    {
      id: 'pochybuji',
      text: 'Pochybuji, že to stihneme.',
      context: 'Termín projektu'
    },
    {
      id: 'snad',
      text: 'Snad to bude fungovat.',
      context: 'Nová aplikace'
    },
    {
      id: 'velmi-pravdepodobne',
      text: 'Velmi pravděpodobně přijde.',
      context: 'Host na večeři'
    }
  ],
  
  // Demografické možnosti
  DEMOGRAPHICS: {
    age: [
      { value: 'under-18', label: 'méně než 18' },
      { value: '19-39', label: '19 - 39' },
      { value: '40-59', label: '40 - 59' },
      { value: '60+', label: '60 a víc' }
    ],
    gender: [
      { value: 'male', label: 'Muž' },
      { value: 'female', label: 'Žena' },
      { value: 'other', label: 'Nechci říci' }
    ]
  }
};