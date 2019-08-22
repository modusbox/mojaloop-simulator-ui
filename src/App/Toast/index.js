import { PureComponent } from 'react';
import { Toast as ToastComponent } from 'components';

class Toast extends PureComponent {
  componentWillReceiveProps(nextProps) {
    if (nextProps.isVisible) {
      ToastComponent.show({
        kind: nextProps.kind || 'success',
        closeable: nextProps.kind !== 'error',
        title: nextProps.message,
      });
    }
  }
  render() {
    return null;
  }
}

export default Toast;
