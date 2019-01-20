import * as movement from './movement'

describe('getVector', () => {
    it('returns a scaled vector', () => {
        expect(movement.getVector([0, 0, 2200])).toEqual([0, 0, 1])
    })
    it('returns a vector with proper magnitude', () => {
        expect(movement.getVector([0, 3, 3])).toEqual([0, .5, .5])
    })
    it('returns a vector with proper magnitude', () => {
        expect(movement.getVector([1, 1, 2])).toEqual([1/6, 1/6, 2/3])
    })
    it('returns a vector with proper magnitude', () => {
        expect(movement.getVector([0, -3, 3])).toEqual([0, -.5, .5])
    })
})

describe('getPosition', () => {
    it('returns a position relative to the start and within reason of the target vector', () => {
        const ship = {
            heading: {
                startPosition: [104470, 1510, -107510],
                startTime: 0,
                targetVector: [0, 0, 1]
            }
        }
        const [x, y, z] = movement.getPosition(1000, ship)
        expect(x).toEqual(104470)
        expect(y).toEqual(1510)
        expect(z).toBeGreaterThan(-107510)
    })
})
