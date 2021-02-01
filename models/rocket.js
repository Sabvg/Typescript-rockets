"use strict";
var Rocket = /** @class */ (function () {
    function Rocket(code) {
        this.thrusters = new Array();
        this.inicialPower = [];
        this.code = code;
    }
    Rocket.prototype.addThruster = function (thruster) {
        this.thrusters.push(thruster);
    };
    Rocket.prototype.setInicialPower = function (thrusters) {
        var i;
        var inicial = 0;
        for (i = 1; i <= thrusters.length; i++) {
            this.inicialPower.push(inicial);
        }
        return this.inicialPower;
    };
    return Rocket;
}());
