import { useState } from 'react';
import { Nav } from "../../components/admin";
import { useSelector } from "react-redux";
import { loginSelector } from "../../redux/auth.slice";
import Login from "../admin/Login";
import Header from '../../components/admin/Header';

export default function AdminLayout({children}) {
    const isLoggedin = localStorage.getItem("accessToken");
    if(!isLoggedin) {
        return <Login/>
    }

    return (
        <>
        <Header />
        <Nav/>
        <main>{children}</main>
        </>
        
    )
}