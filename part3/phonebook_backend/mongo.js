const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://notes:notes@cluster0.kwzw9ku.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Phonebook = mongoose.model('Phonebook', phonebookSchema)

if(process.argv.length === 3)
{
  console.log('phonebook:')
  Phonebook.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}
else {
  const phonebook = new Phonebook({
    name: process.argv[3],
    number: process.argv[4],
  })

  phonebook.save().then(result => {
    console.log('Added', process.argv[3] ,'number', process.argv[4], 'to phonebook')
    mongoose.connection.close()
  })
}