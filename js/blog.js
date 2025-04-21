/**
 * Blog functionality for All-Star Debate website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the blog page 
    initBlog();
    
    // Initialize article page if on the article page
    if (document.querySelector('.article-main')) {
        initArticlePage();
    }
});

/**
 * Initialize the blog listing page
 */
function initBlog() {
    // Setup search functionality
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = this.querySelector('input').value.trim();
            if (searchTerm) {
                searchArticles(searchTerm);
            }
        });
    }
    
    // Initialize category filtering
    const categoryLinks = document.querySelectorAll('.categories-list a');
    if (categoryLinks.length) {
        categoryLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const category = this.textContent.split(' ')[0]; // Get category name without count
                filterByCategory(category);
            });
        });
    }
    
    // Initialize tag filtering
    const tagLinks = document.querySelectorAll('.tags-cloud .tag');
    if (tagLinks.length) {
        tagLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const tag = this.textContent;
                filterByTag(tag);
            });
        });
    }
    
    // Initialize pagination
    const paginationLinks = document.querySelectorAll('.pagination-item, .pagination-next');
    if (paginationLinks.length) {
        paginationLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                // Get page number (for numbered links) or next page (for next button)
                const page = this.classList.contains('pagination-next') 
                    ? getCurrentPage() + 1 
                    : parseInt(this.textContent);
                
                changePage(page);
            });
        });
    }
    
    // Initialize newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value.trim();
            if (email && isValidEmail(email)) {
                subscribeToNewsletter(email);
            } else {
                showNotification('Please enter a valid email address.');
            }
        });
    }
}

/**
 * Initialize the article page specific functionality
 */
function initArticlePage() {
    // Get article ID from URL
    const articleId = getArticleIdFromUrl();
    
    // Load article data if ID is available
    if (articleId) {
        // In a real implementation, we would fetch the article data
        // For now, we're using the static content
        
        // Setup comment form submission
        const commentForm = document.querySelector('.comment-form');
        if (commentForm) {
            commentForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const name = this.querySelector('#name').value.trim();
                const email = this.querySelector('#email').value.trim();
                const comment = this.querySelector('#comment').value.trim();
                const saveInfo = this.querySelector('#save-info').checked;
                
                if (name && email && comment && isValidEmail(email)) {
                    submitComment(articleId, name, email, comment, saveInfo);
                } else {
                    showNotification('Please fill in all required fields with valid information.');
                }
            });
        }
        
        // Setup comment reply functionality
        const replyButtons = document.querySelectorAll('.comment-reply');
        if (replyButtons.length) {
            replyButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const commentId = this.closest('.comment').dataset.id;
                    const commentAuthor = this.closest('.comment').querySelector('.comment-author').textContent;
                    
                    // Focus on comment textarea and add reply prefix
                    const commentTextarea = document.querySelector('#comment');
                    commentTextarea.focus();
                    commentTextarea.value = `@${commentAuthor.trim()} `;
                    
                    // Scroll to comment form
                    document.querySelector('.comment-form').scrollIntoView({ behavior: 'smooth' });
                });
            });
        }
        
        // Setup like functionality for comments
        const commentLikes = document.querySelectorAll('.comment-likes');
        if (commentLikes.length) {
            commentLikes.forEach(likeButton => {
                likeButton.addEventListener('click', function() {
                    const commentId = this.closest('.comment').dataset.id;
                    likeComment(commentId, this);
                });
            });
        }
        
        // Setup share buttons
        const shareButtons = document.querySelectorAll('.share-button');
        if (shareButtons.length) {
            shareButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const url = window.location.href;
                    const title = document.querySelector('.article-title').textContent;
                    
                    // Determine which platform to share on based on icon
                    if (this.querySelector('i').classList.contains('fa-facebook-f')) {
                        shareOnFacebook(url, title);
                    } else if (this.querySelector('i').classList.contains('fa-twitter')) {
                        shareOnTwitter(url, title);
                    } else if (this.querySelector('i').classList.contains('fa-linkedin-in')) {
                        shareOnLinkedIn(url, title);
                    } else if (this.querySelector('i').classList.contains('fa-envelope')) {
                        shareViaEmail(url, title);
                    }
                });
            });
        }
        
        // Handle reading progress indicator
        window.addEventListener('scroll', updateReadingProgress);
    }
}

