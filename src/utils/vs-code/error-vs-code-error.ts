class NO_VSCODE_CONFIG_ALLOW extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NO_VSCODE_CONFIG_ALLOW'; // Muy importante para identificación
  }
}

class NO_RUTE_RECOGNIZED extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NO_RUTE_RECOGNIZED'; // Muy importante para identificación
  }
}

/**
 * Si el archivo ya existe significa que hay algo que se intenta hacer que no tiene mucho sentido
 */
class FILE_DONT_EXIST extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FILE_JUST_EXIST'; // Muy importante para identificación
  }
}

/**
 * Este error aparece cuando el usuario seleciona la opción de no 
 */
class USER_BLOCK_VSCODE_EDITED extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'USER_BLOCK_VSCODE_EDITED'; // Muy importante para identificación
  }
}


