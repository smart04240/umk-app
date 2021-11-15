export const textTrim = (text, maxSize = 120) => {
    let textLength = text?.length;

    if (textLength <= maxSize)
        return text;

    return text?.substring(0, maxSize) + ' . . . ';
}
