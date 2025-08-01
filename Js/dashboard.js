// Cek status login
if (localStorage.getItem('isLogin') !== 'true') {
    window.location.href = 'index.html';
}
const username = localStorage.getItem('loginUser');

// Logout
function logout() {
    localStorage.removeItem('isLogin');
    localStorage.removeItem('loginUser');
    window.location.href = 'index.html';
}

// Tab
function showTab(tab) {
    document.querySelectorAll('.menu').forEach(el => el.classList.remove('active'));
    document.getElementById('pemasukan-tab').style.display = 'none';
    document.getElementById('pengeluaran-tab').style.display = 'none';
    document.getElementById('pengelolaan-tab').style.display = 'none';
    if (tab === 'pemasukan') {
        document.querySelectorAll('.menu')[0].classList.add('active');
        document.getElementById('pemasukan-tab').style.display = '';
    } else if (tab === 'pengeluaran') {
        document.querySelectorAll('.menu')[1].classList.add('active');
        document.getElementById('pengeluaran-tab').style.display = '';
    } else if (tab === 'pengelolaan') {
        document.querySelectorAll('.menu')[2].classList.add('active');
        document.getElementById('pengelolaan-tab').style.display = '';
        tampilkanPengelolaan();
    }
}

// -------- PEMASUKAN --------
let editPemasukanIdx = null;
function tampilkanPemasukan() {
    const data = JSON.parse(localStorage.getItem('pemasukan_' + username) || '[]');
    let total = 0;
    const html = data.map((item, idx) => {
        const subtotal = item.jumlah * item.harga;
        total += subtotal;
        return `
            <div class="history-card">
                <div>
                    <b>${item.tgl}</b><br>
                    Jumlah telor : ${item.jumlah}kg<br>
                    Harga telor : Rp. ${item.harga}
                </div>
                <div class="history-value">Rp. ${subtotal.toLocaleString('id-ID')}</div>
                <button onclick="editPemasukan(${idx})" style="margin-left:12px;background:#a0761d;color:#fff;border:none;padding:8px;border-radius:8px;">Edit</button>
                <button onclick="hapusPemasukan(${idx})" style="margin-left:12px;background:#f3b313;color:#222;border:none;padding:8px;border-radius:8px;">Hapus</button>
            </div>
        `;
    }).join('');
    document.getElementById('listPemasukan').innerHTML = html;
    document.getElementById('totalPemasukan').innerText = 'Rp. ' + total.toLocaleString('id-ID');
}

document.getElementById('formPemasukan').onsubmit = function(e) {
    e.preventDefault();
    const tgl = document.getElementById('tglPemasukan').value;
    const jumlah = parseInt(document.getElementById('jumlahTelor').value);
    const harga = parseInt(document.getElementById('hargaTelor').value);
    let data = JSON.parse(localStorage.getItem('pemasukan_' + username) || '[]');
    if (editPemasukanIdx !== null) {
        data[editPemasukanIdx] = {tgl, jumlah, harga};
        editPemasukanIdx = null;
        this.querySelector('button').textContent = 'Tambah';
    } else {
        data.push({tgl, jumlah, harga});
    }
    localStorage.setItem('pemasukan_' + username, JSON.stringify(data));
    tampilkanPemasukan();
    this.reset();
};
function hapusPemasukan(idx) {
    let data = JSON.parse(localStorage.getItem('pemasukan_' + username) || '[]');
    data.splice(idx,1);
    localStorage.setItem('pemasukan_' + username, JSON.stringify(data));
    tampilkanPemasukan();
}
function editPemasukan(idx) {
    const data = JSON.parse(localStorage.getItem('pemasukan_' + username) || '[]');
    const item = data[idx];
    document.getElementById('tglPemasukan').value = item.tgl;
    document.getElementById('jumlahTelor').value = item.jumlah;
    document.getElementById('hargaTelor').value = item.harga;
    editPemasukanIdx = idx;
    document.getElementById('formPemasukan').querySelector('button').textContent = 'Update';
}
tampilkanPemasukan();

