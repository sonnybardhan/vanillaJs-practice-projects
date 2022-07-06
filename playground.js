import fetch from 'node-fetch';

// fetch('https://jsonplaceholder.typicode.com/todos/1')
//   .then((response) => response.json())
//   .then((json) => console.log(json));

fetch('https://api.frontendexpert.io/api/fe/questions')
  .then((response) => response.json())
  .then((json) => console.log(json));
