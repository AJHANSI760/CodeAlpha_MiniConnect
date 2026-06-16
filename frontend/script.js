async function createPost() {

    const content = document.getElementById("content").value;

    if (content.trim() === "") {
        alert("Please enter a post");
        return;
    }

    const response = await fetch(
        "http://localhost:5000/api/posts/create",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: "6a3123f272ee9de418950c0d",
                content: content
            })
        }
    );

    if (response.ok) {

        document.getElementById("content").value = "";

        loadPosts();
    }
}

async function loadPosts() {

    const response =
        await fetch("http://localhost:5000/api/posts");

    const posts = await response.json();
    document.getElementById("postCount").innerText =
`Total Posts: ${posts.length}`;

    const container =
        document.getElementById("posts");

    container.innerHTML = "";

    posts.reverse().forEach(post => {

        container.innerHTML += `
        <div class="post-card">

            <div class="post-header">
                👤 Jhansi
            </div>

            <p>${post.content}</p>

            <button onclick="likePost('${post._id}')">
                ❤️ ${post.likes}
            </button>

            <br><br>

            <input
                type="text"
                id="comment-${post._id}"
                placeholder="Write a comment..."
            >

            <button onclick="addComment('${post._id}')">
                Comment
            </button>

            <div class="comments">

                ${
                    post.comments
                    ? post.comments.map(comment =>
                        `<p>💬 ${comment.text}</p>`
                    ).join("")
                    : ""
                }

            </div>

        </div>
        `;
    });
}

async function likePost(id) {

    await fetch(
        `http://localhost:5000/api/posts/like/${id}`,
        {
            method: "PUT"
        }
    );

    loadPosts();
}

async function addComment(id) {

    const comment =
        document.getElementById(`comment-${id}`).value;

    if (comment.trim() === "") {
        alert("Please enter a comment");
        return;
    }

    await fetch(
        `http://localhost:5000/api/posts/comment/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: comment
            })
        }
    );

    loadPosts();
}

function logout() {

    alert("Logged Out Successfully");

    window.location.href = "login.html";
}

window.onload = loadPosts;