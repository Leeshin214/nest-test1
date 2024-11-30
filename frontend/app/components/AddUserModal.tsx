'use client';

import { useState } from 'react';
import styles from './AddUserModal.module.css';

type AddUserModalProps = {
  onClose: () => void;
  onAddUser: (newUser: { id: number; name: string; email: string }) => void; // 부모 상태 갱신 콜백
};

export default function AddUserModal({ onClose, onAddUser }: AddUserModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleAddUser = async () => {
    if (!name || !email) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const res = await fetch('http://localhost:4000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      if (!res.ok) {
        throw new Error('Failed to add user');
      }

      const addedUser = await res.json();

      // 부모 상태 갱신
      onAddUser(addedUser);

      alert('User added successfully');
      onClose();
    } catch (error) {
      console.error('Error adding user:', error);
      setError('Failed to add user');
    }
  };

  return (
    <div className={styles.modal}>
      <h2 className={styles.title}>Add New User</h2>
      <div className={styles['input-container']}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        {error && <p className={styles.error}>{error}</p>}
      </div>
      <div className={styles['button-container']}>
        <button onClick={handleAddUser} className={styles.button}>
          Confirm
        </button>
        <button onClick={onClose} className={`${styles.button} ${styles.cancel}`}>
          Cancel
        </button>
      </div>
    </div>
  );
}
