import AvatarObject from "./AvatarObject.js";

const DEATHRATE = 300000;

class UserObject {
    constructor(username, char_config = null) {
        this.username = username;
        this.avatar = new AvatarObject(char_config)
        this.avatar.load();
        this.avatar.setMessage(this.username);
        this.lastTimeSeen = Date.now();
        this.deathTime = this.lastTimeSeen + DEATHRATE;
        this.lastGenerate = Date.now();
    }

    async updateActivity(direction, time,char_config = null) {
        this.lastTimeSeen = Date.now();

        if (direction) {
            this.avatar.setDirection(direction, time);
        }

        this.deathTime = this.lastTimeSeen + DEATHRATE;
    }

    async update(displayDebug=false, config){
        if (Date.parse(config.last_fetched_data_at) > this.lastGenerate) {
            this.avatar.spriteSheetMaker.char_config = JSON.parse(config['sprite_data']);
            this.avatar.require_redraw = true;
            this.lastGenerate = Date.parse(config.last_fetched_data_at);
        }
        await this.avatar.update();
    }
}

export default UserObject;
