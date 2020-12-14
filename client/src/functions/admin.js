import axios from "axios";

export const updateOrder = async (orderId, orderStatus, authtoken) =>
  await axios.put(
    `http://localhost:5000/api/admin/order-status`,
    { orderId, orderStatus },
    {
      headers: { "Access-Control-Allow-Origin": true, authtoken },
    }
  );
