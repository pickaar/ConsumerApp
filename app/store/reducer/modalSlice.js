import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    visibleConfig: false,
    animationTypeConfig: 'fade',
    transparentConfig: true,
    swipeDirectionConfig: null,
    message: '',
    modalName: 'INFO',
    modalContent: {}
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {

        setModalParam(state, action) {
            state[action.payload.key] = action.payload.value;
        },

        setConfig(state, action) {

            const { msg, visible, modal, swipeDirection, animationType, transparent, backDrop, modalContent } = action.payload;
            state.visibleConfig = visible || false;
            state.animationTypeConfig = animationType || 'fade';
            state.transparentConfig = transparent || true;
            state.swipeDirectionConfig = swipeDirection || null;
            state.message = msg || 'No Info';
            state.modalName = modal || 'INFO';
            state.modalContent = modalContent || 1;

        }

    }
})

// Action creators are generated for each case reducer function
export const {
    setModalParam,
    setConfig
} = modalSlice.actions

export default modalSlice.reducer;
