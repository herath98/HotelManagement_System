// types/routes.ts


export interface RouteConfig {
  path: string;
  element: JSX.Element;
  children?: ChildRouteConfig[];
}

export interface ChildRouteConfig {
  path?: string;
  element: JSX.Element;
  index?: boolean;
}