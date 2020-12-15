import axios from "axios";

export const updateOrder = async (orderId, orderStatus, authtoken) =>
  await axios.put(
    `https://shop-md.herokuapp.com/api/admin/order-status`,
    { orderId, orderStatus },
    {
      headers: { "Access-Control-Allow-Origin": true, authtoken },
    }
  );
