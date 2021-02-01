let rockets: Rocket[] = new Array;

//FASE 1 Y 2:
let codeRocket1 = "32WESSDS";
let codeRocket2 = "LDSFJA32";

let thursterRocket1 = [10, 30, 80];
let thursterRocket2 = [30, 40, 50, 50, 30, 10];

let inicialPowerRocket1 = [0, 0, 0];
let inicialPowerRocket2 = [0, 0, 0, 0, 0, 0];

function createRocket(codeRocket:string, thrusterRocket:number[]) {

    let rocketEx = new Rocket(codeRocket);
    let i = 0;

    while (thrusterRocket[i] != undefined) {
        rocketEx.addThruster(new Thruster(thrusterRocket[i]));
        i++;   
    }  
    
    if(codeRocket == codeRocket1) {
        (<HTMLInputElement>document.getElementById('rocketInfo1')).innerHTML=`
        Rocket 1 created:<br>Code: ${rocketEx.code}<br> Number of Thrusters: ${i} <br> Power of Thrusters: ${thrusterRocket}`
        rockets.push(rocketEx);
        console.log(rockets);
        console.log(rocketEx);

        document.getElementById('rocketDraw-rocket1')?.classList.remove('no-display-rocket1');
        
    } else if(codeRocket == codeRocket2) {
        (<HTMLInputElement>document.getElementById('rocketInfo2')).innerHTML=`
        Rocket 2 created:<br>Code: ${rocketEx.code}<br>Number of Thrusters: ${i} <br>Power of Thrusters: ${thrusterRocket}`
        rockets.push(rocketEx);
        console.log(rockets);
        console.log(rocketEx);

        document.getElementById('rocketDraw-rocket2')?.classList.remove('no-display-rocket2');
    }
}

function createRocket1() {
    createRocket(codeRocket1, thursterRocket1);
}

function createRocket2() {
    createRocket(codeRocket2, thursterRocket2);
}

let rocketUser: Rocket;
function createRocketUser() {

    let acumError = 0;
        
    let code: string = (<HTMLInputElement>document.getElementById("codeRocket")).value.toString();
    let numThrusters: number = parseInt((<HTMLInputElement>document.getElementById("thruster")).value);

    let powerThursters: string[] = (<HTMLInputElement>document.getElementById("powerThruster")).value.split(",");

    let powerOp: number;
    let powerThurstersOpt:number[] = [];

    for(let i = 0; i < powerThursters.length; i++) {
        powerOp = powerThurstersOpt.push(parseInt(powerThursters[i]));
    }

    let found: boolean = false;
    let i: number;

    for (i = 0; i < rockets.length; i++){
        if (rockets[i].code === code){
            found = true;
            alert("A rocket with the same code has already been created, please assign it a new different code.");
        }
    }
//me falla la validación del último if powerThursters
    if(code == "" || isNaN(numThrusters) || powerThursters == [""]) {
            if(code == "") {
                acumError++;
                alert('Code Rocket field must be filled.');
            }
            if(!validateRocket(code)) {
                acumError++;
                alert('Code Rocket must be 8 characters.');
            }
            if(isNaN(numThrusters)) {
                acumError++;
                alert('Number of Thrusters field must be filled.');
            }
            if(powerThursters == [""]){
                acumError++;
                alert('Power of Thrusters field must be filled with numbers (according to the number of propellants) and separated by commas.');
            } 
    } 
    if(numThrusters != powerThurstersOpt.length) {
        acumError++;
        alert('Number of Thrusters must match number of Power of Thrusters.');
    }

    if(!found && acumError == 0){
        rocketUser = new Rocket(code);
        console.log(code);
        console.log(powerThurstersOpt);

        rockets.push(rocketUser);

        let i = 0;

        for(i = 0; i < powerThurstersOpt.length; i++) {
            let thus= new Thruster(powerThurstersOpt[i]);
            rocketUser.addThruster(thus);
        }
        rocketUser.setInicialPower(powerThurstersOpt);
    }

    (<HTMLInputElement>document.getElementById('rocketInfo')).innerHTML=`
    Your Rocket created:<br> Code: ${rocketUser.code} <br> Number of Thrusters: ${powerThurstersOpt.length} `
    document.getElementById('rocketDraw-rocketUser')?.classList.remove('no-display-rocketUser');
}

function acelerateRocket(codeRocket:string, thrusterRocket:number[], powerRocket:number[]){
    var i = 0;
    while (thrusterRocket[i] != undefined) {
        if (powerRocket[i] == thrusterRocket[i]){ 
            powerRocket[i] = powerRocket[i];
        } else{
            powerRocket[i] = powerRocket[i] + 10;
        }
        i++;
    }
    
    if(codeRocket == codeRocket1){ 
        inicialPowerRocket1 = powerRocket;

    } else if (codeRocket == codeRocket2){
        inicialPowerRocket2 = powerRocket;

    } else {
        rocketUser.inicialPower = powerRocket;
    }
    colorAcelerate(thrusterRocket);
}
  
