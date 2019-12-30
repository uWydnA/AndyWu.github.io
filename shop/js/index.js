class Shop {
    constructor() {
        this.nav = document.querySelector("#nav")
        this.list = document.querySelector("#list");
        this.banner = document.querySelector("#banner");
        this.bannerz = document.querySelector("#bannerz");
        this.jumbotron = document.querySelector("#jumbotron");
        this.shopbtn = document.querySelector("#shopbtn");
        this.jumcont = document.querySelector("#jumcont");
        this.shopnum = document.querySelector("#shopnum");
        this.contbtn = document.querySelector("#contbtn");
        this.formbtn = document.querySelector("#formbtn");
        this.navfenye = document.querySelector("#navfenye");
        this.footer = document.querySelector("#footer");
        this.userShopBody = document.querySelector("#userShopBody");
        this.nextbtn = document.querySelector("#nextbtn");
        this.pre = document.querySelector("#pre");
        this.fenye = document.querySelector("#fenye");
        this.next = document.querySelector("#next");
        this.menubtn = document.querySelector("#menubtn");
        this.shopbanner = document.querySelector("#shopbanner");
        this.namebtn = document.querySelector("#namebtn");
        this.selectbtn = document.querySelector("#selectbtn");
        this.quit = document.querySelector("#quit");
        this.allin = document.querySelector("#allin");
        this.sum = 0;
        this.selectFlag = 1;
        this.selectNum = 0;
        this.countIndex = 2;
        this.index = 0;
        this.hang = 4;
        this.initUrl = "http://10.11.51.202/myown/shop/php/init.php";
        this.inituserUrl = "http://10.11.51.202/myown/shop/php/inituser.php";
        this.searchUrl = "http://10.11.51.202/myown/shop/php/search.php";
        this.saveUrl = "http://10.11.51.202/myown/shop/php/save.php";
        this.deleteUrl = "http://10.11.51.202/myown/shop/php/delete.php";
        this.usertokenUrl = "http://10.11.51.202/myown/shop/php/usertoken.php";
        this.init();
    }
    init() {
        var that = this;
        this.getAjax(this.initUrl, function (rea) {
            that.rea = JSON.parse(rea);
            if (that.rea.code == 11) {
                that.rea = that.rea.msg;
                that.display();
                that.load();
            }
        }, {
            retr0init: 1
        })
        this.addEvent();
        this.getShopNum(this.getAllCookie());
        this.getStorage();

    }
    load() {
        for (var i = 0; i < Math.ceil(this.rea.length / (this.hang * this.countIndex)); i++) {
            var li = document.createElement("LI");
            li.innerHTML = `<li class="page-item"><a class="page-link"  id="by" index="${i}">${i+1}</a></li>`;
            this.fenye.appendChild(li);
        }
        this.fenye.children[this.index].className = "page-item active";
    }
    getAjax(url, cb, data) {
        data = data || {};
        var str = "";
        var xhr = new XMLHttpRequest();
        for (var i in data) {
            str += `${i}=${data[i]}&`;
        }
        url = url + "?" + str + "__retr0__=" + new Date().getTime();
        xhr.open("get", url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status === 200) {
                cb(xhr.responseText);
            }
        }
        xhr.send();

    }
    addEvent() {
        var that = this;
        this.list.onclick = function (eve) {
            var e = eve || window.event;
            var target = e.target || e.srcElement;
            if (target.id === "buybtn") {
                that.banner.style.display = "none";
                that.bannerz.style.display = "none";
                that.list.style.display = "none";
                that.navfenye.style.display = "none";
                that.jumbotron.style.display = "block";
                that.addShop(target.getAttribute("index"));
                // that.clientW = document.documentElement.clientWidth;
                // that.clientY = document.documentElement.clientHeight;
                // that.jumbotron.height = (parseInt(getComputedStyle(that.jumbotron).height) + parseInt(getComputedStyle(that.jumbotron).paddingTop) * 2 + parseInt(getComputedStyle(that.jumbotron).marginBottom))
                // that.nav.height = (parseInt(getComputedStyle(that.nav).height) + parseInt(getComputedStyle(that.nav).paddingTop) * 2)
                // that.footer.style.marginTop = that.clientY - (that.footer.offsetHeight * 2) - that.jumbotron.height - that.nav.height + "px";
                // console.log(that.footer.style.marginTop)
            }

        }
        // this.list.onmouseover = function (eve) {
        //     var e = eve || window.event;
        //     var target = e.target || e.srcElement;
        //     if (target.nodeName === "IMG") {
        //         target.className = ""
        //     }
        // }
        this.contbtn.onclick = function () {
            that.banner.style.display = "block";
            that.bannerz.style.display = "block";
            that.list.style.display = "block";
            that.navfenye.style.display = "block";
            that.jumbotron.style.display = "none";
            that.footer.style.marginTop = "0px"
            setTimeout(() => {
                location.hash = "#fenye";
            }, 1)
        }

        this.shopbtn.onclick = function () {
            that.getAjax(that.inituserUrl, function (res) {
                that.rep = JSON.parse(res);
                if (that.rep.code == 11) {
                    that.rep = that.rep.msg;
                    if (that.rep.length === 0) {
                        that.userShopBody.innerHTML = `<div class="jumbotron jumbotron-fluid" style="background:#fff">
                        <div class="container">
                          <h1 class="display-4">购物车为空</h1>
                          <p class="lead">请添加商品</p>
                        </div>
                      </div>`;
                        that.allin.style.display = "none";
                        that.selectbtn.parentNode.style.display = "none";
                    } else {
                        that.initUserShop();
                        that.allin.style.display = "block";
                        that.selectbtn.parentNode.style.display = "block";
                    }
                }
            }, {
                retr0init: 1
            })
        }
        this.userShopBody.onclick = function (eve) {
            var e = eve || window.event;
            var target = e.target || e.srcElement;
            that.getAjax(that.inituserUrl, function (res) {
                that.rep = JSON.parse(res);
                if (that.rep.code == 11) {
                    that.rep = that.rep.msg;
                    if (target.id == "line") {
                        that.auserline = document.querySelectorAll("#userline");
                        that.azeng = document.querySelectorAll("#zeng");
                        that.ajian = document.querySelectorAll("#jian");
                        var index = target.getAttribute("index");
                        var flag = that.auserline[index].className;
                        if (flag == "card mb-3") {
                            that.auserline[index].className = "adada card mb-3";
                            that.selectNum++;
                            that.showSelectNum();
                            that.changeMoney(index, 1)
                            that.azeng[index].removeAttribute("disabled");
                            that.ajian[index].removeAttribute("disabled");
                        } else {
                            that.auserline[index].className = "card mb-3";
                            that.selectNum--;
                            that.showSelectNum();
                            that.changeMoney(index, -1)
                            that.azeng[index].setAttribute("disabled", "disabled");
                            that.ajian[index].setAttribute("disabled", "disabled");
                        }
                    }
                    if (target.id === "zeng") {
                        var index = target.getAttribute("index");
                        var nownum = that.getCookie(that.rep[index].name) + 1;
                        that.setCookie(that.rep[index].name, nownum)
                        that.getShopBtnValue(index, nownum);
                        that.getShopNum(that.getAllCookie());
                        that.zjMoney(index, 1);
                    }
                    if (target.id === "jian") {
                        var index = target.getAttribute("index");
                        var nownum = that.getCookie(that.rep[index].name) - 1;
                        that.setCookie(that.rep[index].name, nownum)
                        that.getShopBtnValue(index, nownum);
                        that.getShopNum(that.getAllCookie());
                        if (nownum <= 0) {
                            that.deleteShop(index);

                            that.jian = document.querySelectorAll("#jian");
                            for (let i = 0; i < that.jian.length; i++) {
                                that.jian[i].setAttribute("index", i)
                            }
                        }
                        that.zjMoney(index, -1);
                    }
                }
            }, {
                retr0init: 1
            })
        }
        this.next.onclick = function () {
            if (that.index >= that.fenye.children.length - 1) {
                that.index = 0;
            } else {
                that.index++;
            }
            for (var i = 0; i < that.fenye.children.length; i++) {
                that.fenye.children[i].className = "page-item";
            }
            that.fenye.children[that.index].className = "page-item active";
            that.display();
            setTimeout(() => {
                location.hash = "#fenye";
            }, 1)
        }
        this.pre.onclick = function () {
            if (that.index <= 0) {
                that.index = that.fenye.children.length - 1;
            } else {
                that.index--;
            }
            console.log(that.index)
            for (var i = 0; i < that.fenye.children.length; i++) {
                that.fenye.children[i].className = "page-item";
            }
            that.fenye.children[that.index].className = "page-item active";
            that.display();
            setTimeout(() => {
                location.hash = "#fenye";
            }, 1)
        }
        this.fenye.onclick = function (eve) {
            var e = eve || window.event;
            var target = e.target || e.srcElement;
            if (target.nodeName == "A") {
                that.index = parseInt(target.getAttribute("index"));
                for (var i = 0; i < that.fenye.children.length; i++) {
                    that.fenye.children[i].className = "page-item";
                }
                that.fenye.children[that.index].className = "page-item active";
                that.display();
            }
            setTimeout(() => {
                location.hash = "#fenye";
            }, 1)
        }
        this.menubtn.onclick = function (eve) {
            var e = eve || window.event;
            var target = e.target || e.srcElement;
            if (target.id === "quit") {
                that.deleteStorage();
            }

        }
        this.allin.onclick = function () {
            that.auserline = document.querySelectorAll("#userline");
            that.azeng = document.querySelectorAll("#zeng");
            that.ajian = document.querySelectorAll("#jian");
            if (that.selectFlag == 1) {
                for (let i = 0; i < that.auserline.length; i++) {
                    if (that.auserline[i].className === "card mb-3") {
                        that.auserline[i].className = "adada card mb-3"
                        that.selectNum++;
                        that.selectFlag = 0;
                        this.innerHTML = "取消全选";
                    }
                    that.azeng[i].removeAttribute("disabled");
                    that.ajian[i].removeAttribute("disabled");
                }


                that.getMoney(1);
            } else {
                for (var i = 0; i < that.auserline.length; i++) {
                    if (that.auserline[i].className === "adada card mb-3") {
                        that.auserline[i].className = "card mb-3"
                        that.selectNum--;
                        that.selectFlag = 1;
                        this.innerHTML = "全选";
                    }
                    that.azeng[i].setAttribute("disabled", "disabled");
                    that.ajian[i].setAttribute("disabled", "disabled");
                }
                that.getMoney(-1);

            }
            that.showSelectNum();


        }
    }
    addShop(index) {
        var that = this;
        this.getAjax(this.searchUrl, function (res) {
            that.res = JSON.parse(res);
            if (that.res.code === "21") {
                that.res = that.res.msg;
                that.getAjax(that.saveUrl, function (res) {
                    that.rep = JSON.parse(res)
                    if (that.rep.code === "41" || that.rep.code === "20") {
                        that.jumcont.innerHTML = `
                        <div class="card mb-3" style="max-width: 540px;" id="shopBody">
                            <div class="row no-gutters">
                                <div class="col-md-4">
                                    <img src="${that.res[0].img}" class="card-img" alt="...">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">${that.res[0].name}</h5>
                                        <p class="card-text">￥${that.res[0].price}.00</p>
                                        <p class="card-text"><small class="text-muted">Last updated 1 mins ago</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `;

                    }
                    var num = that.getCookie(that.rep.msg);
                    num = num ? num : 0;
                    var nownum = parseInt(num) + 1;
                    that.setCookie(that.rep.msg, nownum);
                    that.getShopNum(that.getAllCookie())
                }, {
                    name: that.res[0].name,
                    price: that.res[0].price,
                    img: that.res[0].img,
                    // goodId: that.res[0].goodId
                })
            }
        }, {
            id: index
        })
    }
    deleteShop(index) {
        var that = this;
        this.userShopBody.children[index].remove();
        this.selectNum--;
        this.showSelectNum();
        this.deleteAjax(this.deleteUrl, function (res) {
            for (var i = 0; i < that.userShopBody.children.length; i++) {
                that.userShopBody.children[i].setAttribute("index", i)
            }
            that.line = document.querySelectorAll("#line");
            for (var i = 0; i < that.line.length; i++) {
                that.line[i].setAttribute("index", i)
            }
            if (that.userShopBody.children.length < 1) {
                that.userShopBody.innerHTML = `
                <div class="jumbotron jumbotron-fluid" style="background:#fff">
                <div class="container">
                <h1 class="display-4">购物车为空</h1>
                <p class="lead">请添加商品</p>
                </div>
                </div>
                `;
                that.allin.style.display = "none";
                that.selectbtn.parentNode.style.display = "none";
            }

        }, {
            name: this.rep[index].name
        });


    }
    deleteAjax(url, callback, data) {
        data = data || {};
        var str = "";
        var xhr = new XMLHttpRequest();
        for (var i in data) {
            str += `${i}=${data[i]}&`;
        }
        url = url + "?" + str + "__retr0__=" + new Date().getTime();
        xhr.open("get", url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback(xhr.responseText);
            }
        }
        xhr.send();
    }
    setCookie(key, val) {
        if (val <= 0) {
            val = 0;
        }
        document.cookie = key + "=" + val;
    }
    getCookie(key) {
        var arr = document.cookie.split("; ");
        var res = 0;
        for (var i in arr) {
            if (arr[i].split("=")[0] === key) {
                res = arr[i].split("=")[1];
            }
        }
        return parseInt(res);
    }
    getAllCookie() {
        var arr = document.cookie.split("; ");
        var num = 0;
        for (var i in arr) {
            if (arr[i].split("=")[0] === "PHPSESSID")
                continue;
            num += parseInt(arr[i].split("=")[1]);
        }
        return num;
    }
    getShopNum(num) {
        this.shopnum.innerText = num;
        if (num > 0) {
            this.shopnum.style.display = "block";
        }
    }
    initUserShop() {
        this.userShopBody.innerHTML = "";
        this.selectbtn = document.querySelector("#selectbtn");
        this.selectbtn.innerHTML = 0;
        for (var i in this.rep) {
            this.userShopBody.innerHTML += `
            <div class="card mb-3" index =${i} id="userline">
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img src="${this.rep[i].img}" class="card-img" alt="...">
                </div>
                <div class="col-md-8" id="line" index =${i}>
                    <div class="card-body">
                        <h5 class="card-title">${this.rep[i].name}</h5>
                        <p class="card-text">￥${this.rep[i].price}.00</p>
                        <div class="input-group mt-2">
                            <span class="input-group-btn">
                                <button class="btn btn-white btn-minuse" type="button" id="jian" index =${i} disabled = "disabled" >－</button>
                            </span>
                            <input type="text"
                                class="form-control no-padding add-color text-center height-25"
                                maxlength="3" value="` + this.getCookie(this.rep[i].name) + `" id="formbtn" disabled = "disabled">
                                <button class="btn btn-red btn-pluss" type="button" id="zeng" index =${i} disabled = "disabled">＋</button>
                            </span>
                        </div>
    
                    </div>
                </div>
            </div>
        </div>
            `;
        }
        // this.getMoney();

    }
    getMoney(n) {
        if (n < 0) {
            this.sum = 0;
            this.zhifu.innerHTML = "￥" + parseInt(this.sum) + ".00";
            return;
        }
        this.sum = 0;
        this.zhifu = document.querySelector("#zhifu");
        for (var i in this.rep) {
            this.sum += ((this.rep[i].price) * this.getCookie(this.rep[i].name)) * n
        }
        this.zhifu.innerHTML = "￥" + parseInt(this.sum) + ".00";

    }
    changeMoney(index, n) {
        this.zhifu = document.querySelector("#zhifu");
        for (var i in this.rep) {
            if (i == index) {
                this.sum += ((this.rep[i].price) * this.getCookie(this.rep[i].name)) * n
            }
        }
        this.zhifu.innerHTML = "￥" + parseInt(this.sum) + ".00";
    }
    zjMoney(index, n) {
        this.zhifu = document.querySelector("#zhifu");
        for (var i in this.rep) {
            if (i == index) {
                this.sum += ((this.rep[i].price) * n)
            }
        }
        this.zhifu.innerHTML = "￥" + parseInt(this.sum) + ".00";
    }
    getShopBtnValue(index, num) {
        if (num <= 0) {
            num = 0;
            this.shopBody = document.querySelectorAll("#shopBody");
        }
        this.aformbtn = document.querySelectorAll("#formbtn");
        this.aformbtn[index].value = num;

    }
    display() {
        this.list.innerHTML = "";
        for (var i = 0; i < this.countIndex; i++) {
            var carddeck = document.createElement("div");
            carddeck.className = "card-deck mb-3";
            for (var j = this.index * this.hang; j < (this.index + 1) * this.hang; j++) {
                if ((j + (i + this.index) * this.hang) < this.rea.length) {
                    carddeck.innerHTML += `
                    <div class="gameing">
                    <div class="card" style = "max-width : 253px">
                        <div class="card-body">
                            <h4 class="card-title"><img src="${this.rea[(j + (i + this.index) * this.hang)].img}" alt=""></h4>
                            <p class="card-text">${this.rea[(j + (i + this.index) * this.hang)].name}</p>
                            <a class="btn btn-primary text-white" id="buybtn" index = "${((j+1) + (i + this.index) * this.hang)}">立即购买</a>
                        </div>
                        <h6 class="card-footer">￥${this.rea[(j + (i + this.index) * this.hang)].price}.00</h6>
                    </div>
                    `;
                }

            }

            this.list.appendChild(carddeck);
        }
    }
    getStorage() {
        var that = this;
        this.token = localStorage.admin;
        this.getAjax(this.usertokenUrl, function (res) {
            that.tok = JSON.parse(res);
            if (that.tok.msg) {
                that.namebtn.innerHTML = that.tok.msg;
            } else {
                location.assign("http://10.11.51.202/myown/shop/login.html");
            }
        }, {
            access_token: this.token
        })

    }
    deleteStorage() {
        delete localStorage.admin;
        location.assign("http://10.11.51.202/myown/shop/login.html");
    }
    showSelectNum() {
        this.selectbtn = document.querySelector("#selectbtn");
        this.selectbtn.innerHTML = this.selectNum;
    }


}
new Shop();