/**
 * Extract article ID from URL query parameter
 */
function getArticleIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

/**
 * Get current page from the active pagination link
 */
function getCurrentPage() {
    const activePage = document.querySelector('.pagination-item.active');
    return activePage ? parseInt(activePage.textContent) : 1;
}

/**
 * Change to a specific page of articles
 */
function changePage(page) {
    console.log(`Changing to page ${page}`);
    
    // In a real implementation, we would:
    // 1. Make an API call to get articles for this page
    // 2. Update the articles displayed
    // 3. Update the pagination UI
    
    // For demo purposes, we're just updating the active class
    const paginationItems = document.querySelectorAll('.pagination-item');
    paginationItems.forEach(item => {
        item.classList.remove('active');
        if (parseInt(item.textContent) === page) {
            item.classList.add('active');
        }
    });
    
    // Show notification for demo
    showNotification(`Navigated to page ${page}`);
    
    // Scroll to top of articles
    document.querySelector('.blog-articles').scrollIntoView({ behavior: 'smooth' });
}

/**
 * Filter articles by category
 */
function filterByCategory(category) {
    console.log(`Filtering by category: ${category}`);
    
    // In a real implementation, we would fetch articles by category
    
    showNotification(`Showing articles in category: ${category}`);
}

/**
 * Filter articles by tag
 */
function filterByTag(tag) {
    console.log(`Filtering by tag: ${tag}`);
    
    // In a real implementation, we would fetch articles by tag
    
    showNotification(`Showing articles with tag: ${tag}`);
}

/**
 * Search articles by term
 */
function searchArticles(term) {
    console.log(`Searching for: ${term}`);
    
    // In a real implementation, we would fetch search results
    
    showNotification(`Showing search results for: ${term}`);
}

/**
 * Submit a comment on an article
 */
function submitComment(articleId, name, email, comment, saveInfo) {
    console.log(`Submitting comment for article ${articleId}`);
    console.log({ name, email, comment, saveInfo });
    
    // In a real implementation, we would:
    // 1. Make an API call to submit the comment
    // 2. Add the new comment to the UI when successful
    
    // For demo purposes, we're simulating a successful submission
    
    // Create a new comment element
    const commentsContainer = document.querySelector('.comments-list');
    const newComment = document.createElement('div');
    newComment.className = 'comment';
    newComment.innerHTML = `
        <div class="comment-avatar">
            <img src="assets/images/blog/avatar-default.jpg" alt="Comment avatar">
        </div>
        <div class="comment-content">
            <div class="comment-header">
                <h4 class="comment-author">${name}</h4>
                <span class="comment-date">Just now</span>
            </div>
            <p>${comment}</p>
            <div class="comment-actions">
                <button class="comment-reply">Reply</button>
                <span class="comment-likes"><i class="far fa-heart"></i> 0</span>
            </div>
        </div>
    `;
    
    // Add the new comment to the comments list
    commentsContainer.appendChild(newComment);
    
    // Update the comment count in the section title
    const commentCount = document.querySelectorAll('.comment').length;
    document.querySelector('.comments-section .section-title').textContent = `Comments (${commentCount})`;
    
    // Clear the form
    document.querySelector('#comment').value = '';
    
    // Save user info if requested
    if (saveInfo) {
        // In a real implementation, we would save to localStorage or a cookie
        console.log('Saving user info for future comments');
    }
    
    showNotification('Your comment has been posted successfully!');
    
    // Add event listeners to new comment buttons
    newComment.querySelector('.comment-reply').addEventListener('click', function() {
        document.querySelector('#comment').focus();
        document.querySelector('#comment').value = `@${name} `;
        document.querySelector('.comment-form').scrollIntoView({ behavior: 'smooth' });
    });
    
    newComment.querySelector('.comment-likes').addEventListener('click', function() {
        likeComment(null, this);
    });
}

/**
 * Handle liking a comment
 */
function likeComment(commentId, likeElement) {
    // Get current likes
    const likesText = likeElement.textContent.trim();
    const currentLikes = parseInt(likesText.match(/\d+/)[0]);
    
    // In a real implementation, we would make an API call to register the like
    
    // For demo purposes, we're just updating the UI
    likeElement.innerHTML = `<i class="fas fa-heart" style="color: #ff6b6b;"></i> ${currentLikes + 1}`;
    likeElement.style.color = '#ff6b6b';
    
    // Make it non-clickable after liking
    likeElement.style.cursor = 'default';
    likeElement.removeEventListener('click', likeComment);
}

