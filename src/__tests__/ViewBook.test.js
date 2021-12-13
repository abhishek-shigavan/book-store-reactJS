import { render, fireEvent } from '@testing-library/react'
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import ViewBook from '../components/ViewBook';
import '@testing-library/jest-dom/extend-expect';
import { getByTestId } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() })

const bookDetails = {
    bookName: "Abc",
    author: "Xyz",
    price: "700",
    description: "qwerty"
}
const shallowMountViewBook = (props = {}, state = null) => {
    const component = shallow(<ViewBook BookNo={1} BookDetails={bookDetails} />)
    return component
}

const viewBookComponent = shallowMountViewBook();

describe("test view book component loading without crash", () => {
    it("test if view book main container is loaded", () => {
        expect(viewBookComponent.find('.book-details-main-container').exists()).toBe(true)
    })

    it("test if image icon container is loaded", () => {
        expect(viewBookComponent.find('.image-icon-container').exists()).toBe(true)
    })

    it("test if book image container is loaded", () => {
        expect(viewBookComponent.find('.book-main-image-container').exists()).toBe(true)
    })

    it("test if book details container is loaded", () => {
        expect(viewBookComponent.find('.book-title-price-container').exists()).toBe(true)
    })

    it("test if customer feedback container is loaded", () => {
        expect(viewBookComponent.find('.customer-feedback-container').exists()).toBe(true)
    })

    it("test if user review container is loaded", () => {
        expect(viewBookComponent.find('.user-review-container').exists()).toBe(true)
    })
})

describe("test if conditonal rendering elements are working as expected", () => {
    it("test if add to bag button is on inital load", () => {
        const comp = shallow(<ViewBook BookNo={1} BookDetails={bookDetails}/>)
        expect(comp.find('.add-to-bag-button').exists()).toBe(true)
    })

    // it("test if remove add quantity button is loaded after button click", () => {
    //     const comp = shallow(<ViewBook BookNo={1} BookDetails={bookDetails}/>)
    //     const addToBagButton = comp.find('.add-to-bag-button')
    //     addToBagButton.simulate('click')
    //     comp.update()
    //     expect(comp.find('.book-quantity-container').exists()).toBe(false)
    // })
})

describe("test if book data is send and load properly", () => {
    it('test if book name is loading', () => {
        expect(viewBookComponent.find('.view-book-title').text()).toEqual("Abc")
    })

    it('test if book author name is loading', () => {
        expect(viewBookComponent.find('.view-book-author').text()).toEqual("by Xyz")
    })

    it('test if book price is loading', () => {
        expect(viewBookComponent.find('.view-book-price').text()).toEqual(" Rs. 700")
    })
})

// describe("D", () => {
    
//     it("Ds", () => {
//         render(<ViewBook BookNo={1} BookDetails={bookDetails}/>)
//         const wishlistButton = document.querySelector('#wishlistButton')
//         fireEvent.click(wishlistButton)
//         expect(getByTestId('wishlist-button')).toBeDisabled()
//     })
// })