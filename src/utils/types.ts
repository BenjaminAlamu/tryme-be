export type loginUser = {
  password: string;
  email: string;
};

export type userType = {
  name: string;
  password: string;
  email: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type decodeUserType = {
  sub: string;
  user: userType;
  iat: number;
  nb: number;
  exp: number;
};

export type createTaskType = {
  title: string;
  dueDate: Date;
  priority: string;
};

export type editTaskType = {
  title?: string;
  dueDate?: Date;
  priority?: string;
  user?: userType;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type criteriaType = {
  _id?: string;
  user?: Date;
  status?: string;
  priority?: userType;
  search?: string;
};

export type paginationInfoType = {
  current_page: number;
  per_page: number;
  total_pages: number;
  count: number;
};

export type paginationOptionsType = {
  page: number;
  limit: number;
};
