const STANDART_CONTENT_TITLE = 'Рекомендуемая длина заголовка: 100 символов';
const STANDART_CONTENT_TEXT = 'Рекомендуемая длина поста: 200 символов';
const VALUE_TITLE_OUTSIDE = 'Заголовок больше 100 символов';
const VALUE_TEXT_OUTSIDE = 'Пост больше 200 символов';
// достаем все нужные нам элементы в html файлаи записываем их в константы
const inputTitle = document.querySelector('.js-title-post');
const inputText = document.querySelector('.js-text-post');
const buttonAddPost = document.querySelector('.js-send-btn');
const historyList = document.querySelector('.js-posts');
const inputOutsideTitle = document.querySelector('.js-expenses-symbol-title');
const inputOutsideText = document.querySelector('.js-expenses-symbol-text');
const buttonRemovePosts = document.querySelector('.js-remove-btn');

const posts = [];

inputTitle.addEventListener('keyup', function() {
    getTitleFromUser();
})

inputText.addEventListener('keyup', function() {
    getTextFromUser();
})

buttonAddPost.addEventListener('click', function() {
    const lengthTitle = getTitleFromUser();
    const lengthText = getTextFromUser();

    if (lengthTitle > 100 || lengthText > 200) return;

    clearOutsideText();

    const postFromUser = getValueFromUser();

    addPost(postFromUser);

    renderPosts();
})

buttonRemovePosts.addEventListener('click', function() {
    clearPosts();
})

function getTitleFromUser() {
    let lengthTitle = inputTitle.value.length;

    if (lengthTitle > 100) {
        inputOutsideTitle.innerText = VALUE_TITLE_OUTSIDE;
        inputOutsideTitle.classList.add('red');
    } else {
        inputOutsideTitle.innerText = STANDART_CONTENT_TITLE;
        inputOutsideTitle.classList.remove('red');
    }    
    return lengthTitle;
}
function getTextFromUser() {
    let lengthText = inputText.value.length;

    if (lengthText > 200) {
       inputOutsideText.innerText = VALUE_TEXT_OUTSIDE; 
       inputOutsideText.classList.add('red');
    } else {
        inputOutsideText.innerText = STANDART_CONTENT_TEXT;
        inputOutsideText.classList.remove('red');
    }
    return lengthText;
}

function clearOutsideText() {
    inputOutsideTitle.innerText = '';
    inputOutsideText.innerText = '';
}

function getValueFromUser() {
    const today = new Date();
    let day = today.getDate();
    if (day < 10) day = '0' + day;
    let mount = today.getMonth();
    if (mount < 10) mount = '0' + mount;
    let year = today.getFullYear();
    let hh = today.getHours();
    if (hh < 10) hh = '0' + hh;
    let mm = today.getMinutes();
    if (mm < 10) mm = '0' + mm;

    if (today < 10) today = '0' + today;
    const date = `${day}.${mount}.${year} ${hh}:${mm}`;
    const title = inputTitle.value;
    const text = inputText.value;


    return {
        date: date,
        title: title,
        text: text,
    }; 
}
function clearInput() {
    inputTitle.value = '';
    inputText.value = '';
}
function addPost({ date, title, text}) {
    if (!title || !text) return;

    clearInput();

    posts.push({
        date,
        title,
        text,
    });
}
function getPosts() {
    return posts;
}
function renderPosts() {
    const posts = getPosts();

    let postsHTML = '';

    posts.forEach(post => {
        postsHTML += `
        <div class='post'>
            <p class='post__date'>${post.date}</p>
            <p class='post__title'>${post.title}</p>
            <p class='post__text'>${post.text}</p>
        </div>
    `;
    });

    historyList.innerHTML = postsHTML;
}

function clearPosts() {
    for (let i = 0; i < posts.length; i++) {
        delete(posts[i])
    }
    historyList.innerHTML = 'Тут пока пусто..';
}
