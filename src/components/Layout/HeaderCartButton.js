import { useContext, useEffect, useState } from "react";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext); // Now by using use context here,
  // the header cart button component will be a re evaluated by react whenever the context changes.
  // And it of course changes when we do update it in the cart provider a component.

  const { items } = cartCtx;
  const numberOfCartItems = items.reduce((curNumber, item) => { //current number
    return curNumber + item.amount;
  }, 0);
  // first argument wich will be called for you , second one is a starting value ( 0 )
  // first arguemtn receives two arguments auto by JS which is calling that function
  // for every item in that array on what you are calling reduce.

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}> 
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
