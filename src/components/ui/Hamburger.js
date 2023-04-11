import styled from './Hamburger.module.css';

const Hamburger = ({ isActive, styling, onClick }) => {
  return (
    <div
      className={`${styled['hamburger-menu']} ${
        isActive ? styled.active : null
      }`}
      style={styling}
      onClick={onClick}
    >
      <span className={styled.span}></span>
      <span className={styled.span}></span>
      <span className={styled.span}></span>
      <span className={styled.span}></span>
      <span className={styled.span}></span>
      <span className={styled.span}></span>
    </div>
  );
};

export default Hamburger;
