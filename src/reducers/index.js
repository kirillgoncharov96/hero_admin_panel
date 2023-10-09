const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
    filterHeroes: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                filterHeroes: state.activeFilter === 'all' ? action.payload : action.payload.filter((item) => item.element === state.activeFilter),
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
        case 'ACTIVE_FILTER_CHANGED':
            return {
                ...state,
                activeFilter: action.payload,
                filterHeroes: action.payload === 'all' ? state.heroes : state.heroes.filter((item) => item.element === action.payload)
            }
        case 'HEROES_DELETE':
            const newHeroesData = state.heroes.filter((hero) => hero.id !== action.payload)
            return {
                ...state,
                heroes: newHeroesData,
                filterHeroes: state.activeFilter === 'all' ? newHeroesData : newHeroesData.filter((item) => item.element === state.activeFilter) 
            }
        case 'HEROES_CREATED':
            let newHeroesCreated = [...state.heroes, action.payload]
            return {
                ...state,
                heroes: newHeroesCreated,
                filterHeroes: state.activeFilter === 'all' ? newHeroesCreated : newHeroesCreated.filter((item) => item.element === state.activeFilter) 
            }
        default: return state
    }
}

export default reducer;