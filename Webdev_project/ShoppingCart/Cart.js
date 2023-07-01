var computer = document.getElementById("computer");

// add into cart desktop
function process() {
  var list = {};

  // amount and name of product
  list.amount = 1;
  list.name = (document.getElementById("chasis").getAttribute('name'))
  list.color = (document.getElementById("chasis").getAttribute('class'))
  list.cost = (document.getElementById("cost").innerHTML)


  // check if they are ticked, fetch the value and input them into list
  for (var i = 0; i < computer.getElementsByTagName("input").length; i++) {
    var name = document.getElementsByTagName("input")[i].getAttribute('name');
    if (document.getElementsByTagName("input")[i].checked) {
      list[name] = (document.getElementsByTagName("input")[i].value)
    }
  }

// see which key is free
  for (var x = 0; true ; x++) {
    var keys = "desktop" + x;
    var same = false;
    for (var i = 0; i < sessionStorage.length; i++) {
      number = Object.keys(sessionStorage)[i];
      if (number == keys) {
        var same = true
      }
      if (same == true) {
        break;
      }
    }
    if (same == false) {
      break;
    }
  }
  sessionStorage.setItem("desktop" + x, JSON.stringify(list))
}


// display cart
function display() {
  for (var i = 0; i < sessionStorage.length; i++) {
    item = Object.values(sessionStorage)[i];
    item = JSON.parse(item);
    type = Object.keys(sessionStorage)[i]
    type_left = type+"left";
    type_right = type+"right";
    document.getElementById("cart").innerHTML += "<div id='" + type + "'><table><tr class='left'><td id='" + type_left + "'></td></tr><tr class='right'><td id='" + type_right + "'></td></tr></table></div>"


    // name
    var spec = Object.values(item)[1];
    document.getElementById(type_left).innerHTML += '<p class="name">' + spec + '</p>'

    // img
    var spec = Object.values(item)[2];
    document.getElementById(type_left).innerHTML += '<img src="../Image/' + spec + '.jpg" alt="" draggable=false>'

    // cost
    var temp = JSON.parse(sessionStorage.getItem(type));
    cost = (temp.cost / temp.amount)
    var spec = Object.values(item)[3];
    var part = Object.keys(item)[3];
    var part = part.charAt(0).toUpperCase() + part.slice(1);
    document.getElementById(type_left).innerHTML += '<p class="sub_cost">' + part + ': SGD ' + cost.toFixed(2) + '</p>'

    // hide specs button
    document.getElementById(type_right).innerHTML += '<p class="sub_title">SPECIFICATIONS</p>'
    document.getElementById(type_right).innerHTML += '<button type="button" onclick="hide(this)">Hide / Show</button>'

    // specs
    for (var x = 4; x < Object.keys(item).length; x++) {
      var spec = Object.values(item)[x];
      var part = Object.keys(item)[x];
      var part = part.charAt(0).toUpperCase() + part.slice(1);
      document.getElementById(type_right).innerHTML += "<p class='specs'>" + part + ": " + spec + "</p>"
    }

    // amount
    var spec = Object.values(item)[0];
    var part = Object.keys(item)[0];
    document.getElementById(type_left).innerHTML += '<p class="amounts">Amount: </p><button type="button" class="decrease" onclick="decrease(this)">-</button>'
    document.getElementById(type_left).innerHTML += '<p class="amount">' + spec + '</p>'
    document.getElementById(type_left).innerHTML += '<button type="button" class="increase" onclick="increase(this)">+</button>'

    // cost
    var spec = Number(Object.values(item)[3]);
    var part = Object.keys(item)[3];
    document.getElementById(type_left).innerHTML += '<p class="cost">Total: SGD <span class="price">' + spec.toFixed(2) + '</span></p>'

    // delete button
    document.getElementById(type_left).innerHTML += '<button type="button" class="delete" onclick="del(this)">Delete</button>'
    document.getElementById(type).innerHTML += "<hr>"
  }
}

// delete item
function del(ele) {
  var item = ele.parentElement.parentElement.parentElement.parentElement.parentElement;
  var ids = item.id;
  item.remove();
  sessionStorage.removeItem(ids);
  check();
}

// delete all
function delall() {
  var items = document.getElementById("cart").getElementsByTagName("div")
  var temp = items.length;
  for (var i = 0; i < temp; i++) {
    var ids = items[0].id;
    items[0].remove();
    sessionStorage.removeItem(ids)
  }
  check()
}

// hide specs
function hide(ele) {
  var items = ele.parentElement.querySelectorAll(".specs");
  items.forEach(item => {
    item.classList.toggle("hide")
  })
}

// increase / decrease amount
function increase(ele) {
    var item = ele.parentElement.parentElement.parentElement.parentElement.parentElement;
    var ids = item.id;
    var temp = JSON.parse(sessionStorage.getItem(ids));
    temp.cost = (temp.cost / temp.amount) * (temp.amount + 1);
    temp.amount = temp.amount + 1
    var spec = Object.values(temp)[0];
    var part = Object.keys(temp)[0];
    item.getElementsByClassName("amount")[0].innerHTML =  spec
    var spec = Object.values(temp)[3];
    var part = Object.keys(temp)[3];
    item.getElementsByClassName("cost")[0].innerHTML = '<p class="cost">Total: SGD <span class="price">' + spec.toFixed(2) + '</span></p>'
    var temp = JSON.stringify(temp)
    sessionStorage.setItem(ids, temp)
    check()
}

function decrease(ele) {
    var item = ele.parentElement.parentElement.parentElement.parentElement.parentElement;
    var ids = item.id;
    var temp = JSON.parse(sessionStorage.getItem(ids));
    if (temp.amount > 1) {
      temp.cost = (temp.cost / temp.amount) * (temp.amount - 1);
      temp.amount = temp.amount - 1
      var spec = Object.values(temp)[0];
      var part = Object.keys(temp)[0];
      item.getElementsByClassName("amount")[0].innerHTML = spec
      var spec = Object.values(temp)[3];
      var part = Object.keys(temp)[3];
      item.getElementsByClassName("cost")[0].innerHTML = '<p class="cost">Total: SGD <span class="price">' + spec.toFixed(2) + '</span></p>'
      var temp = JSON.stringify(temp)
      sessionStorage.setItem(ids, temp)
      check()
    }
}

// check if there is any products left
function check() {
  var temp = document.getElementById("cart");
  if (temp.children.length == 0) {
    no_items()
  }
  else {
    total()
  }
}

// totaling up the cost
function total() {
  var area = document.getElementById("sub_total");
  var prices = document.querySelectorAll(".price");
  var total = 0;
  for (var i = 0; i < prices.length; i++) {
    total += Number(prices[i].innerHTML);
    area.innerHTML = total.toFixed(2);
  }
}

// if there is no items in cart
function no_items() {
  var temp = document.getElementById("shopping_cart");
  var body = document.querySelector(".body")
  temp.remove()
  body.innerHTML += '<div class="no_items"><hr><p>There are no item in your cart.</p><hr><p class="link"><a href="../Home/Homepage.html" class="link">Continue Shopping</a></p></div>'
}

function purchase() {
  alert("Thank you for purchaseing!")
  sessionStorage.clear()
}
