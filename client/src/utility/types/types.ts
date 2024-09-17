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

//protectedRoute
export interface ProtectedRouteProps {
  children: React.ReactNode;
}
