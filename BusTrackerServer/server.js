const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const uri = 'mongodb+srv://22cs029:1234567890@locations.uavka58.mongodb.net/WhereIsMyBus?retryWrites=true&w=majority';

mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const stopSchema = new mongoose.Schema({
  name: String,
  location: {
    latitude: Number,
    longitude: Number,
  },
});

app.post('/add-stop', async (req, res) => {
  const { name, latitude, longitude } = req.body;
  const stop = new Stop({ name, location: { latitude, longitude } });
  await stop.save();
  res.send(stop);
});

const Stop = mongoose.model('Stop', stopSchema);

const busSchema = new mongoose.Schema({
  name: String,
  location: {
    latitude: Number,
    longitude: Number,
  },
});

const Bus = mongoose.model('Bus', busSchema);

app.post('/add-bus', async (req, res) => {
  const { name } = req.body;
  const bus = new Bus({ name });
  await bus.save();
  res.send(bus);
});

app.post('/update-location', async (req, res) => {
  const { name, latitude, longitude } = req.body;
  const bus = await Bus.findOneAndUpdate(
    { name },
    { location: { latitude, longitude } },
    { new: true }
  );
  res.send(bus);
});

app.get('/buses', async (req, res) => {
  const buses = await Bus.find();
  res.send(buses);
});

app.delete('/delete-bus/:id', async (req, res) => {
  const { id } = req.params;
  await Bus.findByIdAndDelete(id);
  res.send({ message: 'Bus deleted successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
