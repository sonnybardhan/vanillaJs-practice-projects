const postContainer = document.getElementById('post-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');
filter.addEventListener('input', filterPosts);

let limit = 3;
let page = 1;

//fetch posts
async function getPosts() {
  console.log('fetching posts ... ');
  // await loading.classList.add('show');
  loading.classList.add('show');
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();
  await loading.classList.remove('show');

  return data;
}

// getPosts

async function displayPosts() {
  const posts = await getPosts();
  posts.forEach((post) => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
			<div class="number">${post.id}</div>
			<div class="post-info">
				<h2 class="post-title">${post.title}</h2>
				<p class="post-body">
					${post.body}
				</p>
			</div>
			`;
    postContainer.append(postEl);
  });
}

function filterPosts(e) {
  const term = e.target.value.toLowerCase();
  const posts = document.querySelectorAll('.post');

  posts.forEach((post) => {
    const title = post.querySelector('.post-title').innerText.toLowerCase();
    const body = post.querySelector('.post-body').innerText.toLowerCase();

    if (title.includes(term) || body.includes(term)) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
  return;
}

//show loader and fetch more posts
function showLoader() {
  loading.classList.add('show');
  page++;
  displayPosts();
}

displayPosts();

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  // console.log(scrollTop, scrollHeight, clientHeight);
  if (scrollTop + clientHeight >= scrollHeight - 10) {
    console.log('load more');
    showLoader();
  }
});
