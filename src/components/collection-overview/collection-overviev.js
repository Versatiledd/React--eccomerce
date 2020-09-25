import React from "react";
import { connect } from "react-redux";

import PrevCollection from "../prevCollection/prevCollection";

export const CollectionOverviev = ({ collections }) => {
  return (
    <>
      {collections.map(({ id, ...otherProps }) => {
        return <PrevCollection key={id} {...otherProps} />;
      })}
    </>
  );
};

const mapStateToProps = ({ shop: { collections } }) => ({
  collections,
});

export default connect(mapStateToProps)(CollectionOverviev);
