const readline = require('readline');

const Reader = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const COMMANDS = {
	SET: 'SET',
	GET: 'GET',
	UNSET: 'UNSET',
	NUMEQUALTO: 'NUMEQUALTO',
	END: 'END',
	BEGIN: 'BEGIN',
	ROLLBACK: 'ROLLBACK',
	COMMIT: 'COMMIT',
}

function Transaction() => {
	let store = {};

	this.set = (name, value) => {
		store[name] = value;
	}

	this.unset = (name) => {
		delete store[name];
	}

	this.get = (name) => store[name];

	this.numequalto = (value) => {
		const equalsToValue = {};
		Object.keys(store).forEach(key => {
			if(store[key] == value) {
				equalsToValue[key] = true;
			}
		});
		return equalsToValue;
	}

	this.getStore = () => store;
}













