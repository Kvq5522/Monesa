import { useState, useEffect } from "react";
const useBeforeRender = (callback, deps) => {
    const [isRun, setIsRun] = useState(false);

    if (!isRun) {
        callback;
        setIsRun(true);
    }

    useEffect(() => () => setIsRun(false), deps);
    console.log(1)
};
export default useBeforeRender;