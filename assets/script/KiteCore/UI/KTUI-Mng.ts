import { KMap } from "../KT-Map";

/**
 * Author: fegnze
 * Date: 2018-09-06
 * Title: create and mount a kiteUI at runtime
 */
export default class KTUIMng{
    //KiteUI组件的相对根路径
    private static _path:string = "KiteUI/";
    //保存clear的时候需要保留的对象缓冲池的key
    private static _keepList: KMap = new KMap();
    //存储ui对象缓冲池的map
    private static _nodePoolMap:KMap = new KMap();

    //获取 KiteUI组件的相对根路径
    public static get getPath():string{
        return this._path;
    }

    //设置 KiteUI组件的相对根路径
    public static set setPath(path: string){
        this._path = path;
    }
    
    //设置 缓冲池keep标记
    public static keep(uiName:string,bl:boolean = true){
        this._keepList[KTUIMng._path + uiName] = bl;
    }

    //清空不需要保留的对象池(eg:切换场景时)
    public static clear(){
        this._nodePoolMap.keys.forEach((key:string,index:number)=>{
            let bl = this._keepList[key];
            
            let tmp = this._nodePoolMap[key];
            for (let index of Object.keys(this._nodePoolMap[key].inuse)){
                let node = this._nodePoolMap[key].inuse[index];
                node.release();
            }

            if (!this._keepList[key]) {
                let deps = cc.loader.getDependsRecursively(key);
                cc.loader.release(deps);

                this._nodePoolMap[key].clear();
                this._nodePoolMap[key] = new cc.NodePool();
            }
        });
    }

    //清空对象缓冲池
    public static clearNoKeep() {
        this._keepList = new KMap();
        this.clear();
    }

    //将节点放入缓冲池
    public static poolPut(poolName:string,node) {
        if (KTUIMng._nodePoolMap[poolName].inuse == null) { KTUIMng._nodePoolMap[poolName].inuse = {}; }
        delete KTUIMng._nodePoolMap[poolName].inuse[node.uuid.replace('.','_',1)];
        KTUIMng._nodePoolMap[poolName].put(node);
    }

    //将节点从缓冲池取出
    public static pollGet(poolName: string) {
        let node = KTUIMng._nodePoolMap[poolName].get();
        if (KTUIMng._nodePoolMap[poolName].inuse == null) { KTUIMng._nodePoolMap[poolName].inuse = {};}
        KTUIMng._nodePoolMap[poolName].inuse[node.uuid.replace('.', '_', 1)] = node;
        return node
    }
    
    /**
     * 
     * @param uiName KiteUI中的组件名的相对路径名
     * @param perantNode 要挂载的父节点对象
     * @param keep  是否在clear的时候保留改对象所在的缓冲池
     * @param zOrder 挂载时的zOrder
     * @param nodeName 挂载时的节点命名，不传的话默认推导（'__' + 资源文件名 + 缓冲池当前size）
     */
    public static Mount(uiName: string,perantNode: cc.Node,keep: boolean = false,zOrder: number = 1,nodeName?: string): Promise<any>{
        console.log(uiName);
        let tmps = uiName.split("/");
        let scriptName = '' + tmps[tmps.length-1] + '-ts'

        return new Promise<any>((resolve,reject)=>{
            if (parent == null) { reject(`Error:The parent node must be not null!`); }
            
            if (KTUIMng._nodePoolMap[KTUIMng._path+uiName] &&
                KTUIMng._nodePoolMap[KTUIMng._path + uiName].size() > 0){
                if (!nodeName || nodeName.length == 0) {
                    nodeName = '__' + tmps[tmps.length - 1] + KTUIMng._nodePoolMap[KTUIMng._path + uiName].size;
                }
                // let node = KTUIMng._nodePoolMap[KTUIMng._path + uiName].get();
                let node = KTUIMng.pollGet(KTUIMng._path + uiName);     
                node.show = (param: any) => { node.getComponent(scriptName).show(param); }
                node.hide = (param: any) => { node.getComponent(scriptName).hide(param); }
                node.release = (param: any) => {
                    node.getComponent(scriptName).reset();
                    //KTUIMng._nodePoolMap[KTUIMng._path + uiName].put(node);
                    KTUIMng.poolPut(KTUIMng._path + uiName, node);
                }
                if (keep) { KTUIMng.keep(uiName,keep) }
                perantNode.addChild(node, zOrder, nodeName);
                resolve(node);
                return;
            }

            cc.loader.loadRes(KTUIMng._path+uiName,(errmsg,resource)=>{
                if (errmsg == null){
                    if (!KTUIMng._nodePoolMap[KTUIMng._path + uiName]){
                        KTUIMng._nodePoolMap[KTUIMng._path + uiName] = new cc.NodePool();
                    }
                    let node = cc.instantiate(resource);
                    node.addComponent(scriptName);
                    // if (!node.getComponent(scriptName)) {
                    //     reject(`Error:Can't find script which named ${scriptName},check the script is exsit and as a componet for the Prefabs "${uiName}"`);
                    // }
                    node.show = (param: any) => { node.getComponent(scriptName).show(param); }
                    node.hide = (param: any) => { node.getComponent(scriptName).hide(param); }
                    node.release = (param: any) => {
                        //KTUIMng._nodePoolMap[KTUIMng._path + uiName].put(node);
                        node.getComponent(scriptName).reset();
                        KTUIMng.poolPut(KTUIMng._path + uiName, node);
                    }

                    if (!nodeName || nodeName.length == 0){
                        nodeName = '__' + tmps[tmps.length - 1] + KTUIMng._nodePoolMap[KTUIMng._path + uiName].size();
                    }

                    //KTUIMng._nodePoolMap[KTUIMng._path + uiName].put(node);
                    // let pnode = KTUIMng._nodePoolMap[KTUIMng._path + uiName].get();
                    KTUIMng.poolPut(KTUIMng._path + uiName,node);
                    let pnode = KTUIMng.pollGet(KTUIMng._path + uiName);
                    if (keep) { KTUIMng.keep(uiName, keep) }
                    perantNode.addChild(pnode, zOrder, nodeName);
                    resolve(node);
                }else{
                    reject(errmsg);
                }
            });
        });
    }
}
