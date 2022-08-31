// write your code here

// Invoke all the functions nested when the browser loads
document.addEventListener('DOMContentLoaded', () => {
    clickListener();
    getImage();
    passComments();
})

// fetch image from Json file through its url and passing back to my DOM
const getImage = () => {
    return fetch(`  http://localhost:8000/images`)
        .then((res) => res.json())
        .then((object) => {
            document.getElementById('card-title').textContent = object.title
            document.querySelector('#card-image').src = object.image
        })
        .catch((error) => error('message'))
}

// Listens to click event when the liker glyphy is clicked and invokes the addLikes to perform incremement
const clickListener = () => {
    let liked = document.querySelector('#like-button')
    liked.addEventListener('click', () => {
        addLikes();
    })
}

const addLikes = () => {
    let likeCount = document.querySelector('#like-count')
    likeCount.innerHTML = `${parseInt(likeCount.innerText) + 1} likes`
}

// get comments by passing /comments to our base url http://localhost:3000 and iterating through the comments object
// appends the iteration results to the newly created lists using the map method
const passComments = () => {
    fetch(` http://localhost:8000/comments`)
        .then((res) => res.json())
        .then((comments) => {
            comments.forEach((comment) => { //loops through each comment in comments and maps it to our new list
                document.getElementById('comments-list').innerHTML = comments.map((comment) => `<li>${comment.content}</li>`)
                    .join(' ');
            });
        });
}

// appends our new comments that user types into our comments form field and updates it with the ones from db.json
const commentCallBack = (commentor) => {
    let ul = document.createElement('li')
    ul.textContent = `${commentor}`
    document.querySelector('#comments-list').appendChild(ul)
}

// selects the form placeholser and listens for a submit event, prevent the form from calling itself and calls our commentCallBack function passing it to the target.
document.querySelector('#comment-form').addEventListener('submit', (e) => {
    e.preventDefault()
    commentCallBack(e.target.comment.value)
})