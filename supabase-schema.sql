-- Supabase SQL schéma pro Pravděpodobnostní fráze aplikaci
-- Spusť tento kód v Supabase SQL editoru

-- 1. Tabulka pro základní odpovědi
CREATE TABLE survey_responses (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_agent TEXT,
    ip_hash VARCHAR(32)
);

-- 2. Tabulka pro demografické údaje
CREATE TABLE demographics (
    id BIGSERIAL PRIMARY KEY,
    response_id BIGINT REFERENCES survey_responses(id) ON DELETE CASCADE,
    age VARCHAR(10) NOT NULL,
    gender VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabulka pro odpovědi na otázky
CREATE TABLE phrase_answers (
    id BIGSERIAL PRIMARY KEY,
    response_id BIGINT REFERENCES survey_responses(id) ON DELETE CASCADE,
    question_id VARCHAR(50) NOT NULL,
    probability INTEGER NOT NULL CHECK (probability >= 0 AND probability <= 100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Indexy pro lepší výkon
CREATE INDEX idx_survey_responses_created_at ON survey_responses(created_at);
CREATE INDEX idx_survey_responses_ip_hash ON survey_responses(ip_hash);
CREATE INDEX idx_demographics_response_id ON demographics(response_id);
CREATE INDEX idx_demographics_age ON demographics(age);
CREATE INDEX idx_demographics_gender ON demographics(gender);
CREATE INDEX idx_phrase_answers_response_id ON phrase_answers(response_id);
CREATE INDEX idx_phrase_answers_question_id ON phrase_answers(question_id);
CREATE INDEX idx_phrase_answers_probability ON phrase_answers(probability);

-- 5. Row Level Security (RLS) polícy
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE demographics ENABLE ROW LEVEL SECURITY;
ALTER TABLE phrase_answers ENABLE ROW LEVEL SECURITY;

-- Povolení čtení a zápisu pro anonymní uživatele
CREATE POLICY "Enable read access for all users" ON survey_responses FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON survey_responses FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON demographics FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON demographics FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON phrase_answers FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON phrase_answers FOR INSERT WITH CHECK (true);

-- 6. Trigger pro automatické mazání starých dat (volitelné)
-- Automaticky maže data starší než 2 roky
CREATE OR REPLACE FUNCTION cleanup_old_data()
RETURNS VOID AS $$
BEGIN
    DELETE FROM survey_responses 
    WHERE created_at < NOW() - INTERVAL '2 years';
END;
$$ LANGUAGE plpgsql;

-- Spustit cleanup každý měsíc (nastavíš v Supabase Cron Jobs)
-- SELECT cron.schedule('cleanup-old-data', '0 0 1 * *', 'SELECT cleanup_old_data()');

-- 7. View pro statistiky (rychlejší dotazy)
CREATE OR REPLACE VIEW question_stats AS
SELECT 
    question_id,
    COUNT(*) as total_answers,
    AVG(probability) as average_probability,
    PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY probability) as median_probability,
    MIN(probability) as min_probability,
    MAX(probability) as max_probability,
    STDDEV(probability) as std_probability
FROM phrase_answers
GROUP BY question_id;

-- 8. View pro demografické statistiky
CREATE OR REPLACE VIEW demographic_stats AS
SELECT 
    age,
    gender,
    COUNT(*) as count
FROM demographics
GROUP BY age, gender
ORDER BY age, gender;

-- 9. View pro denní statistiky
CREATE OR REPLACE VIEW daily_stats AS
SELECT 
    DATE(created_at) as date,
    COUNT(*) as responses,
    COUNT(DISTINCT ip_hash) as unique_users
FROM survey_responses
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- 10. Funkce pro získání mediánu (pro kompatibilitu s JS)
CREATE OR REPLACE FUNCTION get_question_median(question_id_param TEXT)
RETURNS NUMERIC AS $$
BEGIN
    RETURN (
        SELECT PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY probability)
        FROM phrase_answers 
        WHERE question_id = question_id_param
    );
END;
$$ LANGUAGE plpgsql;

-- 11. Funkce pro export dat
CREATE OR REPLACE FUNCTION export_survey_data()
RETURNS TABLE (
    response_id BIGINT,
    created_at TIMESTAMP WITH TIME ZONE,
    age VARCHAR,
    gender VARCHAR,
    email VARCHAR,
    question_id VARCHAR,
    probability INTEGER,
    ip_hash VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        sr.id,
        sr.created_at,
        d.age,
        d.gender,
        d.email,
        pa.question_id,
        pa.probability,
        sr.ip_hash
    FROM survey_responses sr
    LEFT JOIN demographics d ON sr.id = d.response_id
    LEFT JOIN phrase_answers pa ON sr.id = pa.response_id
    ORDER BY sr.created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- 12. Trigger pro aktualizaci timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Přidat updated_at sloupec pokud chceš
-- ALTER TABLE survey_responses ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
-- CREATE TRIGGER update_survey_responses_updated_at BEFORE UPDATE ON survey_responses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 13. Testovací data (volitelné)
-- INSERT INTO survey_responses (user_agent, ip_hash) VALUES ('Test Browser', 'test123');
-- INSERT INTO demographics (response_id, age, gender) VALUES (1, '25-44', 'male');
-- INSERT INTO phrase_answers (response_id, question_id, probability) VALUES (1, 'pravdepodobne', 75);

-- 14. Užitečné dotazy pro monitoring
-- Počet odpovědí za posledních 24 hodin:
-- SELECT COUNT(*) FROM survey_responses WHERE created_at > NOW() - INTERVAL '24 hours';

-- Top 5 nejčastějších odpovědí:
-- SELECT question_id, probability, COUNT(*) as count FROM phrase_answers GROUP BY question_id, probability ORDER BY count DESC LIMIT 5;

-- Průměrná doba mezi otázkami (pokud bys implementoval timestamps):
-- SELECT AVG(EXTRACT(EPOCH FROM (created_at - LAG(created_at) OVER (PARTITION BY response_id ORDER BY created_at)))) FROM phrase_answers;