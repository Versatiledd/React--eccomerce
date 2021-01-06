import React, { useState, useEffect } from "react";
import { Badge, Table } from "reactstrap";
import Panel from "../../../shared/Panel";
import { getUserProducts } from "../../../functions/User";
import { updateOrder } from "../../../functions/admin";
import { useSelector } from "react-redux";
import "../../../scss/admin/recentorders.scss";

const RecentOrders = () => {
  const [cartUser, setProducts] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  console.log(cartUser);

  const loadData = () => {
    getUserProducts(currentUser.token).then((res) => {
      setProducts(res.data);
    });
  };

  const changeStatusOrder = (orderId, orderStatus) => {
    updateOrder(orderId, orderStatus, currentUser.token).then((res) => {
      console.log(res.data);
      loadData();
    });
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <>
      {cartUser.length === 0 ? (
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
        <Panel lg={12} title="Ostatnie zamówienia klientów">
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
                <th className="name-tr">Kolor</th>
                <th className="name-tr">Ilość</th>
                <th className="name-tr">Cena</th>
                <th className="name-tr">Imię zamawiającego</th>
                <th className="name-tr">Adres wysyłki</th>
                <th className="name-tr">Status</th>
              </tr>
            </thead>
            <tbody>
              {cartUser.products.map((el, i) => {
                return (
                  <>
                    <tr key={el._id}>
                      <td>{i}</td>
                      <td>PDF</td>
                      <td>{el.color}</td>
                      <td>{el.count}</td>
                      <td>{el.price}</td>
                      <td>{el.address.name}</td>
                      <td>
                        {el.address.address_city}, {el.address.address_line1}
                      </td>
                      <td>
                        <select
                          onChange={(e) =>
                            changeStatusOrder(el._id, e.target.value)
                          }
                          defaultValue={el.orderStatus}
                        >
                          <option value="Przyjęcie zamówienia">
                            Przyjęcie zamówienia
                          </option>
                          <option value="Wysyłanie produktu">
                            Wysyłanie produktu
                          </option>
                          <option value="Cofnięcie zamówienia">
                            Cofnięcie zamówienia
                          </option>
                          <option value="Odebranie zamówienia">
                            Odebranie zamówienia
                          </option>
                        </select>
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
