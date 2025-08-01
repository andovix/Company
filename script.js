function togglePassword() {
    const pwd = document.getElementById('password');
    pwd.type = pwd.type === 'password' ? 'text' : 'password';
}

// Username dan Password statis (bisa ditambah sesuai kebutuhan)
const USERS = [
    { username: 'admin', password: '123456' },
    { username: 'user1', password: 'password1' }
];

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const user = USERS.find(u => u.username === username && u.password === password);
    if (user) {
        localStorage.setItem('isLogin', 'true');
        localStorage.setItem('loginUser', username);
        // Inisialisasi data jika belum ada
        if (!localStorage.getItem('pemasukan_' + username)) localStorage.setItem('pemasukan_' + username, '[]');
        if (!localStorage.getItem('pengeluaran_' + username)) localStorage.setItem('pengeluaran_' + username, '[]');
        window.location.href = 'dashboard.html';
    } else {
        document.getElementById('loginError').style.display = 'block';
    }
});