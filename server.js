function validateOrder(order) {
  if (
    !order.customer ||
    !order.items ||
    !Array.isArray(order.items) ||
    order.items.length === 0
  ) {
    return "Data pesanan tidak lengkap.";
  }

  const { name, address, phone, payment } = order.customer;

  if (!name || !address || !phone || !payment) {
    return "Data pelanggan tidak lengkap.";
  }

  const allowedPayments = ["Transfer Bank", "E-Wallet", "COD"];
  if (!allowedPayments.includes(payment)) {
    return "Metode pembayaran tidak valid.";
  }

  for (let item of order.items) {
    if (
      !item.id ||
      !item.name ||
      typeof item.price !== "number" ||
      typeof item.qty !== "number"
    ) {
      return "Data item tidak valid.";
    }
  }

  return null; // semua valid
}

function sanitizeString(str) {
  return String(str).replace(/[<>]/g, "").trim();
}
app.post("/order", (req, res) => {
  const orderData = req.body;

  // Validasi
  const error = validateOrder(orderData);
  if (error) {
    return res.status(400).json({ status: "error", message: error });
  }

  // Sanitasi input
  orderData.customer.name = sanitizeString(orderData.customer.name);
  orderData.customer.address = sanitizeString(orderData.customer.address);
  orderData.customer.phone = sanitizeString(orderData.customer.phone);
  orderData.customer.payment = sanitizeString(orderData.customer.payment);

  // Simpan ke file
  const ordersFile = path.join(__dirname, "orders.json");
  let existingOrders = [];

  if (fs.existsSync(ordersFile)) {
    const raw = fs.readFileSync(ordersFile);
    existingOrders = JSON.parse(raw);
  }

  existingOrders.push(orderData);
  fs.writeFileSync(ordersFile, JSON.stringify(existingOrders, null, 2));

  console.log("✅ Pesanan valid & disimpan:", orderData.customer.name);
  res.json({ status: "success", message: "Pesanan berhasil disimpan." });
});
