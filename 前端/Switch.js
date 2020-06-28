import Switch from "@material-ui/core/Switch/Switch";
import React from "react";
import { useN02SwitchStyles } from '@mui-treasury/styles/switch/n02';


function SwitchStyles(props) {
    const switchStyles = useN02SwitchStyles();
    function handleChange(e){
        props.isToggled(e.target.checked);
    }
    return (
        <div>
            <Switch
                color="primary"
                classes={switchStyles}
                checked={props.toggled}
                onChange={handleChange}
            />
        </div>
    );
}
export default SwitchStyles;
