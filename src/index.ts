import { 
    GenerateHashTokenMapVMTModel, 
    ResponseRequestModel
} from './models/index';
import * as cryptoJS from 'crypto-js';

var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

var months: Array<string> = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
];

export const generateHashToken = (
    informationRequest: GenerateHashTokenMapVMTModel,
    onSuccess: (response: ResponseRequestModel) => void,
    onError: (response: ResponseRequestModel) => void
) => {

    if (informationRequest.eventId != '' && informationRequest.memberId != '' && informationRequest.mode != '') {
        var tokenHash: any;
        const jsonObject = {
            eventId: informationRequest.eventId,
            memberId: informationRequest.memberId,
            mode: informationRequest.mode,
            allowedHolds: [],
            appViewOnly: true,
            allowIconsEdit: false,
            allowOrphanSale: false,
            featureFlags: {
                wholeTableBooking: true,
                orphanSeats: true,
            },
        };

        const jsonString = JSON.stringify(jsonObject);
        tokenHash = window.btoa(jsonString);
        const hash = cryptoJS.HmacSHA256(tokenHash, 'b34c1b1fadb75d5517e30a1a9a81eb72');
        const signature = tokenHash + "." + hash.toString(cryptoJS.enc.Hex);
        var responseRequest: ResponseRequestModel = {
            code: 'TRX001',
            message: '',
            data: signature
        }
        onSuccess(responseRequest);
    } else {
        const responseRequest: ResponseRequestModel = {
            code: 'TRX002',
            message: 'Error faltan campos en el request.',
            data: []
        }
        onError(responseRequest);
    }

}

export const generateRandomId = (
    generateById: string,
    onSuccess: (response: ResponseRequestModel) => void,
    onError: (response: ResponseRequestModel) => void
) => {

    if (generateById != '') {

        let result = "";
        const id = generateById;

        for (let i = 0; i < 8; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        var responseRequest: ResponseRequestModel = {
            code: 'TRX001',
            message: 'Se ha generado satisfactoriamente el ID',
            data: id + '_' + result
        }

        onSuccess(responseRequest);

    } else {
        const responseRequest: ResponseRequestModel = {
            code: 'TRX002',
            message: 'Error deberá enviar un valor válido',
            data: ''
        }
        onError(responseRequest);
    }

}

export const generateDateEventId = (
    onSuccess: (response: ResponseRequestModel) => void
) => {

    let id = "";
    for (let i = 0; i < 10; i++) {
        id += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    var responseRequest: ResponseRequestModel = {
        code: 'DE001',
        message: 'Se ha generado satisfactoriamente el ID para la fecha del evento',
        data: id
    }

    onSuccess(responseRequest);
}

export const generateTransactionId = (
    onSuccess: (response: ResponseRequestModel) => void,
    onError: (response: ResponseRequestModel) => void
) => {

    const length = 16;
    let transactionId = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        transactionId += characters[randomIndex];
    }

    var responseRequest: ResponseRequestModel = {
        code: 'TRX001',
        message: 'Se ha generado satisfactoriamente el transactionId',
        data: transactionId
    }

    if (transactionId.length < 16) {
        onError(responseRequest);
        return;
    }

    onSuccess(responseRequest);
};

export const formattedDate = (date: string, dateComplete: boolean = false) => {

    if (date == null) return "Próximamente";

    const [ day, month, year ] = date.split('/').map(Number);
    
    const dateOf = dateComplete ? " de " : " ";

    return day + dateOf + months[month - 1] + " " + year;
}

export const formattedTime = (time: string) => {

    const [ hours, minutes, ampm ] = time.split(':');

    const parserMinutes = parseInt(minutes) <= 9 ? minutes == '00' ? minutes : '0' + minutes : minutes;

    return hours + ':' + parserMinutes + ' ' + ampm.toUpperCase();
}


export const dateStringToDate = (date: string) => {

    const [ day, month, year ] = date.split('/').map(Number);

    return new Date(year, month - 1, day);
}

export const timeStringToDate = (time: string) =>  {

    const [ hours, minutes, ampm ] = time.split(':');

    const now = new Date();

    let hour = hours;

    if (ampm === "pm") {
        hour = 12 + hours;
    } else {
        hour = hours;
    }

    now.setHours(parseInt(hour));
    now.setMinutes(parseInt(minutes));
    now.setSeconds(0);
    now.setMilliseconds(0);

    return now;
}

export const getMonthYearToString = (date: string) => {

    if (date == null) return "Próximamente";

    const [ day, month, year ] = date.split('/').map(Number);
    console.log(day);

    return month + "-" + year;
}