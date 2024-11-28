import './style.css'
import Trash from '../../assets/icons8-lixo.svg'
import api from '../../services/api'
import { useEffect , useState, useRef } from 'react'


function Home() {
  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputEmail = useRef()
  const inputAge = useRef()

  async function getUsers(){
    const usersFromApi = await api.get('http://localhost:3000/usuarios')

    setUsers (usersFromApi.data)
  }

  async function createUsers(){
    // const usersFromApi = await api.get('http://localhost:3000/usuarios')

      await api.post('http://localhost:3000/usuarios', {
        name: inputName.current.value,
        age: inputAge.current.value,
        email: inputEmail.current.value
      })

      getUsers()
  }

  async function deleteUsers(id){
    await api.delete(`http://localhost:3000/usuarios/${id}`)

    getUsers()
    
  }

  useEffect(() => {
    getUsers()
  }, [])
  

  return (
    
      <div className='container'>
        
        <form>
        <h1> Cadastro de Usuários </h1>
          <input type='email' placeholder='Email ' ref={inputEmail} />
          <input type='number' placeholder='Idade' ref={inputAge}/>
          <input type='text' placeholder='Nome' ref={inputName}/>
      
          <button type='button' onClick={createUsers}>  Cadastrar </button>
         
          </form>
          { users.map( user => (

            <div key={user.id} className='card'>
            <div>
              <p>Nome: <span>{user.name} </span> </p>
              <p>Idade: <span>{user.age} </span></p>
              <p>Email: <span>{user.email} </span></p>
            </div>
            <button onClick={() => deleteUsers(user.id)}>
              <img src={Trash} ></img>
            </button>
            </div>

             ) )}
        

        

          <div>
            <form>

            </form>
          </div>
      </div>
       
    
  )
}

export default Home
