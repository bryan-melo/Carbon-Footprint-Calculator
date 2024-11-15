var id = window.location.pathname.split('/').pop();
var thread = threads.find(t => t.id == id);
console.log(thread);
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

function addComment(comment)
{
    var commentHtml = `
        <div class="comment">
            <div class="top-comment">
                <p class="user">${comment.author}</p>
                <p class="comment-ts">${new Date(comment.date).toLocaleString()}</p>
            </div>
            <div class="comment-content">${comment.content}</div>
        </div>
    `;
    comments.insertAdjacentHTML('beforeend', commentHtml);
}

var comments = document.querySelector('.comments');
for (let comment of thread.comments) {
    addComment(comment);
}

var button = document.getElementById('add-comment-btn');
button.addEventListener('click', function(){
    var txt = document.querySelector('textarea');
    var comment = {
        content: txt.value,
        date: Date.now(),
        author: 'Benny'
    }
    addComment(comment);
})