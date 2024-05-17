import { getAllEntreisWithKey } from "../getAllEntriesWithKey";

const NOT_SEARCHED_1 = 'notSearched1';
const NOT_SEARCHED_2 = 'notSearched2';
const NOT_SEARCHED_3 = 'notSearched3';
const NOT_SEARCHED_4 = 'notSearched4';
const SEARCHED = 'searched';

const SOME_VALUE_1 = 1;
const SOME_VALUE_2 = 'asdf';
const SOME_VALUE_3 = true;
const SOME_VALUE_4 = false;

const NO_KEY = {[NOT_SEARCHED_1]: SOME_VALUE_1, [NOT_SEARCHED_2]: SOME_VALUE_2}

const SIMPLEST_KEY = {[NOT_SEARCHED_1]: SOME_VALUE_1, [SEARCHED]: SOME_VALUE_2}

const NESTED_KEY = {
    [NOT_SEARCHED_1]: {
        [NOT_SEARCHED_1]: {
            [NOT_SEARCHED_3]: {
                [SEARCHED]: SOME_VALUE_4
            }
        }
    },
    [NOT_SEARCHED_2]: SOME_VALUE_2,
    [NOT_SEARCHED_3]: {
        [NOT_SEARCHED_4]: SOME_VALUE_4
    }
}

const NESTED_KEY_OUTPUT = [
    {
        key: SEARCHED,
        value: SOME_VALUE_4,
        path: [
            '.', NOT_SEARCHED_1, NOT_SEARCHED_1, NOT_SEARCHED_3
        ]
    }
]

const NESTED_ARRAY_KEY = {
    [NOT_SEARCHED_1]: {
        [NOT_SEARCHED_2]: [
            {
                [NOT_SEARCHED_1]: SOME_VALUE_1,
                [NOT_SEARCHED_2]: SOME_VALUE_2
            }
        ],
        [NOT_SEARCHED_1]: {
            [SEARCHED]: SOME_VALUE_4
        }
    },
    [NOT_SEARCHED_2]: {
        [SEARCHED]: SOME_VALUE_1
    }
}

const NESTED_ARRAY_KEY_OUTPUT = [
    {
        key: SEARCHED,
        value: SOME_VALUE_4,
        path: ['.', NOT_SEARCHED_1, NOT_SEARCHED_1]
    },
    {
        key: SEARCHED,
        value: SOME_VALUE_1,
        path: ['.', NOT_SEARCHED_2]
    }
]

const ARRAY_KEY = [
    {
        [NOT_SEARCHED_1]: SOME_VALUE_1,
    },
    {
        [SEARCHED]: SOME_VALUE_2
    },
    {
        [SEARCHED]: {
            [NOT_SEARCHED_1]: SOME_VALUE_3,
            [SEARCHED]: SOME_VALUE_1
        }
    }
]

const ARRAY_KEY_OUTPUT = [
    {
        key: SEARCHED,
        value: SOME_VALUE_2,
        path: ['.', '1', ]
    },
    {
        key: SEARCHED,
        value: {
            [NOT_SEARCHED_1]: SOME_VALUE_3,
            [SEARCHED]: SOME_VALUE_1
        },
        path: ['.', '2', ]
    },
    {
        key: SEARCHED,
        value: SOME_VALUE_1,
        path: ['.', '2', SEARCHED, ]
    },

]

describe('Testing getAllEntreisWithKey', () => {
    it('Should return an empty array when nothing found', () => {
        const result = getAllEntreisWithKey(NO_KEY, SEARCHED);
        expect(result).toEqual([])
    });
    it('Should return a entry when simplest case given', () => {
        const result = getAllEntreisWithKey(SIMPLEST_KEY, SEARCHED);
        const expected = [
            {
                key: SEARCHED,
                value: SOME_VALUE_2,
                path: ['.']
            }
        ]
        expect(result).toEqual(expected)
    })
    it('Should return a entry when simplest case given', () => {
        const result = getAllEntreisWithKey(NESTED_KEY, SEARCHED);
        expect(result).toEqual(NESTED_KEY_OUTPUT)
    })
    it('Should return a entry when simplest case given', () => {
        const result = getAllEntreisWithKey(NESTED_ARRAY_KEY, SEARCHED);
        expect(result).toEqual(NESTED_ARRAY_KEY_OUTPUT)
    })
    it('Should return a entry when simplest case given', () => {
        const result = getAllEntreisWithKey(ARRAY_KEY, SEARCHED);
        expect(result).toEqual(ARRAY_KEY_OUTPUT)
    })

})
