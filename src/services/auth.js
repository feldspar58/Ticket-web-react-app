const USERS_KEY = "ticketapp_session";
const TOKEN_KEY = "ticketapp_token";

const generateToken = (userId) => {
  const expirationTime = Date.now() + (30 * 60 * 1000);
  const tokenData = {
    userId,
    exp: expirationTime
  };

  return btoa(JSON.stringify(tokenData));
};


const validateToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return null;

  try {
    const decoded = JSON.parse(atob(token));
    

    if (decoded.exp < Date.now()) {
      localStorage.removeItem(TOKEN_KEY);
      return null;
    }
    
    return decoded;
  } catch {
    return null;
  }
};

const refreshToken = () => {
  const tokenData = validateToken();
  if (!tokenData) return false;

  const newToken = generateToken(tokenData.userId);
  localStorage.setItem(TOKEN_KEY, newToken);
  return true;
};

export const signup = (email, password, name) => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");

  if (users.find((u) => u.email === email)) {
    throw new Error("User with this email already exists");
  }

  if (!email || !password || !name) {
    throw new Error("All fields are required");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  const newUser = {
    id: Date.now().toString(),
    email,
    password,
    name,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  return { success: true, message: "Account created successfully!" };
};

export const login = (email, password) => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user.id);
  localStorage.setItem(TOKEN_KEY, token);

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getCurrentUser = () => {
  const tokenData = validateToken();
  if (!tokenData) return null;

  const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  const user = users.find((u) => u.id === tokenData.userId);
  
  if (!user) return null;

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const isAuthenticated = () => {
  const tokenData = validateToken();
  return !!tokenData;
};

export const keepSessionAlive = () => {
  return refreshToken();
};

export const updateCurrentUser = (updates) => {
  const tokenData = validateToken();
  if (!tokenData) throw new Error("Session expired. Please login again.");

  const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  const userIndex = users.findIndex((u) => u.id === tokenData.userId);
  
  if (userIndex === -1) throw new Error("User not found");

  if (
    updates.email &&
    users.find((u) => u.email === updates.email && u.id !== tokenData.userId)
  ) {
    throw new Error("Email already in use");
  }

  const updatedUser = {
    ...users[userIndex],
    ...updates,
  };

  users[userIndex] = updatedUser;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  const { password: _, ...userWithoutPassword } = updatedUser;
  return userWithoutPassword;
};