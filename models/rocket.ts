class Rocket{
    code: string;
    thrusters: Thruster[] = new Array();
    inicialPower: number[] = [];

    constructor(code: string){
        this.code = code;
    }
    
    addThruster(thruster: Thruster): void{
        this.thrusters.push(thruster);
    }

    setInicialPower(thrusters:number[]) {
        let i;
        let inicial = 0;
        for(i = 1; i <= thrusters.length; i++) {
            this.inicialPower.push(inicial);
        }
        return this.inicialPower;
    }
}