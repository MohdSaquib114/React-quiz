import { useEffect, useReducer } from 'react';
import Header from './Header'
import Main from './Main'
import Loader from './Loader'
import Error from './Error'
import StartScreen from './StartScreen';
import Questions from './Questions'
import NextButton from './NextButton';
import Progress from './Progress';
import FinishScreen from './FinishScreen';


const initialState={
  questions:[],
  status:'loading',
  index:0,
  answer:null,
  points:0,
  highscore: 0,
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
  case 'newAnswer':
    const currentStateQues = state.questions.at(state.index)
    return {
      ...state,
      answer:action.payload,
      points:action.payload === currentStateQues.correctOption?state.points+currentStateQues.points:state.points,
    }
  case 'nextQuestion':
    return {
      ...state,
      index:state.index+1,
      answer:null
    }
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
  default:
    throw new Error('Invalid action type')
}
}

function App() {
  const [{questions,status,index,answer,points,highscore},dispatch] = useReducer(reducer, initialState)
useEffect(()=>{
  fetch('http://localhost:8000/questions')
  .then((res)=> res.json())
  .then((data)=>dispatch({type:'dataRecieved', payload:data}))
  .catch((err)=>dispatch({type:'dataFailed'}))

}, [])
const maxPossiblePoints = questions.reduce(
  (prev, cur) => prev + cur.points,
  0
);


  return <div className='app'>
<Header />
<Main>
{status==='loading' && <Loader /> }
{status==='error' && <Error /> }
{status==='ready' && <StartScreen length={questions.length} dispatch={dispatch} /> }
{status==='active' && 
<>
<Progress
 points={points} 
 answer={answer} 
 maxPossiblePoints={maxPossiblePoints} 
 index={index}  
 numQuestions={questions.length}
 />
<Questions question={questions[index]}
 dispatch={dispatch} 
 answer={answer}/> 
 <NextButton dispatch={dispatch} 
 answer={answer} 
 index={index}
 numQuestions={questions.length}
 />
 </>

 }
 {status === 'finished' && <FinishScreen points={points} maxPossiblePoints={maxPossiblePoints}  highscore={highscore}/>}
</Main>
  </div>
}

export default App;
