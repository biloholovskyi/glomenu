import React, {Component} from 'react';
import salad from "../menu-list-item/img/salad.svg";
import pizza from "../menu-list-item/img/pizza-slice.svg";
import meat from "../menu-list-item/img/meat.svg";
import {connect} from "react-redux";
import WhithRestoService from '../hoc';
import {menuLoaded, menuRequested, menuError} from "../../actions";
import './menuPages.scss';

class MenuItemPage extends Component {
  componentDidMount() {
    this.props.menuRequested();
    const {RestoService} = this.props;
    RestoService.getItem(this.props.id)
      .then(res => {
        this.props.menuLoaded(res);
      })
      .catch(err => {
        this.props.menuError(err);
      });
  }

  render() {
    const {menuItems} = this.props;
    const {title, url, price, category} = menuItems;
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
        <button className="menu__btn">Add to cart</button>
      </div>
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
  menuError
}


export default WhithRestoService()(connect(mapStateToProps, mapDispatchToProps)(MenuItemPage));