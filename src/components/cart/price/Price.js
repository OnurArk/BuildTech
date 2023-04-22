import { useSearchParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Button from '../../ui/Button';

import styled from './Price.module.css';

const Price = () => {
  const totalPriceCart = useSelector((state) => state.cart.totalPrice);
  const [searchParams] = useSearchParams();

  const mode = searchParams.get('mode');

  return (
    <div className={styled['price-container']}>
      <div className={styled.price}>
        <p>Total Price:</p>
        <p>{`${totalPriceCart} $`}</p>
      </div>

      {mode !== 'payment' && (
        <Link
          to={`?mode=${mode === 'items' ? 'adress' : 'payment'}`}
          className={styled.link}
        >
          <Button
            className={styled.btn}
            lineThicness={'3px'}
            lineLength={45}
            lineColor={'#DA4919'}
            blurColor={'#F3B575'}
            blurSize={4}
            animationSpeed={3000}
            rX={20}
            glowOffset={5}
          >
            Continue
          </Button>
        </Link>
      )}

      {mode === 'payment' && (
        <Button
          className={styled.btn}
          lineThicness={'3px'}
          lineLength={45}
          lineColor={'#DA4919'}
          blurColor={'#F3B575'}
          blurSize={4}
          animationSpeed={3000}
          rX={20}
          glowOffset={5}
        >
          Order
        </Button>
      )}
    </div>
  );
};

export default Price;
