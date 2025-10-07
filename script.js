// setInterval(() => location.reload(), 0);

// setInterval(async () => {
//   const res = await fetch('http://localhost:4000/register');
//   const data = await res.json();
//   console.log(data);
// }, 0);

// setInterval(async () => {
//   const res = await fetch('http://localhost:4000');
//   const data = await res.json();
//   console.log(data);
// }, 0);

const button = document.querySelector('button');

button.addEventListener('click', (e) => {
  e.preventDefault();
  fetch('http://localhost:4000/register');
});
