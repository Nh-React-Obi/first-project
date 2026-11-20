import type { ChatMessage, Employee, Post, Project, Region, Task } from "../types";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8000";
const TOKEN_KEY = "roster.token";

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null): void {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getToken();
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
  });
  if (!res.ok) {
    let detail = `${init?.method ?? "GET"} ${path} failed: ${res.status}`;
    try {
      const body = await res.json();
      if (body?.detail) detail = body.detail;
    } catch {
      /* no json body */
    }
    throw new ApiError(res.status, detail);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const api = {
  // Auth
  login: (email: string, password: string) =>
    request<{ token: string; user: Employee }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  me: () => request<Employee>("/api/auth/me"),
  logout: () => request<void>("/api/auth/logout", { method: "POST" }),

  // Employees
  getEmployees: () => request<Employee[]>("/api/employees"),
  updateEmployee: (
    id: string,
    payload: Partial<Pick<Employee, "region_id" | "status" | "assignment">>,
  ) =>
    request<Employee>(`/api/employees/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),

  // Regions
  getRegions: () => request<Region[]>("/api/regions"),

  // Projects
  getProjects: (memberId?: string) =>
    request<Project[]>(`/api/projects${memberId ? `?member_id=${memberId}` : ""}`),
  getProject: (id: string) => request<Project>(`/api/projects/${id}`),
  getProjectTasks: (id: string) => request<Task[]>(`/api/projects/${id}/tasks`),
  createProject: (payload: {
    name: string;
    description: string;
    client?: string;
    member_ids: string[];
  }) =>
    request<Project>("/api/projects", { method: "POST", body: JSON.stringify(payload) }),
  updateProject: (id: string, payload: Partial<Project>) =>
    request<Project>(`/api/projects/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),

  // Tasks
  getTasks: (filters?: {
    status?: string;
    priority?: string;
    project_id?: string;
    assignee_id?: string;
  }) => {
    const params = new URLSearchParams(filters as Record<string, string>).toString();
    return request<Task[]>(`/api/tasks${params ? `?${params}` : ""}`);
  },
  createTask: (payload: {
    project_id: string;
    title: string;
    description?: string;
    status?: string;
    priority?: string;
    assignee_id?: string | null;
    due_date?: string | null;
  }) => request<Task>("/api/tasks", { method: "POST", body: JSON.stringify(payload) }),
  updateTask: (id: string, payload: Partial<Task>) =>
    request<Task>(`/api/tasks/${id}`, { method: "PATCH", body: JSON.stringify(payload) }),
  deleteTask: (id: string) => request<void>(`/api/tasks/${id}`, { method: "DELETE" }),

  // Posts (community feed)
  getPosts: () => request<Post[]>("/api/posts"),
  createPost: (payload: {
    content: string;
    link_url?: string | null;
    image_url?: string | null;
    tags: string[];
  }) => request<Post>("/api/posts", { method: "POST", body: JSON.stringify(payload) }),
  likePost: (id: string) => request<Post>(`/api/posts/${id}/like`, { method: "POST" }),

  // Chat
  getChannels: () => request("/api/chat/channels"),
  getMessages: (channelId: string) =>
    request<ChatMessage[]>(`/api/chat/channels/${channelId}/messages`),
  postMessage: (channelId: string, senderId: string, content: string) =>
    request<ChatMessage>(`/api/chat/channels/${channelId}/messages`, {
      method: "POST",
      body: JSON.stringify({ sender_id: senderId, content }),
    }),
};

export function chatSocketUrl(channelId: string): string {
  const wsBase = API_BASE.replace(/^http/, "ws");
  const token = getToken();
  const qs = token ? `?token=${encodeURIComponent(token)}` : "";
  return `${wsBase}/ws/chat/${channelId}${qs}`;
}

export { API_BASE, ApiError };
