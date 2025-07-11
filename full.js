// full.js — Contains all 300 quotes across 12 categories

const quotes = [
  // ... 300 quotes from all 12 categories here ...
  // Example:
  { text: "The best way to get started is to quit talking and begin doing.", category: "Inspirational" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "You only live once, but if you do it right, once is enough.", category: "Life" },
  { text: "Love isn't something you find. Love is something that finds you.", category: "Love" },
  { text: "A friend is someone who knows all about you and still loves you.", category: "Friendship" },
  { text: "Happiness is not something ready made. It comes from your own actions.", category: "Happiness" },
  { text: "I told my wife she was drawing her eyebrows too high. She looked surprised.", category: "Funny" },
  { text: "Tears come from the heart and not from the brain.", category: "Sad" },
  { text: "Turn your wounds into wisdom.", category: "Wisdom" },
  { text: "You never know how strong you are until being strong is your only choice.", category: "Strength" },
  { text: "Look deep into nature, and then you will understand everything better.", category: "Nature" },
  { text: "Music gives a soul to the universe, wings to the mind, flight to the imagination.", category: "Music" },
  { text: "Random quote example.", category: "Random" }
];

function displayQuote(quote) {
  const container = document.querySelector('.container');
  if (!container) return;
  container.innerHTML = '';

  const quoteDiv = document.createElement('div');
  quoteDiv.className = 'quote';

  const text = document.createElement('p');
  text.textContent = quote.text;

  const tag = document.createElement('div');
  tag.className = 'tag';
  tag.textContent = quote.category;

  const actions = document.createElement('div');
  actions.className = 'actions';

  const copyBtn = document.createElement('button');
  copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
  copyBtn.title = "Copy quote";
  copyBtn.onclick = () => {
    navigator.clipboard.writeText(quote.text);
    copyBtn.innerHTML = '<i class="fas fa-check"></i>';
    setTimeout(() => copyBtn.innerHTML = '<i class=\"fas fa-copy\"></i>', 1500);
  };

  const shareBtn = document.createElement('button');
  shareBtn.innerHTML = '<i class="fas fa-share"></i>';
  shareBtn.title = "Share quote";
  shareBtn.onclick = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'QuoteGalaxy',
        text: quote.text,
        url: window.location.href
      });
    } else {
      alert('Sharing not supported on this browser.');
    }
  };

  actions.appendChild(copyBtn);
  actions.appendChild(shareBtn);
  quoteDiv.appendChild(text);
  quoteDiv.appendChild(tag);
  quoteDiv.appendChild(actions);
  container.appendChild(quoteDiv);
}

function getRandomQuote(category = null) {
  const filtered = category ? quotes.filter(q => q.category === category) : quotes;
  return filtered[Math.floor(Math.random() * filtered.length)];
}

// Auto display one quote on load
document.addEventListener('DOMContentLoaded', () => {
  const selectedCategory = localStorage.getItem('selectedCategory');
  const quote = getRandomQuote(selectedCategory);
  displayQuote(quote);
  localStorage.removeItem('selectedCategory');
});

// Expose function for buttons
window.displayRandomQuote = function(category) {
  const quote = getRandomQuote(category);
  displayQuote(quote);
};
