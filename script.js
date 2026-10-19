const ui = document.getElementById("ui");
const totalItems = 100;
const words = ["Pidangyeu", "Phụng ơi", "I love you", "20/10"];

for (let i = 1; i <= totalItems; i++) {
  const love = document.createElement("div");
  love.className = "love";
  love.style.setProperty("--i", i);

  love.innerHTML = `
    <div class="love_horizontal">
      <div class="love_vertical">
        <div class="love_word">${words[i % words.length]}</div>
      </div>
    </div>
  `;

  ui.appendChild(love);
}

// Thu nhỏ trái tim cho vừa màn hình điện thoại
function fitHeart() {
  const size = Math.min(window.innerWidth - 40, window.innerHeight - 260, 450);
  document.documentElement.style.setProperty("--scale", Math.max(size, 200) / 450);
}
fitHeart();
window.addEventListener("resize", fitHeart);

// Tim và hoa rơi
const falling = document.getElementById("falling");
const icons = ["❤", "💖", "🌸", "🌹", "💕", "✿"];

function spawnPetal() {
  const p = document.createElement("span");
  p.className = "petal";
  p.textContent = icons[Math.floor(Math.random() * icons.length)];
  p.style.left = Math.random() * 100 + "vw";
  p.style.fontSize = 12 + Math.random() * 18 + "px";
  p.style.animationDuration = 6 + Math.random() * 6 + "s";
  p.style.opacity = 0.5 + Math.random() * 0.5;
  falling.appendChild(p);
  p.addEventListener("animationend", () => p.remove());
}

// Màn hình mở đầu: bóc quà nhiều lớp
const intro = document.getElementById("intro");
const giftStep = document.getElementById("giftStep");
const askStep = document.getElementById("askStep");
const giftIcon = document.getElementById("giftIcon");
const giftText = document.getElementById("giftText");
const openBtn = document.getElementById("openBtn");

const giftLayers = [
  { icon: "📦", text: "Ơ chưa đâu, còn một lớp nữa 😝", btn: "Mở tiếp" },
  { icon: "🎀", text: "Kiên nhẫn xíu nữa nha Pidangyeu~", btn: "Mở tiếp nữa" },
  { icon: "🧻", text: "Quà là... cuộn giấy vệ sinh 🤣 Đùa thôi, mở tiếp đi!", btn: "Hứ, mở tiếp" },
  { icon: "💋", text: "Quà là 1 nụ hôn anh nợ em đó 😘 Nhưng chưa hết đâu...", btn: "Mở lớp cuối 🎁" },
];
let layer = 0;

openBtn.addEventListener("click", () => {
  if (layer < giftLayers.length) {
    const l = giftLayers[layer++];
    giftIcon.classList.remove("pop");
    void giftIcon.offsetWidth; // chạy lại hiệu ứng
    giftIcon.classList.add("pop");
    giftIcon.textContent = l.icon;
    giftText.textContent = l.text;
    openBtn.textContent = l.btn;
  } else {
    giftStep.classList.add("hidden_step");
    askStep.classList.remove("hidden_step");
  }
});

// Câu hỏi "có yêu anh không" với nút Không chạy trốn
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const askHint = document.getElementById("askHint");

const noHints = [
  "Bấm nhầm rồi đúng không? 🥺",
  "Nghĩ kỹ lại đi mà~",
  "Nút này hỏng rồi á 😜",
  "Không được chọn cái này đâu 😤",
  "Anh buồn đó nha 😢",
  "Bắt được thì anh cho chọn 😝",
  "Thôi bấm Có đi mà 👉👈",
];
const yesTexts = ["Có 💖", "Có chứ 💖", "Yêu nhiều 💖", "Yêu lắm luôn 💖", "Bấm vào đây nè 💖"];
let noCount = 0;

function runAway(e) {
  if (e) e.preventDefault();
  noCount++;
  askHint.textContent = noHints[(noCount - 1) % noHints.length];
  yesBtn.textContent = yesTexts[Math.min(noCount, yesTexts.length - 1)];
  yesBtn.style.transform = `scale(${Math.min(1 + noCount * 0.15, 2.2)})`;

  const pad = 16;
  const maxX = window.innerWidth - noBtn.offsetWidth - pad;
  const maxY = window.innerHeight - noBtn.offsetHeight - pad;
  noBtn.classList.add("running");
  noBtn.style.left = pad + Math.random() * (maxX - pad) + "px";
  noBtn.style.top = pad + Math.random() * (maxY - pad) + "px";
}

noBtn.addEventListener("mouseenter", runAway);
noBtn.addEventListener("touchstart", runAway, { passive: false });
noBtn.addEventListener("click", runAway);

function heartBurst() {
  for (let i = 0; i < 40; i++) {
    const h = document.createElement("span");
    h.className = "burst";
    h.textContent = icons[i % icons.length];
    const angle = Math.random() * Math.PI * 2;
    const dist = 120 + Math.random() * 220;
    h.style.setProperty("--x", Math.cos(angle) * dist + "px");
    h.style.setProperty("--y", Math.sin(angle) * dist + "px");
    document.body.appendChild(h);
    h.addEventListener("animationend", () => h.remove());
  }
}

yesBtn.addEventListener("click", () => {
  noBtn.style.display = "none";
  yesBtn.disabled = true;
  askHint.textContent = "Biết ngay mà! Anh cũng yêu em nhiều lắm 💖";
  heartBurst();
  setTimeout(() => {
    intro.classList.add("hide");
    document.body.classList.add("started");
    setInterval(spawnPetal, 350);
  }, 1800);
});

// Lá thư với hiệu ứng gõ chữ
const message =
  "Nhân ngày Phụ nữ Việt Nam 20/10, anh chúc em – cô gái của anh – luôn xinh đẹp, " +
  "rạng rỡ và thật hạnh phúc.\n\n" +
  "Cảm ơn em đã đến bên anh, khiến mỗi ngày của anh đều trở nên ý nghĩa và ngọt ngào hơn. " +
  "Anh mong em lúc nào cũng mỉm cười, luôn khỏe mạnh, và mọi điều em ước đều sẽ thành sự thật.\n\n" +
  "Hôm nay và cả những ngày sau nữa, anh sẽ luôn ở đây để thương em, chiều em và chăm sóc em thật nhiều.\n\n" +
  "Chúc Pidangyeu của anh một ngày 20/10 thật vui nhé! 🌹";

const letter = document.getElementById("letter");
const letterText = document.getElementById("letterText");
let typing = null;

function typeMessage() {
  clearInterval(typing);
  letterText.textContent = "";
  let idx = 0;
  const chars = Array.from(message);
  typing = setInterval(() => {
    letterText.textContent += chars[idx++];
    if (idx >= chars.length) clearInterval(typing);
  }, 35);
}

document.getElementById("letterBtn").addEventListener("click", () => {
  letter.classList.remove("hidden");
  typeMessage();
});

function closeLetter() {
  letter.classList.add("hidden");
  clearInterval(typing);
}
document.getElementById("closeBtn").addEventListener("click", closeLetter);
letter.addEventListener("click", (e) => {
  if (e.target === letter) closeLetter();
});
