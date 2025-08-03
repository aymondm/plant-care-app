import { v4 as uuidv4 } from "uuid";

function getUserId() {
  let userId = localStorage.getItem("user_id"); // checks localStorage for an existing user_id
  if (!userId) {
    userId = uuidv4(); // generates a new id
    localStorage.setItem("user_id", userId); // stores the id
  }
  return userId;
}

export default getUserId;
