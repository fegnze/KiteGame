import {KTUIInterface} from "./KTUI-Base";

/**
 * Author: fegnze
 * Date: 2018-09-13
 * Title: loading
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class KTUI_LoadingProgress extends cc.Component implements KTUIInterface {
    @property(cc.Label)
    _text: cc.Label = null
    
    @property(cc.ProgressBar)
    _progressBar: cc.ProgressBar = null

    onLoad () {
        this._text = this.node.getChildByName("desc").getComponent(cc.Label)
        this._progressBar = this.node.getComponent(cc.ProgressBar)
        this._progressBar.progress = 0
    }

    show(data = { progress: 0.5, text: "loading..." }) {
        if (typeof data != 'object'){
            cc.error('KTUI-Loadingprogress-ts show data is invalid! , type error');
        }
        if (data.progress == null || typeof data.progress != 'number' || data.progress < 0){
            cc.error('KTUI-Loadingprogress-ts show data is invalid! , progress invalid')
        }
        if (data.text == null || typeof data.text != 'string'){
            this._text.string = data.text 
        }
        
        this._progressBar.progress = data.progress
        this.node.active = true
    }

    hide () {
        this.node.active = false
    }

    reset () {
        this._progressBar.progress = 0
        this._text.string = ''
    }
}
