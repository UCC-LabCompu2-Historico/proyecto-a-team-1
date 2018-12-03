
/** 
 * @description Limpia los campos de texto y grafico al recargar la página.
 * @method recargar
 */  
 
function recargar(){
	var c = document.getElementById("grafico");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
	document.getElementById("v1").value = "";
	document.getElementById("v2").value = "";
	document.getElementById("resultado").value = "";
    mouse();
} 

/** 
 * @description Bloquea el ingreso de caracteres no validos.
 * @method bloqueo
 * @param {dato}
 * @return {salida}
 */ 
 
function bloqueo(dato){
    var salida = '';
    var filtra = '1234567890-.,';
	
    for (var i=0; i<dato.length; i++)
		
       if (filtra.indexOf(dato.charAt(i)) != -1) 
		   salida += dato.charAt(i);

    return salida;
} 

/** 
 * @description Cambia el mensaje del placeholder dependiendo del dato a ingresar.
 * @method ingresoV1
 */ 

function ingresoV1(){
	if (document.getElementById("f1").value == 1)
		document.getElementById("v1").placeholder="coordenada x ,  coordenada y";
	else
		document.getElementById("v1").placeholder="modulo ,  angulo ";
}

/** 
 * @description Cambia el mensaje del placeholder dependiendo del dato a ingresar.
 * @method ingresoV2
 */ 

function ingresoV2(){
	if (document.getElementById("f2").value == 1)
		document.getElementById("v2").placeholder="coordenada x ,  coordenada y";
	else
		document.getElementById("v2").placeholder="modulo ,  angulo ";
}

/** 
 * @description Verifica si el numero no es entero y lo redondea a dos decimales.
 * @method redondeo
 * @param {numero}
 * @return {numero}
 */ 

function redondeo(numero){
	if (numero % 1 == 0)
        return numero;
	else
		return numero.toFixed(2);
}

/** 
 * @description Verifica el formato de los datos ingresados que contengan como maximo una coma, 
   un punto a cada lado de la coma, y un signo menos a cada lado de la coma ubicados en primera 
   posicion, asi como tambien un numero a cada lado de la coma y la cantidad minima de datos.
 * @method formato
 * @param {V}
 * @return {ok}
 */ 

function formato(V){

	var punto = 0;
	var coma = 0;
	var menos = 0;
	var numero = 0;
	var pos;
	var ok = 1;
	
	if(V.length > 2){
		
		for (var i=0; i<V.length; i++){
			if (V[i] == ',') {
			   coma++;
			   pos = i;
			}
		}

		if(coma == 1){
			for (var i=0; i<pos; i++){
				if (V[i] == '.') 
					punto++;
				if (V[i] == '-') 
					menos++;
				if (V[i] != '-' && V[i] != '.' && V[i] != ',') 
					numero++;
			}
			if (menos == 1 && V[0] != '-')
				ok = 0;
			
			if (punto < 2 && menos < 2 && numero > 0){
				punto = 0;
				menos = 0;
				numero = 0;
				for (var i=pos+1; i<V.length; i++){
					if (V[i] == '.') 
						punto++;
					if (V[i] == '-') 
						menos++;
					if (V[i] != '-' && V[i] != '.' && V[i] != ',') 
						numero++;
				}
				if (punto > 1 || menos > 1 || numero < 1)
					ok = 0;
				
				if (menos == 1 && V[pos+1] != '-')
					ok = 0;
			}
			else
				ok = 0;
		}
		else
			ok = 0;
	}
	else
		ok = 0;
	
	return ok;
}

/** 
 * @description Muestra mensajes de error si los datos ingresados no pasaron la verificacion.
 * @method verificar
 */ 

function verificar(){
	
	var c = document.getElementById("grafico");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    var ok = 1;
	var V1 = document.getElementById("v1").value;
	var V2 = document.getElementById("v2").value;

	ok = formato(V1);
	
	if(ok == 1)
		ok = formato(V2);

    if (ok == 1)
        calcular();
    else
		if(V1.length < 1 && V2.length < 1)
		    document.getElementById("resultado").value = "Ingrese los datos";
		else
			if(V1.length < 1 || V2.length < 1)
				document.getElementById("resultado").value = "Faltan datos";
			else
				document.getElementById("resultado").value = "Los datos ingresados no son correctos";
}

/** 
 * @description Calcula con los datos ingresados la operacion entre vectores seleccionada en el menu.
 * @method calcular
 */ 

