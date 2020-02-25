import Base from "../../engine/Base.js"
import Input from "../../engine/base/Input.js"
import CircleComponent from "../../engine/components/CircleComponent.js"
import TapHandler from "./TapHandler.js";

export default class CircleBehaviour extends Base.Behavior {
    circle;
    tapHandler;
    start() {
        this.circle = this.gameObject.getComponent(CircleComponent);
        this.tapHandler = this.gameObject.getComponent(TapHandler);
    }

    update() {

    }

    pulse() {
        if(Input.down[' '] || Input.frameDown[' ']) {
            this.circle.radius = 90;
            let delta = this.tapHandler.tapDown();

            if (this.tapHandler.soundOn) {
                if (Math.abs(delta) < this.tapHandler.beatTime / 6) {
                    this.circle.fill = "green";
                }
                else if (Math.abs(delta) < this.tapHandler.beatTime * 2 / 6) {
                    this.circle.fill = "yellow"
                }
                else {
                    this.circle.fill = "red";
                }
            }
        } 
        else if (Input.up[' '] || Input.frameUp[' ']){
            this.circle.radius = 100;
            this.circle.fill = "white";
            this.tapHandler.tapUp();
        }
    }
}