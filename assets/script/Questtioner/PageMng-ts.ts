/**
 * Author: fegnze
 * Date: 2018-09-13
 * Title: 
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class PageMng extends cc.Component {
    @property(cc.PageView)
    pageView: cc.PageView = null

    @property([cc.Node])
    pageTemplates: Array<cc.Node> = []

    @property(cc.Label)
    title: cc.Label = null

    onLoad () {

        let page1 = cc.instantiate(this.pageTemplates[0])
        page1.getChildByName("question").getComponent(cc.RichText).string = `<color=red><b>100</b>名学生要到离校<b>33</b><i>千米</i>处的少年宫活动．只有一辆能载<u><b>25人</b></u>的汽车,
为了使全体学生尽快地到达目的地,他们决定采取步行与乘车相结合的办法．
<size=16>已知</size>学生步行速度为每小时<b>5</b><i>千米</i>,汽车速度为<u>每小时</u><b>55</b><i>千米</i>．
要保证<color=green>全体学生</color>都<color=blue>尽快到达目的地</color>,所需时间是多少小时<s>（上、下车所用的时间不计）</s></color>`
        page1.active = true
        this.pageView.addPage(page1);

        let page2 = cc.instantiate(this.pageTemplates[0])
        page2.getChildByName("question").getComponent(cc.RichText).string = "关羽和张飞谁厉害?"
        this.pageView.addPage(page2);

        let page3 = cc.instantiate(this.pageTemplates[0])
        page3.getChildByName("question").getComponent(cc.RichText).string = "太史慈和孙策什么关系?"
        this.pageView.addPage(page3);
    }

}
