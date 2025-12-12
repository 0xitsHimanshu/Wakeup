import {ERROR_CODE, ERROR_NAME} from "@/config/error.config";

export type ErrorResponseType = {
    name: string;
    message: string;
    code: number;
    status: false;
}

class ErrorHandler extends Error {
    status: false;
    error?: any;
    code: number;

    constructor(message: string, code: keyof typeof ERROR_CODE, error?: any) {
        super(message);
        this.status = false;
        this.error = error;
        this.code = ERROR_CODE[code];
        this.name = ERROR_NAME[code];
    }
}

function standardizeApiError(error: any): ErrorResponseType {
    if (error instanceof ErrorHandler) {
        return {
            name: error.name,
            message: error.message,
            code: error.code,
            status: false,
        };
    } 
    return {
        name: ERROR_NAME["INTERNAL_SERVER_ERROR"],
        message: "We're sorry, but an unexpected error occurred. Please try again later.",
        code: ERROR_CODE.INTERNAL_SERVER_ERROR,
        status: false,
    };
}

export { ErrorHandler, standardizeApiError };