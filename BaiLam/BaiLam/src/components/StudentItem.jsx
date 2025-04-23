import React, { useState } from 'react';

const StudentItem = ({ student, onDelete, onEdit }) => {
  console.log("StudentItem: ", student);
  const [isEditing, setIsEditing] = useState(false);
  const [editedStudent, setEditedStudent] = useState({
    name: student.name,
    class: student.class,
    age: student.age,
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent({ ...editedStudent, [name]: value });
  };

  const handleSaveEdit = () => {
    onEdit(student.id, editedStudent);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedStudent({
      name: student.name,
      class: student.class,
      age: student.age,
    });
    setIsEditing(false);
  };

  return (
    <tr className="hover:bg-gray-50 transition">
      {isEditing ? (
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
              onClick={handleSaveEdit}
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
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md"
            >
              Sửa
            </button>
            <button
              onClick={() => onDelete(student.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
            >
              Xoá
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

export default StudentItem;
