import Head from 'next/head';
import VideoUpload from '../components/VideoUpload';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Video Upload</title>
        <meta name="description" content="Upload a video file" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Upload a Video</h1>
        <VideoUpload />
      </main>
    </div>
  );
}
