// Simpan cart ke localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Ambil cart dari localStorage
function loadCart() {
  // Tangani submit form
  document
    .getElementById("order-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      if (cart.length === 0) {
        alert("Keranjang belanja masih kosong!");
        return;
      }

      const name = document.getElementById("name").value.trim();
      const address = document.getElementById("address").value.trim();
      const phone = document.getElementById("phone").value.trim();

      if (!name || !address || !phone) {
        alert("Harap lengkapi semua data pengiriman.");
        return;
      }

      // Simulasi proses kirim
      alert(`Terima kasih ${name}, pesanan kamu sedang diproses!`);

      // Reset data
      cart = [];
      updateCart();
      localStorage.removeItem("cart");
      document.getElementById("order-form").reset();
    });

  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cart = JSON.parse(storedCart);
    updateCart();
  }
}
const formFields = ["name", "address", "phone"];

// Simpan form ke localStorage saat diketik
formFields.forEach((field) => {
  const formFields = ["name", "address", "phone", "payment"];
  const payment = document.getElementById("payment").value;
  if (!name || !address || !phone || !payment) {
    alert("Harap lengkapi semua data pengiriman dan pembayaran.");
    return;
    alert(
      `Terima kasih ${name}, pesanan kamu dengan metode "${payment}" sedang diproses!`
    );
  }
  formFields.forEach((field) => localStorage.removeItem(`checkout_${field}`));
  const input = document.getElementById(field);
  input.addEventListener("input", () => {
    localStorage.setItem(`checkout_${field}`, input.value);
  });
});
function restoreForm() {
  formFields.forEach((field) => {
    const saved = localStorage.getItem(`checkout_${field}`);
    if (saved) {
      document.getElementById(field).value = saved;
    }
  });
}
function simulateSendToServer(data) {
  console.log("=== DATA PESANAN ===");
  console.log(JSON.stringify(data, null, 2));

  // Simulasi delay "server processing"
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: "success",
        message: "Pesanan berhasil disimpan di server (simulasi).",
      });
    }, 1000);
  });
}
document
  .getElementById("order-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Keranjang belanja masih kosong!");
      return;
    }

    const name = document.getElementById("name").value.trim();
    const address = document.getElementById("address").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const payment = document.getElementById("payment").value;

    if (!name || !address || !phone || !payment) {
      alert("Harap lengkapi semua data pengiriman dan pembayaran.");
      return;
    }

    // Hitung total
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    // Buat data pesanan lengkap
    const orderData = {
      customer: { name, address, phone, payment },
      items: cart,
      total: total,
      timestamp: new Date().toISOString(),
    };

    // Simulasi kirim ke server
    const response = await simulateSendToServer(orderData);

    if (response.status === "success") {
      alert(`Terima kasih ${name}, pesanan kamu sedang diproses!`);

      // Reset data
      cart = [];
      updateCart();
      localStorage.removeItem("cart");
      document.getElementById("order-form").reset();
      formFields.forEach((field) =>
        localStorage.removeItem(`checkout_${field}`)
      );
    } else {
      alert("Gagal mengirim pesanan. Silakan coba lagi.");
    }
  });
function generateWhatsAppMessage(order) {
  const { name, address, phone, payment } = order.customer;
  const itemsText = order.items
    .map((item) => `- ${item.name} x${item.qty} = Rp ${item.price * item.qty}`)
    .join("\n");

  return `
🛒 *Pesanan Baru*  
Nama: ${name}  
Alamat: ${address}  
No. HP: ${phone}  
Metode: ${payment}  
  
📦 *Daftar Pesanan:*  
${itemsText}  
  
💰 Total: Rp ${order.total.toLocaleString()}  
`.trim();
}
// Buat pesan WhatsApp
const waMessage = generateWhatsAppMessage(orderData);
const adminPhone = "6281234567890"; // ganti dengan nomor WhatsApp admin
const waURL = `https://wa.me/${adminPhone}?text=${encodeURIComponent(
  waMessage
)}`;

setTimeout(() => {
  window.open(waURL, "_blank");
}, 500);

renderMenu();
loadCart();
restoreForm();
