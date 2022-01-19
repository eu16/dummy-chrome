export function isValidEmail(email) {
    const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (emailPattern.test(email)) {
        return true;
    } else {
        return false;
    }
}

export function isAlphaNum(text) {
    const checkPattern1 = /(?=.*[aA-zZ])/;
    const checkPattern2 = /(?=.*[0-9])/;
    if (checkPattern1.test(text) && checkPattern2.test(text)) {
        return true;
    } else {
        return false;
    }
}

export function checkTextLength(text, minLength, maxLength) {
    if (text.length >= minLength && text.length <= maxLength) {
        return true;
    } else {
        return false;
    }
}

export function uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}