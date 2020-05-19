import React from "react";

import classes from "./Categories.module.css";

const Categories = () => {
  return (
    <div className={classes.Container}>
      <div className={classes.CategoryBox}>
        <div className={classes.TitleBox}>
          <h2 className={classes.Title}>Produkty</h2>
        </div>
        <div className={classes.ListCategories}>
          <div className={classes.Category}>Pizza</div>
          <div className={classes.Category}>Makaron</div>
          <div className={classes.Category}>Burgery</div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
