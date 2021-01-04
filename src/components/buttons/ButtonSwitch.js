import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';




const AntSwitch = withStyles((theme) => ({
    root: {
        width: 31,
        height: 19,
        padding: 0,
        display: 'flex',
    },
    switchBase: {
        padding: 2,
        color: theme.palette.grey[500],
        '&$checked': {
            transform: 'translateX(12px)',
            color: theme.palette.common.white,
            '& + $track': {
                opacity: 1,
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
            },
        },
    },
    thumb: {
        width: 15,
        height: 15,
        boxShadow: 'none',
    },
    track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 19 / 2,
        opacity: 1,
        backgroundColor: theme.palette.common.white,
    },
    checked: {},
}))(Switch);

export default function CustomizedSwitches(props) {
    const [state, setState] = React.useState({
        checked: true,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
                <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>Off</Grid>
                    <Grid item>
                        <AntSwitch checked={props.live.row.is_live}  onChange={handleChange} name="checked" />
                    </Grid>
                    <Grid item>On</Grid>
                </Grid>
    );
}
