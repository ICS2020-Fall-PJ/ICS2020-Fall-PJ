var clk = 0, maxclk = 50;
var f = 10, maxf = 50;
var on = 0;
var bar, bar2;
var line, line2;

//update module

function updatef() {
    var id = document.getElementById("f");
    var length = f / maxf * $(bar).width();
    if(length < 0) {
        length = 0;
        f = 0;
    }
    if(length > $(bar).width()){
        $(line).width($(bar).width());
        f = maxf;
    }
    id.innerHTML = "f=" + f + "/" + maxf;
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
}

//button module

var timeid = 0;

function timecount() {
    clk++;
    updateclk();
    timeid = setTimeout("timecount()", 5000 / f);
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
                    callback(evt.target.result);
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
