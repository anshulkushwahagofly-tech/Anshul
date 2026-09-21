// Theme Toggle Logic
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

// Check localStorage for theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  root.setAttribute('data-theme', savedTheme);
} else {
  // Default to dark as requested
  root.setAttribute('data-theme', 'dark');
}

themeToggle.addEventListener('click', () => {
  const currentTheme = root.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

// Real Data for Gallery
const galleryData = [
  { id: 1, type: 'image', src: 'assets/post1.webp', likes: 215, comments: 12, caption: '😎.\n.\n#instgram #instagood #newpost #explorepage #instagood' },
  { id: 2, type: 'image', src: 'assets/post2.webp', likes: 189, comments: 8, caption: '😎.\n.\n#instgram #instagood #newpost #explorepage #instagood' },
  { id: 3, type: 'image', src: 'assets/post3.jpg', likes: 320, comments: 14, caption: '😎.\n.\n#instgram #instagood #newpost #explorepage #instagood' },
  { id: 4, type: 'image', src: 'assets/post4.jpg', likes: 412, comments: 22, caption: '😎.\n.\n#instgram #instagood #newpost #explorepage #instagood' },
  { id: 5, type: 'image', src: 'assets/post5.jpg', likes: 298, comments: 19, caption: '😎.\n.\n#instgram #instagood #newpost #explorepage #instagood' },
  { id: 6, type: 'image', src: 'assets/post6.jpg', likes: 156, comments: 5, caption: '😎.\n.\n#instgram #instagood #newpost #explorepage #instagood' }
];

// Render Gallery
const gridGallery = document.getElementById('gridGallery');

function renderGallery() {
  galleryData.forEach(post => {
    const item = document.createElement('div');
    item.className = 'grid-item';
    
    // Thumbnail is first image
    const thumbSrc = post.type === 'carousel' ? post.images[0] : post.src;
    
    let html = `<img src="${thumbSrc}" alt="Post image" loading="lazy">`;
    
    if (post.type === 'carousel') {
      html += `
        <svg class="icon carousel-icon" viewBox="0 0 24 24">
          <path fill="currentColor" d="M22 4h-4V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1h4v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zM4 16V3h12v13H4zm16 5H8v-2h9a1 1 0 0 0 1-1V6h2v15z"/>
        </svg>
      `;
    }

    html += `
      <div class="grid-overlay">
        <div class="stat">
          <svg class="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          <span>${post.likes}</span>
        </div>
        <div class="stat">
          <svg class="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          <span>${post.comments}</span>
        </div>
      </div>
    `;

    item.innerHTML = html;
    
    item.addEventListener('click', () => { window.open(post.link, '_blank'); });
    
    gridGallery.appendChild(item);
  });
}

renderGallery();

// Modal Logic
const modal = document.getElementById('postModal');
const closeBtn = document.querySelector('.modal-close');
const modalMedia = document.getElementById('modalMedia');
const modalLikes = document.getElementById('modalLikes');
const modalCaption = document.getElementById('modalCaption');

let currentCarouselIndex = 0;
let currentPost = null;

function openModal(post) {
  currentPost = post;
  currentCarouselIndex = 0;
  
  modalLikes.textContent = post.likes.toLocaleString();
  modalCaption.textContent = post.caption;
  
  renderModalMedia();
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function renderModalMedia() {
  modalMedia.innerHTML = '';
  
  if (currentPost.type === 'image') {
    modalMedia.innerHTML = `<img src="${currentPost.src}" alt="Post media">`;
  } else if (currentPost.type === 'carousel') {
    const src = currentPost.images[currentCarouselIndex];
    modalMedia.innerHTML = `
      <img src="${src}" alt="Post media">
      ${currentCarouselIndex > 0 ? '<button class="carousel-btn prev">&larr;</button>' : ''}
      ${currentCarouselIndex < currentPost.images.length - 1 ? '<button class="carousel-btn next">&rarr;</button>' : ''}
      <div class="carousel-dots">
        ${currentPost.images.map((_, i) => `<div class="dot ${i === currentCarouselIndex ? 'active' : ''}"></div>`).join('')}
      </div>
    `;
    
    const prevBtn = modalMedia.querySelector('.prev');
    const nextBtn = modalMedia.querySelector('.next');
    
    if (prevBtn) prevBtn.addEventListener('click', () => {
      currentCarouselIndex--;
      renderModalMedia();
    });
    
    if (nextBtn) nextBtn.addEventListener('click', () => {
      currentCarouselIndex++;
      renderModalMedia();
    });
  }
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
  currentPost = null;
}

closeBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

