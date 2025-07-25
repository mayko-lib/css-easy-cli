#!/usr/bin/env node
import { user_allow_modify_vscode } from "./modules/user_alow_vscode";
import { css_constructor_init } from "./modules/css_constructor";
import { checkIfUserWantToConfigVsCode } from "./utils/vs-code/vs-code";

(async ()=>{
    let user_response = await checkIfUserWantToConfigVsCode();
    if(user_response) user_allow_modify_vscode()
    css_constructor_init()
})()

