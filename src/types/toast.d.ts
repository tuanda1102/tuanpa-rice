export interface IToastLinkRedirect {
  linkRedirect: string;
  name: string;
}

export interface IToastWrapperProps {
  title?: string;
  text: string;
  redirect?: IToastLinkRedirect;
}
