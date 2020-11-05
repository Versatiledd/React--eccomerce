import React from "react";
import { Badge, Table } from "reactstrap";
import Panel from "../../../shared/Panel";
import "../../../scss/admin/recentorders.scss";

const RecentOrders = () => {
  return (
    <>
      <Panel lg={12} title="Ostatnie zamówienia">
        <Table
          responsive
          className="table--bordered"
          style={{
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th className="name-tr">#</th>
              <th className="name-tr">Invoice</th>
              <th className="name-tr">Customer Name</th>
              <th className="name-tr">Product</th>
              <th className="name-tr">Quantity</th>
              <th className="name-tr">Date</th>
              <th className="name-tr">Location</th>
              <th className="name-tr">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>In-123356</td>
              <td>Lok Morisson</td>
              <td>Xiaomi Mi 6</td>
              <td>1</td>
              <td>2017/12/25</td>
              <td>Melbourne</td>
              <td>
                <Badge className="bd-progress">In Progress</Badge>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>In-254875</td>
              <td>Norman Brown</td>
              <td>Apple iPhone 6 Plus</td>
              <td>1</td>
              <td>2017/12/13</td>
              <td>Tokio</td>
              <td>
                <Badge className="bd-completed">Completed</Badge>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>In-877868</td>
              <td>Sam Medinberg</td>
              <td>Xiaomi Mi 6</td>
              <td>1</td>
              <td>2017/12/13</td>
              <td>Moscow</td>
              <td>
                <Badge className="bd-progress">In Progress</Badge>
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>In-619876</td>
              <td>Dave Morisson</td>
              <td>Apple iPhone 5 S</td>
              <td>1</td>
              <td>2017/12/07</td>
              <td>Melbourne</td>
              <td>
                <Badge className="bd-completed">Completed</Badge>
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td>In-218778</td>
              <td>Klara Brown</td>
              <td>Apple iPhone 6 Plus</td>
              <td>1</td>
              <td>2017/12/05</td>
              <td>London</td>
              <td>
                <Badge className="bd-completed">Completed</Badge>
              </td>
            </tr>
            <tr>
              <td>6</td>
              <td>In-626268</td>
              <td>Molly Medinberg</td>
              <td>Apple iPhone 7 Plus</td>
              <td>1</td>
              <td>2017/12/01</td>
              <td>Rome</td>
              <td>
                <Badge className="bd-completed">Completed</Badge>
              </td>
            </tr>
          </tbody>
        </Table>
      </Panel>
    </>
  );
};

export default RecentOrders;
