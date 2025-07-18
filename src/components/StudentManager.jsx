import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {addStudent,deleteStudent,editStudent,updateStudent,setSearchKeyword} from "../redux/studentSlice";

export default function StudentManager() {
    const dispatch = useDispatch();
    const { studentList, editingStudent, searchKeyword } = useSelector(
        (state) => state.student
    );

    const [formData, setFormData] = useState({
        maSV: "",
        hoTen: "",
        soDienThoai: "",
        email: "",
    });

    const [formError, setFormError] = useState({});

    useEffect(() => {
        if (editingStudent) {
            setFormData(editingStudent);
        }
    }, [editingStudent]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const error = {};
        if (!formData.maSV) error.maSV = "Mã SV không được để trống";
        if (!formData.hoTen) error.hoTen = "Họ tên không được để trống";
        if (!formData.soDienThoai) error.soDienThoai = "SĐT không được để trống";
        if (!formData.email) error.email = "Email không được để trống";
        setFormError(error);
        return Object.keys(error).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        if (editingStudent) {
        dispatch(updateStudent(formData));
        } else {
        dispatch(addStudent(formData));
        }

        setFormData({ maSV: "", hoTen: "", soDienThoai: "", email: "" });
        setFormError({});
    };

    const handleEdit = (sv) => {
        dispatch(editStudent(sv));
    };

    const handleDelete = (maSV) => {
        dispatch(deleteStudent(maSV));
    };

    const handleSearch = (e) => {
        dispatch(setSearchKeyword(e.target.value));
    };

    const filteredList = studentList.filter((sv) =>
        sv.hoTen.toLowerCase().includes(searchKeyword.toLowerCase())
    );

  return (
    <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Thông tin sinh viên</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
                <input
                type="text"
                name="maSV"
                placeholder="Mã SV"
                className="w-full p-2 border rounded"
                value={formData.maSV}
                onChange={handleChange}
                disabled={editingStudent}
                />
                <p className="text-red-500 text-sm">{formError.maSV}</p>
            </div>
            <div>
                <input
                type="text"
                name="hoTen"
                placeholder="Họ tên"
                className="w-full p-2 border rounded"
                value={formData.hoTen}
                onChange={handleChange}
                />
                <p className="text-red-500 text-sm">{formError.hoTen}</p>
            </div>
            <div>
                <input
                type="text"
                name="soDienThoai"
                placeholder="SĐT"
                className="w-full p-2 border rounded"
                value={formData.soDienThoai}
                onChange={handleChange}
                />
                <p className="text-red-500 text-sm">{formError.soDienThoai}</p>
            </div>
            <div>
                <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-2 border rounded"
                value={formData.email}
                onChange={handleChange}
                />
                <p className="text-red-500 text-sm">{formError.email}</p>
            </div>
            </div>
            <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
            {editingStudent ? "Cập nhật" : "Thêm sinh viên"}
            </button>
        </form>

        <input
            type="text"
            className="mt-6 w-full p-2 border rounded"
            placeholder="Tìm theo họ tên..."
            onChange={handleSearch}
        />

        <table className="w-full mt-4 table-auto border-collapse border border-gray-300">
            <thead>
            <tr className="bg-gray-200">
                <th className="border p-2">Mã SV</th>
                <th className="border p-2">Họ tên</th>
                <th className="border p-2">SĐT</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Hành động</th>
            </tr>
            </thead>
            <tbody>
            {filteredList.map((sv) => (
                <tr key={sv.maSV} className="text-center">
                <td className="border p-2">{sv.maSV}</td>
                <td className="border p-2">{sv.hoTen}</td>
                <td className="border p-2">{sv.soDienThoai}</td>
                <td className="border p-2">{sv.email}</td>
                <td className="border p-2 space-x-2">
                    <button
                    className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                    onClick={() => handleEdit(sv)}
                    >
                    Sửa
                    </button>
                    <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(sv.maSV)}
                    >
                    Xoá
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
  );
}
