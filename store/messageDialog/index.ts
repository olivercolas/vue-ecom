import { MessageDialogState } from '~/models/MessageDialog';

export const state: (() => MessageDialogState) = () => ({
  show: false,
  title: '',
  description: '',
  link: {},
});
