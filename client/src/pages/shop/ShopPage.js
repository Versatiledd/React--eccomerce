import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import "./shop.scss";

// components
import CollectionOverviev from "../../components/collection-overview/collection-overviev";
import Category from "../../components/categoryPage/category";
// import firestore

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase";

import { updateCollections } from "../../redux/shop/shop-actions";

class ShopPage extends React.Component {
  unSubsribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;

    const colectionRef = firestore.collection("collections");

    this.unSubsribeFromSnapshot = colectionRef.onSnapshot(async (snapshot) => {
      const collectionMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionMap);
    });
  }
  render() {
    const { match } = this.props;
    return (
      <div className="wrapper-shop">
        <div className="left-wrapper">
          <p className="filter-text">Filtry</p>
          <div className="producents">
            <p className="producent-text">Producenci</p>
            <div className="single-prod">
              <input type="checkbox" />
              <span>Dell</span>
            </div>
            <div className="single-prod">
              <input type="checkbox" />
              <span>Velcx</span>
            </div>
            <div className="single-prod">
              <input type="checkbox" />
              <span>Simpl</span>
            </div>
            <div className="single-prod">
              <input type="checkbox" />
              <span>Xdrive</span>
            </div>
            <div className="single-prod">
              <input type="checkbox" />
              <span>Yol</span>
            </div>
          </div>
          <div className="price">
            <p className="price-text">Cena</p>
            <div className="wrapper-price">
              <input type="number" className="price-input" placeholder="od" />
              <span className="minus">-</span>
              <input type="number" className="price-input" placeholder="do" />
            </div>
          </div>
        </div>
        <div className="right-wrapper">
          <Route exact path={`${match.path}`} component={CollectionOverviev} />
          <Route path={`${match.path}/:categoryID`} component={Category} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionMap) =>
    dispatch(updateCollections(collectionMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
