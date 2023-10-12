import { createReducer } from "@reduxjs/toolkit";
import { heroesFetching,
         heroesFetched,
         heroesFetchingError,
         heroesCreated,
         heroesDelete
                        } from "../actions";   

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}

const heroes = createReducer(initialState, builder => {
    builder
        .addCase(heroesFetching, state => {
            state.heroesLoadingStatus = 'loading';
        })
        .addCase(heroesFetched, (state, action) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes = action.payload;
        })
        .addCase(heroesFetchingError, state => {
            state.heroesLoadingStatus = 'error';
        })
        .addCase(heroesDelete, (state, action) => {
            state.heroes = state.heroes.filter((hero) => hero.id !== action.payload);
        })
        .addCase(heroesCreated, (state, action) => {
            state.heroes.push(action.payload);
        })
        .addDefaultCase(() => {});
})

// const heroes = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading'
//             }
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 heroesLoadingStatus: 'idle'
//             }
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             }
//         case 'HEROES_DELETE':
//             const newHeroesData = state.heroes.filter((hero) => hero.id !== action.payload)
//             return {
//                 ...state,
//                 heroes: newHeroesData
//             }
//         case 'HEROES_CREATED':
//             let newHeroesCreated = [...state.heroes, action.payload]
//             return {
//                 ...state,
//                 heroes: newHeroesCreated
//             }
//         default: return state
//     }
// }

export default heroes;