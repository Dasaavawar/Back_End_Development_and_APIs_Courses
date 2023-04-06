require('dotenv').config();

// # 1 - Install & Set up mongoose
const mongoose = require('mongoose');
const url = process.env.MONGO_URI;
mongoose.set('strictQuery', false);
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

// # 2 - Create a Model
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

// # 3 - Create and Save a Record of a Model
const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  var initPerson = new Person({ name: "Willy McDought", age: 42, favoriteFoods: ["beef", "oats", "pasta"] });
  initPerson.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  })
};

// # 4 - Create Many Records with model.create()
const arrayOfPeople = [{ name: "Willy McDought", age: 42, favoriteFoods: ["beef", "oats", "pasta"] },
{ name: "Emma Maughan", age: 29, favoriteFoods: ["wine", "cheese", "apple"] },
{ name: "Rob Wadsworth", age: 34, favoriteFoods: ["rabbit", "tomatoes", "salmon"] }];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, people) {
    if (err) return console.error(err);
    done(null, people);
  })
};

// # 5 - Use model.find() to Search Your Database
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function(err, people) {
    if (err) return console.error(err);
    done(null, people);
  })
};

// # 6 - Use model.findOne() to Return a Single Matching Document from Your Database
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function(err, people) {
    if (err) return console.error(err);
    done(null, people);
  })
};

// # 7 - Use model.findById() to Search Your Database By _id
const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, function(err, people) {
    if (err) return console.error(err);
    done(null, people);
  })
};

// # 8 - Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => {
      if (err) return console.error(err);
      done(null, updatedPerson);
    })
  })
};

// # 9 - Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (err, updatedDoc) => {
    if (err) return console.log(err);
    done(null, updatedDoc);
  })
};

// # 10 - Delete One Document Using model.findByIdAndRemove
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, people) => {
    if (err) return console.error(err);
    done(null, people);
  })
};

// # 11 - Delete Many Documents with model.remove()
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, function(err, people) {
    if (err) return console.error(err);
    done(null, people);
  })
};

// # 12 - Chain Search Query Helpers to Narrow Search Results
const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
  .sort({name: 1})
  .limit(2)
  .select({age: 0})
  .exec(function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
