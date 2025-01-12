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
mongoose.connect('mongodb+srv://whereismybusapp:whereismybus123@whereismybus.xo0bi.mongodb.net/WhereIsMyBus?retryWrites=true&w=majority&appName=WhereIsMyBus');

// Updated Schemas
const stopsSchema = new mongoose.Schema({
  name: String, 
  location: {
    latitude: Number,
    longitude: Number,
  }
});

const busesSchema = new mongoose.Schema({
  name: String, 
  location: {
    latitude: Number,
    longitude: Number,
  }
});

const routeSchema = new mongoose.Schema({
  title: String, 
  stops: [{
    name: String 
  }]
});

const busRouteSchema = new mongoose.Schema({
  busName: String, 
  route: {
    title: String,
    stops: [{
      name: String,
      location: {
        latitude: Number,
        longitude: Number,
      }
    }]
  }
});

// Models
const Stops = mongoose.model('stops', stopsSchema);
const Buses = mongoose.model('buses', busesSchema);
const Routes = mongoose.model('routes', routeSchema);
const BusRoutes = mongoose.model('busroutes', busRouteSchema);

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

    // Find the routes where "from" comes before "to" in the stops array
    const routes = await Routes.find({
      stops: {
        $all: [
          { $elemMatch: { name: from } },
          { $elemMatch: { name: to } }
        ]
      }
    }).select('title stops');

    // Filter routes where "from" comes before "to"
    const filteredRoutes = routes.filter(route => {
      const fromIndex = route.stops.findIndex(stop => stop.name === from);
      const toIndex = route.stops.findIndex(stop => stop.name === to);
      return fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex;
    });

    const routeTitles = filteredRoutes.map(route => route.title);

    const busRoutes = await BusRoutes.find({
      "route.title": { $in: routeTitles }
    });

    res.json(busRoutes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/bus-details', async (req, res) => {
  const { busName } = req.query;
  try {
    const buses = await Buses.findOne({ name : busName });
    res.json(buses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get bus stops
app.get('/bus-stops', async (req, res) => {
  const { query } = req.query;
  try {
    const stops = await Stops.find({ name: new RegExp(query, 'i') });
    res.json(stops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get routes
app.get('/routes', async (req, res) => {
  try {
    const { busName } = req.query;

    const busRoute = await BusRoutes.findOne({ busName });

    if (!busRoute) {
      return res.status(404).json({ error: 'Bus route not found' });
    }

    res.json(busRoute.route);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
