const mongoose = require('mongoose');

const URL_MONGO = 'mongodb+srv://KilianMedina:GUAPSZON9@kiliancluster-affuc.mongodb.net/Song_Api';

mongoose.connect(
  URL_MONGO,
  { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true
  },
  (error) => {
    if (error) console.log(error);
    if (!error) console.log('Conexion exitosa');
  }
);

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    name: {
      type: String,
      required: true
    }, 
    birth: {
      type: Date, 
      required: true
    },
    area: {
        type: String,
    },
    nationality:{
      type: String,
      enum: ['MX', 'US', 'NA'],
      default: 'NA',
    }
  }, {timestamps: true});
  
  const Artist = mongoose.model('Artist', ArtistSchema);
  
  module.exports = { Artist };