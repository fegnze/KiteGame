
import KTScenceMng from "../KiteCore/KT-ScenceMng";
import { LOADSCENE_FLAG } from "../KiteCore/KT-Define";
import KTUIMng from "../KiteCore/UI/KTUI-Mng";
import KTHttp, { KTHttpGetWithUI, KTHttpCallBackI } from "../KiteCore/KT-Http";

/**
 * Author: fegnze
 * Date: 
 * Title: 
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
	onGameScence () {
        cc.log("");
        // KTUIMng.clear();
        // cc.director.loadScene('game');
        KTScenceMng.loadScenceWithFlag('game',LOADSCENE_FLAG.CLEARKTUIMng);
    }
    
    onHttpTest () {
        (async ()=>{
            let cnTipNode = await KTUIMng.Mount("Tips/KTUI-ConnecttingTip",this.node);
            cnTipNode.show();
            KTHttp.Get('http://localhost:3000/test', {
            Success(response){

            },
            Faild(){

            }
        }, { pid: 1, roleName: "夏侯" });
        })()
        // KTHttpGetWithUI('http://localhost:3000/test', {
        //     Success(response){

        //     },
        //     Faild(){

        //     }
        // }, this.node, { pid: 1, role: "夏侯" })
    }

    onLoad () {}

    start () {}
}


