const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json())

app.post('/start-monitoring', (req, res) => {
	const { symbol, minutes, seconds } = req.body
	if (!symbol)
		res.status(401).send( { message: 'symbol must be a nonempty string' } )
	if (minutes < 0 || seconds < 0)
		res.status(402).send( { message: 'time cannot be negative' } )
});

app.get('/history?symbol=<stockSymbol>', (req, res) => {
});

app.post('/refresh', (req, res) => {
});

app.listen(
	PORT,
	() => console.log(`Listening on http://localhost:${PORT}`)
)
