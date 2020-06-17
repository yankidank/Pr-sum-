import React, { useEffect, useState } from 'react';

// import axios from 'axios';
import NavBar from '../NavBar';
import { axiosInstance } from '../../utils/API';

function AddJob() {
  const [post, setPost] = useState({});

  // // Hitting the Post endpoint
  const handleAdd = async () => {
    console.log(post.url)
   const jobInfo = await axiosInstance.get('/api/jobs/info', {params: { url: post.url }})
   console.log(jobInfo);
  };

  const onPostInput = event => {
    const { target: { name, value }} = event;

    setPost({ ...post, [name]: value})
  }

  useEffect(() => {
    // Paste Job URL
    const paste = document.getElementById('paste');
    paste.addEventListener('click', () => {
      if (!paste.value) {
        // Attempt to read clipboard text
        navigator.clipboard
          .readText()
          .then(text => {
            const pasteText = text.trim();
            // Check that the clipboard holds a link
            const checkUrl = pasteText.startsWith('http');
            if (checkUrl) {
              setPost({...post, url: pasteText })
              // paste.value = pasteText;
            }
          })
          .catch(err => {
            console.log('Something went wrong', err);
          });
      }
    });
  });

  return (
    <div>
      <NavBar />
      <div>
        <ul className="menuNav">
          <li className="btn-home-login">Job Post URL</li>
          <li>
            <input
              className="menu-url-input-field"
              id="paste"
              name="url"
              placeholder="https://"
              onInput={onPostInput}
              value={post.url}
            ></input>
          </li>
          <li>
            <button className="button btn-job-add" onClick={handleAdd}>
              Save Job
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AddJob;
