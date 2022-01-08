 const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refresh_token") != null ? "Bearer " + localStorage.getItem("refresh_token") : "";
    await fetch('http://localhost:8080/auth/token/refresh', {
        headers: {
            'Authorization': refreshToken
        },
        method: "GET"
    }).then(async response => {
        const res = await response.json();
        return [res, response.ok];
    }).then(arr => {
        const data = arr[0];
        const ok = arr[1];
        if (!ok) {
            throw new Error(data.error_message);
        }
        else {
            localStorage.setItem("access_token", data.access_token);
        }
    });
};

export default refreshToken;