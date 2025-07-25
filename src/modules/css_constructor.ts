import { colorLog } from "../utils/colors/colorMessage";
import { checkIfExistThisRute, createDir, createFileIfNoExistAndAddTheContent, modifyFileIfExistAndInitTheContent } from "../utils/vs-code/vs-code";

export function css_constructor_init(){
    colorLog("❌❌❌ NO SE CONFIGURARÁ EL DIRECTORIO .VSCODE ❌❌❌","yellow");
    checkIfExistThisRute('dirCssConstructor').catch(()=>{
        createDir('dirCssConstructor').catch(()=>{
            throw new Error("NO_DIRECTORY_CREATED")
        });
    }).finally(()=>{
        //Se cree o no se cree el directorio hay que comprobar 
        checkIfExistThisRute('fileCssConstructorConfig').then(()=>{
                colorLog("   el fichero css-constructor/config.json ya existe, por lo que se procederá a su modificación en caso de estar mal","yellow");
                modifyFileIfExistAndInitTheContent('fileCssConstructorConfig').then(()=>colorLog("✔️✔️✔️ css-constructor/config.json fue editado correctamente","green"))
                .catch(()=>colorLog("   ❌❌❌ no se modificó el fichero css-constructor/config.json como se esperaba...","red"))
        }).catch(()=>{
                colorLog("   el fichero css-constructor/config.json será creado","yellow");
                createFileIfNoExistAndAddTheContent('fileCssConstructorConfig').then(()=> colorLog("  ✔️✔️✔️ css-constructor/config.json fue creado correctamente  ",'green'))
                .catch(()=>colorLog("   ❌❌❌ error desconocido al crear css-constructor/config.json ",'red'));
        })
    })
}