const express = require('express')
const cors = require('cors')
const ytdl = require('ytdl-core');


const app = express();
app.use(cors())
app.use(express.json())

let info

app.post('/yt', (req, res) => {
  const { yturl } = req.body

  try{
    const ytUrlType1 = /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
    const ytUrlType2 = /^.*youtu\.be\/([^#\&\?]*).*/;

    const match = yturl.match(ytUrlType1) ? yturl.match(ytUrlType1) : yturl.match(ytUrlType2);
    if (match) {
      sendVideoData(match[1]);
    }

    async function sendVideoData(videoId) {
      let info = await ytdl.getInfo(videoId);
      res.json({ 
        formats: info.formats,
        videoDetails: info.videoDetails
       });
      
      console.log('data sent');
    }
  }
  catch(e){
    res.json('fail')
    console.log(e);
  }
})

app.post('/download', (req, res) => {
  const {ytitag} = req.body

  try{
    console.log(ytitag);
  }
  catch(e){
    console.log(e);
  }
})

app.listen(3001, () => {
  console.log("Server is running");
})