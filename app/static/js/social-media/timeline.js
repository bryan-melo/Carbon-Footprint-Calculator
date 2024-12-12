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
    container.insertAdjacentHTML('afterbegin', html);
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
    }
);


document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('create-thread-btn');
    
    if (button) {
        button.addEventListener('click', function() {
            var title = document.getElementById('thread-title');
            var content = document.getElementById('thread-content');

            // User data
            const userData = localStorage.getItem('userData');
            const user = JSON.parse(userData);

            // Prep user data
            const accountId = user.accountId;

            var thread = {
                accountId: accountId,
                title: title.value,
                date: new Date(),
                content: content.value,
            };

            // Add thread to the database
            fetch("http://127.0.0.1:5000/api/social-media/add-new-thread", {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify(thread),
            })
            .then(async function(response) {
                if (!response.ok) {
                    const response_1 = await response.json();
                    console.log(response_1.error);
                } else {
                    const status = await response.json();
                    console.log(status.message);

                    // Update the thread with the new ID from the backend
                    thread.id = status.thread_id;

                    // Add thread dynamically
                    addThread(thread);
                }
            })
            .catch(function(error) {
                console.log(error);
            });
        });
    } 
});