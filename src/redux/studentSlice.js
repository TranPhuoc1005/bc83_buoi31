import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  studentList: [],
  editingStudent: null,
  searchKeyword: "",
};

const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {
        addStudent: (state, action) => {
            state.studentList.push(action.payload);
        },
        deleteStudent: (state, action) => {
            state.studentList = state.studentList.filter(
                (sv) => sv.maSV !== action.payload
            );
        },
        editStudent: (state, action) => {
            state.editingStudent = action.payload;
        },
        updateStudent: (state, action) => {
            const index = state.studentList.findIndex(
                (sv) => sv.maSV === action.payload.maSV
            );
        if (index !== -1) {
            state.studentList[index] = action.payload;
        }
        state.editingStudent = null;
        },
        setSearchKeyword: (state, action) => {
            state.searchKeyword = action.payload;
        },
    },
});

export const {addStudent,deleteStudent,editStudent,updateStudent,setSearchKeyword} = studentSlice.actions;

export default studentSlice.reducer;
