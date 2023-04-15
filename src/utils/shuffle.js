export default 	function shuffle(newArray){
	let shuffledArray = newArray
	.map(value => ({ value, sort: Math.random() }))
	.sort((a, b) => a.sort - b.sort)
	.map(({ value }) => value)
	return shuffledArray
}
