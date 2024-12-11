import { useEffect, useState } from "react";

// how to use
// const { loadedItems, loadItemsHandler, loadItemsFinished } = useLoadMore(filteredWebsites,6,mounted);
// returns {loadedItems, loadItemsHandler, loadItemsFinished}

const useLoadMore = (
  items: Array<any>,
  loadPerClick: number,
  mounted: boolean,
) => {
  const [loadedItems, setLoadedItems] = useState<Array<any>>([]);
  const [next, setNext] = useState<number>(loadPerClick);

  const loadItems = (start: number, end: number) => {
    const slicedItems = items.slice(start, end);
    setLoadedItems([...loadedItems, ...slicedItems]);
  };

  const loadItemsHandler = () => {
    loadItems(next, next + loadPerClick);
    setNext(next + loadPerClick);
  };

  useEffect(() => {
    loadItems(0, loadPerClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  const loadItemsFinished = Number(items.length) == Number(loadedItems.length);

  return {
    loadedItems,
    loadItemsHandler,
    loadItemsFinished,
  };
};

export default useLoadMore;
