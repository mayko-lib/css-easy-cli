import {
  DIR_RUTE,
  FILE_RUTE,
  FILE_RUTE_CAN_BE_MODIFIED,
  RUTE,
  SCHEMA_SETTINGS,
} from "../../interfaces/vs-code-interface";

import inquirer from "inquirer";

import {DIR,FILE_CONTENT,allDirRutes,allFileRutesCanBeCreated, userDecisionVsCodeFile, userDecisionVsCodeFolder} from "../objects/vs-code.objects";

import { constants, access, mkdir, writeFile, readFile } from "fs/promises";
import { colorLog } from "../colors/colorMessage";

let check_vs_code = false;




/**
 * Esta función comprueba si existe la ruta o directorio
 * dirCssConstructor | dirVsCodeConfig | fileVsCodeSetting | fileSchemaCssConstructor | fileCssConstructorConfig | filePackageJson
 * @param rute
 * @returns true if exist and false if not exist
 */
export function checkIfExistThisRute(rute: RUTE): Promise<boolean> {
  return new Promise((resolve, reject) => {
    access(DIR[rute], constants.F_OK)
      .then(() => resolve(true))
      .catch(() => reject(false));
  });
}


/**
 * Esta función creará el directorio si no existe y en caso de existir devolverá un false
 * @param dirRute
 * @throws {NO_VSCODE_CONFIG_ALLOW} Si el valor es menor que cero.
 */
export function createDir(dirRute: DIR_RUTE): Promise<boolean> {
  if (!allDirRutes.includes(dirRute))
    throw new NO_RUTE_RECOGNIZED(
      `La ruta de directorio no está permitida: ${dirRute}`
    );
  if (userDecisionVsCodeFolder.includes(dirRute) && !check_vs_code)
    throw new NO_VSCODE_CONFIG_ALLOW(
      "El usuario ha seleccionado no querer retocar el directorio .vscode"
    );

  return new Promise((resolve, reject) => {
    checkIfExistThisRute(dirRute).catch(() => {
      mkdir(DIR[dirRute])
        .then(() => resolve(true))
        .catch(() => reject(false));
    });
  });
}



/**
 * Esta función creará el fichero y añadirá el contenido que sea necesario siempre y cuandoe el fichero no exista
 */
export function createFileIfNoExistAndAddTheContent(
  fileRute: FILE_RUTE
): Promise<boolean> {
 
  return new Promise((resolve, reject) => {
     if (!allFileRutesCanBeCreated.includes(fileRute))
    throw new NO_RUTE_RECOGNIZED(
      `La ruta de fichero no está permitido. ${DIR[fileRute]}`
    );

    if (userDecisionVsCodeFile.includes(fileRute) && !check_vs_code) throw new USER_BLOCK_VSCODE_EDITED("el usuario no permite editar estos ficheros");


    checkIfExistThisRute(fileRute).then(()=>{throw new Error(`FILE JUST EXIST: ${DIR[fileRute]}`)})
    .catch(()=>{
        if(fileRute==='fileSchemaCssConstructor' || fileRute==='fileVsCodeSetting' || fileRute==='fileCssConstructorConfig'){
            writeFile(DIR[fileRute], JSON.stringify(FILE_CONTENT[fileRute],null,2), "utf-8")
            .then(() => resolve(true))
            .catch(() => reject(false));
            }
    })
    
  });
}

/**
 * Esta función inicializa el fichero settings.json por si hay que inicializarlo...
 * @param fileRute
 * @returns
 * @throws {VSCODE_SETTINGS_NO_PARSE, FILE_JUST_EXIST}
 */
