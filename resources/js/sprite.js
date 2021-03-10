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
            }else {
                users.push(new UserObject(userstate['display-name']));
            }

            // console.log(users);
        }
        else{
            let action,
                time;

            if (message.startsWith('!')) {

                if (message.startsWith('!dance')) {
                    action = 'rotate';
                    time = parseInt(message.replace('!dance','').trim());
                } else if (message.startsWith('!mleft')) {
                    time = parseInt(message.replace('!mleft','').trim());
                    action ='left';
                } else if (message.startsWith('!mright')) {
                    time = parseInt(message.replace('!mright','').trim());
                    action = 'right';
                }else if (message.startsWith('!mup')) {
                    time = parseInt(message.replace('!mup','').trim());
                    action = 'up';
                }else if (message.startsWith('!mdown')) {
                    time = parseInt(message.replace('!mdown','').trim());
                    action = 'down';
                }else if (message.startsWith('!idle')) {
                    time = parseInt(message.replace('!idle','').trim());
                    action = 'idle';
                }

                if (Number.isNaN(time) || time > 999999  || time < 0){
                    time = 1000;
                }

                user.updateActivity(
                    action,
                    time
                );
            }
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

