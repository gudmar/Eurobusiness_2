import { getMessageWhenAllEstatesRejected } from "../GameOptions/getMessageWhenAllEstatesRejected";

describe('Testing getMEssageWhenAllEstatesRejected', () => {
    const reason = 'Not allowed';
    // const reason = {reason: reasonMessage};
    const otherReason = 'Not allowed 2';
    it('Should return reason, when given object contains only single reason key', () => {
        const given = { reason: reason };
        const result = getMessageWhenAllEstatesRejected(given);
        expect(result).toEqual(reason);
    })
    it('Should return a concatenated reason when given object contains reason objects, where some reason messages are not the same', () => {
        const given = {
            city1: {reason},
            city2: {reason},
            city3: {reason: otherReason},
        };
        const expected = `city1: ${reason}; city2: ${reason}; city3: ${otherReason}`;
        const result = getMessageWhenAllEstatesRejected(given);
        expect(result).toBe(expected)
    })
    it('Should return a collapsed reaosn when all estates have the same reason', () => {
        const given = {
            city1: {reason},
            city2: {reason}
        }
        const result = getMessageWhenAllEstatesRejected(given);
        expect(result).toBe(reason);
    })
    it('Should return a empty string when one objet does not have a reason key', () => {
        const given = {
            city1: {reason},
            city2: {actions: ''}
        }
        const result = getMessageWhenAllEstatesRejected(given);
        expect(result).toBe('');
    })
})
