import { useEffect, useReducer } from 'react';
import Header from './Header'
import Main from './Main'
import Loader from './Loader'
import Error from './Error'
import StartScreen from './StartScreen';
import Questions from './Questions'
const initialState={
  questions:[],
  status:'loading',
  index:0,
}


const reducer=(state, action)=>{
switch(action.type){
  case 'dataRecieved':
    return {
     ...state,
     questions:action.payload,
     status:'ready'
    }
  case 'dataFailed':
    return {
      ...state,
      status:'error'
    }
  case 'setActive':
    return{
      ...state,
      status:'active'
    }
  default:
    throw new Error('Invalid action type')
}
}

function App() {
  const [{questions,status,index},dispatch] = useReducer(reducer, initialState)
useEffect(()=>{
  fetch('http://localhost:8000/questions')
  .then((res)=> res.json())
  .then((data)=>dispatch({type:'dataRecieved', payload:data}))
  .catch((err)=>dispatch({type:'dataFailed'}))

}, [])


  return <div className='app'>
<Header />
<Main>
{status==='loading' && <Loader /> }
{status==='error' && <Error /> }
{status==='ready' && <StartScreen length={questions.length} dispatch={dispatch} /> }
{status==='active' && <Questions question={questions[index]}/> }
</Main>
  </div>
}

export default App;
