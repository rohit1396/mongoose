const mongoose = require("mongoose");

// connecting mongoose to database
mongoose
  .connect("mongodb://127.0.0.1:27017/myapp")
  .then(() => console.log("connection established"))
  .catch((err) => console.log(err));

// defining database schema
const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  source: String,
  course: String,
  videos: Number,
  author: String,
  active: Boolean,
  date: {
    type: Date,
    default: Date.now(),
  },
});

// creating collection in myapp database
const PlayList = new mongoose.model("Playlist", playlistSchema);

const createDocument = async () => {
  try {
    const expressPlaylist = new PlayList({
      name: "expressJs",
      source: "Youtube and Udemy",
      course: "Backend Express",
      videos: 30,
      author: "Rohit Gaikwad",
      active: true,
    });

    const mongoPlaylist = new PlayList({
      name: "MongoDB",
      source: "Youtube and Udemy",
      course: "Database",
      videos: 10,
      author: "Rohit Gaikwad",
      active: true,
    });

    const mongoosePlaylist = new PlayList({
      name: "Mongoose",
      source: "Youtube",
      course: "Database",
      videos: 30,
      author: "Rohit Gaikwad",
      active: true,
    });

    // for inserting single doc
    // const result = await nodePlaylist.save();

    // for inserting multiple docs
    const result = await PlayList.insertMany([
      expressPlaylist,
      mongoPlaylist,
      mongoosePlaylist,
    ]);
    // console.log(result);
  } catch (err) {
    console.log(err);
  }
};

// createDocument();

const getDocument = async () => {
  const query = await PlayList.find({ course: "Database" })
    .select({
      source: 1,
    })
    .limit(1);
  console.log(query);
};

getDocument();
