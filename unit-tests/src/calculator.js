//Sum
function sum (x, y) {
	return x + y;
}

//Substarction
function substraction (x, y) {
	if (x - y >= 0){
		return x - y;
	} else {
		return "Error";
	}

}

//Multiplication
function multiplication (x, y) {
	return x * y;
}

//Division
function division (x, y) {
	if(y == 0)
		return 'Error, cannot divide by zero';

	return x / y;
}
