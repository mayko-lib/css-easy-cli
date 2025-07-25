import { colorLog } from "../utils/colors/colorMessage";
import { checkIfExistThisRute, createDir, createFileIfNoExistAndAddTheContent, modifyFileIfExistAndInitTheContent } from "../utils/vs-code/vs-code";

export function user_allow_modify_vscode(){
        colorLog("✔️ SE CONFIGURARÁ EL DIRECTORIO .VSCODE ✔️","green");
        checkIfExistThisRute('dirVsCodeConfig').then(()=>colorLog("el directorio vscode ya existe","yellow"))
        .catch(()=>{
            colorLog("   se creará el directorio .vscode","yellow")
            createDir('dirVsCodeConfig').then(()=>{
                colorLog(" ✔️✔️✔️ .vscode creado correctamente  ",'green');
           
            }).catch(()=>{
                colorLog("  ❌❌❌ error desconocido al crear .vscode ",'red')
            })
        })
        .finally(()=>{//exista o no exista después hay que comprobar el fichero css-constructor-config-schema.json dentro de .vscode
             checkIfExistThisRute('fileSchemaCssConstructor').then(()=>{
                colorLog("   el fichero css-constructor-config-schema.json ya existe, por lo que se procederá a su modificación","yellow");
                modifyFileIfExistAndInitTheContent('fileSchemaCssConstructor').then(()=>colorLog("✔️✔️✔️ .vscode/css-constructor-config-schema.json fue editado correctamente","green"))
                .catch(()=>colorLog("   ❌❌❌ no se modificó el fichero como se esperaba...","red"))
             })
             .catch(()=>{
                colorLog("   se creará el fichero fileSchemaCssConstructor","yellow");
                createFileIfNoExistAndAddTheContent('fileSchemaCssConstructor').then(()=> colorLog("  ✔️✔️✔️ .vscode/css-constructor-config-schema.json creado correctamente  ",'green'))
                .catch(()=>colorLog("   ❌❌❌ error desconocido al crear .vscode/css-constructor-config-schema.json ",'red'));
            })

            //Hay que ver si como editamos el fichero settings de vscode
        checkIfExistThisRute('fileVsCodeSetting').then(()=>{
                colorLog("   el fichero .vscode/settings.json ya existe, por lo que se procederá a su modificación","yellow");
                modifyFileIfExistAndInitTheContent('fileVsCodeSetting').then(()=>colorLog("✔️✔️✔️ .vscode/settings.json fue editado correctamente","green"))
                .catch(()=>colorLog("   ❌❌❌ no se modificó el fichero como se esperaba...","red"))
             })
             .catch(()=>{
                colorLog("   se creará el fichero .vscode/settings.json","yellow");
                createFileIfNoExistAndAddTheContent('fileVsCodeSetting').then(()=> colorLog("  ✔️✔️✔️ .vscode/settings.json fue creado correctamente  ",'green'))
                .catch(()=>colorLog("   ❌❌❌ error desconocido al crear .vscode/settings.json ",'red'));
            })

        })

}