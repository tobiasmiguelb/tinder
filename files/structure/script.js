const photoContainer = document.querySelector('.photo-area');
const likeBtn = document.getElementById('likeBtn');
const match = document.getElementById('match');

let photos = [];
let current = 0;

// Lista automática das imagens (11 ou quantas tiver)
async function loadPhotos() {
  const response = await fetch('files/media/photos/');
  const text = await response.text();

  const matches = [...text.matchAll(/href="([^"]+\.(jpg|jpeg|png|webp))"/gi)];
  photos = matches.map(m => 'files/media/photos/' + m[1]);

  photos.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    if (i === 0) img.classList.add('active');
    photoContainer.appendChild(img);
  });

  startSlideshow();
}

function startSlideshow() {
  const imgs = document.querySelectorAll('.photo-area img');
  setInterval(() => {
    imgs[current].classList.remove('active');
    current = (current + 1) % imgs.length;
    imgs[current].classList.add('active');
  }, 3000);
}

// Sempre dá match
likeBtn.addEventListener('click', () => {
  match.style.display = 'flex';
});

function closeMatch() {
  match.style.display = 'none';
}

loadPhotos();
