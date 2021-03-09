var showCanvas = document.getElementById('c');
//var outCanvas = document.createElement('canvas');
var outCanvas = document.getElementById('outc');
outCanvas.width = 16 * 6;
outCanvas.height = 16 * 1;

var ctx = showCanvas.getContext('2d');
var outCtx = outCanvas.getContext('2d');

var a = function(n) {
  return n
    .split(',')
    .map(function(k){ return { x: parseInt(k), f: !!k.match('f')} });
}
var ANIMS = {
  rotate: a("0,2f,1,2"),
  run_front: a("0,3,0f,3f"),
  run_back: a("1,4,1f,4f"),
  run_left: a("2,5"),
  run_right: a("2f,5f"),
  idle: a("3,3f")
}
var ANIM_NAMES = Object.keys(ANIMS);
var currentAnimName = "run_front";

var gTextures = { loaded: 0, requested: 0 };

loadAllTextures();

var __appstarted = false;


function loadTexture(key) {
  var tex = new Image();
  tex.src = "/imgs/spriteParts/" + key + ".png?v=" + Math.random();

  gTextures.requested++;
  gTextures[key] = tex;

  tex.onload = function() {
    gTextures.loaded++;
    if(gTextures.loaded === gTextures.requested){
      if(__appstarted){
        updateOutCanvas();
      } else {
        startApp();
      }
    } else {
      document.getElementById('loading').innerText =
        "loading... " + gTextures.loaded + " / " + gTextures.requested;
    }
  }
}

function loadAllTextures() {
  loadTexture("hair");
  loadTexture("base");
  loadTexture("eyes");
  loadTexture("mouth");
  loadTexture("ears");
  loadTexture("torso");
  loadTexture("hands");
}

function startApp() {
  __appstarted = true;
  setupInput("eyes")
  setupInput("mouth")
  setupInput("ears")
  setupInput("torso")
  setupInput("hair")
  setupColorInput();
  setupColorMode();

  updateOutCanvas();
  updateAnimBtnText();
  window.setInterval(animate, 16);

  document.getElementById('loading').innerText = '';
  document.getElementById('root').className = '';
}

function animate(){ //CONTEXT
  ctx.clearRect(0, 0, 16, 16);
  var t = Date.now ? Date.now() : +(new Date());

  var nt = parseInt(t / 200)
  var anim = ANIMS[currentAnimName];
  var len = anim.length;

  var findex = nt % len;
  var frame = anim[findex];

  ctx.save();
  if(frame.f){
    ctx.translate(16, 0);
    ctx.scale(-1, 1);
  }
  ctx.drawImage(outCanvas, frame.x * 16, 0, 16, 16, 0, 0, 16, 16);
  ctx.restore();
}


var animbtn = document.getElementById('animbtn');
function updateAnimBtnText(){
  animbtn.innerText = currentAnimName.replace("_", " ");
}
animbtn.onclick = function() {
  var index = ANIM_NAMES.indexOf(currentAnimName);
  currentAnimName = ANIM_NAMES[index + 1] || ANIM_NAMES[0];
  updateAnimBtnText();
}
showCanvas.onclick = animbtn.onclick;

var randomizebtn = document.getElementById('randomizebtn');
randomizebtn.onclick = function() {
  var inputs = document.getElementById('inputs').querySelectorAll('input');

  for(var i=0; i<inputs.length; i++){
    var input = inputs[i];

    var key = input.id.replace("Input", "");
    var max = PARTS_MAX[key];
    var randval = Math.floor(Math.random() * (max + 1));
    input.value = randval;
    gParts[key] = randval;
  }

  updateOutCanvas();
}

// 13 * 9 * 7 * 6 * 23 = 113'022
var PARTS_MAX = {
  eyes: 16,
  mouth: 8,
  ears: 6,
  torso: 6,
  hair: 22,
};

var COLORS = [
  ["#000000", "#787878", "#e8e8e8", "#ffffff", "Basic"],
  ["#7c3f58", "#eb6b6f", "#f9a875", "#fff6d3", "ICE CREAM GB PALETTE by Kerrie Lake"],
  ["#2d1b00", "#1e606e", "#5ab9a8", "#c4f0c2", "MIST GB PALETTE by Kerrie Lake"],
  ["#2c2137", "#764462", "#edb4a1", "#a96868", "RUSTIC GB PALETTE by Kerrie Lake"],
  ["#20283d", "#426e5d", "#e5b083", "#fbf7f3", "EN4 PALETTE by ENDESGA"],
  ["#4c1c2d", "#d23c4e", "#5fb1f5", "#eaf5fa", "GRAND DAD 4 PALETTE by Starlane"],
  [ "#181010", "#84739c", "#f7b58c", "#ffefff", "POKEMON (SGB) PALETTE" ],
  [ "#2b2b26", "#706b66", "#a89f94", "#e0dbcd", "GRAFXKID GAMEBOY POCKET (GRAY) PALETTE by GrafxKid" ],
  [ "#000000", "#ff55ff", "#55ffff", "#ffffff", "CGA PALETTE 1 (HIGH) PALETTE" ],
  [ "#243137", "#3f503f", "#768448", "#acb56b", "NINTENDO GAMEBOY (ARNE) PALETTE by Arne" ],
  [ "#260016", "#ed008c", "#00bff3", "#daf3ec", "JB4 PALETTE by Haretro for his game Jet Boy" ],
  [ "#253b46", "#18865f", "#61d162", "#ebe7ad", "SWEET GUARANÃ PALETTE by MadPezkoh" ],
  [ "#4c625a", "#7b9278", "#abc396", "#dbf4b4", "GRAFXKID GAMEBOY POCKET (GREEN) PALETTE by GrafxKid" ],
  [ "#181B29", "#81F900", "#FFB626", "#315F00", "DR DINOS" ],
  [ "#181B29", "#F11012", "#FFB626", "#F2F2F2", "P4NTH3RS" ],
  [ "#181b29", "#b3760a", "#ffb626", "#cc9900", "YELLOW MELLOW" ],
  ["#181B29", "#FFA03A", "#0F2745", "#FFA03A", "BATTLEBOT by Luce Carter"],

];

