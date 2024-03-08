const express = require('express');
const { getPatients } = require('./elastic');
const redisService = require('./redis');
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors())

app.post('/patients', async (req, res) => {
  // const patients = await redisService.create(req.body);
  res.json(patients);
})
app.get('/patients', async (req, res) => {
  const patients = await getPatients(req.query);
  // await redisService.create()
  // const patients = await redisService.get(req.params.id);

  res.json(patients);
})

app.listen(4002, () => {
  console.log('Listening on 4002');
})