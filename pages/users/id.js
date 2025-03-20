// pages/users/[id].js
import Link from "next/link";

export default function UserDetail({ user }) {
  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Website: {user.website}</p>
      <h2>Address</h2>
      <p>
        {user.address.street}, {user.address.suite}, {user.address.city},{" "}
        {user.address.zipcode}
      </p>
      <h2>Company</h2>
      <p>Name: {user.company.name}</p>
      <p>Business: {user.company.bs}</p>
      <p>Catch Phrase: {user.company.catchPhrase}</p>

      <Link href="/users">Back to Users List</Link>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();

  const paths = users.map((user) => ({
    params: { id: user.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.id}`
  );
  const user = await res.json();

  return {
    props: {
      user,
    },
  };
}
