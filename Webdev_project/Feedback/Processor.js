var form_data = location.search;
var checking = document.getElementById("data");
form_data = form_data.substring(1, form_data.length);

while (form_data.indexOf("+") != -1) {
  form_data = form_data.replace("+", " ")
}

form_data = unescape(form_data)
var form_array = form_data.split("&");

for (var i = 0; i < 8; i++) {
  var item = form_array[i].split("=")
  checking.innerHTML += '<p class='+item[0]+'>Your ' + item[0] + ' is <span class="input">' + item[1] + '</span></p>'
}

// Edit
document.getElementById("edit").setAttribute("href", "Feedback.html" + location.search)

function verification() {
  document.getElementById("checking").remove()
  temp = document.getElementById("ver")
  temp.classList.remove("display");
  var name = form_array[2].split("=")
  var rating = form_array[0].split("=")
  document.getElementById("name").innerText = name[1]
  if (Number(rating[1]) <= 4) {
    document.getElementById("rating").innerText = "We aim to satifiy you next time!"
  }
  else {
    document.getElementById("rating").innerText = "We hope you will continue to enjoy shopping here"
  }
}

function edit() {
  document.getElementById("edit").setAttribute("herf", "Feedback.html" + location.search)
}
