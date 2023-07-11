import { render, screen } from '@testing-library/react'
import Hotel from './Hotel'
import { MemoryRouter } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();
beforeEach(() => {

    fetchMock.resetMocks();
});


const hotel = {
    id: 1,
    name: "Hotel Swiss",
    shortDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed ",
    longDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum varius elit ut porttitor. Aenean nec viverra purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla egestas aliquet urna, ac volutpat libero cursus ac. Curabitur finibus eget quam non imperdiet. Ut commodo justo at ante elementum, lobortis congue ligula viverra. Nam accumsan dictum lacus, in vehicula nibh accumsan non. Mauris quis metus id mauris aliquet sagittis vel in odio. Donec gravida nunc justo, in luctus mi sagittis ac. Nunc elit nibh, rhoncus id mi ac, ullamcorper pellentesque ipsum. Nulla facilisi. Morbi id orci vitae lectus aliquet consequat et in nulla. Aliquam fringilla mi at mattis malesuada.",
    image: "https://raw.githubusercontent.com/jeff-lent/exotourista/main/HotelSwiss-Karachi.png",
    location: "Karachi",
    experience: "Budget",
    pool: false,
    price: 2500
};

describe("testing Hotel component", () => {
    test("that it renders hotel", () => {
        render(<MemoryRouter><Hotel hotel={hotel}/></MemoryRouter>);
        
        expect(screen.getByText(hotel.location)).toBeInTheDocument();
        expect(screen.getByText(hotel.experience)).toBeInTheDocument();
        expect(screen.getByText(hotel.pool ? 'Yes' : 'No')).toBeInTheDocument();
    })
})
