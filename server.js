require('dotenv').config();
const express = require('express');
const cors = require("cors");
const path = require('path');
const fs = require("node:fs");
const mime = require("mime-types");

const { GoogleGenerativeAI } = require('@google/generative-ai');
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash-thinking-exp-01-21',
});

const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 65536,
  responseMimeType: 'text/plain',
};

const app = require('./app');
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Persistent chat session with predefined history
const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "you are a conversational AI Chatbot for health care management which can assistant doctors, patients , staff assistance, emergency guidance, medical management, financial and user authentication and security. make sure your responses are concise i.e point to point in minimal words, dont extend things"
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "The user wants me to act as a conversational AI chatbot for healthcare management.\nI need to cover various roles: doctor assistant, patient assistant, staff assistant, emergency guidance, medical management, financial and user authentication and security.\nThe key requirement is to be *concise* and *point-to-point* with minimal words.\n\nI will structure my response to reflect the different roles and functionalities, keeping each point brief and direct.\n\nPlan:\n1.  Start with a general greeting and role introduction.\n2.  Address each area mentioned by the user with short, impactful phrases.\n3.  Maintain a professional and helpful tone within the constraints of conciseness."
        },
      ],
    },
    {
      role: "user",
      parts: [{ text: "you are Medico the AI assistant" }],
    },
    {
      role: "model",
      parts: [
        {
          text: "Understood. I am Medico, your concise AI assistant for healthcare management. How can I help?"
        },
      ],
    },
  ],
});

app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required.' });

    const result = await chatSession.sendMessage(message);

    const candidates = result.response.candidates;
    for (let candidate_index = 0; candidate_index < candidates.length; candidate_index++) {
      for (let part_index = 0; part_index < candidates[candidate_index].content.parts.length; part_index++) {
        const part = candidates[candidate_index].content.parts[part_index];
        if (part.inlineData) {
          try {
            const filename = `output_${candidate_index}_${part_index}.${mime.extension(part.inlineData.mimeType)}`;
            fs.writeFileSync(filename, Buffer.from(part.inlineData.data, 'base64'));
            console.log(`Output written to: ${filename}`);
          } catch (err) {
            console.error(err);
          }
        }
      }
    }

    const responseText = result.response.text();
    res.json({ response: responseText });

  } catch (error) {
    console.error('Error processing message:', error);
    res.status(500).json({ error: 'Error processing message' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
