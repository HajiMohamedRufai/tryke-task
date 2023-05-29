const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/', (req, res) => {
  console.log('Request Received');

  // Check auth-token header
  const authToken = req.headers['auth-token'];
  if (authToken !== 'tumaAuthToken') {
    return res.status(401).send('Criteria Failed');
  }

  // Check stringArray in the request body
  const stringArray = req.body.stringArray;
  if (!Array.isArray(stringArray)) {
    return res.status(400).send('Criteria Failed');
  }

  // Check if stringArray contains 'tuma', 'delivery', and 'services'
  const requiredStrings = ['tuma', 'delivery', 'services'];
  const containsRequiredStrings = requiredStrings.every((str) => stringArray.includes(str));
  if (!containsRequiredStrings) {
    return res.status(400).send('Criteria Failed');
  }

  res.send('Criteria Passed');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
