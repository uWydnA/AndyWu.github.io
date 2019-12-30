class SignUp {
    constructor() {
        this.signuser = document.querySelector("#signuser");
        this.signpass = document.querySelector("#signpass");
        this.signtoken = document.querySelector("#signtoken");
        this.btn = document.querySelector("#btn");
        this.addEvent();
    }
    addEvent() {
        var that = this;
        this.btn.onclick = function () {
            that.u = that.signuser.value;
            that.p = that.signpass.value;
            that.t = that.signtoken.value;
            if (that.u = "") {}
        }
    }

}
new SignUp();