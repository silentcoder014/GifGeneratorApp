import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Spinner from './Spinner';

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;

const Tag = () => {
  const [gif, setGif] = useState('');  // To store the URL of the GIF
  const [loading, setLoading] = useState(false);  // To track the loading state
  const [tag, setTag] = useState('');  // To store the tag (keyword) for the GIF search
  const [buttonClicked, setButtonClicked] = useState(false);  // To track if the "Generate" button was clicked

  useEffect(() => {
    // This effect runs only if the button is clicked and tag changes
    if (buttonClicked) {
      setLoading(true);  // Set loading to true before fetching the GIF
      axios
        .get(`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${tag}`)  // Request to Giphy API with the tag
        .then((response) => {
          const imageSource = response.data.data.images.downsized_large.url;  // Extracting the GIF URL
          setGif(imageSource);  // Set the gif state with the image URL
        })
        .catch((error) => {
          console.error('Error fetching gif:', error);  // Handle any error during fetching
        })
        .finally(() => {
          setLoading(false);  // Set loading to false after the GIF is fetched
        });

      // Reset buttonClicked after the effect runs to prevent repeated API calls
      setButtonClicked(false);
    }
  }, [buttonClicked, tag]);  // Dependencies: effect runs when either buttonClicked or tag changes

  return (
    <div className='w-full bg-blue-400 rounded-lg border border-black flex flex-col items-center gap-y-5 mt-[15px]'>
      <h1 className='text-2xl underline uppercase font-bold pt-2'>
        Random {tag} GIF
      </h1>
      {
        loading ? (
          <Spinner />  // Display a spinner while the GIF is loading
        ) : (
          <img src={gif} width="450" alt="hii" />  // Display the GIF once it's loaded
        )
      }
      <input 
        className='w-10/12 text-lg py-2 rounded-lg text-center'
        value={tag}  // Bind the input field to the 'tag' state
        onChange={(event) => setTag(event.target.value)}  // Update the 'tag' state when the input changes
      />
      <button onClick={() => setButtonClicked(true)}
        className='w-10/12 bg-orange-100 text-lg py-2 rounded-lg mb-[20px]'>
        Generate
      </button>
    </div>
  );
};

export default Tag;
