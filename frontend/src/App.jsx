import './App.css'
import AI from './Component/AI'
import Login from './Component/Login'

function App() {
  return (
    <>
      {sessionStorage.getItem('is_logged_in') ? <AI /> : <Login />}
    </>
  )
}

export default App