/**
 * Subscribe to newsletter
 */
function subscribeToNewsletter(email) {
    console.log(`Subscribing email: ${email}`);
    
    // In a real implementation, we would make an API call to register the subscription
    
    // For demo purposes, we're just showing a success message
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.innerHTML = `
        <div class="success-message">
            <i class="fas fa-check-circle"></i>
            <p>Thank you for subscribing! We've sent a confirmation email to ${email}.</p>
        </div>
    `;
}

/**
 * Update reading progress indicator for article page
 */
function updateReadingProgress() {
    // Calculate how far down the page the user has scrolled
    const scrollTop = window.scrollY;
    const docHeight = document.querySelector('.article-content').offsetHeight;
    const winHeight = window.innerHeight;
    const scrollPercent = scrollTop / (docHeight - winHeight);
    const scrollPercentRounded = Math.round(scrollPercent * 100);
    
    // Only update if we have a progress indicator element
    const progressIndicator = document.querySelector('.reading-progress');
    if (progressIndicator) {
        progressIndicator.style.width = `${scrollPercentRounded}%`;
    }
}

/**
 * Share on Facebook
 */
function shareOnFacebook(url, title) {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
}

/**
 * Share on Twitter
 */
function shareOnTwitter(url, title) {
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
}

/**
 * Share on LinkedIn
 */
function shareOnLinkedIn(url, title) {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
}

/**
 * Share via Email
 */
function shareViaEmail(url, title) {
    const body = `I thought you might be interested in this article from All-Star Debate:\n\n${title}\n\n${url}`;
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(`Sharing: ${title}`)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Display a notification message
 */
function showNotification(message) {
    // Check if notification element exists
    let notification = document.querySelector('.notification');
    
    // Create if it doesn't exist
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification';
        document.body.appendChild(notification);
    }
    
    // Set message and show
    notification.textContent = message;
    notification.classList.add('active');
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('active');
    }, 3000);
} 
 * Blog functionality for All-Star Debate website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the blog page 
    initBlog();
    
    // Initialize article page if on the article page
    if (document.querySelector('.article-main')) {
        initArticlePage();
    }
});

/**
 * Initialize the blog listing page
 */
function initBlog() {
    // Setup search functionality
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = this.querySelector('input').value.trim();
            if (searchTerm) {
                searchArticles(searchTerm);
            }
        });
    }
    
    // Initialize category filtering
    const categoryLinks = document.querySelectorAll('.categories-list a');
    if (categoryLinks.length) {
        categoryLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const category = this.textContent.split(' ')[0]; // Get category name without count
                filterByCategory(category);
            });
        });
    }
    
    // Initialize tag filtering
    const tagLinks = document.querySelectorAll('.tags-cloud .tag');
    if (tagLinks.length) {
        tagLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const tag = this.textContent;
                filterByTag(tag);
            });
        });
    }
    
    // Initialize pagination
    const paginationLinks = document.querySelectorAll('.pagination-item, .pagination-next');
    if (paginationLinks.length) {
        paginationLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                // Get page number (for numbered links) or next page (for next button)
                const page = this.classList.contains('pagination-next') 
                    ? getCurrentPage() + 1 
                    : parseInt(this.textContent);
                
                changePage(page);
            });
        });
    }
    
    // Initialize newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value.trim();
            if (email && isValidEmail(email)) {
                subscribeToNewsletter(email);
            } else {
                showNotification('Please enter a valid email address.');
            }
        });
    }
}

/**
 * Initialize the article page specific functionality
 */
