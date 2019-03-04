import { KTUIInterface } from "./KTUI-Base";

/**
 * Author: fegnze
 * Date: 2018-09-05
 * Title: Message Tips with animation
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class KTUI_ConnecttingTip extends cc.Component implements KTUIInterface{

    onLoad () {
        
    }

    start () {
    }

    show () {
        this.node.active = true;
        this.node.getComponent(cc.Animation).play();
    }

    hide () {
        let anim = this.node.getComponent(cc.Animation);
        anim.stop();
        this.node.active = false;
    }

    reset () {
        let anim = this.node.getComponent(cc.Animation);
        anim.stop();
        this.node.active = false;
    }

    onDestroy(){
        console.log("资源释放...");
    }
}
