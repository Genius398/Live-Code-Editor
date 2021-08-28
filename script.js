function showPreview() {
	console.clear()
  frame = document.getElementById("console").contentWindow.document;
    frame.open();
  frame.write('');
  frame.close();
  var htmlCode = document.getElementById("htmlCode").value;
  var cssCode =
    "<style>" + document.getElementById("cssCode").value + "</style>";
  var jsCode =
    '<script type="text/javascript">' +
    `
    loglist = [];
console.log = function (message) {
  loglist.push({ data: message, type: "log", sender: "parent" });
  
};
console.error = function (message) {
  loglist.push({ data: message, type: "error", sender: "parent" });
  
};
console.warn = function (message) {
  loglist.push({ data: message, type: "warning", sender: "parent" });
  
};
console.info = function (message) {
  loglist.push({ data: message, type: "information", sender: "parent" });
  
};
function updateConsole() {
  let tempLog = [];
  for (var i in loglist) {
    if (loglist[i].type == "log") {
      tempLog.push("<p><h3>" + loglist[i].data.toString() + "</h3></p>");
    }
    if (loglist[i].type == "error") {
      tempLog.push(
        '<p><h3 style="color:red;"> Error: ' +
          loglist[i].data.toString() +
          "</h3></p>"
      );
    }
    if (loglist[i].type == "warning") {
      tempLog.push(
        '<p><h3  style="color:yellow;"> Warning: ' +
          loglist[i].data.toString() +
          "</p></h3>"
      );
    }
    if (loglist[i].type == "information") {
      tempLog.push(
        '<p><h3  style="color:blue;"> info: ' +
          loglist[i].data.toString() +
          "</p></h3>"
      );
    }
  }
  let string = "";
  for (var i in tempLog) {
    string = string + tempLog[i];
  }
  let frame =
    window.parent.document.getElementById("console").contentWindow.document;
  frame.open();
  frame.write(string);
  window.parent.document.getElementById("console").contentWindow.scrollTo(0,frame.body.scrollHeight);
  frame.close();
}
window.onerror = function (message, url, lineNumber) {
	  loglist.push({ data: message, type: "error", sender: "parent" });
  
}
    ` +
    document.getElementById("jsCode").value + `
    loglist = undefined
    delete(loglist)
    `
    +
    "</script>";
  var frame = document.getElementById("preview-window").contentWindow.document;
  frame.open();
  frame.write(htmlCode + cssCode + jsCode);
  frame.close();
  tick();
}

function tick() {
  const clear = document.querySelector("#clear");
  clear.addEventListener("click", (e) => {
    var html = document.getElementById("htmlCode");
    var css = document.getElementById("cssCode");
    var js = document.getElementById("jsCode");
    html.value = "";
    css.value = "";
    js.value = "";
  });
}
function loadSampleCode() {
	html = document.getElementById("htmlCode");
	css = document.getElementById("cssCode");
	js = document.getElementById("jsCode");

    html.value = 
    '<html> <head> <title>Welcome to the website!</title> </head> <body><h1>Write your header here</h1> <h2>Write your subtitle/website content here.</h2> </body> </html>';

	css.value = 'h1{font-size:50px;}';
}

function runCode(){
  showPreview(); 
  updateConsole();
}