import { useNotification } from "@kyvg/vue3-notification";

const { notify } = useNotification();

export default function errorHandler(error, cb) {
    console.error(error);

    let code = false;
    let data = {};
    if (error.response) {
        code = error.response.status;
        data = error.response.data.errors || {};
        if (code === 422) {
            // Do nothing
        } else if (code === 500) {
            notify({
                type: 'error',
                title: 'Server error, please try again later',
            });
        } else {
            notify({
                type: 'error',
                title: error.response.data.msg || error.response.data,
            });
        }
    } else {
        notify({
            type: 'error',
            title: error.message,
        });
    }

    if (typeof cb === 'function') cb(data, code, error);
};
