import PropTypes from 'prop-types';

export default function Button({ className, children, onClick }) {
  return (
    <button className={className} type="button" onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
