// dropdown bars
document.querySelector("#desktop").addEventListener('mouseover', ()=>{
  document.querySelector("#desktop").classList.add("open");
});
document.querySelector("#desktop").addEventListener('mouseout', ()=>{
  document.querySelector("#desktop").classList.remove("open");
});


/* Hamburger menu */
document.querySelector(".hamburger").addEventListener("click", ()=>{
  document.querySelector("header ul").classList.toggle("list");
  document.querySelector(".hamburger").classList.toggle("toggle");
})

const img = document.querySelectorAll('img')
  img.forEach(temp => {
    temp.setAttribute("draggable", false)
  });
