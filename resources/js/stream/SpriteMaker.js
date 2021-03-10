var gTextures = { loaded: 0, requested: 0 };
const PARTS_MAX = {
    eyes: 16,
    mouth: 8,
    ears: 7,
    torso: 6,
    hair: 22,
  };

let COLORS = {
    'dr_dinos': [ "#181B29", "#81F900", "#FFB626", "#315F00"],
    'panthers': [ "#181B29", "#F11012", "#FFB626", "#F2F2F2"],
    "battlebot by luce carter": ["#181B29", "#FFA03A", "#0F2745", "#787878"],
    "basic" : ["#000000", "#787878", "#e8e8e8", "#ffffff"],
    "ice cream gb palette by kerrie lake": ["#7c3f58", "#eb6b6f", "#f9a875", "#fff6d3"],
    "mist gb palette by kerrie lake": ["#2d1b00", "#1e606e", "#5ab9a8", "#c4f0c2"],
    "rustic gb palette by kerrie lake": ["#2c2137", "#764462", "#edb4a1", "#a96868"],
    "en4 palette by endesga": ["#20283d", "#426e5d", "#e5b083", "#fbf7f3"],
    "grand dad 4 palette by starlane": ["#4c1c2d", "#d23c4e", "#5fb1f5", "#eaf5fa"],
    "pokemon (sgb) palette": [ "#181010", "#84739c", "#f7b58c", "#ffefff" ],
    "grafxkid gameboy pocket (gray) palette by grafxkid": [ "#2b2b26", "#706b66", "#a89f94", "#e0dbcd" ],
    "cga palette 1 (high) palette": [ "#000000", "#ff55ff", "#55ffff", "#ffffff" ],
    "nintendo gameboy (arne) palette by arne": [ "#243137", "#3f503f", "#768448", "#acb56b" ],
    "jb4 palette by haretro for his game jet boy": [ "#260016", "#ed008c", "#00bff3", "#daf3ec" ],
    "sweet guaranã palette by madpezkoh": [ "#253b46", "#18865f", "#61d162", "#ebe7ad" ],
    "grafxkid gameboy pocket (green) palette by grafxkid": [ "#4c625a", "#7b9278", "#abc396", "#dbf4b4" ],
    "yellow mellow": ["#181b29", "#b3760a", "#ffb626", "#cc9900"],
    "sql by matty_twoshoes": ["#755ACD", "#000000", "#82E4C6", "#4c625a"]
}

var gParts = {}
var gColorMode = '013';


class SpriteMaker {

    constructor( char_config = null) {
        this.canvas = document.createElement('canvas');
        this.canvas.width = 16 * 6;
        this.canvas.height = 16 * 1;
        this.context = this.canvas.getContext('2d');
        this.loading = true;
        if (char_config) {
            this.char_config = JSON.parse(char_config);
        }
        // console.log(this.chosenColor, color, COLORS);
        // console.log('this.chosenColor', this.chosenColor)
    }

    async load() {
        await this.loadAllTextures();
        if (this.char_config != null){
            gParts['hair'] = this.char_config.hair;
            gParts['eyes'] = this.char_config.eyes;
            gParts['mouth'] = this.char_config.mouth;
            gParts['ears'] = this.char_config.ears;
            gParts['torso'] = this.char_config.torso;
            this.chosenColor = COLORS[this.char_config.color];
            gColorMode = this.char_config.gColorMode;
            console.log('pred', this.char_config,this.chosenColor, this.char_config.color, COLORS);
        }
        else {
            await this.randomiseAll();
        }
        await this.updatecanvas();
    }

    getCanvas() {
        return this.canvas;
    }

    getImage() {
        var image = this.canvas.toDataURL("image/png");
        return image;
    }

    async loadTexture(key) {
        var self = this;
        var texture = new Image();
        texture.src = `/imgs/spriteParts/${key}.png?v=${Math.random()}`;
        gTextures.requested++;
        gTextures[key] = texture;
        texture.onload = function(e) {
            gTextures.loaded++;

            if (gTextures.loaded == gTextures.requested){
                self.updatecanvas().then(() => {
                    window.dispatchEvent(SpriteMakerLoaded);
                });
            }
        }
    }

    async loadAllTextures() {
        await this.loadTexture("hair");
        await this.loadTexture("base");
        await this.loadTexture("eyes");
        await this.loadTexture("mouth");
        await this.loadTexture("ears");
        await this.loadTexture("torso");
        await this.loadTexture("hands");
    }

    drawPart(key, forceY, forceFrame){
        var y = gParts[key] == null ? forceY : gParts[key]; // 0's falsy
        if(y == null){ return }
        var w = 16 * 6;
        var h = 16;

        if(forceFrame || forceFrame === 0){
            this.context.drawImage(gTextures[key], forceFrame*16, y*16, 16, 16, forceFrame*16, 0, 16, 16);
        } else {
            this.context.drawImage(gTextures[key], 0, y*16, w, h, 0, 0, w, h);
        }
    }


    async updatecanvas() {

        if (gTextures.loaded == gTextures.requested){
            this.loading = true;
            this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
            this.context.drawImage(gTextures['base'], 0, 0);

            this.drawPart("hair");
            this.drawPart("torso");
            this.drawPart("ears");
            this.drawPart("mouth");
            this.drawPart("eyes");
            this.drawPart("hands", 0);

            // back of the hair
            // this.drawPart("hair", null, 4);
            // this.drawPart("hair", null, 1);
            await this.colourSprite();
            this.loading = false
            return this.canvas;
        }
    }

    async colourSprite() {
        var imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
        var data = imageData.data
        const keys = Object.keys(COLORS);
        // console.log(keys);
        var color = this.chosenColor || COLORS[keys[ keys.length * Math.random() << 0]];

        var C = (n) => {
            return [
                parseInt(color[n].substr(1, 2), 16),
                parseInt(color[n].substr(3, 2), 16),
                parseInt(color[n].substr(5, 2), 16)
            ];
        }

        var mode = gColorMode.split('').map(function(n){ return parseInt(n) });
        var dark = C(mode[0]);
        var mid = C(mode[1]);
        var light = C(mode[2]);

        for (var i=0; i<data.length; i+=4) {
            var r = data[i];
            if(r<50){
                data[i+0] = dark[0];
                data[i+1] = dark[1];
                data[i+2] = dark[2];
                data[i+3] = 255;
            } else if(r<180){
                data[i+0] = mid[0];
                data[i+1] = mid[1];
                data[i+2] = mid[2];
                data[i+3] = 255;
            } else if(r<245){
                data[i+0] = light[0];
                data[i+1] = light[1];
                data[i+2] = light[2];
                data[i+3] = 255;
            }else if(r<251){
                data[i+0] = light[0];
                data[i+1] = light[1];
                data[i+2] = light[2];
                data[i+3] = 255;
            } else {
                data[i+0] = 255;
                data[i+1] = 255;
                data[i+2] = 255;
                data[i+3] = 0;
            }
        }
        this.context.putImageData(imageData,0,0);
    }

    async randomise(key){
        for (var i=0; i<6; i++){
            var max = PARTS_MAX[key];
            var randval = Math.floor(Math.random() * (max + 1));
            gParts[key] = randval;
        }
    }

    async randomiseAll(){
        await this.randomise("hair");
        await this.randomise("eyes");
        await this.randomise("mouth");
        await this.randomise("ears");
        await this.randomise("torso");
        this.loading = false;
    }

}

export var SpriteMakerLoaded = new Event (
    "SpritMakerLoaded", {
        bubbles: true,
        cancelable: true,
        composed: true
    }
)


export default SpriteMaker;
