import KTUIMng from "./KiteCore/UI/KTUI-Mng";

/**
 * Author: fegnze
 * Date: 
 * Title: 
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class GameScence extends cc.Component {
	
	
    async onLoad () {
        let node = await KTUIMng.Mount("Tips/KTUI-msgTip", this.node);
        node.show("game ...");
    }

    start () {}
}
