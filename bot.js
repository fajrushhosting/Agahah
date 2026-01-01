const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const token = '8215658902:AAFKcqAtfedFdrtKLiIGKPkwWUT4_athrZ0';
const bot = new TelegramBot(token, { polling: true });
const BACKEND_URL = 'https://backend-anda.com'; // Ganti dengan URL backend Anda

// Command handler
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const welcomeText = `Halo! Saya adalah bot untuk mengelola website Fajrush.

Perintah yang tersedia:
/ubah_teks [teks baru] - Ubah teks berjalan
/ubah_foto [URL foto] - Ubah foto profil
/ubah_nama [nama baru] - Ubah nama
/ubah_deskripsi [deskripsi] - Ubah deskripsi
/info - Lihat data saat ini

Contoh:
/ubah_teks Selamat datang di website Fajrush!`;
    
    bot.sendMessage(chatId, welcomeText);
});

bot.onText(/\/ubah_teks (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const newText = match[1];
    
    try {
        const response = await axios.post(`${BACKEND_URL}/api/update`, {
            command: 'ubah_tejs',
            value: newText
        });
        
        bot.sendMessage(chatId, `✅ Teks berjalan berhasil diubah menjadi:\n"${newText}"`);
    } catch (error) {
        bot.sendMessage(chatId, '❌ Gagal mengubah teks. Silakan coba lagi.');
    }
});

bot.onText(/\/ubah_foto (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const newPhoto = match[1];
    
    try {
        const response = await axios.post(`${BACKEND_URL}/api/update`, {
            command: 'ubah_foto',
            value: newPhoto
        });
        
        bot.sendMessage(chatId, `✅ Foto profil berhasil diubah.\nURL: ${newPhoto}`);
    } catch (error) {
        bot.sendMessage(chatId, '❌ Gagal mengubah foto. Pastikan URL valid.');
    }
});

bot.onText(/\/ubah_nama (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const newName = match[1];
    
    try {
        const response = await axios.post(`${BACKEND_URL}/api/update`, {
            command: 'ubah_nama',
            value: newName
        });
        
        bot.sendMessage(chatId, `✅ Nama berhasil diubah menjadi: ${newName}`);
    } catch (error) {
        bot.sendMessage(chatId, '❌ Gagal mengubah nama.');
    }
});

bot.onText(/\/ubah_deskripsi (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const newDesc = match[1];
    
    try {
        const response = await axios.post(`${BACKEND_URL}/api/update`, {
            command: 'ubah_deskripsi',
            value: newDesc
        });
        
        bot.sendMessage(chatId, `✅ Deskripsi berhasil diubah:\n${newDesc}`);
    } catch (error) {
        bot.sendMessage(chatId, '❌ Gagal mengubah deskripsi.');
    }
});

bot.onText(/\/info/, async (msg) => {
    const chatId = msg.chat.id;
    
    try {
        const response = await axios.get(`${BACKEND_URL}/api/profile`);
        const data = response.data;
        
        const infoText = `📊 Data Website Fajrush:

👤 Nama: ${data.name}
📝 Deskripsi: ${data.description}
🎯 Teks Berjalan: ${data.marqueeText}
🖼️ Foto: ${data.profileImage}
🕒 Terakhir Update: ${new Date(data.lastUpdate).toLocaleString('id-ID')}`;
        
        bot.sendMessage(chatId, infoText);
    } catch (error) {
        bot.sendMessage(chatId, '❌ Gagal mengambil data.');
    }
});

console.log('Bot Telegram berjalan...');
