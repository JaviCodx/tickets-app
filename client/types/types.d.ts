export type CurrentUser = null | { id: string; email: string };

export interface CurrentUserResponse {
  data: { currentUser: CurrentUser };
}

export interface Props {
  currentUser: CurrentUser;
}
