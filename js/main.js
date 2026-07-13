// js/main.js
function hitung(el) {
    let row = el.closest('.row-barang');
    let q = row.querySelector('.qty').value || 0;
    let h = row.querySelector('.harga').value || 0;
    row.querySelector('.total').value = q * h;
}

function tambahBaris() {
    let container = document.getElementById('containerBarang');
    let div = document.createElement('div');
    div.className = 'row-barang';
    div.innerHTML = `
        <input type="text" class="nama" placeholder="Barang">
        <input type="number" class="qty" placeholder="Qty" oninput="hitung(this)">
        <input type="number" class="harga" placeholder="Harga" oninput="hitung(this)">
        <input type="text" class="total" readonly placeholder="Total">
    `;
    container.appendChild(div);
}

async function kirimData(namaToko, tipe) {
    const url = URL_CONFIG[namaToko];
    if(!url) return alert("URL tidak ditemukan untuk toko ini!");
    
    let payload = { tipe: tipe, data: [] };
    
    if(tipe === 'BARANG') {
        document.querySelectorAll('.row-barang').forEach(r => {
            let n = r.querySelector('.nama').value;
            let q = r.querySelector('.qty').value;
            let h = r.querySelector('.harga').value;
            if(n && q && h) payload.data.push({ nama: n, qty: q, harga: h });
        });
    } else {
        payload.data = { 
            rincian: document.getElementById('rincian').value, 
            nominal: document.getElementById('nominal').value 
        };
    }

    try {
        await fetch(url, { method: "POST", body: JSON.stringify(payload) });
        alert("Berhasil terkirim ke " + namaToko);
    } catch(e) { alert("Gagal!"); }
}
