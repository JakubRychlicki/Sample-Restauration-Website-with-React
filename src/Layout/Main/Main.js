import React from "react";

import Categories from "../../components/Categories/Categories";
import MenuList from "../../components/MenuList/MenuList";
import OrderBasket from "../../components/OrderBasket/OrderBasket";

const Main = (props) => (
  <>
    <Categories />
    <MenuList />
    <OrderBasket {...props} />
  </>
);

export default Main;
