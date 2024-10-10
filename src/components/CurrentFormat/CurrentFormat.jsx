import React from "react";
import numeral from "numeral"

const CurrencyFormat =({amount}) =>{
 const formattedCurrency = numeral(amount).format("$0,0.00")
return <div>{formattedCurrency}</div>

}
export default CurrencyFormat