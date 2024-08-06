const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://Aldrin:Kakkanattu47@busdb.fzwwowm.mongodb.net/busDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const busSchema = new mongoose.Schema({
  busNumber: String,
  stops: [
    {
      name: String,
      coordinates: {
        latitude: Number,
        longitude: Number,
      }
    }
  ]
});

const Bus = mongoose.model('Bus', busSchema);

// New database connection for bus stops
const busStopsConnection = mongoose.createConnection('mongodb+srv://Aldrin:Kakkanattu47@busdb.fzwwowm.mongodb.net/busStopsDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const busStopSchema = new mongoose.Schema({
  name: String
});

const BusStop = busStopsConnection.model('BusStop', busStopSchema);

// Utility function to process strings
const formatString = (str) => {
  if (!str) return '';
  str = str.replace(/\s+/g, '').toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Routes for buses
app.get('/buses', async (req, res) => {
  try {
    let { from, to } = req.query;
    from = formatString(from);
    to = formatString(to);
    const buses = await Bus.find({
      stops: {
        $all: [
          { $elemMatch: { name: from } },
          { $elemMatch: { name: to } }
        ]
      }
    });
    res.json(buses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/buses', async (req, res) => {
  const { busNumber, stops } = req.body;

  try {
    const bus = new Bus({ busNumber, stops });
    await bus.save();
    res.status(201).json(bus);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/buses/:id', async (req, res) => {
  try {
    await Bus.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Routes for bus stops
app.post('/bus-stops', async (req, res) => {
  const { name } = req.body;

  try {
    const busStop = new BusStop({ name: formatString(name) });
    await busStop.save();
    res.status(201).json(busStop);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/bus-stops', async (req, res) => {
  const { query } = req.query;

  try {
    const stops = await BusStop.find({ name: new RegExp(query, 'i') });
    res.json(stops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
