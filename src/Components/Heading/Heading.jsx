import { useEffect, useState } from "react";


const Heading = () =>{

  const [lightMode, setLightMode] = useState(false);

  const handleChangeMode = () => setLightMode(!lightMode);

  useEffect(() =>{
    const body = document.querySelector("body");
    if (lightMode) {
      body.classList.add("lightmode");
    } else {
      body.classList.remove("lightmode");
    }
  }, [lightMode]);

  return (
    <div className='heading'>
      <h2 className='heading__title'>TODO</h2>
      <div className='heading__modes'>
        <div className="heading__mode-wrapper">
          <input 
            type='radio'
            id='darkmode'
            name='colormode'
            aria-label='toggle darkmode'
            value='darkmode'
            defaultChecked
            onChange={handleChangeMode}
            />
          <label htmlFor="darkmode">
          </label>
          <input 
            type='radio' 
            id='lightmode' 
            name='colormode' 
            aria-label='toggle lightmode'
            onChange={handleChangeMode}
             />
          <label htmlFor="lightmode">
          </label>
          <div className="heading__focus-trick"></div>
        </div>
      </div>
    </div>
  );
}


export default Heading;