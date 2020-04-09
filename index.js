require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Phonebook = require('./models/phonebook');

const app = express();

morgan.token('post-data', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  }
});
const logger = morgan(':method :url :status :res[content-length] - :response-time ms :post-data');

app.use(express.static('build'));
app.use(express.json());
app.use(logger);
app.use(cors());

app.get('/info', (req, res, next) => {
  Phonebook.find({})
    .then((persons) => {
      res.send(`<p>Phonebook has info for ${persons.length} people</p>`
        + `<p>${new Date()}</p>`);
    })
    .catch((error) => next(error));
});

app.get('/api/persons', (req, res, next) => {
  Phonebook.find({})
    .then((persons) => {
      res.json(persons.map((p) => p.toJSON()));
    })
    .catch((error) => next(error));
});

app.get('/api/persons/:id', (req, res, next) => {
  Phonebook.findById(req.params.id)
    .then((person) => {
      if (person) res.json(person.toJSON());
      else res.status(404).end();
    })
    .catch((err) => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Phonebook.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
  const { body } = req;

  const newPerson = {
    name: body.name,
    number: body.number,
  };

  Phonebook.findByIdAndUpdate(req.params.id, newPerson, { new: true })
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.post('/api/persons', (req, res, next) => {
  const { body } = req;

  if (!body.name) {
    return res.status(400).json({
      error: 'name is missing',
    });
  } if (!body.number) {
    return res.status(400).json({
      error: 'number is missing',
    });
  }

  const newPerson = new Phonebook({
    name: body.name,
    number: body.number,
  });

  newPerson.save()
    .then((response) => {
      res.json(response);
    })
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError' && error.path === '_id') {
    return response.status(400).send({ error: 'malformed id' });
  } if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
