import { Category, Products, Searchbar } from "../components/customer/index";

const home = () => {
    return (
        <div className="grid grid-cols-10"> 
            <div className="col-span-2">
            <Category/>
            </div>
            <div className="col-span-8">
            <Products/>
            </div>
        </div>
    )
}

export default home