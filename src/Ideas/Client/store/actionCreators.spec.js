import * as actions     from './actionCreators';
import * as constants   from './constants';

describe('<Reports /> actionCreators', () => {
    it('should contain generateReport and dispatch GET_REPORT_SUCCESS and value correctly', async () => {
        // Given
        const dispatch = jest.fn();
        const getState = jest.fn();
        const reportType = 'application';
        const REPORTS_API_URL = `api/reports/${reportType}`;
        const state = {
            reports : { isFetchingReport: false }
        };
        const applicationResults = [
            {
                "BusinessName" : "Halo Works",
                "Status" : "Success",
                "Date" : "11/03/2017",
                "StatusDescription" : "Success Description"
            },
            {
                "BusinessName" : "Indigo IT Ltd",
                "Status" : "Error",
                "Date" : "11/03/2017",
                "StatusDescription" : "Error/Warning Description"
            },
            {
                "BusinessName" : "Peter Parker Ltd",
                "Status" : "Error",
                "Date" : "12/03/2017",
                "StatusDescription" : "Error/Warning Description"
            }
        ]

        getState.mockReturnValue(state);

        window.fetch = jest.fn();
        window.fetch.mockReturnValue(new Promise((resolve, reject) => {
            resolve({
                ok: true,
                json: () => new Promise((resolve, reject) => { resolve(applicationResults); })
            });
        }));        

        // When
        const fileDownload = jest.fn();
        await actions.generateReport(reportType, fileDownload)(dispatch, getState);

        // Then
        expect(window.fetch.mock.calls[0][0]).toMatch(new RegExp('.*' + REPORTS_API_URL));
        expect(dispatch.mock.calls[0][0].type).toBe(constants.CLEAR_REPORT_ERRORS);
        expect(dispatch.mock.calls[1][0].type).toBe(constants.CLEAR_REPORT_WARNINGS);
        expect(dispatch.mock.calls[2][0].type).toBe(constants.GET_REPORT);
        expect(dispatch.mock.calls[3][0].type).toBe(constants.GET_REPORT_SUCCESS);
        expect(dispatch.mock.calls.length).toBe(4);

    });

    it('should contain generateReport and dispatch GET_REPORT_EMPTY', async () => {
        // Given
        const dispatch = jest.fn();
        const getState = jest.fn();
        const reportType = 'application';
        const REPORTS_API_URL = `api/reports/${reportType}`;
        const state = {
            reports : { isFetchingReport: false }
        };
        const applicationResults = [];
        getState.mockReturnValue(state);

        window.fetch = jest.fn();
        window.fetch.mockReturnValue(new Promise((resolve, reject) => {
            resolve({
                ok: true,
                json: () => new Promise((resolve, reject) => { resolve(applicationResults); })
            });
        }));        

        // When
        const fileDownload = jest.fn();
        await actions.generateReport(reportType, fileDownload)(dispatch, getState);

        // Then
        expect(window.fetch.mock.calls[0][0]).toMatch(new RegExp('.*' + REPORTS_API_URL));
        expect(dispatch.mock.calls[0][0].type).toBe(constants.CLEAR_REPORT_ERRORS);
        expect(dispatch.mock.calls[1][0].type).toBe(constants.CLEAR_REPORT_WARNINGS);
        expect(dispatch.mock.calls[2][0].type).toBe(constants.GET_REPORT);
        expect(dispatch.mock.calls[3][0].type).toBe(constants.GET_REPORT_EMPTY);
        expect(dispatch.mock.calls.length).toBe(4);

    });

});
