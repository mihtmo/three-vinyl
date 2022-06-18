function heatColorScale(t){

    if (t > 0 && t <= 15){
        return '#1c38a8'
    }
    else if (t > 15 && t <= 25){
        return '#328bc6'
    }
    else if (t > 25 && t <= 32){
        return '#5bacc1'
    }
    else if (t > 32 && t <= 45){
        return '#8ac0cb'
    }
    else if (t > 45 && t <= 62){
        return '#adcbc5'
    }
    else if (t > 62 && t <= 73.5){
        return '#efe2be'
    }
    else if (t > 73.5 && t <= 81){
        return '#e3a928'
    }
    else if (t > 81 && t <= 88){
        return '#ed8405'
    }
    else if (t > 88 && t <= 94){
        return '#c94700'
    }
    else if (t > 94 && t <= 100){
        return '#861101'
    }
    else{
        return '#380300'
    }
}

// function raincolorScale(r, m){
//     c = (r/m);
//     return c;
// }

// function rainmmConvert(p, m){
//     mm = Math.round((p * m) * 25.4);
//     rainmm = `${mm}mm`;
//     return rainmm;
// }

// function viscolorScale(v){
//     v = Math.abs((v/10)-1);
//     return v;
// }

export default heatColorScale