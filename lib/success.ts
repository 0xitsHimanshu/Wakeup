class SuccessRespone<T = unknown> {
    status: true;
    code: number;
    additional?: T;
    message: string;

    constructor(message: string, code: number, additional?: T){
        this.status = true;
        this.code = code;
        this.message = message;
        this.additional = additional;
    }
    serialize(){
        return{
            status: this.status,
            code: this.code,
            message: this.message,
            additional: this.additional as T,
        };
    }

}  

export type SuccessResponeType<T = unknown> = {
    status: true;
    code: number;
    message: string;
    additional?: T;
};

export { SuccessRespone };