function calcular(){
    var V1 = document.getElementById("v1").value;
    var V2 = document.getElementById("v2").value;
    var vector1 = [], vector2 = [], Rs = [], R1, R2, polar, mod, ang;
    var formaV1 = document.getElementById("f1").value;
    var formaV2 = document.getElementById("f2").value;

    var sumar = document.getElementById("suma").checked;
    var restar = document.getElementById("resta").checked;
    var pescalar = document.getElementById("pescalar").checked;
	var angulo = document.getElementById("angulo").checked;
	
    if (formaV1 == 1){
        vector1 = V1.split(",", 2);
    }
    if (formaV1 == 2){
        polar = V1.split(",", 2);
        mod = parseFloat(polar[0]);
        ang = parseFloat(polar[1]);
        vector1[0] = mod*Math.cos(ang*Math.PI/180);
        vector1[1] = mod*Math.sin(ang*Math.PI/180);
        vector1[0] = vector1[0].toFixed(2);
        vector1[1] = vector1[1].toFixed(2);
    }
    if (formaV2 == 1)
        vector2 = V2.split(",", 2);

    if (formaV2 == 2){
        polar = V2.split(",", 2);
        mod = parseFloat(polar[0]);
        ang = parseFloat(polar[1]);
        vector2[0] = mod*Math.cos(ang*Math.PI/180);
        vector2[1] = mod*Math.sin(ang*Math.PI/180);
        vector2[0] = vector2[0].toFixed(2);
        vector2[1] = vector2[1].toFixed(2);
    }

    var v11 = parseFloat(vector1[0]);
    var v12 = parseFloat(vector1[1]);
    var v21 = parseFloat(vector2[0]);
    var v22 = parseFloat(vector2[1]);
    var Vd1 = [v11, v12];
    var Vd2 = [v21, v22];
	
    if(sumar){
        R1 = v11 + v21;
        R2 = v12 + v22;
        Rs = [redondeo(R1), redondeo(R2)];
		document.getElementById("resultado").value = "";
        document.getElementById("resultado").value = "R = [ " + Rs + " ]";
        escala(Vd1, Vd2, Rs);
    }
    if(restar){
        R1 = v11 - v21;
        R2 = v12 - v22;
        Rs = [redondeo(R1), redondeo(R2)];
		document.getElementById("resultado").value = "";
        document.getElementById("resultado").value = "R = [ " + Rs + " ]";
        escala(Vd1, Vd2, Rs);
    }
    if(pescalar){
        var PE = v11 * v21 + v12 * v22;
		PE = redondeo(PE);
        document.getElementById("resultado").value = "";
        document.getElementById("resultado").value =  "PE = " + PE ;
        escala(Vd1, Vd2, Rs);
    }
	if(angulo){
        var pEsc = v11 * v21 + v12 * v22;
        var modV1 = Math.hypot(v11, v12);
        var modV2 = Math.hypot(v21, v22);
        var alfa = (Math.acos((pEsc)/(modV1*modV2))*180/Math.PI).toFixed(2);
        document.getElementById("resultado").value = "";
        document.getElementById("resultado").value = "alfa = " + alfa + "°";
        
        escala(Vd1, Vd2, Rs);
        animaAng(Vd1, Vd2, alfa, 0);
    }
}

/** 
 * @description Ajusta la escala de los vectores para que quepan en el grafico.
 * @method escala
 * @param {v1, v2, rs}
 * @return {v1, v2, rs}
 */ 

function escala(v1, v2, rs){
	var i = 0;
	while(i<3){
		if(Math.abs(v1[0]) < 10 || Math.abs(v1[1]) < 10 || Math.abs(v2[0]) < 10 || Math.abs(v2[1]) < 10 || Math.abs(rs[0]) < 10 || Math.abs(rs[1]) < 10){
		v1[0] *= 10;	v1[1] *= 10;
		v2[0] *= 10;	v2[1] *= 10;
		rs[0] *= 10;	rs[1] *= 10; }
		i++;
	}
    while(Math.abs(v1[0]) > 110 || Math.abs(v1[1]) > 110 || Math.abs(v2[0]) > 110 || Math.abs(v2[1]) > 110 || Math.abs(rs[0]) > 110 || Math.abs(rs[1]) > 110){
        v1[0] /= 10;	v1[1] /= 10;
		v2[0] /= 10;	v2[1] /= 10;
		rs[0] /= 10;	rs[1] /= 10; 
	}
	dibujar(v1, v2, rs);
}

/** 
 * @description Grafica los vectores ingresados y la resultante o angulo segun sea el caso.
 * @method dibujar
 * @param {v1, v2, rs}
 */ 

    var Xo = 220;
    var Yo = 135;

