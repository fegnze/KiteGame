/**
 * Author: fegnze
 * Date: 2018-09-13
 * Title: 
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class PageItem extends cc.Component {
    @property(cc.Label)
    question: cc.Label = null

    onload(){
        
    }

    setQuestion(qa:string){
        this.question.string = qa
    }

}
