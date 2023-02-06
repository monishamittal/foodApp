import React from 'react'
import { Link } from 'react-router-dom'
import './navbarmodule.css'
import {AiOutlineShoppingCart,AiOutlineUser} from 'react-icons/ai'

const Navbar = () => {
  return (
    <div className='container2'>
<div className="wrapper">
  <div className="left">
    <Link to ='/' className='title'>
      FoodApp
    </Link>
  </div>
  <div className="center">
    <ul className="list">
      <li className="listItem">
        <a href="#">Home</a>
      </li><li className="listItem">
        <a href="#contacts">Contacts</a>
      </li><li className="listItem">
        <a href="#foods">Foods</a>
      </li><li className="listItem">
        <a href="#faq">FAQ</a>
      </li><li className="listItem">
        <Link to='/create'>Create</Link>
      </li>
    </ul>
  </div>
  <div className="right">
    <AiOutlineUser className='userIcon' />
    <Link to ='/cart' className='cartContainer'>
      <AiOutlineShoppingCart className='cartIcon'/>
      <div className="cartQuantity">0</div>
    </Link>
    <button className="logout">Logout</button>
  </div>
</div>
    </div>
  )
}

export default Navbar
