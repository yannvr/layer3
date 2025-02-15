const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/api/nfts', async (req, res) => {
  const { owner } = req.query;
  try {
    const response = await axios.get(`https://api.opensea.io/api/v1/assets`, {
      params: { owner },
      headers: {
        'x-api-key': 'a3d3c7d1c3804342a876d896c54a8579',
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
