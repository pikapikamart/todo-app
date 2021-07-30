

const Heading = () =>{
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
            />
          <label htmlFor="darkmode">
          </label>
          <input 
            type='radio' 
            id='lightmode' 
            name='colormode' 
            aria-label='toggle lightmode'
            value='lightmode'
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