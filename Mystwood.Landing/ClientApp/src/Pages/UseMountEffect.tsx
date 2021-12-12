import {useEffect} from "react";

export function useMountEffect(effect: any) {
    return useEffect(() => {
        effect()
    }, [])
}