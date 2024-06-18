export const shortStringTo = (text, maxNumOfChars) => {
    if (text.length > maxNumOfChars) {
        text.substring(0, maxNumOfChars);
        return text + '...';
    }

    return text;
}

// Set value in seconds
export const sleep = (s) => new Promise((resolve) => setTimeout(resolve, s * 1000));