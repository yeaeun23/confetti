import { hexToRgb, randomNumBetween } from "./utils.js";

export default class Particle {
  constructor(x, y, deg = 0, colors, shapes, spread = 30) {
    this.angle = (Math.PI / 180) * randomNumBetween(deg - spread, deg + spread); // 퍼지는 각도
    this.r = randomNumBetween(30, 100);

    this.x = x * innerWidth;
    this.y = y * innerHeight;

    this.vx = this.r * Math.cos(this.angle);
    this.vy = this.r * Math.sin(this.angle);

    this.gravity = 0.5;
    this.friction = 0.89;

    this.width = 12;
    this.height = 12;

    this.opacity = 1;

    this.widthDelta = randomNumBetween(0, 360);
    this.heightDelta = randomNumBetween(0, 360);

    this.rotation = randomNumBetween(0, 360);
    this.rotationDelta = randomNumBetween(-1, 1);

    this.colors = colors || ["#FF577F", "#FF884B", "#FFD384", "#FFF9B0"];
    this.color = hexToRgb(this.colors[Math.floor(randomNumBetween(0, this.colors.length))]);

    this.shapes = shapes || ["circle", "square"];
    this.shape = this.shapes[Math.floor(randomNumBetween(0, this.shapes.length))];
  }

  update() {
    this.vy += this.gravity;

    this.vx *= this.friction;
    this.vy *= this.friction;

    this.x += this.vx;
    this.y += this.vy;

    this.opacity -= 0.005;

    this.widthDelta += 2;
    this.heightDelta += 2;

    this.rotation += this.rotationDelta;
  }

  drawSquare(ctx) {
    ctx.fillRect(this.x, this.y, this.width * Math.cos((Math.PI / 180) * this.widthDelta), this.height * Math.sin((Math.PI / 180) * this.heightDelta));
  }

  drawCircle(ctx) {
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, Math.abs(this.width * Math.cos((Math.PI / 180) * this.widthDelta)) / 2, Math.abs(this.height * Math.sin((Math.PI / 180) * this.heightDelta)) / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  draw(ctx) {
    ctx.translate(this.x + this.width * 1.2, this.y + this.height * 1.2); // 회전축 이동
    ctx.rotate((Math.PI / 180) * this.rotation); // 회전
    ctx.translate(-this.x - this.width * 1.2, -this.y - this.height * 1.2); // 회전축 원복

    // 랜덤 컬러
    ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;

    // 랜덤 모양 - 타원 or 사각형
    switch (this.shape) {
      case "square":
        this.drawSquare(ctx);
        break;
      case "circle":
        this.drawCircle(ctx);
        break;
    }

    ctx.resetTransform(); // 원복
  }
}
