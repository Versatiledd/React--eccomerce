/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from "react";
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";

import Panel from "../../../shared/Panel";
import "../../../scss/admin/topseling.scss";

const data01 = [
  { name: "Komputery", value: 12934, fill: "#4ce1b6" },
  { name: "Telefony", value: 9934, fill: "#70bbfd" },
  { name: "Akcesoria", value: 20432, fill: "#f6da6e" },
  { name: "Elektornika", value: 15432, fill: "#ff4861" },
];

const style = (dir) => {
  const left = dir === "ltr" ? { left: 0 } : { right: 0 };
  return {
    ...left,
    width: "160px",
    lineHeight: "24px",
    position: "absolute",
    verticalAlign: "center",
  };
};

const renderLegend = ({ payload }) => (
  <ul className="dashboard__chart-legend">
    {payload.map((entry, index) => (
      <>
        <div className="parent-legend" key={`item-${index}`}>
          <div
            style={{
              backgroundColor: entry.color,
              width: "15px",
              height: "15px",
              borderRadius: "50%",
              margin: "2px 0",
              marginRight: "10px",
            }}
          ></div>
          <p className="title-legend">{entry.value}</p>
        </div>
      </>
    ))}
  </ul>
);

class TopSellingProducts extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
    };
  }

  onMouseMove = (e) => {
    const { dir } = this.props;
    console.log(dir);
    if (e.tooltipPosition) {
      this.setState({
        x: dir === "ltr" ? e.tooltipPosition.x : e.tooltipPosition.x / 10,
        y: e.tooltipPosition.y,
      });
    }
  };

  render() {
    const { dir } = this.props;
    const { x, y } = this.state;

    return (
      <Panel
        lg={12}
        xl={12}
        md={12}
        xs={12}
        title={"Najwięcej sprzedanych produktów"}
      >
        <div dir={dir}>
          <ResponsiveContainer
            className="dashboard__chart-pie dashboard__chart-pie--commerce"
            height={360}
          >
            <PieChart className="dashboard__chart-pie-container">
              <Tooltip position={{ x, y }} />
              <Pie
                data={data01}
                dataKey="value"
                cy={180}
                innerRadius={130}
                outerRadius={160}
                label
                onMouseMove={this.onMouseMove}
              />
              <Legend
                layout="vertical"
                verticalAlign="bottom"
                wrapperStyle={style(dir)}
                content={renderLegend}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Panel>
    );
  }
}

export default TopSellingProducts;
