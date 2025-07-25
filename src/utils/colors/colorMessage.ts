/**
 * Para imprimir mensajes de diferentes colores
 * @param {string} message 
 * @param {'red'|'green'|'yellow'|'blue'} color 
 */
export function colorLog(message:string, color:'red'|'green'|'yellow'|'blue') {
      const codes = { red: '\x1b[31m', green: '\x1b[32m', yellow: '\x1b[33m', blue: '\x1b[34m' };
      console.log(`${codes[color]}%s\x1b[0m`, message);
   }