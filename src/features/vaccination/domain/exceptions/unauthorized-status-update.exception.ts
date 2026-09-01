export class UnauthorizedStatusUpdateException extends Error {
    constructor() {
        super("You can't update the status of a vaccination to done");
    }
}