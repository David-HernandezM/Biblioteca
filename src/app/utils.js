export const shortStringTo = (text, maxNumOfChars) => {
    if (text.length > maxNumOfChars) {
        text.substring(0, maxNumOfChars);
        return text + '...';
    }

    return text;
}
