const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const redis = require('redis');
const { promisify } = require('util');

const app = express();
const port = 3000;

// Redis setup for caching
const redisClient = redis.createClient({
  host: 'localhost',
  port: 6379
});

const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

// Cache middleware
const cache = async (req, res, next) => {
  const key = req.originalUrl;
  const cachedResponse = await getAsync(key);
  
  if (cachedResponse) {
    res.json(JSON.parse(cachedResponse));
    return;
  }
  next();
};

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cache);

// MongoDB connection with connection pooling
mongoose.connect('mongodb+srv://whereismybusapp:whereismybus123@whereismybus.xo0bi.mongodb.net/WhereIsMyBus?retryWrites=true&w=majority&appName=WhereIsMyBus', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 10
});

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
    const { from, to } = req.query;
    const cacheKey = `buses:${from}:${to}`;
    
    const cachedResult = await getAsync(cacheKey);
    if (cachedResult) {
      return res.json(JSON.parse(cachedResult));
    }

    const formattedFrom = formatString(from);
    const formattedTo = formatString(to);

    const routes = await Routes.find({
      stops: {
        $all: [
          { $elemMatch: { name: formattedFrom } },
          { $elemMatch: { name: formattedTo } }
        ]
      }
    }).lean();

    const filteredRoutes = routes.filter(route => {
      const fromIndex = route.stops.findIndex(stop => stop.name === formattedFrom);
      const toIndex = route.stops.findIndex(stop => stop.name === formattedTo);
      return fromIndex < toIndex;
    });

    const routeTitles = filteredRoutes.map(route => route.title);
    const busRoutes = await BusRoutes.find({
      "route.title": { $in: routeTitles }
    }).lean();

    await setAsync(cacheKey, JSON.stringify(busRoutes), 'EX', 300); // Cache for 5 minutes
    res.json(busRoutes);
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
