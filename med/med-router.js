const axios = require('axios');

const Meds = require('./meds-model.js');

const router = require('express').Router();

router.get('/all', (req, res) => {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('medcab6api.herokuapp.com/products/fetch', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching meds', error: err });
    });
});


router.post('/:id', (req, res) => {
  const medData = req.body;
  const  userid  = req.params; 
 // console.log(userid);
  Meds.add(medData, userid)
  .then(med => {
    res.status(201).json(med);
  })
  .catch (err => {
    res.status(500).json({ message: err.message });
  });
});






router.get('/:id', (req, res) => {
  const { id } = req.params;
  Meds.findById(id)
  .then(med => {
    if (med) {
      res.json(med);
    } else {
      res.status(404).json({ message: 'Could not find meds for user.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: err.message });
  });
});


module.exports = router;
