const moongose = require("mongoose");
const { ObjectId } = moongose.Schema;

const cartSchema = new moongose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        count: Number,
        color: String,
        price: Number,
        address: Object,
        orderStatus: {
          type: String,
          default: "Przyjęcie zamówienia",
          enum: [
            "Przyjęcie zamówienia",
            "Wysyłanie produktu",
            "Cofnięcie zamówienia",
            "Odebranie zamówienia",
          ],
        },
      },
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,
    orderedBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = moongose.model("Cart", cartSchema);
