jQuery(document).ready(function(){
    var canvas = new fabric.Canvas('main-canvas');
    var rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'red',
        width: 20,
        height: 20,
        angle: 45
    });
    canvas.add(rect);
});