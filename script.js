// Dapatkan elemen-elemen DOM
const gameContainer = document.querySelector(".container"),
  penggunaResult = document.querySelector(".pengguna_result img"),
  komputerResult = document.querySelector(".komputer_result img"),
  result = document.querySelector(".result"),
  optionImages = document.querySelectorAll(".option_image");

// Loop melalui setiap elemen gambar opsi
optionImages.forEach((image, index) => {
  // Menambahkan event listener untuk setiap gambar opsi yang diklik
  image.addEventListener("click", (e) => {
    // Menambahkan kelas "active" ke gambar yang diklik
    image.classList.add("active");

    // Mengatur sumber gambar pengguna dan komputer ke gambar batu
    penggunaResult.src = komputerResult.src = "images/batu.png";
    result.textContent = "Tunggu..."; // Menetapkan teks "Tunggu..." pada elemen hasil

    // Loop melalui setiap elemen gambar opsi lagi
    optionImages.forEach((image2, index2) => {
      // Jika indeks saat ini tidak cocok dengan indeks yang diklik
      // Hapus kelas "active" dari gambar opsi lainnya
      index !== index2 && image2.classList.remove("active");
    });

    // Menambahkan kelas "start" ke elemen container game
    gameContainer.classList.add("start");

    // Menetapkan timeout untuk menunda perhitungan hasil
    let time = setTimeout(() => {
      // Menghapus kelas "start" dari elemen container game
      gameContainer.classList.remove("start");

      // Mendapatkan sumber dari gambar opsi yang diklik
      let imageSrc = e.target.querySelector("img").src;
      // Menetapkan gambar pengguna ke gambar opsi yang diklik
      penggunaResult.src = imageSrc;

      // Menghasilkan angka acak antara 0 dan 2
      let randomNumber = Math.floor(Math.random() * 3);
      // Membuat array gambar opsi komputer
      let komputerImages = ["images/batu.png", "images/kertas.png", "images/gunting.png"];
      // Menetapkan gambar komputer ke opsi acak dari array
      komputerResult.src = komputerImages[randomNumber];

      // Menetapkan nilai huruf untuk opsi komputer (R untuk batu, P untuk kertas, S untuk gunting)
      let komputerValue = ["R", "P", "S"][randomNumber];
      // Menetapkan nilai huruf untuk opsi yang diklik (berdasarkan indeks)
      let penggunaValue = ["R", "P", "S"][index];

      // Membuat objek dengan semua kemungkinan hasil
      let outcomes = {
        RR: "Seri",
        RP: "Komputer",
        RS: "Pengguna",
        PP: "Seri",
        PR: "Pengguna",
        PS: "Komputer",
        SS: "Seri",
        SR: "Komputer",
        SP: "Pengguna",
      };

      // Mencari nilai hasil berdasarkan opsi pengguna dan komputer
      let outComeValue = outcomes[penggunaValue + komputerValue];

      // Menampilkan hasilnya
      result.textContent = penggunaValue === komputerValue ? "Seri" : `${outComeValue} Menang!!`;
    }, 2500);
  });
});