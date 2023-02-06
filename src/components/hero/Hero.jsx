import React from 'react'
import { AiOutlineArrowDown } from 'react-icons/ai'
import './heromodule.css'
import manEating from '../../images/manEating.png'

const Hero = () => {
  return (
    <section style={{height: '200vh'}} id='home' className='container'>
      <div className="wrapper">
        <div className="left">
          <h2 className="title">Craving for Delicious Food</h2>
          <p className="firstMsg">But going out to take <span>food costs time...</span></p>
          <p className="secondMsg">Why not order <span>pizza</span> or something <br/><span>delicious</span>from our restaurnt</p>
          <p className="desc">Our restaurnt puts the client above.They are our single most important thing for our business</p>
          <div className="buttons">
            <button className="buttonOrder">Order now!</button>
            <button className="buttonSee"><a href='#foods'> See what's available <AiOutlineArrowDown/></a></button>
          </div>
        </div>
        <div className="right">
          <img src={manEating} alt='' className='manEatingImg'/>
        </div>
      </div>
    </section>
  )
}

export default Hero