import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'


function Youtube() {
  const [yturl, setYturl] = useState()
  const [ytformats, setYtformats] = useState()
  const [ytdetails, setYtdetails] = useState()
  const [ytitag, setYtitag] = useState()

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/yt', { yturl })
      .then(res => {
        if (res.data == 'fail') {
          alert("Failed!, Try again")
        }
        else {
          console.log('data recived');
          console.log(res.data);
          setYtformats(res.data.formats)
          setYtdetails(res.data.videoDetails)
        }
      })
      .catch(err => console.log(err))
  }

  const handleDownload = (e, videoInfo) => {
    e.preventDefault()
    // setYtitag(index)
    // console.log(ytitag);
    axios.post('http://localhost:3001/download', { videoInfo })
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  const handleThumb = (url) => ({
    background: `url(${url})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '200px',
    width: 'auto',
    borderRadius: '15px'
  })

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const remainingSeconds = timeInSeconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  return (
    <div className='container main_content'>
      <div className=' row justify-content-center'>
        <div className="col-lg-6">
          <form onSubmit={handleSubmit}>
            <div className='mb-3 text-center'>
              <label className='mb-1' htmlFor="yturl">Youtube URL</label>
              <input id='yturl' type="url" name='yturl' placeholder='Enter your url' className='form-control rounded-4' onChange={(e) => setYturl(e.target.value)} required />
            </div>
            <button type='submit' className='btn text-white w-100 rounded-4'>Submit</button>
          </form>

        </div>

        <div className='col-lg-12 my-5'>
          <div className="row">
            <div className='col-lg-4'>
              {ytdetails ? (
                <div>
                  <div className='thumb' style={handleThumb(ytdetails.thumbnails[4].url)}>
                  </div>
                  <p>{ytdetails.title} {console.log(ytdetails.thumbnails[4].url)}</p>
                  <p>Duration: {formatTime(ytdetails.lengthSeconds)}</p>
                </div>
              ) : ''}
            </div>
            {ytformats && ytformats.length > 0 ? (
              <div className='col-lg-8'>
                <div className='row mx-1'>
                  <div className='col-lg-2 options text-center'>
                    <h5>Type</h5>
                  </div>
                  <div className='col-lg-2 options text-center'>
                    <h5>FPS</h5>
                  </div>
                  <div className='col-lg-2 options text-center'>
                    <h5>Audio</h5>
                  </div>
                  <div className='col-lg-2 options text-center'>
                    <h5>Quality</h5>
                  </div>
                  <div className='col-lg-4 options text-center'>
                    <h5>Downloads</h5>
                  </div>
                </div>

                {ytformats.map((format, index) => (
                  <div key={format.itag} className='row mx-1'>
                    <div className='col-lg-2 options text-center'>
                      <h5>{format.container}</h5>
                    </div>
                    <div className='col-lg-2 options text-center'>
                      <h5>{format.fps}</h5>
                    </div>
                    <div className='col-lg-2 options text-center'>
                      <h5>{format.hasAudio ? 'Yes' : 'No'}</h5>
                    </div>
                    <div className='col-lg-2 options text-center'>
                      <h5>{format.qualityLabel}</h5>
                    </div>
                    <div className='col-lg-4 options text-center'>
                      <button className='white rounded-4' onClick={(e) => handleDownload(e, format)}>Download</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (''
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Youtube
