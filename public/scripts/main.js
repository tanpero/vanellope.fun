document.addEventListener("DOMContentLoaded", () => document.querySelector(".loader").style.display = "none")

const heading = document.querySelector('.banner')

const typewriter = new Typewriter(heading, {
  loop: true,
  delay: 75,
});

const blue = "#66d9ef"
const green = "#a6e22e"
const yellow = "#e6db74"
const red = "#f92772"
const s = color => `<span style="color: ${color}">`
const c = (word, color) => s(color) + word + "</span>"

typewriter
  .pauseFor(1500)
  .typeString(`${c("Futamura1", blue)} ${c("::", yellow)} ${c("Program", green)} ${s(red)}-> ${c("Interpreter", green)} ${s(red)}-> ${c("Compiler", green)}`)
  .pauseFor(500)
  .deleteChars(39)
  .typeString(`${c("2", blue)} ${c("::", yellow)} ${c("Interpreter", green)} ${s(red)}-> ${c("Compiler", green)} ${s(red)}-> ${c("Compiler", green)}`)
  .pauseFor(500)
  .deleteChars(40)
  .typeString(`${c("3", blue)} ${c("::", yellow)} ${c("Compiler", green)} ${s(red)}-> ${c("Compiler", green)} ${s(red)}-> ${c("Compiler", green)}`)
  .pauseFor(1000)
  .start();

async function fetchBlogs() {
  const response = await fetch('/blogs');
  const blogs = await response.json();
  const blogArea = document.querySelector('.blog-area');
  blogArea.innerHTML = '';
  for (const id in blogs) {
    const titleResponse = await fetch(`/blogs/${id}/title`);
    const titleText = await titleResponse.text();
    blogArea.innerHTML += `
    <div class="blog-card">
      <h2>${titleText}</h2>
    </div>`
  }
}

fetchBlogs();

