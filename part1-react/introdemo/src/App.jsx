function Hello(props) {
  return (
    <div>
      <p>Hello, {props.name}</p>
    </div>
  )
}

function App() {
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name='George'/>
    </div>
  )
}

export default App
