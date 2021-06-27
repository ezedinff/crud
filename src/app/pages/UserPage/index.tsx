/**
 *
 * UserPage
 *
 */
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUserSlice } from './slice';
import CustomButton from "../../components/buttons/CustomButton";
import UserTable from "../../components/table/UserTable";
import { Button, Container, Modal } from "@material-ui/core";
import UserForm from "../../components/forms/UserForm";
import { User } from './slice/types';
import { selectUser } from './slice/selectors';
import { exportTOFile } from 'utils/functions';
const { Parser } = require('json2csv');
interface Props {}
export function UserPage(props: Props) {
  const {actions} = useUserSlice();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [editUser, setEditUser] = useState<User>();
  const {loading, users, error} = useSelector(selectUser);
  useEffect(() => {
    dispatch(actions.fetchUsers());
  }, [])
  const handler = (user: User, type: "edit" | "delete") => {
      if (type === "edit") {
        setEditUser(user);
        setOpen(true);
      } else {
        dispatch(actions.deleteUser(user._id));
      }
  }
  const handleOpen = () => {setOpen(true)}
  const handleClose = () => {
    setEditUser(undefined);
    setOpen(false)
  }
  const submitForm = (user: User) => {
    if(!!editUser) {
       dispatch(actions.updateUser(user));
    } else { dispatch(actions.addUser(user)); }
  }
  const downloadCSV = () => {
    const headers = Object.entries(users[0]).map((u) => u[0]);
    try {
      const parser = new Parser({fields: headers});
      const csv = parser.parse(users);
      exportTOFile(csv, "List of users");
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <Container>
        <UserTable users={users} action={handler}/>
        <div style={{marginTop: "24px"}}>
            <CustomButton buttonType="default" onClick={downloadCSV} variant="contained" color="primary">Download CSV</CustomButton>
            &nbsp;&nbsp;
            <CustomButton buttonType="add" onClick = {handleOpen} variant="contained">Add Item</CustomButton>
        </div>
        <Modal
            open={open}
            onClose={() => handleClose()}
            aria-labelledby="user-registration"
            >
            <UserForm user={editUser} loading={loading} submit={submitForm}/>
        </Modal>
    </Container>
  );
}
