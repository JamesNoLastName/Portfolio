const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const image = new Image();
image.src = 'totoro.png'; // Update with the correct path to your image

image.onload = () => {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0); // Draw the image on the canvas initially

    // Hide the image by setting all pixels to transparent
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
        data[i + 3] = 0; // Set alpha to 0 (transparent)
    }
    ctx.putImageData(imgData, 0, 0);

    // Delay the start of the pixel reveal by 10 seconds
    setTimeout(pixelReveal, 10); // 10,000 milliseconds = 10 seconds
};

function pixelReveal() {
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    let index = 0;
    const delay = .01; // Delay in milliseconds between revealing pixels

    function revealNextPixel() {
        if (index < data.length) {
            // Set pixel alpha to 255 to make it visible
            data[index + 3] = 255;
            index += 4;

            // Update the canvas with new pixel data
            ctx.putImageData(imgData, 0, 0);
            
            // Request the next frame after a delay
            setTimeout(revealNextPixel, delay);
        }
    }

    revealNextPixel();
}
