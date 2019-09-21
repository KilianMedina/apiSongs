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

const SongSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required:true
  },
  genre: {
    type: String,
    enum: ['cumbia', 'electronica', 'pop','punk','rap','reggaeton', 'rock'],
    required: true
  },
  artists: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artist'
    }]
  },
  album: {
      title: String,
  },
  covers: [String],
  release: {
    type: Date
  },
  Download: {
    type: Boolean,
    default: true
  }
}, {timestamps: true});

const Song = mongoose.model('Song', SongSchema);

module.exports = { Song };