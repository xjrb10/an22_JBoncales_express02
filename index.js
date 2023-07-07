// load express for our backend
const express = require('express');
const mongoose = require('mongoose');

// we create an app variable that stores results of the express function that initializes our express applciation and allow to access different methods that will make backend creation easy
const app = express();

mongoose.connect('mongodb+srv://202110016:FScXIWohtKlAxpwy@cluster0.mrydiey.mongodb.net/an22_sample_database?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
mongoose.connection.once('open', () =>
	console.log('Now connected to MongoDB Atlas.'))

// Allows us to control the app's Cross Origin Resource Sharing
const cors = require('cors')
const userRoutes = require("./routes/userRoutes")
// Allows all resources to access our backend application
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// define the /users string to be included for all users routes deined in the 'user' route file
app.use('/users', userRoutes);

app.listen(process.env.PORT || 4000, () => { console.log(`API is now online on port ${ process.env.PORT || 4000}`)});

