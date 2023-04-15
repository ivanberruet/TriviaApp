import React, { useRef, useState } from 'react'

export default function Options(props) {
	const {allAnswers,index,setGameData,checkDone} = props


	function handleCLick(e,index){
		const answers = Array.from(document.getElementsByClassName(`answer${index}`))
		const chosenAnsw = e.target.innerHTML
		answers.map((answ=>{
			if(answ===e.target){answ.classList.add('bg-slate-500')}
			else{answ.classList.remove('bg-slate-500')}
		}))

		setGameData(oldData=>{
			const objIdx = oldData.findIndex(obj=>{return obj.all_answers.includes(chosenAnsw)})
			const newGameData = oldData.map((obj,i)=>{
				if(objIdx===i){
					let newObj = {...obj,user_answ:chosenAnsw}
					if(obj.correct_answer == chosenAnsw){return {...newObj,correct: true}}
					else{return {...newObj,correct: false}}
				}
				else{return obj}
			})
			return newGameData
		})
	}

	return (
		<div className='flex flex-wrap gap-3 items-center'>
			{allAnswers.map((answr,i)=>(
				<div 
					key={i} 
					id={answr} 
					className={`answer${index} | text-sm bg-slate-200 px-2 py-1 rounded-lg cursor-pointer`} 
					onClick={checkDone ? ()=>{} : (e)=>handleCLick(e,index)}
				>
						{answr}
				</div>
			))}
		</div>
	)
}
