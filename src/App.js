import Game from "./pages/Game";
import Home from "./pages/Home";
import { useState,useEffect } from "react";
import { difficulties } from "./data/difficulties.js"


function App() {
	const [gameData, setGameData] = useState([]);
	const [categories, setCategories] = useState([{name:"Any category",id:""}]);
	const [start, setStart] = useState(false);
	const [chosenCat, setChosenCat] = useState(categories[0]);
	const [chosenDif, setChosenDif] = useState(difficulties[0]);
	const [chosenQty, setChosenQty] = useState(5);
	console.log("start:",start);
	console.log("gameData:",gameData);
	
	useEffect(()=>{
		try {
			fetch("https://opentdb.com/api_category.php")
			.then(res=>res.json())
			.then(data=>{
				let cats = data.trivia_categories
				setCategories(oldCats=>{
					let newArray = cats
					cats.unshift(oldCats[0])
					return newArray
				})
			})
		} catch (error) {
			console.log(error);
		}
	},[])


	return (
		<div className="container | flex flex-col items-center min-h-screen m-0 w-full !min-w-full ">
			<h1 className="flex justify-center items-center py-3 underline underline-offset-2 text-gray-600 text-2xl bg-slate-200 w-full">Quizz Game</h1>
			{start 
			? <Game 
				gameData={gameData}
				setGameData={setGameData}
				chosenQty={chosenQty}
				setStart={setStart}
			/>
			: <Home 
				setStart={setStart} 
				setGameData={setGameData} 
				categories={categories} 
				setChosenCat={setChosenCat} 
				chosenCat={chosenCat}
				difficulties={difficulties}
				setChosenDif={setChosenDif} 
				chosenDif={chosenDif}
				setChosenQty={setChosenQty} 
				chosenQty={chosenQty}
				/>
			}	
    </div>
  );
}

export default App;
