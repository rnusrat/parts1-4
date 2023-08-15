const Header = ({course}) => {
    return (
      <h1> 
        {course.name}
      </h1>
    )
  } 
  
  const Content = ({parts}) => {
    return (
        parts.map(part => 
        <Part key={part.id} part={part} />
        )
    )
  }
  
  const Part = ({part}) => {
    return ( 
      <p>
        {part.name} {part.exercises}
      </p>
    )
  
  }
  
  const Total = ({parts}) => {
    return (
      <p>
        <b>total of {parts.reduce((s,p) => s + p.exercises, 0)}</b>
      </p>
    )
  }

const Course = ({courses}) => {
    return (
    <div>
        {courses.map(course => (
            <div key = {course.id}>
                <Header course={course} />
                <Content parts={course.parts} />
                <Total parts={course.parts} />
            </div>
            ) 
        )
        }
    </div>
    )
}

export default Course