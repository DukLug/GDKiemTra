import React, { useState } from 'react';

const Cau2 = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'Nguyễn Văn A', class: '12A1', age: 17 },
    { id: 2, name: 'Trần Thị B', class: '11B3', age: 16 },
    { id: 3, name: 'Lê Văn C', class: '10C2', age: 15 },
  ]);

  const [newStudent, setNewStudent] = useState({
    name: '',
    class: '',
    age: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.class || !newStudent.age) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    const newId = students.length > 0 ? students[students.length - 1].id + 1 : 1;
    const studentToAdd = {
      id: newId,
      name: newStudent.name,
      class: newStudent.class,
      age: parseInt(newStudent.age),
    };

    setStudents([...students, studentToAdd]);
    setNewStudent({ name: '', class: '', age: '' });
  };

  //cau4 
  const handleDelete = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">📋 Danh sách sinh viên</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          name="name"
          placeholder="Họ tên"
          value={newStudent.name}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2"
        />
        <input
          type="text"
          name="class"
          placeholder="Lớp"
          value={newStudent.class}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2"
        />
        <input
          type="number"
          name="age"
          placeholder="Tuổi"
          value={newStudent.age}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2"
        />
        <button
          onClick={handleAddStudent}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md transition"
        >
          Thêm sinh viên
        </button>
      </div>

      {/* Bảng danh sách */}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="py-3 px-4 border-b">Tên</th>
            <th className="py-3 px-4 border-b">Lớp</th>
            <th className="py-3 px-4 border-b">Tuổi</th>
            <th className="py-3 px-4 border-b">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id} className="hover:bg-gray-50 transition">
              <td className="py-2 px-4 border-b">{student.name}</td>
              <td className="py-2 px-4 border-b">{student.class}</td>
              <td className="py-2 px-4 border-b">{student.age}</td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={() => handleDelete(student.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md transition"
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
          {students.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">Không có sinh viên nào.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Cau2;
