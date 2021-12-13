import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import BookCard from '../components/BookCard';

Enzyme.configure({ adapter: new Adapter() })

const bookDetails = {
    bookName: "Abc",
    author: "Xyz",
    price: "700",
    description: "qwerty"
}

const shallowBookCard = (props = {}, state = null) => {
    const component = shallow(< BookCard bookId={1} book={bookDetails} />)
    return component
}

const bookCardComp = shallowBookCard()

describe("Book card component loading without crash", () => {
    it("test if book card main container is loaded", () => {
        expect(bookCardComp.find('.book-card-container').exists()).toBe(true)
    })

    it("test if book image container is loaded", () => {
        expect(bookCardComp.find('.book-img-container').exists()).toBe(true)
    })

    it("test if book description container is loaded", () => {
        expect(bookCardComp.find('.book-description-container').exists()).toBe(true)
    })
})

describe("test if book data load properly", () => {
    it('test if book name is loading', () => {
        expect(bookCardComp.find('.book-title').text()).toEqual("Abc")
    })

    it('test if book author name is loading', () => {
        expect(bookCardComp.find('.book-author').text()).toEqual("by Xyz")
    })

    it('test if book price is loading', () => {
        expect(bookCardComp.find('.book-price').text()).toEqual(" Rs. 700")
    })
})