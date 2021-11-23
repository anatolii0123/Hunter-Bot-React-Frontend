
// Toastr Message
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// Toastr Message

const notify = (type, msg) => {
    switch (type) {
        case 'success': toast.success(msg)
            break;
        case 'error': toast.error(msg)
            break;
        case 'warn': toast.warn(msg)
            break;
        case 'info': toast.info(msg)
            break;
        default: toast(msg);
    }
};
export default notify