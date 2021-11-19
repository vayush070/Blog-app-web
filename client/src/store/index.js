import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialStatePage = { page: 2 };

const pageSlice = createSlice({
  name: "page",
  initialState: initialStatePage,
  reducers: {
    togglePage(state) {
      state.page = state.page === 1 ? 2 : 1;
    },
  },
});

const initialStateAuth = { isAuth: false };

const authSlice = createSlice({
  name: "Authentication",
  initialState: initialStateAuth,
  reducers: {
    login(state) {
      state.isAuth = true;
    },
    logout(state) {
      state.isAuth = false;
    },
  },
});

const initialStateForm = {
  name: "",
  email: "",
  password: "",
  text: "",
  curr_id: "",
};

const formSlice = createSlice({
  name: "form",
  initialState: initialStateForm,
  reducers: {
    setname(state, actions) {
      state.name = actions.payload;
    },
    setemail(state, actions) {
      state.email = actions.payload;
    },
    setpassword(state, actions) {
      state.password = actions.payload;
    },
    settext(state, actions) {
      state.text = actions.payload;
    },
    setid(state, actions) {
      state.curr_id = actions.payload;
    },
  },
});

const initialStateUsers = { users: [] };

const usersSlice = createSlice({
  name: "users",
  initialState: initialStateUsers,
  reducers: {
    updateusers(state, actions) {
      state.users = actions.payload;
    },
    adduser(state, actions) {
      state.users = [actions.payload, ...state.users];
    },
  },
});

const initialStateBlogs = { blogs: [] };

const blogsSlice = createSlice({
  name: "blogs",
  initialState: initialStateBlogs,
  reducers: {
    updateBlogs(state, actions) {
      state.blogs = actions.payload;
    },
    addblog(state, actions) {
      state.blogs = [actions.payload, ...state.blogs];
    },
  },
});
const store = configureStore({
  reducer: {
    page: pageSlice.reducer,
    auth: authSlice.reducer,
    form: formSlice.reducer,
    users: usersSlice.reducer,
    blogs: blogsSlice.reducer,
  },
});

export const pageActions = pageSlice.actions;
export const authActions = authSlice.actions;
export const formActions = formSlice.actions;
export const userActions = usersSlice.actions;
export const blogActions = blogsSlice.actions;

export default store;
