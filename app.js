// Data keranjang disimpan dalam array
let keranjang = [];

// Ambil semua tombol "Tambah ke Keranjang"
const tombolTambah = document.querySelectorAll(".menu-item button");

// Event listener untuk setiap tombol
tombolTambah.forEach((tombol, index) => {
  tombol.addEventListener("click", () => {
    const item = tombol.closest(".menu-item");
    const nama = item.querySelector("h3").innerText;
    const hargaText = item.querySelector("p").innerText;
    const harga = parseInt(hargaText.replace("Rp", "").replace(".", ""));

    // Tambahkan ke array keranjang
    keranjang.push({ nama, harga });

    // Update tampilan keranjang
    renderKeranjang();
  });
});

// Fungsi untuk menampilkan isi keranjang
function renderKeranjang() {
  const listKeranjang = document.querySelector(".cart-items");
  const totalEl = document.getElementById("total");

  // Kosongkan isi sebelumnya
  listKeranjang.innerHTML = "";

  let total = 0;

  keranjang.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nama} - Rp${item.harga.toLocaleString("id-ID")}
      <button onclick="hapusItem(${index})" style="margin-left: 10px; color: red;">Hapus</button>
    `;
    listKeranjang.appendChild(li);
    total += item.harga;
  });

  // Tampilkan total
  totalEl.innerText = "Rp" + total.toLocaleString("id-ID");
}

// Fungsi untuk hapus item dari keranjang
function hapusItem(index) {
  keranjang.splice(index, 1);
  renderKeranjang();
}
function updateCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} x${item.qty} - Rp ${(
      item.price * item.qty
    ).toLocaleString()}`;
    cartItemsContainer.appendChild(li);
    total += item.price * item.qty;
  });

  cartTotal.textContent = "Rp " + total.toLocaleString();

  // Simpan perubahan ke localStorage
  saveCart();
}
// Jalankan saat halaman dimuat
renderMenu();
loadCart();
document.querySelector(".checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Keranjang masih kosong!");
  } else {
    alert("Terima kasih telah memesan! (Simulasi)");

    cart = [];
    updateCart();
    localStorage.removeItem("cart"); // Hapus dari localStorage
  }
});
