function rupiah(angka) {
    return "Rp " + angka.toLocaleString("id-ID");
}

function hitungDiskon() {
    let nama = document.getElementById("nama2").value.trim();
    let harga = Number(document.getElementById("harga2").value);
    let jumlah = Number(document.getElementById("jumlah").value);
    let status = document.getElementById("status").value;
    let diskon = Number(document.getElementById("diskon").value);
    let hasil = document.getElementById("hasil2");

    if (nama === "") {
        alert("Nama barang tidak boleh kosong!");
        hasil.innerHTML = "";
        return;
    }

    if (harga <= 0) {
        alert("Harga barang harus lebih dari 0!");
        hasil.innerHTML = "";
        return;
    }

    if (jumlah <= 0) {
        alert("Jumlah barang harus lebih dari 0!");
        hasil.innerHTML = "";
        return;
    }
    
    if (diskon < 0 || diskon > 100) {
        alert("Diskon harus antara 0 sampai 100!");
        hasil.innerHTML = "";
        return;
    }

    // Jika Member, tambah diskon 5%
    let totalDiskon = diskon;
    if (status === "Member") {
        totalDiskon = diskon + 5;
    }

    let total = harga * jumlah;
    let potongan = Math.round(total * totalDiskon / 100);
    let hargaAkhir = total - potongan;

    let keterangan = "";
    if (status === "Member") {
        keterangan = `Status : Member (diskon ${diskon}%<br>`;
    } else {
        keterangan = `Status : Umum (diskon ${diskon}%)<br>`;
    }

    hasil.innerHTML = `Barang : ${nama}<br>` +
        keterangan +
        `total = ${rupiah(harga)} x ${jumlah} = ${rupiah(total)}<br>` +
        `Potongan = ${rupiah(total)} - ${totalDiskon}% = ${rupiah(potongan)}<br>` +
        `Harga akhir = ${rupiah(total)} - ${rupiah(potongan)} = ${rupiah(hargaAkhir)}<br>` +
        `<br>Jadi, yang harus dibayar untuk ${nama} = ${rupiah(hargaAkhir)}`;

    if (total >= 100000) {
        return 10;
    } else if (total >= 50000) {
        return 5;
    } else {
        return 0;
    }
}