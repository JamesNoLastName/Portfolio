document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const settings = {
        speed: 6,
        columns: 50,
        fontSize: 14,
        color: "#7d12ff",
        charType: "english",
        rainbow: false,
        yellowProbability: 0.33
    };

    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let fontSize = settings.fontSize;
    let columns = settings.columns;
    let drops = Array.from({ length: columns }).fill(1);
    let columnColors = Array.from({ length: columns }).fill(null);

    function getRandomColor(index) {
        if (columnColors[index] !== null) {
            return columnColors[index];
        }
        
        const color = Math.random() < settings.yellowProbability ? "yellow" : settings.color;

        columnColors[index] = color;

        return color;
    }

    function setCanvasSize() {
        const otherSection = document.querySelector('#other');
        canvas.width = window.innerWidth;
        canvas.height = otherSection ? otherSection.offsetHeight : window.innerHeight;

        columns = Math.floor(canvas.width / fontSize);
        drops = Array.from({ length: columns }).fill(1);
        columnColors = Array.from({ length: columns }).fill(null);
    }

    function draw() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = `${fontSize}px monospace`;

        drops.forEach((drop, index) => {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));

            ctx.fillStyle = getRandomColor(index);

            ctx.fillText(text, index * fontSize, drop * fontSize);

            if (drop * fontSize > canvas.height && Math.random() > 0.975) {
                drops[index] = 0;
                columnColors[index] = null;
            }

            drops[index] += settings.speed / 10;
        });
    }

    function animate() {
        draw();
        requestAnimationFrame(animate);
    }

    setCanvasSize();
    animate();

    window.addEventListener("resize", setCanvasSize);
});
