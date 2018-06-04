//
// ===== File globals.ts    
//
'use strict';

export const sep='/';
export const version: string="22.2.2"; 
export let dbgLevel: number=0; 
let dbMode: string;//="Mock"; 
export function getMode(){
    return dbMode;
};
export function setMode(m){
    dbMode=m;
};
/*
export let okMock: boolean=false; 
export function setMock(m){
    okMock=m;getMode
};
*/