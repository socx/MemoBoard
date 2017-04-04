import moment from 'moment';

export const Formats = {
    API              : 'YYYY-MM-DDTHH:mm:ss',
    UI               : 'DD/MM/YYYY',
    UIDateTime       : 'DD/MM/YYYY HH:mm:ss'
}

export class Parser {
    static defaultFormat = Formats.API;

    static parse = (dateTimeString, format) => {
        if(format === undefined || format === null)
            format = Parser.defaultFormat;
        return moment(dateTimeString, format);
    }
}

export class Formatter {
    static defaultFormat = Formats.UI;

    static format(momentDate, formatString)
    {
        if(formatString === undefined || formatString === null)
            formatString = Formatter.defaultFormat;
        if(moment.isMoment(momentDate) && momentDate.isValid())
            return momentDate.format(formatString);
        else
            return '';    
    }
}