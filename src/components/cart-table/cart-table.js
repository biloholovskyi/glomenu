import React, {Component} from 'react';
import './cart-table.scss';
import {connect} from "react-redux";
import {deleteFromCart, clearItems} from "../../actions"

class CartTable extends Component {

  buy = async () => {
    const {items, clearItems} = this.props;
    await fetch('http://localhost:3000/orders', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({orderList: items})
    })
      .then(res => {
        res.json();
        clearItems();
      });
  }

  render() {
    const {items, deleteFromCart} = this.props;
    return (
      <>
        <div className="cart__title">Ваш заказ:</div>
        <div className="cart__list">
          {
            items.map(item => {
              const {title, url, id, price, count} = item;
              return (
                <div key={id} className="cart__item">
                  <img
                    src={url}
                    className="cart__item-img" alt={title}></img>
                  <div className="cart__item-title">{title}{count > 1 ? ` x ${count}` : ""}</div>
                  <div className="cart__item-price">{price}$</div>
                  <div onClick={() => deleteFromCart(id)} className="cart__close">&times;</div>
                </div>
              )
            })
          }
        </div>
        {
          items.length > 0 ? <button onClick={this.buy} className="menu__btn buy__btn">BUY</button> : null
        }
      </>
    );
  }
};

const mapStateToProps = ({items}) => {
  return {
    items
  }
};

const mapDispatchToProps = {
  deleteFromCart,
  clearItems
};

export default connect(mapStateToProps, mapDispatchToProps)(CartTable);