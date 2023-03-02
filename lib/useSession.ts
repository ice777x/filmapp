import React from "react";

export default function useSession() {
  const [session, setSession] = React.useState<{
    id: number;
    name: string;
    session: string;
  } | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const session = localStorage.getItem("session");
    if (session) {
      const fetchUser = async (session: string) => {
        const res = await fetch("/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({session}),
        });
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setSession(data.user);
      };
      fetchUser(session);
      setLoading(false);
    }
  }, [loading]);
  return {session, loading};
}
