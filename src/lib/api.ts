
import axios, { AxiosError } from "axios";

import type {
  ChatMessage,
  Employee,
  Post,
  Project,
  Region,
  Task,
} from "../types";

export const API_BASE =
  import.meta.env.VITE_API_URL ?? "http://localhost:8000";

const TOKEN_KEY = "roster.token";

// --------------------------------------
// Token management
// --------------------------------------

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null): void {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}


// --------------------------------------
// Axios instance
// --------------------------------------

export const http = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token to every request
http.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Centralized error handling
http.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ detail?: string }>) => {
    const status = error.response?.status;

    const message =
      error.response?.data?.detail ??
      error.message ??
      "Something went wrong";

    throw new ApiError(status ?? 0, message);
  }
);

// --------------------------------------
// Custom API error
// --------------------------------------

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

// --------------------------------------
// API methods
// --------------------------------------

export const api = {
  // Auth
  login: async (email: string, password: string) => {
    const { data } = await http.post<{ token: string; user: Employee }>(
      "/api/auth/login",
      { email, password }
    );

    return data;
  },

  me: async () => {
    const { data } = await http.get<Employee>("/api/auth/me");
    return data;
  },

  logout: async () => {
    const { data } = await http.post<void>("/api/auth/logout");
    return data;
  },

  // Employees
  getEmployees: async () => {
    const { data } = await http.get<Employee[]>("/api/employees");
    return data;
  },

  updateEmployee: async (
    id: string,
    payload: Partial<Pick<Employee, "region_id" | "status" | "assignment">>
  ) => {
    const { data } = await http.patch<Employee>(
      `/api/employees/${id}`,
      payload
    );

    return data;
  },

  // Regions
  getRegions: async () => {
    const { data } = await http.get<Region[]>("/api/regions");
    return data;
  },

  // Projects
  getProjects: async (memberId?: string) => {
    const { data } = await http.get<Project[]>("/api/projects", {
      params: memberId ? { member_id: memberId } : undefined,
    });

    return data;
  },

  getProject: async (id: string) => {
    const { data } = await http.get<Project>(`/api/projects/${id}`);
    return data;
  },

  getProjectTasks: async (id: string) => {
    const { data } = await http.get<Task[]>(`/api/projects/${id}/tasks`);
    return data;
  },

  createProject: async (payload: {
    name: string;
    description: string;
    client?: string;
    member_ids: string[];
  }) => {
    const { data } = await http.post<Project>("/api/projects", payload);
    return data;
  },

  updateProject: async (id: string, payload: Partial<Project>) => {
    const { data } = await http.patch<Project>(
      `/api/projects/${id}`,
      payload
    );

    return data;
  },

  // Tasks
  getTasks: async (filters?: {
    status?: string;
    priority?: string;
    project_id?: string;
    assignee_id?: string;
  }) => {
    const { data } = await http.get<Task[]>("/api/tasks", {
      params: filters,
    });

    return data;
  },

  createTask: async (payload: {
    project_id: string;
    title: string;
    description?: string;
    status?: string;
    priority?: string;
    assignee_id?: string | null;
    due_date?: string | null;
  }) => {
    const { data } = await http.post<Task>("/api/tasks", payload);
    return data;
  },

  updateTask: async (id: string, payload: Partial<Task>) => {
    const { data } = await http.patch<Task>(
      `/api/tasks/${id}`,
      payload
    );

    return data;
  },

  deleteTask: async (id: string) => {
    await http.delete(`/api/tasks/${id}`);
  },

  // Posts (community feed)
  getPosts: async () => {
    const { data } = await http.get<Post[]>("/api/posts");
    return data;
  },

  createPost: async (payload: {
    content: string;
    link_url?: string | null;
    image_url?: string | null;
    tags: string[];
  }) => {
    const { data } = await http.post<Post>("/api/posts", payload);
    return data;
  },

  likePost: async (id: string) => {
    const { data } = await http.post<Post>(`/api/posts/${id}/like`);
    return data;
  },

  // Chat
  getChannels: async () => {
    const { data } = await http.get("/api/chat/channels");
    return data;
  },

  getMessages: async (channelId: string) => {
    const { data } = await http.get<ChatMessage[]>(
      `/api/chat/channels/${channelId}/messages`
    );

    return data;
  },

  postMessage: async (
    channelId: string,
    senderId: string,
    content: string
  ) => {
    const { data } = await http.post<ChatMessage>(
      `/api/chat/channels/${channelId}/messages`,
      {
        sender_id: senderId,
        content,
      }
    );

    return data;
  },
};

// --------------------------------------
// WebSocket
// --------------------------------------

export function chatSocketUrl(channelId: string): string {
  const wsBase = API_BASE.replace(/^http/, "ws");
  const token = getToken();

  const qs = token ? `?token=${encodeURIComponent(token)}` : "";

  return `${wsBase}/ws/chat/${channelId}${qs}`;
}
