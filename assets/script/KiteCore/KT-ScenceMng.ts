import { LOADSCENE_FLAG } from "./KT-Define";
import KTUIMng from "./UI/KTUI-Mng";

/**
 * Author: fegnze
 * Date: 2018-09-10
 * Title: scene manager
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class KTScenceMng {
	
	public static loadScence(scene:string){
        if (scene == null) { Error("LoadScence must have a string param!");}
        cc.director.loadScene(scene);
    }

    public static loadScenceWithFlag(scene:string,flag:LOADSCENE_FLAG){
        if (flag >= 1){
            for (let i = 0; flag >> i >= 1 ; i++) {
                
                switch (1 << i & flag) {
                    case LOADSCENE_FLAG.CLEARKTUIMng:
                        if ((flag & LOADSCENE_FLAG.CLEARKTUIMng_NOKEEP) == 0){
                            KTUIMng.clear();
                        }
                        break;

                    case LOADSCENE_FLAG.CLEARKTUIMng_NOKEEP:
                        KTUIMng.clearNoKeep();
                        break;

                    case LOADSCENE_FLAG.TEST:
                        console.log('===========',LOADSCENE_FLAG.TEST);
                        break;

                    default:
                        break;
                }
                
            }
        }
        
        this.loadScence(scene);
    }
}
