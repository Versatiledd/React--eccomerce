// import React from "react";
// import { Card, CardBody, Col, Badge, Table } from "reactstrap";
// import { connect } from "react-redux";
// // import { removeItem, addItem } from "../../redux/cart/cart.actions";
// import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

// import "./checkoutitem.styles.scss";

// const CheckOutItem = ({ item, addQuantity }) => {
//   const { title, price, description, shipping, color, images, count } = item;
//   console.log(count);

//   return (
//     <>
//       <tr>
//         <th>{title}</th>
//         <th
//           className="img-container"
//           style={{
//             minWidth: "100px",
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               width: "80px",
//               height: "80px",
//             }}
//           >
//             {images.length > 0 &&
//               images.map((img) => {
//                 if (img.url) {
//                   return (
//                     <img
//                       src={img.url}
//                       alt=""
//                       style={{
//                         height: "100%",
//                         width: "100%",
//                         margin: "0 10px",
//                       }}
//                     />
//                   );
//                 }
//               })}
//           </div>
//         </th>
//         <th>
//           <div
//             className="quantity"
//             style={{
//               margin: "0",
//               minWidth: "65px",
//             }}
//           >
//             <AiOutlineArrowUp
//               className="arrow"
//               style={{
//                 fontSize: "18px",
//                 color: "#28a745",
//                 cursor: "pointer",
//               }}
//               onClick={() => addQuantity(item)}
//             />
//             <span
//               style={{
//                 margin: "0 5px",
//               }}
//             >
//               {count}
//             </span>
//             <AiOutlineArrowDown
//               className="arrow"
//               style={{
//                 fontSize: "18px",
//                 color: "rgb(224 35 21)",
//                 cursor: "pointer",
//               }}
//               // onClick={() => removeItem(item)}
//             />
//           </div>
//         </th>
//         <th>Kolor</th>
//         <th
//           style={{
//             color: shipping === "Tak" ? "green" : "#e85422",
//           }}
//         >
//           {shipping}
//         </th>
//         <th>{description}</th>
//         <th>{price} zł</th>
//       </tr>
{
  /* <div className="checkout-products">
        <div className="wrapper">
          <div className="product-img">
            <img src={item.images[0].url} alt="" className="img" />
          </div>
          <p className="price">{item.title} </p>

          <p className="price">{item.price} zł</p>
          <p className="price">{item.color} </p>
          <div
            className="quantity"
            style={{
              margin: "0 0 16px",
            }}
          >
            <AiOutlineArrowUp className="arrow" onClick={() => addItem(item)} />

            <AiOutlineArrowDown
              className="arrow"
              style={{
                color: "rgb(224 35 21)",
              }}
              onClick={() => removeItem(item)}
            />
          </div>
        </div>
      </div> */
}
//     </>
//   );
// };

// const mapDispatchToProps = (dispatch) => ({
//   removeItem: (item) => dispatch(removeItem(item)),
//   addItem: (item) => dispatch(addItem(item)),
// });

// export default CheckOutItem;
