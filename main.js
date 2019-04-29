window.onload = function(){
    var body = $('body');
    TweenLite.to(body, .3, {opacity:1})

    var $liveSnap = $("#liveSnap"),
        $container = $("#container"),
        gridWidth = 200,
        gridHeight = 200,
        gridRows = 5,
        gridColumns = 5,
        i, x, y;

    for (i = 0; i < gridRows * gridColumns; i++) {
        y = Math.floor(i / gridColumns) * gridHeight;
        x = (i * gridWidth) % (gridColumns * gridWidth);
        $("<div/>").css({background:"url(images/dirt.svg)",position:"absolute", border:"3px solid rgba(0,0,0,.25)", width:gridWidth-1, height:gridHeight-1, top:y, left:x}).prependTo($container);
    }

    TweenLite.set($container, {height: gridRows * gridHeight + 1, width: gridColumns * gridWidth + 1});
    TweenLite.set(".box", {width:gridWidth, height:gridHeight, lineHeight:gridHeight + "px"});

    function update() {
    var liveSnap = $liveSnap.prop("checked");
        Draggable.create(".box", {
            bounds:$container,
            edgeResistance:0.65,
            type:"x,y",
            throwProps:true,
            autoScroll:true,
            liveSnap:liveSnap,
            snap:{
                x: function(endValue) {
                    return Math.round(endValue / gridWidth) * gridWidth;
                },
                y: function(endValue) {
                    return Math.round(endValue / gridHeight) * gridHeight;
                }
            }
        });
    }

    $liveSnap.on("change", applySnap);

    function applySnap() {
        if ($liveSnap.prop("checked")) {
            $(".box").each(function(index, element) {
                TweenLite.to(element, 0.5, {
                    x:Math.round(element._gsTransform.x / gridWidth) * gridWidth,
                    y:Math.round(element._gsTransform.y / gridHeight) * gridHeight,
                    delay:0.1,
                    ease:Power2.easeInOut
                });
            });
        }
        update();
    }
    update();
}