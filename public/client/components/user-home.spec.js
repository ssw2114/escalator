/* global describe beforeEach it */
import { expect } from 'chai';
import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { UserHome } from './user-home';
var adapter = new Adapter();
enzyme.configure({ adapter: adapter });
describe('UserHome', function () {
    var userHome;
    beforeEach(function () {
        userHome = shallow(React.createElement(UserHome, { email: "cody@email.com" }));
    });
    it('renders the email in an h3', function () {
        expect(userHome.find('h3').text()).to.be.equal('Welcome, cody@email.com');
    });
});
//# sourceMappingURL=user-home.spec.js.map