const mongoose = require('mongoose');
const url = 'removedXXX';


mongoose.connect(url,  { useNewUrlParser: true });

const PersonSchema = new mongoose.Schema({
  name: 'String',
  number: 'String'
})

PersonSchema.statics.formatPerson = function(person) {
  return {
    name: person.name,
    number: person.number,
    id: person._id
  }
}

const Person = mongoose.model('Person', PersonSchema);

module.exports = Person;

// const Person = mongoose.model('Person', {
//   name: 'String',
//   number: 'String'
// });


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