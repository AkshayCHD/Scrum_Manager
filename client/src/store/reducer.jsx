var today = new Date();

const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

const getStatus = (key) => {
    return today.getHours() === key ? 'Present' : today.getHours() > key ? 'Past' : 'Future'
}
const getTimes = () => {
    const some = hours.map((key) => ({
        status: getStatus(key),
        text: ""
    }))
    return some;
}

const initialState = {
    times: getTimes(),
    mdText: ""
}

const rootReducer = (state = initialState, action) => {
    if(action.type === 'ADDTEXT') {
        return {
            ...state,
            times: state.times.map( (time, index) => {
                if(index === action.index){
                    return{
                        ...time,
                        text: action.text
                    }
                }

                return time;
            } )
        }
    } else if(action.type === 'ADD_COUNTER') {
        return {
            ...state,
            counter: state.counter + action.value
        }
    } else if(action.type === 'INITIALIZESTATE') {
        return {
            ...state,
            times: state.times.map( (time, index) => {
                return{
                    ...time,
                    text: action.times[index].text
                }
            
            } )
        }
    } else if(action.type === 'SETMDTEXT') {
        return {
            ...state,
            mdText: action.text
        }
    }
    return state;
};

export default rootReducer