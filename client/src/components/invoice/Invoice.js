import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";

const Invoice = ({ products }) => {
  console.log(products);
  return (
    <>
      <Document>
        <Page style={styles.body}>
          <Text style={styles.header} fixed>
            ~ {new Date().toLocaleString()} ~
          </Text>
          <Text style={styles.author}>Witaj w Deco Home!</Text>
          <Text style={styles.title}>Twoje zamówienie.</Text>

          <Table>
            <TableHeader>
              <TableCell style={styles.tableCell}>Nazwa produktu</TableCell>
              <TableCell style={styles.tableCell}>Kolor</TableCell>
              <TableCell style={styles.tableCell}>Ilosc</TableCell>
              <TableCell style={styles.tableCell}>Cena</TableCell>
            </TableHeader>
          </Table>

          <Table data={products}>
            <TableBody>
              <DataTableCell
                getContent={(x) => x.title}
                style={styles.tableCell}
              />
              <DataTableCell
                getContent={(x) => x.color}
                style={styles.tableCell}
              />
              <DataTableCell
                getContent={(x) => x.count}
                style={styles.tableCell}
              />
              <DataTableCell
                getContent={(x) => `${x.price} zl`}
                style={styles.tableCell}
              />
            </TableBody>
          </Table>

          <Text style={styles.buyer}>Adres wysylki : </Text>
          <Table>
            <TableHeader>
              <TableCell style={styles.tableCell}>Dane osobowe</TableCell>
              <TableCell style={styles.tableCell}>Miasto</TableCell>
              <TableCell style={styles.tableCell}>Ulica</TableCell>
              <TableCell style={styles.tableCell}>Województwo</TableCell>
            </TableHeader>
          </Table>

          <Table data={products}>
            <TableBody>
              <DataTableCell
                getContent={(x) => x.address.name}
                style={styles.tableCell}
              />
              <DataTableCell
                getContent={(x) => x.address.address_city}
                style={styles.tableCell}
              />

              <DataTableCell
                getContent={(x) => x.address.address_line1}
                style={styles.tableCell}
              />
              <DataTableCell
                getContent={(x) => `${x.address.address_state}`}
                style={styles.tableCell}
              />
            </TableBody>
          </Table>
        </Page>
      </Document>
    </>
  );
};

export default Invoice;

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    margin: "30px 0",
  },
  author: {
    fontSize: 20,
    textAlign: "center",
    color: "green",
  },
  tableCell: {
    height: "40px",
    alignItems: "center",
  },
  buyer: {
    display: "block",
    fontWeight: "600",
    margin: "40px 0",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  footer: {
    padding: "100px",
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});
