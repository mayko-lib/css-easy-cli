//Este es el directorio donde trabajará css-easy. Se llama css-constructor.
type dirCssConstructor='dirCssConstructor'
//Directorio de configuracion de vscode que generalmente es .vscode
type dirVsCodeConfig = 'dirVsCodeConfig'
//El fichero de configuración de visual studio code que es setting.json
type fileVsCodeSetting = 'fileVsCodeSetting'
//El fichero que se emplea para que visual studio code lo utilice y sepa si hay errores de sintaxis
type fileSchemaCssConstructor = 'fileSchemaCssConstructor'
//El fichero donde se especifica la forma en que css-easy tiene que operar
type fileCssConstructorConfig = 'fileCssConstructorConfig'
//el fichero de package.json si es que está, es importante saber si está configurado...para quizás automatizar las tareas
type filePackageJson = 'filePackageJson'

export type DIR_RUTE = dirCssConstructor | dirVsCodeConfig;
export type FILE_RUTE=fileVsCodeSetting | fileSchemaCssConstructor | fileCssConstructorConfig | filePackageJson; 
export type FILE_RUTE_CAN_BE_MODIFIED=fileVsCodeSetting | fileSchemaCssConstructor | fileCssConstructorConfig;
export type RUTE= DIR_RUTE | FILE_RUTE
//Son todas las rutas que habrá que analizar para inicializar correctamente css-easy
export interface RUTES_VS {
    dirCssConstructor:string,
    dirVsCodeConfig:string,
    fileVsCodeSetting:string,
    fileSchemaCssConstructor:string,
    fileCssConstructorConfig:string,
    filePackageJson:string
}
type status='CREATED' | 'NO CREATED' | 'MODIFIED' | 'NO_ANALIZED'
export interface CHECK_RUTES_VS {
    dirCssConstructor:status,
    dirVsCodeConfig:status,
    fileVsCodeSetting:status,
    fileSchemaCssConstructor:status,
    fileCssConstructorConfig:status,
    filePackageJson:status
}

export interface SCHEMA_SETTINGS {
    fileMatch:string[],
    url:string
}