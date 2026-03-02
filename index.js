import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

const history = {};

function appendRecord(symbol, record) {
  history[symbol] ??= [];
  history[symbol].push(record);
}

async function getStockQuote(symbol) {
  try {
    const response = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching stock quote:', error);
    throw error;
  }
}

// need to have return and make it so you can stop the setinterval
app.post('/start-monitoring', (req, res) => {
  try {
    const { symbol, minutes, seconds } = req.body;

    if (!symbol) return res.status(400).send({ message: 'symbol must be a nonempty string' });
    if (minutes < 0 || seconds < 0) return res.status(400).send({ message: 'time cannot be negative' });

    const interval = 1000 * ((+minutes * 60) + (+seconds));

    setInterval(async () => {
      const quote = await getStockQuote(symbol);
      appendRecord(symbol, quote);
    }, interval);

    //return res.json({ ok: true, interval, quote: data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});


app.get('/history', (req, res) => {
  const stockSymbol = req.query.symbol;
  res.json(history[stockSymbol] ?? []);
});

/*
app.post('/refresh', (req, res) => {
});
*/
app.listen(
	PORT,
	() => console.log(`Listening on http://localhost:${PORT}`)
)
