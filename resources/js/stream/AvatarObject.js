import SpriteMaker from "./SpriteMaker.js";

const SPRITE_INCREMENT = 48,
      SPRITE_SIZE = 16,
      MOVEMENT_SPEED = 1.2,
      MIN_ANIMATION_TIME = 3000,
      MAX_ANIMATION_TIME = 7000,
      TIMESPERFRAME = 250;

var a = function(n) {
return n
    .split(',')
    .map(function(k){ return { x: parseInt(k), f: !!k.match('f')} });
}
var ANIMS = {
    rotate: a("0,0f,4,2"),
    down: a("0,3,5f,2f"),
    up: a("1,4,4f,1f"),
    left: a("2,5"),
    right: a("0f,3f"),
    idle: a("3,2f")
}

var currentAnimName;

class AvatarObject {
    constructor(char_config = null, direction = 'idle', x = 0, y = 0) {
        currentAnimName = direction;
        this.spriteSheetMaker = new SpriteMaker(char_config);

        this.ideling = false;

        var keys = Object.keys(ANIMS);
        this.direction = keys[ keys.length * Math.random() << 0];
        this.x = x; // where to draw X coordinate
        this.y = y; // where to draw Y coordinate.
         // the height of sprite
        this.timePerFrame = TIMESPERFRAME; //time in(ms) given to each frame default 250ms
        this.numberOfFrames = ANIMS[this.direction].length - 1; //number of frames(sprites) in the spritesheet, default 1
        //current frame pointer
        this.frameIndex = 0;

        this.require_redraw = false;
    }

    async load() {
        this.spriteSheetMaker.load();
        window.addEventListener("SpritMakerLoaded", async () => {
            var image  = new Image();
            image.src = this.spriteSheetMaker.getImage();
            this.spriteSheet = image;
            this.reversedSpriteSheet = document.createElement('canvas');

            this.spriteSheet.addEventListener('load', () => {

                this.reversedSpriteSheet.width = this.spriteSheet.width;
                this.reversedSpriteSheet.height = this.spriteSheet.height;
                const ctx2 = this.reversedSpriteSheet.getContext('2d');
                ctx2.scale(-1, 1); // flip
                ctx2.drawImage(this.spriteSheet, -this.spriteSheet.width, 0);
            }, {once: true});

            this.width = this.spriteSheet.width;     //the width of sprite
            this.height = this.spriteSheet.height;
                    //last time frame index was updated
            this.lastUpdate = Date.now();
            this.lastAnimationChange = Date.now();
            document.dispatchEvent(AvatarLoaded);
        },{
            once: true,
            passive: true,
            capture: true
          });

        // co;nsole.image( await this.spriteSheetMaker.getImage());
    }

    async update() {

        if (this.require_redraw) {
            console.log("here redrawing");
            await this.load();
            this.require_redraw = false;
        }


        if(Date.now() - this.lastUpdate >= this.timePerFrame) {
            this.frameIndex++;
            if(this.frameIndex > this.numberOfFrames) {
                this.frameIndex = 0;
            }
            this.lastUpdate = Date.now();
        }
    }

    changeAnimation(context) {

        let currentDate = Date.now();

        if ((currentDate >= this.lastAnimationChange + MIN_ANIMATION_TIME &&
            Math.random() < 0.20) ||
            (currentDate >= this.lastAnimationChange + MAX_ANIMATION_TIME)
        ){
            const keys = Object.keys(ANIMS)
                .filter(dir => dir !== this.direction);
                // console.log(keys);
            this.direction = keys[ keys.length * Math.random() << 0];
            this.lastAnimationChange = currentDate;
        }

        if (this.y + SPRITE_SIZE > context.canvas.height-5){
            this.direction = 'up'
            // this.lastAnimationChange = Date.now();
        }else if (this.y < 5) {
            this.direction = 'down'
            // this.lastAnimationChange = Date.now();
        }
        else if (this.x <0 && this.direction == 'left') {
            // this.direction = 'right'
            this.x = context.canvas.width-5;
            // this.lastAnimationChange = Date.now();

        }
        else if (this.x + SPRITE_SIZE > context.canvas.width && this.direction == 'right') {
            this.x = 0;

            // this.lastAnimationChange = Date.now();
        }

        // console.log(this.x + SPRITE_SIZE, context.canvas.width, this.x + SPRITE_SIZE > context.canvas.width)
        // this.direction = direction;
        // this.frameIndex = 0;
    }

    setMessage(message) {
        this.message = message;
    }

    setDirection(direction, time) {
        let dateNow = Date.now();
        this.direction = direction;
        if (time) {
            dateNow += time;
        }
        this.lastAnimationChange = dateNow;
    }

    displayMessage(context, message) {
        this.drawTextBG(context, message || this.message);
    }

    drawTextBG(ctx, txt, font = '12px Pixeled') {
        /// lets save current state as we make a lot of changes
        ctx.save();

        /// set font
        ctx.font = font;

        /// draw text from top - makes life easier at the moment
        ctx.textBaseline = 'top';

        /// color for background
        ctx.fillStyle = 'rgb(204, 153, 0, 0.3)';

        /// get width of text
        var width = ctx.measureText(txt).width;

        let y = this.y ;//- 40;
        let x = this.x ;//- width;

        if (y - 40 < (ctx.canvas.height / 2)) {
            y = this.y + SPRITE_SIZE + (parseInt(font, 10));
        }
        else if (this.y > (ctx.canvas.height / 2)) {
            y = this.y - (parseInt(font, 10)+20);
        }

        if (x < 0) {
            x = width + SPRITE_SIZE;
        }else if (this.x > (ctx.canvas.width / 2)) {
            x = this.x - width + SPRITE_SIZE;
        }

        /// draw background rect assuming height of font
        ctx.fillRect(x, y, width+10, parseInt(font, 10)+10);

        /// text color
        ctx.fillStyle = '#0F111A';
        // ctx.textAlign = "center";
        /// draw text on top
        ctx.fillText(txt, x+5, y+5);

        /// restore original state
        ctx.restore();
    }

    async draw(context) {
        if (!this.loading) {
            var time = Date.now ? Date.now() : +(new Date());

            var nt = parseInt(time / 200);
            // var anim = ANIMS[this.direction];
            var anim = ANIMS[this.direction];
            var len = anim.length;

            var findex = nt % len;
            var frame = anim[findex];

            this.changeAnimation(context);

            this.displayMessage(context);


            if (!this.ideling) {
                if (this.direction == 'down') {
                    this.y += MOVEMENT_SPEED;
                }else if (this.direction == 'up') {
                    this.y -= MOVEMENT_SPEED;
                }else if (this.direction == 'right') {
                    this.x += MOVEMENT_SPEED;
                }else  if (this.direction == 'left') {
                    this.x -= MOVEMENT_SPEED;
                }
            }

            context.save();

            context.drawImage(
                !frame.f ? this.spriteSheet : this.reversedSpriteSheet,
                frame.x * 16,
                0,
                16,
                16,
                this.x,
                this.y,
                SPRITE_SIZE,
                SPRITE_SIZE
            );
            context.restore();
        }
    }
}

export var AvatarLoaded = new Event (
    "AvatarLoaded", {
        bubbles: true,
        cancelable: true,
        composed: true
    }
)

export default AvatarObject;
