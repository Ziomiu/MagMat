type CardProps = {
  children: React.ReactNode;
  className?: string;
};

function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`border rounded-lg p-4 shadow hover:shadow-md transition ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
