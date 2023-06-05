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

export const postData = (url, data, file,optionalParams = {}) => {
    const { files = {}, ...restParams } = optionalParams;

    const formData = new FormData();

    // Object.keys(files).forEach(key => {
    //     formData.append(key, files[key]);
    // });

    Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
    });

    // formData.append('image', file);
    return axiosInstance.post(url, formData, { params: restParams }, { headers: { "Content-Type": "multipart/form-data" }})
        .then(response => {
            successAlert("Saved", response.data.message);
            return response;
        })
        .catch(error => {
            if (error.response && error.response.status === 422) {
                throw error.response.data.data; // Throw the validation error message
            }
            else{
                throw error.response;
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

