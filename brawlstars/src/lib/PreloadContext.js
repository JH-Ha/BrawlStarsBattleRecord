import { createContext, useContext } from 'react';

const PreloadContext = createContext(null);
export default PreloadContext;

export const Preloader = ({ resolve }) => {
    const preloadContext = useContext(PreloadContext);
    if (!preloadContext) return null;
    if (preloadContext.done) return null;

    preloadContext.promise.push(Promise.resolve(resolve()));
    return null;
}

export const usePreloader = resolve => {
    const preloadContext = useContext(PreloadContext);
    if (!preloadContext) return null;
    if (preloadContext.done) return null;
    preloadContext.promise.push(Promise.resolve(resolve()));
}