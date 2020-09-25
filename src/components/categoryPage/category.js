import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import SingleProduct from "../singleProduct/singleProduct";

const MAP_CATEGORY_ID = {
  szafy: "5pEcTyiMYO6PRNw0DFz0",
  biurka: "LYiUUJbc4u4U7yE2C9Kn",
  fotele: "QffoinKRmlelKWmmfgTF",
  komody: "TRIs0QOI8dg8mjCCurZT",
  meble: "X2YfUvBftDwX8CS1Jg2f",
};

const Category = ({ match, collections }) => {
  const items = _.get(collections, "items");
  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          width: "1000px",
        }}
      >
        {_.map(items, (item) => {
          return <SingleProduct key={item.id} item={item} />;
        })}
      </div>
    </>
  );
};

const mapStateToProps = ({ shop: { collections } }, ownProps) => ({
  collections: collections
    ? collections.find(
        (collection) =>
          collection.id === MAP_CATEGORY_ID[ownProps.match.params.categoryID]
      )
    : [],
});
export default connect(mapStateToProps)(Category);
