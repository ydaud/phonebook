const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(p => p.id))
        : 0
    return maxId + 1
}

app.use(cors())
app.use(express.json())

morgan.token('post-data', (req, res) => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body)
    }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'))


let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
    },
    {
        name: "Moose",
        number: "2",
        id: 5
    },
]

app.get('/info', (req, res) => {
    res.send("<p>Phonebook has info for " + persons.length + " people</p>"
        + "<p>" + new Date() + "</p>")
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)

    if (person) res.json(person)
    else res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)

    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name) {
        return res.status(400).json({
            error: "name is missing"
        })
    } else if (!body.number) {
        return res.status(400).json({
            error: "number is missing"
        })
    } else if (persons.find(p => p.name === body.name)) {
        return res.status(400).json({
            error: "name must be unique"
        })
    }

    const newPerson = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(newPerson)

    res.json(newPerson)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
