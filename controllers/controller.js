"use strict";
var rockets = new Array;
//FASE 1 Y 2:
var codeRocket1 = "32WESSDS";
var codeRocket2 = "LDSFJA32";
var thursterRocket1 = [10, 30, 80];
var thursterRocket2 = [30, 40, 50, 50, 30, 10];
var inicialPowerRocket1 = [0, 0, 0];
var inicialPowerRocket2 = [0, 0, 0, 0, 0, 0];
function createRocket(codeRocket, thrusterRocket) {
    var _a, _b;
    var rocketEx = new Rocket(codeRocket);
    var i = 0;
    while (thrusterRocket[i] != undefined) {
        rocketEx.addThruster(new Thruster(thrusterRocket[i]));
        i++;
    }
    if (codeRocket == codeRocket1) {
        document.getElementById('rocketInfo1').innerHTML = "\n        Rocket 1 created:<br>Code: " + rocketEx.code + "<br> Number of Thrusters: " + i + " <br> Power of Thrusters: " + thrusterRocket;
        rockets.push(rocketEx);
        console.log(rockets);
        console.log(rocketEx);
        (_a = document.getElementById('rocketDraw-rocket1')) === null || _a === void 0 ? void 0 : _a.classList.remove('no-display-rocket1');
    }
    else if (codeRocket == codeRocket2) {
        document.getElementById('rocketInfo2').innerHTML = "\n        Rocket 2 created:<br>Code: " + rocketEx.code + "<br>Number of Thrusters: " + i + " <br>Power of Thrusters: " + thrusterRocket;
        rockets.push(rocketEx);
        console.log(rockets);
        console.log(rocketEx);
        (_b = document.getElementById('rocketDraw-rocket2')) === null || _b === void 0 ? void 0 : _b.classList.remove('no-display-rocket2');
    }
}
function createRocket1() {
    createRocket(codeRocket1, thursterRocket1);
}
function createRocket2() {
    createRocket(codeRocket2, thursterRocket2);
}
var rocketUser;
function createRocketUser() {
    var _a;
    var acumError = 0;
    var code = document.getElementById("codeRocket").value.toString();
    var numThrusters = parseInt(document.getElementById("thruster").value);
    var powerThursters = document.getElementById("powerThruster").value.split(",");
    var powerOp;
    var powerThurstersOpt = [];
    for (var i_1 = 0; i_1 < powerThursters.length; i_1++) {
        powerOp = powerThurstersOpt.push(parseInt(powerThursters[i_1]));
    }
    var found = false;
    var i;
    for (i = 0; i < rockets.length; i++) {
        if (rockets[i].code === code) {
            found = true;
            alert("A rocket with the same code has already been created, please assign it a new different code.");
        }
    }
    //me falla la validación del último if powerThursters
    if (code == "" || isNaN(numThrusters) || powerThursters == [""]) {
        if (code == "") {
            acumError++;
            alert('Code Rocket field must be filled.');
        }
        if (!validateRocket(code)) {
            acumError++;
            alert('Code Rocket must be 8 characters.');
        }
        if (isNaN(numThrusters)) {
            acumError++;
            alert('Number of Thrusters field must be filled.');
        }
        if (powerThursters == [""]) {
            acumError++;
            alert('Power of Thrusters field must be filled with numbers (according to the number of propellants) and separated by commas.');
        }
    }
    if (numThrusters != powerThurstersOpt.length) {
        acumError++;
        alert('Number of Thrusters must match number of Power of Thrusters.');
    }
    if (!found && acumError == 0) {
        rocketUser = new Rocket(code);
        console.log(code);
        console.log(powerThurstersOpt);
        rockets.push(rocketUser);
        var i_2 = 0;
        for (i_2 = 0; i_2 < powerThurstersOpt.length; i_2++) {
            var thus = new Thruster(powerThurstersOpt[i_2]);
            rocketUser.addThruster(thus);
        }
        rocketUser.setInicialPower(powerThurstersOpt);
    }
    document.getElementById('rocketInfo').innerHTML = "\n    Your Rocket created:<br> Code: " + rocketUser.code + " <br> Number of Thrusters: " + powerThurstersOpt.length + " ";
    (_a = document.getElementById('rocketDraw-rocketUser')) === null || _a === void 0 ? void 0 : _a.classList.remove('no-display-rocketUser');
}
function acelerateRocket(codeRocket, thrusterRocket, powerRocket) {
    var i = 0;
    while (thrusterRocket[i] != undefined) {
        if (powerRocket[i] == thrusterRocket[i]) {
            powerRocket[i] = powerRocket[i];
        }
        else {
            powerRocket[i] = powerRocket[i] + 10;
        }
        i++;
    }
    if (codeRocket == codeRocket1) {
        inicialPowerRocket1 = powerRocket;
    }
    else if (codeRocket == codeRocket2) {
        inicialPowerRocket2 = powerRocket;
    }
    else {
        rocketUser.inicialPower = powerRocket;
    }
    colorAcelerate(thrusterRocket);
}
function acelerateRocket1() {
    acelerateRocket(codeRocket1, thursterRocket1, inicialPowerRocket1);
    printRocket1();
}
function acelerateRocket2() {
    acelerateRocket(codeRocket2, thursterRocket2, inicialPowerRocket2);
    printRocket2();
}
function acelerateRocketUser() {
    var i;
    var thrusterRocketUser = [];
    for (i = 0; i < rocketUser.thrusters.length; i++) {
        thrusterRocketUser.push(rocketUser.thrusters[i].maxPower);
    }
    acelerateRocket(rocketUser.code, thrusterRocketUser, rocketUser.inicialPower);
    printRocketUser();
}
function breakRocket(codeRocket, thrusterRocket, powerRocket) {
    var i = 0;
    while (thrusterRocket[i] != undefined) {
        if (powerRocket[i] == 0) {
            powerRocket[i] = 0;
        }
        else {
            powerRocket[i] = powerRocket[i] - 10;
        }
        i++;
    }
    if (codeRocket == codeRocket1) {
        inicialPowerRocket1 = powerRocket;
    }
    else {
        inicialPowerRocket2 = powerRocket;
    }
}
function breakRocket1() {
    breakRocket(codeRocket1, thursterRocket1, inicialPowerRocket1);
    printRocket1();
}
function breakRocket2() {
    breakRocket(codeRocket2, thursterRocket2, inicialPowerRocket2);
    printRocket2();
}
function breakRocketUser() {
    var i;
    var thrusterRocketUser = [];
    for (i = 0; i < rocketUser.thrusters.length; i++) {
        thrusterRocketUser.push(rocketUser.thrusters[i].maxPower);
    }
    breakRocket(rocketUser.code, thrusterRocketUser, rocketUser.inicialPower);
    printRocketUser();
}
function printRocket(codeRocket, thrusterRocket, powerRocket) {
    var sumPower = 0;
    var i = 0;
    while (thrusterRocket[i] != undefined) {
        sumPower += powerRocket[i];
        i++;
    }
    if (codeRocket == codeRocket1) {
        document.getElementById('rocketInfo1').innerHTML =
            "Rocket: " + codeRocket + " <br>Power of Thrusters: " + thrusterRocket + " <br> Inicial Power of Thursters: " + powerRocket + " <br>Total Power: " + sumPower;
    }
    else if (codeRocket == codeRocket2) {
        document.getElementById('rocketInfo2').innerHTML =
            "Rocket: " + codeRocket + " <br>Power of Thrusters: " + thrusterRocket + " <br> Inicial Power of Thursters: " + powerRocket + " <br>Total Power: " + sumPower;
    }
    else {
        document.getElementById('rocketInfo').innerHTML =
            "Rocket: " + codeRocket + " <br>Power of Thrusters: " + thrusterRocket + " <br> Inicial Power of Thursters: " + powerRocket + " <br>Total Power: " + sumPower;
    }
}
function printRocket1() {
    printRocket(codeRocket1, thursterRocket1, inicialPowerRocket1);
}
function printRocket2() {
    printRocket(codeRocket2, thursterRocket2, inicialPowerRocket2);
}
function printRocketUser() {
    var i;
    var thrusterRocketUser = [];
    for (i = 0; i < rocketUser.thrusters.length; i++) {
        thrusterRocketUser.push(rocketUser.thrusters[i].maxPower);
    }
    printRocket(rocketUser.code, thrusterRocketUser, rocketUser.inicialPower);
}
function colorAcelerate(power) {
    var _a, _b, _c;
    var i;
    for (i = 0; i < rockets.length; i++) {
        if (rockets[i].code == "32WESSDS") {
            if (power > [0]) {
                (_a = document.getElementById('rocketDraw-rocket1')) === null || _a === void 0 ? void 0 : _a.classList.add('color-acelerate');
            }
        }
        else if (rockets[i].code == "LDSFJA32") {
            if (power > [0]) {
                (_b = document.getElementById('rocketDraw-rocket2')) === null || _b === void 0 ? void 0 : _b.classList.add('color-acelerate');
            }
        }
        else {
            if (power > [0]) {
                (_c = document.getElementById('rocketDraw-rocketUser')) === null || _c === void 0 ? void 0 : _c.classList.add('color-acelerate');
            }
        }
    }
}
function validateRocket(code) {
    if (code.length == 8) {
        return code ? true : false;
    }
}
