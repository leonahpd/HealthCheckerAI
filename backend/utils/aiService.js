const axios = require('axios');

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;

const analyzeSymptoms = async (data) => {
  try {
    const { symptoms, duration, severity, age, gender } = data;

    // 🔹 Create meaningful AI input
    const inputText = `
    Patient Details:
    Age: ${age}, Gender: ${gender}
    Symptoms: ${symptoms}
    Duration: ${duration}
    Severity: ${severity}
    `;

    const response = await axios.post(
      "https://api-inference.huggingface.co/models/facebook/bart-large-mnli",
      {
        inputs: inputText,
        parameters: {
          candidate_labels: [
            "Flu",
            "Common Cold",
            "COVID-19",
            "Migraine",
            "Infection",
            "Allergy"
          ]
        }
      },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
        },
      }
    );

    // 🔹 Format AI response
    const predictions = response.data.labels.map((label, index) => ({
      disease: label,
      confidence: response.data.scores[index]
    }));

    // 🔹 Add suggestions (BONUS FEATURE 🔥)
    const suggestionsMap = {
      "Flu": "Take rest, drink fluids, paracetamol",
      "Common Cold": "Warm fluids, rest",
      "COVID-19": "Consult doctor immediately",
      "Migraine": "Avoid stress, take pain relief",
      "Infection": "Consult doctor, antibiotics if needed",
      "Allergy": "Avoid allergens, antihistamines"
    };

    const finalResult = predictions.map(p => ({
      ...p,
      suggestion: suggestionsMap[p.disease] || "Consult doctor"
    }));

    return finalResult;

  } catch (error) {
    console.error("AI Service Error:", error.message);

    // 🔹 Fallback response (VERY IMPORTANT)
    return [
      {
        disease: "Unknown",
        confidence: 0,
        suggestion: "AI service unavailable, consult doctor"
      }
    ];
  }
};

module.exports = { analyzeSymptoms };
