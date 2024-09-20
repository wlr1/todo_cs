import { TodoState } from "./types";
//SideMenu
export interface SidebarProps {
  isVisible: boolean;
  show: boolean;
  handleContentChange: (content: string) => void;
}

//redux auth slice
export interface AuthState {
  error: string | null;
  user: any | null;
  isLoading: boolean;
}

//user redux slice
export interface UserState {
  error: string | null;
  user: any | null;
  isLoading: boolean;
  avatar: string | undefined;
}

//todo redux slice
//single todo
export interface Todo {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: string;
}
export interface TodoState {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
}

//todoitem props
export interface TodoItemProps {
  todo: {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
    createdAt: string;
  };
}

//protectedRoute
export interface ProtectedRouteProps {
  children: React.ReactNode;
}
