class Public {
    constructor() {
        this.check = document.querySelector("#check");
        this.alert = document.querySelector("#alert");
        this.user = document.querySelector("#account");
        this.pass = document.querySelector("#inputPassword");
        this.sign = document.querySelector("#sign");
        this.signuser = document.querySelector("#signuser");
        this.signpass = document.querySelector("#signpass");
        this.signtoken = document.querySelector("#signtoken");
        this.signuser = document.querySelector("#signuser");
        this.signpass = document.querySelector("#signpass");
        this.signtoken = document.querySelector("#signtoken");
        this.subbtn = document.querySelector("#subbtn");
        this.verifycode = document.querySelector("#verifycode");
        this.refresh = document.querySelector("#refresh");
        this.url = "http://10.11.51.202/myown/shop/php/login.php";
        this.signUrl = "http://10.11.51.202/myown/shop/php/signup.php";
        this.imgUrl = "http://10.11.51.202/myown/shop/php/photo.php";
        this.checkUrl = "http://10.11.51.202/myown/shop/php/check.php";
        this.count = 1;
        this.addEvent();
    }
    al(str, color) {
        var color = color || 'danger'
        this.ale = document.createElement("div");
        this.ale.innerHTML = `
        <div class="alert alert-${color}" role="alert">
        ${str}
      </div>
        `;
        this.ale.className = "al";
        document.body.appendChild(this.ale);
    }
    postAjax(url, callback, data) {
        data = data || {};
        var str = "";
        var xhr = new XMLHttpRequest();
        for (var i in data) {
            str += `${i}=${data[i]}&`;
        }
        xhr.open("post", url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback(xhr.responseText);
            }
        }
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(str);
    }
    getAjax(url, callback, data) {
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
}
class Login extends Public {
    constructor() {
        super();
    }
    addEvent() {
        var that = this;
        this.check.onclick = function () {
            if (that.count == 1) {
                that.alert.style.opacity = 1;
                that.count = 0;
                $("#checkbtn").prop("checked", true);
            } else {
                that.alert.style.opacity = 0;
                that.count = 1;
                $("#checkbtn").removeAttr("checked");
            }

        }
        this.sign.onclick = function () {
            that.verify()
        }
        this.user.onmousedown = function () {
            if (that.ale) {
                that.ale.style.opacity = 0;
            }
        }
        this.pass.onmousedown = function () {
            if (that.ale) {
                that.ale.style.opacity = 0;
            }
        }
        this.verifycode.onmousedown = function () {
            if (that.ale) {
                that.ale.style.opacity = 0;
            }
        }

    }
    verify() {
        var that = this;
        this.u = this.user.value;
        this.p = this.pass.value;
        this.v = this.verifycode.value;
        if (this.v == "") {
            this.al("请输入验证码");
            return 0;
        }
        if (this.u == "") {
            this.al("请输入用户名")
            return 0;
        }
        if (this.p == "") {
            this.al("请输入密码");
            return 0;
        }
        console.log(that.v);
        that.getAjax(that.checkUrl, function (res) {
            that.rec = JSON.parse(res);
            if (that.rec.code == 70) {
                that.refresh.src = that.imgUrl;
                that.al("验证码错误");
            }
            if (that.rec.code == 71) {
                that.postAjax(that.url, function (res) {
                    that.res = JSON.parse(res);
                    switch (that.res.code) {
                        case 10:
                            that.al("用户名错误");
                            break;
                        case 20:
                            that.al("密码错误");
                            break;
                        case 21:
                            that.res = that.res.msg;
                            that.setStorage();
                            setTimeout(() => {
                                location.assign("http://10.11.51.202/myown/shop/index.html")
                            }, 100)
                            break;
                    }

                }, {
                    user: that.u,
                    pass: that.p
                })
            }
        }, {
            verify: that.v
        })

    }
    setStorage() {
        localStorage.admin = this.res;
    }

}
class SignUp extends Public {
    constructor() {
        super();
    }
    addEvent() {
        var that = this;
        this.subbtn.onclick = function () {
            that.su = that.signuser.value;
            that.sp = that.signpass.value;
            that.st = that.signtoken.value;
            if (that.st == "") {
                that.al("请输入激活码")
                return 0;
            }
            if (that.su == "") {
                that.al("请输入用户名")
                return 0;
            }
            if (that.sp == "") {
                that.al("请输入密码");
                return 0;
            }
            that.postAjax(that.signUrl, function (res) {
                console.log(res)
                that.res = JSON.parse(res);
                if (that.res.code == 10) {
                    that.al("用户名重复");
                }
                if (that.res.code == 21) {
                    that.al("注册成功", "success");
                }
                if (that.res.code == 80) {
                    that.al("验证码错误");
                }
            }, {
                user: that.su,
                pass: that.sp,
                signtoken: that.st,
                access_token: that.randomToken()
            });
        }
        this.user.onmousedown = function () {
            if (that.ale) {
                that.ale.style.opacity = 0;
            }
        }
        this.pass.onmousedown = function () {
            if (that.ale) {
                that.ale.style.opacity = 0;
            }
        }
    }
    random(a, b) {
        return Math.round(Math.random() * (a - b) + b)
    }
    randomToken() {
        var str = "";
        for (var i = 0; i < 64; i++) {
            var flag = this.random(0, 2);
            switch (flag) {
                case 0:
                    str += String.fromCharCode(this.random(97, 122));
                    break;
                case 1:
                    str += String.fromCharCode(this.random(65, 90));
                    break;
                case 2:
                    str += this.random(0, 9);
                    break;
            }
        }
        return str;
    }

}
new Login();
new SignUp();