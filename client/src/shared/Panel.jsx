/* eslint-disable react/prop-types */
import React, { PureComponent } from "react";
import { Badge, Card, CardBody, Col, Collapse } from "reactstrap";
import PropTypes from "prop-types";

import MinusIcon from "mdi-react/MinusIcon";

export default class AlertComponent extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    label: PropTypes.string,
    icon: PropTypes.string,
    md: PropTypes.number,
    lg: PropTypes.number,
    xl: PropTypes.number,
    sm: PropTypes.number,
    xs: PropTypes.number,
    before: PropTypes.element,
  };

  static defaultProps = {
    title: "",
    label: "",
    icon: "",
    md: 0,
    lg: 0,
    xl: 0,
    sm: 0,
    xs: 0,
    before: null,
  };

  constructor() {
    super();

    this.state = {
      visible: true,
      collapse: true,
    };
  }

  onShow = () => {
    this.setState({ visible: true });
  };

  onDismiss = () => {
    this.setState({ visible: false });
  };

  onCollapse = () => {
    this.setState((prevState) => ({ collapse: !prevState.collapse }));
  };

  render() {
    const { md, lg, xl, sm, xs, title, label, before, children } = this.props;

    const { collapse, visible } = this.state;

    if (visible) {
      return (
        <Col
          md={md}
          lg={lg}
          xl={xl}
          sm={sm}
          xs={xs}
          style={{
            marginBottom: "30px",
          }}
        >
          <Card>
            <CardBody className="panel__body">
              <div className="panel__wrapper">
                <div className="panel__title">
                  <h5 className="bold-text">
                    {title}
                    <Badge className="panel__label">{label}</Badge>
                  </h5>
                </div>
                <div className="panel__btns">
                  <button
                    className="panel__btn"
                    type="button"
                    onClick={this.onCollapse}
                  >
                    <MinusIcon />
                  </button>
                </div>
              </div>
              <Collapse isOpen={collapse}>
                <div className="panel__content">{children}</div>
              </Collapse>
            </CardBody>
          </Card>
          {before}
        </Col>
      );
    }

    return "";
  }
}

export const PanelTitle = ({ title }) => (
  <div className="panel__title">
    <h5 className="bold-text">{title}</h5>
  </div>
);
