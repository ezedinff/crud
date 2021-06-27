export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  location: string;
  hobby: string;
}
/* --- STATE --- */
export interface UserState {
  users: User[];
  error?: string | null;
  loading: boolean;
}
