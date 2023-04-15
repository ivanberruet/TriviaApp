import React from 'react'
import { ClickAwayListener } from '@mui/base';

export default function Categories(props) {
	const {categories,chosenCat,setChosenCat,openSlide,dispatch} = props

	function handleClickAway(){
		dispatch({type:"closeCat"})
	}

	function selectCat(id,name){
		setChosenCat({name,id})
		dispatch({type:"closeCat"})
	}

	function handleClick(){
		let action
		openSlide.cat ? action = "closeCat" : action = "openCat"
		dispatch({type: action}) 
	}	


	return (
		<ClickAwayListener onClickAway={handleClickAway}>
			<div className='w-[200px] relative'>
					<div className='category' id="cat-selector" onClick={()=>handleClick()}>
						<div className='flex items-center justify-between gap-1 cursor-pointer'>
							{chosenCat.name}
							{openSlide.cat
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
					{openSlide.cat
					?
						<ul className='options'>
							{categories.length===1 
								? "" 
								: categories.map(cat=>(
									<li key={cat.id} className="category" onClick={()=>selectCat(cat.id,cat.name)}>{cat.name}</li>
									)) 
								}
						</ul>
					:""
				}
			</div>
		</ClickAwayListener>	
	)
}
