import { useEffect, useState } from "react"

export const useGetFetch = (url) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchAndData() {
            const response = await fetch(url);
            if(!response.ok)
                throw new Error('네트워크 응답에 문제가 발생했습니다.')
            setData(await response.json());
        };
        fetchAndData();
    }, [url]);
    return data;
};

export const usePostFetch = (url, value) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchAndData() {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(value)
            });
            if(!response.ok)
                throw new Error('네트워크 응답에 문제가 발생했습니다.')
            setData(await response.json());
        };
        fetchAndData();
    }, [url, value]);
    return data;
};
