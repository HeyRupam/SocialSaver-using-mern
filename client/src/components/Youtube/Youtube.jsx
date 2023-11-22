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

  const handleDownload = (e, index) => {
    e.preventDefault()
    setYtitag(index)
    console.log(ytitag);
    axios.post('http://localhost:3001/download', {ytitag})
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }
  return (
    <div className='justify-content-center'>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor="yturl">Youtube URL</label>
          <input id='yturl' type="url" name='yturl' placeholder='Enter your url' className='form-control rounded-0' onChange={(e) => setYturl(e.target.value)} required />
        </div>
        <button type='submit' className='btn btn-success w-100 rounded-0'>Submit</button>
      </form>
      <div>
        {ytdetails ? (
          <p>{ytdetails.title}</p>
        ) : ''}
      </div>
      <div>
        {ytformats && ytformats.length > 0 ? (
          ytformats.map((format, index) => (
            <div key={format.itag}>
              <p>{format.qualityLabel}</p>
              <button className='white rounded-0' onClick={(e) => handleDownload(e, index)}>Download Video</button>
            </div>
          ))
        ) : (
          <p>No video available</p>
        )}
      </div>
    </div>
  )
}

export default Youtube
