/**
 * https://stackoverflow.com/a/11623204/2512498
 */
export function isParseError(parsedDocument: XMLDocument): boolean {
    const parser = new DOMParser();
    const invalidParsed = parser.parseFromString('<', 'text/xml');
    const parserErrorNamespace = invalidParsed.getElementsByTagName('parsererror')[0].namespaceURI;

    if (parserErrorNamespace === null) {
        return true;
    }

    if (parserErrorNamespace === 'http://www.w3.org/1999/xhtml') {
        return parsedDocument.getElementsByTagName('parsererror').length > 0;
    }

    return parsedDocument.getElementsByTagNameNS(parserErrorNamespace, 'parsererror').length > 0;
}
