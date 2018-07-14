const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = process.env.port || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('build'))
app.use(morgan('tiny'));

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
  console.log(req.body);
  
    // name or length of 1 accepted..could be edited
  if (person.name === undefined || person.number === undefined || person.name.length === 0 || person.number.length === 0) {
    return res.status(400).json({ error: 'name and number mandatory, should be at least one letter/digit' });
  } else if (isDuplicateName(person.name)) {
    return res.status(400).json({ error: 'name must be unique' });
  } 
  // data ok, continues..
  person.id = Math.floor(Math.random() * 10000000) + 99; 
  persons = persons.concat(person);
  res.json(person);
});

app.listen(PORT, () => {
  console.log(`Server running, on port ${PORT}`);
});


// helpers
const isDuplicateName = (name) => {
  const double = persons.find(p => p.name === name);
  if (double === undefined) {
    return false; // not found --> false
  }
  return true; // found --> true
}

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
];

