import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import nameService from './services/names'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    nameService
      .getAll()
      .then(response => {
        setPersons(response)
      })
      .catch(error => {
        setErrorMessage(
          error.response.data.error
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    const exist = persons.some(person => person.name === newName)
    if (exist) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person1 = persons.find(n => n.name === newName)
        const changedNumber = { ...person1, number: newNumber }
        nameService
          .update(person1.id, changedNumber)
          .then(response => {
            setPersons(persons.map(person => person.id !== person1.id ? person : response.data))
            setErrorMessage(
              `Changed ${nameObject.name}'s number`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(
              `Information of ${nameObject.name} has been removed from the server`
            )
          })
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
    else {
      nameService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setErrorMessage(
            `Added ${nameObject.name}`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(
            error.response.data.error
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value)
  }

  const deleteName = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      nameService
        .remove(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
          setErrorMessage(
            `Deleted ${name}`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(
            error.response.data.error
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  const Numbers = ({ persons }) => {
    if (filterName === '') {
      return (
        persons.map(person => (
          <div key={person.id}> {person.name} {person.number}
            <button type="submit" onClick={() => deleteName(person.id, person.name)}>delete</button>
          </div>
        ))
      )
    }
    else {
      const filteredPersons = persons.filter((person) =>
        person.name.includes(filterName)
      )
      return (
        <div>
          {filteredPersons.map(person => (
            <div key={person.id}> {person.name} {person.number}
              <button type="submit" onClick={() => deleteName(person.id, person.name)}>delete</button>
            </div>
          ))}
        </div>
      )
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      filter shown with: <input value={filterName}
        onChange={handleFilterNameChange} />
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName}
            onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber}
            onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={persons} />

    </div>
  )
}

export default App