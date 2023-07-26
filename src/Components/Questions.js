import React from 'react'

export default function Questions({question}) {
  return (
    <div>
      <h4>{question.question}</h4>
      <div className='options'>
        {question.options.map(option=><button className='btn btn-option' key={option}>{option}</button>)}
      </div>
    </div>
  )
}
