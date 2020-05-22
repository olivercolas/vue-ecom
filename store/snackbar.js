import { set } from '../utils/vuex'

export const state = () => ({
    show: false,
    multiLine: false,
    timeout: 2000,
    bottom: false,
    top: true,
    vertical: false,
    color: '',
    message: '',
})

export const mutations = {
    SET_SHOW: set('show'),
    SET_COLOR: set('color'),
    SET_MESSAGE: set('message'),
    UPDATE_SNACKBAR({ state }, payload) {
        this.state.options.multiLine = payload.multiLine
        this.state.options.timeout = payload.timeout
        this.state.options.bottom = payload.bottom
        this.state.options.vertical = payload.vertical
        this.state.options.color = payload.color
    },
}

function convertType(type) {
    switch (type) {
        case 'error':
            return 'error'
        case 'success':
            return 'green darken-1'
        case 'info':
            return 'info'
        default: 'black'
    }
}
export const actions = {
    open({ state, commit, dispatch }, { message, type }) {
        commit('SET_COLOR', type ? type : '')
        commit('SET_MESSAGE', message)
        if(state.show) {
            dispatch('close')
            setTimeout(() => {
                commit('SET_SHOW', true)
            }, 100)
        }else{
            commit('SET_SHOW', true)
        }
    },
    close({ commit }) {
        commit('SET_SHOW', false)
    },
    customOpen({ commit }, options) {
        options.type = convertType(options.type)
        commit('UPDATE_SNACKBAR', options)
    },
}
