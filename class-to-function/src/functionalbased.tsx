import { useEffect, useState } from "react";

type User = {
  name: string;
  email: string;
};

type Props = {
  userId: string;
};

const UserData: React.FC<Props> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`https://secret.url/user/${userId}`);
        const data: User = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [userId]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <h1>User Data Component</h1>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <p>Timer: {seconds} seconds</p>
    </div>
  );
};

export default UserData;
