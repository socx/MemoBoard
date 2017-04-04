import { expect } from 'chai';
import config from './index';

describe('The Environment Config file', () => {
    it('all endpoints should point to localhost', () => {
        expect(config.IDEAS_URL).to.equal('http://localhost:3000/');        
    })
});
