import React, { useState, useEffect } from 'react';
import StudentItem from './StudentItem';

const Cau2 = () => {
  const [students, setStudents] = useState(() => {
    const stored = localStorage.getItem('students');
    return stored ? JSON.parse(stored) : [
      { id: 1, name: 'Nguyễn Văn A', class: '12A1', age: 17 },
      { id: 2, name: 'Trần Thị B', class: '11B3', age: 16 },
      { id: 3, name: 'Lê Văn C', class: '10C2', age: 15 },
    ];
  });

  const [newStudent, setNewStudent] = useState({ name: '', class: '', age: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
    console.log("Loaded data from previous section: ", students);
  }, [students]);

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

  const handleDeleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const handleEditStudent = (id, editedStudent) => {
    setStudents(students.map(student =>
      student.id === id ? { ...student, ...editedStudent, age: parseInt(editedStudent.age) } : student
    ));
  };

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
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
          className="border border-gray-300 rounded-md px-3 py-2"
        />
        <input
          type="text"
          name="class"
          placeholder="Lớp"
          value={newStudent.class}
          onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
          className="border border-gray-300 rounded-md px-3 py-2"
        />
        <input
          type="number"
          name="age"
          placeholder="Tuổi"
          value={newStudent.age}
          onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
          className="border border-gray-300 rounded-md px-3 py-2"
        />
        <button
          onClick={handleAddStudent}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md transition"
        >
          Thêm sinh viên
        </button>
      </div>

      {/* Input tìm kiếm và lọc lớp */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="🔍 Tìm theo tên sinh viên..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 border border-gray-300 rounded-md px-4 py-2"
        />
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
          {filteredStudents.map(student => (
            <StudentItem
              key={student.id}
              student={student}
              onDelete={handleDeleteStudent}
              onEdit={handleEditStudent}
            />
          ))}
          {filteredStudents.length === 0 && (
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
