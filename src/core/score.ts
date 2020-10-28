/**
 * Scoring.
 */
export default class Score {
  view: any;
  player: any;
  scoreWin: number;
  scoreLose: number;
  container: any;

  /**
   * Set references and game settings.
   */
  constructor(params: any) {
    // Instance
    this.view = params.view;
    this.player = params.player;
    this.scoreWin = params.scoreWin;
    this.scoreLose = params.scoreLose;

    // Values
    this.container = this.view.canvas;
  }

  /**
   * On: Loop
   */
  checkConditions() {
    const { player } = this;
    const { score } = player;

    if (score >= this.scoreWin) {
      this.triggerEvent('score:game-end');
      this.draw('win');
    } else if (score <= this.scoreLose) {
      this.triggerEvent('score:game-end');
      this.draw('lose');
    }
  }

  /**
   * Draw score depending on game state.
   */
  draw(state: string) {
    const { view } = this;
    const score = this.player.score | 0;
    const { ctx } = view;
    const x = view.centerX;
    const y = view.centerY;
    const text = `You ${state}`.toUpperCase();

    ctx.save();

    // Background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, view.width, view.height);

    ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';

    // Text
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '32px Arial';

    ctx.fillText(text, x, y - 5);
    ctx.font = '10px Arial';
    ctx.fillText(`Score: ${score}`, x, y + 25);

    // Shape
    ctx.beginPath();
    ctx.arc(x, y, 100, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();

    ctx.restore();
  }

  /**
   * Trigger event.
   */
  triggerEvent(eventName: string) {
    const { container } = this;

    const ev = new CustomEvent(eventName, {
      detail: {
        data: null,
      },
    });

    container.dispatchEvent(ev);
  }
}
