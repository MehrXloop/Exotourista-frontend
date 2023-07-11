import { fireEvent, render, screen } from "@testing-library/react"
import HotelList from "./HotelList"
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter } from "react-router-dom";

const server = setupServer(
    rest.get('http://localhost:8080/hotels/all', (req, res, ctx) => {
        const hotels = [
            {
                id: 1,
                name: "Hotel Swiss",
                shortDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed ",
                longDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum varius elit ut porttitor. Aenean nec viverra purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla egestas aliquet urna, ac volutpat libero cursus ac. Curabitur finibus eget quam non imperdiet. Ut commodo justo at ante elementum, lobortis congue ligula viverra. Nam accumsan dictum lacus, in vehicula nibh accumsan non. Mauris quis metus id mauris aliquet sagittis vel in odio. Donec gravida nunc justo, in luctus mi sagittis ac. Nunc elit nibh, rhoncus id mi ac, ullamcorper pellentesque ipsum. Nulla facilisi. Morbi id orci vitae lectus aliquet consequat et in nulla. Aliquam fringilla mi at mattis malesuada.",
                image: "https://raw.githubusercontent.com/jeff-lent/exotourista/main/HotelSwiss-Karachi.png",
                location: "Karachi",
                experience: "Budget",
                pool: false,
                price: 2500
            },
            {
                id: 2,
                name: "Hotel Swiss",
                shortDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed ",
                longDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum varius elit ut porttitor. Aenean nec viverra purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla egestas aliquet urna, ac volutpat libero cursus ac. Curabitur finibus eget quam non imperdiet. Ut commodo justo at ante elementum, lobortis congue ligula viverra. Nam accumsan dictum lacus, in vehicula nibh accumsan non. Mauris quis metus id mauris aliquet sagittis vel in odio. Donec gravida nunc justo, in luctus mi sagittis ac. Nunc elit nibh, rhoncus id mi ac, ullamcorper pellentesque ipsum. Nulla facilisi. Morbi id orci vitae lectus aliquet consequat et in nulla. Aliquam fringilla mi at mattis malesuada.",
                image: "https://raw.githubusercontent.com/jeff-lent/exotourista/main/HotelSwiss-Karachi.png",
                location: "Karachi",
                experience: "Budget",
                pool: false,
                price: 2500
            }

        ];
        return res(ctx.json(hotels));
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("testing hotelList component", () => {

    test("that it is rendering form properly", () => {
        render(<MemoryRouter><HotelList /></MemoryRouter>)

        const formElement = screen.getByTestId("form");
        const headingElement = screen.getByRole('heading', {  name: /search criteria/i});
        const location =screen.getByText(/please select your location:/i);
        const dropdown = screen.getByRole('combobox', {  name: /please select your experience level:/i});
        expect(dropdown).toBeInTheDocument()
        expect(location).toBeInTheDocument();
        expect(headingElement).toBeInTheDocument();
        expect(formElement).toBeInTheDocument();
    })
    test("that it renders list of hotels", async () => {

        render(<MemoryRouter><HotelList /></MemoryRouter>)
      
        const searchBtn = screen.getByTestId("searchBtn");
        fireEvent.click(searchBtn);
        const hotels = screen.getByTestId('hotel');
        expect(hotels).toBeInTheDocument();
    })



})