function initArticlePage() {
    // Get article ID from URL
    const articleId = getArticleIdFromUrl();
    
    // Load article data if ID is available
    if (articleId) {
        // In a real implementation, we would fetch the article data
        // For now, we're using the static content
        
        // Setup comment form submission
        const commentForm = document.querySelector('.comment-form');
        if (commentForm) {
            commentForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const name = this.querySelector('#name').value.trim();
                const email = this.querySelector('#email').value.trim();
                const comment = this.querySelector('#comment').value.trim();
                const saveInfo = this.querySelector('#save-info').checked;
                
                if (name && email && comment && isValidEmail(email)) {
                    submitComment(articleId, name, email, comment, saveInfo);
                } else {
                    showNotification('Please fill in all required fields with valid information.');
                }
            });
        }
        
        // Setup comment reply functionality
        const replyButtons = document.querySelectorAll('.comment-reply');
        if (replyButtons.length) {
            replyButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const commentId = this.closest('.comment').dataset.id;
                    const commentAuthor = this.closest('.comment').querySelector('.comment-author').textContent;
                    
                    // Focus on comment textarea and add reply prefix
                    const commentTextarea = document.querySelector('#comment');
                    commentTextarea.focus();
                    commentTextarea.value = `@${commentAuthor.trim()} `;
                    
                    // Scroll to comment form
                    document.querySelector('.comment-form').scrollIntoView({ behavior: 'smooth' });
                });
            });
        }
        
        // Setup like functionality for comments
        const commentLikes = document.querySelectorAll('.comment-likes');
        if (commentLikes.length) {
            commentLikes.forEach(likeButton => {
                likeButton.addEventListener('click', function() {
                    const commentId = this.closest('.comment').dataset.id;
                    likeComment(commentId, this);
                });
            });
        }
        
        // Setup share buttons
        const shareButtons = document.querySelectorAll('.share-button');
        if (shareButtons.length) {
            shareButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const url = window.location.href;
                    const title = document.querySelector('.article-title').textContent;
                    
                    // Determine which platform to share on based on icon
                    if (this.querySelector('i').classList.contains('fa-facebook-f')) {
                        shareOnFacebook(url, title);
                    } else if (this.querySelector('i').classList.contains('fa-twitter')) {
                        shareOnTwitter(url, title);
                    } else if (this.querySelector('i').classList.contains('fa-linkedin-in')) {
                        shareOnLinkedIn(url, title);
                    } else if (this.querySelector('i').classList.contains('fa-envelope')) {
                        shareViaEmail(url, title);
                    }
                });
            });
        }
        
        // Handle reading progress indicator
        window.addEventListener('scroll', updateReadingProgress);
    }
}

/**
 * Extract article ID from URL query parameter
 */
function getArticleIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

/**
 * Get current page from the active pagination link
 */
function getCurrentPage() {
    const activePage = document.querySelector('.pagination-item.active');
    return activePage ? parseInt(activePage.textContent) : 1;
}

/**
 * Change to a specific page of articles
 */
function changePage(page) {
    console.log(`Changing to page ${page}`);
    
    // In a real implementation, we would:
    // 1. Make an API call to get articles for this page
    // 2. Update the articles displayed
    // 3. Update the pagination UI
    
    // For demo purposes, we're just updating the active class
    const paginationItems = document.querySelectorAll('.pagination-item');
    paginationItems.forEach(item => {
        item.classList.remove('active');
        if (parseInt(item.textContent) === page) {
            item.classList.add('active');
        }
    });
    
    // Show notification for demo
    showNotification(`Navigated to page ${page}`);
    
    // Scroll to top of articles
    document.querySelector('.blog-articles').scrollIntoView({ behavior: 'smooth' });
}

/**
 * Filter articles by category
 */
function filterByCategory(category) {
    console.log(`Filtering by category: ${category}`);
    
    // In a real implementation, we would fetch articles by category
    
    showNotification(`Showing articles in category: ${category}`);
}

/**
 * Filter articles by tag
 */
function filterByTag(tag) {
    console.log(`Filtering by tag: ${tag}`);
    
    // In a real implementation, we would fetch articles by tag
    
    showNotification(`Showing articles with tag: ${tag}`);
}

/**
 * Search articles by term
 */
function searchArticles(term) {
    console.log(`Searching for: ${term}`);
    
    // In a real implementation, we would fetch search results
    
    showNotification(`Showing search results for: ${term}`);
}

/**
 * Submit a comment on an article
 */