export function modifyFileIfExistAndInitTheContent(fileRute: FILE_RUTE_CAN_BE_MODIFIED): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if(!allFileRutesCanBeCreated.includes(fileRute)) throw new NO_RUTE_RECOGNIZED(`RUTA NO DENTRO DE CANBEMODIFIED: ${DIR[fileRute]}`);
    if (userDecisionVsCodeFile.includes(fileRute) && !check_vs_code) throw new USER_BLOCK_VSCODE_EDITED("el usuario no permite editar estos ficheros");

    checkIfExistThisRute(fileRute).then(()=>{
        readFile(DIR[fileRute],'utf-8').then(content=>{
            let jsonContent;
            try{
                jsonContent=JSON.parse(content);
            }catch(err){
                throw new Error("JSON_PARSE_ERROR");
            }

             switch(fileRute){
              case 'fileCssConstructorConfig': //Solo se modificará si hay datos incorrectos

                const arrayJsonOfFile=Object.keys(FILE_CONTENT["fileCssConstructorConfig"])
                const isAllProperties= arrayJsonOfFile.every(el=>el in jsonContent) &&Object.keys(jsonContent).length==4;
                
                if(!isAllProperties){
                    writeFile(DIR[fileRute], JSON.stringify(FILE_CONTENT[fileRute],null,2), "utf-8")
                    .then(() => resolve(true))
                    .catch(()=>{throw new Error(`NO_FILE_MODIFY: ${DIR[fileRute]}`)});
                }else{
                    colorLog("NO HIZO FALTA MODIFICAR EL FICHERO css-constructor/config.json ya que está bien configurado","blue")
                }
              break;

              case 'fileVsCodeSetting':

              if ("json.schemas" in jsonContent){ 
                  /* Si la propiedad existe lo que voy a hacer es borrar del array todas las posibles configuraciones duplicadas y 
                  borrarlas y luego hacer un push del correcto */

                        let schemas = jsonContent["json.schemas"] as SCHEMA_SETTINGS[]
                        let isSchemasArray = Array.isArray(schemas);
                        if(isSchemasArray){
                            const newArrayWithoutTheConfig = schemas.filter(obj =>  !obj.fileMatch.includes("css-constructor/config.json")&&obj.url!="/.vscode/css-constructor-config-schema.json");
                            //hacemos un push con la configuración correcta y así no habrá problemas a la hora de modificar el fichero
                            newArrayWithoutTheConfig.push(FILE_CONTENT["fileVsCodeSetting"]["json.schemas"][0]);
                            jsonContent["json.schemas"]=newArrayWithoutTheConfig;
                        }else{
                            throw new Error('.vscode/settings.json --> {"json.schemas": []} ... se esperaba que "json.schemas" fuera un array pero no lo es...ergo hay algo raro')
                        }
                    }
                  else{
                  //Como no existe la propiedad "json.schemas" pues simplemente lo añadiremos y nos quedaremos tan panchos
                  jsonContent["json.schemas"]=FILE_CONTENT["fileVsCodeSetting"]["json.schemas"];
                }
                writeFile(DIR[fileRute],JSON.stringify(jsonContent),'utf-8').then(()=>resolve(true)).catch(()=>reject(false));
            
                break;
                case 'fileSchemaCssConstructor': //directamente sobreescribimos
              writeFile(DIR[fileRute],JSON.stringify(FILE_CONTENT["fileSchemaCssConstructor"]),'utf-8')
              .then(()=>resolve(true)).catch(()=>reject(false))
           
              break;
              default:
                throw new Error("FATAL ERROR---> no more options");
             } 

            }).catch(()=>{throw new Error(`NO_FILE_READED: ${DIR[fileRute]}`)})
    }).catch(()=>{
        throw new Error(`FILE DOES NOT EXIST: ${DIR[fileRute]}`)
    })

    switch (fileRute) {

        case 'fileVsCodeSetting':
            checkIfExistThisRute("fileVsCodeSetting").then(()=>{
                readFile(DIR.fileVsCodeSetting, "utf-8").then((result) => {
                    let settings;
                    try{
                        settings=JSON.parse(result);
                    }catch(error){
                        throw new Error("VSCODE_SETTINGS_NO_PARSE")
                    }

                    
                })
            }).catch(()=>{throw new FILE_DONT_EXIST(
              "el fichero .vscode/settings.json no existe ergo no se puede modificar"
            )})
            break;
    }
  });
}

/**
 * Esta función se utiliza para saber si el usuario quiere o no que se configure el directorio .vscode
 * @returns true | false
 */
export async function checkIfUserWantToConfigVsCode() {
  console.log("🛠️ Bienvenido a CSS Easy CLI");

  const respuestas = await inquirer.prompt([
    {
      type: "confirm",
      name: "configVSCode",
      message:
        "¿Desea configurar .vscode?. Esto lo que hace es que visual studio code le informe de errores de configuración de css-easy",
      default: false,
    },
  ]);
  check_vs_code = respuestas.configVSCode;
  return respuestas.configVSCode;
}
