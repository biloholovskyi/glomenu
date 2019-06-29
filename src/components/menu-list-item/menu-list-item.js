import React from 'react';
import './menu-list-item.scss';
import {Link} from 'react-router-dom';
import salad from './img/salad.svg';
import pizza from './img/pizza-slice.svg';
import meat from './img/meat.svg';

const MenuListItem = ({menuItem}) => {
  const {title, price, url, category, id} = menuItem;
  return (
    <li className="menu__item">
      <Link to={`/${id}`}>
        <div className="menu__head">
          <img src={category === "salads" ? salad : category === "pizza" ? pizza : category === "meat" ? meat : null} alt={category}/>
          <div className="menu__title">{title}</div>
        </div>
        <img className="menu__img"
             src={url}
             alt={title}></img>
        <div className="menu__category">Category: <span>{category}</span></div>
        <div className="menu__price">Price: <span>{price}$</span></div>
        <button className="menu__btn">Add to cart</button>
      </Link>
    </li>
  )
}

export default MenuListItem;