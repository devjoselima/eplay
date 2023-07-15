import { useDispatch, useSelector } from 'react-redux'
import Button from '../Button'

import {
  Overlay,
  CartContainer,
  Sidebar,
  Prices,
  Quantity,
  CartItem
} from './styles'

import Tag from '../Tag'
import { RootReducer } from '../../store'
import { close, remove } from '../../store/reducers/cart'
import { formataPreco } from '../ProductList'

const Cart = () => {
  const { isOpen, items } = useSelector((state: RootReducer) => state.cart)

  const dispatch = useDispatch()

  const closeCart = () => {
    dispatch(close())
  }

  const getTotalPrice = () => {
    return items.reduce((acumulator, currentPrice) => {
      return (acumulator += currentPrice.prices.current!)
    }, 0)
  }

  const removeFromCart = (id: number) => {
    dispatch(remove(id))
  }

  return (
    <CartContainer className={isOpen ? 'is-open' : ''}>
      <Overlay onClick={closeCart} />
      <Sidebar className={isOpen ? 'slideOpen' : 'slideClose'}>
        <ul>
          {items.map((items) => (
            <CartItem key={items.id}>
              <img src={items.media.thumbnail} alt={items.name} />
              <div>
                <h3>{items.name}</h3>
                <Tag>{items.details.category}</Tag>
                <Tag>{items.details.system}</Tag>
                <span>{formataPreco(items.prices.current)}</span>
              </div>
              <button onClick={() => removeFromCart(items.id)} type="button" />
            </CartItem>
          ))}
        </ul>
        <Quantity>{items.length} jogo(s) no carrinho</Quantity>
        <Prices>
          Total de {formataPreco(getTotalPrice())}{' '}
          <span>Em até 6x sem juros</span>
        </Prices>
        <Button title="Clique aqui para continuar com a compra" type="button">
          Continuar com a compra
        </Button>
      </Sidebar>
    </CartContainer>
  )
}

export default Cart
