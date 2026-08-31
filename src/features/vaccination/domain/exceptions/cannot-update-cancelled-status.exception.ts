export class CannotUpdateCancelledStatusException extends Error {
    constructor() {
        super("You can't update the status of a cancelled vaccination");
    }
}