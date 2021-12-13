import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import LandingPage from '../components/LandingPage';
import Login from '../components/Login';
import SignUp from '../components/SignUp';

Enzyme.configure({ adapter: new Adapter() })

const shallowMountLandingPage = (props = {}, state = null) => {
    const component = shallow(<LandingPage />)
    return component
}

const mountLandingPage = (props = {}, state = null) => {
    const comp = mount( <LandingPage /> )
    return comp
}

const landingPageComp = shallowMountLandingPage()
const landingPageCompWithChildern = mountLandingPage()

describe("test landing page component loading without crash", () => {
    it("test if landing page main container is loaded", () => {
        expect(landingPageComp.find('.outer-container').exists()).toBe(true)
    })

    it("test if image container is loaded", () => {
        expect(landingPageComp.find('.image-container').exists()).toBe(true)
    })

    it("test if image card title is loaded", () => {
        expect(landingPageComp.find('.image-card-title').exists()).toBe(true)
    })

    it("test if login signup container is loaded", () => {
        expect(landingPageComp.find('.login-signup-container').exists()).toBe(true)
    })
})

describe("test if child componets are funtioning properly and rendered", () => {
    it("test if login child is loaded ", () => {
        expect(landingPageCompWithChildern.find(Login).exists()).toBe(true)
    })
})

describe("test if conditonal rendering elements are working as expected", () => {
    it("test if signup loaded on button click", () => {
        const comp = mount(<LandingPage />)
        const signUpButton = comp.find('.signup-button')
        signUpButton.simulate('click')
        comp.update()
        expect(comp.find(SignUp).exists()).toBe(true)
    })

    it("test if login loaded on button click", () => {
        const comp = mount(<LandingPage />)
        const loginButton = comp.find('.login-button')
        loginButton.simulate('click')
        comp.update()
        expect(comp.find(Login).exists()).toBe(true)
    })
})

describe("test if conditionally rendered component properly rendered", () => {
    it("test if signup loaded on button click and render properly", () => {
        const comp = mount(<LandingPage />)
        const signUpButton = comp.find('.signup-button')
        signUpButton.simulate('click')
        comp.update()
        expect(comp.find('.signup-container').exists()).toBe(true)
    })

    it("test if login loaded on button click and render properly", () => {
        const comp = mount(<LandingPage />)
        const loginButton = comp.find('.login-button')
        loginButton.simulate('click')
        comp.update()
        expect(comp.find('.login-container').exists()).toBe(true)
    })    
})