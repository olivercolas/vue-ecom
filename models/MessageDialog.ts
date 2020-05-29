import Link from "./Link";

export interface MessageDialogState {
  show: boolean;
  title: string;
  description: string;
  link: Link | {};
}
