const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json())

/*
app.post('/start-monitoring', (req, res) => {
});

app.get('/history?symbol=<stockSymbol>', (req, res) => {
});

app.post('/refresh', (req, res) => {
});
*/

app.listen(
	PORT,
	() => console.log(`Listening on http://localhost:${PORT}`)
)
