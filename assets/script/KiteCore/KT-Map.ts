/**
 * Author: fegnze
 * Date: 2018-09-07
 * Title: Map
 */

/**
 * 高性能map，key类型只支持 string|number|symbol
 * 因object中，string索引和number索引的结果一样，
 * object无法重写取值赋值器,故不做泛型约定
 */
export class KMap {
    constructor() {
    }

    public copy():KMap{
        let newmap = new KMap();
        for (var key of this.keys){
            newmap[key] = this[key];
        }
        return newmap;
    }

    public get length():number {
        return this.keys.length;
    }

    public get keys():string[]{
        return Object.keys(this);
    }

    public remove(key:string){
        delete this[key];
    }
}

/**
 * 通用Map，键值对类型约定
 */
export interface KVI<K,V>{
    key: K
    value: V
}

/**
 * 通用map，list存储，性能低，key，value类型不限。
 * 不建议使用的情况:key类型为string|int|symbol,且键值对量级大
 */
export class KTMap<K,V> {
    private _list: KVI<K,V>[]

    constructor (){
        this.clear();
    }

    public set append(kv:KVI<K,V>){
        for (var v of this._list) {
            if (v.key == kv.key) { 
                v.value = kv.value;
                return; 
            }
        }
        this._list.push(v);
    }

    public push(key:K,value:V){
        this.append = {key:key,value:value};
    }
    
    public value(key:K): V{
        for (var v of this._list){
            if (v.key == key){return v.value}
        }
        return null
    }

    public get length():number{
        return this._list.length
    }
    
    public get keys():K[]{
        let keys:K[] = [];
        for(var v of this._list){
            keys.push(v.key);
        }
        return keys;
    }

    public get values():V[]{
        let values: V[] = [];
        for (var v of this._list) {
            values.push(v.value);
        }
        return values;
    }

    public get isEmpty():boolean{
        return this._list == null || this._list.length == 0 
    }

    public containsKey(key: K):boolean{
        for (var v of this._list){
            if (v.key == key)
                return true;
        }
        return false
    }

    public containsValue(value: V):boolean{
        for (var v of this._list) {
            if (v.value == value)
                return true;
        }
        return false
    }
    
    clear() {
        this._list = new Array<KVI<K, V>>();
    }
}