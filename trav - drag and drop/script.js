const draggableList = document.getElementById('draggable-list');
const check = document.getElementById('check');
// const nums = [1,2,3,4,5,6,7,8,9];
const players = [
  'Cristiano Ronaldo',
  'Sadio Mane',
  'Karim Benzema',
  'Mohamed Salah',
  'Harry Kane',
  'Erling Haaland',
  'Kylian Mbappe',
  'Kevin De Bruyne',
  'Robert Lewandowski',
  'Lionel Messi',
];

const list = [];
let randomisedList = [];

function createLis() {
  // [...players].forEach((player, idx) => {
  randomise().forEach((player, idx) => {
    const li = document.createElement('li');
    const text = `${idx + 1}: ${player}`;
    li.textContent = text;

    li.setAttribute('data-index', idx);

    li.innerHTML = `
        <div class='draggable' draggable='true'>
          <p class='player-name'>${text}</p>
        </div>
		`;
    list.push(li);
  });

  draggableList.append(...list);
}

function randomise() {
  return [...players]
    .map((player) => ({ player, sortValue: Math.random() }))
    .sort((a, b) => a.sortValue - b.sortValue)
    .map((playerObj) => playerObj.player);
}

createLis();
// randomise();
