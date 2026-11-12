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

// simulasi total harga (tanpa diskon) untuk pembelian 1 sampai batas buah
function simulasiHarga(angka, batas) {
    let simulasi = document.getElementById("simulasi");

    let text = "";
    for (let i = 1; i <= batas; i++) {
        text += rupiah(angka) + " x " + i + " = " + rupiah(angka * i) + "<br>";
    }
    simulasi.innerHTML = text;
}

// hitung diskon
function hitungDiskon() {
    let nama = document.getElementById("nama2").value.trim();
    let harga = Number(document.getElementById("harga2").value);
    let jumlah = Number(document.getElementById("jumlah").value);
    let status = document.getElementById("status").value;
    let hasil = document.getElementById("hasil2");
    let simulasi = document.getElementById("simulasi");

    // validasi input
    if (nama === "") {
        alert("Nama barang tidak boleh kosong!");
        hasil.innerHTML = "";
        simulasi.innerHTML = "";
        return;
    }

    if (harga <= 0) {
        alert("Harga barang harus lebih dari 0!");
        hasil.innerHTML = "";
        simulasi.innerHTML = "";
        return;
    }

    if (jumlah <= 0) {
        alert("Jumlah barang harus lebih dari 0!");
        hasil.innerHTML = "";
        simulasi.innerHTML = "";
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

    // total diskon = diskon aturan + diskon member
    let totalDiskon = diskonAturan + diskonMember;

    let potongan = Math.round(subtotal * totalDiskon / 100);
    let hargaAkhir = subtotal - potongan;

    hasil.innerHTML = `Barang : ${nama}<br>` +
        `Status : ${status}<br>` +
        `Subtotal = ${rupiah(harga)} x ${jumlah} = ${rupiah(subtotal)}<br>` +
        `<br>Diskon aturan = ${diskonAturan}%<br>` +
        `Diskon member = ${diskonMember}%<br>` +
        `Total diskon = ${totalDiskon}%<br>` +
        `<br>Potongan = ${rupiah(subtotal)} x ${totalDiskon}% = ${rupiah(potongan)}<br>` +
        `Harga akhir = ${rupiah(subtotal)} - ${rupiah(potongan)} = ${rupiah(hargaAkhir)}<br>` +
        `<br>Jadi, yang harus dibayar untuk ${nama} = ${rupiah(hargaAkhir)}`;

    // tampilkan simulasi harga 1 sampai 5 buah
    simulasiHarga(harga, 5);
}