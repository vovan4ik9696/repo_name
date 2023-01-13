const searchTab = document.querySelector('.search__input');
const searchList = document.querySelector('.search__list');
const searchChoised = document.querySelector('.search__choised');

function createRepo(repo, className) {
	const li = document.createElement('li');
	li.textContent = repo.name;
	li.classList.add(className);
	searchList.appendChild(li);
	li.addEventListener('click', () => {
		choiceRepo(repo);
	})
}

function choiceRepo(repo) {
	searchList.innerHTML = '';
	searchTab.value = '';

	const li = document.createElement('li');
	const div = document.createElement('div');
	div.classList.add('search__text')

	li.appendChild(div);
	li.classList.add('search__item');

	div.insertAdjacentHTML('beforeend', `<p>Name: ${repo.name}</p>`);
	div.insertAdjacentHTML('beforeend', `<p>Owner: ${repo.owner.login}</p>`);
	div.insertAdjacentHTML('beforeend', `<p>Stars: ${repo.stargazers_count}</p>`);
	li.insertAdjacentHTML('beforeend', `<div class="search__close"></div>`);

	searchChoised.appendChild(li);

	const closeBtns = document.querySelectorAll('.search__close');

	closeBtns.forEach(btn => btn.addEventListener('click', (e) => console.log(e.target.parentElement.remove())))
}

async function searchRepo() {
	const url = `https://api.github.com/search/repositories?q=${searchTab.value}&per_page=5`;
	const response = await (await fetch(url)).json();
	searchList.innerHTML = ''

	response.items.forEach(item => {
		createRepo(item, 'search__repo');
	})
}

const debounce = (fn, debounceTime) => {
	let timer;
	return function (...args) {
		clearTimeout(timer);
		timer = setTimeout(() => {
			fn.apply(this, args);
		}, debounceTime)
	}
};

searchTab.addEventListener('input', debounce(searchRepo, 1000));