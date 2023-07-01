function color(ele) {
  var color = ele.getAttribute("color")
  ele.parentElement.parentElement.setAttribute("class", color)
  var img = document.getElementById("desktop_img").setAttribute("src", "../../Image/"+color+".jpg")
}
