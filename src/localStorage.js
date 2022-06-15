

export const setLocalStorageFunc = (data, name) => {
    localStorage.setItem(name, JSON.stringify(data));
}

export const getLocalStorageFunc = (name) => {
    return JSON.parse(localStorage.getItem(name))
}