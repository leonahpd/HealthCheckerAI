const axios = require('axios');

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;
// Updated URL to use chat completions
const HF_ROUTER_URL = "https://router.huggingface.co/v1/chat/completions"; 

// 🔹 Define determineUrgency
const determineUrgency = (predictions) => {
  if (!predictions || !predictions.length) return 'unknown';

  const highUrgencyDiseases = ['COVID-19', 'Infection'];
  const mediumUrgencyDiseases = ['Flu', 'Migraine'];

  if (predictions.some(p => highUrgencyDiseases.includes(p.disease))) return 'high';
  if (predictions.some(p => mediumUrgencyDiseases.includes(p.disease))) return 'medium';
  return 'low';
};

const analyzeSymptoms = async (data) => {
  try {
    const { symptoms, duration, severity, age, gender } = data;
    const symptomText = Array.isArray(symptoms) ? symptoms.join(", ") : symptoms;

    const messages = [
      {
        role: "system",
        content: "You are a medical assistant. Classify the patient's condition into one of these labels: Flu, Common Cold, COVID-19, Migraine, Infection, Allergy. Respond ONLY with a JSON array of objects: [{ \"disease\": \"label\", \"confidence\": 0.9 }]"
      },
      {
        role: "user",
        content: `Patient Info: Age ${age}, Gender ${gender}, Symptoms: ${symptomText}, Duration: ${duration}, Severity: ${severity}.`
      }
    ];

    const response = await axios.post(
      HF_ROUTER_URL,
      { 
        model: "meta-llama/Llama-3.1-8B-Instruct:cerebras", 
        messages,
        temperature: 0.1
      },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json"
        },
        timeout: 15000
      }
    );

    // Parse AI response
    let predictions = [];
    const content = response.data.choices[0].message.content;

    try {
      predictions = JSON.parse(content);
    } catch (e) {
      console.error("Failed to parse AI JSON response:", content);
      predictions = [{ disease: "Unknown", confidence: 0 }];
    }

    const suggestionsMap = {
      "Flu": "Take rest, drink fluids, paracetamol",
      "Common Cold": "Warm fluids, rest",
      "COVID-19": "Consult doctor immediately",
      "Migraine": "Avoid stress, take pain relief",
      "Infection": "Consult doctor, antibiotics if needed",
      "Allergy": "Avoid allergens, antihistamines",
      "Unknown": "Consult doctor"
    };

    const finalPredictions = predictions.map(p => ({
      disease: p.disease,
      confidence: p.confidence,
      suggestion: suggestionsMap[p.disease] || "Consult doctor"
    }));

    return {
      possibleConditions: finalPredictions,
      recommendations: finalPredictions.map(p => p.suggestion),
      urgencyLevel: determineUrgency(finalPredictions),
      disclaimer: "AI suggestions are for guidance only."
    };

  } catch (error) {
    console.error("AI Service Error:", error.response ? error.response.data : error.message);
    return {
      possibleConditions: [],
      recommendations: ["AI service unavailable, consult doctor"],
      urgencyLevel: "unknown",
      disclaimer: "AI service failed."
    };
  }
};

module.exports = {
  analyzeSymptoms
};