function dibujar(v1, v2, rs){

    var c = document.getElementById("grafico");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);

    //Ejes cartesianos
    ctx.beginPath();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.moveTo(220, 10);
    ctx.lineTo(220, 253);
    ctx.stroke();
    ctx.font = "8px Arial";
    ctx.fillStyle = 'black';
    ctx.fillText("Y", 224, 10);
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(30, 135);
    ctx.lineTo(420, 135);
    ctx.stroke();
    ctx.font = "8px Arial";
    ctx.fillStyle = 'black';
    ctx.fillText("X", 420, 130);
    ctx.closePath();

    for(var i = 40; i < c.width-20; i += 20){
        ctx.beginPath();
        ctx.font = "8px Arial";
        ctx.fillStyle = 'black';
        ctx.fillText("" + ((i-220)/10), i,265);
        ctx.closePath();
    }

    for(var i = 20; i < c.height; i += 20){
        ctx.beginPath();
        ctx.font = "8px Arial";
        ctx.fillStyle = 'black';
        ctx.fillText("" + ((140-i)/10), 10,i);
        ctx.closePath();
    }

    //Vector 1
    var m1 = v1[1]/v1[0];
    animaV1(ctx, v1, m1, 0);
    ctx.font = "8px Arial";
    ctx.fillStyle = 'black';
    ctx.fillText("V1", Xo+v1[0] ,Yo-v1[1]);

    //Vector 2
    m2 = v2[1]/v2[0];
    animaV2(ctx, v2, m2, 0);
    ctx.font = "8px Arial";
    ctx.fillStyle = 'black';
    ctx.fillText("V2", Xo+v2[0] ,Yo-v2[1]);

    //Resultante
    m3 = rs[1]/rs[0];
    animaRs(ctx, rs, m3, 0);
    ctx.font = "8px Arial";
    ctx.fillStyle = 'black';
    ctx.fillText("R", Xo+rs[0] ,Yo-rs[1]);
}

/** 
 * @description Dibuja punto por punto el vector, considerando al mismo como una funcion de pendiente m.
 * @method animaV1
 * @param {ctx, v1, m, x}
 */ 

function animaV1(ctx, v1, m, x){

    if(Math.abs(x) < Math.abs(v1[1]) && v1[0] == 0) {
        x = x+0.2*v1[1]/Math.abs(v1[1]);
        ctx.beginPath();
        ctx.fillStyle = 'blue';
        ctx.fillRect (Xo, Yo-x, 1.5, 1.5);
        ctx.fill();
        setTimeout(animaV1,1,ctx, v1, m, x);
    }
    if(Math.abs(x) < Math.abs(v1[0]) && v1[0] != 0) {
        x = x+0.2*v1[0]/Math.abs(v1[0]);
        ctx.beginPath();
        ctx.fillStyle = 'blue';
        ctx.fillRect (Xo+x, Yo-m*x, 1.5, 1.5);
        ctx.fill();
        setTimeout(animaV1,1,ctx, v1, m, x);
    }
}

/** 
 * @description Dibuja punto por punto el vector V2.
 * @method animaV2
 * @param {ctx, v2, m, x}
 */ 

function animaV2(ctx, v2, m, x){

    if(Math.abs(x) < Math.abs(v2[1]) && v2[0] == 0) {
        x = x+0.2*v2[1]/Math.abs(v2[1]);
        ctx.beginPath();
        ctx.fillStyle = 'green';
        ctx.fillRect (Xo, Yo-x, 1.5, 1.5);
        ctx.fill();
        setTimeout(animaV2,1,ctx, v2, m, x);
    }
    if(Math.abs(x) < Math.abs(v2[0]) && v2[0] != 0) {
        x = x+0.2*v2[0]/Math.abs(v2[0]);
        ctx.beginPath();
        ctx.fillStyle = 'green';
        ctx.fillRect (Xo+x, Yo-m*x, 1.5, 1.5);
        ctx.fill();
        setTimeout(animaV2,1,ctx, v2, m, x);
    }
}

/** 
 * @description Dibuja punto por punto la resultante R.
 * @method animaV2
 * @param {ctx, rs, m, x}
 */ 

function animaRs(ctx, rs, m, x){

    if(Math.abs(x) < Math.abs(rs[1]) && rs[0] == 0) {
        x = x+0.2*rs[1]/Math.abs(rs[1]);
        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.fillRect (Xo, Yo-x, 1.5, 1.5);
        ctx.fill();
        setTimeout(animaRs,1,ctx, rs, m, x);
    }
    if(Math.abs(x) < Math.abs(rs[0]) && rs[0] != 0) {
        x = x+0.2*rs[0]/Math.abs(rs[0]);
        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.fillRect (Xo+x, Yo-m*x, 1.5, 1.5);
        ctx.fill();
        setTimeout(animaRs,1,ctx, rs, m, x);
    }
}

/** 
 * @description Muestra las coordenadas X e Y de la posicion del cursor sobre el canvas.
 * @method mouse
 */ 

function mouse(){

    var c = document.getElementById("grafico");
    if (c && c.getContext) {
        var ctx = c.getContext("2d");
        if (ctx) {
            var output = document.getElementById("output");
            c.addEventListener("mousemove", function(evt) { var mousePos = oMousePos(c, evt); marcarCoords(output, mousePos.x-Xo, Yo-mousePos.y) }, false);
            c.addEventListener("mouseout", function(evt) { limpiarCoords(output); }, false);
        }
    }
}

function marcarCoords(output, x, y) {
    x /= 10; y /= 10;
    output.innerHTML = ("x: " + x + ", y: " + y);
}

function limpiarCoords(output) {
    output.innerHTML = "";
}

function oMousePos(c, evt) {
    var ClientRect = c.getBoundingClientRect();
    return {
        x: Math.round(evt.clientX - ClientRect.left),
        y: Math.round(evt.clientY - ClientRect.top)
    }
}