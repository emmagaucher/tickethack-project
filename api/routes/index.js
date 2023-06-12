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

router.get('/tickets', (req, res) => {

  // arrival = Bordeaux 
  // query = bordeaux


  
  // req.query.departure
  // Partie de la solution: SELECT * FROM public.tickets WHERE departure = $1 ORDER BY id ASC, [req.query.departure]

  // req.query.departure

  // let departure = "";

  // for (let i = 0; i < req.query.departure.length; i++)
  // {
  //   if (i===0) {
  //     departure += req.query.departure[i].toUpperCase(); 
  //   } else {
  //     departure += req.query.departure[i].toLowerCase();
  //   }
  // }

  const capitalize = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  const departure = capitalize(req.query.departure)
  const arrival = capitalize(req.query.arrival)

  client.query('SELECT * FROM public.tickets WHERE departure = $1 AND arrival = $2 ORDER BY id ASC', [departure , arrival])
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

