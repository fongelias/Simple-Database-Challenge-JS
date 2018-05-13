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

function Transaction() {
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

	this.rollback = () => {
		if(transactions.length == 0) {
			return "NO TRANSACTION";
		} else {
			transactions.pop();
			return "";
		}
	}

	this.commit = () => {
		if(transactions.length == 0) {
			return "NO TRANSACTION";
		} else {
			transactions.forEach(transaction => {
				store = Object.assign({}, store, transaction.getStore());
			});
			transactions = [];
			return "";
		}
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
		let unique = Object.assign({}, store);

		transactions.forEach(transaction => {
			unique = Object.assign({}, store, transaction.getStore());
		});
		
		return Object.values(unique).filter(value => value == value).length;
	};
}


function main() {
	let end = false;
	let db = new Database();

	let wait = () => {
		Reader.question('Please enter a command: ', (answer) => {
			const query = answer.split(" ");
			switch (query[0]) {
				case COMMANDS.SET:
					db.set(query[1], query[2]);
					wait();
					break;
				case COMMANDS.GET:
					console.log(db.get(query[1]));
					wait();
					break;
				case COMMANDS.UNSET:
					db.unset(query[1]);
					wait();
					break;
				case COMMANDS.NUMEQUALTO:
					console.log(db.numequalto(query[1]));
					wait();
					break;
				case COMMANDS.END:
					console.log('Goodbye!');
					Reader.close();
					break;
				case COMMANDS.BEGIN:
					db.begin();
					wait();
					break;
				case COMMANDS.ROLLBACK:
					console.log(db.rollback());
					wait();
					break;
				case COMMANDS.COMMIT:
					console.log(db.commit());
					wait();
					break;
			}
		});
	}

	wait();
}

main();











