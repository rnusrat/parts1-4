import { useState } from 'react'

const StatisticLine = (props) => {
  return(
  <div>
    <td>
    {props.text}
    </td> 
    <td>{props.value}
    </td>
  </div>
  )
}

const Button = (props) => {
  return(
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Statistics = (props) => {
  if(props.good+props.neutral+props.bad == 0)
  {
    return(
    <div>
      <h1>
        statistics
      </h1>
        No feedback given
    </div>
    )
  }
  return(
    <div>
      <h1>
        statistics
      </h1>
       
    <table>

    <tbody>
    <tr>
      <StatisticLine text="good" value ={props.good} />
      <StatisticLine text="neutral" value ={props.neutral} />
      <StatisticLine text="bad" value ={props.bad} />
      <StatisticLine text="all" value ={props.good + props.neutral + props.bad} />
      <StatisticLine text="average" value ={(props.good + (props.neutral*0) + (props.bad*-1))/(props.good+props.neutral+props.bad)} />
      </tr>
       
    </tbody>
    </table>
      <div> positive {(props.good/(props.good + props.neutral + props.bad))*100} %</div>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = newValue => {
    console.log('good now', newValue)
    setGood(newValue)
  }

  const setToNeutral = newValue => {
    console.log('neutral now', newValue)
    setNeutral(newValue)
  }

  const setToBad = newValue => {
    console.log('bad now', newValue)
    setBad(newValue)
  }

  return (
    <div>
      <h1>
        give feedback
      </h1>
      <Button handleClick={() => setToGood(good + 1)} text="good" />
      <Button handleClick={() => setToNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setToBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App