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
    }

    updateActivity() {
        this.lastTimeSeen = Date.now();
        this.deathTime = this.lastTimeSeen + DEATHRATE;
    }

    async update(displayDebug=false){
        await this.avatar.update();
    }
}

export default UserObject;
