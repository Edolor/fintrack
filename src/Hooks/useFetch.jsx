import axios from "axios";

function useFetch() {
    const fetchData = async (url) => {
        return  await axios.get(url);
    }

    return {fetchData}
}

export default useFetch;