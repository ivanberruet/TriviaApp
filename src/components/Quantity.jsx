import React, { useRef } from 'react'

export default function Quantity(props) {
	const {setChosenQty,chosenQty} = props
	const input = useRef()

	function handleBlur(e){
		let num = e.target.value
		if(num>0 && num<51){
			setChosenQty(num)
		}
		else{
			input.current.value = chosenQty
		}
	} 

	return (
		<div className='w-[200px] relative'>
			<input className='outline-none border-slate-200 border-b-2 w-full' ref={input} type="number" defaultValue={chosenQty} onBlur={(e)=>handleBlur(e)} />
		</div>
	)
}
