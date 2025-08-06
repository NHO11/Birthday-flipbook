function goToPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    startConfetti();

    // Start music if not playing
   const song = document.getElementById("bdaySong");
if (song.paused) {
  song.volume = 0.7;
  song.muted = false; // UNMUTE ONLY AFTER FIRST CLICK
  song.play();
}

      };
    
  

  function tease(message) {
    document.getElementById('teaseResponse').textContent = message;
    goToPage('teasePage');
  }

  // Confetti setup
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  let W = window.innerWidth, H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;

  let particles = [];
  function randomColor() {
    return 'rgba(' + Math.floor(Math.random() * 255) + ',' + 
                   Math.floor(Math.random() * 255) + ',' +
                   Math.floor(Math.random() * 255) + ',1)';
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 4 + 1,
        d: Math.random() * Math.PI * 2,
        color: randomColor()
      });
    }
  } 
  createParticles();

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (let p of particles) {
      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      p.y += Math.cos(p.d) + 1 + p.r / 2;
      p.x += Math.sin(p.d);
      if (p.x > W || p.x < 0 || p.y > H) {
        p.x = Math.random() * W;
        p.y = -10;
      }
    }
  }

  let interval;
  function startConfetti() {
    if (!interval) interval = setInterval(draw, 20);
  }

  // Update canvas size on window resize
  window.addEventListener('resize', () => {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    createParticles();
  });

  // Cake drawing
  const cake = document.getElementById('cake');
  const cctx = cake.getContext('2d');

  function drawCake(showCandle = true) {
    cctx.clearRect(0, 0, cake.width, cake.height);

    // Cake layers
    cctx.fillStyle = '#f9d5e5';
    cctx.fillRect(50, 200, 200, 80);

    cctx.fillStyle = '#ffc6e2';
    cctx.fillRect(60, 180, 180, 30);

    // Candle base
    cctx.fillStyle = '#ff1493';
    cctx.fillRect(140, 150, 20, 50);

    if (showCandle) {
      // Candle flame
      cctx.beginPath();
      cctx.arc(150, 140, 10, 0, Math.PI * 2);
      cctx.fillStyle = 'orange';
      cctx.fill();

      cctx.beginPath();
      cctx.moveTo(150, 130);
      cctx.lineTo(150, 120);
      cctx.strokeStyle = 'yellow';
      cctx.lineWidth = 2;
      cctx.stroke();
    }
  }

  drawCake();

  function blow() {
    drawCake(false); // Hide candle flame on blow
    document.getElementById("bdaySong").pause();
    document.getElementById("clapSound").play();
    alert('Candle blown! Make a wish ✨');
  }

