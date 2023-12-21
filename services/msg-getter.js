class MSGGetter {
    #msg;

    set(msg) {
        this.#msg = msg;
    }

    get() {
        return this.#msg
    }
}

module.exports = MSGGetter;