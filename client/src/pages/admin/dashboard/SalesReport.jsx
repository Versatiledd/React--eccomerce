import React from "react";
import { Progress } from "reactstrap";
import Panel from "../../../shared//Panel";
import "../../../scss/admin/salesreports.scss";

const SalesReport = ({ t }) => (
  <Panel md={12} lg={12} xl={12} sm={12} xs={12} title={"Raport sprzedaży"}>
    <div className="dashboard__sales-report">
      <div className="progress-wrap progress-wrap--small">
        <p className="dashboard__sales-report-title">Today</p>
        <p className="dashboard__sales-report-now">$ 298,92</p>
        <p className="dashboard__sales-report-plan">$ 250 planned</p>
        <p className="dashboard__sales-report-value progress__label">100%</p>
        <Progress value={100} />
      </div>
      <div className="progress-wrap progress-wrap--small progress-wrap--pink">
        <p className="dashboard__sales-report-title">This week</p>
        <p className="dashboard__sales-report-now">$ 1423,01</p>
        <p className="dashboard__sales-report-plan">$ 1500 planned</p>
        <p className="dashboard__sales-report-value progress__label">98%</p>
        <Progress value={98} />
      </div>
      <div className="progress-wrap progress-wrap--small progress-wrap--pink">
        <p className="dashboard__sales-report-title">This month</p>
        <p className="dashboard__sales-report-now">$ 44321,74</p>
        <p className="dashboard__sales-report-plan">$ 45000 planned</p>
        <p className="dashboard__sales-report-value progress__label">100%</p>
        <Progress value={87} />
      </div>
    </div>
  </Panel>
);

export default SalesReport;
