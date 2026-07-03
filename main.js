const section1 = document.querySelector(".intro")
const section2 = document.querySelector(".wish")
const section3 = document.querySelector(".flowers")
const section4 = document.querySelector(".ltr")
const section5 = document.querySelector(".mem")

function toggle(dis, en){
    dis.classList.add("disable")
    en.classList.remove("disable")
}