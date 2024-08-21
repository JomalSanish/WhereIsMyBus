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
mongoose.connect('mongodb+srv://22cs029:1234567890@locations.uavka58.mongodb.net/WhereIsMyBus?retryWrites=true&w=majority');





//bus collection
const busnSchema = new mongoose.Schema({
  name: String,
  route: String,
  location:{
    latitude: Number,
    longitude: Number,
  }
});

const Busn = mongoose.model('buses', busnSchema);


const busroutesSchema = new mongoose.Schema({
  title: String,
  stops:[{
    name: String,
    number: Number,
  }]
});

const Busroutes = mongoose.model('routes', busroutesSchema);


const busstopsSchema = new mongoose.Schema({
  name: String,
  location:{
    latitude: Number,
    longitude: Number,
  }
});

const Busstops = mongoose.model('stops', busstopsSchema);
//end of schemas








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

    // Find the routes that contain both from and to in the stops array
    const routes = await Busroutes.find({
      stops: {
        $all: [
          { $elemMatch: { name: from } },
          { $elemMatch: { name: to } }
        ]
      }
    }).select('title'); // Only select the title (route name)

    // Extract route titles from the routes array
    const routeTitles = routes.map(route => route.title);

    // Find buses whose route is in the list of routes
    const buses = await Busn.find({
      route: { $in: routeTitles }
    });

    res.json(buses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/bus-stops', async (req, res) => {
  const { query } = req.query;

  try {
    const stops = await Busstops.find({ name: new RegExp(query, 'i') });
    res.json(stops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/routes', async (req, res) => {
  try {
    const { route } = req.query;

    // Find the route that matches the given route title
    const matchingRoute = await Busroutes.findOne({ title: route });

    if (!matchingRoute) {
      return res.status(404).json({ error: 'Route not found' });
    }

    // Get detailed stop information (name and location) for each stop in the route
    const stopsDetails = await Busstops.find({
      name: { $in: matchingRoute.stops.map(stop => stop.name) }
    }).select('name location');

    // Combine the original stops array with the detailed stop information
    const detailedStops = matchingRoute.stops.map(stop => {
      const detail = stopsDetails.find(detail => detail.name === stop.name);
      return {
        name: stop.name,
        location: detail ? detail.location : null, // Include location if found
      };
    });

    res.json({ ...matchingRoute.toObject(), stops: detailedStops });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
