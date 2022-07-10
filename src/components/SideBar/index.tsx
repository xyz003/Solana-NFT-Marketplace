import React from "react";
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent
} from "react-pro-sidebar";

import { useCallback, useEffect, useState } from "react"

import "../../components/SideBar/style.css"
import 'font-awesome/css/font-awesome.min.css'
import useWindowDimensions from "../../utils/layout";


export const SideBar = ({ setStatus, menuCollapse, setMenuCollapse, subTitle }: any) => {


    const [title, setTitle] = useState("Your Wallet");

    //create a custom function that will change menucollapse state from false to true and true to false
    const menuIconClick = () => {
        //condition checking to change state from true to false and vice versa
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };

    const checkWidth = (e: any) => {
        const width = window.innerWidth;
        console.log(menuCollapse);
        if (width > 768 && !menuCollapse) {
            console.log('>');
            setMenuCollapse(true);
        }
        if (width <= 768 && menuCollapse) {
            setMenuCollapse(false);
        }

    }

    useEffect(() => {
        window.addEventListener('resize', (e) => {
            checkWidth(e);
        })
    }, [])


    return (
        <>
            {menuCollapse ?
                <ProSidebar
                >

                    <SidebarHeader
                        style={{
                            padding: 40,
                        }}>
                        <div className="sidebar-header1">
                            <div>
                                {title}
                            </div>
                            <div className="sidebar-header2 mt-2">
                                {subTitle}
                            </div>
                            {/* <div className="sidebar-header3 mt-2">
                                Total Floor Value
                            </div> */}
                        </div>
                        <div className="closemenu" onClick={menuIconClick}>
                            {/* changing menu collapse icon on click */}
                            {menuCollapse ? (
                                <i className="fa fa-arrow-circle-left"></i>
                            ) : (
                                <i className="fa fa-arrow-circle-right"></i>
                            )}
                        </div>
                    </SidebarHeader>

                    <SidebarContent
                        style={{
                            padding: '20px 0 20px 50px',
                            color: "white"
                        }}
                    >
                        <Menu>
                            <MenuItem onClick={() => { setStatus(0); setTitle("Your Wallet"); }}> Owned NFTs </MenuItem>
                            <MenuItem onClick={() => { setStatus(1); setTitle("Your Listed NFTs"); }}> Listed NFTs </MenuItem>
                            <MenuItem onClick={() => { setStatus(4); setTitle("Offers Received") }}> Offers Received </MenuItem>
                            <MenuItem onClick={() => { setStatus(5); setTitle("Offers Made") }}> Offers Made </MenuItem>
                            <MenuItem onClick={() => { setStatus(2); setTitle("Your Live Bids"); }}> Live Domain Bids </MenuItem>
                            {/* <MenuItem> Creations </MenuItem> */}
                            {/* <MenuItem onClick={() => setStatus(3)}> <a href="" id="auction"> Activities </a> </MenuItem> */}
                        </Menu>
                    </SidebarContent>


                    {/* <SidebarFooter
                style={{
                    textAlign: "center",
                    padding: 20,
                    color: "white"
                }}>
                <div>
                    <p
                        style={{
                            textTransform: "uppercase",
                            marginBottom: "20px"
                        }}>
                        Bidding Account
                    </p>
                    <p> Balance &nbsp; &nbsp; 20 SOL</p>
                    <button className = "sidebar-btn">Deposit</button>
                    <button className = "sidebar-btn">Withdraw</button>
                </div>
            </SidebarFooter> */}
                </ProSidebar >
                :
                <div className="small-sidebar">
                    <div className="closemenu" onClick={menuIconClick}>
                        {/* changing menu collapse icon on click */}
                        {menuCollapse ? (
                            <i className="fa fa-arrow-circle-left"></i>
                        ) : (
                            <i className="fa fa-arrow-circle-right"></i>
                        )}
                    </div>
                </div>
            }
        </>

    );
};
