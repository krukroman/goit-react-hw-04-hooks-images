import Spinner from 'react-loader-spinner';
import { createPortal } from 'react-dom';
const portal = document.getElementById('portal');

export default function Loader() {
  return createPortal(
    <div className="Overlay">
      <Spinner type="Oval" color="#fff" height={150} width={150} />
    </div>,
    portal,
  );
}
