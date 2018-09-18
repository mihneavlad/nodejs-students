// PLAN:
//
// v 1. Read data from JSON file.
//v  2. Write a file that contains the following text:
//v     For each student write:
//     {first name} {last name} is {age} years old and was born in {place of birth}
//
//
//     At the end of the file write a calculation of how many people came from each unique place of birth.
//
//     1. create an empty object
//     2. for each student take the value of {place of birth} and:
//       if it doesn't exist as a key in the object, create a new key in the object and set its value to 1/
//
//       otherwise add 1 to the key that already exists in the object
//
//

import fs from 'fs';

const pathToFile = 'static/students.json';

fs.readFile(pathToFile, (err, data) => {
	if (err) throw err;

	const students = JSON.parse(data);

	const pobSum = students.reduce((summary, item) => {
		let pob = item.place_of_birth;

		return Object.assign(summary, {
			[pob]: summary[pob] ? summary[pob] + 1 : 1
		});

	}, {});

	let outputString = students.map(student => (
		`${student.first_name} ${student.last_name} is ${student.age} years old and was born in ${student.place_of_birth}.`
	)).join('\n') + '\n\n';

	// outputString += '----------------------------------------\n\n';
	console.log(Object.values(pobSum));

	outputString += Object.keys(pobSum).reduce(function(accumulator, key){
    //
		if (Object.values(pobSum).filter(x => x > 1)) {

			return `There are ${Object.values(pobSum)} students from ${Object.keys(pobSum)}`;
		}
		// else {
		// 	return `${accumulator}`;
		// }




		// if (pobSum[key] > 1) {
		//
		//   // return `There are ${pobSum[key]} students from ${currentValue}`;
		// }
		//
		// else {
		// 	return `${key + ', ' + currentValue}`;
		// }
	});

	// .join('\n')



	fs.writeFile('static/student-summary.txt', outputString, err => {
		if (err) throw err;

		// console.log('Student report generated.');
	});
});