function acelerateRocket1(){
    acelerateRocket(codeRocket1, thursterRocket1, inicialPowerRocket1);
    printRocket1();
}
  
function acelerateRocket2(){
    acelerateRocket(codeRocket2, thursterRocket2, inicialPowerRocket2);
    printRocket2();
}

function acelerateRocketUser() {
    let i: number;
    let thrusterRocketUser: number[] =[];
    for(i = 0; i < rocketUser.thrusters.length; i++ ) {
        thrusterRocketUser.push(rocketUser.thrusters[i].maxPower);
    }
    acelerateRocket(rocketUser.code, thrusterRocketUser, rocketUser.inicialPower);
    printRocketUser();

}

function breakRocket(codeRocket:string, thrusterRocket:number[], powerRocket:number[]){
    var i = 0;
    while (thrusterRocket[i] != undefined) {
        if (powerRocket[i] == 0){ 
            powerRocket[i] = 0;
        }else{
            powerRocket[i] = powerRocket[i] - 10;
        }
        i++;
    }
    if (codeRocket == codeRocket1){ 
        inicialPowerRocket1 = powerRocket;
    } else {
        inicialPowerRocket2 = powerRocket;
    }
}

function breakRocket1(){
    breakRocket(codeRocket1, thursterRocket1, inicialPowerRocket1);
    printRocket1();
}
  
function breakRocket2(){
    breakRocket(codeRocket2, thursterRocket2, inicialPowerRocket2);
    printRocket2();
}

function breakRocketUser(){
    let i: number;
    let thrusterRocketUser: number[] =[];
    for(i = 0; i < rocketUser.thrusters.length; i++ ) {
        thrusterRocketUser.push(rocketUser.thrusters[i].maxPower);
    }
    breakRocket(rocketUser.code, thrusterRocketUser, rocketUser.inicialPower);
    printRocketUser();
}

function printRocket(codeRocket:string, thrusterRocket:number[], powerRocket:number[]){
    
    let sumPower: number = 0;
    let i = 0;

    while (thrusterRocket[i] != undefined){
        sumPower += powerRocket[i];
        i++;
    }

    if(codeRocket == codeRocket1) {

        (<HTMLInputElement>document.getElementById('rocketInfo1')).innerHTML=
        `Rocket: ${codeRocket} <br>Power of Thrusters: ${thrusterRocket} <br> Inicial Power of Thursters: ${powerRocket} <br>Total Power: ${sumPower}`;  

    } else if(codeRocket == codeRocket2) {
        (<HTMLInputElement>document.getElementById('rocketInfo2')).innerHTML=
        `Rocket: ${codeRocket} <br>Power of Thrusters: ${thrusterRocket} <br> Inicial Power of Thursters: ${powerRocket} <br>Total Power: ${sumPower}`; 

        
    } else {
        (<HTMLInputElement>document.getElementById('rocketInfo')).innerHTML=
        `Rocket: ${codeRocket} <br>Power of Thrusters: ${thrusterRocket} <br> Inicial Power of Thursters: ${powerRocket} <br>Total Power: ${sumPower}`; 
    }
}

function printRocket1(){
    printRocket(codeRocket1,thursterRocket1,inicialPowerRocket1);
}
  
function printRocket2(){
    printRocket(codeRocket2,thursterRocket2,inicialPowerRocket2);
}

function printRocketUser() {
    let i: number;
    let thrusterRocketUser: number[] =[];
    for(i = 0; i < rocketUser.thrusters.length; i++ ) {
        thrusterRocketUser.push(rocketUser.thrusters[i].maxPower);
    }
    printRocket(rocketUser.code, thrusterRocketUser, rocketUser.inicialPower)
}

function colorAcelerate(power: number[]) {
    let i: number;
    for(i = 0; i < rockets.length; i++) {
        if(rockets[i].code == "32WESSDS") {
            if(power > [0]) {
                document.getElementById('rocketDraw-rocket1')?.classList.add('color-acelerate');
            }
        } else if(rockets[i].code == "LDSFJA32") {
            if(power > [0]) {
                document.getElementById('rocketDraw-rocket2')?.classList.add('color-acelerate')
            }
        } else {
            if(power > [0]) {
                document.getElementById('rocketDraw-rocketUser')?.classList.add('color-acelerate');
            }
        }
    }
}

function validateRocket(code: string) {
    if(code.length == 8) {
        return code ? true : false;
    }
}
