import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import React from "react";

function Copyright() {
    return (
        <Typography variant="body3" color="primary" align="center" >
            {'Copyright © '}
            <Link color="primary" href="./App.js" underline={'none'}>
                Korona19
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Copyright;
