// make it so that amd cpu cannot be with intel motherboard
function amd() {
  var div = document.getElementById("cpu")
  var current = document.getElementById("cpu").getAttribute("class")
  if (current == "intel") {
    div.classList.remove("intel");
    div.classList.add("amd");
    document.querySelectorAll("#motherboard .intel input").forEach(ele => {ele.parentElement.style.pointerEvents = "none"; ele.checked = false; ele.parentElement.classList.add("na")});
    document.querySelectorAll("#motherboard .amd").forEach(ele => {ele.style.pointerEvents = "all"; ele.classList.remove("na")});
    document.querySelectorAll("#motherboard .amd .defult")[0].checked = true;
  }
}

function intel() {
  var div = document.getElementById("cpu")
  var current = document.getElementById("cpu").getAttribute("class")
  if (current = "amd") {
    div.classList.remove("amd");
    div.classList.add("intel");
    document.querySelectorAll("#motherboard .amd input").forEach(ele => {ele.parentElement.style.pointerEvents = "none"; ele.checked = false; ele.parentElement.classList.add("na")});
    document.querySelectorAll("#motherboard .intel").forEach(ele => {ele.style.pointerEvents = "all"; ele.classList.remove("na")});
    document.querySelectorAll("#motherboard .intel .defult")[0].checked = true;
  }
}


function update() {
  var divs = document.getElementById("computer").getElementsByTagName("div");
  var price = 0;
  var cost = 0;
  var changes = 0;
  for (var i = 0; i < divs.length; i++) {
    var input = divs[i].getElementsByTagName("input")

    // update the total cost
    var cost = Number(document.getElementById("cost").innerText);
    for (var y = 0; y < input.length; y++) {
      if (input[y].checked) {
        var changes = Number(input[y].getAttribute("cost"));
      }
    }
    var cost = cost + changes;
    document.getElementById("cost").innerHTML = cost.toFixed(2);

    // update the cost of items
    for (var x = 0; x < input.length; x++) {
      var price = Number(input[x].getAttribute("cost"));
      price = price - changes;
      input[x].setAttribute("cost", price)
    }
  }
  display_cost();
}

// display the cost
function display_cost() {
  input = document.getElementsByTagName("input")
  for (var i = 0; i < input.length; i++) {
    var temp = input[i].parentElement;
    var cost = Number(input[i].getAttribute("cost"))
    var changes = temp.getElementsByTagName("p")[0];
    changes.innerHTML = "(+SGD"+cost.toFixed(2)+")";
  }
}

// make the right side look good
function scroll() {
  if (window.innerWidth > 1200) {
    var top = 200 + window.pageYOffset;
    document.getElementById('right').setAttribute('style', "position: absolute; top: " + top + "px;")
  }
  else {
    document.getElementById('right').removeAttribute('style')
  }
}

window.addEventListener('resize', scroll());
