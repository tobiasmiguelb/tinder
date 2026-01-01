const photoArea = document.getElementById('photoArea');
const likeBtn = document.getElementById('likeBtn');
const match = document.getElementById('match');

// Pega todas as imagens já carregadas
const images = document.querySelectorAll('div[style*="display:none"] img');

let index = 0;

// Cria imagens visíveis
images.forEach((img, i) => {
  const photo = document.createElement('img');
  photo.src = img.src;
  if (i === 0) photo.classList.add('active');
  photoArea.appendChild(photo);
});

const slides = photoArea.querySelectorAll('img');

// Slideshow automático com fade
setInterval(() => {
  slides[index].classList.remove('active');
  index = (index + 1) % slides.length;
  slides[index].classList.add('active');
}, 3000);

// Like sempre dá match
likeBtn.onclick = () => {
  match.style.display = 'flex';
};

function closeMatch() {
  match.style.display = 'none';
}
