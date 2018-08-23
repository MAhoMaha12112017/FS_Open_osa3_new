const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const Person = require('./models/person');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('build'));

// routes
app.get('/info', (req, res) => {
  Person
    .find({})
    .then(result => {
      res.send(`<p>puhelinluettelossa ${result.length} henkilön tiedot</p>` )
    }).catch(error => {
      console.log(error)
    });
});

app.get('/api/persons', (req, res) => {
  // res.json(persons);
  Person
    .find({}, {__v: 0})
    .then(result => {
      res.json(result.map(Person.formatPerson));
      // mongoose.connection.close();
    }).catch(error => {
      console.log(error)
    });
});

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;

  Person
    .findById(id)
    .then(person => {
      if (person) {
        res.json(Person.formatPerson(person));
      } else {
        response.status(404).end();
      }
    }).catch(error => {
      response.status(400).send({ error: 'malformatted id' })
    }); 
});

app.delete('/api/persons/:id', (req, res) => {
  
  Person
    .findByIdAndRemove(req.params.id)
    .then(res => {
      console.log(res);
      res.status(204).end();
      // mongoose.connection.close();
    }).catch(error => {
      response.status(400).send({ error: 'malformatted id' })
    });  
});

app.post('/api/persons', (req, res) => {

  // only name or length of 1 accepted
  if (req.body.name === undefined || req.body.number === undefined || req.body.name.length === 0 || req.body.number.length === 0) {
    return res.status(400).json({ error: 'name and number mandatory, should be at least one letter/digit' });
  } else if (isDuplicateName(req.body.name)) {
    return res.status(400).json({ error: 'name must be unique' });
  } 

  const person = new Person({
    name: req.body.name,
    number: req.body.number
  });

  // console.log('person');
  
  person
    .save()
    .then(result => {
      // mongoose.connect.close();
    }).catch(error => {
      console.log(error)
    });
});

const error = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.put('api/persons/:id', (req, res) => {
  // ei löydä mitään, antaapa hautua
  console.log(req.params.number);
  console.log('apiapaiaop')
  // Person
  //   .findByIdAndUpdate(req.params.id, { number: req.params.number })
  //   .then(updatedPerson => {
  //     // console.log(updatedPerson);
  //     res.json(Person.formatPerson(updatedPerson))
  //   }).catch(error => {
  //     console.log(error)
  //     response.status(400).send({ error: 'malformatted id' })
  //   });
});

app.use(error)


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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

