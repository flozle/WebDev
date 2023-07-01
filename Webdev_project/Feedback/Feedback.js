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
  var temp = document.getElementById(item[0])
  if (i != 1) {
    inp_type = temp.querySelector("input").getAttribute("type");
    tempall = temp.querySelectorAll("input");
    if (inp_type == "radio") {
      for (var x = 0; x < tempall.length; x++) {
        if (tempall[x].getAttribute("value") == item[1])
        tempall[x].checked = true;
      }
    }
    else if (inp_type == "text" || inp_type == "email" || inp_type == "number") {
      tempall[0].setAttribute("value", item[1])
    }
  }
  else {
    temp.querySelector("textarea").innerText = item[1];
  }
}
if (form_array.length == 9) {
  document.querySelector("#subscribe input").checked = true
}

document.addEventListener('keypress', function (e) {
    if (e.key === '&') {
    alert("Do not enter '&' into the input fields")
    }
});
