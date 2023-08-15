import { useState } from 'react'

const Display = props => (
  <div>
    <p> {props.value} </p>
    <p> has {props.votes} votes </p>
  </div>
)

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length))

  const setToSelected = newValue => {
    console.log('valuenow', newValue)
    setSelected(newValue)   
  }

  const setToVoted = newValue => {
    const copy = [...points ]
    copy[newValue] += 1
    setPoints(copy)
  }

  const DisplayMaxVotes = () => {
    const max = Math.max(...points);
    const index = points.indexOf(max);
    return(
    <Display value={anecdotes[index]} votes ={points[index]} />
    )
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Display value={anecdotes[selected]} votes={points[selected]} />
      <Button handleClick={() => setToVoted(selected)} text="vote" />
      <Button handleClick={() => setToSelected(Math.floor(Math.random() * anecdotes.length))} text="next anecdote"/>
      <h1>Anecdote with the most votes</h1>
      <DisplayMaxVotes />
    </div>
  )
}

export default App