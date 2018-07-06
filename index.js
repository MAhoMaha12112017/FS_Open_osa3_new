const express = require('express');

const app = express();
const PORT = 3001;

// routes
app.get('/', (req, res) => {
  res.send('Juuressa');
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.listen(PORT);
console.log(`Server running, listening port ${PORT}`);


// hardcoded data
const persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1
  },
  {
    name: 'Martti Tienari',
    number: '040-123456',
    id: 2
  },
  {
    name: 'Arto Järvinen',
    number: '040-123456',
    id: 3
  },
  {
    name: 'Lea Kutvonen',
    number: '040-123456',
    id: 4
  }
]