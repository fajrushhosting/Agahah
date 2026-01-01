const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Simpan data di memory (gunakan database di production)
let profileData = {
    name: "FAJRUSH",
    description: "Selamat datang di halaman linktree saya. Temukan tautan ke media sosial dan platform saya di bawah ini.",
    marqueeText: "SELAMAT DATANG DI WEBSITE FAJRUSH, SELAMAT TAHUN BARU 2026 DAN SELAMAT HARI RAYA NATAL 2025",
    profileImage: "https://via.placeholder.com/150/1d3557/f4a261?text=F",
    lastUpdate: new Date().toISOString()
};

// Endpoint untuk website
app.get('/api/profile', (req, res) => {
    res.json(profileData);
});

// Endpoint untuk update dari bot
app.post('/api/update', (req, res) => {
    const { command, value } = req.body;
    
    if (!command || !value) {
        return res.status(400).json({ error: 'Command dan value diperlukan' });
    }
    
    switch(command) {
        case 'ubah_tejs':
            profileData.marqueeText = value;
            break;
        case 'ubah_foto':
            profileData.profileImage = value;
            break;
        case 'ubah_nama':
            profileData.name = value;
            break;
        case 'ubah_deskripsi':
            profileData.description = value;
            break;
        default:
            return res.status(400).json({ error: 'Command tidak dikenali' });
    }
    
    profileData.lastUpdate = new Date().toISOString();
    console.log(`Data diperbarui: ${command} = ${value}`);
    res.json({ success: true, data: profileData });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server backend berjalan di port ${PORT}`);
});
