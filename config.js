// Konfigurace aplikace
const CONFIG = {
  // Supabase konfigurace - POZOR: Nastavte environment variables v Netlify!
  // Tyto hodnoty musíte vyplnit ručně po nasazení
  SUPABASE_URL: 'https://zjmzvuobafpvirhlrpvb.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqbXp2dW9iYWZwdmlyaGxycHZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyMDYwNTEsImV4cCI6MjA2Njc4MjA1MX0.Zp6EroBrtIHMaJj130PRIwrn-qXgwbfumH1kyqOzozc',
  
  // Admin konfigurace
  ADMIN_PASSWORD: 'probab68!!?',
  
  // Aplikace nastavení
  APP_TITLE: 'Tenhle dotazník "pravděpodobně" vyplníte. Nebo ne?',
  APP_SUBTITLE: 'Jak rozumíme neformálnímu, slovnímu vyjádření pravděpodobnosti?',
  APP_DESCRIPTION: 'Je víc "asi", anebo "nejspíš"? Vyplňte krátký dotazník a porovnejte se s ostatními.',
  
  // Otázky - lze upravit online přes admin
  QUESTIONS: [
    {
      id: 'pravdepodobne',
      question: 'Jaké bude počasí na víkend?',
      text: 'Pravděpodobně to bude dobré.',
      context: 'Počasí na víkend'
    },
    {
      id: 'mozna',
      question: 'Přijdeš na párty?',
      text: 'Možná přijdu.',
      context: 'Na párty'
    },
    {
      id: 'urcite',
      question: 'Zvládneme tento projekt?',
      text: 'Určitě to zvládneme.',
      context: 'Projekt v práci'
    },
    {
      id: 'asi',
      question: 'Bude zítra pršet?',
      text: 'Asi bude pršet.',
      context: 'Zítřejší počasí'
    },
    {
      id: 'zrejme',
      question: 'Stihneš schůzku včas?',
      text: 'Zřejmě se opozdím.',
      context: 'Schůzka'
    },
    {
      id: 'nepravdepodobne',
      question: 'Vyhrajeme v loterii?',
      text: 'Nepravděpodobně se to stane.',
      context: 'Výhra v loterii'
    },
    {
      id: 'skoro-jiste',
      question: 'Projdeme zkouškou?',
      text: 'Skoro jistě uspějeme.',
      context: 'Zkouška'
    },
    {
      id: 'pochybuji',
      question: 'Stihneme termín projektu?',
      text: 'Pochybuji, že to stihneme.',
      context: 'Termín projektu'
    },
    {
      id: 'snad',
      question: 'Bude nová aplikace fungovat?',
      text: 'Snad to bude fungovat.',
      context: 'Nová aplikace'
    },
    {
      id: 'velmi-pravdepodobne',
      question: 'Přijde host na večeři?',
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
