const selected = document.querySelector(".contact__rights");
const aside = document.querySelector("aside");
const nav = document.querySelector("#navbar");
console.dir(aside);
console.dir(selected);


// selected.addEventListener("click", () => {
//     console.log("I'm clicked");
// })

selected.onclick = () => {
    console.log("I`mmmmmmm clicked");
    console.log(nav)
    window.focus(nav);
};

console.dir(window);
console.dir(document);