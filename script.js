function showPreview() {
	var htmlCode = document.getElementById("htmlCode").value;
	var cssCode = "<style>" + document.getElementById("cssCode").value + "</style>";
	var jsCode = '<script type="text/javascript">' + document.getElementById("jsCode").value + "</script>";
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
		html.value = '';
		css.value = '';
		js.value = '';
		showPreview();
	})
}

function loadSampleCode() {
	html = document.getElementById("htmlCode");
	css = document.getElementById("cssCode");
	js = document.getElementById("jsCode");

    html.value = 
    '<html> <head> <title>Welcome to the website!</title> </head> <body><h1>Write your header here</h1> <h2>Write your subtitle/website content here.</h2> </body> </html>';

	css.value = 'h1{font-size:50px;}';

	showPreview();


}
