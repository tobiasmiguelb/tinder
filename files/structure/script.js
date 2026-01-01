const photo = document.getElementById("photo");
const counter = document.getElementById("counter");

const formats = ["jpg", "png", "webp", "jpeg"];
let photos = [];
let index = 0;

const SLIDESHOW_TIME = 3500;

/* CARREGAR FOTO1..FOTO11 */
async function loadPhotos() {
  for (let i = 1; i <= 11; i++) {
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
  photo.style.opacity = 0;
  setTimeout(() => {
    photo.src = photos[index];
    counter.textContent = `${index + 1} / ${photos.length}`;
    photo.style.opacity = 1;
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

/* SLIDESHOW */
let slideshow;
function startSlideshow() {
  slideshow = setInterval(nextPhoto, SLIDESHOW_TIME);
}

function restartSlideshow() {
  clearInterval(slideshow);
  startSlideshow();
}

/* BOTÕES */
document.querySelector(".btn.like").onclick = nextPhoto;
document.querySelector(".btn.nope").onclick = prevPhoto;

/* SWIPE */
let startX = 0;
photo.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

photo.addEventListener("touchend", e => {
  const diff = e.changedTouches[0].clientX - startX;
  if (diff > 50) prevPhoto();
  if (diff < -50) nextPhoto();
});

loadPhotos();
