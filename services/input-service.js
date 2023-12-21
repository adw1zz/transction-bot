class InputService {

    #spaceReg = /\s+/g;

    parseInputData(inputString) {
        const splittedString = inputString.split('\n');
        if (splittedString.length > 0) {
            const filtred = splittedString.map(str => str.replace(this.#spaceReg, ''))
            return filtred;
        }
        else {
            return false;
        }
    }
}

module.exports = new InputService();