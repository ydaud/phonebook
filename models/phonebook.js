const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

mongoose.set('useFindAndModify', false);

const url = process.env.DB_URI;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const phonebookSchema = new mongoose.Schema({
  name: {
    type: String, required: true, unique: true, minlength: 3,
  },
  number: { type: String, required: true, minlength: 8 },
});

phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

phonebookSchema.plugin(uniqueValidator);

module.exports = mongoose.model('PhoneBook', phonebookSchema);
