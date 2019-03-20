  window.onload = function() {

    var starfieldCanvasId = "starfieldCanvas",
      framerate = 60,
      numberOfStarsModifier = 1.0,
      flightSpeed = 0.02;

    var canvas = document.getElementById(starfieldCanvasId),
      context = canvas.getContext("2d"),
      width = canvas.width,
      height = canvas.height,
      numberOfStars = width * height / 1000 * numberOfStarsModifier,
      dirX = width / 2,
      dirY = height / 2,
      stars = [],
      TWO_PI = Math.PI * 2;

    for (var x = 0; x < numberOfStars; x++) {
      stars[x] = {
        x: range(0, width),
        y: range(0, height),
        size: range(0, 1)
      };
    }

    canvas.onmousemove = function(event) {
      dirX = event.offsetX,
        dirY = event.offsetY;
    }

    window.setInterval(tick, Math.floor(1000 / framerate));

    function tick() {
      var oldX,
        oldY;

      context.clearRect(0, 0, width, height);

      for (var x = 0; x < numberOfStars; x++) {
        oldX = stars[x].x;
        oldY = stars[x].y;

        stars[x].x += (stars[x].x - dirX) * stars[x].size * flightSpeed;
        stars[x].y += (stars[x].y - dirY) * stars[x].size * flightSpeed;
        stars[x].size += flightSpeed;

        if (stars[x].x < 0 || stars[x].x > width || stars[x].y < 0 || stars[x].y > height) {
          stars[x] = {
            x: range(0, width),
            y: range(0, height),
            size: 0
          };
        }

        context.strokeStyle = "rgba(255, 255, 255, " + Math.min(stars[x].size, 1) + ")";
        context.lineWidth = stars[x].size;
        context.beginPath();
        context.moveTo(oldX, oldY);
        context.lineTo(stars[x].x, stars[x].y);
        context.stroke();
      }
    }

    function range(start, end) {
      return Math.random() * (end - start) + start;
    }
  };
