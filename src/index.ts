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

export const formattedDate = (time: string, dateComplete: boolean = false) => {

    if (time == null) return "Próximamente";

    const timeSplit = time.split('/');
    
    const day = timeSplit[0];
    const month = parseInt(timeSplit[1]);
    const year = timeSplit[2];

    const dateOf = dateComplete ? " de " : " ";

    return day + dateOf + months[month - 1] + " " + year;
}

export const formattedTime = (timeStamp: any) => {

    const date = new Date(timeStamp.seconds * 1000);

    let hours = date.getHours();
    let minutes = date.getMinutes();

    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? "12" : (hours % 12).toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}${ampm}`;
}