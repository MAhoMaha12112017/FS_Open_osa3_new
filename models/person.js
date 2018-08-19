const mongoose = require('mongoose');
// url = ...

mongoose.connect(url,  { useNewUrlParser: true });

const Person = mongoose.model('Person', {
  name: 'String',
  number: 'String'
});

module.exports = Person;

/*
if (process.argv[2] && process.argv[3]) {
  console.log(process.argv[2]);
  console.log(process.argv[3]);
  addPerson(process.argv[2], process.argv[3]);
} else {
  showNumbers();
}

function addPerson(name, number) {
  const person = new Person({
    name,
    number
  });
  person
  .save()
  .then(result => {
    console.log(`lisätään henkilö ${name} numero ${number} luetteloon`);
    console.log(result);
    mongoose.connect.close();
  });
}

function showNumbers() {
  console.log('puhelinluettelo');
  getPersonsData();
}

function getPersonsData() {
  Person
    .find({})
    .then(result => {
      result.forEach((person) => {
        console.log(`${person.name} ${person.number}`);
      });
      mongoose.connection.close();
    });
}
*/