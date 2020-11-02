import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import {Button} from "@material-ui/core";

const DeleteDialog = (props) => {
    return (
        <Dialog
            open={props.open}
            onClose={props.setShowDialog}
            fullWidth={true}
            maxWidth={"sm"}
        >
            <DialogTitle>
                Are you sure you want to delete this task?
            </DialogTitle>

            <DialogContent>

            </DialogContent>

            <DialogActions>
                <Button onClick={props.setShowDialog}>Cancel</Button>
                <Button onClick={props.deleteTask}>Delete</Button>
            </DialogActions>
        </Dialog>
    )
}
// DeleteDialog.Proptypes = {
//     open: PropTypes.bool,
//     setShowDialog: PropTypes.func.isRequired,
//     deleteTask: PropTypes.func.isRequired
// }
export default DeleteDialog;