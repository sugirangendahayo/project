import db from "../configs/db.config.js";

const placeOrder = async (req, res) => {
  const { user_id, cartItems, totalAmount } = req.body;

  if (!user_id || !cartItems || cartItems.length === 0) {
    return res.status(400).json({ error: "Invalid order data" });
  }

  try {
    // Insert order into `orders` table
    const orderQuery =
      "INSERT INTO orders (user_id, total_amount) VALUES (?, ?)";

    db.query(orderQuery, [user_id, totalAmount], (orderErr, orderResult) => {
      if (orderErr) {
        return res.status(500).json({ error: "Failed to create order" });
      }

      const orderId = orderResult.insertId; // Get the last inserted order ID

      // Insert items into `order_items` table
      const orderItemsQuery =
        "INSERT INTO order_items (order_id, book_id, quantity, price) VALUES ? ";

      const orderItemsData = cartItems.map((item) => [
        orderId,
        item.id,
        item.quantity,
        item.price,
      ]);

      db.query(orderItemsQuery, [orderItemsData], (itemsErr) => {
        if (itemsErr) {
          return res.status(500).json({ error: "Failed to add order items" });
        }

        res.status(201).json({ message: "Order placed successfully", orderId });
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
const getAllOrders = async (req, res) => {
  try {
    const query = `
      SELECT orders.id, orders.user_id, orders.total_amount, orders.order_date, 
             users.name AS user_name, users.email 
      FROM orders 
      JOIN users ON orders.user_id = users.id
      ORDER BY orders.order_date DESC
    `;

    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching orders:", err);
        return res.status(500).json({ message: "Failed to fetch orders" });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { placeOrder, getAllOrders };
