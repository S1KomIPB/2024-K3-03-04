// Data tanaman
var tanaman = [
    { GID: 1, ID: "T001", Nama: "Anggrek", NamaLatin: "Orchidaceae", JenisTanaman: "Hias", Lokasi: "CCR" },
    { GID: 2, ID: "T002", Nama: "Melati", NamaLatin: "Jasminum", JenisTanaman: "Hias", Lokasi: "CCR" },
    { GID: 3, ID: "T003", Nama: "Padi", NamaLatin: "Oryza sativa", JenisTanaman: "Pangan", Lokasi: "CCR" },
    { GID: 4, ID: "T004", Nama: "Padi", NamaLatin: "Oryza sativa", JenisTanaman: "Pangan", Lokasi: "CCR" },
    { GID: 5, ID: "T005", Nama: "Padi", NamaLatin: "Oryza sativa", JenisTanaman: "Pangan", Lokasi: "CCR" },
    { GID: 6, ID: "T006", Nama: "Padi", NamaLatin: "Oryza sativa", JenisTanaman: "Pangan", Lokasi: "CCR" },
    { GID: 7, ID: "T007", Nama: "Padi", NamaLatin: "Oryza sativa", JenisTanaman: "Pangan", Lokasi: "CCR" },
    { GID: 8, ID: "T008", Nama: "Padi", NamaLatin: "Oryza sativa", JenisTanaman: "Pangan", Lokasi: "CCR" },
    { GID: 9, ID: "T009", Nama: "Padi", NamaLatin: "Oryza sativa", JenisTanaman: "Pangan", Lokasi: "CCR" },
    { GID: 10, ID: "T010", Nama: "Padi", NamaLatin: "Oryza sativa", JenisTanaman: "Pangan", Lokasi: "CCR" },
    { GID: 11, ID: "T011", Nama: "Padi", NamaLatin: "Oryza sativa", JenisTanaman: "Pangan", Lokasi: "CCR" },
    // Tambahkan data lain di sini
];

// Fungsi untuk mengisi tabel dengan data tanaman
function populateTable() {
    var tableBody = document.getElementById("dataTableBody");
    tableBody.innerHTML = ""; // Bersihkan isi tabel sebelumnya
    tanaman.forEach(function (tanaman) {
        var row = `<tr>
                        <td>${tanaman.GID}</td>
                        <td>${tanaman.ID}</td>
                        <td>${tanaman.Nama}</td>
                        <td>${tanaman.NamaLatin}</td>
                        <td>${tanaman.JenisTanaman}</td>
                        <td>${tanaman.Lokasi}</td>
                    </tr>`;
        tableBody.innerHTML += row;
    });
}


//search Bar
document.getElementById("searchInput").addEventListener("keyup", function() {
    let filter = this.value.toLowerCase();
    let rows = document.getElementById("dataTableBody").getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName("td"); 

        if (cells.length > 0) {  // Check if there are cells
            let plantId = cells[0].textContent.toLowerCase();
            let plantName = cells[1].textContent.toLowerCase();
            let scientificName = cells[2].textContent.toLowerCase();
            if (
                plantId.indexOf(filter) > -1 ||
                plantName.indexOf(filter) > -1 ||
                scientificName.indexOf(filter) > -1
            ) {
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";
            }
        }
    }
});


// Panggil fungsi untuk mengisi tabel saat halaman dimuat
// populateTable();

// Tambahkan event listener untuk tombol tambah data
document.getElementById("tambahData").addEventListener("click", tambahDataBaru);
