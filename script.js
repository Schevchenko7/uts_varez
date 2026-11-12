// fungsi bantu: ubah angka jadi format rupiah (contoh: 5000 -> Rp 5.000)
function rupiah(angka) {
    return "Rp " + angka.toLocaleString("id-ID");
}

// menentukan diskon (%) dari tabel Aturan Diskon berdasarkan subtotal
function cariDiskon(subtotal) {
    if (subtotal >= 100000) {
        return 10;
    } else if (subtotal >= 50000) {
        return 5;
    } else {
        return 0;
    }
}

// hitung diskon
function hitungDiskon() {
    let nama = document.getElementById("nama2").value.trim();
    let harga = Number(document.getElementById("harga2").value);
    let jumlah = Number(document.getElementById("jumlah").value);
    let status = document.getElementById("status").value;
    let tambahan = Number(document.getElementById("diskon").value);
    let hasil = document.getElementById("hasil2");

    // validasi input
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

    if (tambahan < 0 || tambahan > 100) {
        alert("Diskon tambahan harus antara 0 sampai 100!");
        hasil.innerHTML = "";
        return;
    }

    // subtotal dihitung dulu, karena diskon aturan bergantung pada subtotal
    let subtotal = harga * jumlah;

    // diskon dari tabel aturan
    let diskonAturan = cariDiskon(subtotal);

    // member dapat tambahan 5%
    let diskonMember = 0;
    if (status === "Member") {
        diskonMember = 5;
    }

    // total semua diskon, maksimal 100%
    let totalDiskon = diskonAturan + diskonMember + tambahan;
    if (totalDiskon > 100) {
        totalDiskon = 100;
    }

    let potongan = Math.round(subtotal * totalDiskon / 100);
    let hargaAkhir = subtotal - potongan;

    hasil.innerHTML = `Barang : ${nama}<br>` +
        `Status : ${status}<br>` +
        `Subtotal = ${rupiah(harga)} x ${jumlah} = ${rupiah(subtotal)}<br>` +
        `<br>Diskon aturan = ${diskonAturan}%<br>` +
        `Diskon member = ${diskonMember}%<br>` +
        `Diskon tambahan = ${tambahan}%<br>` +
        `Total diskon = ${totalDiskon}%<br>` +
        `<br>Potongan = ${rupiah(subtotal)} x ${totalDiskon}% = ${rupiah(potongan)}<br>` +
        `Harga akhir = ${rupiah(subtotal)} - ${rupiah(potongan)} = ${rupiah(hargaAkhir)}<br>` +
        `<br>Jadi, yang harus dibayar untuk ${nama} = ${rupiah(hargaAkhir)}`;
}