import path from "path";
import { CHECK_RUTES_VS, RUTES_VS } from "../../interfaces/vs-code-interface";

export const DIR: RUTES_VS = {
  dirCssConstructor: path.join(process.cwd(), "css-constructor"),
  dirVsCodeConfig: path.join(process.cwd(), ".vscode"),
  fileCssConstructorConfig: path.join(
    process.cwd(),
    "css-constructor",
    "config.json"
  ),
  fileVsCodeSetting: path.join(
    path.join(process.cwd(), ".vscode"),
    "settings.json"
  ),
  fileSchemaCssConstructor: path.join(
    path.join(process.cwd(), ".vscode"),
    "css-constructor-config-schema.json"
  ),
  filePackageJson: path.join(process.cwd(), "package.json"),
};

let check_createOrModify:CHECK_RUTES_VS = {
  dirCssConstructor:'NO_ANALIZED',
  dirVsCodeConfig:'NO_ANALIZED',
  fileCssConstructorConfig:'NO_ANALIZED',
  filePackageJson:'NO_ANALIZED',
  fileSchemaCssConstructor:'NO_ANALIZED',
  fileVsCodeSetting:'NO_ANALIZED'
}

export const FILE_CONTENT={
fileVsCodeSetting:{"json.schemas":[
            {
                "fileMatch": ["css-constructor/config.json"],
                "url": "/.vscode/css-constructor-config-schema.json"
            }
        ]},
fileSchemaCssConstructor:{
    
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
  properties: {
    directoryWATCH: { type: "string" },
    recursive: { type: "boolean" },
    cssDirectory: { type: "string" },
    cssFile: { type: "string" },
  },
  required: ["directoryWATCH", "recursive", "cssDirectory", "cssFile"],
  additionalProperties: false,

},
fileCssConstructorConfig:{
    directoryWATCH:"",
    recursive:true,
    cssDirectory:"",
    cssFile:"",
  }
}

export const allDirRutes = ["dirCssConstructor", "dirVsCodeConfig"];

export const allFileRutesCanBeCreated = [
  "fileVsCodeSetting",
  "fileSchemaCssConstructor",
  "fileCssConstructorConfig",
];

export const allFileRutesCanBeModified= [
  "fileVsCodeSetting",
  "fileSchemaCssConstructor",
  "fileCssConstructorConfig",
]

export const userDecisionVsCodeFile=[
  "fileVsCodeSetting",
  "fileSchemaCssConstructor",
]

export const userDecisionVsCodeFolder=[
  "dirVsCodeConfig"
]
