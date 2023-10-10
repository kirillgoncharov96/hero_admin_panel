const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}

const heroes = (state = initialState, action) => {
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
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HEROES_DELETE':
            const newHeroesData = state.heroes.filter((hero) => hero.id !== action.payload)
            return {
                ...state,
                heroes: newHeroesData
            }
        case 'HEROES_CREATED':
            let newHeroesCreated = [...state.heroes, action.payload]
            return {
                ...state,
                heroes: newHeroesCreated
            }
        default: return state
    }
}

export default heroes;