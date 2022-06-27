const grid = document.querySelector('.grid');
const result = document.querySelector('.result');
const btn = document.querySelector('.btn');
const overlay = document.querySelector('.overlay');
const cardArray = [
	{
		name: 'lucky-1',
		img: './images/lucky-1.jpg'
	},
	{
		name: 'lucky-2',
		img: './images/lucky-2.jpg'
	},
	{
		name: 'lucky-3',
		img: './images/lucky-3.jpg'
	},
	{
		name: 'lucky-4',
		img: './images/lucky-4.jpg'
	},
	{
		name: 'lucky-5',
		img: './images/lucky-5.jpg'
	},
	{
		name: 'lucky-6',
		img: './images/lucky-6.jpg'
	},
	{
		name: 'lucky-1',
		img: './images/lucky-1.jpg'
	},
	{
		name: 'lucky-2',
		img: './images/lucky-2.jpg'
	},
	{
		name: 'lucky-3',
		img: './images/lucky-3.jpg'
	},
	{
		name: 'lucky-4',
		img: './images/lucky-4.jpg'
	},
	{
		name: 'lucky-5',
		img: './images/lucky-5.jpg'
	},
	{
		name: 'lucky-6',
		img: './images/lucky-6.jpg'
	}
];
let cardChoosen = [];
let cardsWon = [];
let score;

// вариант алгоритма Фишера - Йетса
function shuffle(arr) {
	let j, temp;
	for (let i = arr.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		temp = arr[j];
		arr[j] = arr[i];
		arr[i] = temp;
	}
	score = 0;
	result.textContent = score;
	createBoard(cardArray);
}

//Создает карточки из данного массива навешивая id, вешает слушатель на карточки
function createBoard(arr) {
	for (let i = 0; i < arr.length; i++) {
		const card = document.createElement('img');
		card.setAttribute('src', './images/wall.jpg');
		card.setAttribute('data-id', i);
		card.addEventListener('click', flipCard);
		card.style.cursor = 'pointer';
		grid.append(card);
	}
}

//Получает карточку по её id находит данные в имени и пути картинки и применяет их к нужной картинке. Но сначала проверяет нужно ли записывать курточку в сравнение. Так если карточка одна и таже (проверяет по id) попросит сделать другой выбор иначе отправит на сравнение.
function flipCard() {
	const cardId = this.getAttribute('data-id');
	const nameCard = cardArray[cardId].name;
	const imgCard = cardArray[cardId].img;
	this.setAttribute('src', imgCard);
	switch (cardChoosen.length) {
		case 0:
			cardChoosen.push({ name: nameCard, cardId: cardId });
			score++;
			break;
		case 1:
			cardChoosen[0].cardId == cardId ?
			alert('выбери другое')
			: 
			(cardChoosen.push({ name: nameCard, cardId: cardId }), setTimeout(cardCheck, 200));
			break;
	}
}

//Проверяет карточки по имени: если совпали отправляет в массив верных карточеки удаляет у них определенные стили и слушатели; если карточки не совпали очищает массив сравнения и обратно меняет картинку
function cardCheck() {
	const card = document.querySelectorAll('img');
	const oneId = cardChoosen[0].cardId;
	const twoId = cardChoosen[1].cardId;
	result.textContent = score;

	if (cardChoosen[0].name == cardChoosen[1].name) {
		cardChoosen = [];
		cardsWon.push(oneId);
		card[oneId].removeEventListener('click', flipCard);
		card[twoId].removeEventListener('click', flipCard);
		card[oneId].style.cursor = 'auto';
		card[twoId].style.cursor = 'auto';
		cardsWon.length == cardArray.length / 2 && (overlay.style.display = 'flex')
	} else {
		cardChoosen = [];
		card[oneId].setAttribute('src', './images/wall.jpg');
		card[twoId].setAttribute('src', './images/wall.jpg');
	}
}

//Сбрасывает все и начинает игру сначала
function restart() {
	grid.innerHTML = '';
	cardChoosen = [];
	cardsWon = [];
	overlay.style.display = 'none';
	shuffle(cardArray);
}

btn.addEventListener('click', restart);

shuffle(cardArray);
//cardArray.sort(() => 0.5 - Math.random());