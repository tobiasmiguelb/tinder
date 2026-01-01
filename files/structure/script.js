const photo = document.getElementById("photo");
const counter = document.getElementById("counter");

const formats = ["jpg", "png", "webp", "jpeg"];
let photos = [];
let index = 0;

let slideshowInterval = null;
const SLIDESHOW_TIME = 4000; // 4 segundos

/* CARREGAR FOTO1..FOTO5 (TIPO LIVRE) */
async function loadPhotos() {
  for (let i = 1; i <= 5; i++) {
    for (let ext of formats) {
      const path = `files/media/photos/foto${i}.${ext}`;
      try {
        const res = await fetch(path, { method: "HEAD" });
        if (res.ok) {
          photos.push(path);
          break;
        }
      } catch {}
    }
  }
  showPhoto();
  startSlideshow();
}

function showPhoto() {
  photo.classList.add("fade");

  setTimeout(() => {
    photo.src = photos[index];
    counter.textContent = `${index + 1} / ${photos.length}`;
    photo.classList.remove("fade");
    photo.classList.remove("zoom");
  }, 300);
}

function nextPhoto() {
  index = (index + 1) % photos.length;
  showPhoto();
  restartSlideshow();
}

function prevPhoto() {
  index = (index - 1 + photos.length) % photos.length;
  showPhoto();
  restartSlideshow();
}

/* SLIDESHOW AUTOMÁTICO */
function startSlideshow() {
  slideshowInterval = setInterval(() => {
    nextPhoto();
  }, SLIDESHOW_TIME);
}

function stopSlideshow() {
  clearInterval(slideshowInterval);
}

function restartSlideshow() {
  stopSlideshow();
  startSlideshow();
}

/* BOTÕES */
document.querySelector(".btn.like").onclick = nextPhoto;
document.querySelector(".btn.no").onclick = prevPhoto;

/* SWIPE */
let startX = 0;

photo.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

photo.addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;
  let diff = endX - startX;

  if (diff > 50) prevPhoto();
  if (diff < -50) nextPhoto();
});

/* DUPLO TOQUE (ZOOM) */
let lastTap = 0;
photo.addEventListener("touchend", () => {
  const now = Date.now();
  if (now - lastTap < 300) {
    photo.classList.toggle("zoom");
    stopSlideshow(); // pausa enquanto estiver em zoom
  }
  lastTap = now;
});

loadPhotos();
