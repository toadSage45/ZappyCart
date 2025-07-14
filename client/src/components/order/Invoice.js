import React from "react";
import { Document, Page, Text, StyleSheet, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 12,
        fontFamily: "Helvetica",
        lineHeight: 1.6,
        color: "#333",
        backgroundColor: "#fdfdfd",
    },
    header: {
        fontSize: 10,
        textAlign: "center",
        color: "grey",
        marginBottom: 20,
    },
    title: {
        fontSize: 26,
        textAlign: "center",
        marginBottom: 4,
        color: "#2a2a72",
        fontWeight: "bold",
    },
    subheading: {
        fontSize: 13,
        textAlign: "center",
        marginBottom: 30,
        color: "#555",
    },
    sectionTitle: {
        fontSize: 16,
        marginBottom: 10,
        marginTop: 10,
        textDecoration: "underline",
        color: "#1a1a1a",
        fontWeight: "bold",
    },
    table: {
        display: "table",
        width: "auto",
        marginBottom: 20,
    },
    tableRowHeader: {
        flexDirection: "row",
        backgroundColor: "#f0f4ff",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        padding: 5,
    },
    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 0.5,
        borderBottomColor: "#eee",
        padding: 5,
    },
    tableColHeader: {
        width: "20%",
        fontWeight: "bold",
    },
    tableCol: {
        width: "20%",
    },
    infoBox: {
        marginTop: 20,
        padding: 14,
        border: "1pt solid #e1e1e1",
        borderRadius: 6,
        backgroundColor: "#fafafa",
    },
    infoLine: {
        marginBottom: 6,
    },
    label: {
        fontWeight: "bold",
        color: "#444",
    },
    footer: {
        paddingTop: 50,
        fontSize: 12,
        textAlign: "center",
        color: "#888",
    },
});

const Invoice = ({ order }) => (
    <Document>
        <Page style={styles.page}>
            <Text style={styles.header}>
                Invoice generated on {new Date().toLocaleString()}
            </Text>
            <Text style={styles.title}>Order Invoice</Text>
            <Text style={styles.subheading}>ZappyCart - India’s Trusted Shopping Hub</Text>

            <Text style={styles.sectionTitle}>Order Summary</Text>

            <View style={styles.table}>
                <View style={styles.tableRowHeader}>
                    <Text style={styles.tableColHeader}>Title</Text>
                    <Text style={styles.tableColHeader}>Price</Text>
                    <Text style={styles.tableColHeader}>Qty</Text>
                    <Text style={styles.tableColHeader}>Brand</Text>
                    <Text style={styles.tableColHeader}>Color</Text>
                </View>

                {order.products.map((item, index) => (
                    <View style={styles.tableRow} key={index}>
                        <Text style={styles.tableCol}>{item.product.title}</Text>
                        <Text style={styles.tableCol}>INR:{item.product.price}</Text>
                        <Text style={styles.tableCol}>{item.count}</Text>
                        <Text style={styles.tableCol}>{item.product.brand}</Text>
                        <Text style={styles.tableCol}>{item.product.color}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.infoBox}>
                <Text style={styles.infoLine}>
                    <Text style={styles.label}>Date:</Text>{" "}
                    {new Date(order.paymentIntent.created * 1000).toLocaleString()}
                </Text>
                <Text style={styles.infoLine}>
                    <Text style={styles.label}>Order ID:</Text> {order.paymentIntent.id}
                </Text>
                <Text style={styles.infoLine}>
                    <Text style={styles.label}>Order Status:</Text> {order.orderStatus}
                </Text>
                <Text style={styles.infoLine}>
                    <Text style={styles.label}>Total Paid:</Text>{" "}
                    INR:{(order.paymentIntent.amount / 100).toLocaleString("en-IN")}
                </Text>
                <Text style={styles.infoLine}>
                    <Text style={styles.label}>Payment Method:</Text>{" "}
                    {order.paymentIntent.payment_method_types?.[0]}
                </Text>
            </View>

            <Text style={styles.footer}>~ Thank you for shopping with ZappyCart ~</Text>
        </Page>
    </Document>
);

export default Invoice;
