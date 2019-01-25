import axios from 'axios';
export const FETCH_CHAPTER = 'FETCH_CHAPTER';

export function fetchChapterAction(bibleLink) {
    let response = new Promise(function(resolve) {
        resolve(axios.get('https://hyqpo1v4pf.execute-api.us-east-1.amazonaws.com/fetchBibleText/bible?bookId=' + bibleLink.bookId + '&chapterId=' + bibleLink.chapterId));
    });

    return dispatch => {
        response.then(result => {
            if (bibleLink.bookId === '') {
                dispatch({
                    type: FETCH_CHAPTER,
                    payload: undefined
                });
            } else {
                dispatch({
                    type: FETCH_CHAPTER,
                    payload: JSON.parse(result.data.verses)
                });
            }
        });
    };
}