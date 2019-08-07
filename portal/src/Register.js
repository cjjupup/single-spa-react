require('es6-promise').polyfill();
import * as singleSpa from 'single-spa';
import { GlobalEventDistributor } from './GlobalEventDistributor' 
import _ from 'loadsh'
const globalStore = new GlobalEventDistributor();

// hash 模式
export function hashPrefix(app) {
    return function (location) {
        let isShow = false
        //如果该应用 有多个需要匹配的路劲
        if(isArray(app.path)){
            app.path.forEach(path => {
                if(location.hash.startsWith(`#${path}`)){
                    isShow = true
                }
            });
        }
        // 普通情况
        else if(location.hash.startsWith(`#${app.path || app.url}`)){
            isShow = true
        }
        return isShow;
    }
}

// 普通路径模式
export function pathPrefix(app) {
    return function (location) {
        let isShow = false
        //如果该应用 有多个需要匹配的路劲
        if(isArray(app.path)){
            app.path.forEach(path => {
                if(location.pathname.indexOf(`${path}`) === 0){
                    isShow = true
                }
            });
        }
        // 普通情况
        else if(location.pathname.indexOf(`${app.path || app.url}`) === 0){
            isShow = true
        }
        return isShow;
    }
}

function isNotEmptyObj (obj) {
    for (let key in obj) {
        return true
    }
    return false
}
export async function registerApp(params) {
    // 导入store模块
    let storeModule = {}, customProps = {};
    // 尝试导入store
    try {
        storeModule = params.store ? await SystemJS.import(params.store) : {};
    } catch (e) {
        console.log(`Could not load store of app ${params.name}.`, e);
        //如果失败则不注册该模块
        // return
    }
    // 注册应用于事件派发器
    if (isNotEmptyObj(storeModule) && globalStore) {
        // 读取主模块histroy 挂载至globalStore
        if (storeModule.history) globalStore.history = storeModule.history;
        customProps.RootStore = storeModule.RootStore;
        // 注册到全局
        globalStore.registerStore({ module: _.camelCase(params.name), store: storeModule.RootStore });
        customProps.globalStore = globalStore
        
    }
    //准备自定义的props,传入每一个单独工程项目
    // customProps = { storeModule: storeModule, globalEventDistributor: globalEventDistributor };
    singleSpa.registerApplication(
        params.name,
        async () => await SystemJS.import(params.main),
        params.base ? (() => true) : pathPrefix(params),
        customProps
    )
}

function isArray(o){
    return Object.prototype.toString.call(o)=='[object Array]';
}