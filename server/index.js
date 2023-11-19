const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');

const app = express();
app.use(cors());
app.use(express.json());

let videoInfo = null; // Declare a variable to store the video info

app.post('/yt', async (req, res) => {
  const { yturl } = req.body;

  try {
    const ytUrlType1 = /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/; //Youtube main url
    const ytUrlType2 = /^.*youtu\.be\/([^#\&\?]*).*/; // Youtbe share url

    const match = yturl.match(ytUrlType1) ? yturl.match(ytUrlType1) : yturl.match(ytUrlType2);
    if (match) {
      videoInfo = await ytdl.getInfo(match[1]);
      res.json({
        formats: videoInfo.formats,
        videoDetails: videoInfo.videoDetails,
      });

      console.log('data sent');
    }
  } catch (e) {
    res.json('fail');
    console.log(e);
  }
});

app.post('/download', async (req, res) => {
  const { ytitag } =  req.body;

  try {
    if (videoInfo) {
      // Use the videoInfo variable here
      console.log('Video Info:', videoInfo.formats[ytitag].url);
    } else {
      console.log('No video info available');
    }
  } catch (e) {
    console.log(e);
  }
});

app.listen(3001, () => {
  console.log('Server is running');
});
