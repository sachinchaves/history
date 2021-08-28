import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components'

const Nearby = () => {
  const router = useRouter();
  const  {lon} = router.query;
  const {lat}= router.query;

  const [img, setImg] = useState();
  const [imgLg, setImgLg] = useState();
  const [unClicked, setunClicked] = useState();
  const [error, setError] = useState();
  const longtitude = lon;
  const latitude = lat;
  
  const handleClick = (image) => {
    setImgLg(`${image}_w.jpg`);
    setunClicked(false);
  }
  
  useEffect(()=>{
    try{
      const fetchImage = async () => {
        const response = await fetch(`/api/flickr?lat=${longtitude}&lon=${latitude}`);
        const result = await response.json();
        setImg(result.photos.photo.map((photo, index) => (
            <img src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_s.jpg`} onClick={() => handleClick(`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`)}/>
          )));
          setunClicked(true);
        // setImgLg(<img src=`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`>)
      }
      fetchImage();
    }catch {
      setError(true);
    }
    
    setError(false);
  }, [])

  return (
    <>
    <div>
      <div>
        <img src={imgLg} />
      </div>
      <div>
      {unClicked && (
        <p>Please click on the image below</p>
      )}
      {error && (
        <p>Something went wrong. Please try again later</p>
      )}
        {img}
        
      </div>
    </div>
    </>
  )
}
export default Nearby