import { render, screen } from "@testing-library/react"
import Navbar from "./Navbar"
import { MemoryRouter } from "react-router-dom"


describe("testing navbar component", () => {
    test("that it renders logo properly", () => {
        render(<MemoryRouter><Navbar /></MemoryRouter>)


        const logoElement = screen.getByAltText("logo");
        expect(logoElement).toBeInTheDocument();
    })
})