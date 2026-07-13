function kirimDataKeGoogleSheets() {
    // URL Web App yang Anda dapatkan setelah Deploy Ulang Google Script di atas
    const urlGoogleScript = "https://script.google.com/macros/s/AKfycby7AUYawCKgafTMGcGuuWxwsQbdNLguROdX5FSoVMISSgSx--dV9bparoRFReRb9lxQ/exec";
    
    // Ambil data dari input form di halaman HTML Anda
    // Pastikan ID elemen sesuai dengan input di nj.html Anda
    const dataProduk = {
        toko: "NJ", // Penanda toko otomatis
        namaProduk: document.getElementById("nama_produk").value,
        harga: document.getElementById("harga_produk").value
    };

    // Validasi dasar lapangan: Jangan biarkan admin kirim data kosong
    if (!dataProduk.namaProduk || !dataProduk.harga) {
        alert("Semua data wajib diisi!");
        return;
    }

    // Tampilkan indikator loading di tombol agar tidak ditekan berkali-kali
    const tombolKirim = document.getElementById("btn-kirim");
    if(tombolKirim) {
        tombolKirim.disabled = true;
        tombolKirim.innerText = "Mengirim...";
    }

    // Eksekusi penembakan data ke Google Sheets dengan setelan Anti-CORS
    fetch(urlGoogleScript, {
        method: "POST",
        // Trik utama: Menggunakan text/plain untuk bypass preflight check CORS browser
        headers: {
            "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(dataProduk)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Jaringan bermasalah atau URL Script salah.");
        }
        return response.json();
    })
    .then(hasil => {
        if (hasil.status === "success") {
            alert("Sukses! Data NJ berhasil disinkronisasi ke Google Sheets.");
            // Reset form setelah sukses
            document.getElementById("form-toko").reset();
        } else {
            alert("Gagal menyimpan: " + hasil.message);
        }
    })
    .catch(error => {
        console.error("Error CORS/Jaringan:", error);
        alert("Sistem Mendeteksi Masalah: Data gagal terkirim. Pastikan internet stabil.");
    })
    .finally(() => {
        // Kembalikan status tombol seperti semula
        if(tombolKirim) {
            tombolKirim.disabled = false;
            tombolKirim.innerText = "Kirim Data";
        }
    });
}
