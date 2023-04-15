import React from 'react'
import { ClickAwayListener } from '@mui/base';
import { difficulties } from "../data/difficulties.js"

export default function Difficulty(props) {
	const {setChosenDif,chosenDif,openSlide,dispatch} = props

	function handleClickAway(){
		dispatch({type:"closeDif"})
	}

	function selectDif(label,id){
		setChosenDif({label,id})
		dispatch({type:"closeDif"})
	}

	function handleClick(){
		let action
		openSlide.dif ? action = "closeDif" : action = "openDif"
		dispatch({type: action}) 
	}	

	return (
		<ClickAwayListener onClickAway={handleClickAway}>
			<div className='w-[200px] relative'>
					<div className='category' onClick={()=>handleClick()}>
						<div className='flex items-center justify-between gap-1 cursor-pointer'>
							{chosenDif.label}
							{openSlide.dif
								?
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
									<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
								</svg>
								:
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ">
									<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
								</svg>
							}
						</div>
					</div>
					{openSlide.dif
					?
						<ul className='options'>
							{difficulties.length===1 
								? "" 
								: difficulties.map(dif=>(
									<li key={dif.id} className="category" onClick={()=>selectDif(dif.label,dif.id)}>{dif.label}</li>
									)) 
								}
						</ul>
					:""
				}
			</div>
		</ClickAwayListener>	
	)
}
