import React, { useState } from 'react'
import Options from '../components/Options'

export default function Game(props) {
	const {gameData,setGameData,setStart} = props
	const [checkDone, setCheckDone] = useState(false)

	const errorSvg = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w54 h-5 text-red-600"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>

	const successSvg = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-600"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>

	function handlecheckDone(){
		if(checkDone){ //If the check was already done, we start a New Game
			setStart(false) 
		}	
		else{ //If the check wasn´t already done, we make a validation tha all questions have been answered
			let missing_asnw = false
			for(let i=0;i<gameData.length;i++){
				if(gameData[i].user_answ===""){missing_asnw=true}
			}
			if(missing_asnw){alert("Please answer all the questions.")}
			else{ //If everything Ok we apply some classes
				for(let i=0;i<gameData.length;i++){
					const answers = Array.from(document.getElementsByClassName(`answer${i}`))
					answers.forEach(div=>{
						div.classList.remove('cursor-pointer')
						if(gameData[i].correct_answer===div.innerHTML){div.classList.add('success')}
						else{
							if(gameData[i].user_answ===div.innerHTML){div.classList.add('error')}
						}
					})
				}
				//Finnaly
				setCheckDone(true)
			}
		}
	}

	function handleSVGs(index){
		for(let i=0;i<gameData.length;i++){
			if(i==index){
				console.log(gameData[i],gameData[i].correct,index);
				if(gameData[i].correct){return successSvg}
				else{return errorSvg}
			}
		}
	}

	function count(){
		let count = 0
		gameData.forEach(obj=>{
			if(obj.correct){count++}
		})
		return count
	}
	return (
		<div className='w-full p-6 flex flex-col gap-10 max-w-2xl'>
			{gameData.map((item,i)=>
				<div key={i} className='flex flex-col gap-2 lg:gap-4'>
					<div className='question'>
						<div className='max-w-[300px] lg:max-w-none'>{decodeURIComponent(item.question)}</div>
						<div>{checkDone ? handleSVGs(i) : ""}</div>
					</div>
					<Options allAnswers={item.all_answers} index={i} setGameData={setGameData} checkDone={checkDone} />
				</div>
			)}
			<div className='flex flex-col items-center gap-2'>
				<button className='w-fit rounded-full px-10 py-2 bg-green-300 hover:bg-green-400' onClick={()=>handlecheckDone()}>
					{checkDone ? "New game" : "Check"}
				</button>
				<div>
				{checkDone 
				? 
					<div>Respuestas correctas: {count()}/{gameData.length}</div> 
				: 
					""}
				</div>
			</div>
		</div>
	)
}
