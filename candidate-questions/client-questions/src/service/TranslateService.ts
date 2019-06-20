import {IStringConversionResource} from '../resource/IStringConversionResource';
import {ITranslate, Translation} from '../translate/google-translate';

/**
 * Provides translation services for the controller.
 */
export class TranslateService {

    /**
     * Translates all of the strings in the stringsToConvert array, to the language defined by lang.
     *
     * TODO: This should be refactored to allow all of the translation calls to be made, then collected.
     *       Due to time constrainsts, the calls are executed in series.
     */
    public static async translateStrings(lang: string, stringsToConvert: string[]): Promise<IStringConversionResource> {
        const convertedStrings: IStringConversionResource = {convert: [], destinationLang: lang};

        for (const stringToConvert of stringsToConvert) {
            const translateInterface: ITranslate = {
                source: stringToConvert,
                target: lang
            };
            const response: [string, any] = await Translation.translate(translateInterface);
            convertedStrings.convert.push(response[0]);
        }

        convertedStrings.convert.sort();

        return convertedStrings;
    }

}
