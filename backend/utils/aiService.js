const axios = require('axios');

const defaultFallback = (severity) => ({
  possibleConditions: ['General viral illness', 'Monitor with caution'],
  recommendations: [
    'Stay hydrated and rest',
    'Monitor temperature and symptoms',
    'Seek in-person care if symptoms worsen'
  ],
  urgencyLevel: severity === 'severe' ? 'high' : severity === 'moderate' ? 'medium' : 'low',
  disclaimer: 'This is not a medical diagnosis. Please consult a healthcare professional for confirmation.'
});

const parseJsonFromText = (text, severity) => {
  try {
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start === -1 || end === -1) return defaultFallback(severity);
    const sliced = text.slice(start, end + 1);
    const parsed = JSON.parse(sliced);
    return {
      possibleConditions: parsed.possibleConditions || [],
      recommendations: parsed.recommendations || [],
      urgencyLevel: parsed.urgencyLevel || defaultFallback(severity).urgencyLevel,
      disclaimer: parsed.disclaimer || defaultFallback(severity).disclaimer
    };
  } catch (err) {
    return defaultFallback(severity);
  }
};

const callHuggingFace = async (prompt) => {
  const apiKey = process.env.HF_API_KEY || process.env.AI_API_KEY;
  if (!apiKey) {
    throw new Error('HF_API_KEY is not configured');
  }

  const model = process.env.AI_MODEL || 'mistralai/Mistral-7B-Instruct-v0.2';
  const url = process.env.AI_API_URL || `https://api-inference.huggingface.co/models/${model}`;

  const response = await axios.post(
    url,
    {
      inputs: prompt,
      parameters: {
        max_new_tokens: 256,
        temperature: 0.2,
      }
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      timeout: 30000
    }
  );

  // Hugging Face text-generation returns an array with generated_text
  if (Array.isArray(response.data)) {
    return response.data[0]?.generated_text || '';
  }
  return response.data?.generated_text || '';
};

const analyzeSymptoms = async ({ symptoms, duration, severity, age, gender }) => {
  try {
    const prompt = `Return ONLY JSON with keys possibleConditions (array of short strings), recommendations (array of actionable strings), urgencyLevel (one of low, medium, high), disclaimer (string). Do NOT add prose outside JSON. Patient: age ${age || 'unknown'}, gender ${gender || 'unspecified'}, symptoms: ${symptoms.join(', ')}, duration: ${duration}, severity: ${severity}.`;

    const generated = await callHuggingFace(prompt);
    return parseJsonFromText(generated, severity);
  } catch (error) {
    console.error('AI Service Error:', error.message);
    return defaultFallback(severity);
  }
};

module.exports = {
  analyzeSymptoms
};
