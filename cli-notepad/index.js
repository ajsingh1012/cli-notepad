#!/usr/bin/env node

const fs = require('fs');

console.log("Welcome to your notepad");
console.log("Write a new note, or read an old one!");

function note(message) {
    let time = new Date();

    // read the file
    fs.readFile('data.json', 'utf8', (err, data) => {

        if (err) {
            console.log(`Error reading file from disk: ${err}`);
        } else {
            // parse JSON string to JSON object
            const databases = JSON.parse(data);

            // add a new record
            databases[time.toDateString() + ' ' + time.toTimeString()] = message;

            // write new data back to the file
            fs.writeFile('data.json', JSON.stringify(databases, null, 4), (err) => {
                if (err) {
                    console.log(`Error writing file: ${err}`);
                }
            });
        }
    });
}

function read() {
    try {
        const data = fs.readFileSync('data.json', 'utf8');
    
        // parse JSON string to JSON object
        const databases = JSON.parse(data);
        for (const [key, value] of Object.entries(databases)) {
            console.log(`Record: ${key}`);
            console.log(`${value}`);
            console.log();
        }
    
    } catch (err) {
        console.log(`Error reading file from disk: ${err}`);
    }
}

if(process.argv[2] == "write") {
    console.log("Remember: Ctrl+D to end input")
    var readline = require('readline');
    var input = [];
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.prompt();
    rl.on('line', function (cmd) {
        input.push(cmd);
    });
    rl.on('close', function (cmd) {
        note(input.join('\n'));
    });
} else if (process.argv[2] == "read") {
    read();
}