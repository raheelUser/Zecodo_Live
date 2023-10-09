import React, { useState } from 'react';
import {BASE_API} from "../../services/Constant"
const afterSales = (price, salePrice) => {
    return (
		<> 
        <span className="saleprice">
        $ {price}
        <del>$ {salePrice}</del>
        </span>

        </>

  );
};

export default afterSales;