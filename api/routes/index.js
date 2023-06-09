var express = require('express');
var router = express.Router();
const { Client } = require('pg');

const connectionString = 'postgres://oaycmzji:OzdnG1NOGN7aGZbXuYI10Y6l0F10zC4w@lucky.db.elephantsql.com/oaycmzji';

const client = new Client({ connectionString });
client.connect();

// - Quand on arrive sur la homepage, on renvoi un JSOn vide
// - Quand tu vas sur /trips en GET il faut que ça renvoi du SQL


router.get('/', function(req, res, next) {
  res.json({ test: true });
});

router.get('/trips', (req, res) => {
  // req.query.departure
  client.query('SELECT * FROM public.tickets ORDER BY id ASC', [departure.query.departure, arrival.query.arrival] )
  .then(data => {
    res.json(data.rows);
  })
  .catch(error => {
    res.json({ error: true, message: error });
  })
});

router.get("*", (req, res) => {
  res.json({ error: 'page not found' })
});

module.exports = router;

