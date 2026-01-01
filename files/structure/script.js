const photo = document.getElementById("photo");
const counter = document.getElementById("counter");

const formats = ["jpg", "png", "webp", "jpeg"];
let photos = [];
let index = 0;

/* CARREGA FOTO1..FOTO5 INDEPENDENTE DO FORMATO */
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
}

function showPhoto() {
  photo.style.opacity = 0;
  setTimeout(() => {
    photo.src = photos[index];
    counter.textContent = `${index + 1} / ${photos.length}`;
    photo.style.opacity = 1;
    photo.classList.remove("zoom");
  }, 200);
}

function nextPhoto() {
  index = (index + 1) % photos.length;
  showPhoto();
}

function prevPhoto() {
  index = (index - 1 + photos.length) % photos.length;
  showPhoto();
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
  const now = new Date().getTime();
  if (now - lastTap < 300) {
    photo.classList.toggle("zoom");
  }
  lastTap = now;
});

loadPhotos();
