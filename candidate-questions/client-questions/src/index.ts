import * as bodyParser from 'body-parser';
import express from 'express';
import {IStringConversionResource} from './resource/IStringConversionResource';
import {TranslateService} from './service/TranslateService';
import {ITranslate, Translation} from './translate/google-translate';

const app = express();
const port = 8080; // default port to listen

app.use(bodyParser.json());

// define a route handler for the default home page
app.get( '/', async ( resp: any, res: any ) => {
    const translateInterface: ITranslate = {
        source: 'Where are the bathrooms?',
        target: 'fr'
    };
    const response: [string, any] = await Translation.translate(translateInterface);
    res.send( response[0] );
} );

// endpoint for translating an array of strings
app.post('/', async ( resp: any, res: any ) => {
    let response: IStringConversionResource;
    try {
        response = await TranslateService.translateStrings(resp.body.destinationLang, resp.body.convert);
    } catch (e) {
        // For whatever reason, the first call after the system is started always fails with:
        // "API key not valid. Please pass a valid API key"
        // There is likely a better solution to this issue, but for now the hack is to try again.
        response = await TranslateService.translateStrings(resp.body.destinationLang, resp.body.convert);
    }
    res.send( response );
});

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );
