import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Tag from '../Tag'
import Button from '../Button'

import { RootReducer } from '../../store'
import { getTotalPrice, priceFormat } from '../../utils'
import { close, remove } from '../../store/reducers/cart'

import * as S from './styles'

const Cart = () => {
  const { isOpen, items } = useSelector((state: RootReducer) => state.cart)
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const closeCart = () => {
    dispatch(close())
  }

  const removeFromCart = (id: number) => {
    dispatch(remove(id))
  }

  const goToCheckout = () => {
    navigate('/checkout')
    closeCart()
  }

  return (
    <S.CartContainer className={isOpen ? 'is-open' : ''}>
      <S.Overlay onClick={closeCart} />
      <S.Sidebar className={isOpen ? 'slideOpen' : 'slideClose'}>
        {items.length > 0 ? (
          <>
            {items.map((items) => (
              <>
                <ul>
                  <S.CartItem key={items.id}>
                    <img src={items.media.thumbnail} alt={items.name} />
                    <div>
                      <h3>{items.name}</h3>
                      <Tag>{items.details.category}</Tag>
                      <Tag>{items.details.system}</Tag>
                      <span>{priceFormat(items.prices.current)}</span>
                    </div>
                    <button
                      onClick={() => removeFromCart(items.id)}
                      type="button"
                    />
                  </S.CartItem>
                </ul>
              </>
            ))}
            <S.Quantity>{items.length} jogo(s) no carrinho</S.Quantity>
            <S.Prices>
              Total de {priceFormat(getTotalPrice(items))}{' '}
              <span>Em até 6x sem juros</span>
            </S.Prices>
            <Button
              title="Clique aqui para continuar com a compra"
              type="button"
              onClick={goToCheckout}
            >
              Continuar com a compra
            </Button>
          </>
        ) : (
          <p className="empty-text">
            O carrinho está vazio, adicione pelo menos um produto para continuar
            com a compra
          </p>
        )}
      </S.Sidebar>
    </S.CartContainer>
  )
}

export default Cart
