import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/chat', async (req, res) => {
  const { prompt, model } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: model || 'gpt-4',
      messages: [{ role: "user", content: prompt }]
    });

    res.json({ reply: completion.data.choices[0].message.content.trim() });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Erreur GPT' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
