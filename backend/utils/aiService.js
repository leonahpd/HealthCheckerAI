const axios = require('axios');

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;
const HF_URL = "https://router.huggingface.co/v1/chat/completions";

// 🔹 Smart urgency detection
const determineUrgency = (predictions) => {
  if (!predictions || !predictions.length) return 'unknown';

  const highKeywords = ['covid', 'infection', 'pneumonia', 'poisoning'];
  const mediumKeywords = ['flu', 'migraine', 'gastro'];

  if (predictions.some(p =>
    highKeywords.some(k => p.disease.toLowerCase().includes(k))
  )) return 'high';

  if (predictions.some(p =>
    mediumKeywords.some(k => p.disease.toLowerCase().includes(k))
  )) return 'medium';

  return 'low';
};

// 🔹 Main AI function
const analyzeSymptoms = async (data) => {
  try {
    const { symptoms, duration, severity, age, gender } = data;

    const symptomText = Array.isArray(symptoms)
      ? symptoms.join(", ")
      : symptoms;

    // 🧠 Strong prompt (forces clean JSON)
    const messages = [
      {
        role: "system",
        content: `
You are a medical AI assistant.

Analyze symptoms and return ONLY a JSON array:
[
  {
    "disease": "Flu",
    "confidence": 0.85
  }
]

Rules:
- Return ONLY JSON (no explanation)
- Max 3 diseases
- Confidence between 0 and 1
`
      },
      {
        role: "user",
        content: `Symptoms: ${symptomText}. Duration: ${duration}. Severity: ${severity}. Age: ${age || 'unknown'}, Gender: ${gender || 'unknown'}`
      }
    ];

    const response = await axios.post(
      HF_URL,
      {
        model: "meta-llama/Llama-3.1-8B-Instruct:cerebras",
        messages,
        temperature: 0.2
      },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json"
        },
        timeout: 20000
      }
    );

    const content = response.data.choices[0].message.content;

    // 🔥 Clean JSON parsing (VERY IMPORTANT)
    let predictions = [];
    try {
      const cleaned = content.replace(/```json|```/g, '').trim();
      predictions = JSON.parse(cleaned);
    } catch (err) {
      console.error("Parse error:", content);
      predictions = [{ disease: "Unknown", confidence: 0 }];
    }

    // 🔹 Suggestions (dynamic fallback)
    const suggestionsMap = {
      "Flu": "Take rest, drink fluids, paracetamol",
      "Common Cold": "Warm fluids, rest",
      "COVID-19": "Consult doctor immediately",
      "Migraine": "Avoid stress, take pain relief",
      "Infection": "Consult doctor, possible antibiotics",
      "Allergy": "Avoid allergens, take antihistamines"
    };

    const finalPredictions = predictions
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 3)
      .map(p => ({
        disease: p.disease,
        confidence: p.confidence,
        suggestion:
          suggestionsMap[p.disease] ||
          `Possible ${p.disease}. Please consult a doctor.`
      }));

    return {
      possibleConditions: finalPredictions,
      recommendations: [...new Set(finalPredictions.map(p => p.suggestion))],
      urgencyLevel: determineUrgency(finalPredictions),
      disclaimer: "AI suggestions are for guidance only. Consult a doctor."
    };

  } catch (error) {
    console.error("AI ERROR:", error.response?.data || error.message);

    return {
      possibleConditions: [],
      recommendations: ["AI unavailable. Please consult a doctor."],
      urgencyLevel: "unknown",
      disclaimer: "AI service failed."
    };
  }
};

module.exports = {
  analyzeSymptoms
};
