function addThread(thread) 
{
    const threadUrl = socialMediaThreadUrl.replace('0', thread.id);
    var html = `
        <li class="row">
            <a href="${threadUrl}" class="external">
                <h4 class="title">${thread.title}</h4>
                <div class="bottom">
                    <p class="timestamp">${new Date(thread.date).toLocaleDateString()}</p>
                    <p class="comment-count">${thread.comments} comments</p>
                </div>
            </a>
        </li>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

var container = document.querySelector('ol');

// Get existing thread data from the backend
fetch("http://127.0.0.1:5000/api/social-media/get-timeline-data")
    .then(async function (response) {
        if (!response.ok) {
            const response_1 = await response.json();
            console.log(response_1.error);
        }
        else {
            const threads = await response.json();

            for (let thread of threads) {
                addThread(thread);
            }
        }
    })
    .catch(function(error) {
        console.log(error);
    });


var button = document.getElementById('create-thread-btn');
button.addEventListener('click', function(){
    var title = document.getElementById('thread-title');
    var content = document.getElementById('thread-content');
    console.log(title.value);
    console.log(content.value);
    var thread = {
        id: threads.length + 1,     // Dependent on data.js
        title: title.value,
        author: "Benny",
        date: Date.now(),
        content: content.value,
        comments: []
    };

    // Add thread to the database
    fetch("http://127.0.0.1:5000/api/social-media/add-new-thread", {
        headers: {"Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify(thread),
    })
    .then(async function (response) {
        if (!response.ok) {
            const response_1 = await response.json();
            console.log(response_1.error);
        }
        else {
            const status = await response.json();
            console.log(status.message);

            // Add thread dynamically
            addThread(thread);
        }
    })
    .catch(function(error) {
        console.log(error);
    });
});