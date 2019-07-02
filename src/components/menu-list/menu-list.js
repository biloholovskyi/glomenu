import React, {Component} from 'react';
import MenuListItem from '../menu-list-item';
import {connect} from "react-redux";
import WhithRestoService from '../hoc';
import {menuLoaded, menuRequested, menuError, addedToCart} from "../../actions";
import Spinner from '../spinner';
import Error from '../error';

import './menu-list.scss';

class MenuList extends Component {

  render() {
    const {menuItems, addedToCart} = this.props;
    return (
      <ul className="menu__list">
        {
          menuItems.length !== undefined ? menuItems.map(menuItem => {
            return <MenuListItem
              key={menuItem.id}
              menuItem={menuItem}
              onAddToCart={() => addedToCart(menuItem.id)}/>
          }) : null
        }
      </ul>
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

const WhithData = (View) => {
  return class extends Component {
    componentDidMount() {
      this.props.menuRequested();
      const {RestoService} = this.props;
      RestoService.getMenuItems()
        .then(res => {
          this.props.menuLoaded(res);
        })
        .catch(err => {
          this.props.menuError(err);
        });
    }

    render() {
      const {loading, error} = this.props;
      if (loading) {
        return <Spinner/>
      }
      if (error) {
        return <Error/>
      }
      return <View {...this.props}/>
    }
  }
}


export default WhithRestoService()(connect(mapStateToProps, mapDispatchToProps)(WhithData(MenuList)));