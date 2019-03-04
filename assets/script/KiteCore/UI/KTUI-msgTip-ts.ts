import {KTUIInterface} from "./KTUI-Base";

/**
 * Author: fegnze
 * Date: 2018-09-05
 * Title: Message Tips with animation
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class KTUI_MsgTip extends cc.Component implements KTUIInterface{
    @property(cc.Label)
    content: cc.Label = null;

    onLoad () {
        this.content = this.node.getChildByName("content").getComponent(cc.Label);
    }

    start () {
    }

    show(msg: any) {
        if (typeof msg == 'object'){
            msg = JSON.stringify(msg);
        }else{
            msg = '' + msg;
        }
        this.content.string = msg;
        this.node.active = true;
        this.node.getComponent(cc.Animation).play();
    }

    hide () {
        let anim = this.node.getComponent(cc.Animation);
        anim.stop();
        this.node.active = false;
    }

    reset () {
        this.content.string = "";
        let anim = this.node.getComponent(cc.Animation);
        anim.stop();
        this.node.active = false;
    }

    onDestroy(){
        console.log("资源释放...");
    }
}
