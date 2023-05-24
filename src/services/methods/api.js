import axiosInstance from "services/interceptors/axiosInstance";
import Swal from 'sweetalert2';

export const fetchData = (url, optionalParams = {}) => {
    return axiosInstance.get(url, { params: optionalParams })
        .then(response => {
            // handleResponse(response);
            return response;
        })
        .catch(error => {
            // handleError(error);
        });
};

export const postData = (url, data, optionalParams = {}) => {
    const { files = {}, ...restParams } = optionalParams;

    const formData = new FormData();

    Object.keys(files).forEach(key => {
        formData.append(key, files[key]);
    });

    Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
    });

    return axiosInstance.post(url, formData, { params: restParams })
        .then(response => {
            successAlert("Saved", response.data.message);
            return response;
        })
        .catch(error => {
            if (error.response && error.response.status === 422) {
                throw error.response.data.data; // Throw the validation error message
            }
        });
};

export const successAlert = (title, msg) => {
    Swal.fire({
        title: title,
        text: msg,
    })
};

export const validationAlert = (title, msg) => {
    Swal.fire({
        title: title,
        text: msg,
    })
};

