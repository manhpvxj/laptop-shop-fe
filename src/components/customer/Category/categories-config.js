import { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient"
import Iconify from "../../../utils/Iconify";


export const CategoryConfig = () => {
    const [listCategories, setListCategories] = useState([]);
    const getCategories = async () => {
        const categories = [];
        const { data } = await axiosClient.get('/customer/categories');
        data.forEach((e) => {
            categories.push(e);
        })
        setListCategories(categories);
    }

    useEffect(() => {
        getCategories();
    }, [])

    const categoriesConfig = listCategories.map((category, index) => {
        return {
            title: category.name === 'Macbook' ? `${category.name}` : `Laptop ${category.name}`,
            icon: category.name === 'Macbook' ? <Iconify icon={'ic:twotone-apple'}/> : <Iconify icon={'ic:outline-laptop-windows'}/>
        }
    })
    return categoriesConfig;
}