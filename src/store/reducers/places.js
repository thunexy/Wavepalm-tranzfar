import {ADD_PLACE, DELETE_PLACE, DESELECT_PLACE, SELECT_PLACE} from "../actions/actionTypes";


const initialState = {
    places: [],
    selectedPlace: null
};


const reducers = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            return {
                ...state,
                places: state.places.concat({
                    key: "" + Math.random(), name: action.placeName, image: {
                        uri: "https://www.nairaland.com/attachments/9640523_img20180829202110_jpeg969d75e02a9fabefcd7f4a18117ac669"
                    }
                }),
            };
        case DELETE_PLACE:
            return {
                ...state,
                places: state.places.filter((snap) => {
                    return state.selectedPlace.key !== snap.key;
                }),
                selectedPlace: null
            };
        case SELECT_PLACE:
            return {
                ...state,
                selectedPlace: state.places.find(snap => {
                    return snap.key === action.placeKey;
                })
            };
        case DESELECT_PLACE:
            return{
                ...state,
                selectedPlace: null
            };
        default:
            return state;
    }
};

export default reducers;