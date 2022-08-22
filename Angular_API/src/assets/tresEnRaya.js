
      
    var canvas = document.getElementById("canvas1");
    canvas.addEventListener("click", clickCanvas);
    var ctx = canvas.getContext("2d");
    var caselles = [0,0,0,0,0,0,0,0,0];
    var o = false;        
    var numsGuanyador = [0,0,0];
    var final = false;
    var opGuanyadores = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    var numClick = 0;
    const posx = [5,205,405,5,205,405,5,205,405];
    const posy = [5,5,5,205,205,205,405,405,405];
    var jugador = -1;
    var maquina = 0;
    var numEmpat = 0;
    var empat = false;

    function inicia(){ //inicia variables i quadrícula  
        
        caselles = [0,0,0,0,0,0,0,0,0];
        numsGuanyador = [0,0,0];
        final = false;
        opGuanyadores = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6],[6,3,0]];
        ctx.fillStyle = "blue";
        ctx.fillRect(0,195,600,10);
        ctx.fillRect(0,395,600,10);
        ctx.fillRect(195,0,10,600);
        ctx.fillRect(395,0,10,600);
        if(numClick==5){
            empat=true;
            guanyadors(o,empat);
        }
        else{
            guanyadors(o,empat);
        }
        empat=false;
        o=false;
        numClick=0;
        setTimeout(clearText,1000);
        setTimeout(torn,1000,o);
    }
    
    function ompleCasella(numCasella,o){ //modifica opGuanyadores amb opció escollida
        
        var numOpcio = 0;
        while(numOpcio<8){
            var num = 0;
            while(num<3){
                if(opGuanyadores[numOpcio][num]==numCasella){
                    if(o==true){
                        opGuanyadores[numOpcio][num] = 10;
                    }
                    else{
                        opGuanyadores[numOpcio][num] = 11;
                    }
                }
                num++;
            }
            numOpcio++;
        }
    }
    
    function dibuixa(o,numCasella){ 
        
        ctx.font = "120px Verdana";
        ctx.fillStyle = "black";
        if(o==true){
            ctx.fillText("O",posx[numCasella]+50,posy[numCasella]+150);
        }
        else{
            ctx.fillText("X",posx[numCasella]+55,posy[numCasella]+145);
        }
    }
    
     function clearText(){ 
         
        ctx.fillStyle = "white";
        ctx.fillRect(0,610,1000,80);
        ctx.fillStyle = "black";
    }
    
    function torn(o){
        
        clearText();
        ctx.fillStyle = "black";
        ctx.font = "30px Verdana";
        if(o==false){
            if(numClick===0){
                ctx.fillText("HAZ CLICK EN UNA CASILLA PARA EMPEZAR",0,670)
            }
            else{
                ctx.fillText("TURNO USUARIO",160,670);
            } 
        }
        else{
            ctx.fillText("TURNO WEBMASTER",140,670);
        }
    }
    
    function tiraMaquina(caselles){ // escull opció màquina
        
        numOpcio = 0;
        var casellesLliures = [0,0,0,0,0,0,0,0,0];
        while(numOpcio<8){ //guanyar
            if(opGuanyadores[numOpcio][0]==11&&opGuanyadores[numOpcio][1]==11&&caselles[opGuanyadores[numOpcio][2]]==0){
                return opGuanyadores[numOpcio][2]; 
            }
            else if(opGuanyadores[numOpcio][0]==11&&opGuanyadores[numOpcio][2]==11&&caselles[opGuanyadores[numOpcio][1]]==0){
                return opGuanyadores[numOpcio][1];
            }
            else if(opGuanyadores[numOpcio][1]==11&&opGuanyadores[numOpcio][2]==11&&caselles[opGuanyadores[numOpcio][0]]==0){
                return opGuanyadores[numOpcio][0]; 
            }
            numOpcio++;
        }
        numOpcio = 0;
        while(numOpcio<8){ //defensar
            if(opGuanyadores[numOpcio][0]==10&&opGuanyadores[numOpcio][1]==10&&caselles[opGuanyadores[numOpcio][2]]==0){
                return opGuanyadores[numOpcio][2]; 
            }
            else if(opGuanyadores[numOpcio][0]==10&&opGuanyadores[numOpcio][2]==10&&caselles[opGuanyadores[numOpcio][1]]==0){
                return opGuanyadores[numOpcio][1];
            }
            else if(opGuanyadores[numOpcio][1]==10&&opGuanyadores[numOpcio][2]==10&&caselles[opGuanyadores[numOpcio][0]]==0){
                return opGuanyadores[numOpcio][0];
            }
            else{
                num = 0;
                while(num<3){
                    if(opGuanyadores[numOpcio][num]<9){
                        casellesLliures[opGuanyadores[numOpcio][num]]++; //omple el vector casellesLliures amb les caselles amb més opcions
                    }
                    num++;
                }
            }
            numOpcio++;
        }
        if(caselles[1]=="x" && caselles[5]=="x" && caselles[2]==0){ //cas concret que l'algoritme fallava
            return 2;
        }
        var mesAlt = 1;
        var a = 0;
        while(a<9){
            if(caselles[a]==0){
                if(casellesLliures[a]==mesAlt){ //en cas d'empat entre valors més alts escull una cantonada(és millor opció)
                    if(a%2==0){
                        mesAlt = a;
                    }
                }
            else if(casellesLliures[a]>mesAlt){ //escull el valor més alt de casellesLliures
                mesAlt = a;
                }
            }
            a++;
        }
        return mesAlt;
    }

    function comprovaGuanyador(caselles,o){
        
        if(caselles[0]==caselles[1]&&caselles[1]==caselles[2]&&(caselles[0]!=0)){//012 -1
            numsGuanyador = [0,1,2];
            dibuixaGuanyador(numsGuanyador,o);
            }
        else if(caselles[3]==caselles[4]&&caselles[4]==caselles[5]&&(caselles[3]!=0)){//345 -2
            numsGuanyador = [3,4,5];
            dibuixaGuanyador(numsGuanyador,o);
            }   
        else if(caselles[6]==caselles[7]&&caselles[7]==caselles[8]&&(caselles[6]!=0)){//678 -3
            numsGuanyador = [6,7,8];
            dibuixaGuanyador(numsGuanyador,o);
            }
        else if(caselles[0]==caselles[3]&&caselles[3]==caselles[6]&&(caselles[0]!=0)){//036 |1
            numsGuanyador = [0,3,6];
            dibuixaGuanyador(numsGuanyador,o);
            }
        else if(caselles[1]==caselles[4]&&caselles[4]==caselles[7]&&(caselles[1]!=0)){//147 |2
            numsGuanyador = [1,4,7];
            dibuixaGuanyador(numsGuanyador,o); 
            }
        else if(caselles[2]==caselles[5]&&caselles[5]==caselles[8]&&(caselles[2]!=0)){//258 |3
            numsGuanyador = [2,5,8];
            dibuixaGuanyador(numsGuanyador,o);
            }
        else if(caselles[0]==caselles[4]&&caselles[4]==caselles[8]&&(caselles[0]!=0)){//048 \
            numsGuanyador = [0,4,8];
            dibuixaGuanyador(numsGuanyador,o);
            }
        else if(caselles[2]==caselles[4]&&caselles[4]==caselles[6]&&(caselles[2]!=0)){//246 /
            numsGuanyador = [2,4,6];
            dibuixaGuanyador(numsGuanyador,o);
            }
    }

    function dibuixaGuanyador(numsGuanyador,o){
        
        var num = 0;
        clearText();
            if(o==true){
                ctx.fillStyle = "black";
                ctx.font = "35px Verdana";
                ctx.fillText("USUARIO GANA!",130,670);
            }
            else{
                ctx.fillText("WEBMASTER GANA!",130,670);
            }  
        ctx.font = "120px Verdana";
        ctx.fillStyle = "green";
        while(num<3){
            if(o==true){
            ctx.fillText("O",posx[numsGuanyador[num]]+50,posy[numsGuanyador[num]]+150);
            }
            else{
                ctx.fillText("X",posx[numsGuanyador[num]]+55,posy[numsGuanyador[num]]+145);
            }
            num++;
        }
        final = true;
        setTimeout(tornaJugar,1000);
    }
    
    function tornaJugar(){
        ctx.fillStyle = "lightgrey";
        ctx.fillRect(0,610,600,70);
        ctx.fillStyle = "black";
        ctx.font = "35px Verdana";
        ctx.fillText("VOLVER A JUGAR",140,660);  
    }
    
    function guanyadors(o,empat){
        
        if(empat){
            numEmpat++;
        }
        else{
            if(o==true){
                maquina++;
            }
            else{
                jugador++;
            }
        }
        ctx.fillStyle = "white";
        ctx.fillRect(670,250,310,100);
        ctx.fillStyle = "blue";
        ctx.font = "16px Verdana";
        ctx.fillText("VICTORIAS USUARIO",680,270);
        ctx.fillText("VICTORIAS WEBMASTER",680,300);
        ctx.fillText("EMPATES",680,330);
        ctx.fillStyle = "green";
        ctx.fillText(jugador,900,300);
        ctx.fillText(maquina,900,270);
        ctx.fillText(numEmpat,900,330);      
    }
    
    inicia();
    
    function clickCanvas(event){
        var clickx = event.clientX - canvas.getBoundingClientRect().left;
        var clicky = event.clientY - canvas.getBoundingClientRect().top;
        var click = false;
        var numCasella = 0;
        var xInici = 5;
        var yInici = 5;
        var opcioMaquina = 0;
        if(final == false){
            while (numCasella<9){                     
                if(xInici < clickx && clickx < xInici+190 && yInici < clicky && clicky < yInici+190){ //casella clickada
                    click = true;
                    if(caselles[numCasella]==0){
                        o = true;
                        dibuixa(o,numCasella);
                        ompleCasella(numCasella,o);
                        caselles[numCasella] = "x";
                        torn(o);
                        comprovaGuanyador(caselles,o);
                    }
                    numClick++;
                }
                xInici = xInici+200;
                if(xInici == 605){
                    xInici = 5;
                    yInici += 200;    
                }
                numCasella++;
            }
            if(numClick<5 && final==false && click==true){
                o = false;
                opcioMaquina = tiraMaquina(caselles);
                ompleCasella(opcioMaquina,o);
                caselles[opcioMaquina] = "o";
                setTimeout(dibuixa,1000,o,opcioMaquina);
                setTimeout(torn,1000,o);
                setTimeout(comprovaGuanyador,1000,caselles,o);
            }  
        }
        if(numClick==5||final==true){//fi partida
            setTimeout(tornaJugar,1000);
            if(0 < clickx && clickx < 610 && 600 < clicky && clicky < 680){      
                ctx.fillStyle = "white";
                ctx.fillRect(0,0,600,700);
                inicia();                    
            }                
        } 
    }   
 
