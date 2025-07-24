# 🤖 AI Commit Bot

AI Commit Bot adalah alat otomatis untuk membuat pesan commit Git menggunakan AI seperti GPT-4, Claude, DeepSeek, dan lainnya. Bot ini membaca perubahan di file kamu dan menghasilkan pesan commit yang jelas, singkat, dan sesuai konteks secara otomatis.

---

## Cara Menggunakan
kamu bisa cukup copy file ai-commit.mjs saja lalu masukkan ``.env`` dengan isi env (``COMMIT_DEEPSEEK``) kamu bisa merubahnya sesuka hati dan jangan lupa juga untuk ``npm install`` or ``yarn install`` untuk mengunduh dependencies yang di butuhkan untuk
menjalankan ai-commit bot ini


---

## 🚀 Fitur Utama

- 🔍 Mendeteksi perubahan file menggunakan `git diff`
- 🧠 Menghasilkan commit message dengan AI
- 📦 Mendukung berbagai model (OpenAI, Claude, DeepSeek, dsb)
- ⚙️ Bisa dijalankan dari CLI atau digabung dengan Git Hook
- 🔐 Dukungan `.env` untuk keamanan API key

---

## Cara test API kamu menggunakan Postman

{
  "model": "deepseek/deepseek-chat-v3-0324", (sesuaikan dengan model kamu)
  "messages": [
    {
      "role": "user",
      "content": "halo"
    }
  ]
}

- isi headers dengan KEY: Authorization dan VALUE: Bearer (API kamu)
- KEY: Content-Type VALUE: Application/json
- Jika menggunakan API dari openrouter.ai umumnya menggunakan endpoint ini `https://openrouter.ai/api/v1/chat/completions`

---


## 📦 Instalasi

```bash
git clone https://github.com/RaiStillLearning/auto-commit-bot.git
cd auto-commit-bot
npm inatall
