import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
// import { useToast } from 'vue-toast-notification';
import router from '@/router/index';
import { useStore } from '@/store/mainStore';

function configure(configuration: AxiosRequestConfig) {
    // TODO add an option to disable by default loading
    useStore().loading = true;
    const conf = configuration;
    conf.baseURL = process.env.VITE_API_URL;
    conf.timeout = 8000; //Timeout de 8 secondes
    return conf;
}

function requestErrorHandler(error: any) {
    useStore().loading = false;
    console.dir('Request error');
    //useToast().error('Invalid request');
    return Promise.reject(error);
}

function responseHandler(response: AxiosResponse<any>) {
    useStore().loading = false;
    if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
        // useToast().error(`Request failed ${response.status} : ${response.statusText}`);
        return Promise.reject(response);
    }
    return response;
}

function responseErrorHandler(error: any) {
    let disableNotif = false;
    useStore().loading = false;
    if (error.response) {
        switch (error.response.status) {
            case 408:
                console.log(`A timeout happend on url ${error.config.url}`);
                break;
            case 401:
                console.log('401');
                router.replace('/login');
                disableNotif = true;
                break;
            default:
                // do something
                console.log('interceptor');
                console.dir(error.response);
                break;
        }

        // let message = i18n.global.t('authenticate.sucessMessage');
        let message = `Request failed ${error.response.status} : ${error.response.statusText} `;
        if (
            error.response.data !== undefined
            && error.response.data.error !== undefined
            && error.response.data.error !== ''
        ) {
            message = error.response.data.error;
        }
        if (!disableNotif) {
            //useToast().error(message);
        } else {
            console.log(message);
        }
    }
    return Promise.reject(error);
}

export default function configureHTTPInterceptor(): void {
    Axios.interceptors.request.use(
        (config) => configure(config),
        (error) => requestErrorHandler(error),
    );

    Axios.interceptors.response.use(
        (response: AxiosResponse) => responseHandler(response),
        (error) => responseErrorHandler(error),
    );
}