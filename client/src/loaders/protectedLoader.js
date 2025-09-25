import { redirect } from "react-router-dom";

export async function protectedLoader() {
  try {
    // Check authentication by hitting a protected backend route
    const res = await fetch("http://localhost:4000/api/movies", {
      method: "GET",
      credentials: "include", // send httpOnly cookie
    });

    if (!res.ok) {
      // Not authenticated
      throw redirect("/signin");
    }

    const data = await res.json();
    return data; // optional: can return user/movies data to loader
  } catch (err) {
    throw redirect("/signin");
  }
}
