import axios from 'axios';
export const FETCH_VERSES = 'FETCH_VERSES';

export function fetchVersesAction(numDay) {
    let response = new Promise(function(resolve) {
        resolve(axios.get('https://hyqpo1v4pf.execute-api.us-east-1.amazonaws.com/bible?numDay=' + numDay));
    });

    return dispatch => {
        response.then(result => {
              dispatch({
                    type: FETCH_VERSES,
                    payload: {
                          numDay,
                          readingPlan: JSON.parse(result.data.readingPlan),
                          verses: JSON.parse(result.data.verses),
                    }
              });
        });
    };
}