// -------- PENGELUARAN --------
let editPengeluaranIdx = null;
function tampilkanPengeluaran() {
    const data = JSON.parse(localStorage.getItem('pengeluaran_' + username) || '[]');
    let total = 0;
    const html = data.map((item, idx) => {
        total += item.nominal;
        return `
            <div class="history-card">
                <div>
                    <b>${item.tgl}</b><br>
                    Jenis : ${item.jenis}<br>
                </div>
                <div class="history-value">Rp. ${item.nominal.toLocaleString('id-ID')}</div>
                <button onclick="editPengeluaran(${idx})" style="margin-left:12px;background:#a0761d;color:#fff;border:none;padding:8px;border-radius:8px;">Edit</button>
                <button onclick="hapusPengeluaran(${idx})" style="margin-left:12px;background:#f3b313;color:#222;border:none;padding:8px;border-radius:8px;">Hapus</button>
            </div>
        `;
    }).join('');
    document.getElementById('listPengeluaran').innerHTML = html;
    document.getElementById('totalPengeluaran').innerText = 'Rp. ' + total.toLocaleString('id-ID');
}

document.getElementById('formPengeluaran').onsubmit = function(e) {
    e.preventDefault();
    const tgl = document.getElementById('tglPengeluaran').value;
    const jenis = document.getElementById('jenisPengeluaran').value;
    const nominal = parseInt(document.getElementById('nominalPengeluaran').value);
    let data = JSON.parse(localStorage.getItem('pengeluaran_' + username) || '[]');
    if (editPengeluaranIdx !== null) {
        data[editPengeluaranIdx] = {tgl, jenis, nominal};
        editPengeluaranIdx = null;
        this.querySelector('button').textContent = 'Tambah';
    } else {
        data.push({tgl, jenis, nominal});
    }
    localStorage.setItem('pengeluaran_' + username, JSON.stringify(data));
    tampilkanPengeluaran();
    this.reset();
};
function hapusPengeluaran(idx) {
    let data = JSON.parse(localStorage.getItem('pengeluaran_' + username) || '[]');
    data.splice(idx,1);
    localStorage.setItem('pengeluaran_' + username, JSON.stringify(data));
    tampilkanPengeluaran();
}
function editPengeluaran(idx) {
    const data = JSON.parse(localStorage.getItem('pengeluaran_' + username) || '[]');
    const item = data[idx];
    document.getElementById('tglPengeluaran').value = item.tgl;
    document.getElementById('jenisPengeluaran').value = item.jenis;
    document.getElementById('nominalPengeluaran').value = item.nominal;
    editPengeluaranIdx = idx;
    document.getElementById('formPengeluaran').querySelector('button').textContent = 'Update';
}
tampilkanPengeluaran();

// -------- PENGELOLAAN --------
function tampilkanPengelolaan() {
    const pemasukan = JSON.parse(localStorage.getItem('pemasukan_' + username) || '[]');
    const pengeluaran = JSON.parse(localStorage.getItem('pengeluaran_' + username) || '[]');
    let totalPemasukan = 0, totalPengeluaran = 0;
    pemasukan.forEach(item => totalPemasukan += item.jumlah * item.harga);
    pengeluaran.forEach(item => totalPengeluaran += item.nominal);

    document.getElementById('rekapPengelolaan').innerHTML = `
        <div class="monthly-list">
            <div class="monthly-card">Total pemasukan:<br>Rp. ${totalPemasukan.toLocaleString('id-ID')}</div>
            <div class="monthly-card">Total pengeluaran:<br>Rp. ${totalPengeluaran.toLocaleString('id-ID')}</div>
        </div>
        <div class="monthly-total">Sisa: Rp. ${(totalPemasukan-totalPengeluaran).toLocaleString('id-ID')}</div>
    `;
}