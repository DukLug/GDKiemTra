import React, { useState, useEffect } from 'react';

const Cau2 = () => {
    const [students, setStudents] = useState(() => {
        const stored = localStorage.getItem('students');
        return stored ? JSON.parse(stored) : [
          { id: 1, name: 'Nguyễn Văn A', class: '12A1', age: 17 },
          { id: 2, name: 'Trần Thị B', class: '11B3', age: 16 },
          { id: 3, name: 'Lê Văn C', class: '10C2', age: 15 },
        ];
      });
      

    useEffect(() => {
        localStorage.setItem('students', JSON.stringify(students));
        console.log("Loaded data from previous section: ", students);
    }, [students]);


    const [newStudent, setNewStudent] = useState({ name: '', class: '', age: '' });

    const [editingId, setEditingId] = useState(null);
    const [editedStudent, setEditedStudent] = useState({ name: '', class: '', age: '' });

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

    const handleDelete = (id) => {
        setStudents(students.filter(student => student.id !== id));
    };

    const handleEditClick = (student) => {
        setEditingId(student.id);
        setEditedStudent({ name: student.name, class: student.class, age: student.age });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedStudent({ ...editedStudent, [name]: value });
    };

    const handleSaveEdit = (id) => {
        setStudents(students.map(student =>
        student.id === id ? { ...student, ...editedStudent, age: parseInt(editedStudent.age) } : student
        ));
        setEditingId(null);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
    };

    const [searchTerm, setSearchTerm] = useState('');


    

    const [selectedClass, setSelectedClass] = useState('all');

    const uniqueClasses = [...new Set(students.map(s => s.class))];

  
  
    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedClass === 'all' || student.class === selectedClass)
    );

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">📋 Danh sách sinh viên</h2>

      {/* Form thêm sinh viên */}
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

        <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Input tìm kiếm */}
            <input
                type="text"
                placeholder="🔍 Tìm theo tên sinh viên..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-1/2 border border-gray-300 rounded-md px-4 py-2"
            />

            {/* Select lọc lớp */}
            <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full md:w-1/4 border border-gray-300 rounded-md px-4 py-2"
            >
                <option value="all">📚 Tất cả các lớp</option>
                {uniqueClasses.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
                ))}
            </select>
        </div>


      {/* Bảng danh sách sinh viên */}
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
          {filteredStudents.map(student => (
            <tr key={student.id} className="hover:bg-gray-50 transition">
              {editingId === student.id ? (
                <>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      name="name"
                      value={editedStudent.name}
                      onChange={handleEditChange}
                      className="border border-gray-300 rounded-md px-2 py-1 w-full"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      name="class"
                      value={editedStudent.class}
                      onChange={handleEditChange}
                      className="border border-gray-300 rounded-md px-2 py-1 w-full"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="number"
                      name="age"
                      value={editedStudent.age}
                      onChange={handleEditChange}
                      className="border border-gray-300 rounded-md px-2 py-1 w-full"
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-center space-x-2">
                    <button
                      onClick={() => handleSaveEdit(student.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
                    >
                      Lưu
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded-md"
                    >
                      Huỷ
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="py-2 px-4 border-b">{student.name}</td>
                  <td className="py-2 px-4 border-b">{student.class}</td>
                  <td className="py-2 px-4 border-b">{student.age}</td>
                  <td className="py-2 px-4 border-b text-center space-x-2">
                    <button
                      onClick={() => handleEditClick(student)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                    >
                      Xoá
                    </button>
                  </td>
                </>
              )}
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
