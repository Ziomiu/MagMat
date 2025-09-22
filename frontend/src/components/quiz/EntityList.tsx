type EntityListProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  emptyMessage?: string;
  className?: string;
};

function EntityList<T>({
  items,
  renderItem,
  emptyMessage = "No items available.",
  className = "",
}: EntityListProps<T>) {
  if (items.length === 0) {
    return <p className="text-gray-500">{emptyMessage}</p>;
  }

  return (
    <div className={`${className}`}>
      {items.map((item) => renderItem(item))}
    </div>
  );
}

export default EntityList;
