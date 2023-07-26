import React from 'react'

export default function Options({question,dispatch,answer}) {
    const isUsrResponse=answer !== null
//    const hasAnswered=;
  return (
    <div className='options'>
        {question.options.map((option,index)=><button
         className={`btn btn-option ${index===answer?'answer':''} ${isUsrResponse? index === question.correctOption?'correct':'wrong':''}`}
         key={option}
         onClick={()=>dispatch({type:'newAnswer', payload:index})}
         disabled={isUsrResponse}
         >
            {option}
            </button>)}
      </div>
  )
}
