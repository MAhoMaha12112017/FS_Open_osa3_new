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

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  // console.log(id);
  const person = persons.find(p => p.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }  
});

app.get('/info', (req, res) => {
  const dataToReturn = `<p>puhelinluettelossa ${persons.length} henkilön tiedot</p>` 
    + `<p>${new Date()}</p>`;
  res.send(dataToReturn);
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