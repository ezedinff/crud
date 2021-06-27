import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from "@material-ui/core/Paper";
import CustomButton from "../../buttons/CustomButton";
import { User } from "app/pages/UserPage/slice/types";

const cellTitles = ["ID", "First", "Last", "Email", "Phone", "Location", "Hobby", "Actions"];
type Action = (user: User, type: "edit" | "delete") => void;
const UserTable: React.FC<{users: User[], action: Action}> = ({users, action}) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {cellTitles.map((cell) => (<TableCell>{cell}</TableCell>))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        users.map((user, index) => {
                            return (
                                <TableRow key={index}>
                                    {
                                        Object.entries(user).map((k) => 
                                        (
                                        <TableCell>{k[1]}</TableCell>
                                        ))                                                           
                                    }
                                    <TableCell>
                                        <CustomButton onClick={() => action(user, "edit")} variant="contained" buttonType="edit" size="small">Edit</CustomButton>
                                            &nbsp;&nbsp;
                                        <CustomButton onClick={() => action(user, "delete")} variant="contained" buttonType="delete" size="small">Del</CustomButton>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default UserTable;