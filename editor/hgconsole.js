var ca = document.getElementById("consoleInnards");
ca.style.height = "800px";
var hgc = {
  log: function (string) {
    var date = new Date();
    var h = date.getHours().toString();
    var m = date.getMinutes().toString();
    var s = date.getSeconds().toString();
    var ms = date.getMilliseconds().toString();
    if (m < 10) {
      m = new String("0") + m;
    }
    if (s < 10) {
      s = new String("0") + s;
    }
    ca.addHTML(`<p>${h}:${m}:${s}.${ms}|LOG: ${string}</p>`);
  },
  warn: function (string) {
    var date = new Date();
    var h = date.getHours().toString();
    var m = date.getMinutes().toString();
    var s = date.getSeconds().toString();
    var ms = date.getMilliseconds().toString();
    if (m < 10) {
      m = new String("0") + m;
    }
    if (s < 10) {
      s = new String("0") + s;
    }
    ca.addHTML(`<p style="color: #EFB028;">${h}:${m}:${s}.${ms}|WARN: ${string}</p>`);
    console.warn(string);
  },
  error: function (string) {
    var date = new Date();
    var h = date.getHours().toString();
    var m = date.getMinutes().toString();
    var s = date.getSeconds().toString();
    var ms = date.getMilliseconds().toString();
    if (m < 10) {
      m = new String("0") + m;
    }
    if (s < 10) {
      s = new String("0") + s;
    }
    ca.addHTML(`<p style="color: #FF0000;">${h}:${m}:${s}.${ms}|ERROR: ${string}</p>`);
    throw new Error(string);
  },
  clear: function () {
    var choice = window.confirm("Do you really want to clear the console?");
    if (choice) {
      ca.innerHTML = '';
    } else {
      return;
    }
  }

}
var listenToKey = function (event) {
  var k = event.keyCode;
  if (k == 99 || k == 67) {
    hgc.clear;
  }
}
