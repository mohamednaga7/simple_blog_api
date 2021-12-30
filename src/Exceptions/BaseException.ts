export class BaseException extends Error {
    statusCode: number;
    key: string
    constructor(statusCode: number, key: string, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.key = key;
    }
}