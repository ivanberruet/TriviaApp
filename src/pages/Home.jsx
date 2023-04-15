import React from 'react'
import { useState, useReducer } from "react";
import Categories from '../components/Categories';
import Difficulty from '../components/Difficulty';
import Quantity from '../components/Quantity';
import shuffle from '../utils/shuffle';


function reducer(openSlide,action){
	switch (action.type){
		case "openCat": return {...openSlide, cat: true}
		case "openDif": return {...openSlide, dif: true}
		case "closeCat": return {...openSlide, cat: false}
		case "closeDif": return {...openSlide, dif: false}
	}
}

export default function Home(props) {
	const {setStart,setGameData,categories,setChosenCat,chosenCat,setChosenDif,chosenDif,setChosenQty,chosenQty} = props;
	const [openSlide, dispatch] = useReducer(reducer,
		{
			cat: false,
			dif: false
		}
	); 

	function handleStart(){
		const URL = `https://opentdb.com/api.php?type=multiple&encode=url3986&amount=${chosenQty}`
		let params = ""
		if(chosenCat.id != ""){params+=`&category=${chosenCat.id}`}
		if(chosenDif.id != ""){params+=`&difficulty=${chosenDif.id}`}
		console.log(URL+params);
		fetch(URL+params)
		.then(res=>res.json())
		.then(data=>{
				let newArray = []
				data.results.map(item=>{
					item.incorrect_answers.push(item.correct_answer)
					item.incorrect_answers = shuffle(item.incorrect_answers)
					for(let i=0;i<item.incorrect_answers.length;i++){item.incorrect_answers[i]=decodeURIComponent(item.incorrect_answers[i])}
					console.log("question",decodeURIComponent(item.question));
					console.log("corr_answ",decodeURIComponent(item.correct_answer));
					console.log("inc_answs",item.incorrect_answers);
					let newObj=
						{
							question: decodeURIComponent(item.question),
							correct_answer: decodeURIComponent(item.correct_answer),
							all_answers: item.incorrect_answers,
							user_answ: "",
							correct: false,
						}
						newArray.push(newObj)
				})
				setGameData(newArray)
				setStart(true)
			})
	}

	return (
		<div className='home | flex flex-col items-center gap-8 p-6 bg-white w-full lg:pt-32'>
			<div className='flex'>
				<p className='w-[100px]'>Category:</p>
				<Categories categories={categories} chosenCat={chosenCat} setChosenCat={setChosenCat} openSlide={openSlide} dispatch={dispatch} />
			</div>
			<div className='flex'>
				<p className='w-[100px]'>Difficulty:</p>
				<Difficulty setChosenDif={setChosenDif} chosenDif={chosenDif} openSlide={openSlide} dispatch={dispatch} />
			</div>
			<div className='flex'>
				<p className='w-[100px]'>Questions:</p>
				<Quantity setChosenQty={setChosenQty} chosenQty={chosenQty} />
			</div>
			<div className='mt-10'>
				<button className='btn' onClick={()=>handleStart()}>Start Game</button>
			</div>
		</div>
	)
}
