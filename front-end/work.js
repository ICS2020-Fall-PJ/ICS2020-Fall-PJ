var clk = 0, maxclk = 50;
var f = 10, maxf = 50;
var on = 0;
var bar, bar2;
var line, line2;
var data;

var buttonName = ["z1","z2","z3","r1","r2","r3","r4","r5","r6","r7","r8","mi1","mv1","mi2","mv2","mi3","mv3","mi4","mv4","mi5","mv5","mi6","mv6","f1","d1","d2","d3","d4","d5","d6","e1","e2","e3","e4","e5","e6","e7","e8","e9","m1","m2","m3","m4","m5","m6","m7","w1","w2","w3","w4","w5","w6"]; // 52 
//update module

// FFI module begin

/*
function backup_readFile(){ 
	var ffi = require('ffi');
	var get = ffi.Library('./test.so', {
	    '_Z3getv': ['string', []], 
	    '_Z6ed_getv': ['void', []],
	    '_Z6st_getv': ['void', []]
	}); 
	console.log(get._Z6st_getv());
	var id = 0;
    while (1) {
		let a = get._Z3getv();
		let b = get._Z3getv();
		//alert(a), alert(b);
		if (!a[0]) break;
		if (0 <= id && id <= 10) {
			updateButton(id, b); 
		}
		else if (11 <= id && id <= 22) { 
			updateButton(id, a); id++;
			updateButton(id, b); 
		}
		else if (23 <= id && id <= 51) {
			updateButton(id, b); 
		}
		id++; if (id == 52) break;
	}
	console.log(get._Z6ed_getv());
}
*/


function updateData(cycle, buttonID, buttonValue){
	//alert(buttonName[buttonID]), alert(buttonValue);
	data[cycle][buttonID] = buttonValue;
	//alert(data[cycle][buttonID]), alert(buttonValue);
}
function readFile(){ 
	var ffi = require('ffi');
	var get = ffi.Library('./test.so', {
	    '_Z3getv': ['string', []], 
	    '_Z6ed_getv': ['void', []],
	    '_Z6st_getv': ['void', []]
	}); 
	console.log(get._Z6st_getv());
	var id = 0, cycle = 0;
	data = new Array();
	//alert("Start!"); 
    while (1) {
		let a = get._Z3getv();
		let b = get._Z3getv();
		//alert(a), alert(b);
		if (!a[0]) break;
		if (id == 0) data[cycle] = new Array();
		if (0 <= id && id <= 10) {
			updateData(cycle, id, b); 
		}
		else if (11 <= id && id <= 22) { 
			updateData(cycle, id, a); id++;
			updateData(cycle, id, b); 
		}
		else if (23 <= id && id <= 51) {
			updateData(cycle, id, b); 
		}
		id++; 
		if (id == 52) id = 0, cycle++;//, alert(cycle); 
		
	}
	maxclk = cycle - 1;
	console.log(get._Z6ed_getv());
}

function writeFile(fileContent){
	var ffi = require('ffi');
    var post = ffi.Library('./test.so', {
        '_Z4postPc': ['void', ['string']]
    }); 
    console.log(post._Z4postPc(fileContent));
}
function play(){
	var ffi = require('ffi');
	var play = ffi.Library('./main.so', {
    	'main': ['void', []]
	});
	console.log(play.main());
}
function runFFI(fileContent){
    writeFile(fileContent);
    play();
    readFile();
}
// FFI module end
function updateButton(buttonID, buttonValue){
	//alert(buttonName[buttonID]), alert(buttonValue);
	document.getElementById(buttonName[buttonID]).innerHTML = buttonValue;
}
function updatef() {
    var id = document.getElementById("f");
    var length = f / maxf * $(bar).width();
    if(length < 0) {
        length = 0;
        f = 1;
    }
    if(length > $(bar).width()){
        $(line).width($(bar).width());
        f = maxf;
    }
    id.innerHTML = "SPEED=" + f + "/" + maxf;
    $(line).width(length);
}

function updateclk() {
    var id = document.getElementById("clock");
    var length = clk / maxclk * $(bar2).width();
    if(length < 0) {
        length = 0;
        clk = 0;
    }
    if(length > $(bar2).width()){
        $(line2).width($(bar2).width());
        clk = maxclk;
    }
    id.innerHTML = "CLOCK=" + clk + "/" + maxclk;
    $(line2).width(length); 
    for (i = 0; i <= 51; i++) {
    	updateButton(i, data[clk][i]);
    }
}

//button module

var timeid = 0;

function timecount() {
    clk++;
    updateclk();
    timeid = setTimeout("timecount()", 500.0 / f);
}

function timestop() {
    if(timeid != 0)
        clearTimeout(timeid);
}

function PlayPause() {
    on = on ^ 1;
    var play = document.getElementById("play");
    var pause = document.getElementById("pause"); 
    if(on == 1) {
        play.style.display = "none";
        pause.style.display = "block";
        timecount();
    }
    else {
        play.style.display = "block";
        pause.style.display = "none";
        timestop();
    }
}

function BackWard() {
    if(on == 1)  PlayPause();
    if(clk > 0) {
        clk = clk - 1;
        updateclk();
    }
}

function ForWard() {
    if(on == 1)  PlayPause();
    if(clk < maxclk) {
        clk = clk + 1;
        updateclk();
    }
}

function getFileContent (fileInput, callback) {
    if (fileInput.files && fileInput.files.length > 0 && fileInput.files[0].size > 0) {
        var file = fileInput.files[0];
        if (window.FileReader) {
            var reader = new FileReader();
            reader.onloadend = function (evt) {
                if (evt.target.readyState == FileReader.DONE) {
                	if (on == 1) {
                		PlayPause();
                		clk = 0;
                	}
                    callback(evt.target.result); 
                    runFFI(evt.target.result);
                    updateclk();
                }
            };
            reader.readAsText(file, 'utf-8'); 
        }
    }
}

function FileLoad() {
    var bid = document.getElementById("uploadbtn");
    var uid = document.getElementById("upload"); 
    bid.onclick = function () {
        uid.click();
    };
    uid.onchange = function () {
        var cid = document.getElementById("code");
        getFileContent(this, function (str) {
            cid.innerHTML = str;
        });
    };
}

//slide module

function slide(bara,linea){
    bar = "." + bara;
    line = "." + linea;
    var statu = false;

    $(bar).mousedown(function (e) {
        ev(e);
    });

    $(document).mouseup(function () {
        statu = false;
    });

    $(bar).mousemove(function (e) {
        if (statu === true) {
            ev(e);
        }
    });

    function ev(e){
        var eleLeft = $(line).offset().left;
        var length = e.pageX - eleLeft;
        if(length > $(bar).width()){
            length = $(bar).width()
        }
        statu = true;
        f = parseInt(length / $(bar).width() * maxf);
        updatef();
    }
}


function slide2(barb,lineb){
    bar2 = "." + barb;
    line2 = "." + lineb;
    var statu2 = false;

    $(bar2).mousedown(function (e) {
        ev(e);
    });

    $(document).mouseup(function () {
        statu2 = false;
    });

    $(bar2).mousemove(function (e) {
        if (statu2 === true) {
            ev(e);
        }
    });

    function ev(e){
        if(on == 1) PlayPause();
        var eleLeft = $(line2).offset().left;
        var length = e.pageX - eleLeft;
        if(length > $(bar2).width()) {
            length = $(bar2).width();
        }
        statu2 = true;
        clk = parseInt(length / $(bar2).width() * maxclk);
        updateclk();
    }
}
