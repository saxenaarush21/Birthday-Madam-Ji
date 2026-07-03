const photos = document.querySelectorAll(".cont");

let highestZ = 1;

photos.forEach(photo => {

    // photo.style.left = photo.offsetLeft + "px";
    // photo.style.top = photo.offsetTop + "px";

    // photo.style.position = "absolute";

    let startX, startY;
    let initialLeft, initialTop;

    photo.addEventListener("pointerdown", startDrag);

    function startDrag(e){

        e.preventDefault();

        highestZ++;
        photo.style.zIndex = highestZ;

        startX = e.clientX;
        startY = e.clientY;

        // initialLeft = photo.offsetLeft;
        // initialTop = photo.offsetTop;
        initialLeft = parseFloat(getComputedStyle(photo).left);
        initialTop = parseFloat(getComputedStyle(photo).top);

        photo.style.cursor = "grabbing";
        photo.style.transition = "none";
        photo.style.scale = "1.05";

        document.addEventListener("pointermove", drag);
        document.addEventListener("pointerup", stopDrag);

    }

    function drag(e){

        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        photo.style.left = initialLeft + dx + "px";
        photo.style.top = initialTop + dy + "px";

    }

    function stopDrag(){

        photo.style.cursor = "grab";
        photo.style.scale = "1";
        photo.style.transition = "scale .2s";

        document.removeEventListener("pointermove", drag);
        document.removeEventListener("pointerup", stopDrag);

    }

});
