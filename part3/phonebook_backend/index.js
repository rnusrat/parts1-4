const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

const Phonebook = require('./models/phonebook')

app.use(cors())

app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'))

morgan.token('post', (request) => {
  if (request.method === 'POST') {
    return JSON.stringify(request.body)
  }
  return ''
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(cors())

app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'))

app.get('/api/persons', (request, response) => {
  Phonebook.find({}).then(phonebook => {
    response.json(phonebook)
  })
})

app.get('/info', (request, response) => {
  const time = new Date().toString()
  const info = `<p>Phonebook has info for ${Phonebook.length} people</p>
    <p>${time}</p>`
  response.send(info)
})

app.get('/api/persons/:id', (request, response, next) => {
  Phonebook.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Phonebook.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: 'name missing' })
  }
  else if (body.number === undefined) {
    return response.status(400).json({ error: 'number missing' })
  }
  /*
    const exist = persons.some(person => person.name === body.name)
    if (exist) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
    */

  const person = new Phonebook({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedNumber => {
    response.json(savedNumber)
  })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Phonebook.findByIdAndUpdate(request.params.id, { name, number },
    { new: true, runValidators: true, context: 'query' })
    .then(updatedNumber => {
      response.json(updatedNumber)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)