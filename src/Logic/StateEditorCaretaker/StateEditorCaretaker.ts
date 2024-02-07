import { BoardCaretaker } from "../BoardCaretaker"


// export class StateCaretaker {

//     private _boardFields = BoardCaretaker.fieldInstances;


//     getMemento() {
        
//     }
// }

// // =====================================

// export type tPrivateInstance = iPrivateHolder

// export interface iPrivateHolder {
//     log: () => void,
//     accept: (visitor: iVisitor) => void,
//     property: number
// }

// export class PrivateHolder {
//     private _property: number = 0

//     log() {
//         console.log('Logging private : ', this._property)
//     }

//     accept(visitor: iVisitor) {
//         const setters = {
//             setProperty: (newVal:number) => {
//                 this._property = newVal;
//             }    
//         }
//         visitor.alterProperty(setters)
//     }
// }

// interface iSetters {
//     [key: string]: (val: any) => void
// }

// interface iVisitor {
//     alterProperty : (setters:iSetters) => void
// }

// export class Visior implements iVisitor{

//     alterProperty(setters: iSetters) {
//         setters.setProperty(5);
//     }
// }
