import React from "react";
import "./Menu.css";

const Menu = (props) => {
  //a menu bar on the left of the application with three icons for user to switch between features
  return (
    <div className='menu'>
      <a className='menu_item' width='300' height='300'>
        <i className='fa fa-sign-out fa-3x' onClick={props.logout}></i>
      </a>
      <a className='menu_item' onClick={props.toProf} width='300' height='300'>
        <i className='fas fa-user fa-3x'></i>
      </a>
      <a className='menu_item' onClick={props.toChat} width='300' height='300'>
        <i className='fas fa-comments fa-3x'></i>
      </a>
      <a className='menu_item' onClick={props.tomission} width='300' height='300'>
        <i className='fas fa-calendar-alt fa-3x'></i>
      </a>
    </div>
  );
};

export default Menu;
