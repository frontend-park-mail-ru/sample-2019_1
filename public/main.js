console.log('lorem ipsum');

const h1 = document.getElementsByTagName('h1')[0];

function click() {
  console.log('kek');

  h1.innerText = h1.innerText === 'Frontend' ? 'Hello, World!' : 'Frontend';
}

const button = document.getElementsByTagName('button')[0];
button.addEventListener('click', click);
