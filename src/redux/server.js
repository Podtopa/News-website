import { message } from 'react-message-popup'

export const postServerData = async (url, data) => {
    let response = [];

    try {
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json"}
        }

        response = await fetch(url, options)
            .then(res => res.json())
            .then(res => {
                if (res.error) throw res.error
                return res;
            })
            .catch(error => displayMessage('error', error))
    } catch (error) {
        displayMessage('error', error)
    }

    if (response.message) {
        displayMessage("success", response.message);
    }

    return response;
}

export const getServerData = async (url) => {
    let response = [];

    try {
        response = await fetch(url)
            .then(res => res.json())
            .then(res => {
                if (res.error) throw res.error
                return res;
            })
            .catch(error => displayMessage('error', error))
    } catch (error) {
        displayMessage('error', error)
    }

    if (response.message) {
        displayMessage("success", response.message);
    }

    return response;
}

const displayMessage = (type, text) => {
    const destory = ({destory}) => {
        setTimeout(() => {
            destory()
        }, 2000)
    };

    if (type === 'error') {
        message.error(text, 2000).then(destory)
    } else if (type === 'success') {
        message.success(text, 2000).then(destory);
    }
}
