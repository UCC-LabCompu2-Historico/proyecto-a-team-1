
function calcular(){

    var V1 = document.getElementById("v1").value;
    var V2 = document.getElementById("v2").value;
    var vector1 = [], vector2 = [], Rs = [], R1, R2, polar, mod, ang;
    var formaV1 = document.getElementById("f1").value;
    var formaV2 = document.getElementById("f2").value;

    var sumar = document.getElementById("suma").checked;
    var restar = document.getElementById("resta").checked;
    var pescalar = document.getElementById("pescalar").checked;

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

    if (formaV2 == 1){
        vector2 = V2.split(",", 2);
    }

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
        Rs = [R1, R2];
    }

    if(restar){
        R1 = v11 - v21;
        R2 = v12 - v22;
        Rs = [R1, R2];
    }

    if(pescalar){
        Rs = v11 * v21 + v12 * v22;
    }

    document.getElementById("resultado").value = "";
    document.getElementById("resultado").value = "R = [ " + Rs + " ]";

    dibujar(Vd1, Vd2, Rs);
}

function dibujar(v1, v2, rs){

    var Xorigen = 200;
    var Yorigen = 100;

    if(v1[0] < 10 || v1[1] < 10 || v2[0] < 10 || v2[1] < 10){
        v1[0] *= 10; v1[1] *= 10; v2[0] *= 10; v2[1] *= 10; rs[0] *= 10; rs[1] *= 10;
    }

    if(v1[0] < 10 || v1[1] < 10 || v2[0] < 10 || v2[1] < 10){
        v1[0] *= 10; v1[1] *= 10; v2[0] *= 10; v2[1] *= 10; rs[0] *= 10; rs[1] *= 10;
    }

    if(v1[0] > 99 || v1[1] > 99 || v2[0] > 99 || v2[1] > 99){
        v1[0] /= 10; v1[1] /= 10; v2[0] /= 10; v2[1] /= 10; rs[0] /= 10; rs[1] /= 10;
    }

    if(v1[0] > 99 || v1[1] > 99 || v2[0] > 99 || v2[1] > 99){
        v1[0] /= 10; v1[1] /= 10; v2[0] /= 10; v2[1] /= 10; rs[0] /= 10; rs[1] /= 10;
    }


    var c = document.getElementById("grafico");
    var ctx = c.getContext("2d");

    ctx.clearRect(0, 0, c.width, c.height);

    //Ejes cartesianos
    ctx.beginPath();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.moveTo(Xorigen, 0);
    ctx.lineTo(Xorigen, 180);
    ctx.stroke();
    ctx.font = "8px Arial";
    ctx.fillText("Y", 204, 10);
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(20, 100);
    ctx.lineTo(400, 100);
    ctx.stroke();
    ctx.font = "8px Arial";
    ctx.fillText("X", 390, 96);
    ctx.closePath();


    for(var i = 20; i < c.width; i += 20){
        ctx.beginPath();
        ctx.font = "8px Arial";
        ctx.fillText("" + (i-200), i,190);
        ctx.closePath();
    }

    for(var i = 20; i < c.height; i += 20){
        ctx.beginPath();
        ctx.font = "8px Arial";
        ctx.fillText("" + (100-i), 10,i);
        ctx.closePath();
    }

    //Vector 1
    ctx.beginPath();
    ctx.strokeStyle = '#002dff';
    ctx.lineWidth = 2;
    ctx.moveTo(Xorigen, Yorigen);
    ctx.lineTo(Xorigen+v1[0], Yorigen-v1[1]);
    ctx.stroke();

    ctx.font = "8px Arial";
    ctx.fillText("V1", Xorigen+v1[0] ,Yorigen-v1[1]);

    ctx.closePath();

    //Vector 2
    ctx.beginPath();
    ctx.strokeStyle = '#02ff00';
    ctx.lineWidth = 2;
    ctx.moveTo(Xorigen, Yorigen);
    ctx.lineTo(Xorigen+v2[0], Yorigen-v2[1]);
    ctx.stroke();

    ctx.font = "8px Arial";
    ctx.fillText("V2", Xorigen+v2[0] ,Yorigen-v2[1]);

    ctx.closePath();

    //Resultante
    ctx.beginPath();
    ctx.strokeStyle = '#ff0900';
    ctx.lineWidth = 2;
    ctx.moveTo(Xorigen, Yorigen);
    ctx.lineTo(Xorigen+rs[0], Yorigen-rs[1]);
    ctx.stroke();

    ctx.font = "8px Arial";
    ctx.fillText("R", Xorigen+rs[0] ,Yorigen-rs[1]);

    ctx.closePath();

}