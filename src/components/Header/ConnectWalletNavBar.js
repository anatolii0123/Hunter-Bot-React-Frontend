import React, { useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { accountAddress, initWallet } from "../../helpers/web3/Wallet";


export default function ConnectWalletNavBar({ address, handleChangeWalletAddress }) {

    const handleClick = async () => {
        await init()
    }

    const init = async () => {
        await initWallet()
        handleChangeWalletAddress(accountAddress)
    }

    useEffect(() => {
        if (localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER")) {
            init()
        } else {
            handleChangeWalletAddress('')
        }
    }, [address])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Discord Bot
                    </Typography>
                    <Button
                        color="inherit"
                        onClick={handleClick}
                    >
                        {address ? address.substr(0, 5) + '...' + address.substr(38, 42) : "Connect"}
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
