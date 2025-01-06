const apiKey = '3348b1f10d934adf9284df161fe5aff5'; // You can get your key from https://newsapi.org/
const articlesContainer = document.getElementById('articlesContainer');
const categorySelect = document.getElementById('categorySelect');

function fetchArticles(category) {
    const url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayArticles(data.articles);
        })
        .catch(error => {
            console.error('Error fetching articles:', error);
        });
}

function displayArticles(articles) {
    articlesContainer.innerHTML = '';

    if (articles.length === 0) {
        articlesContainer.innerHTML = '<p>No articles found.</p>';
        return;
    }

    articles.forEach(article => {
        const articleCard = `
            <div class="card mb-4">
                <div class="card-body">
                    <h5 class="card-title">${article.title}</h5>
                    <p class="card-text">${article.description || 'No description available'}</p>
                    <a href="${article.url}" class="btn btn-primary" target="_blank">Read More</a>
                </div>
            </div>
        `;
        articlesContainer.innerHTML += articleCard;
    });
}

// Initialize with 'general' category
fetchArticles('general');

// Event listener for category selection
categorySelect.addEventListener('change', function() {
    const selectedCategory = this.value;
    fetchArticles(selectedCategory);
});
