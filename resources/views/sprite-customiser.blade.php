<!doctype html>
<html lang=en>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=no">
<title>Dr_DinoMights Sprites Generator</title>

<style>
body, html { background: #fff; text-align: center; }
* { box-sizing: border-box; font-family: monospace; font-size: 14px; }
h1 { font-size: 28px; margin: 0 0 10px 0; padding: 0; }
#root { width: 460px; white-space: nowrap; margin: 0 auto; }

canvas {
image-rendering: optimizeSpeed;
image-rendering: -moz-crisp-edges;
image-rendering: -webkit-optimize-contrast;
image-rendering: -o-crisp-edges;
image-rendering: pixelated;
-ms-interpolation-mode: nearest-neighbor;
}
#c { width: 144px; height: 144px; padding: 8px; border: 1px solid #000; }

#outc { height: 64px;padding: 8px; }
label { display: block; }
label > input { width: 240px; }
label > span { display: inline-block; vertical-align: middle; width: 55px;  }
input[type=range]{ vertical-align: middle; }

#inputs { display: inline-block; vertical-align: top; text-align: left; }

.btn, button { background: #fff; text-align: center; min-width: 144px; display: inline-block; padding: 16px 32px; border: 1px solid black; color: black; text-decoration: none; font-size: 1em; margin: 0 0 10px 0; }
.btn:hover, button:hover { background: #eee }
.btn:active, button:active{ background: #ccc }

.rootloading { display: none }
    pre code {
        text-align: left;
    background-color: #eee;
    border: 1px solid #999;
    display: block;
    padding: 20px;
    }
</style>
</head>
<body>

<h1>Dr_DinoMights Sprites Generator</h1>
<p>Forked from <a href="https://0x72.itch.io/2bitcharactergenerator">2BitCharactersGenerator</a> Thanks to <a href="https://0x72.itch.io/">0x72</a></p>
<span id=loading>loading...</span>
<div id=root class=rootloading>
  <button id=animbtn>...</button>
  <button id=randomizebtn>randomize</button>
  <br />
  <canvas id=c width=16 height=16></canvas>

  <div id=inputs>
    <label><input id=eyesInput type=range min=0 max=1></label>
    <label><input id=mouthInput type=range min=0 max=1></label>
    <label><input id=earsInput type=range min=0 max=1></label>
    <label><input id=torsoInput type=range min=0 max=1></label>
    <label><input id=hairInput type=range min=0 max=1></label>

    <label><input id=colorInput type=range min=0 max=1></label>
    <button id='colormode' style="padding: 3px 5px; min-width: 0; ">012</button>
    <small id=colorinfo></small>
  </div>

  <br />
  <canvas id=outc style="display: none"></canvas>

  <pre><code id="code">

  </code></pre>
</div>

<script src='/js/sprite-customiser.js'></script>
</body>
</html>
