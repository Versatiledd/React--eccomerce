import React, { useEffect, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Badge, Table } from "reactstrap";
import Panel from "../../shared/Panel";
import { getUserProducts } from "../../functions/User";
import { useSelector } from "react-redux";
import _, { add } from "lodash";
import Invoice from "../../components/invoice/Invoice";

const RecentOrders = () => {
  const [cartUser, setProducts] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  console.log(cartUser);

  const loadData = () => {
    getUserProducts(currentUser.token)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const showDownloadLink = (products) => (
    <PDFDownloadLink document={<Invoice products={products} />}>
      Pobierz PDF
    </PDFDownloadLink>
  );

  return (
    <>
      {cartUser == null ? (
        <p
          style={{
            fontWeight: 600,
            fontSize: "22px",
            margin: "10px",
            textAlign: "center",
          }}
        >
          Brak zamówienia.
        </p>
      ) : (
        <Panel lg={12} title="Twoje zamówienia">
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
                <th className="name-tr">PDF</th>
                <th className="name-tr">Nazwa produktu</th>
                <th className="name-tr">Kolor</th>
                <th className="name-tr">Ilość</th>
                <th className="name-tr">Cena</th>
                <th className="name-tr">Status</th>
              </tr>
            </thead>
            <tbody>
              {cartUser.products.map((el, i) => {
                return (
                  <>
                    <tr key={el._id}>
                      <td>{i}</td>
                      <td>{showDownloadLink(cartUser.products)}</td>
                      <td>{el.product.title}</td>
                      <td>{el.color}</td>
                      <td>{el.count}</td>
                      <td>{el.price}</td>
                      <td>
                        <Badge className="bd-progress">{el.orderStatus}</Badge>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </Table>
        </Panel>
      )}
    </>
  );
};

export default RecentOrders;
