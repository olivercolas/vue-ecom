export const state = () => ({
	items: {},
	show: false
})

export const getters = {
    itemCount: (state) => {
		if(Object.keys(state.items).length > 0) {
            let count = 0
            for (const key in state.items) {
                if (state.items.hasOwnProperty(key)) {
                    const item = state.items[key];
                    count = count + item.quantity
                }
            }
            return count;
        }else{
            return 0
        }
	},
	hasItemInCart: (state) => (id) => {
		if (state.items[id]) {
			return true
		}
    },
    itemArray: (state) => {
        return Object.keys(state.items).map(key => state.items[key]);
    },
    itemArrayLength: (state, getters) => {
        return getters.itemArray.length;
    }
}

export const mutations = {
	ADD_ITEM_TO_CART(state, payload) {
		this._vm.$set(state.items, payload.sku, payload)
	},
	INCREMENT_ITEM_IN_CART(state, payload) {
		const quantity = state.items[payload.sku].quantity + 1
		this._vm.$set(state.items, payload.sku, { ...payload, quantity })
	},
	DECREMENT_ITEM_IN_CART(state, payload) {
		const quantity = state.items[payload.sku].quantity - 1
		this._vm.$set(state.items, payload.sku, { ...payload, quantity })
	},
	REMOVE_ITEM_FROM_CART(state, payload) {
		delete state.items[payload.sku]
	},
	TOGGLE_CART(state, payload) {
		state.show = !state.show
	}
	// UPDATE_ITEM_FROM_CART(state, payload) {
	//     state.items[payload.sku] = payload
	// },
}

export const actions = {
	add({ commit, dispatch, getters }, payload) {
		if (getters.hasItemInCart(payload.sku)) {
			commit('INCREMENT_ITEM_IN_CART', payload)
		} else {
			commit('ADD_ITEM_TO_CART', payload)
		}
	},
	remove({ commit, dispatch, getters }, payload) {
		if (getters.hasItemInCart(payload.sku)) {
			commit('DECREMENT_ITEM_IN_CART', payload)
		} else {
			commit('REMOVE_ITEM_TO_CART', payload)
		}
	},
	toggleCart({ state, commit }) {
		if (!state.show && Object.keys(state.items).length === 0) {
			return false
		} else {
			commit('TOGGLE_CART')
			return true
		}
	}
}
