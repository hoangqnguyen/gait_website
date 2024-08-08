import { useState } from 'react';
import axios from 'axios';

const VideoUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [uploadedFilePath, setUploadedFilePath] = useState('');

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('video', file);

    try {
      const res = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('File uploaded successfully');
      setUploadedFilePath(res.data.filePath);
    } catch (err) {
      setMessage('File upload failed');
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <input type="file" accept="video/*" onChange={onFileChange} />
        </div>
        <div>
          <button type="submit">Upload Video</button>
        </div>
      </form>
      {message && <p>{message}</p>}
      {uploadedFilePath && (
        <video width="400" controls>
          <source src={uploadedFilePath} type="video/mp4" />
          Your browser does not support HTML video.
        </video>
      )}
    </div>
  );
};

export default VideoUpload;
