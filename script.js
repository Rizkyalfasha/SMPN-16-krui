function showPage(id) {
  // sembunyikan semua halaman
  document.querySelectorAll(".page").forEach(sec => {
    sec.classList.add("hidden");
    sec.classList.remove("fade-in");
  });

  // tampilkan halaman aktif dengan animasi
  const aktif = document.getElementById(id);
  aktif.classList.remove("hidden");
  aktif.classList.add("fade-in");
}

// Efek mengetik judul
document.addEventListener("DOMContentLoaded", function() {
  const teks = "SMPN-16 Krui";
  let i = 0;
  const speed = 150;
  const judul = document.getElementById("judul");

  function ketik() {
    if (i < teks.length) {
      judul.innerHTML += teks.charAt(i);
      i++;
      setTimeout(ketik, speed);
    }
  }
  ketik();
});

// Form pendaftaran kirim ke Gmail (mailto)
document.getElementById("formDaftar").addEventListener("submit", function(e) {
  e.preventDefault();
  const nama = this.nama.value;
  const email = this.email.value;
  const pesan = this.pesan.value;

  const mailtoLink = `mailto:gurusekolah@example.com?subject=Pendaftaran Siswa Baru&body=Nama: ${nama}%0AEmail: ${email}%0APesan: ${pesan}`;
  window.location.href = mailtoLink;
});