// Extract thread ID from URL
var id = window.location.pathname.split('/').pop();

// Fetch thread data from the backend
fetch(`http://127.0.0.1:5000/api/social-media/get-thread/${id}`)
    .then(async function (response) {
        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData.error);
        } else {
            const thread = await response.json();

            // Populate thread details
            var header = document.getElementById('thread-header');
            var headerHTML = `
                <h4 class="title">${thread.title}</h4>
                <div class="bottom">
                    <p class="timestamp">${new Date(thread.date).toLocaleString()}</p>
                    <p class="comment-count">${thread.comments.length} comments</p>
                    <p class="author">Post by: ${thread.author}</p>
                </div>
            `;
            header.insertAdjacentHTML('beforeend', headerHTML);
            document.getElementById('thread-content').textContent = thread.content;

            // Populate comments
            var commentsContainer = document.querySelector('.comments');
            for (let comment of thread.comments) {
                var commentHtml = `
                    <div class="comment">
                        <div class="top-comment">
                            <p class="user">${comment.author}</p>
                            <p class="comment-ts">${new Date(comment.date).toLocaleString()}</p>
                        </div>
                        <div class="comment-content">${comment.content}</div>
                    </div>
                `;
                commentsContainer.insertAdjacentHTML('beforeend', commentHtml);
            }
        }
    })
    .catch(function (error) {
        console.log(error);
    });

// Add new comment
var button = document.getElementById('add-comment-btn');
button.addEventListener('click', function() {
    var txt = document.querySelector('textarea');
    var comment = {
        content: txt.value,
        date: new Date().toISOString(),
        author: 'Benny' // Replace with dynamic author if available
    };

    // Add comment to backend
    fetch(`http://127.0.0.1:5000/api/social-media/add-comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            post_id: id,
            content: comment.content,
            date: comment.date
        })
    })
    .then(async function (response) {
        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData.error);
        } else {
            // Add comment to frontend dynamically
            var commentsContainer = document.querySelector('.comments');
            var commentHtml = `
                <div class="comment">
                    <div class="top-comment">
                        <p class="user">${comment.author}</p>
                        <p class="comment-ts">${new Date(comment.date).toLocaleString()}</p>
                    </div>
                    <div class="comment-content">${comment.content}</div>
                </div>
            `;
            commentsContainer.insertAdjacentHTML('beforeend', commentHtml);
            txt.value = ''; // Clear textarea
        }
    })
    .catch(function (error) {
        console.log(error);
    });
});