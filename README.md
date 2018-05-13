# [Simple-Database-Challenge-JS](https://web.archive.org/web/20150411073649/http://www.thumbtack.com:80/challenges/simple-database)

Implement a redis-like in memory db, receiving commands from stdin and writing to stdout


## Commands

### Data Commands
`SET [name] [value]` - set variable `[name]` to value `[value]`

`GET [name]` - print value of variable `[name]` or `null` if variable is not set

`UNSET [name]` - unset variable `[name]`

`NUMEQUALTO [name]` - Print out the number of variables currently set to `value`

`END [name]` - Exit the program

All commands should have a worst-case of O(log N) or better

### Transaction Commands
`BEGIN` - open a new transaction block, which can be issued inside of an existing block

`ROLLBACK` - undo all commands issued in most recent transaction block. Print `NO TRANSACTION` if none are in progress

`COMMIT` - close all open transaction blocks and permenantly apply changes made to them

All data commands run outside a transaction block should commit immediately