function submitComment(articleId, name, email, comment, saveInfo) {
    console.log(`Submitting comment for article ${articleId}`);
    console.log({ name, email, comment, saveInfo });
    
    // In a real implementation, we would:
    // 1. Make an API call to submit the comment
    // 2. Add the new comment to the UI when successful
    
    // For demo purposes, we're simulating a successful submission
    
    // Create a new comment element
    const commentsContainer = document.querySelector('.comments-list');
    const newComment = document.createElement('div');
    newComment.className = 'comment';
    newComment.innerHTML = `
        <div class="comment-avatar">
            <img src="assets/images/blog/avatar-default.jpg" alt="Comment avatar">
        </div>
        <div class="comment-content">
            <div class="comment-header">
                <h4 class="comment-author">${name}</h4>
                <span class="comment-date">Just now</span>
            </div>
            <p>${comment}</p>
            <div class="comment-actions">
                <button class="comment-reply">Reply</button>
                <span class="comment-likes"><i class="far fa-heart"></i> 0</span>
            </div>
        </div>
    `;
    
    // Add the new comment to the comments list
    commentsContainer.appendChild(newComment);
    
    // Update the comment count in the section title
    const commentCount = document.querySelectorAll('.comment').length;
    document.querySelector('.comments-section .section-title').textContent = `Comments (${commentCount})`;
    
    // Clear the form
    document.querySelector('#comment').value = '';
    
    // Save user info if requested
    if (saveInfo) {
        // In a real implementation, we would save to localStorage or a cookie
        console.log('Saving user info for future comments');
    }
    
    showNotification('Your comment has been posted successfully!');
    
    // Add event listeners to new comment buttons
    newComment.querySelector('.comment-reply').addEventListener('click', function() {
        document.querySelector('#comment').focus();
        document.querySelector('#comment').value = `@${name} `;
        document.querySelector('.comment-form').scrollIntoView({ behavior: 'smooth' });
    });
    
    newComment.querySelector('.comment-likes').addEventListener('click', function() {
        likeComment(null, this);
    });
}

/**
 * Handle liking a comment
 */
function likeComment(commentId, likeElement) {
    // Get current likes
    const likesText = likeElement.textContent.trim();
    const currentLikes = parseInt(likesText.match(/\d+/)[0]);
    
    // In a real implementation, we would make an API call to register the like
    
    // For demo purposes, we're just updating the UI
    likeElement.innerHTML = `<i class="fas fa-heart" style="color: #ff6b6b;"></i> ${currentLikes + 1}`;
    likeElement.style.color = '#ff6b6b';
    
    // Make it non-clickable after liking
    likeElement.style.cursor = 'default';
    likeElement.removeEventListener('click', likeComment);
}

/**
 * Subscribe to newsletter
 */
function subscribeToNewsletter(email) {
    console.log(`Subscribing email: ${email}`);
    
    // In a real implementation, we would make an API call to register the subscription
    
    // For demo purposes, we're just showing a success message
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.innerHTML = `
        <div class="success-message">
            <i class="fas fa-check-circle"></i>
            <p>Thank you for subscribing! We've sent a confirmation email to ${email}.</p>
        </div>
    `;
}

/**
 * Update reading progress indicator for article page
 */
function updateReadingProgress() {
    // Calculate how far down the page the user has scrolled
    const scrollTop = window.scrollY;
    const docHeight = document.querySelector('.article-content').offsetHeight;
    const winHeight = window.innerHeight;
    const scrollPercent = scrollTop / (docHeight - winHeight);
    const scrollPercentRounded = Math.round(scrollPercent * 100);
    
    // Only update if we have a progress indicator element
    const progressIndicator = document.querySelector('.reading-progress');
    if (progressIndicator) {
        progressIndicator.style.width = `${scrollPercentRounded}%`;
    }
}

/**
 * Share on Facebook
 */
function shareOnFacebook(url, title) {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
}

/**
 * Share on Twitter
 */
function shareOnTwitter(url, title) {
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
}

/**
 * Share on LinkedIn
 */
function shareOnLinkedIn(url, title) {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
}

/**
 * Share via Email
 */
function shareViaEmail(url, title) {
    const body = `I thought you might be interested in this article from All-Star Debate:\n\n${title}\n\n${url}`;
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(`Sharing: ${title}`)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Display a notification message
 */
function showNotification(message) {
    // Check if notification element exists
    let notification = document.querySelector('.notification');
    
    // Create if it doesn't exist
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification';
        document.body.appendChild(notification);
    }
    
    // Set message and show
    notification.textContent = message;
    notification.classList.add('active');
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('active');
    }, 3000);
} 