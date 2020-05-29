import { SnackbarState } from '~/models/Snackbar'

export const state: (() => SnackbarState) = () => ({
    show: false,
    multiLine: false,
    timeout: 2000,
    bottom: false,
    top: true,
    vertical: false,
    color: '',
    message: '',
})