import React from "react";
import MenuItems from "../menu/menu-items";
import "../directory-menu/directory.scss";

class Directory extends React.Component {
  constructor() {
    super();

    this.state = {
      sections: [
        {
          title: "Płaszcze",
          imgUrl:
            "https://cdn.pixabay.com/photo/2015/11/07/11/46/fashion-1031469_960_720.jpg",
          id: 1,
          linkUrl: "płaszcze"
        },
        {
          title: "Czapki",
          imgUrl: "https://bi.im-g.pl/im/5d/42/14/z21244765Q,pompon02.jpg",
          id: 2,
          linkUrl: "czapki"
        },
        {
          title: "Buty",
          imgUrl:
            "https://cdn.pixabay.com/photo/2015/10/12/15/18/store-984393_960_720.jpg",
          id: 3,
          linkUrl: "buty"
        },
        {
          title: "Suknie ślubne",
          imgUrl:
            "https://cdn.pixabay.com/photo/2016/06/29/04/17/wedding-dresses-1485984_960_720.jpg",
          size: "large",
          id: 4,
          linkUrl: "suknie"
        },
        {
          title: "Jeansy",
          size: "large",
          imgUrl:
            "https://cdn.pixabay.com/photo/2014/08/26/21/48/jeans-428613_960_720.jpg",
          id: 5,
          linkUrl: "jeansy"
        }
      ]
    };
  }
  render() {
    return (
      <>
        <div className="directory-menu">
          {this.state.sections.map(({ id, ...otherProps }) => (
            <MenuItems key={id} {...otherProps} />
          ))}
        </div>
      </>
    );
  }
}

export default Directory;
