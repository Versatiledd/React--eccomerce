// import React from "react";
// import Button from "../buttons/Buttons";
// import "./collectionItems.styles.scss";
// import { connect } from "react-redux";
// import { addItem } from "../../redux/cart/cart.actions";
// const CollectionItem = ({ item, addItem }) => {
//   const { name, price, imageUrl } = item;
//   return (
//     <>
//       <div className="collection-item">
//         <div
//           className="image"
//           style={{ backgroundImage: `url(${imageUrl})` }}
//         ></div>
//         <div className="collection-footer">
//           <span className="name">{name}</span>
//           <span className="name">{price}</span>
//         </div>
//         <Button onClick={() => addItem(item)}>Dodaj do karty</Button>
//       </div>
//     </>
//   );
// };

// const mapDispatchToProps = dispatch => ({
//   addItem: item => dispatch(addItem(item))
// });

// export default connect(null, mapDispatchToProps)(CollectionItem);
