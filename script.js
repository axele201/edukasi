const imageList = [
  "https://axele301.github.io/edukasi/img/jumbotron1.jpeg",
  "https://axele301.github.io/edukasi/img/jumbotron2.jpeg",
  "https://axele301.github.io/edukasi/img/jumbotron3.jpeg",
  "https://axele301.github.io/edukasi/img/jumbotron4.jpeg",
  "https://axele301.github.io/edukasi/img/jumbotron5.jpeg",
  ];

  let index = 0;
  const imageElement = document.getElementById("jumbotronImage");

  setInterval(() => {
    index = (index + 1) % imageList.length;
    imageElement.src = imageList[index];
  }, 5000);

  function bersihkanJatuhTempo() {
    const rows = document.querySelectorAll("#dataTable tbody tr");
    const now = new Date();
    let data = [];

    rows.forEach(row => {
      const no = row.cells[0].textContent;
      const keterangan = row.cells[1].textContent;
      const jatuhTempoText = row.cells[2].textContent;

      // Konversi "20 Maret 2025" ke format Date yang valid
      const tanggal = parseTanggalIndo(jatuhTempoText);

      if (tanggal && tanggal >= now) {
        data.push({ no, keterangan, kadaluarsa: tanggal });
      } else {
        row.remove(); // Hapus kalau sudah lewat
      }
    });

    // Urutkan berdasarkan kadaluarsa
    data.sort((a, b) => a.kadaluarsa - b.kadaluarsa);

    const tbody = document.querySelector("#dataTable tbody");
    tbody.innerHTML = ""; // Kosongkan dulu

    data.forEach(item => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.no}</td>
        <td>${item.keterangan}</td>
        <td>${formatTanggalIndo(item.kadaluarsa)}</td>
      `;
      tbody.appendChild(row);
    });
  }

  // Parser untuk tanggal format bahasa Indonesia
  function parseTanggalIndo(teks) {
    const bulan = {
      Januari: 0, Februari: 1, Maret: 2, April: 3, Mei: 4, Juni: 5,
      Juli: 6, Agustus: 7, September: 8, Oktober: 9, November: 10, Desember: 11
    };

    const parts = teks.split(" ");
    if (parts.length === 3) {
      const day = parseInt(parts[0]);
      const month = bulan[parts[1]];
      const year = parseInt(parts[2]);
      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        return new Date(year, month, day);
      }
    }
    return null;
  }

  // Format kembali ke string
  function formatTanggalIndo(date) {
    const bulanIndo = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    const d = date.getDate();
    const m = bulanIndo[date.getMonth()];
    const y = date.getFullYear();
    return `${d} ${m} ${y}`;
  }

  window.onload = () => {
    bersihkanJatuhTempo();
    setInterval(bersihkanJatuhTempo, 10000); // cek setiap 10 detik (opsional)
  };