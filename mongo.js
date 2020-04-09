const mongoose = require('mongoose')

if (process.argv.length !== 3 && process.argv.length !== 5) {
    console.log('usage: node mongo.js <password>')
    console.log('usage: node mongo.js <password> <name> <number>')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://admin:${password}@cluster0-heofx.mongodb.net/phonebook-db?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const PhoneBook = mongoose.model('PhoneBook', phonebookSchema)

if (process.argv.length === 3) {
    PhoneBook.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
} else {
    const person = new PhoneBook({
        name: process.argv[3],
        number: process.argv[4],
    })

    person.save().then(response => {
        console.log("added", response.name, "number", response.number, "to the phonebook")
        mongoose.connection.close()
    })
}
