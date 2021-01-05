import axios from "axios";

export const updateOrder = async (orderId, orderStatus, authtoken) =>
  await axios.put(
    `${process.env.API_URL}/admin/order-status`,
    { orderId, orderStatus },
    {
      headers: { "Access-Control-Allow-Origin": true, authtoken },
    }
  );
