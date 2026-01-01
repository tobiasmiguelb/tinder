// Slideshow de Fotos
const photos = [
    './files/media/photos/clara1.jpg',
    './files/media/photos/clara2.jpg',
    './files/media/photos/clara3.jpg',
    './files/media/photos/clara4.jpg',
    './files/media/photos/clara5.jpg',
    './files/media/photos/clara6.jpg',
    './files/media/photos/clara7.jpg',
    './files/media/photos/clara8.jpg',
    './files/media/photos/clara9.jpg',
    './files/media/photos/clara10.jpg',
    './files/media/photos/clara11.jpg'
];

let currentPhotoIndex = 0;
const photoElement = document.getElementById('photo');

function changePhoto() {
    photoElement.style.opacity = 0; // Fade out
    setTimeout(() => {
        currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
        photoElement.src = photos[currentPhotoIndex];
        photoElement.style.opacity = 1; // Fade in
    }, 500); // Meio segundo para fade
}

// Inicia slideshow automático (muda a cada 3 segundos)
setInterval(changePhoto, 3000);

// Botões
const dislikeBtn = document.getElementById('dislike');
const superlikeBtn = document.getElementById('superlike');
const likeBtn = document.getElementById('like');
const card = document.getElementById('card');
const matchOverlay = document.getElementById('matchOverlay');
const closeMatch = document.getElementById('closeMatch');

// X e estrela não fazem nada
dislikeBtn.addEventListener('click', () => {});
superlikeBtn.addEventListener('click', () => {});

// Like: Anima swipe e mostra match
likeBtn.addEventListener('click', () => {
    card.classList.add('swipe-right');
    setTimeout(() => {
        matchOverlay.style.display = 'flex';
        card.classList.remove('swipe-right'); // Reseta para reutilizar
    }, 800);
});

// Fechar overlay
closeMatch.addEventListener('click', () => {
    matchOverlay.style.display = 'none';
});