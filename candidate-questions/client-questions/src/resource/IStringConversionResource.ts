/**
 * A resource defining the structure of the response to a POST: '/' request.
 */
export interface IStringConversionResource {
    destinationLang: string;
    convert: string[];
}
