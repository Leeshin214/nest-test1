'use client';

import { useState } from 'react';
import AddUserModal from './AddUserModal';

type User = {
  id: number;
  name: string;
  email: string;
};

type UserListProps = {
  initialUsers: User[]; // SSR에서 전달된 초기 데이터
};

export default function UserList({ initialUsers }: UserListProps) {
  const [users, setUsers] = useState<User[]>(initialUsers); // 초기값 설정
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddUser = (newUser: User) => {
    setUsers((prevUsers) => [...prevUsers, newUser]); // 상태에 새 유저 추가
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      const res = await fetch(`http://localhost:4000/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        throw new Error('Failed to delete user');
      }

      // 상태에서 삭제된 유저 제거
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <ul style={{ listStyle: 'none' }}>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
            <button
              onClick={() => handleDeleteUser(user.id)}
              style={{ marginLeft: '10px', color: 'red' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => setIsModalOpen(true)} style={{ marginLeft: '40px', marginTop: '10px' }}>
        Add User
      </button>
      {isModalOpen && (
        <AddUserModal
          onClose={() => setIsModalOpen(false)}
          onAddUser={handleAddUser}
        />
      )}
    </div>
  );
}
