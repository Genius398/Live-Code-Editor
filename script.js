
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
console.debug("Loading...");
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
  var frame = document.getElementById("console").contentWindow.document;
  frame.open();
  frame.write(string);
  frame.close();
}
function showPreview() {
  console.clear()
  frame = document.getElementById("console").contentWindow.document;
  frame.open();
  frame.write("");
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
      updateConsole();
    };
    console.error = function (message) {
      loglist.push({ data: message, type: "error", sender: "parent" });
      updateConsole();
    };
    console.warn = function (message) {
      loglist.push({ data: message, type: "warning", sender: "parent" });
      updateConsole();
    };
    console.info = function (message) {
      loglist.push({ data: message, type: "information", sender: "parent" });
      updateConsole();
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
    window.onerror = function (msg, url, line) {
      if (msg == "[IFRAME ERROR MESSAGE]") {
          return true
      }
      else {
          //do nothing
      }
  }
    ` +
    document.getElementById("jsCode").value +
    `
    loglist = undefined
    delete(loglist)
    ` +
    "</script>";
  var frame = document.getElementById("preview-window").contentWindow.document;
  frame.open();
  frame.write(htmlCode + cssCode + jsCode);
  frame.close();
  document.getElementById("preview-window").contentWindow.onerror = function (
    error,
    url,
    line,
    column,
    errorType
  ) {
    console.error(
      error + "\nat " + url + ":" + line + ":" + column + "\ntype: " + errorType
    );
  };
  document.getElementById("preview-window").contentWindow.onerror = function (
    error,
    url,
    line,
    column,
    errorType
  ) {
    console.error(
      error + "\nat " + url + ":" + line + ":" + column + "\ntype: " + errorType
    );
  };
  updateConsole();
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
    showPreview();
  });
}

window.onerror = function (error, url, line, column, errorType) {
  console.error(
    error + "\nat " + url + ":" + line + ":" + column + "\ntype: " + errorType
  );
};
