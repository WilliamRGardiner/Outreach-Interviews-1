import {} from 'jasmine';
import { Translation } from '../../src/translate/google-translate';
import {TranslateService} from '../../src/service/TranslateService';

/*
 * These tests are failing locally because of an issue where the first call to 
 * the Google API is always rejected. This seems like an environment issue.
 */

describe('translation_tests', () => {
  it('empty_obj_test', async () => {
      const result = await Translation.translate({
        source: undefined,
        target: undefined
      });

      expect(result[0]).toBeUndefined();
  });
});

describe('translate_array_ordered_test', () => {
  it('empty_obj_test', async () => {
      const result = await TranslateService.translateStrings("fr", ["Hello World", "Hello Universe"]);
      expect(result.convert[0]).toEqual("Bonjour l'univers");
  });
});

describe('translate_array_unordered_test', () => {
  it('empty_obj_test', async () => {
      const result = await TranslateService.translateStrings("fr", ["Hello Universe", "Hello World"]);
      expect(result.convert[0]).toEqual("Bonjour l'univers");
  });
});