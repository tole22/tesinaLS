/*
const brs = $("div").filter(function() {
    let cumple = 0;
    cumple = ($(this).css("zIndex") > 1) ? cumple++ : cumple;
    cumple = ($(this).css("position") == 'fixed') ? cumple++ : cumple;
    console.log(cumple);
  console.log($(this).css("bottom"));
    //return ($(this).css("zIndex") > 999) && ($(this).css("display") == 'flex');
    if (cumple >= 2) return true;
    else return false;
    return ($(this).css("zIndex") > 1) && 
            ($(this).css("position") == 'fixed')
             && ($(this).css("bottom") != 'auto' && $(this).css("bottom") != '0px');
});





// Logging
console.log('cantidad: ',brs.length);
console.log('elementos: ',brs);

for(var elem in brs) {
   // console.log(brs['baseURI']);
    var obj = brs[elem];
    console.log(obj['baseURI']);
}

*/

//[...div_body].forEach(elem => console.log(window.getComputedStyle(elem).getPropertyValue('z-index')));

const result = [...div_body].filter(
    elem => {
        let zIndex = window.getComputedStyle(elem).getPropertyValue('z-index');
        let position = window.getComputedStyle(elem).getPropertyValue('position');
        // Posiciones en pantalla
        let bottom = window.getComputedStyle(elem).getPropertyValue('bottom');
        let top = window.getComputedStyle(elem).getPropertyValue('top');
        let left = window.getComputedStyle(elem).getPropertyValue('left');
        let right = window.getComputedStyle(elem).getPropertyValue('right');
        
        
        if((zIndex > 1) && (position === 'fixed')){
          //  console.log(elem);
            console.log({
                'id': elem.hasAttribute('id') ? elem.getAttribute('id') : '',
                'class': elem.hasAttribute('class') ? elem.getAttribute('class') : '',
                'zIndex': zIndex,
                'position': position,
                'bottom': bottom,
                'top': top,
                'left': left,
                'right': right,
            });
        }
        return (zIndex > 1) && (position === 'fixed');
    });


 //   console.log(window.getComputedStyle(elem).getPropertyValue('z-index'))
 console.log('cantidad: ',result.length);
 console.log('elementos: ',result);
 