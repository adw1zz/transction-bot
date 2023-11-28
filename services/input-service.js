class InputService {
    parseInputData(inputString) {
        const splittedString = inputString.split('\n');
        if (splittedString.length > 0) {
            return splittedString;
        }
        else {
            return false;
        }
    }
}

module.exports = new InputService();