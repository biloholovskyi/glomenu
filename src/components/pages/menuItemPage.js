import React, {Component} from 'react';
import salad from "../menu-list-item/img/salad.svg";
import pizza from "../menu-list-item/img/pizza-slice.svg";
import meat from "../menu-list-item/img/meat.svg";
import {connect} from "react-redux";
import WhithRestoService from '../hoc';
import {menuLoaded, menuRequested, menuError, addedToCart} from "../../actions";
import './menuPages.scss';
import Spinner from "../spinner";

class MenuItemPage extends Component {
  componentDidMount() {
    this.props.menuRequested();
    const {RestoService} = this.props;
    RestoService.getItem(this.props.id)
      .then(res => {
        const openItem = [res];
        this.props.menuLoaded(openItem);
      })
      .catch(err => {
        this.props.menuError(err);
      });
  }

  render() {
    const {menuItems, addedToCart} = this.props;
    if(menuItems.length > 0) {
      const {title, url, price, category, id} = menuItems[0];
      return (
        <div className="menu__page">
          <div className="menu__head">
            <img src={category === "salads" ? salad : category === "pizza" ? pizza : category === "meat" ? meat : null} alt={category}/>
            <div className="menu__title">{title}</div>
          </div>
          <img className="menu__img"
               src={url}
               alt={title}></img>
          <div className="menu__category">Category: <span>{category}</span></div>
          <div className="menu__price">Price: <span>{price}$</span></div>
          <button onClick={() => addedToCart(id)} className="menu__btn">Add to cart</button>
        </div>
      )
    }
    return (
      <Spinner/>
    )
  }
  }

const mapStateToProps = (state) => {
  return {
    menuItems: state.menu,
    loading: state.loading,
    error: state.error
  }
}

const mapDispatchToProps = {
  menuLoaded,
  menuRequested,
  menuError,
  addedToCart
}


export default WhithRestoService()(connect(mapStateToProps, mapDispatchToProps)(MenuItemPage));