import UserList from "./components/UserList";

type User = {
  id: number;
  name: string;
  email: string;
};

export default async function HomePage() {
  const res = await fetch('http://localhost:4000/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store', // 최신 데이터를 서버에서 가져옵니다.
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch users: ${res.status}`);
  }

  const users: User[] = await res.json();

  return (
    <main>
      <h1>User List</h1>
      <UserList initialUsers={users} />
    </main>
  );
}
