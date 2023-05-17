// объявляем переменные из html
const postTitleInputNode = document.querySelector('.js-title-post');
const postTextInputNode = document.querySelector('.js-text-post');
const newPostBtnNode = document.querySelector('.js-send-btn');
const postsNode = document.querySelector('.js-posts');

// объявляем объект в котором описана структура нашего содержания
// let post = {
//     title: '',
//     text: '',
// };
// перезаписываем наш объект на массив, который будет содержать объекты
const posts = [];

// обработчик события по клику
newPostBtnNode.addEventListener('click', function() {
    const postFromUser = getPostFromUser();

    addPost(postFromUser);

    renderPosts();
})

// функция получения данных от пользователя
function getPostFromUser() {
    // переменные, которые получают значения из полей ввода
    const today = new Date();
    let date = today.toLocaleString();
    console.log(date);
    const title = postTitleInputNode.value;
    const text = postTextInputNode.value;
    // возвращение из функции в структуру объекта
    return {
        date: date,
        title: title,
        text: text,
    };
}

// функция возращения 
// перезаписываем на добавление поста, чтобы в массив записывался пост, в параметры записываем ключи из объекта
function addPost({ date, title, text}) {
    // прописываем структуру, которая будет записываться в массив
    posts.push({
        date,
        title,
        text
    })
}

// функция возращения объекта, для дальнейшего к нему обращения
function getPosts() {
    return posts;
}

// функция размещения содержания поста в структуру html
function renderPosts() {
    // объявляем переменную, чтобы внутри фукнции обратиться к объекту снаружи
    const posts = getPosts();

    // объявляем переменную для записи туда содержания
    let postsHTML = '';

    posts.forEach(post => {
       postsHTML += `
    <div class="post">
        <p class="post__date">${post.date}</p>
        <p class="post__title">${post.title}</p>
        <p class="post__text">${post.text}</p>
    </div>
    `;
    });

    // меняем структуру html в post
    postsNode.innerHTML = postsHTML;
}