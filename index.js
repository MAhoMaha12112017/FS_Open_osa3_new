const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

// routes
app.get('/info', (req, res) => {
  const dataToReturn = `<p>puhelinluettelossa ${persons.length} henkilön tiedot</p>` 
    + `<p>${new Date()}</p>`;
  res.send(dataToReturn);
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(p => p.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }  
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  // console.log(persons.length);
  persons = persons.filter(p => p.id !== id);
  // console.log(persons.length);
  res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  const person = req.body;
  person.id = Math.floor(Math.random() * 10000000); 
  persons = persons.concat(person);
  res.json(person);
});

app.listen(PORT);
console.log(`Server running, listening port ${PORT}`);


// hardcoded data
let persons = [
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