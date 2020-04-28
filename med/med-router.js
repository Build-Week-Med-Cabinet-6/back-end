const axios = require('axios');

const Meds = require('./meds-model.js');

const router = require('express').Router();

router.get('/', (req, res) => {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://medcab6api.herokuapp.com/products/fetch', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching meds', error: err });
    });
});


router.post('/', (req, res) => {
  const projectData = req.body;

  Meds.add(projectData)
  .then(project => {
    res.status(201).json(project);
  })
  .catch (err => {
    res.status(500).json({ message: err.message });
  });
});

router.get('/', (req, res) => {
  Meds.getProjects()
  .then(projects => {
    res.json(projects);
  })
  .catch(err => {
    res.status(500).json({ message: err.message });
  });
});


module.exports = router;
