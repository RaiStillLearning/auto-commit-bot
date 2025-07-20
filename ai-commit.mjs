import { execSync } from "child_process";
import https from "https";
import { config } from "dotenv";
config(); // Load .env

const API_KEY = process.env.COMMIT_DEEPSEEK;

if (!API_KEY) {
  console.error(
    "❌ API key tidak ditemukan. Tambahkan COMMIT_DEEPSEEK di file .env"
  );
  process.exit(1);
}

const diff = execSync("git diff --cached", { encoding: "utf-8" });

if (!diff.trim()) {
  console.log("❌ Tidak ada perubahan yang di-stage.");
  process.exit(1);
}

const data = JSON.stringify({
  model: "deepseek/deepseek-chat-v3-0324",
  messages: [
    {
      role: "user",
      content: `Buatkan semantic commit message BERBAHASA INDONESIA dan SINGKAT dari perubahan ini. Tambahkan emoji yang sesuai di awal:\n${diff}`,
    },
  ],
});

const options = {
  hostname: "openrouter.ai",
  path: "https://openrouter.ai/api/v1/chat/completions",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
    "HTTP-Referer": "https://github.com/RaiStillLearning/auto-commit-bot.git",
    "X-Title": "ai-commit",
  },
};

const req = https.request(options, (res) => {
  let body = "";

  console.log(`🔄 Status: ${res.statusCode}`);
  console.log(`🔍 Content-Type: ${res.headers["content-type"]}`);

  res.on("data", (chunk) => (body += chunk));
  res.on("end", () => {
    const isJson = res.headers["content-type"]?.includes("application/json");
    if (!isJson) {
      console.error(
        "❌ Respons bukan JSON. Mungkin API key salah atau endpoint salah."
      );
      console.log("Raw body:", body);
      return;
    }

    try {
      const json = JSON.parse(body);

      if (!json.choices || !json.choices[0]?.message?.content) {
        console.error("❌ Gagal: Struktur respons tidak sesuai atau kosong.");
        console.log("Respon lengkap dari server:", body);
        return;
      }

      const message = json.choices[0].message.content.trim();
      if (!message) {
        console.error("❌ Gagal: Pesan dari AI kosong.");
        return;
      }

      console.log(`✅ Commit message dari AI: ${message}`);
      execSync(`git commit -m "${message.replace(/"/g, '\\"')}"`, {
        stdio: "inherit",
      });
    } catch (err) {
      console.error("❌ Error parsing response:", err.message);
      console.log("Raw body:", body);
    }
  });
});

req.on("error", (err) => {
  console.error("❌ Request error:", err);
});

req.write(data);
req.end();
