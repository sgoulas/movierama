import { createContext } from "react";

const GenresContext = createContext([]);

export const GenresProvider = GenresContext.Provider;
export const GenresConsumer = GenresContext.Consumer;

export default GenresContext;
