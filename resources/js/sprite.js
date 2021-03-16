import UserObject from "./stream/UserObject.js";

let canvas, context;

let users = [];
const disallowList = [
    'pretzelrocks',
    'streamelements'
];


const client = new tmi.Client({
	connection: { reconnect: true },
	channels: [ 'Dr_DinoMight' ]
});


window.onload = () => {
    canvas = document.getElementById('container');
    canvas.width = document.documentElement.clientWidth - 16;
    canvas.height = document.documentElement.clientHeight -16;
    context = canvas.getContext("2d");
    context.imageSmoothingEnabled = false;

    client.connect();

    client.on("connected", (address, port) => {
        console.log("connected");
    })

    client.on("chat", (channel, userstate, message, self) => {
        // Don't listen to my own messages..
        if (self || disallowList.indexOf(userstate['display-name'].toLowerCase()) == 1) return;
        // Do your stuff.
        var user = users.find(o => o.username.toLowerCase() == userstate['display-name'].toLowerCase())
        // console.log(!user);
        if (!user) {

            var prefectedChannelsUser = prefectedChannels[userstate['display-name'].toLowerCase()];
            if (prefectedChannels[userstate['display-name'].toLowerCase()]) {
                users.push(new UserObject(prefectedChannelsUser["twitch_username"], prefectedChannelsUser["sprite_data"]));
            } else {
                users.push(new UserObject(userstate['display-name']));
            }

            // console.log(users);
        }
        else{
            let action = null,
                time = null;

            // commands
            if (message.startsWith('!')) {
                let command = message.split(" ")[0];
                switch (command.toLowerCase()) {
                    case '!dance':
                        action = 'rotate';
                        time = parseInt(message.replace('!dance','').trim());
                        break;
                    case '!idle':
                        action = 'idle';
                        time = parseInt(message.replace('!idle','').trim());
                        break;
                    case '!left':
                        action = 'left';
                        time = parseInt(message.replace('!left','').trim());
                        break;
                    case '!right':
                        action = 'right';
                        time = parseInt(message.replace('!right','').trim());
                        break;
                    case '!up':
                        action = 'up';
                        time = parseInt(message.replace('!up','').trim());
                        break;
                    case '!down':
                        action = 'down';
                        time = parseInt(message.replace('!down','').trim());
                        break;

                }

                if (Number.isNaN(time) || time > 999999  || time < 0){
                    time = 1000;
                }
            }

            user.updateActivity(
                action,
                time
            );
        }
    });

    // users.push(new UserObject('hello long name', 'dr_dinos'));

    document.addEventListener('AvatarLoaded', () => {
        loop();
    }, {
        once: true,
        passive: true,
        capture: true
      })
}

const loop = () => {
    update();
    draw();
    requestAnimationFrame(loop);
}

const update = () => {
    let newUser = [];
    users.forEach( (user) =>{
        if (user.deathTime >= Date.now()){
            newUser.push(user);
            var config = prefectedChannels[user.username];
            user.update(true, config);
        }
    });
    users = newUser;
}

const draw = async () => {
    context.clearRect(0,0,canvas.width, canvas.height);
    users.forEach( (user) =>{
        // console.log('useruser)
        user.avatar.draw(context);
    });
}

