// Supabase databázové funkce
class Database {
  constructor() {
    this.supabase = null;
    this.initialized = false;
  }
  
  async init() {
    if (this.initialized) return;
    
    try {
      // Import Supabase (z CDN)
      const { createClient } = supabase;
      this.supabase = createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);
      this.initialized = true;
      console.log('✅ Supabase připojen');
    } catch (error) {
      console.error('❌ Chyba připojení k Supabase:', error);
      throw error;
    }
  }
  
  // Uložení odpovědi
  async saveResponse(demographics, answers) {
    await this.init();
    
    try {
      // Uložení základní odpovědi
      const { data: response, error: responseError } = await this.supabase
        .from('survey_responses')
        .insert([{
          created_at: new Date().toISOString(),
          user_agent: navigator.userAgent,
          ip_hash: await this.hashIP() // Anonymní hash IP
        }])
        .select()
        .single();
      
      if (responseError) throw responseError;
      
      // Uložení demografických dat
      const { error: demoError } = await this.supabase
        .from('demographics')
        .insert([{
          response_id: response.id,
          age: demographics.age,
          gender: demographics.gender,
          email: demographics.email || null
        }]);
      
      if (demoError) throw demoError;
      
      // Uložení odpovědí na otázky
      const answersToInsert = answers
        .filter(answer => answer.probability !== null)
        .map(answer => ({
          response_id: response.id,
          question_id: answer.question_id,
          probability: answer.probability
        }));
      
      if (answersToInsert.length > 0) {
        const { error: answersError } = await this.supabase
          .from('phrase_answers')
          .insert(answersToInsert);
        
        if (answersError) throw answersError;
      }
      
      return { success: true, id: response.id };
      
    } catch (error) {
      console.error('Chyba při ukládání:', error);
      return { success: false, error: error.message };
    }
  }
  
  // Získání statistik
  async getStats() {
    await this.init();
    
    try {
      const { data, error } = await this.supabase
        .from('phrase_answers')
        .select('question_id, probability');
      
      if (error) throw error;
      
      // Výpočet mediánů
      const grouped = {};
      data.forEach(row => {
        if (!grouped[row.question_id]) {
          grouped[row.question_id] = [];
        }
        grouped[row.question_id].push(row.probability);
      });
      
      const stats = {};
      Object.entries(grouped).forEach(([questionId, probabilities]) => {
        const sorted = probabilities.sort((a, b) => a - b);
        const len = sorted.length;
        const median = len % 2 === 0 
          ? (sorted[len/2 - 1] + sorted[len/2]) / 2
          : sorted[Math.floor(len/2)];
        
        stats[questionId] = {
          median: Math.round(median),
          count: len
        };
      });
      
      return stats;
      
    } catch (error) {
      console.error('Chyba při načítání statistik:', error);
      return {};
    }
  }
  
  // Admin funkce - všechna data
  async getAllData() {
    await this.init();
    
    try {
      const { data, error } = await this.supabase
        .from('survey_responses')
        .select(`
          *,
          demographics (*),
          phrase_answers (*)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
      
    } catch (error) {
      console.error('Chyba při načítání admin dat:', error);
      return [];
    }
  }
  
  // Počet odpovědí
  async getResponseCount() {
    await this.init();
    
    try {
      const { count, error } = await this.supabase
        .from('survey_responses')
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      return count || 0;
      
    } catch (error) {
      console.error('Chyba při počítání:', error);
      return 0;
    }
  }
  
  // Anonymní hash IP adresy (pro detekci duplicit)
  async hashIP() {
    try {
      // Získání IP z veřejného API
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      
      // Vytvoření hash z IP
      const encoder = new TextEncoder();
      const data_encoded = encoder.encode(data.ip + 'salt_string_123');
      const hashBuffer = await crypto.subtle.digest('SHA-256', data_encoded);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 16);
      
    } catch (error) {
      console.error('Chyba při hash IP:', error);
      return 'unknown';
    }
  }
  
  // Test připojení
  async testConnection() {
    await this.init();
    
    try {
      const { data, error } = await this.supabase
        .from('survey_responses')
        .select('count')
        .limit(1);
      
      return !error;
    } catch (error) {
      return false;
    }
  }
}

// Globální instance
const db = new Database();