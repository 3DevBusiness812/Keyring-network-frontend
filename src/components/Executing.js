import {Box, Grid} from "@mui/material"
import ReactLoading from "react-loading"

export default function Executing(props){
    var rows = [];
    for (var i = 0; i < 10 && props.userAddress[i]; i++) {
        // note: we are adding a key prop here to allow react to uniquely identify each
        // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
        rows.push(props.userAddress[i]);
    }
    return (
        <>
            <Box 
            border="1px solid #0000FF"
            width="200px"
            justifyContent='center'
            display="flex"
            padding="10px 0px"
            >
                Hello user {rows}...
            </Box>
            <Box 
            height="150px"
            border="1px solid #0000FF"
            >
                <Grid sm={12}
                    justifyContent='center'
                    display="flex"
                    alignItems="center"
                    margin="20px"
                >
                    <ReactLoading type={"spokes"} color="#000" />
                </Grid>
                <Grid
                    justifyContent='center'
                    display="flex"
                    alignItems="center"
                    >Executing...</Grid>
            </Box>
        </>
    );
}