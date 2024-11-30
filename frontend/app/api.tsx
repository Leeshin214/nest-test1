export async function getUsers() {
    const response = await fetch('http://localhost:4000/users');
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  }
  
export async function updateUser(id: number, updateData: Partial<{ name: string; email: string }>) {
const response = await fetch(`http://localhost:4000/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateData),
});
if (!response.ok) {
    throw new Error('Failed to update user');
}
return response.json();
}

  
export async function deleteUser(id: number) {
    const response = await fetch(`http://localhost:4000/users/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('사용자 삭제 실패');
    }
}