var gParts = {}
var gColor = 0;
var gColorMode = '012';

function drawPart(key, forceY, forceFrame){
  var y = gParts[key] == null ? forceY : gParts[key]; // 0's falsy
  if(y == null){ return }
  var w = 16 * 6;
  var h = 16;


  if(forceFrame || forceFrame === 0){
    outCtx.drawImage(gTextures[key], forceFrame*16, y*16, 16, 16, forceFrame*16, 0, 16, 16);
  } else {
    outCtx.drawImage(gTextures[key], 0, y*16, w, h, 0, 0, w, h);
  }
}

function updateOutCanvas() {
  outCtx.clearRect(0, 0, outCanvas.width, outCanvas.height);

  outCtx.drawImage(gTextures['base'], 0, 0); // base

  drawPart("hair");
  drawPart("torso");
  drawPart("ears");
  drawPart("mouth");
  drawPart("eyes");
  drawPart("hands", 0);

  // back of the hair
  drawPart("hair", null, 4);
  drawPart("hair", null, 1);


  var imageData = outCtx.getImageData(0, 0, outCanvas.width, outCanvas.height);
  var data = imageData.data

  function C(n){
    return [
      parseInt(COLORS[gColor][n].substr(1, 2), 16),
      parseInt(COLORS[gColor][n].substr(3, 2), 16),
      parseInt(COLORS[gColor][n].substr(5, 2), 16)
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
    } else {
      data[i+0] = 255;
      data[i+1] = 255;
      data[i+2] = 255;
      data[i+3] = 255;
    }
  }

  outCtx.putImageData(imageData,0,0);

  // it's always a small file so this should be good enough:
  var str = Object.keys(gParts).sort().map(function(k){
    return ("00"+gParts[k]).slice(-2);
  }).join('') + "_" + gColor + gColorMode;


  var output = document.getElementById('code');
  output.innerText = ` {
    "hair": ${document.getElementById('hairInput').value},
    "eyes": ${document.getElementById('eyesInput').value},
    "mouth": ${document.getElementById('mouthInput').value},
    "ears": ${document.getElementById('earsInput').value},
    "torso": ${document.getElementById('torsoInput').value},
    "hands": 0,
    "gColorMode": "${document.getElementById('colormode').innerText}",
    "color": "${document.getElementById('colorinfo').innerText.toLowerCase()}"
}`

  // document.getElementById('serialized_input').value = s;
}

function prefixInputWithASpan(input, text){
  var span = document.createElement("span");
  span.innerText = text;
  input.parentElement.prepend(span);
}

function setupInput(key){
  var input = document.getElementById(key + "Input");
  prefixInputWithASpan(input, key)
  input.setAttribute('min', 0);
  input.setAttribute('max', PARTS_MAX[key]);
  input.value = parseInt(Math.random() * (PARTS_MAX[key] + 1));
  var inputUpdate = function(e){
    gParts[key] = parseInt(e.target.value);
    console.log("INPUT UPDATE", e.target.value, gParts);
    updateOutCanvas();
  }
  inputUpdate({ target: input });
  input.onchange = inputUpdate;
  input.oninput = inputUpdate;
};

function setupColorInput() {
  var key = 'color';
  var input = document.getElementById(key + "Input");
  prefixInputWithASpan(input, 'colors')

  input.setAttribute('min', 0);
  input.setAttribute('max', COLORS.length - 1);
  input.value = 0;
  var inputUpdate = function(e){
    gColor = parseInt(e.target.value);
    console.log("COLOR UPDATE", e.target.value, gColor);
    document.getElementById('colorinfo').innerText = COLORS[gColor][4];
    updateOutCanvas();
  }
  inputUpdate({ target: input });
  input.onchange = inputUpdate;
  input.oninput = inputUpdate;
}

function setupColorMode() {
  var btn = document.getElementById("colormode");

  btn.onclick = function() {
    if(gColorMode == '012'){ gColorMode = '023' }
    else if(gColorMode == '023'){ gColorMode = '013' }
    else if(gColorMode == '013'){ gColorMode = '123' }
    else { gColorMode = '012' }

    btn.innerText = gColorMode;

    updateOutCanvas();
  }
}

