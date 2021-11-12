import { AbstractControl } from "@angular/forms";

export class MathValidators {

    //static methods do not access properties of their class, they only have access to their own arguments
    //however, they do not require to create an instance of the class to be invoked
    static addition = (targetKey: string, sourceAKey: string, sourceBKey: string) =>
        (form: AbstractControl) => {
            const addendA = form.value[sourceAKey];
            const addendB = form.value[sourceBKey];
            const answer = form.value[targetKey];

            if (parseInt(answer) === addendA + addendB) {
                return null;    //form is valid
            }
            return { incorrectAnswer: true }    //form is invalid
        }

}
