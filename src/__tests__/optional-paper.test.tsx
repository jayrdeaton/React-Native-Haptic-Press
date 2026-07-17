import { Card } from '../components/paper/Card'
import { paper } from '../paper'

describe('optional react-native-paper wiring', () => {
  it('loads paper when installed (guarded require succeeds in a real RN env)', () => {
    expect(paper).not.toBeNull()
  })

  it('attaches Card statics when paper is present', () => {
    expect(Card.Content).toBeDefined()
    expect(Card.Title).toBeDefined()
    expect(Card.Actions).toBeDefined()
    expect(Card.Cover).toBeDefined()
  })
})
