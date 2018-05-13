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

function Database() {
	let store = {};
	let transactions = [];

	//Transaction Commands
	this.begin = () => {
		transactions.push(new Transaction());
	}

	this.rollback = () = {
		transactions.pop();
	}

	this.commit = () => {
		transactions.forEach(transaction => {
			store = Object.assign({}, store, transaction.getStore());
		});
		transactions = [];
	}

	//Data Commands
	this.set = (name, value) => {
		if(transactions.length > 0) {
			transactions[transactions.length - 1].set(name, value);
		} else {
			store[name] = value;
		}
	};

	this.unset = (name) => {
		if(transactions.length > 0) {
			transactions[transactions.length - 1].unset(name);
		} else {
			delete store[name];
		}
	};

	this.get = (name) => {
		if(transactions.length > 0) {
			for(let i = 1; i < transactions.length + 1; i++) {
				const val = transactions[transactions.length - i].get(name);
				if(val) {
					return val;
				}
			}
		}

		return store[name];
	};

	this.numequalto = (value) => {
		const unique = {};
		transactions.forEach(transaction => {
			unique = Object.assign({}, unique, transaction.numequalto(value));
		});

		return Object.keys(unique).length;
	};
}


function main() {
	let end = false;
	let db = new Database();
}











