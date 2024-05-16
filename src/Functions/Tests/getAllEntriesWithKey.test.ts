import { getAllEntreisWithKey } from "../getAllEntriesWithKey";

const NOT_SEARCHED_1 = 'notSearched1';
const NOT_SEARCHED_2 = 'notSearched1';
const NOT_SEARCHED_3 = 'notSearched1';
const NOT_SEARCHED_4 = 'notSearched1';
const SEARCHED = 'searched';

const SOME_VALUE_1 = 1;
const SOME_VALUE_2 = 'asdf';
const SOME_VALUE_3 = true;
const SOME_VALUE_4 = false;

const NO_KEY = {[NOT_SEARCHED_1]: SOME_VALUE_1, [NOT_SEARCHED_2]: SOME_VALUE_2}

const SIMPLEST_KEY = {[NOT_SEARCHED_1]: SOME_VALUE_1, SEARCHED: SOME_VALUE_2}

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

const NESTED_ARRAY_KEY = {
    [NOT_SEARCHED_1]: {
        NOT_SEARCHED_2: [
            {
                NOT_SEARCHED_1: SOME_VALUE_1,
                NOT_SEARCHED_2: SOME_VALUE_2
            }
        ],
        NOT_SEARCHED_1: {
            SEARCHED: SOME_VALUE_4
        }
    },
    [NOT_SEARCHED_2]: {
        [SEARCHED]: SOME_VALUE_1
    }
}

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
            [SEARCHED]: [SOME_VALUE_1]
        }
    }
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
                path: '/'
            }
        ]
        expect(result).toEqual(expected)
    })
})
