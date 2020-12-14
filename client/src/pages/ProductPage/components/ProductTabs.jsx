import React, { PureComponent } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";

export default class ProductTabs extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1",
    };
    console.log(props);
  }

  toggle = (tab) => {
    const { activeTab } = this.state;
    if (activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };

  render() {
    const { activeTab } = this.state;

    return (
      <div className="tabs">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Opis produktu
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab} className="typography-message">
          <TabPane tabId="1">
            <p>{this.props.product.description}</p>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
