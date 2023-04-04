import { DotSpinner, Ring, DotPulse, LineWobble } from '@uiball/loaders';
import styled from './Loaders.module.css';

const Loaders = ({
  className,
  size,
  color,
  type,
  width,
  height,
  bacgroundColor,
}) => {
  let Shape = Ring;

  if (type && type === 'Ring') {
    Shape = Ring;
  }

  if (type && type === 'DotSpinner') {
    Shape = DotSpinner;
  }

  if (type && type === 'DotPulse') {
    Shape = DotPulse;
  }

  if (type && type === 'LineWobble') {
    Shape = LineWobble;
  }

  const style = {
    '--width': width ? width : 'auto',
    '--height': height ? height : 'auto',
    '--bacgroundColor': bacgroundColor ? bacgroundColor : 'transparent',
  };

  return (
    <div className={`${className} ${styled['container']}`} style={style}>
      <Shape
        size={size ? size : 60}
        color={color ? color : '#fff'}
        key={type}
      />
    </div>
  );
};

export default Loaders;
