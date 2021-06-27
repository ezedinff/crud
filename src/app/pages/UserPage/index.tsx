/**
 *
 * UserPage
 *
 */
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useUserSlice } from './slice';
import CustomButton from "../../components/buttons/CustomButton";
import UserTable from "../../components/table/UserTable";
import { Button, Container, Modal } from "@material-ui/core";
import UserForm from "../../components/forms/UserForm";
import { User } from './slice/types';
interface Props {}
const users: User[] = [
  {
      id: 1,
      firstName: "Ezedin",
      lastName: "Fedlu",
      email: "ez@gmail.com",
      phoneNumber: "01343414353",
      location: "Ethiopia, Addis Ababa",
      hobby: "reading"
  }
]
export function UserPage(props: Props) {
  const {actions} = useUserSlice();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [editUser, setEditUser] = useState<User>();

  useEffect(() => {
    dispatch(actions.fetchUsers());
  })
  const handler = (user: User, type: "edit" | "delete") => {
      if (type === "edit") {
        setEditUser(user);
        setOpen(true);
      }
  }
  const handleOpen = () => {setOpen(true)}
  const handleClose = () => {
    setEditUser(undefined);
    setOpen(false)
  }
  const submitForm = (user: User) => {
    console.log(user);

  }
  return (
    <Container>
        <UserTable users={users} action={handler}/>
        <div style={{marginTop: "24px"}}>
            <CustomButton buttonType="default" variant="contained" color="primary">Download CSV</CustomButton>
            &nbsp;&nbsp;
            <CustomButton buttonType="add" onClick = {handleOpen} variant="contained">Add Item</CustomButton>
        </div>
        <Modal
            open={open}
            onClose={() => handleClose()}
            aria-labelledby="user-registration"
            >
            <UserForm user={editUser} submit={submitForm}/>
        </Modal>
    </Container>
  );
}
