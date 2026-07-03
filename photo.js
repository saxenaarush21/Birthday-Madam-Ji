const photos = document.querySelectorAll(".cont");

let highestZ = 1;

photos.forEach(photo => {

    let pointers = new Map();

    let startX = 0;
    let startY = 0;

    let initialLeft = 0;
    let initialTop = 0;

    let initialDistance = 0;
    let currentScale = 1;
    let initialScale = 1;

    photo.style.cursor = "grab";
    photo.style.touchAction = "none";

    photo.addEventListener("pointerdown", pointerDown);
    photo.addEventListener("pointermove", pointerMove);
    photo.addEventListener("pointerup", pointerUp);
    photo.addEventListener("pointercancel", pointerUp);

    function pointerDown(e){

        e.preventDefault();

        photo.setPointerCapture(e.pointerId);

        highestZ++;
        photo.style.zIndex = highestZ;

        pointers.set(e.pointerId,{
            x:e.clientX,
            y:e.clientY
        });

        // One finger / Mouse
        if(pointers.size === 1){

            startX = e.clientX;
            startY = e.clientY;

            initialLeft = parseFloat(getComputedStyle(photo).left);
            initialTop = parseFloat(getComputedStyle(photo).top);

            photo.style.cursor = "grabbing";

        }

        // Two fingers
        if(pointers.size === 2){

            const pts = [...pointers.values()];

            initialDistance = Math.hypot(
                pts[0].x - pts[1].x,
                pts[0].y - pts[1].y
            );

            initialScale = currentScale;

        }

    }

    function pointerMove(e){

        if(!pointers.has(e.pointerId)) return;

        pointers.set(e.pointerId,{
            x:e.clientX,
            y:e.clientY
        });

        // -------- Drag --------

        if(pointers.size === 1){

            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            photo.style.left = initialLeft + dx + "px";
            photo.style.top = initialTop + dy + "px";

            photo.style.transform = `scale(${currentScale * 1.05})`;

        }

        // -------- Pinch --------

        if(pointers.size === 2){

            const pts = [...pointers.values()];

            const distance = Math.hypot(
                pts[0].x - pts[1].x,
                pts[0].y - pts[1].y
            );

            currentScale = initialScale * (distance / initialDistance);

            currentScale = Math.max(0.5, Math.min(currentScale, 3));

            photo.style.transform = `scale(${currentScale})`;

        }

    }

    function pointerUp(e){

        pointers.delete(e.pointerId);

        if(photo.hasPointerCapture(e.pointerId)){
            photo.releasePointerCapture(e.pointerId);
        }

        if(pointers.size === 0){

            photo.style.cursor = "grab";
            photo.style.transform = `scale(${currentScale})`;

        }

    }

});
