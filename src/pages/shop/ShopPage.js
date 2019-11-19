import React from "react";
import shopData from "./shopData";
import PrevComponents from "../../components/prev-components/prevComponents";

export default class ShopPage extends React.Component {
  constructor() {
    super();

    this.state = {
      collections: shopData
    };
  }

  render() {
    const { collections } = this.state;
    return (
      <>
        <div className="shop-page">
          {collections.map(({ id, ...otherCollectionsProps }) => (
            <PrevComponents key={id} {...otherCollectionsProps} />
          ))}
        </div>
      </>
    );
  }
}
