const partsStyles = {
  neck: ["default", "thick", "bend-backward", "bend-forward"],
  ears: ["default", "tilt-forward", "tilt-backward"],
  accessories: ["earings", "flower", "glasses", "headphone"],
  hair: ["default", "bang", "curls", "elegant", "fancy", "quiff", "short"],
  eyes: ["default", "angry", "naughty", "panda", "smart", "star"],
  leg: ["default", "bubble-tea", "cookie", "game-console", "tilt-forward", "tilt-backward"],
  mouth: ["default", "astonished", "eating", "laugh", "tongue"],
  backgrounds: ["blue50", "blue60", "blue70", "darkblue30", "darkblue50", "darkblue70", "green50", "green60", "green70", "grey40", "grey70", "grey80", "red50", "red60", "red70", "yellow50", "yellow60", "yellow70"]
};

const loadOrder = ["backgrounds", "neck", "ears", "hair", "accessories", "eyes", "mouth", "nose", "leg"];
const image = document.getElementById("image");
const partsList = document.querySelector(".alpacaParts");
const partStyles = document.querySelector(".partStyles");

// Load default alpaca
function loadDefaults() {
  loadOrder.forEach(part => {
    const img = document.createElement("img");
    if (part === "nose") {
      img.src = "alpaca/nose.png";
      img.classList.add("alpacanose");
    } else {
      const style = partsStyles[part][0];
      img.src = `alpaca/${part}/${style}.png`;
      img.id = `${part}-${style}`;
      img.classList.add(`alpaca${part}`);
    }
    image.appendChild(img);
  });
}

// Load part buttons
function loadParts() {
  Object.keys(partsStyles).forEach(part => {
    const li = document.createElement("li");
    li.className = "alpacaPart";
    li.id = part;
    li.textContent = part;
    partsList.appendChild(li);
  });
  partsList.firstChild.classList.add("active");
}

// Load style buttons for selected part
function loadStyles() {
  const activePart = document.querySelector(".alpacaParts .active");
  const styles = partsStyles[activePart.id];
  partStyles.innerHTML = "";
  styles.forEach(style => {
    const li = document.createElement("li");
    li.className = "partStyle";
    li.id = style;
    li.textContent = style;
    partStyles.appendChild(li);
  });
}

// On part selection
partsList.addEventListener("click", e => {
  if (e.target.classList.contains("alpacaPart")) {
    document.querySelector(".alpacaParts .active")?.classList.remove("active");
    e.target.classList.add("active");
    loadStyles();
  }
});

// On style selection
partStyles.addEventListener("click", e => {
  if (e.target.classList.contains("partStyle")) {
    document.querySelector(".partStyles .active")?.classList.remove("active");
    e.target.classList.add("active");

    const part = document.querySelector(".alpacaParts .active").id;
    const img = document.querySelector(`.alpaca${part}`);
    img.src = `alpaca/${part}/${e.target.id}.png`;
    img.id = `${part}-${e.target.id}`;
  }
});

// Random button
document.getElementById("randomStyles").addEventListener("click", () => {
  Object.entries(partsStyles).forEach(([part, styles]) => {
    const random = styles[Math.floor(Math.random() * styles.length)];
    const img = document.querySelector(`.alpaca${part}`);
    if (img) {
      img.src = `alpaca/${part}/${random}.png`;
      img.id = `${part}-${random}`;
    }
    const activePart = document.querySelector(".alpacaParts .active");
    if (activePart && activePart.id === part) {
      document.querySelector(".partStyles .active")?.classList.remove("active");
      const li = document.getElementById(random);
      li?.classList.add("active");
    }
  });
});

// Download button
document.getElementById("download").addEventListener("click", () => {
  html2canvas(image, { backgroundColor: null }).then(canvas => {
    const link = document.createElement("a");
    link.download = "alpaca.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
});

// Init
loadDefaults();
loadParts();
loadStyles();
