<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        @font-face {
            font-family: Pixeled;
            src: url(/fonts/Pixeled.ttf);
        }
        #container {
            overflow: hidden;
        }
        :root{
            background: transparent;
            overflow: hidden;
        }

    </style>
</head>
<body>
    <canvas id="container">
    </canvas>
    <script src="https://cdn.rawgit.com/adriancooney/console.image/c9e6d4fd/console.image.min.js"></script>
    <script src="/js/tmi.js" type="module"></script>

    <script type="application/javascript">
        var prefectedChannels = @json($sprites);

        let cInterval = setInterval(async () => {
            var resp = await fetch('{{route('xhr.sprite_config')}}');
            prefectedChannels = await resp.json();
            console.log(prefectedChannels);
            // prefectedChannels = await fetch('{{route('xhr.sprite_config')}}')
        }, 10000);

    </script>

    <script src="/js/sprite.js" type="module"></script>
</body>
</html>
