import Swal from 'sweetalert2'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
export default { success, error, errorServer, promp, confirm, custom, confirmHome, fail }

toastr.options = {
    closeButton: false,
    debug: false,
    newestOnTop: false,
    progressBar: false,
    positionClass: "toast-bottom-right",
    preventDuplicates: false,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut"
}

function error(text = "Có lỗi xảy ra") {
    return toastr.error(text)
    // return Swal.fire({
    //     customClass: "night-theme",
    //     toast: true,
    //     position: 'bottom-right',
    //     showConfirmButton: false,
    //     timer,
    //     timerProgressBar: true,
    //     onOpen: (toast) => {
    //         toast.addEventListener('mouseenter', Swal.stopTimer)
    //         toast.addEventListener('mouseleave', Swal.resumeTimer)
    //     },
    //     icon: 'error',
    //     text,
    //     width: '20rem',
    // });
}

function errorServer(title = "Có lỗi xảy ra", timer = 3000) {
    return Swal.fire({
        customClass: "night-theme",
        toast: true,
        position: 'bottom-right',
        showConfirmButton: false,
        timer,
        timerProgressBar: true,
        onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
        icon: 'error',
        text,
        width: '20rem',
    });
}


function success(text = "Thành công") {
    return toastr.success(text)
    // return Swal.fire({
    //     customClass: "night-theme",
    //     toast: true,
    //     position: 'bottom-right',
    //     showConfirmButton: false,
    //     timer: timer,
    //     timerProgressBar: true,
    //     onOpen: (toast) => {
    //         toast.addEventListener('mouseenter', Swal.stopTimer)
    //         toast.addEventListener('mouseleave', Swal.resumeTimer)
    //     },
    //     icon: 'success',
    //     text,
    //     width: '20rem',
    // });
}

function fail(text = 'Eror') {
    return Swal.fire({
        icon: 'error',
        text
    })
}
function confirm({ text = '', html = "", title = "", confirmButtonText = "OK", showCancelButton = false, cancelButtonText = "Cancel", allowOutsideClick = true } = {}) {
    return Swal.fire({
        customClass: "night-theme",
        title,
        text,
        html,
        confirmButtonText,
        showCancelButton,
        cancelButtonText,
        allowOutsideClick
        // reverseButtons: true,
    })
}

function confirmHome({ text = '', title = "Thông báo", confirm = 'Đồng ý', showCancelButton = true } = {}) {
    return Swal.fire({
        customClass: "night-theme",
        title,
        text,
        confirmButtonText: confirm
        // reverseButtons: true,
    })
}


function promp(title = "Nhập ghi chú ở đây!", text = "textarea", placeholder) {
    return Swal.fire({
        customClass: "night-theme",
        title: title,
        input: text,
        inputPlaceholder: placeholder || title,
        showCancelButton: true,
        // reverseButtons: true,
    })
}

function custom(option) {
    return Swal.fire({
        customClass: "night-theme",
        // reverseButtons: true,
        ...option
    })
}



