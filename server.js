const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// API Chat endpoint
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  
  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'mixtral-8x7b-32768',
        messages: [{ role: 'user', content: message }],
        max_tokens: 500
      },
      { headers: { 'Authorization': 'Bearer ' + process.env.GROQ_API_KEY } }
    );
    
    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    res.json({ reply: 'Error connecting to AI. Try again.' });
  }
});

// Serve HTML files
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/owner', (req, res) => res.sendFile(path.join(__dirname, 'owner.html')));

app.listen(PORT, () => {
  console.log('LAIZ AI running on port ' + PORT);
});
