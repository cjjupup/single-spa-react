"use strict";
import * as singleSpa from 'single-spa'; 
import '../libs/system'
import { registerApp } from './Register'

async function bootstrap() {
    let projectConfig = await SystemJS.import('/project.config.js' )
    projectConfig.projects.forEach( element => {
        registerApp({
            name: element.name,
            main: element.main,
            url: element.prefix,
            store:element.store,
            base: element.base,
            path: element.path
        });
    });
    window.singleSpa = singleSpa;
    singleSpa.start();
    setTimeout(() => {
        checkStatus(projectConfig.projects[0].name)
    }, 500)
}

function checkStatus(baseModuleName) {
    let alreadyMount = singleSpa.getMountedApps()
    if (alreadyMount.indexOf(baseModuleName) > -1) {
        console.log('主模块加载完毕')
        let syload = document.getElementById('shineyue-loading');
        syload.parentElement.removeChild(syload)
    } else {
        setTimeout(() => {
            checkStatus(baseModuleName)
        }, 500)
    }
}

bootstrap()
