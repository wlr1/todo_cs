//SideMenu
export interface SidebarProps {
  isVisible: boolean;
  show: boolean;
  handleContentChange: (content: string) => void;
  isUsernameHide: string;
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
  bgImage: string | undefined;
  contentBgImage: string | undefined;
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
//todos
export interface TodoState {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
  selectedTodo: null | Todo;
}

//create/update todo payload
export interface CreateUpdateTodoPayload {
  title: string;
  description: string;
  isCompleted?: boolean;
  createdAt: string;
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

//todoActions props
export interface TodoActionsProps {
  todoId: number;
  onDelete: (value: boolean) => void;
  onEdit: () => void;
}

//protectedRoute
export interface ProtectedRouteProps {
  children: React.ReactNode;
}

//EditFormProps
export interface EditFormProps {
  todo: {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
    createdAt: string;
  };
  setIsEditing: (value: boolean) => void;
}

//search by id props
export interface SearchByIdProps {
  setSearchId: (id: number | null) => void;
  fetchAllTodos: () => void;
}

//SearchByIdTodoListProps
export interface SearchByIdTodoListProps {
  searchId: number | null;
}

//settings menu props
export interface SettingsMenuProps {
  setCurrentBlur: (opacity: number) => void;
  currentBlur: number;
  setIsUsernameHide: (choice: string) => void;
  isUsernameHide: string;
}
